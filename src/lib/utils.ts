/**
 * Utility functions for the application
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and merges Tailwind classes intelligently
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a year with CE suffix
 */
export function formatYear(year: number): string {
  return `${year} CE`;
}

/**
 * Get the period label for a year
 */
export function getPeriodLabel(year: number): 'Makki Period' | 'Madani Period' {
  return year < 622 ? 'Makki Period' : 'Madani Period';
}

/**
 * Calculate progress through the revelation period (0-100)
 */
export function calculateTimelineProgress(year: number): number {
  const startYear = 610;
  const endYear = 632;
  const progress = ((year - startYear) / (endYear - startYear)) * 100;
  return Math.min(100, Math.max(0, progress));
}
