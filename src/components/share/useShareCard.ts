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
   * Wait for element to have valid dimensions
   */
  const waitForElement = useCallback(async (
    element: HTMLElement,
    maxAttempts: number = 10
  ): Promise<boolean> => {
    for (let i = 0; i < maxAttempts; i++) {
      const rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    return false;
  }, []);

  /**
   * Generate an image from an HTML element
   */
  const generateImage = useCallback(async (
    element: HTMLElement,
    options: ShareOptions = {}
  ): Promise<Blob | null> => {
    const { scale = 2 } = options;

    try {
      // Wait for element to have valid dimensions
      const isReady = await waitForElement(element);
      if (!isReady) {
        console.error('Element has no dimensions');
        return null;
      }

      const canvas = await html2canvas(element, {
        scale,
        backgroundColor: '#0A0F1A',
        logging: false,
        useCORS: true,
      });

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
  }, [waitForElement]);

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
