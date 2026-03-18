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

/**
 * Color properties that might contain modern color functions
 */
const COLOR_PROPERTIES = [
  'color',
  'background-color',
  'border-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'text-decoration-color',
  'fill',
  'stroke',
];

/**
 * Convert a potentially modern color value to RGB using canvas
 * This works because canvas 2D context only supports RGB/RGBA
 */
function colorToRgb(color: string): string {
  if (!color || color === 'transparent' || color === 'none' || color === 'inherit' || color === 'currentcolor') {
    return color;
  }

  // Check if it's already a simple color format
  if (color.startsWith('#') || color.startsWith('rgb')) {
    return color;
  }

  try {
    // Use canvas to convert any color to RGB
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return color;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const data = ctx.getImageData(0, 0, 1, 1).data;

    if (data[3] === 0) {
      return 'transparent';
    } else if (data[3] === 255) {
      return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    } else {
      return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${(data[3] / 255).toFixed(3)})`;
    }
  } catch {
    return color;
  }
}

/**
 * Process an element and all its children to convert modern colors to RGB
 * and handle opacity properly
 */
function convertElementColors(element: HTMLElement): void {
  const processElement = (el: HTMLElement) => {
    const computed = window.getComputedStyle(el);

    // Convert all color properties
    for (const prop of COLOR_PROPERTIES) {
      try {
        const value = computed.getPropertyValue(prop);
        if (value && value !== 'none' && value !== 'transparent' && value !== 'inherit') {
          const rgbValue = colorToRgb(value);
          el.style.setProperty(prop, rgbValue, 'important');
        }
      } catch {
        // Ignore errors for individual properties
      }
    }

    // Handle opacity - ensure it's a simple numeric value
    try {
      const opacity = computed.getPropertyValue('opacity');
      if (opacity) {
        el.style.setProperty('opacity', opacity, 'important');
      }
    } catch {
      // Ignore
    }

    // Remove box-shadow (often contains modern colors that are hard to parse)
    try {
      const boxShadow = computed.getPropertyValue('box-shadow');
      if (boxShadow && boxShadow !== 'none') {
        el.style.setProperty('box-shadow', 'none', 'important');
      }
    } catch {
      // Ignore
    }

    // Remove text-shadow as well
    try {
      const textShadow = computed.getPropertyValue('text-shadow');
      if (textShadow && textShadow !== 'none') {
        el.style.setProperty('text-shadow', 'none', 'important');
      }
    } catch {
      // Ignore
    }
  };

  processElement(element);
  element.querySelectorAll('*').forEach((child) => {
    if (child instanceof HTMLElement) {
      processElement(child);
    }
  });

  // Also process SVG elements
  element.querySelectorAll('svg, svg *').forEach((svgEl) => {
    if (svgEl instanceof SVGElement) {
      const computed = window.getComputedStyle(svgEl);
      ['fill', 'stroke', 'color'].forEach((prop) => {
        try {
          const value = computed.getPropertyValue(prop);
          if (value && value !== 'none' && value !== 'transparent' && value !== 'inherit') {
            const rgbValue = colorToRgb(value);
            svgEl.style.setProperty(prop, rgbValue, 'important');
          }
        } catch {
          // Ignore
        }
      });
    }
  });
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

      // Convert modern CSS colors (lab, oklch, etc.) to RGB for html2canvas compatibility
      convertElementColors(clone);

      // Wait another frame for color changes to apply
      await new Promise(resolve => requestAnimationFrame(resolve));

      const canvas = await html2canvas(clone, {
        scale,
        backgroundColor: '#0A0F1A',
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: 400,
        height: clone.offsetHeight,
        // Use onclone to handle color conversion and remove problematic stylesheets
        onclone: (doc, clonedElement) => {
          // Remove all stylesheets to prevent html2canvas from parsing LAB/OKLCH colors
          const styleSheets = doc.querySelectorAll('style, link[rel="stylesheet"]');
          styleSheets.forEach((sheet) => sheet.remove());

          // Convert all colors in the cloned element to RGB inline styles
          convertElementColors(clonedElement);
        },
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
