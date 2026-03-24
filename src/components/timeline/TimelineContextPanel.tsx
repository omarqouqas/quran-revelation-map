'use client';

/**
 * Timeline Context Panel
 * Shows "What Was Happening" historical context for the current year
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, BookOpen, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { useMapStore } from '@/stores/useMapStore';
import { getPeriodForYear, getProphetAge } from '@/data/period-context';
import { getSurahsAroundYear } from '@/data/surah-locations';
import { getEventsByYear } from '@/data/events';
import { PeriodBadge } from './PeriodBadge';

export function TimelineContextPanel() {
  const currentYear = useMapStore((state) => state.currentYear);
  const hasInteracted = useMapStore((state) => state.hasInteracted);
  const [isExpanded, setIsExpanded] = useState(true);

  // Derive all values from currentYear
  const period = useMemo(() => getPeriodForYear(currentYear), [currentYear]);
  const prophetAge = useMemo(() => getProphetAge(currentYear), [currentYear]);
  const surahsThisPeriod = useMemo(() => getSurahsAroundYear(currentYear), [currentYear]);
  const eventsThisYear = useMemo(() => getEventsByYear(currentYear), [currentYear]);

  // Extract unique themes from surahs in this period
  const keyThemes = useMemo(() => {
    const themes = new Set<string>();
    surahsThisPeriod.forEach((s) => s.themes.forEach((t) => themes.add(t)));
    return Array.from(themes).slice(0, 4);
  }, [surahsThisPeriod]);

  // Only show after user interacts with timeline
  if (!hasInteracted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="w-full px-4 sm:px-8"
    >
      <div
        className="rounded-xl border overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(26, 35, 50, 0.95) 0%, rgba(10, 15, 26, 0.95) 100%)',
          borderColor: `${period.color}30`,
        }}
      >
        {/* Header - always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#1A2332]/50 transition-colors"
        >
          <div className="flex items-center gap-3 flex-wrap">
            {/* Year */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" style={{ color: period.color }} />
              <span
                className="font-bold"
                style={{ color: period.color, fontFamily: 'var(--font-heading)' }}
              >
                {currentYear} CE
              </span>
            </div>

            <span className="text-[#E8E3DB] opacity-30">•</span>

            {/* Prophet's age */}
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#E8E3DB] opacity-60" />
              <span className="text-sm text-[#E8E3DB] opacity-80">
                Age {prophetAge}
              </span>
            </div>

            <span className="text-[#E8E3DB] opacity-30">•</span>

            {/* Period badge */}
            <PeriodBadge period={period} size="sm" />
          </div>

          {/* Expand/collapse button */}
          <div
            className="p-1 rounded-lg transition-colors"
            style={{ backgroundColor: `${period.color}15` }}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" style={{ color: period.color }} />
            ) : (
              <ChevronDown className="w-4 h-4" style={{ color: period.color }} />
            )}
          </div>
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-4">
                {/* Divider */}
                <div
                  className="h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${period.color}30 50%, transparent 100%)`,
                  }}
                />

                {/* Context paragraph */}
                <p className="text-sm text-[#E8E3DB] opacity-85 leading-relaxed">
                  {period.context}
                </p>

                {/* Events this year */}
                {eventsThisYear.length > 0 && (
                  <div className="space-y-2">
                    {eventsThisYear.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-2 p-2.5 rounded-lg"
                        style={{
                          backgroundColor: `${period.color}10`,
                          border: `1px solid ${period.color}20`,
                        }}
                      >
                        <Sparkles
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: period.color }}
                        />
                        <div>
                          <p
                            className="text-sm font-medium"
                            style={{ color: period.color }}
                          >
                            {event.name}
                          </p>
                          {event.arabicName && (
                            <p
                              className="text-xs opacity-60"
                              style={{ fontFamily: 'var(--font-arabic)', color: period.color }}
                            >
                              {event.arabicName}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Stats row */}
                <div className="flex items-center gap-4 flex-wrap text-xs">
                  {/* Surahs count */}
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" style={{ color: period.color }} />
                    <span className="text-[#E8E3DB] opacity-80">
                      {surahsThisPeriod.length} surahs this period
                    </span>
                  </div>

                  {/* Key themes */}
                  {keyThemes.length > 0 && (
                    <>
                      <span className="text-[#E8E3DB] opacity-30">•</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[#E8E3DB] opacity-60">Themes:</span>
                        <span style={{ color: period.color }}>
                          {keyThemes.join(', ')}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
