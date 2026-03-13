/**
 * Zustand store for tracking user progress
 * Persists to localStorage
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  /** Set of explored surah numbers */
  exploredSurahs: number[];
  /** Set of explored event IDs */
  exploredEvents: string[];
  /** Daily exploration dates (ISO date strings) for streak tracking */
  explorationDates: string[];
  /** Last exploration timestamp */
  lastExploredAt: string | null;
}

interface ProgressActions {
  /** Mark a surah as explored */
  markSurahExplored: (surahNumber: number) => void;
  /** Mark an event as explored */
  markEventExplored: (eventId: string) => void;
  /** Check if a surah has been explored */
  isSurahExplored: (surahNumber: number) => boolean;
  /** Check if an event has been explored */
  isEventExplored: (eventId: string) => boolean;
  /** Get current streak (consecutive days) */
  getCurrentStreak: () => number;
  /** Get total explored count */
  getExploredCount: () => { surahs: number; events: number; total: number };
  /** Reset all progress */
  resetProgress: () => void;
}

interface ProgressStore extends ProgressState, ProgressActions {}

const initialState: ProgressState = {
  exploredSurahs: [],
  exploredEvents: [],
  explorationDates: [],
  lastExploredAt: null,
};

/** Get today's date as ISO string (YYYY-MM-DD) */
function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

/** Calculate streak from exploration dates */
function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const sortedDates = [...new Set(dates)].sort().reverse();
  const today = getTodayISO();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // Check if user explored today or yesterday (streak is still active)
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }

  let streak = 0;
  let currentDate = new Date(sortedDates[0]);

  for (const dateStr of sortedDates) {
    const date = new Date(dateStr);
    const expectedDate = new Date(currentDate);
    expectedDate.setDate(expectedDate.getDate() - streak);

    if (date.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      markSurahExplored: (surahNumber: number) => {
        const state = get();
        if (state.exploredSurahs.includes(surahNumber)) return;

        const today = getTodayISO();
        const newDates = state.explorationDates.includes(today)
          ? state.explorationDates
          : [...state.explorationDates, today];

        set({
          exploredSurahs: [...state.exploredSurahs, surahNumber],
          explorationDates: newDates,
          lastExploredAt: new Date().toISOString(),
        });
      },

      markEventExplored: (eventId: string) => {
        const state = get();
        if (state.exploredEvents.includes(eventId)) return;

        const today = getTodayISO();
        const newDates = state.explorationDates.includes(today)
          ? state.explorationDates
          : [...state.explorationDates, today];

        set({
          exploredEvents: [...state.exploredEvents, eventId],
          explorationDates: newDates,
          lastExploredAt: new Date().toISOString(),
        });
      },

      isSurahExplored: (surahNumber: number) => {
        return get().exploredSurahs.includes(surahNumber);
      },

      isEventExplored: (eventId: string) => {
        return get().exploredEvents.includes(eventId);
      },

      getCurrentStreak: () => {
        return calculateStreak(get().explorationDates);
      },

      getExploredCount: () => {
        const state = get();
        return {
          surahs: state.exploredSurahs.length,
          events: state.exploredEvents.length,
          total: state.exploredSurahs.length + state.exploredEvents.length,
        };
      },

      resetProgress: () => {
        set(initialState);
      },
    }),
    {
      name: 'quran-map-progress',
      version: 1,
    }
  )
);
