'use client';

/**
 * Story Controls Component
 * Minimal controls during cinematic journey playback
 */

import { motion } from 'framer-motion';
import { X, Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
import { useStoryStore, useCurrentStep, useIsLastStep, useIsFirstStep } from '@/stores/useStoryStore';

export function StoryControls() {
  const currentJourney = useStoryStore((s) => s.currentJourney);
  const currentStepIndex = useStoryStore((s) => s.currentStepIndex);
  const isPlaying = useStoryStore((s) => s.isPlaying);
  const endJourney = useStoryStore((s) => s.endJourney);
  const nextStep = useStoryStore((s) => s.nextStep);
  const previousStep = useStoryStore((s) => s.previousStep);
  const togglePause = useStoryStore((s) => s.togglePause);
  const goToStep = useStoryStore((s) => s.goToStep);
  const resumeJourney = useStoryStore((s) => s.resumeJourney);

  const isLastStep = useIsLastStep();
  const isFirstStep = useIsFirstStep();

  if (!currentJourney) return null;

  const totalSteps = currentJourney.steps.length;
  const isComplete = isLastStep && !isPlaying;

  return (
    <>
      {/* Exit button - top right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={endJourney}
        className="fixed top-4 right-4 z-[70] p-3 rounded-xl bg-[#0A0F1A]/90 backdrop-blur-sm border border-[#2A3342] hover:bg-[#1A2332] hover:border-[#C8A84E]/50 transition-all group"
      >
        <X className="w-5 h-5 text-[#E8E3DB] group-hover:text-[#C8A84E] transition-colors" />
      </motion.button>

      {/* Journey title - top left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="fixed top-4 left-4 z-[70] px-4 py-2.5 rounded-xl bg-[#0A0F1A]/90 backdrop-blur-sm border border-[#2A3342]"
      >
        <p
          className="text-sm font-medium text-[#C8A84E]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {currentJourney.title}
        </p>
        <p className="text-xs text-[#E8E3DB] opacity-60">
          Step {currentStepIndex + 1} of {totalSteps}
        </p>
      </motion.div>

      {/* Center controls - only show on hover or when paused */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-48 left-1/2 -translate-x-1/2 z-[70]"
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A0F1A]/90 backdrop-blur-sm border border-[#2A3342]">
          {/* Previous step */}
          <button
            onClick={previousStep}
            disabled={isFirstStep}
            className="p-2 rounded-lg hover:bg-[#1A2332] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <SkipBack className="w-4 h-4 text-[#E8E3DB]" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={isComplete ? () => goToStep(0) : togglePause}
            className="p-3 rounded-lg bg-[#C8A84E] hover:bg-[#D4B96A] transition-colors"
          >
            {isComplete ? (
              <RotateCcw className="w-5 h-5 text-[#0A0F1A]" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 text-[#0A0F1A]" />
            ) : (
              <Play className="w-5 h-5 text-[#0A0F1A]" />
            )}
          </button>

          {/* Next step */}
          <button
            onClick={nextStep}
            disabled={isLastStep}
            className="p-2 rounded-lg hover:bg-[#1A2332] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <SkipForward className="w-4 h-4 text-[#E8E3DB]" />
          </button>
        </div>
      </motion.div>

      {/* Progress dots - bottom */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70]"
      >
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0A0F1A]/80 backdrop-blur-sm border border-[#2A3342]">
          {currentJourney.steps.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStepIndex
                  ? 'bg-[#C8A84E] scale-125'
                  : index < currentStepIndex
                  ? 'bg-[#2EC4B6]'
                  : 'bg-[#2A3342]'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Journey complete overlay */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[65] flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', damping: 25 }}
            className="bg-[#0A0F1A]/95 backdrop-blur-xl rounded-2xl border border-[#2A3342] p-8 max-w-md mx-4 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#C8A84E]/20 flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
            <h3
              className="text-2xl font-bold text-[#F5F0E8] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Journey Complete
            </h3>
            <p className="text-[#E8E3DB] opacity-80 mb-6">
              You have experienced &ldquo;{currentJourney.title}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => goToStep(0)}
                className="px-4 py-2.5 rounded-lg border border-[#2A3342] text-[#E8E3DB] hover:bg-[#1A2332] transition-colors"
              >
                Watch Again
              </button>
              <button
                onClick={endJourney}
                className="px-4 py-2.5 rounded-lg bg-[#C8A84E] text-[#0A0F1A] font-medium hover:bg-[#D4B96A] transition-colors"
              >
                Explore Map
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
