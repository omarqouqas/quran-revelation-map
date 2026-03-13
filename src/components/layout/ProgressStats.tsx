'use client';

/**
 * Progress statistics component showing exploration progress
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Flame, BookOpen, Calendar, RotateCcw, X, ChevronUp } from 'lucide-react';
import { useProgressStore } from '@/stores/useProgressStore';

export function ProgressStats() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  const exploredSurahs = useProgressStore((state) => state.exploredSurahs);
  const exploredEvents = useProgressStore((state) => state.exploredEvents);
  const getCurrentStreak = useProgressStore((state) => state.getCurrentStreak);
  const resetProgress = useProgressStore((state) => state.resetProgress);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const surahCount = exploredSurahs.length;
  const eventCount = exploredEvents.length;
  const streak = getCurrentStreak();
  const surahPercentage = Math.round((surahCount / 114) * 100);

  // Don't show if no progress
  if (surahCount === 0 && eventCount === 0) return null;

  return (
    <div className="absolute bottom-24 left-4 z-30">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-[#0A0F1A]/95 backdrop-blur-xl border border-[#2A3342] rounded-2xl p-5 w-72 shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#C8A84E]" />
                <h3
                  className="text-sm font-semibold text-[#F5F0E8]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Your Progress
                </h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-lg hover:bg-[#1A2332] transition-colors"
              >
                <X className="w-4 h-4 text-[#E8E3DB]" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-[#E8E3DB] mb-2">
                <span>Surahs Explored</span>
                <span className="text-[#C8A84E] font-semibold">{surahCount} / 114</span>
              </div>
              <div className="h-2 bg-[#1A2332] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${surahPercentage}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #C8A84E 0%, #2EC4B6 100%)',
                  }}
                />
              </div>
              <p className="text-xs text-[#E8E3DB] opacity-60 mt-1.5">
                {surahPercentage}% complete
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#1A2332] rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-[#C8A84E]" />
                  <span className="text-xs text-[#E8E3DB] opacity-70">Surahs</span>
                </div>
                <p className="text-xl font-bold text-[#F5F0E8]">{surahCount}</p>
              </div>
              <div className="bg-[#1A2332] rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="text-xs text-[#E8E3DB] opacity-70">Events</span>
                </div>
                <p className="text-xl font-bold text-[#F5F0E8]">{eventCount}</p>
              </div>
            </div>

            {/* Streak */}
            {streak > 0 && (
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#F59E0B]/10 to-transparent rounded-xl mb-4">
                <Flame className="w-6 h-6 text-[#F59E0B]" />
                <div>
                  <p className="text-sm font-semibold text-[#F5F0E8]">
                    {streak} day streak!
                  </p>
                  <p className="text-xs text-[#E8E3DB] opacity-60">
                    Keep exploring daily
                  </p>
                </div>
              </div>
            )}

            {/* Reset button */}
            <button
              onClick={() => {
                if (confirm('Reset all progress? This cannot be undone.')) {
                  resetProgress();
                  setIsExpanded(false);
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs text-[#E8E3DB] opacity-50 hover:opacity-100 transition-opacity"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Progress
            </button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-3 px-4 py-3 bg-[#1A2332]/90 backdrop-blur-sm border border-[#2A3342] rounded-xl hover:border-[#C8A84E]/50 transition-all shadow-lg group"
          >
            <div className="relative">
              <Trophy className="w-5 h-5 text-[#C8A84E]" />
              {streak > 0 && (
                <Flame className="w-3 h-3 text-[#F59E0B] absolute -top-1 -right-1" />
              )}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-[#F5F0E8]">
                {surahCount} / 114 Surahs
              </p>
              <p className="text-xs text-[#E8E3DB] opacity-60">
                {surahPercentage}% explored
              </p>
            </div>
            <ChevronUp className="w-4 h-4 text-[#E8E3DB] opacity-50 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
