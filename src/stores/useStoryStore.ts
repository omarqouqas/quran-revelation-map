/**
 * Zustand store for managing cinematic story mode state
 */

import { create } from 'zustand';
import { Journey, JourneyStep, getJourneyById } from '@/data/journeys';

interface StoryState {
  /** Whether story mode is active (cinematic overlay shown) */
  isStoryMode: boolean;
  /** Whether journey selector modal is open */
  isJourneySelectorOpen: boolean;
  /** Currently playing journey */
  currentJourney: Journey | null;
  /** Current step index in the journey */
  currentStepIndex: number;
  /** Whether journey is playing (vs paused) */
  isPlaying: boolean;
  /** Highlighted surah numbers for current step */
  highlightedSurahs: number[];
  /** Highlighted event IDs for current step */
  highlightedEvents: string[];
  /** Target location for map to fly to */
  storyLocation: { lat: number; lng: number; zoom: number } | null;
}

interface StoryActions {
  openJourneySelector: () => void;
  closeJourneySelector: () => void;
  startJourney: (journeyId: string) => void;
  endJourney: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (index: number) => void;
  pauseJourney: () => void;
  resumeJourney: () => void;
  togglePause: () => void;
}

interface StoryStore extends StoryState, StoryActions {}

const initialState: StoryState = {
  isStoryMode: false,
  isJourneySelectorOpen: false,
  currentJourney: null,
  currentStepIndex: 0,
  isPlaying: false,
  highlightedSurahs: [],
  highlightedEvents: [],
  storyLocation: null,
};

export const useStoryStore = create<StoryStore>((set, get) => ({
  ...initialState,

  openJourneySelector: () => {
    set({ isJourneySelectorOpen: true });
  },

  closeJourneySelector: () => {
    set({ isJourneySelectorOpen: false });
  },

  startJourney: (journeyId: string) => {
    const journey = getJourneyById(journeyId);
    if (!journey) return;

    const firstStep = journey.steps[0];
    set({
      isJourneySelectorOpen: false,
      isStoryMode: true,
      currentJourney: journey,
      currentStepIndex: 0,
      isPlaying: true,
      highlightedSurahs: firstStep.highlightSurahs || [],
      highlightedEvents: firstStep.highlightEvents || [],
      storyLocation: firstStep.location
        ? {
            lat: firstStep.location.lat,
            lng: firstStep.location.lng,
            zoom: firstStep.location.zoom || 10,
          }
        : null,
    });
  },

  endJourney: () => {
    set({
      isStoryMode: false,
      currentJourney: null,
      currentStepIndex: 0,
      isPlaying: false,
      highlightedSurahs: [],
      highlightedEvents: [],
      storyLocation: null,
    });
  },

  nextStep: () => {
    const { currentJourney, currentStepIndex } = get();
    if (!currentJourney) return;

    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= currentJourney.steps.length) {
      // Journey complete - stay on last step but stop playing
      set({ isPlaying: false });
      return;
    }

    const nextStep = currentJourney.steps[nextIndex];
    set({
      currentStepIndex: nextIndex,
      highlightedSurahs: nextStep.highlightSurahs || [],
      highlightedEvents: nextStep.highlightEvents || [],
      storyLocation: nextStep.location
        ? {
            lat: nextStep.location.lat,
            lng: nextStep.location.lng,
            zoom: nextStep.location.zoom || 10,
          }
        : null,
    });
  },

  previousStep: () => {
    const { currentJourney, currentStepIndex } = get();
    if (!currentJourney || currentStepIndex <= 0) return;

    const prevIndex = currentStepIndex - 1;
    const prevStep = currentJourney.steps[prevIndex];
    set({
      currentStepIndex: prevIndex,
      highlightedSurahs: prevStep.highlightSurahs || [],
      highlightedEvents: prevStep.highlightEvents || [],
      storyLocation: prevStep.location
        ? {
            lat: prevStep.location.lat,
            lng: prevStep.location.lng,
            zoom: prevStep.location.zoom || 10,
          }
        : null,
    });
  },

  goToStep: (index: number) => {
    const { currentJourney } = get();
    if (!currentJourney || index < 0 || index >= currentJourney.steps.length) return;

    const step = currentJourney.steps[index];
    set({
      currentStepIndex: index,
      highlightedSurahs: step.highlightSurahs || [],
      highlightedEvents: step.highlightEvents || [],
      storyLocation: step.location
        ? {
            lat: step.location.lat,
            lng: step.location.lng,
            zoom: step.location.zoom || 10,
          }
        : null,
    });
  },

  pauseJourney: () => {
    set({ isPlaying: false });
  },

  resumeJourney: () => {
    set({ isPlaying: true });
  },

  togglePause: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },
}));

/**
 * Hook to get the current step of the journey
 */
export function useCurrentStep(): JourneyStep | null {
  const journey = useStoryStore((s) => s.currentJourney);
  const stepIndex = useStoryStore((s) => s.currentStepIndex);
  if (!journey) return null;
  return journey.steps[stepIndex] || null;
}

/**
 * Hook to check if journey is at the last step
 */
export function useIsLastStep(): boolean {
  const journey = useStoryStore((s) => s.currentJourney);
  const stepIndex = useStoryStore((s) => s.currentStepIndex);
  if (!journey) return false;
  return stepIndex >= journey.steps.length - 1;
}

/**
 * Hook to check if journey is at the first step
 */
export function useIsFirstStep(): boolean {
  const stepIndex = useStoryStore((s) => s.currentStepIndex);
  return stepIndex === 0;
}
