/**
 * Zustand store for Surah Explorer state management
 */

import { create } from 'zustand';
import type { LocationKey } from '@/data/surah-locations';

type PeriodFilter = 'all' | 'makki' | 'madani';
type SortBy = 'number' | 'revelation' | 'year' | 'name';

interface ExplorerState {
  /** Whether the explorer panel is open */
  isExplorerOpen: boolean;
  /** Search query (matches Arabic and English names) */
  searchQuery: string;
  /** Selected themes to filter by (empty = show all) */
  selectedThemes: string[];
  /** Period filter */
  periodFilter: PeriodFilter;
  /** Year range filter [start, end] */
  yearRange: [number, number];
  /** Selected locations to filter by (empty = show all) */
  selectedLocations: LocationKey[];
  /** Sort order */
  sortBy: SortBy;
}

interface ExplorerActions {
  openExplorer: () => void;
  closeExplorer: () => void;
  toggleExplorer: () => void;
  setSearchQuery: (query: string) => void;
  toggleTheme: (theme: string) => void;
  clearThemes: () => void;
  setPeriodFilter: (period: PeriodFilter) => void;
  setYearRange: (range: [number, number]) => void;
  toggleLocation: (location: LocationKey) => void;
  clearLocations: () => void;
  setSortBy: (sort: SortBy) => void;
  resetFilters: () => void;
  getActiveFilterCount: () => number;
}

interface ExplorerStore extends ExplorerState, ExplorerActions {}

const initialState: ExplorerState = {
  isExplorerOpen: false,
  searchQuery: '',
  selectedThemes: [],
  periodFilter: 'all',
  yearRange: [610, 632],
  selectedLocations: [],
  sortBy: 'number',
};

export const useExplorerStore = create<ExplorerStore>((set, get) => ({
  ...initialState,

  openExplorer: () => set({ isExplorerOpen: true }),

  closeExplorer: () => set({ isExplorerOpen: false }),

  toggleExplorer: () => set((state) => ({ isExplorerOpen: !state.isExplorerOpen })),

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  toggleTheme: (theme: string) =>
    set((state) => ({
      selectedThemes: state.selectedThemes.includes(theme)
        ? state.selectedThemes.filter((t) => t !== theme)
        : [...state.selectedThemes, theme],
    })),

  clearThemes: () => set({ selectedThemes: [] }),

  setPeriodFilter: (period: PeriodFilter) => set({ periodFilter: period }),

  setYearRange: (range: [number, number]) => set({ yearRange: range }),

  toggleLocation: (location: LocationKey) =>
    set((state) => ({
      selectedLocations: state.selectedLocations.includes(location)
        ? state.selectedLocations.filter((l) => l !== location)
        : [...state.selectedLocations, location],
    })),

  clearLocations: () => set({ selectedLocations: [] }),

  setSortBy: (sort: SortBy) => set({ sortBy: sort }),

  resetFilters: () =>
    set({
      searchQuery: '',
      selectedThemes: [],
      periodFilter: 'all',
      yearRange: [610, 632],
      selectedLocations: [],
      sortBy: 'number',
    }),

  getActiveFilterCount: () => {
    const state = get();
    let count = 0;
    if (state.searchQuery) count++;
    if (state.selectedThemes.length > 0) count++;
    if (state.periodFilter !== 'all') count++;
    if (state.yearRange[0] !== 610 || state.yearRange[1] !== 632) count++;
    if (state.selectedLocations.length > 0) count++;
    return count;
  },
}));
