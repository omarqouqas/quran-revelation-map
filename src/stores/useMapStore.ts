/**
 * Zustand store for managing map and timeline state
 */

import { create } from 'zustand';

interface MapState {
  /** Current year on the timeline (610-632) */
  currentYear: number;
  /** Whether auto-play is active */
  isPlaying: boolean;
  /** Playback speed multiplier */
  playbackSpeed: 1 | 2 | 4;
  /** Currently selected surah number for detail view */
  selectedSurahNumber: number | null;
  /** Currently hovered surah number */
  hoveredSurahNumber: number | null;
  /** Currently selected event ID for detail view */
  selectedEventId: string | null;
  /** Currently selected sacred site name for detail view */
  selectedSiteName: string | null;
  /** Show Makki surahs filter */
  showMakki: boolean;
  /** Show Madani surahs filter */
  showMadani: boolean;
  /** Show historical events */
  showEvents: boolean;
  /** Has user interacted with timeline (for landing state) */
  hasInteracted: boolean;
}

interface MapActions {
  setCurrentYear: (year: number) => void;
  togglePlayback: () => void;
  setPlaybackSpeed: (speed: 1 | 2 | 4) => void;
  selectSurah: (surahNumber: number | null) => void;
  hoverSurah: (surahNumber: number | null) => void;
  selectEvent: (eventId: string | null) => void;
  selectSite: (siteName: string | null) => void;
  setShowMakki: (show: boolean) => void;
  setShowMadani: (show: boolean) => void;
  setShowEvents: (show: boolean) => void;
  setHasInteracted: (interacted: boolean) => void;
  reset: () => void;
}

interface MapStore extends MapState, MapActions {}

const initialState: MapState = {
  currentYear: 610,
  isPlaying: false,
  playbackSpeed: 1,
  selectedSurahNumber: null,
  hoveredSurahNumber: null,
  selectedEventId: null,
  selectedSiteName: null,
  showMakki: true,
  showMadani: true,
  showEvents: true,
  hasInteracted: false,
};

export const useMapStore = create<MapStore>((set) => ({
  ...initialState,

  setCurrentYear: (year: number) => {
    set({
      currentYear: Math.min(632, Math.max(610, year)),
      hasInteracted: true,
    });
  },

  togglePlayback: () => {
    set((state) => ({ isPlaying: !state.isPlaying, hasInteracted: true }));
  },

  setPlaybackSpeed: (speed: 1 | 2 | 4) => {
    set({ playbackSpeed: speed });
  },

  selectSurah: (surahNumber: number | null) => {
    set({ selectedSurahNumber: surahNumber });
  },

  hoverSurah: (surahNumber: number | null) => {
    set({ hoveredSurahNumber: surahNumber });
  },

  selectEvent: (eventId: string | null) => {
    set({ selectedEventId: eventId });
  },

  selectSite: (siteName: string | null) => {
    set({ selectedSiteName: siteName });
  },

  setShowMakki: (show: boolean) => {
    set({ showMakki: show });
  },

  setShowMadani: (show: boolean) => {
    set({ showMadani: show });
  },

  setShowEvents: (show: boolean) => {
    set({ showEvents: show });
  },

  setHasInteracted: (interacted: boolean) => {
    set({ hasInteracted: interacted });
  },

  reset: () => {
    set(initialState);
  },
}));
