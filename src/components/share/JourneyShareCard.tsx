'use client';

/**
 * Shareable Journey Completion Card
 * Beautiful card design for sharing completed journey on social media
 */

import { forwardRef } from 'react';
import { Clock, MapPin, Sparkles } from 'lucide-react';
import { Journey } from '@/data/journeys';

interface JourneyShareCardProps {
  journey: Journey;
}

export const JourneyShareCard = forwardRef<HTMLDivElement, JourneyShareCardProps>(
  function JourneyShareCard({ journey }, ref) {
    const accentColor = journey.accentColor;

    // Get unique locations from journey steps
    const locations = new Set<string>();
    journey.steps.forEach((step) => {
      if (step.highlightEvents?.length) {
        locations.add(step.highlightEvents[0]);
      }
    });

    // Get highlighted surahs
    const surahs = new Set<number>();
    journey.steps.forEach((step) => {
      step.highlightSurahs?.forEach((num) => surahs.add(num));
    });

    return (
      <div
        ref={ref}
        className="w-[400px] p-6 rounded-2xl overflow-hidden relative"
        style={{
          background: `linear-gradient(135deg, #0A0F1A 0%, #1A2332 100%)`,
          border: `2px solid ${accentColor}40`,
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl"
          style={{ backgroundColor: accentColor }}
        />

        {/* Completion badge */}
        <div className="flex items-center justify-center mb-6">
          <div
            className="px-4 py-2 rounded-full flex items-center gap-2"
            style={{
              backgroundColor: `${accentColor}20`,
              border: `1px solid ${accentColor}40`,
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
            <span
              className="text-sm font-medium"
              style={{ color: accentColor }}
            >
              Journey Complete
            </span>
          </div>
        </div>

        {/* Journey title */}
        <h2
          className="text-2xl font-bold text-[#F5F0E8] text-center mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {journey.title}
        </h2>
        <p className="text-sm text-[#E8E3DB] opacity-70 text-center mb-6">
          {journey.subtitle}
        </p>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div
            className="p-3 rounded-xl text-center"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <Clock
              className="w-5 h-5 mx-auto mb-1"
              style={{ color: accentColor }}
            />
            <p className="text-lg font-bold text-[#F5F0E8]">
              {journey.duration}
            </p>
            <p className="text-xs text-[#E8E3DB] opacity-60">Duration</p>
          </div>
          <div
            className="p-3 rounded-xl text-center"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <MapPin
              className="w-5 h-5 mx-auto mb-1"
              style={{ color: accentColor }}
            />
            <p className="text-lg font-bold text-[#F5F0E8]">
              {journey.steps.length}
            </p>
            <p className="text-xs text-[#E8E3DB] opacity-60">Moments</p>
          </div>
          <div
            className="p-3 rounded-xl text-center"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <Sparkles
              className="w-5 h-5 mx-auto mb-1"
              style={{ color: accentColor }}
            />
            <p className="text-lg font-bold text-[#F5F0E8]">
              {surahs.size || '—'}
            </p>
            <p className="text-xs text-[#E8E3DB] opacity-60">Surahs</p>
          </div>
        </div>

        {/* Journey description */}
        <p className="text-sm text-[#E8E3DB] opacity-80 text-center leading-relaxed mb-6">
          {journey.description}
        </p>

        {/* Divider */}
        <div
          className="h-px w-full mb-4"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accentColor}50 50%, transparent 100%)`,
          }}
        />

        {/* Footer branding */}
        <div className="flex items-center justify-between">
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
