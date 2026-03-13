'use client';

/**
 * Slide-in panel showing detailed information about a selected surah
 * Redesigned for educational depth and visual clarity
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  MapPin,
  Calendar,
  Hash,
  Play,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { useMapStore } from '@/stores/useMapStore';
import { getCompleteSurahData } from '@/data/surah-locations';
import { getTanzilNote } from '@/data/tanzil-notes';
import { getEventsForSurah } from '@/data/events';
import { getOpeningVerse } from '@/data/opening-verses';
import { getSurahMeaning } from '@/lib/quran-data';
import { cn } from '@/lib/utils';

export function SurahDetailPanel() {
  const selectedSurahNumber = useMapStore((state) => state.selectedSurahNumber);
  const selectSurah = useMapStore((state) => state.selectSurah);
  const selectEvent = useMapStore((state) => state.selectEvent);
  const setCurrentYear = useMapStore((state) => state.setCurrentYear);
  const [showAllEvents, setShowAllEvents] = useState(false);

  // Close on Escape key
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

  // Reset events expansion when surah changes
  useEffect(() => {
    setShowAllEvents(false);
  }, [selectedSurahNumber]);

  // Get surah data
  const surah = selectedSurahNumber ? getCompleteSurahData(selectedSurahNumber) : null;
  const tanzilNote = selectedSurahNumber ? getTanzilNote(selectedSurahNumber) : '';
  const relatedEvents = selectedSurahNumber ? getEventsForSurah(selectedSurahNumber) : [];
  const englishMeaning = selectedSurahNumber ? getSurahMeaning(selectedSurahNumber) : '';
  const openingVerse = selectedSurahNumber ? getOpeningVerse(selectedSurahNumber) : undefined;

  const isMakki = surah?.isMeccan;
  const accentColor = isMakki ? '#C8A84E' : '#2EC4B6';
  const accentColorLight = isMakki ? '#D4B96A' : '#5EEAD4';

  // Quran.com URL
  const quranComUrl = selectedSurahNumber
    ? `https://quran.com/${selectedSurahNumber}`
    : '#';

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
              'w-full sm:w-[420px] max-w-full',
              'bg-[#0A0F1A]/95 backdrop-blur-xl',
              'border-l border-[#2A3342]',
              'overflow-y-auto'
            )}
          >
            {/* Header with gradient accent */}
            <div
              className="sticky top-0 z-10 border-b border-[#2A3342]"
              style={{
                background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 50%), linear-gradient(180deg, #0A0F1A 0%, rgba(10, 15, 26, 0.95) 100%)`,
              }}
            >
              {/* Close button */}
              <button
                onClick={() => selectSurah(null)}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-[#2A3342] transition-colors z-10"
                aria-label="Close panel"
              >
                <X className="w-5 h-5 text-[#E8E3DB]" />
              </button>

              {/* Surah header */}
              <div className="px-6 pt-5 pb-4">
                <div className="flex items-start gap-4">
                  {/* Number badge */}
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-2xl text-xl font-bold shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColorLight} 100%)`,
                      color: '#0A0F1A',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {surah.number}
                  </div>

                  {/* Names */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h2
                      className="text-4xl text-[#F5F0E8] leading-tight mb-1"
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
                    <p className="text-sm text-[#E8E3DB] opacity-50 italic">
                      "{englishMeaning}"
                    </p>
                  </div>
                </div>

                {/* Quick stats row */}
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    <span className="text-[#E8E3DB] opacity-70">{surah.ayahCount} ayat</span>
                  </div>
                  <div className="w-px h-3 bg-[#2A3342]" />
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    <span className="text-[#E8E3DB] opacity-70">~{surah.approximateYear} CE</span>
                  </div>
                  <div className="w-px h-3 bg-[#2A3342]" />
                  <div
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                    }}
                  >
                    <MapPin className="w-3 h-3" />
                    {surah.classification}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-6 pb-4 flex gap-3">
                <a
                  href={quranComUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: accentColor,
                    color: '#0A0F1A',
                  }}
                >
                  <BookOpen className="w-4 h-4" />
                  Read
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a
                  href={`https://quran.com/${selectedSurahNumber}?audio=7`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-[#1A2332]"
                  style={{
                    borderColor: `${accentColor}40`,
                    color: accentColor,
                  }}
                >
                  <Play className="w-4 h-4" />
                  Listen
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-8">
              {/* Opening Verse */}
              {openingVerse && (
                <section
                  className="p-5 rounded-xl border"
                  style={{
                    backgroundColor: `${accentColor}08`,
                    borderColor: `${accentColor}20`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
                    <h3
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: accentColor }}
                    >
                      Opening Verse
                    </h3>
                  </div>
                  <p
                    className="text-2xl text-[#F5F0E8] leading-loose text-right mb-4"
                    style={{ fontFamily: 'var(--font-arabic)' }}
                  >
                    {openingVerse.arabic}
                  </p>
                  <p className="text-sm text-[#E8E3DB] opacity-80 leading-relaxed italic">
                    "{openingVerse.translation}"
                  </p>
                  <p className="text-xs text-[#E8E3DB] opacity-50 mt-3">
                    — {openingVerse.ayah}
                  </p>
                </section>
              )}

              {/* Revelation order badge */}
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-[#E8E3DB]">
                  Revealed{' '}
                  <span className="font-semibold" style={{ color: accentColor }}>
                    {surah.revelationOrder}
                    {getOrdinalSuffix(surah.revelationOrder)}
                  </span>{' '}
                  in chronological order
                </span>
              </div>

              {/* Key themes */}
              <section>
                <h3
                  className="text-xs font-semibold text-[#E8E3DB] opacity-70 uppercase tracking-wider mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Key Themes
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {surah.themes.map((theme, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                        border: `1px solid ${accentColor}25`,
                      }}
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </section>

              {/* Historical context */}
              <section>
                <h3
                  className="text-xs font-semibold text-[#E8E3DB] opacity-70 uppercase tracking-wider mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Historical Context
                </h3>
                <p className="text-[15px] text-[#E8E3DB] opacity-85 leading-relaxed">
                  {surah.context}
                </p>
              </section>

              {/* Tanzil note */}
              {tanzilNote && (
                <section className="p-5 rounded-xl bg-[#1A2332] border border-[#2A3342]">
                  <h4
                    className="text-xs font-semibold text-[#F5F0E8] mb-3 flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    <BookOpen className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    Scholarly Note
                  </h4>
                  <p className="text-sm text-[#E8E3DB] opacity-75 leading-relaxed">
                    {tanzilNote}
                  </p>
                </section>
              )}

              {/* Related events */}
              {relatedEvents.length > 0 && (
                <section>
                  <h3
                    className="text-xs font-semibold text-[#E8E3DB] opacity-70 uppercase tracking-wider mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Related Events ({relatedEvents.length})
                  </h3>
                  <div className="space-y-2">
                    {(showAllEvents ? relatedEvents : relatedEvents.slice(0, 2)).map(
                      (event) => (
                        <button
                          key={event.id}
                          onClick={() => {
                            selectEvent(event.id);
                            setCurrentYear(event.year);
                          }}
                          className="w-full text-left p-3 rounded-xl bg-[#1A2332] border border-[#2A3342] hover:border-[#3A4352] transition-all hover:scale-[1.01] group"
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className="font-medium text-[#F5F0E8] text-sm group-hover:text-white"
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              {event.name}
                            </span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${accentColor}20`,
                                color: accentColor,
                              }}
                            >
                              {event.year} CE
                            </span>
                          </div>
                        </button>
                      )
                    )}

                    {relatedEvents.length > 2 && (
                      <button
                        onClick={() => setShowAllEvents(!showAllEvents)}
                        className="w-full flex items-center justify-center gap-1 py-2 text-xs font-medium transition-colors"
                        style={{ color: accentColor }}
                      >
                        {showAllEvents ? (
                          <>
                            Show less <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            Show {relatedEvents.length - 2} more{' '}
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </section>
              )}

              {/* Footer spacer */}
              <div className="h-6" />
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
