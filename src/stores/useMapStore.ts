/**
 * Zustand store for managing map and timeline state
 */

import { create } from 'zustand';
import type { Surah, MapState, MapActions } from '@/types';

interface MapStore extends MapState, MapActions {}

const initialState: MapState = {
  currentYear: 610,
  selectedSurah: null,
  isPlaying: false,
  playbackSpeed: 1,
};

export const useMapStore = create<MapStore>((set) => ({
  ...initialState,

  setCurrentYear: (year: number) => {
    set({ currentYear: Math.min(632, Math.max(610, year)) });
  },

  setSelectedSurah: (surah: Surah | null) => {
    set({ selectedSurah: surah });
  },

  togglePlaying: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  setPlaybackSpeed: (speed: number) => {
    set({ playbackSpeed: speed });
  },

  reset: () => {
    set(initialState);
  },
}));

/**
 * Hook to get visible surahs based on current year
 */
export const useVisibleSurahs = () => {
  const currentYear = useMapStore((state) => state.currentYear);

  // Import surahs dynamically to avoid circular dependencies
  // This will be called on each render but the data is static
  const { getSurahsByYear } = require('@/data/surahs');

  return getSurahsByYear(currentYear);
};
