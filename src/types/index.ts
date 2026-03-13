/**
 * Core type definitions for Quran Revelation Map
 * Re-exports types from data modules for convenience
 */

export type { CompleteSurahData } from '@/data/surah-locations';
export type { HistoricalEvent } from '@/data/events';
export type { AppSurahData } from '@/lib/quran-data';

/** Classification of surah based on period of revelation */
export type SurahClassification = 'Makki' | 'Madani';

/** Type of location */
export type LocationType = 'city' | 'mountain' | 'cave' | 'battlefield' | 'plain';

/**
 * Represents a significant location in the revelation history
 */
export interface Location {
  id: string;
  name: string;
  arabicName: string;
  lat: number;
  lng: number;
  type: LocationType;
  description: string;
}
