'use client';

/**
 * Shareable Sacred Site Card
 * Beautiful card design for sharing sacred sites on social media
 */

import { forwardRef } from 'react';
import { MapPin, BookOpen, Calendar, Star, Sun, Shield, Compass } from 'lucide-react';
import { SacredSite, SACRED_SITE_STYLES } from '@/data/sacred-sites';
import { getSurahsByLocation } from '@/data/surah-locations';
import { getEventById } from '@/data/events';

interface SacredSiteShareCardProps {
  site: SacredSite;
}

/** Get icon for site category */
function getSiteIcon(category: SacredSite['category']) {
  switch (category) {
    case 'holy':
      return <Star className="w-4 h-4" />;
    case 'revelation':
      return <Sun className="w-4 h-4" />;
    case 'battle':
      return <Shield className="w-4 h-4" />;
    case 'journey':
      return <Compass className="w-4 h-4" />;
  }
}

export const SacredSiteShareCard = forwardRef<HTMLDivElement, SacredSiteShareCardProps>(
  function SacredSiteShareCard({ site }, ref) {
    // Defensive check for site data
    if (!site || !site.category) {
      return (
        <div ref={ref} className="w-[400px] p-6 rounded-2xl bg-[#0A0F1A] text-white">
          Error: Invalid site data
        </div>
      );
    }

    const style = SACRED_SITE_STYLES[site.category];
    if (!style) {
      return (
        <div ref={ref} className="w-[400px] p-6 rounded-2xl bg-[#0A0F1A] text-white">
          Error: Unknown site category
        </div>
      );
    }

    const accentColor = style.color;

    // Get related data (cache the full list to avoid multiple calls)
    const allRelatedSurahs = site.locationKey ? getSurahsByLocation(site.locationKey) : [];
    const relatedSurahs = allRelatedSurahs.slice(0, 4);
    const moreSurahsCount = Math.max(0, allRelatedSurahs.length - 4);
    const relatedEvents = (site.relatedEventIds || [])
      .map(id => getEventById(id))
      .filter((e): e is NonNullable<typeof e> => e !== undefined)
      .slice(0, 3);

    return (
      <div
        ref={ref}
        className="w-[400px] p-6 rounded-2xl relative"
        style={{
          background: `linear-gradient(135deg, #0A0F1A 0%, #1A2332 100%)`,
          border: `2px solid ${accentColor}40`,
          boxShadow: `0 0 40px ${style.glowColor}, 0 4px 20px rgba(0,0,0,0.3)`,
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
            {getSiteIcon(site.category)}
            {style.label}
          </div>
        </div>

        {/* Site title */}
        <h2
          className="text-2xl font-bold text-[#F5F0E8] mb-2 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {site.name}
        </h2>

        {/* Arabic name */}
        <p
          className="text-xl text-[#F5F0E8] opacity-70 mb-4 text-right"
          style={{ fontFamily: 'var(--font-arabic)' }}
          dir="rtl"
        >
          {site.arabicName}
        </p>

        {/* Divider */}
        <div
          className="h-px w-full mb-4"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accentColor}50 50%, transparent 100%)`,
          }}
        />

        {/* Coordinates */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <MapPin className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="text-sm text-[#E8E3DB]">
              {site.lat.toFixed(4)}°N, {site.lng.toFixed(4)}°E
            </span>
          </div>
          {allRelatedSurahs.length > 0 && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
              style={{ backgroundColor: `${accentColor}10` }}
            >
              <BookOpen className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span className="text-sm text-[#E8E3DB]">
                {allRelatedSurahs.length} surahs
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-[#E8E3DB] opacity-80 leading-relaxed mb-4">
          {site.description}
        </p>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-xs text-[#E8E3DB]/60 uppercase tracking-wide">
              <Calendar className="w-3 h-3" />
              Historical Events
            </div>
            <div className="flex flex-wrap gap-2">
              {relatedEvents.map((event) => (
                <span
                  key={event.id}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                    border: `1px solid ${accentColor}30`,
                  }}
                >
                  {event.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Surahs */}
        {relatedSurahs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {relatedSurahs.map((surah) => (
              <span
                key={surah.number}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                }}
              >
                <span className="font-bold">{surah.number}</span>
                {surah.englishName}
              </span>
            ))}
            {moreSurahsCount > 0 && (
              <span
                className="px-2.5 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                }}
              >
                +{moreSurahsCount} more
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
