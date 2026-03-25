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
  Share2,
  History,
  Lightbulb,
  MessageCircle,
  Link2,
} from 'lucide-react';
import { useMapStore } from '@/stores/useMapStore';
import { getCompleteSurahData } from '@/data/surah-locations';
import { getTanzilNote } from '@/data/tanzil-notes';
import { getEventsForSurah } from '@/data/events';
import { getOpeningVerse } from '@/data/opening-verses';
import { getEnhancedSurahData } from '@/data/enhanced-surah-data';
import { getSurahMeaning, getSurahByNumber } from '@/lib/quran-data';
import { cn } from '@/lib/utils';
import { ShareModal } from '@/components/share';

export function SurahDetailPanel() {
  const selectedSurahNumber = useMapStore((state) => state.selectedSurahNumber);
  const selectSurah = useMapStore((state) => state.selectSurah);
  const selectEvent = useMapStore((state) => state.selectEvent);
  const setCurrentYear = useMapStore((state) => state.setCurrentYear);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

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

  // Reset events expansion when surah changes - intentional reset on prop change
  useEffect(() => {
    if (selectedSurahNumber !== null) {
      // Using RAF to avoid synchronous setState warning
      requestAnimationFrame(() => setShowAllEvents(false));
    }
  }, [selectedSurahNumber]);

  // Get surah data
  const surah = selectedSurahNumber ? getCompleteSurahData(selectedSurahNumber) : null;
  const tanzilNote = selectedSurahNumber ? getTanzilNote(selectedSurahNumber) : '';
  const relatedEvents = selectedSurahNumber ? getEventsForSurah(selectedSurahNumber) : [];
  const englishMeaning = selectedSurahNumber ? getSurahMeaning(selectedSurahNumber) : '';
  const openingVerse = selectedSurahNumber ? getOpeningVerse(selectedSurahNumber) : undefined;
  const enhancedData = selectedSurahNumber ? getEnhancedSurahData(selectedSurahNumber) : undefined;

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
                className="absolute right-5 top-5 p-2.5 rounded-full hover:bg-[#2A3342] transition-colors z-10"
                aria-label="Close panel"
              >
                <X className="w-5 h-5 text-[#E8E3DB]" />
              </button>

              {/* Surah header */}
              <div className="px-7 pt-6 pb-5">
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
                      &ldquo;{englishMeaning}&rdquo;
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
              <div className="px-7 pb-5 flex gap-3">
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
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-[#1A2332]"
                  style={{
                    borderColor: `${accentColor}40`,
                    color: accentColor,
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-7 py-8 space-y-10">
              {/* Opening Verse */}
              {openingVerse && (
                <section
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: `${accentColor}08`,
                    borderColor: `${accentColor}20`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
                    <h3
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: accentColor }}
                    >
                      Opening Verse
                    </h3>
                  </div>
                  <p
                    className="text-2xl text-[#F5F0E8] leading-loose text-right mb-5 pr-2"
                    style={{ fontFamily: 'var(--font-arabic)' }}
                  >
                    {openingVerse.arabic}
                  </p>
                  <p className="text-sm text-[#E8E3DB] opacity-80 leading-relaxed italic">
                    &ldquo;{openingVerse.translation}&rdquo;
                  </p>
                  <p className="text-xs text-[#E8E3DB] opacity-50 mt-4">
                    — {openingVerse.ayah}
                  </p>
                </section>
              )}

              {/* Order Comparison - Quran vs Revelation */}
              <section className="p-5 rounded-2xl bg-[#1A2332] border border-[#2A3342]">
                <h4
                  className="text-xs font-semibold text-[#E8E3DB] opacity-70 uppercase tracking-wider mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Order Comparison
                </h4>
                <div className="flex items-center justify-between gap-4">
                  {/* Quran Order */}
                  <div className="flex-1 text-center">
                    <p className="text-xs text-[#E8E3DB] opacity-60 mb-1">Quran Order</p>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: '#F5F0E8', fontFamily: 'var(--font-heading)' }}
                    >
                      {surah.number}
                      <span className="text-sm font-normal opacity-50">/114</span>
                    </p>
                  </div>

                  {/* Difference indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                      }}
                    >
                      {surah.number > surah.revelationOrder ? '↑' : surah.number < surah.revelationOrder ? '↓' : '='}
                      {Math.abs(surah.number - surah.revelationOrder)}
                    </div>
                    <p className="text-[10px] text-[#E8E3DB] opacity-40 mt-1">diff</p>
                  </div>

                  {/* Revelation Order */}
                  <div className="flex-1 text-center">
                    <p className="text-xs text-[#E8E3DB] opacity-60 mb-1">Revealed</p>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: accentColor, fontFamily: 'var(--font-heading)' }}
                    >
                      {surah.revelationOrder}
                      <span className="text-sm font-normal opacity-50">{getOrdinalSuffix(surah.revelationOrder)}</span>
                    </p>
                  </div>
                </div>

                {/* Insight text */}
                {Math.abs(surah.number - surah.revelationOrder) > 20 && (
                  <p className="text-xs text-[#E8E3DB] opacity-50 mt-3 text-center italic">
                    {surah.revelationOrder < surah.number
                      ? `Revealed early but placed near end of Quran`
                      : `Revealed later but placed near beginning of Quran`}
                  </p>
                )}
              </section>

              {/* Circumstances - Asbab al-Nuzul (when enhanced data available) */}
              {enhancedData && (
                <section
                  className="p-6 rounded-2xl border relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, #8B5CF608 0%, #0D121905 100%)`,
                    borderColor: '#8B5CF620',
                  }}
                >
                  {/* Accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                    style={{ backgroundColor: '#8B5CF6' }}
                  />
                  <div className="flex items-center gap-3 mb-5 pl-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#8B5CF620' }}
                    >
                      <History className="w-4 h-4 text-[#8B5CF6]" />
                    </div>
                    <h3
                      className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Circumstances of Revelation
                    </h3>
                  </div>
                  <p className="text-[15px] text-[#E8E3DB] opacity-90 leading-[1.8] pl-4">
                    {enhancedData.circumstances}
                  </p>
                </section>
              )}

              {/* Key themes - Enhanced version when available */}
              <section>
                <h3
                  className="text-xs font-semibold text-[#E8E3DB] opacity-70 uppercase tracking-wider mb-5"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Key Themes
                </h3>
                {enhancedData ? (
                  <div className="space-y-4">
                    {enhancedData.themes.map((theme, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-2xl border"
                        style={{
                          backgroundColor: `${accentColor}08`,
                          borderColor: `${accentColor}20`,
                        }}
                      >
                        <h4
                          className="font-semibold text-sm mb-3"
                          style={{ color: accentColor }}
                        >
                          {theme.title}
                        </h4>
                        <p className="text-sm text-[#E8E3DB] opacity-80 leading-[1.7]">
                          {theme.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {surah.themes.map((theme, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-xl text-xs font-medium"
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
                )}
              </section>

              {/* Learning Insights (when enhanced data available) */}
              {enhancedData && enhancedData.insights.length > 0 && (
                <section
                  className="p-6 rounded-2xl border relative overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg, #C8A84E12 0%, #C8A84E04 100%)`,
                    borderColor: '#C8A84E30',
                  }}
                >
                  {/* Large decorative icon */}
                  <div className="absolute -top-2 -right-2 opacity-10">
                    <Lightbulb className="w-24 h-24 text-[#C8A84E]" />
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <Lightbulb className="w-5 h-5 text-[#C8A84E]" />
                    <h3
                      className="text-xs font-semibold uppercase tracking-wider text-[#C8A84E]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Learning Insights
                    </h3>
                  </div>
                  <div className="space-y-5 relative z-10">
                    {enhancedData.insights.map((insight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4"
                      >
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5"
                          style={{
                            background: 'linear-gradient(135deg, #C8A84E30 0%, #C8A84E15 100%)',
                            color: '#C8A84E',
                          }}
                        >
                          {index + 1}
                        </span>
                        <p className="text-[15px] text-[#F5F0E8] leading-[1.8]">
                          {insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Historical context */}
              <section className="p-6 rounded-2xl bg-[#0D1219] border border-[#1E2736]">
                <h3
                  className="text-xs font-semibold text-[#E8E3DB] opacity-70 uppercase tracking-wider mb-5"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Historical Context
                </h3>
                <p className="text-[15px] text-[#E8E3DB] opacity-85 leading-[1.8]">
                  {surah.context}
                </p>
              </section>

              {/* Tanzil note */}
              {tanzilNote && (
                <section className="p-6 rounded-2xl bg-[#1A2332] border border-[#2A3342]">
                  <h4
                    className="text-xs font-semibold text-[#F5F0E8] mb-4 flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    <BookOpen className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    Scholarly Note
                  </h4>
                  <p className="text-sm text-[#E8E3DB] opacity-75 leading-[1.7]">
                    {tanzilNote}
                  </p>
                </section>
              )}

              {/* Related events */}
              {relatedEvents.length > 0 && (
                <section>
                  <h3
                    className="text-xs font-semibold text-[#E8E3DB] opacity-70 uppercase tracking-wider mb-5"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Related Events ({relatedEvents.length})
                  </h3>
                  <div className="space-y-3">
                    {(showAllEvents ? relatedEvents : relatedEvents.slice(0, 2)).map(
                      (event) => (
                        <button
                          key={event.id}
                          onClick={() => {
                            selectEvent(event.id);
                            setCurrentYear(event.year);
                          }}
                          className="w-full text-left p-4 rounded-2xl bg-[#1A2332] border border-[#2A3342] hover:border-[#3A4352] transition-all hover:scale-[1.01] group"
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className="font-medium text-[#F5F0E8] text-sm group-hover:text-white"
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              {event.name}
                            </span>
                            <span
                              className="text-xs px-2.5 py-1 rounded-full"
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
                        className="w-full flex items-center justify-center gap-1 py-3 text-xs font-medium transition-colors"
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

              {/* Reflection Prompts (when enhanced data available) */}
              {enhancedData && enhancedData.reflectionPrompts.length > 0 && (
                <section className="p-6 rounded-2xl bg-[#0D1219] border border-[#1E2736]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-[#1A2332] flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-[#E8E3DB] opacity-70" />
                    </div>
                    <h3
                      className="text-xs font-semibold uppercase tracking-wider text-[#E8E3DB] opacity-80"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Reflect
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {enhancedData.reflectionPrompts.map((prompt, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-xl bg-[#1A2332] border border-[#2A3342]"
                      >
                        <p className="text-[15px] text-[#E8E3DB] leading-[1.8] italic">
                          &ldquo;{prompt}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Surahs (when enhanced data available) */}
              {enhancedData && enhancedData.relatedSurahs && enhancedData.relatedSurahs.length > 0 && (
                <section>
                  <h3
                    className="text-xs font-semibold text-[#E8E3DB] opacity-70 uppercase tracking-wider mb-5 flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    <Link2 className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    Related Surahs
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {enhancedData.relatedSurahs.map((relatedNumber) => {
                      const relatedInfo = getSurahByNumber(relatedNumber);
                      return (
                        <button
                          key={relatedNumber}
                          onClick={() => selectSurah(relatedNumber)}
                          className="flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all hover:scale-[1.02]"
                          style={{
                            backgroundColor: `${accentColor}10`,
                            borderColor: `${accentColor}30`,
                          }}
                        >
                          <span
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
                            style={{
                              backgroundColor: `${accentColor}25`,
                              color: accentColor,
                            }}
                          >
                            {relatedNumber}
                          </span>
                          <div className="text-left">
                            <p className="text-sm font-medium text-[#F5F0E8]">
                              {relatedInfo?.englishName || `Surah ${relatedNumber}`}
                            </p>
                            <p
                              className="text-xs opacity-60"
                              style={{ fontFamily: 'var(--font-arabic)', color: accentColor }}
                            >
                              {relatedInfo?.arabicName || ''}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Footer spacer */}
              <div className="h-10" />
            </div>
          </motion.aside>

          {/* Share Modal */}
          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            content={{ type: 'surah', surah }}
          />
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
