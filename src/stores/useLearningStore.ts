/**
 * Zustand store for managing learning path state
 * Handles path/lesson navigation and progress persistence
 */

import { create } from 'zustand';
import {
  LearningPath,
  Lesson,
  LearningProgress,
  defaultProgress,
  getLearningPathById,
  getNextLesson,
  getPreviousLesson,
} from '@/data/learning-paths';

const STORAGE_KEY = 'quran-map-learning-progress';

/** Load progress from localStorage */
function loadProgress(): LearningProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

/** Save progress to localStorage */
function saveProgress(progress: LearningProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Silently fail if localStorage is not available
  }
}

interface LearningState {
  /** Whether learning mode is active */
  isLearningMode: boolean;
  /** Whether path selector modal is open */
  isPathSelectorOpen: boolean;
  /** Current learning path */
  currentPath: LearningPath | null;
  /** Current lesson being viewed */
  currentLesson: Lesson | null;
  /** Current section index within lesson (0-based) */
  currentSectionIndex: number;
  /** Progress data (synced with localStorage) */
  progress: LearningProgress;
  /** Highlighted surah numbers for map coordination */
  highlightedSurahs: number[];
  /** Highlighted event IDs for map coordination */
  highlightedEvents: string[];
  /** Target location for map camera */
  learningLocation: { lat: number; lng: number; zoom: number } | null;
}

interface LearningActions {
  // Modal controls
  openPathSelector: () => void;
  closePathSelector: () => void;

  // Path navigation
  startPath: (pathId: string) => void;
  resumePath: (pathId: string) => void;
  exitLearning: () => void;

  // Lesson navigation
  goToLesson: (lessonId: string) => void;
  nextLesson: () => void;
  previousLesson: () => void;

  // Section navigation (within lesson)
  nextSection: () => void;
  previousSection: () => void;
  goToSection: (index: number) => void;

  // Progress management
  markLessonComplete: () => void;
  resetProgress: () => void;

  // Utility
  isLessonCompleted: (lessonId: string) => boolean;
  getPathProgress: (pathId: string) => { completed: number; total: number; percentage: number };
}

interface LearningStore extends LearningState, LearningActions {}

const initialState: LearningState = {
  isLearningMode: false,
  isPathSelectorOpen: false,
  currentPath: null,
  currentLesson: null,
  currentSectionIndex: 0,
  progress: defaultProgress,
  highlightedSurahs: [],
  highlightedEvents: [],
  learningLocation: null,
};

