'use client';

/**
 * Lesson Navigation Component
 * Controls for navigating between lessons and marking completion
 */

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, List } from 'lucide-react';
import {
  useLearningStore,
  useCurrentLesson,
  useCurrentPath,
  useIsFirstLesson,
  useIsLastLesson,
} from '@/stores/useLearningStore';

interface LessonNavigationProps {
  onShowOutline?: () => void;
}

export function LessonNavigation({ onShowOutline }: LessonNavigationProps) {
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
      className="px-6 py-4 border-t border-[#2A3342] bg-[#0A0F1A]/95 backdrop-blur-sm"
      style={{
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[#E8E3DB] opacity-60">Path Progress</span>
          <span style={{ color: accentColor }}>
            {progress.completed}/{progress.total} lessons completed
          </span>
        </div>
        <div className="h-1 bg-[#1A2332] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress.percentage}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-3">
        {/* Outline button (optional) */}
        {onShowOutline && (
          <button
            onClick={onShowOutline}
            className="p-3 rounded-xl bg-[#1A2332] hover:bg-[#2A3342] transition-colors"
            title="Show lesson outline"
          >
            <List className="w-5 h-5 text-[#E8E3DB]" />
          </button>
        )}

        {/* Previous button */}
        <button
          onClick={previousLesson}
          disabled={isFirstLesson}
          className={`p-3 rounded-xl transition-colors ${
            isFirstLesson
              ? 'bg-[#1A2332] opacity-40 cursor-not-allowed'
              : 'bg-[#1A2332] hover:bg-[#2A3342]'
          }`}
          title="Previous lesson"
        >
          <ChevronLeft className="w-5 h-5 text-[#E8E3DB]" />
        </button>

        {/* Main action button */}
        {isLastLesson ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFinishPath}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-colors"
            style={{
              backgroundColor: isPathComplete ? '#10B981' : accentColor,
              color: '#0A0F1A',
            }}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{isPathComplete ? 'Path Complete!' : 'Complete & Finish'}</span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleComplete}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-colors"
            style={{
              backgroundColor: accentColor,
              color: '#0A0F1A',
            }}
          >
            {isCompleted ? (
              <>
                <span>Next Lesson</span>
                <ChevronRight className="w-5 h-5" />
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
          className={`p-3 rounded-xl transition-colors ${
            isLastLesson
              ? 'bg-[#1A2332] opacity-40 cursor-not-allowed'
              : 'bg-[#1A2332] hover:bg-[#2A3342]'
          }`}
          title="Next lesson"
        >
          <ChevronRight className="w-5 h-5 text-[#E8E3DB]" />
        </button>
      </div>
    </div>
  );
}
