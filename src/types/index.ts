/**
 * Core type definitions for Quran Revelation Map
 */

/** Classification of surah based on period of revelation */
export type SurahClassification = 'Makki' | 'Madani';

/** Type of location */
export type LocationType = 'city' | 'mountain' | 'cave' | 'battlefield' | 'plain';

/**
 * Represents a surah with all its metadata and revelation context
 */
export interface Surah {
  /** Surah number in the Mushaf (1-114) */
  number: number;
  /** Arabic name of the surah */
  arabicName: string;
  /** English transliteration of the name */
  englishName: string;
  /** English meaning of the surah name */
  englishMeaning: string;
  /** Chronological order of revelation (1-114) */
  revelationOrder: number;
  /** Whether revealed in Makkah or Madinah period */
  classification: SurahClassification;
  /** Approximate year of revelation (610-632 CE) */
  approximateYear: number;
  /** Total number of ayat (verses) */
  numberOfAyat: number;
  /** GPS coordinates of revelation location */
  location: {
    lat: number;
    lng: number;
  };
  /** 2-3 key themes of the surah */
  keyThemes: string[];
  /** Brief reason/context for revelation */
  reasonForRevelation: string;
  /** IDs of related historical events */
  relatedEvents: string[];
}

/**
 * Represents a significant location in the revelation history
 */
export interface Location {
  /** Unique identifier */
  id: string;
  /** English name */
  name: string;
  /** Arabic name */
  arabicName: string;
  /** Latitude */
  lat: number;
  /** Longitude */
  lng: number;
  /** Type of location */
  type: LocationType;
  /** Brief description of the location's significance */
  description: string;
}

/**
 * Represents a historical event during the prophetic period
 */
export interface HistoricalEvent {
  /** Unique identifier */
  id: string;
  /** Name of the event */
  name: string;
  /** Year the event occurred (610-632 CE) */
  year: number;
  /** Location where the event took place */
  locationId: string;
  /** Description of the event and its significance */
  description: string;
  /** Surah numbers related to this event */
  relatedSurahs: number[];
}

/**
 * State managed by the map store
 */
export interface MapState {
  /** Current year on the timeline (610-632) */
  currentYear: number;
  /** Currently selected surah for detail view */
  selectedSurah: Surah | null;
  /** Whether auto-play is active */
  isPlaying: boolean;
  /** Playback speed multiplier */
  playbackSpeed: number;
}

/**
 * Actions available in the map store
 */
export interface MapActions {
  /** Set the current year on the timeline */
  setCurrentYear: (year: number) => void;
  /** Select a surah to view details */
  setSelectedSurah: (surah: Surah | null) => void;
  /** Toggle auto-play mode */
  togglePlaying: () => void;
  /** Set playback speed */
  setPlaybackSpeed: (speed: number) => void;
  /** Reset to initial state */
  reset: () => void;
}
