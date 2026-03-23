'use client';

/**
 * Lesson Navigation Component
 * Controls for navigating between lessons and marking completion
 */

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, Trophy } from 'lucide-react';
import {
  useLearningStore,
  useCurrentLesson,
  useCurrentPath,
  useIsFirstLesson,
  useIsLastLesson,
} from '@/stores/useLearningStore';

export function LessonNavigation() {
  const currentPath = useCurrentPath();
  const currentLesson = useCurrentLesson();
  const isFirstLesson = useIsFirstLesson();
  const isLastLesson = useIsLastLesson();

  const previousLesson = useLearningStore((s) => s.previousLesson);
  const nextLesson = useLearningStore((s) => s.nextLesson);
  const markLessonComplete = useLearningStore((s) => s.markLessonComplete);
  const isLessonCompleted = useLearningStore((s) => s.isLessonCompleted);
  const exitLearning = useLearningStore((s) => s.exitLearning);
  const getPathProgress = useLearningStore((s) => s.getPathProgress);

  if (!currentPath || !currentLesson) return null;

  const accentColor = currentPath.accentColor;
  const isCompleted = isLessonCompleted(currentLesson.id);
  const progress = getPathProgress(currentPath.id);
  const isPathComplete = progress.completed === progress.total && progress.total > 0;

  const handleComplete = () => {
    if (!isCompleted) {
      markLessonComplete();
    }
    if (!isLastLesson) {
      nextLesson();
    }
  };

  const handleFinishPath = () => {
    if (!isCompleted) {
      markLessonComplete();
    }
    exitLearning();
  };

  return (
    <div
      className="px-5 py-5 border-t border-[#2A3342]/50 bg-[#0A0F1A]"
      style={{
        boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Progress section */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#E8E3DB] opacity-50 uppercase tracking-wide">
            Path Progress
          </span>
          <span className="text-xs font-medium" style={{ color: accentColor }}>
            {progress.completed} of {progress.total} completed
          </span>
        </div>

        {/* Progress bar with segments */}
        <div className="flex gap-1">
          {Array.from({ length: progress.total }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i < progress.completed
                    ? accentColor
                    : `${accentColor}20`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={previousLesson}
          disabled={isFirstLesson}
          className={`p-3 rounded-xl transition-all ${
            isFirstLesson
              ? 'bg-[#1A2332]/50 opacity-30 cursor-not-allowed'
              : 'bg-[#1A2332] hover:bg-[#2A3342] active:scale-95'
          }`}
          title="Previous lesson"
        >
          <ChevronLeft className="w-5 h-5 text-[#E8E3DB]" />
        </button>

        {/* Main action button */}
        {isLastLesson ? (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFinishPath}
            className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-semibold transition-all"
            style={{
              background: isPathComplete
                ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                : `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
              color: '#0A0F1A',
              boxShadow: `0 4px 20px ${isPathComplete ? '#10B981' : accentColor}40`,
            }}
          >
            {isPathComplete ? (
              <>
                <Trophy className="w-5 h-5" />
                <span>Path Complete!</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Complete & Finish</span>
              </>
            )}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleComplete}
            className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-semibold transition-all"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
              color: '#0A0F1A',
              boxShadow: `0 4px 20px ${accentColor}40`,
            }}
          >
            {isCompleted ? (
              <>
                <span>Next Lesson</span>
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Complete & Continue</span>
              </>
            )}
          </motion.button>
        )}

        {/* Next button */}
        <button
          onClick={nextLesson}
          disabled={isLastLesson}
          className={`p-3 rounded-xl transition-all ${
            isLastLesson
              ? 'bg-[#1A2332]/50 opacity-30 cursor-not-allowed'
              : 'bg-[#1A2332] hover:bg-[#2A3342] active:scale-95'
          }`}
          title="Next lesson"
        >
          <ChevronRight className="w-5 h-5 text-[#E8E3DB]" />
        </button>
      </div>
    </div>
  );
}