export const useLearningStore = create<LearningStore>((set, get) => ({
  ...initialState,
  progress: loadProgress(),

  openPathSelector: () => {
    set({ isPathSelectorOpen: true });
  },

  closePathSelector: () => {
    set({ isPathSelectorOpen: false });
  },

  startPath: (pathId: string) => {
    const path = getLearningPathById(pathId);
    if (!path || path.lessons.length === 0) return;

    const firstLesson = path.lessons[0];
    const highlights = firstLesson.mapHighlights;

    // Mark path as started
    const progress = get().progress;
    const updatedProgress: LearningProgress = {
      ...progress,
      startedPaths: {
        ...progress.startedPaths,
        [pathId]: Date.now(),
      },
      lastAccessedLesson: {
        ...progress.lastAccessedLesson,
        [pathId]: firstLesson.id,
      },
    };
    saveProgress(updatedProgress);

    set({
      isPathSelectorOpen: false,
      isLearningMode: true,
      currentPath: path,
      currentLesson: firstLesson,
      currentSectionIndex: 0,
      progress: updatedProgress,
      highlightedSurahs: highlights.surahNumbers || [],
      highlightedEvents: highlights.eventIds || [],
      learningLocation: highlights.location
        ? {
            lat: highlights.location.lat,
            lng: highlights.location.lng,
            zoom: highlights.location.zoom || 10,
          }
        : null,
    });
  },

  resumePath: (pathId: string) => {
    const path = getLearningPathById(pathId);
    if (!path || path.lessons.length === 0) return;

    const progress = get().progress;
    const lastLessonId = progress.lastAccessedLesson[pathId];

    // Find the last accessed lesson or first incomplete lesson
    let lesson = path.lessons[0];
    if (lastLessonId) {
      const found = path.lessons.find((l) => l.id === lastLessonId);
      if (found) lesson = found;
    } else {
      // Find first incomplete lesson
      const firstIncomplete = path.lessons.find((l) => !progress.completedLessons[l.id]);
      if (firstIncomplete) lesson = firstIncomplete;
    }

    const highlights = lesson.mapHighlights;

    set({
      isPathSelectorOpen: false,
      isLearningMode: true,
      currentPath: path,
      currentLesson: lesson,
      currentSectionIndex: 0,
      highlightedSurahs: highlights.surahNumbers || [],
      highlightedEvents: highlights.eventIds || [],
      learningLocation: highlights.location
        ? {
            lat: highlights.location.lat,
            lng: highlights.location.lng,
            zoom: highlights.location.zoom || 10,
          }
        : null,
    });
  },

  exitLearning: () => {
    set({
      isLearningMode: false,
      currentPath: null,
      currentLesson: null,
      currentSectionIndex: 0,
      highlightedSurahs: [],
      highlightedEvents: [],
      learningLocation: null,
    });
  },

  goToLesson: (lessonId: string) => {
    const { currentPath, progress } = get();
    if (!currentPath) return;

    const lesson = currentPath.lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    const highlights = lesson.mapHighlights;

    // Update last accessed
    const updatedProgress: LearningProgress = {
      ...progress,
      lastAccessedLesson: {
        ...progress.lastAccessedLesson,
        [currentPath.id]: lessonId,
      },
    };
    saveProgress(updatedProgress);

    set({
      currentLesson: lesson,
      currentSectionIndex: 0,
      progress: updatedProgress,
      highlightedSurahs: highlights.surahNumbers || [],
      highlightedEvents: highlights.eventIds || [],
      learningLocation: highlights.location
        ? {
            lat: highlights.location.lat,
            lng: highlights.location.lng,
            zoom: highlights.location.zoom || 10,
          }
        : null,
    });
  },

  nextLesson: () => {
    const { currentPath, currentLesson } = get();
    if (!currentPath || !currentLesson) return;

    const next = getNextLesson(currentPath.id, currentLesson.id);
    if (!next) return;

    get().goToLesson(next.id);
  },

  previousLesson: () => {
    const { currentPath, currentLesson } = get();
    if (!currentPath || !currentLesson) return;

    const prev = getPreviousLesson(currentPath.id, currentLesson.id);
    if (!prev) return;

    get().goToLesson(prev.id);
  },

  nextSection: () => {
    const { currentLesson, currentSectionIndex } = get();
    if (!currentLesson) return;

    const maxIndex = currentLesson.sections.length - 1;
    if (currentSectionIndex < maxIndex) {
      set({ currentSectionIndex: currentSectionIndex + 1 });
    }
  },

  previousSection: () => {
    const { currentSectionIndex } = get();
    if (currentSectionIndex > 0) {
      set({ currentSectionIndex: currentSectionIndex - 1 });
    }
  },

  goToSection: (index: number) => {
    const { currentLesson } = get();
    if (!currentLesson) return;

    const maxIndex = currentLesson.sections.length - 1;
    if (index >= 0 && index <= maxIndex) {
      set({ currentSectionIndex: index });
    }
  },

  markLessonComplete: () => {
    const { currentPath, currentLesson, progress } = get();
    if (!currentPath || !currentLesson) return;

    const updatedProgress: LearningProgress = {
      ...progress,
      completedLessons: {
        ...progress.completedLessons,
        [currentLesson.id]: Date.now(),
      },
    };
    saveProgress(updatedProgress);

    set({ progress: updatedProgress });
  },

  resetProgress: () => {
    saveProgress(defaultProgress);
    set({ progress: defaultProgress });
  },

  isLessonCompleted: (lessonId: string) => {
    return !!get().progress.completedLessons[lessonId];
  },

  getPathProgress: (pathId: string) => {
    const path = getLearningPathById(pathId);
    if (!path) return { completed: 0, total: 0, percentage: 0 };

    const { progress } = get();
    const total = path.lessons.length;
    const completed = path.lessons.filter((l) => progress.completedLessons[l.id]).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percentage };
  },
}));

/**
 * Hook to get the current lesson
 */
export function useCurrentLesson(): Lesson | null {
  return useLearningStore((s) => s.currentLesson);
}

/**
 * Hook to get the current path
 */
export function useCurrentPath(): LearningPath | null {
  return useLearningStore((s) => s.currentPath);
}

/**
 * Hook to check if at the last section of current lesson
 */
export function useIsLastSection(): boolean {
  const lesson = useLearningStore((s) => s.currentLesson);
  const sectionIndex = useLearningStore((s) => s.currentSectionIndex);
  if (!lesson) return false;
  return sectionIndex >= lesson.sections.length - 1;
}

/**
 * Hook to check if at the first section
 */
export function useIsFirstSection(): boolean {
  const sectionIndex = useLearningStore((s) => s.currentSectionIndex);
  return sectionIndex === 0;
}

/**
 * Hook to check if at the last lesson of current path
 */
export function useIsLastLesson(): boolean {
  const path = useLearningStore((s) => s.currentPath);
  const lesson = useLearningStore((s) => s.currentLesson);
  if (!path || !lesson) return false;
  return lesson.order >= path.lessons.length;
}

/**
 * Hook to check if at the first lesson of current path
 */
export function useIsFirstLesson(): boolean {
  const lesson = useLearningStore((s) => s.currentLesson);
  if (!lesson) return false;
  return lesson.order === 1;
}
