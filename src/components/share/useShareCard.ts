'use client';

/**
 * Hook for generating and sharing card images
 */

import { useCallback, useState } from 'react';
import html2canvas from 'html2canvas';

interface ShareOptions {
  filename?: string;
  scale?: number;
}

interface ShareResult {
  success: boolean;
  error?: string;
}

export function useShareCard() {
  const [isGenerating, setIsGenerating] = useState(false);

  /**
   * Generate an image from an HTML element
   * Creates a clean clone to avoid CSS transform/filter issues
   */
  const generateImage = useCallback(async (
    element: HTMLElement,
    options: ShareOptions = {}
  ): Promise<Blob | null> => {
    const { scale = 2 } = options;

    try {
      // Get actual dimensions of the element (before any transforms)
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        console.error('Element has no dimensions');
        return null;
      }

      // Clone the element to a temporary container outside the scaled parent
      const clone = element.cloneNode(true) as HTMLElement;

      // Reset any transforms and ensure full opacity
      clone.style.transform = 'none';
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = '400px'; // Fixed card width
      clone.style.opacity = '1';

      // Remove blur effects from cloned decorative elements (html2canvas struggles with blur)
      const blurElements = clone.querySelectorAll('[class*="blur"]');
      blurElements.forEach((el) => {
        (el as HTMLElement).style.filter = 'none';
        (el as HTMLElement).style.opacity = '0.3';
      });

      // Append to body temporarily
      document.body.appendChild(clone);

      // Wait a frame for styles to apply
      await new Promise(resolve => requestAnimationFrame(resolve));

      const canvas = await html2canvas(clone, {
        scale,
        backgroundColor: '#0A0F1A',
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: 400,
        height: clone.offsetHeight,
      });

      // Clean up
      document.body.removeChild(clone);

      // Verify canvas has valid dimensions
      if (canvas.width === 0 || canvas.height === 0) {
        console.error('Generated canvas has no dimensions');
        return null;
      }

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png', 1.0);
      });
    } catch (error) {
      console.error('Failed to generate image:', error);
      return null;
    }
  }, []);

  /**
   * Download the card as an image
   */
  const downloadCard = useCallback(async (
    element: HTMLElement,
    options: ShareOptions = {}
  ): Promise<ShareResult> => {
    const { filename = 'quran-revelation-map' } = options;

    setIsGenerating(true);
    try {
      const blob = await generateImage(element, options);
      if (!blob) {
        return { success: false, error: 'Failed to generate image' };
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    } finally {
      setIsGenerating(false);
    }
  }, [generateImage]);

  /**
   * Copy the card image to clipboard
   */
  const copyToClipboard = useCallback(async (
    element: HTMLElement,
    options: ShareOptions = {}
  ): Promise<ShareResult> => {
    setIsGenerating(true);
    try {
      const blob = await generateImage(element, options);
      if (!blob) {
        return { success: false, error: 'Failed to generate image' };
      }

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);

      return { success: true };
    } catch {
      // Fallback: clipboard API might not be available
      return { success: false, error: 'Clipboard access denied' };
    } finally {
      setIsGenerating(false);
    }
  }, [generateImage]);

  /**
   * Share using Web Share API (mobile-friendly)
   */
  const shareCard = useCallback(async (
    element: HTMLElement,
    shareData: { title: string; text: string },
    options: ShareOptions = {}
  ): Promise<ShareResult> => {
    // Check if Web Share API is available
    if (!navigator.share || !navigator.canShare) {
      // Fallback to download
      return downloadCard(element, options);
    }

    setIsGenerating(true);
    try {
      const blob = await generateImage(element, options);
      if (!blob) {
        return { success: false, error: 'Failed to generate image' };
      }

      const file = new File([blob], 'quran-revelation-map.png', { type: 'image/png' });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          files: [file],
        });
        return { success: true };
      } else {
        // Fallback to download if file sharing not supported
        return downloadCard(element, options);
      }
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        // User cancelled sharing
        return { success: false, error: 'Share cancelled' };
      }
      return { success: false, error: String(error) };
    } finally {
      setIsGenerating(false);
    }
  }, [generateImage, downloadCard]);

  return {
    isGenerating,
    downloadCard,
    copyToClipboard,
    shareCard,
  };
}
