'use client';

/**
 * Narrative Card Component
 * Displays story text during cinematic journey playback
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JourneyStep } from '@/data/journeys';

interface NarrativeCardProps {
  step: JourneyStep | null;
  isPlaying: boolean;
  onStepComplete: () => void;
}

export function NarrativeCard({ step, isPlaying, onStepComplete }: NarrativeCardProps) {
  const [progress, setProgress] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  // Reset progress and completion state when step changes
  useEffect(() => {
    setProgress(0);
    setHasCompleted(false);
  }, [step?.id]);

  // Progress timer
  useEffect(() => {
    if (!step || !isPlaying || hasCompleted) return;

    const duration = step.narrative.duration * 1000; // Convert to ms
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;

    let timeoutId: NodeJS.Timeout | null = null;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setHasCompleted(true);
          // Delay slightly before advancing to next step
          timeoutId = setTimeout(onStepComplete, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [step, isPlaying, onStepComplete, hasCompleted]);

  if (!step) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-auto px-4 z-[60]"
      >
        <div className="bg-[#0A0F1A]/95 backdrop-blur-xl rounded-2xl border border-[#2A3342] overflow-hidden shadow-2xl">
          {/* Progress bar */}
          <div className="h-1 bg-[#1A2332]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C8A84E] to-[#2EC4B6]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: 'linear' }}
            />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {step.narrative.title && (
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg sm:text-xl font-bold text-[#C8A84E] mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {step.narrative.title}
              </motion.h3>
            )}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-[#F5F0E8] leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {step.narrative.text}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
