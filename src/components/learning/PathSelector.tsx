'use client';

/**
 * Learning Path Selector Modal
 * Displays available learning paths with progress indicators
 */

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, BookOpen, CheckCircle2, Play, Sunrise, Shield, Compass, Route, Users, Swords, Crown, Lock, Heart, ScrollText, GitCompare, Moon } from 'lucide-react';
import { learningPaths, LearningPath } from '@/data/learning-paths';
import { useLearningStore } from '@/stores/useLearningStore';

interface PathSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Map icon names to components */
const iconMap: Record<string, React.ElementType> = {
  Sunrise,
  Shield,
  Compass,
  Route,
  Users,
  Swords,
  Crown,
  BookOpen,
  Heart,
  ScrollText,
  GitCompare,
  Moon,
};

/** Single path card */
function PathCard({
  path,
  progress,
  onStart,
  onResume,
}: {
  path: LearningPath;
  progress: { completed: number; total: number; percentage: number };
  onStart: () => void;
  onResume: () => void;
}) {
  const IconComponent = iconMap[path.icon] || BookOpen;
  const hasStarted = progress.completed > 0;
  const isComplete = progress.total > 0 && progress.completed === progress.total;
  const hasLessons = path.lessons.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
    >
      <motion.button
        whileHover={{ scale: hasLessons ? 1.02 : 1, y: hasLessons ? -4 : 0 }}
        whileTap={{ scale: hasLessons ? 0.98 : 1 }}
        onClick={hasLessons ? (hasStarted ? onResume : onStart) : undefined}
        disabled={!hasLessons}
        className={`relative w-full p-6 rounded-2xl text-left transition-all overflow-hidden ${
          !hasLessons ? 'cursor-not-allowed grayscale' : ''
        }`}
        style={{
          background: hasLessons
            ? `linear-gradient(135deg, ${path.accentColor}15 0%, ${path.accentColor}05 100%)`
            : 'linear-gradient(135deg, #1A233220 0%, #1A233210 100%)',
          border: hasLessons ? `1px solid ${path.accentColor}30` : '1px solid #2A334240',
          opacity: hasLessons ? 1 : 0.6,
        }}
      >
        {/* Hover glow effect */}
        {hasLessons && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 50% 100%, ${path.accentColor}20 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Completion badge */}
        {isComplete && (
          <div className="absolute top-4 right-4">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
        )}

        {/* Icon and time badge */}
        <div className="relative flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${path.accentColor}20` }}
          >
            <IconComponent className="w-6 h-6" style={{ color: path.accentColor }} />
          </div>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${path.accentColor}20`,
              color: path.accentColor,
            }}
          >
            <Clock className="w-3 h-3" />
            {path.estimatedTime}
          </div>
        </div>

        {/* Title (English + Arabic) */}
        <h3
          className="text-lg font-bold text-[#F5F0E8] mb-0.5"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {path.title}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-base opacity-70"
            style={{
              fontFamily: 'var(--font-arabic)',
              color: hasLessons ? path.accentColor : '#9CA3AF',
              direction: 'rtl'
            }}
          >
            {path.arabicTitle}
          </span>
          <span className="text-[#E8E3DB] opacity-40">•</span>
          <span className="text-sm text-[#E8E3DB] opacity-60">{path.subtitle}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-[#E8E3DB] opacity-80 leading-relaxed mb-4">
          {path.description}
        </p>

        {/* Progress bar (if started) */}
        {hasStarted && !isComplete && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#E8E3DB] opacity-60">Progress</span>
              <span style={{ color: path.accentColor }}>
                {progress.completed}/{progress.total} lessons
              </span>
            </div>
            <div className="h-1.5 bg-[#1A2332] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress.percentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: path.accentColor }}
              />
            </div>
          </div>
        )}

        {/* Action indicator */}
        {hasLessons ? (
          <div
            className="relative flex items-center gap-2 text-sm font-medium"
            style={{ color: path.accentColor }}
          >
            {hasStarted ? (
              <>
                <Play className="w-4 h-4" />
                <span>{isComplete ? 'Review Path' : 'Continue Learning'}</span>
              </>
            ) : (
              <>
                <span>Start Learning</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-[#E8E3DB] opacity-50">
            <Lock className="w-3.5 h-3.5" />
            <span>Coming soon</span>
          </div>
        )}
      </motion.button>
    </motion.div>
  );
}

export function PathSelector({ isOpen, onClose }: PathSelectorProps) {
  const startPath = useLearningStore((s) => s.startPath);
  const resumePath = useLearningStore((s) => s.resumePath);
  const getPathProgress = useLearningStore((s) => s.getPathProgress);

  // Handle ESC key to close modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const handleStart = (pathId: string) => {
    startPath(pathId);
    onClose();
  };

  const handleResume = (pathId: string) => {
    resumePath(pathId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-[101] bg-[#0A0F1A] rounded-2xl border border-[#2A3342] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A3342]">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <BookOpen className="w-6 h-6 text-[#C8A84E]" />
                  <h2
                    className="text-2xl font-bold text-[#F5F0E8]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Learning Paths
                  </h2>
                </div>
                <p className="text-sm text-[#E8E3DB] opacity-60">
                  Structured courses through the revelation journey — learn at your own pace
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-[#1A2332] transition-colors"
              >
                <X className="w-5 h-5 text-[#E8E3DB]" />
              </button>
            </div>

            {/* Path grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningPaths.map((path, index) => (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <PathCard
                      path={path}
                      progress={getPathProgress(path.id)}
                      onStart={() => handleStart(path.id)}
                      onResume={() => handleResume(path.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer hint */}
            <div className="px-6 py-4 border-t border-[#2A3342] bg-[#0A0F1A]/80">
              <p className="text-xs text-[#E8E3DB] opacity-50 text-center">
                Your progress is saved automatically. Press ESC to close.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
