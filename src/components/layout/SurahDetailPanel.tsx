'use client';

/**
 * Slide-in panel showing detailed information about a selected surah
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, MapPin, Calendar, Hash } from 'lucide-react';
import { useMapStore } from '@/stores/useMapStore';
import { getEventById } from '@/data/events';
import { getLocationById } from '@/data/locations';
import { cn } from '@/lib/utils';

export function SurahDetailPanel() {
  const selectedSurah = useMapStore((state) => state.selectedSurah);
  const setSelectedSurah = useMapStore((state) => state.setSelectedSurah);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSurah(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedSurah]);

  const isMakki = selectedSurah?.classification === 'Makki';
  const accentColor = isMakki ? '#C8A84E' : '#2DD4BF';

  // Get related events
  const relatedEvents = selectedSurah?.relatedEvents
    .map((id) => getEventById(id))
    .filter(Boolean) || [];

  return (
    <AnimatePresence>
      {selectedSurah && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40 sm:hidden"
            onClick={() => setSelectedSurah(null)}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'fixed right-0 top-0 h-full z-50',
              'w-full sm:w-96 max-w-full',
              'bg-[#0A0F1A]/95 backdrop-blur-xl',
              'border-l border-[#2A3342]',
              'overflow-y-auto'
            )}
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 px-6 py-5 border-b border-[#2A3342]"
              style={{ background: 'linear-gradient(180deg, #0A0F1A 0%, rgba(10, 15, 26, 0.95) 100%)' }}
            >
              <button
                onClick={() => setSelectedSurah(null)}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-[#2A3342] transition-colors"
                aria-label="Close panel"
              >
                <X className="w-5 h-5 text-[#E8E3DB]" />
              </button>

              <div className="flex items-start gap-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full text-lg font-semibold"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {selectedSurah.number}
                </div>
                <div className="flex-1 min-w-0">
                  <h2
                    className="text-2xl text-[#F5F0E8] leading-tight"
                    style={{ fontFamily: 'var(--font-arabic)' }}
                  >
                    {selectedSurah.arabicName}
                  </h2>
                  <p
                    className="text-lg text-[#E8E3DB]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {selectedSurah.englishName}
                  </p>
                  <p className="text-sm text-[#E8E3DB] opacity-60">
                    {selectedSurah.englishMeaning}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5 space-y-6">
              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Hash className="w-4 h-4 opacity-50" style={{ color: accentColor }} />
                  <span className="text-[#E8E3DB] opacity-70">
                    {selectedSurah.numberOfAyat} ayat
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 opacity-50" style={{ color: accentColor }} />
                  <span className="text-[#E8E3DB] opacity-70">
                    {selectedSurah.approximateYear} CE
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 opacity-50" style={{ color: accentColor }} />
                  <span className="text-[#E8E3DB] opacity-70">
                    Revelation #{selectedSurah.revelationOrder}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 opacity-50" style={{ color: accentColor }} />
                  <span style={{ color: accentColor }}>
                    {selectedSurah.classification}
                  </span>
                </div>
              </div>

              {/* Classification badge */}
              <div
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                }}
              >
                {isMakki ? 'Revealed in Makkah Period' : 'Revealed in Madinah Period'}
              </div>

              {/* Key themes */}
              <section>
                <h3
                  className="text-sm font-medium text-[#F5F0E8] mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Key Themes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSurah.keyThemes.map((theme, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs bg-[#2A3342] text-[#E8E3DB]"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </section>

              {/* Reason for revelation */}
              <section>
                <h3
                  className="text-sm font-medium text-[#F5F0E8] mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Context of Revelation
                </h3>
                <p className="text-sm text-[#E8E3DB] opacity-80 leading-relaxed">
                  {selectedSurah.reasonForRevelation}
                </p>
              </section>

              {/* Related events */}
              {relatedEvents.length > 0 && (
                <section>
                  <h3
                    className="text-sm font-medium text-[#F5F0E8] mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Related Events
                  </h3>
                  <div className="space-y-3">
                    {relatedEvents.map((event) => {
                      if (!event) return null;
                      const location = getLocationById(event.locationId);
                      return (
                        <div
                          key={event.id}
                          className="p-3 rounded-lg bg-[#1A2332] border border-[#2A3342]"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className="font-medium text-[#F5F0E8]"
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              {event.name}
                            </span>
                            <span className="text-xs opacity-60" style={{ color: accentColor }}>
                              {event.year} CE
                            </span>
                          </div>
                          {location && (
                            <p className="text-xs text-[#E8E3DB] opacity-50 mb-1">
                              {location.name}
                            </p>
                          )}
                          <p className="text-xs text-[#E8E3DB] opacity-70 leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
