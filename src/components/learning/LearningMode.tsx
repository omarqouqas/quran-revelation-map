'use client';

/**
 * Learning Mode Component
 * Main wrapper for the learning experience - displays lesson viewer and navigation
 */

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import { useLearningStore, useCurrentPath, useCurrentLesson } from '@/stores/useLearningStore';
import { useMapStore } from '@/stores/useMapStore';
import { LessonViewer } from './LessonViewer';
import { LessonNavigation } from './LessonNavigation';

export function LearningMode() {
  const isLearningMode = useLearningStore((s) => s.isLearningMode);
  const currentPath = useCurrentPath();
  const currentLesson = useCurrentLesson();
  const exitLearning = useLearningStore((s) => s.exitLearning);
  const learningLocation = useLearningStore((s) => s.learningLocation);
  const highlightedSurahs = useLearningStore((s) => s.highlightedSurahs);

  // Map store actions for syncing
  const setCurrentYear = useMapStore((s) => s.setCurrentYear);
  const setHighlightedSurahs = useMapStore((s) => s.setHighlightedSurahs);
  const setHasInteracted = useMapStore((s) => s.setHasInteracted);

  // Sync map year and highlights when lesson changes
  useEffect(() => {
    if (!isLearningMode || !currentLesson) return;

    const highlights = currentLesson.mapHighlights;

    // Set year
    if (highlights.year) {
      setCurrentYear(highlights.year);
    }

    // Set highlighted surahs
    if (highlights.surahNumbers && highlights.surahNumbers.length > 0) {
      setHighlightedSurahs(highlights.surahNumbers);
    }

    // Mark as interacted
    setHasInteracted(true);

    return () => {
      // Clear highlights when unmounting
      setHighlightedSurahs([]);
    };
  }, [currentLesson, isLearningMode, setCurrentYear, setHighlightedSurahs, setHasInteracted]);

  // Handle ESC key to exit
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        exitLearning();
      }
    },
    [exitLearning]
  );

  useEffect(() => {
    if (!isLearningMode) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLearningMode, handleKeyDown]);

  if (!isLearningMode || !currentPath || !currentLesson) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLearningMode && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-full sm:w-[480px] z-[85] flex flex-col bg-[#0A0F1A] border-l border-[#2A3342]"
          style={{
            boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A3342] bg-[#0A0F1A]">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${currentPath.accentColor}20` }}
              >
                <BookOpen className="w-4 h-4" style={{ color: currentPath.accentColor }} />
              </div>
              <span className="text-sm font-medium text-[#E8E3DB]">Learning Mode</span>
            </div>
            <button
              onClick={exitLearning}
              className="p-2 rounded-lg hover:bg-[#1A2332] transition-colors"
              title="Exit learning mode (ESC)"
            >
              <X className="w-5 h-5 text-[#E8E3DB]" />
            </button>
          </div>

          {/* Lesson content */}
          <div className="flex-1 overflow-hidden">
            <LessonViewer />
          </div>

          {/* Navigation controls */}
          <LessonNavigation />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
