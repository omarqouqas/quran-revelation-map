'use client';

/**
 * Narrative Card Component
 * Displays story text during cinematic journey playback
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JourneyStep } from '@/data/journeys';

interface NarrativeCardProps {
  step: JourneyStep | null;
  isPlaying: boolean;
  onStepComplete: () => void;
}

export function NarrativeCard({ step, isPlaying, onStepComplete }: NarrativeCardProps) {
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);
  const onStepCompleteRef = useRef(onStepComplete);

  // Keep callback ref updated in an effect
  useEffect(() => {
    onStepCompleteRef.current = onStepComplete;
  }, [onStepComplete]);

  // Track step ID to detect changes
  const stepId = step?.id;
  const prevStepIdRef = useRef<string | undefined>(undefined);

  // Progress timer - handles both reset and progress in one effect
  useEffect(() => {
    if (!step || !isPlaying) return;

    // Check if step changed - if so, reset progress
    const stepChanged = prevStepIdRef.current !== stepId;
    if (stepChanged) {
      prevStepIdRef.current = stepId;
      completedRef.current = false;
    }

    const duration = step.narrative.duration * 1000; // Convert to ms
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;

    // Start from 0 if step changed
    let currentProgress = 0;

    let timeoutId: NodeJS.Timeout | null = null;

    // Use setTimeout for initial reset to avoid synchronous setState warning
    const initialTimer = setTimeout(() => {
      if (stepChanged) {
        setProgress(0);
      }
    }, 0);

    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100 && !completedRef.current) {
        completedRef.current = true;
        clearInterval(timer);
        setProgress(100);
        // Delay slightly before advancing to next step
        timeoutId = setTimeout(() => {
          onStepCompleteRef.current();
        }, 500);
      } else if (!completedRef.current) {
        setProgress(Math.min(currentProgress, 100));
      }
    }, interval);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [step, isPlaying, stepId]);

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
