'use client';

/**
 * Slide-in panel showing detailed information about a selected surah
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, MapPin, Calendar, Hash, Info } from 'lucide-react';
import { useMapStore } from '@/stores/useMapStore';
import { getCompleteSurahData } from '@/data/surah-locations';
import { getTanzilNote } from '@/data/tanzil-notes';
import { getEventsForSurah } from '@/data/events';
import { getSurahMeaning } from '@/lib/quran-data';
import { cn } from '@/lib/utils';

export function SurahDetailPanel() {
  const selectedSurahNumber = useMapStore((state) => state.selectedSurahNumber);
  const selectSurah = useMapStore((state) => state.selectSurah);
  const setCurrentYear = useMapStore((state) => state.setCurrentYear);

  // Close on Escape key (only when panel is open)
  useEffect(() => {
    if (!selectedSurahNumber) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        selectSurah(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSurahNumber, selectSurah]);

  // Get surah data
  const surah = selectedSurahNumber
    ? getCompleteSurahData(selectedSurahNumber)
    : null;
  const tanzilNote = selectedSurahNumber
    ? getTanzilNote(selectedSurahNumber)
    : '';
  const relatedEvents = selectedSurahNumber
    ? getEventsForSurah(selectedSurahNumber)
    : [];
  const englishMeaning = selectedSurahNumber
    ? getSurahMeaning(selectedSurahNumber)
    : '';

  const isMakki = surah?.isMeccan;
  const accentColor = isMakki ? '#C8A84E' : '#2EC4B6';

  return (
    <AnimatePresence>
      {surah && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40 sm:hidden"
            onClick={() => selectSurah(null)}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'fixed right-0 top-0 h-full z-50',
              'w-full sm:w-[400px] max-w-full',
              'bg-[#0A0F1A]/95 backdrop-blur-xl',
              'border-l border-[#2A3342]',
              'overflow-y-auto'
            )}
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 px-6 py-5 border-b border-[#2A3342]"
              style={{
                background:
                  'linear-gradient(180deg, #0A0F1A 0%, rgba(10, 15, 26, 0.95) 100%)',
              }}
            >
              <button
                onClick={() => selectSurah(null)}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-[#2A3342] transition-colors"
                aria-label="Close panel"
              >
                <X className="w-5 h-5 text-[#E8E3DB]" />
              </button>

              <div className="flex items-start gap-4">
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-full text-lg font-semibold"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {surah.number}
                </div>
                <div className="flex-1 min-w-0">
                  <h2
                    className="text-3xl text-[#F5F0E8] leading-tight"
                    style={{ fontFamily: 'var(--font-arabic)' }}
                  >
                    {surah.arabicName}
                  </h2>
                  <p
                    className="text-lg text-[#E8E3DB]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {surah.englishName}
                  </p>
                  <p className="text-sm text-[#E8E3DB] opacity-60">
                    {englishMeaning}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5 space-y-6">
              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Hash
                    className="w-4 h-4 opacity-50"
                    style={{ color: accentColor }}
                  />
                  <span className="text-[#E8E3DB] opacity-70">
                    {surah.ayahCount} ayat
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar
                    className="w-4 h-4 opacity-50"
                    style={{ color: accentColor }}
                  />
                  <span className="text-[#E8E3DB] opacity-70">
                    ~{surah.approximateYear} CE
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen
                    className="w-4 h-4 opacity-50"
                    style={{ color: accentColor }}
                  />
                  <span className="text-[#E8E3DB] opacity-70">
                    Revealed {surah.revelationOrder}
                    {getOrdinalSuffix(surah.revelationOrder)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin
                    className="w-4 h-4 opacity-50"
                    style={{ color: accentColor }}
                  />
                  <span style={{ color: accentColor }}>
                    {surah.classification}
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
                {isMakki
                  ? 'Revealed in Makkah Period'
                  : 'Revealed in Madinah Period'}
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
                  {surah.themes.map((theme, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs bg-[#2A3342] text-[#E8E3DB]"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </section>

              {/* Historical context */}
              <section>
                <h3
                  className="text-sm font-medium text-[#F5F0E8] mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Historical Context
                </h3>
                <p className="text-sm text-[#E8E3DB] opacity-80 leading-relaxed">
                  {surah.context}
                </p>
              </section>

              {/* Tanzil note */}
              {tanzilNote && (
                <section>
                  <div className="p-4 rounded-lg bg-[#1A2332] border border-[#2A3342]">
                    <div className="flex items-start gap-3">
                      <Info
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: accentColor }}
                      />
                      <div>
                        <h4
                          className="text-xs font-medium text-[#F5F0E8] mb-1"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          Revelation Note
                        </h4>
                        <p className="text-xs text-[#E8E3DB] opacity-70 leading-relaxed">
                          {tanzilNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

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
                    {relatedEvents.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => setCurrentYear(event.year)}
                        className="w-full text-left p-3 rounded-lg bg-[#1A2332] border border-[#2A3342] hover:border-[#3A4352] transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="font-medium text-[#F5F0E8]"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {event.name}
                          </span>
                          <span
                            className="text-xs opacity-60"
                            style={{ color: accentColor }}
                          >
                            {event.year} CE
                          </span>
                        </div>
                        {event.arabicName && (
                          <p
                            className="text-xs text-[#E8E3DB] opacity-50 mb-1"
                            style={{ fontFamily: 'var(--font-arabic)' }}
                          >
                            {event.arabicName}
                          </p>
                        )}
                        <p className="text-xs text-[#E8E3DB] opacity-70 leading-relaxed">
                          {event.description}
                        </p>
                      </button>
                    ))}
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

/** Get ordinal suffix for a number */
function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
