'use client';

/**
 * Story Mode Overlay
 * Main wrapper for cinematic journey experience
 * Handles vignette effects, narrative display, and controls
 */

import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useStoryStore, useCurrentStep } from '@/stores/useStoryStore';
import { useMapStore } from '@/stores/useMapStore';
import { NarrativeCard } from './NarrativeCard';
import { StoryControls } from './StoryControls';

export function StoryMode() {
  const isStoryMode = useStoryStore((s) => s.isStoryMode);
  const isPlaying = useStoryStore((s) => s.isPlaying);
  const nextStep = useStoryStore((s) => s.nextStep);
  const endJourney = useStoryStore((s) => s.endJourney);

  const currentStep = useCurrentStep();

  // Sync timeline year with story step
  const setCurrentYear = useMapStore((s) => s.setCurrentYear);

  useEffect(() => {
    if (currentStep) {
      setCurrentYear(currentStep.year);
    }
  }, [currentStep, setCurrentYear]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isStoryMode) {
        endJourney();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStoryMode, endJourney]);

  // Callback for when narrative card completes
  const handleStepComplete = useCallback(() => {
    nextStep();
  }, [nextStep]);

  if (!isStoryMode) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[50] pointer-events-none"
    >
      {/* Cinematic vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, rgba(10, 15, 26, 0.7) 100%),
            linear-gradient(to bottom, rgba(10, 15, 26, 0.3) 0%, transparent 15%, transparent 85%, rgba(10, 15, 26, 0.4) 100%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Top cinematic bar */}
      <div
        className="absolute top-0 left-0 right-0 h-16"
        style={{
          background: 'linear-gradient(to bottom, rgba(10, 15, 26, 0.8) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom cinematic bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: 'linear-gradient(to top, rgba(10, 15, 26, 0.9) 0%, rgba(10, 15, 26, 0.5) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Interactive elements need pointer-events */}
      <div className="pointer-events-auto">
        {/* Narrative card */}
        <NarrativeCard
          step={currentStep}
          isPlaying={isPlaying}
          onStepComplete={handleStepComplete}
        />

        {/* Controls */}
        <StoryControls />
      </div>
    </motion.div>
  );
}
