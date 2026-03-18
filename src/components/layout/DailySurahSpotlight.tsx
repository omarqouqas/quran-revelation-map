'use client';

/**
 * Daily Surah Spotlight
 * Featured surah that changes daily, shown on the landing overlay
 */

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Calendar, MapPin } from 'lucide-react';
import { getCompleteSurahData } from '@/data/surah-locations';
import { getDailySurahNumber, getSpotlightDateString } from '@/lib/utils';
import { useMapStore } from '@/stores/useMapStore';

export function DailySurahSpotlight() {
  const selectSurah = useMapStore((s) => s.selectSurah);
  const setCurrentYear = useMapStore((s) => s.setCurrentYear);
  const setHasInteracted = useMapStore((s) => s.setHasInteracted);

  const surahNumber = getDailySurahNumber();
  const surah = getCompleteSurahData(surahNumber);
  const dateString = getSpotlightDateString();

  const isMakki = surah.isMeccan;
  const accentColor = isMakki ? '#C8A84E' : '#2EC4B6';

  const handleExplore = () => {
    setCurrentYear(surah.approximateYear);
    selectSurah(surahNumber);
    setHasInteracted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="pointer-events-auto"
    >
      <div
        className="relative max-w-md mx-auto rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 15, 26, 0.95) 0%, rgba(26, 35, 50, 0.95) 100%)',
          border: `1px solid ${accentColor}30`,
          boxShadow: `0 0 40px ${accentColor}10, 0 4px 20px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Header */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{
            background: `linear-gradient(90deg, ${accentColor}15 0%, transparent 100%)`,
            borderBottom: `1px solid ${accentColor}20`,
          }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Surah of the Day
            </span>
          </div>
          <span className="text-xs text-[#E8E3DB]/50">{dateString}</span>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Surah number and classification */}
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
                fontFamily: 'var(--font-heading)',
              }}
            >
              {surah.number}
            </div>
            <div
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
              }}
            >
              {surah.classification}
            </div>
          </div>

          {/* Arabic name */}
          <h3
            className="text-2xl text-[#F5F0E8] mb-1 text-right"
            style={{ fontFamily: 'var(--font-arabic)' }}
            dir="rtl"
          >
            {surah.arabicName}
          </h3>

          {/* English name and meaning */}
          <h4
            className="text-lg font-bold text-[#F5F0E8] mb-0.5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {surah.englishName}
          </h4>
          <p className="text-sm text-[#E8E3DB]/60 mb-3">
            &ldquo;{surah.englishMeaning}&rdquo;
          </p>

          {/* Stats */}
          <div className="flex items-center gap-3 mb-3 text-xs text-[#E8E3DB]/70">
            <div className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>{surah.ayahCount} verses</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>~{surah.approximateYear} CE</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>#{surah.revelationOrder} revealed</span>
            </div>
          </div>

          {/* Context preview */}
          <p className="text-sm text-[#E8E3DB]/80 leading-relaxed mb-4 line-clamp-2">
            {surah.context}
          </p>

          {/* Explore button */}
          <button
            onClick={handleExplore}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: accentColor,
              color: '#0A0F1A',
            }}
          >
            <span>Explore this Surah</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
