'use client';

/**
 * Shareable Event Card
 * Beautiful card design for sharing historical events on social media
 */

import { forwardRef } from 'react';
import { Calendar, BookOpen, Swords, Plane, Star, FileText, Milestone } from 'lucide-react';
import { HistoricalEvent } from '@/data/events';
import { getSurahByNumber } from '@/lib/quran-data';

interface EventShareCardProps {
  event: HistoricalEvent;
}

/** Get icon for event category */
function getEventIcon(event: HistoricalEvent) {
  const id = event.id;
  if (id.includes('badr') || id.includes('uhud') || id.includes('trench') || id.includes('hunayn') || id.includes('khaybar')) {
    return <Swords className="w-4 h-4" />;
  }
  if (id.includes('abyssinia') || id.includes('hijra') || id.includes('taif')) {
    return <Plane className="w-4 h-4" />;
  }
  if (id.includes('revelation') || id.includes('isra')) {
    return <Star className="w-4 h-4" />;
  }
  if (id.includes('hudaybiyyah') || id.includes('aqabah') || id.includes('constitution')) {
    return <FileText className="w-4 h-4" />;
  }
  return <Milestone className="w-4 h-4" />;
}

/** Get category label and color */
function getEventCategory(event: HistoricalEvent): { label: string; color: string } {
  const id = event.id;
  if (id.includes('badr') || id.includes('uhud') || id.includes('trench') || id.includes('hunayn') || id.includes('khaybar')) {
    return { label: 'Battle', color: '#EF4444' };
  }
  if (id.includes('abyssinia') || id.includes('hijra') || id.includes('taif')) {
    return { label: 'Migration', color: '#3B82F6' };
  }
  if (id.includes('revelation') || id.includes('isra')) {
    return { label: 'Revelation', color: '#F59E0B' };
  }
  if (id.includes('hudaybiyyah') || id.includes('aqabah') || id.includes('constitution')) {
    return { label: 'Treaty', color: '#10B981' };
  }
  return { label: 'Milestone', color: '#8B5CF6' };
}

export const EventShareCard = forwardRef<HTMLDivElement, EventShareCardProps>(
  function EventShareCard({ event }, ref) {
    const category = getEventCategory(event);
    const accentColor = category.color;

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

        {/* Category badge */}
        <div className="flex items-start justify-between mb-4 relative">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
            }}
          >
            {getEventIcon(event)}
            {category.label}
          </div>
        </div>

        {/* Event title */}
        <h2
          className="text-2xl font-bold text-[#F5F0E8] mb-2 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {event.name}
        </h2>

        {/* Arabic name */}
        {event.arabicName && (
          <p
            className="text-xl text-[#F5F0E8] opacity-70 mb-4 text-right"
            style={{ fontFamily: 'var(--font-arabic)' }}
            dir="rtl"
          >
            {event.arabicName}
          </p>
        )}

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
            <Calendar className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="text-sm text-[#E8E3DB]">
              {event.year} CE{event.endYear ? ` - ${event.endYear} CE` : ''}
            </span>
          </div>
          {event.relatedSurahNumbers.length > 0 && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
              style={{ backgroundColor: `${accentColor}10` }}
            >
              <BookOpen className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span className="text-sm text-[#E8E3DB]">
                {event.relatedSurahNumbers.length} related surah{event.relatedSurahNumbers.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-[#E8E3DB] opacity-80 leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Related Surahs */}
        {event.relatedSurahNumbers.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.relatedSurahNumbers.slice(0, 4).map((surahNumber) => {
              const surah = getSurahByNumber(surahNumber);
              if (!surah) return null;

              return (
                <span
                  key={surahNumber}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                    border: `1px solid ${accentColor}30`,
                  }}
                >
                  <span className="font-bold">{surahNumber}</span>
                  {surah.englishName}
                </span>
              );
            })}
            {event.relatedSurahNumbers.length > 4 && (
              <span
                className="px-2.5 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                }}
              >
                +{event.relatedSurahNumbers.length - 4} more
              </span>
            )}
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
