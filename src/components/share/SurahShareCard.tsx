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
        className="w-[400px] p-6 rounded-2xl relative"
        style={{
          background: `linear-gradient(135deg, #0A0F1A 0%, #1A2332 100%)`,
          border: `2px solid ${accentColor}40`,
          boxShadow: `0 0 40px ${accentColor}15, 0 4px 20px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-30 blur-3xl pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        {/* Header with surah number badge */}
        <div className="flex items-start justify-between mb-4 relative">
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
            className="px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
            }}
          >
            {surah.classification}
          </div>
        </div>

        {/* Arabic name - larger for better sharing visibility */}
        <h2
          className="text-4xl text-[#F5F0E8] mb-2 text-right leading-tight"
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
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: accentColorLight }} />
            <span className="text-sm text-[#E8E3DB]">
              {surah.ayahCount} verses
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <Calendar className="w-3.5 h-3.5" style={{ color: accentColorLight }} />
            <span className="text-sm text-[#E8E3DB]">
              ~{surah.approximateYear} CE
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <MapPin className="w-3.5 h-3.5" style={{ color: accentColorLight }} />
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
