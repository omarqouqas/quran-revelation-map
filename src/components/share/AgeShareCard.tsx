'use client';

/**
 * Shareable Age Exploration Card
 * Beautiful card showing what was happening at the Prophet's age matching user's age
 */

import { forwardRef } from 'react';
import { ArrowRight, MapPin, BookOpen } from 'lucide-react';
import { HistoricalEvent } from '@/data/events';
import { CompleteSurahData } from '@/data/surah-locations';

/** Get Arabic title for life stage */
function getArabicTitle(title: string): string {
  const arabicTitles: Record<string, string> = {
    'Before Prophethood': 'قبل النبوة',
    'The First Revelation': 'نزول الوحي الأول',
    'The Makkan Period': 'العهد المكي',
    'The Hijra': 'الهجرة النبوية',
    'The Year of Hijra': 'الهجرة النبوية',
    'The Madinan Period': 'العهد المدني',
    'The Final Year': 'العام الأخير',
  };
  return arabicTitles[title] || '';
}

/** Get icon for life stage */
function getLifeStageIcon(title: string): string {
  const icons: Record<string, string> = {
    'Before Prophethood': '☪',
    'The First Revelation': '✦',
    'The Makkan Period': '🕋',
    'The Hijra': '🌙',
    'The Year of Hijra': '🌙',
    'The Madinan Period': '🕌',
    'The Final Year': '🤲',
  };
  return icons[title] || '✦';
}

interface AgeShareCardProps {
  age: number;
  year: number;
  lifeStage: {
    title: string;
    description: string;
  };
  events: HistoricalEvent[];
  surahs: CompleteSurahData[];
}

export const AgeShareCard = forwardRef<HTMLDivElement, AgeShareCardProps>(
  function AgeShareCard({ age, year, lifeStage, events, surahs }, ref) {
    // Accent color based on period (Makki = gold, Madani = teal)
    const isMadani = year >= 622;
    const accentColor = isMadani ? '#2EC4B6' : '#C8A84E';
    const accentColorLight = isMadani ? '#5EEAD4' : '#D4B96A';
    const arabicTitle = getArabicTitle(lifeStage.title);
    const icon = getLifeStageIcon(lifeStage.title);

    return (
      <div
        ref={ref}
        className="w-[400px] p-6 rounded-2xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #0A0F1A 0%, #1A2332 100%)`,
          border: `2px solid ${accentColor}40`,
          boxShadow: `0 0 40px ${accentColor}15, 0 4px 20px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute top-0 right-0 w-40 h-40 opacity-20 blur-3xl pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        {/* Age → Year equation */}
        <div
          className="flex items-center gap-4 p-4 rounded-xl mb-5"
          style={{
            background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
            border: `1px solid ${accentColor}30`,
          }}
        >
          <div className="flex-1">
            <div className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-1">
              At Age
            </div>
            <div
              className="text-4xl font-bold text-[#F5F0E8]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {age}
            </div>
          </div>

          <ArrowRight
            className="w-6 h-6 shrink-0"
            style={{ color: accentColor }}
          />

          <div className="text-right">
            <div className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-1">
              Year
            </div>
            <div
              className="text-4xl font-bold"
              style={{ color: accentColor, fontFamily: 'var(--font-heading)' }}
            >
              {year}
              <span className="text-lg font-normal opacity-60 ml-1">CE</span>
            </div>
          </div>
        </div>

        {/* Life Stage Hero */}
        <div className="mb-5">
          {/* Icon */}
          <div className="text-3xl mb-2">{icon}</div>

          {/* Arabic title */}
          {arabicTitle && (
            <div
              className="text-xl text-[#F5F0E8] opacity-40 mb-1"
              style={{ fontFamily: 'var(--font-arabic)' }}
              dir="rtl"
            >
              {arabicTitle}
            </div>
          )}

          {/* English title */}
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: accentColor, fontFamily: 'var(--font-heading)' }}
          >
            {lifeStage.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#E8E3DB] opacity-80 leading-relaxed">
            {lifeStage.description}
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-4"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accentColor}40 50%, transparent 100%)`,
          }}
        />

        {/* Events row */}
        {events.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-3.5 h-3.5" style={{ color: accentColorLight }} />
              <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide">
                Events
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {events.slice(0, 2).map((event) => (
                <span
                  key={event.id}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColorLight,
                    border: `1px solid ${accentColor}25`,
                  }}
                >
                  {event.name}
                </span>
              ))}
              {events.length > 2 && (
                <span className="px-2 py-1.5 text-xs text-[#E8E3DB] opacity-50">
                  +{events.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Surahs row */}
        {surahs.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-3.5 h-3.5" style={{ color: accentColorLight }} />
              <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide">
                Surahs Being Revealed
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {surahs.slice(0, 4).map((surah) => (
                <span
                  key={surah.number}
                  className="px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5"
                  style={{
                    backgroundColor: surah.isMeccan ? '#C8A84E12' : '#2EC4B612',
                    border: `1px solid ${surah.isMeccan ? '#C8A84E25' : '#2EC4B625'}`,
                  }}
                >
                  <span
                    className="w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center"
                    style={{
                      backgroundColor: surah.isMeccan ? '#C8A84E20' : '#2EC4B620',
                      color: surah.isMeccan ? '#C8A84E' : '#2EC4B6',
                    }}
                  >
                    {surah.number}
                  </span>
                  <span className="text-[#E8E3DB]">{surah.englishName}</span>
                </span>
              ))}
              {surahs.length > 4 && (
                <span className="px-2 py-1 text-xs text-[#E8E3DB] opacity-50">
                  +{surahs.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

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
