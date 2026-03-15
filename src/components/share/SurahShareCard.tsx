'use client';

/**
 * Shareable Surah Card
 * Beautiful card design for sharing surah information on social media
 */

import { forwardRef } from 'react';
import { BookOpen, MapPin, Calendar } from 'lucide-react';
import { CompleteSurahData } from '@/data/surah-locations';

interface SurahShareCardProps {
  surah: CompleteSurahData;
}

export const SurahShareCard = forwardRef<HTMLDivElement, SurahShareCardProps>(
  function SurahShareCard({ surah }, ref) {
    const isMakki = surah.isMeccan;
    const accentColor = isMakki ? '#C8A84E' : '#2EC4B6';
    const accentColorLight = isMakki ? '#D4B96A' : '#5EEAD4';

    return (
      <div
        ref={ref}
        className="w-[400px] p-6 rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #0A0F1A 0%, #1A2332 100%)`,
          border: `2px solid ${accentColor}40`,
        }}
      >
        {/* Header with surah number badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
              fontFamily: 'var(--font-heading)',
            }}
          >
            {surah.number}
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
            }}
          >
            {surah.classification}
          </div>
        </div>

        {/* Arabic name */}
        <h2
          className="text-3xl text-[#F5F0E8] mb-1 text-right"
          style={{ fontFamily: 'var(--font-arabic)' }}
          dir="rtl"
        >
          {surah.arabicName}
        </h2>

        {/* English name and meaning */}
        <h3
          className="text-xl font-bold text-[#F5F0E8] mb-1"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {surah.englishName}
        </h3>
        <p className="text-sm text-[#E8E3DB] opacity-70 mb-4">
          &ldquo;{surah.englishMeaning}&rdquo;
        </p>

        {/* Divider */}
        <div
          className="h-px w-full mb-4"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accentColor}50 50%, transparent 100%)`,
          }}
        />

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" style={{ color: accentColorLight }} />
            <span className="text-sm text-[#E8E3DB]">
              {surah.ayahCount} verses
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: accentColorLight }} />
            <span className="text-sm text-[#E8E3DB]">
              ~{surah.approximateYear} CE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" style={{ color: accentColorLight }} />
            <span className="text-sm text-[#E8E3DB]">
              #{surah.revelationOrder} revealed
            </span>
          </div>
        </div>

        {/* Context */}
        <p className="text-sm text-[#E8E3DB] opacity-80 leading-relaxed mb-4">
          {surah.context}
        </p>

        {/* Themes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {surah.themes.slice(0, 3).map((theme) => (
            <span
              key={theme}
              className="px-2.5 py-1 rounded-full text-xs"
              style={{
                backgroundColor: `${accentColor}15`,
                color: accentColorLight,
                border: `1px solid ${accentColor}30`,
              }}
            >
              {theme}
            </span>
          ))}
        </div>

        {/* Footer branding */}
        <div
          className="pt-4 flex items-center justify-between"
          style={{
            borderTop: `1px solid ${accentColor}20`,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <span className="text-xs font-bold text-[#0A0F1A]">Q</span>
            </div>
            <span className="text-xs text-[#E8E3DB] opacity-60">
              Quran Revelation Map
            </span>
          </div>
          <span className="text-xs text-[#E8E3DB] opacity-40">
            quran-map.app
          </span>
        </div>
      </div>
    );
  }
);
