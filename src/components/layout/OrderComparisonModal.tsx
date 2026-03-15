'use client';

/**
 * Modal showing visual comparison of Quran order vs Revelation order
 * Helps users understand that surahs are not arranged chronologically
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Info } from 'lucide-react';
import { getAllCompleteSurahs } from '@/data/surah-locations';
import { useMapStore } from '@/stores/useMapStore';

interface OrderComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Get all surahs once
const allSurahs = getAllCompleteSurahs();

export function OrderComparisonModal({ isOpen, onClose }: OrderComparisonModalProps) {
  const [viewMode, setViewMode] = useState<'revelation' | 'quran'>('revelation');
  const selectSurah = useMapStore((state) => state.selectSurah);
  const setCurrentYear = useMapStore((state) => state.setCurrentYear);

  // Sort surahs based on view mode
  const sortedSurahs = useMemo(() => {
    return [...allSurahs].sort((a, b) => {
      if (viewMode === 'revelation') {
        return a.revelationOrder - b.revelationOrder;
      }
      return a.number - b.number;
    });
  }, [viewMode]);

  // Calculate some interesting stats
  const stats = useMemo(() => {
    const diffs = allSurahs.map(s => Math.abs(s.number - s.revelationOrder));
    const avgDiff = Math.round(diffs.reduce((a, b) => a + b, 0) / diffs.length);

    // Surahs with biggest position changes
    const biggestChanges = [...allSurahs]
      .sort((a, b) => Math.abs(b.number - b.revelationOrder) - Math.abs(a.number - a.revelationOrder))
      .slice(0, 5);

    return { avgDiff, biggestChanges };
  }, []);

  const handleSurahClick = (surahNumber: number, year: number) => {
    selectSurah(surahNumber);
    setCurrentYear(year);
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
            className="fixed inset-0 bg-black/70 z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-20 z-[101] bg-[#0A0F1A] rounded-2xl border border-[#2A3342] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A3342]">
              <div>
                <h2
                  className="text-xl font-bold text-[#F5F0E8]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Quran Order vs Revelation Order
                </h2>
                <p className="text-sm text-[#E8E3DB] opacity-60 mt-1">
                  The Quran is not arranged chronologically
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[#1A2332] transition-colors"
              >
                <X className="w-5 h-5 text-[#E8E3DB]" />
              </button>
            </div>

            {/* Info banner */}
            <div className="px-6 py-3 bg-[#1A2332] border-b border-[#2A3342] flex items-start gap-3">
              <Info className="w-5 h-5 text-[#C8A84E] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#E8E3DB] opacity-80">
                <span className="font-semibold text-[#C8A84E]">Did you know?</span>{' '}
                Surah Al-Alaq (96) was the first revealed but appears near the end of the Quran.
                On average, surahs moved <span className="font-semibold text-[#2EC4B6]">{stats.avgDiff} positions</span> from
                their revelation order to their Quran order.
              </p>
            </div>

            {/* View toggle */}
            <div className="px-6 py-3 border-b border-[#2A3342] flex items-center justify-between">
              <div className="flex items-center gap-2 bg-[#1A2332] rounded-lg p-1">
                <button
                  onClick={() => setViewMode('revelation')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'revelation'
                      ? 'bg-[#C8A84E] text-[#0A0F1A]'
                      : 'text-[#E8E3DB] hover:bg-[#2A3342]'
                  }`}
                >
                  By Revelation
                </button>
                <button
                  onClick={() => setViewMode('quran')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'quran'
                      ? 'bg-[#2EC4B6] text-[#0A0F1A]'
                      : 'text-[#E8E3DB] hover:bg-[#2A3342]'
                  }`}
                >
                  By Quran Order
                </button>
              </div>

              <div className="text-xs text-[#E8E3DB] opacity-50">
                Click any surah to view details
              </div>
            </div>

            {/* Surah grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                {sortedSurahs.map((surah, index) => {
                  const diff = surah.number - surah.revelationOrder;
                  const isMakki = surah.isMeccan;
                  const accentColor = isMakki ? '#C8A84E' : '#2EC4B6';

                  return (
                    <motion.button
                      key={surah.number}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.003, duration: 0.2 }}
                      onClick={() => handleSurahClick(surah.number, surah.approximateYear)}
                      className="p-3 rounded-xl border transition-all hover:scale-105 hover:shadow-lg text-left"
                      style={{
                        backgroundColor: `${accentColor}10`,
                        borderColor: `${accentColor}30`,
                      }}
                    >
                      {/* Position indicator */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-lg font-bold"
                          style={{ color: accentColor, fontFamily: 'var(--font-heading)' }}
                        >
                          {viewMode === 'revelation' ? surah.revelationOrder : surah.number}
                        </span>
                        {diff !== 0 && (
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                            style={{
                              backgroundColor: diff > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                              color: diff > 0 ? '#EF4444' : '#22C55E',
                            }}
                          >
                            {diff > 0 ? `+${diff}` : diff}
                          </span>
                        )}
                      </div>

                      {/* Surah name */}
                      <p
                        className="text-sm text-[#F5F0E8] font-medium truncate"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {surah.englishName}
                      </p>

                      {/* Order comparison */}
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-[#E8E3DB] opacity-60">
                        <span>Q:{surah.number}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                        <span>R:{surah.revelationOrder}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Footer with biggest changes */}
            <div className="px-6 py-4 border-t border-[#2A3342] bg-[#0A0F1A]">
              <p className="text-xs text-[#E8E3DB] opacity-50 mb-2">Biggest position changes:</p>
              <div className="flex flex-wrap gap-2">
                {stats.biggestChanges.map((surah) => {
                  const diff = Math.abs(surah.number - surah.revelationOrder);
                  return (
                    <button
                      key={surah.number}
                      onClick={() => handleSurahClick(surah.number, surah.approximateYear)}
                      className="px-3 py-1.5 rounded-lg bg-[#1A2332] border border-[#2A3342] hover:border-[#C8A84E] transition-colors text-xs"
                    >
                      <span className="text-[#F5F0E8] font-medium">{surah.englishName}</span>
                      <span className="text-[#C8A84E] ml-2">±{diff}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
