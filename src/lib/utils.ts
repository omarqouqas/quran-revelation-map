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

/**
 * Get the surah number for today's spotlight
 * Uses a deterministic algorithm based on the date to rotate through all 114 surahs
 * Changes at midnight UTC
 */
export function getDailySurahNumber(): number {
  const now = new Date();
  // Use UTC date to ensure consistency across timezones
  const daysSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
  // Rotate through all 114 surahs, with some shuffling for variety
  // Using a prime multiplier to avoid predictable patterns
  const shuffled = (daysSinceEpoch * 17) % 114;
  return shuffled + 1; // Surah numbers are 1-114
}

/**
 * Get a formatted date string for the spotlight
 */
export function getSpotlightDateString(): string {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}
