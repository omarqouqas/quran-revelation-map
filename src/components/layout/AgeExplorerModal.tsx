'use client';

/**
 * Age Explorer Modal
 * Explore what was being revealed at the Prophet's age matching your current age
 */

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MapPin, BookOpen, Share2, ChevronRight, Sparkles } from 'lucide-react';
import { useMapStore } from '@/stores/useMapStore';
import { events } from '@/data/events';
import { getSurahsAroundYear } from '@/data/surah-locations';
import { ShareModal } from '@/components/share/ShareModal';

interface AgeExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Prophet's birth year (approximate) */
const PROPHET_BIRTH_YEAR = 570;

/** First revelation year */
const FIRST_REVELATION_YEAR = 610;

/** Last revelation year */
const LAST_REVELATION_YEAR = 632;

/** Convert user age to corresponding year in Prophet's life */
function ageToYear(age: number): number {
  const year = PROPHET_BIRTH_YEAR + age;
  return Math.min(LAST_REVELATION_YEAR, Math.max(FIRST_REVELATION_YEAR, year));
}

/** Life stage data with Arabic */
interface LifeStage {
  title: string;
  arabicTitle: string;
  description: string;
  icon: string;
}

/** Get life stage description based on age */
function getLifeStage(age: number): LifeStage {
  if (age < 40) {
    return {
      title: 'Before Prophethood',
      arabicTitle: 'قبل النبوة',
      description: `At age ${age}, Muhammad ﷺ was known as Al-Amin (The Trustworthy) in Makkah, living a life of contemplation and integrity.`,
      icon: '☪',
    };
  }
  if (age === 40) {
    return {
      title: 'The First Revelation',
      arabicTitle: 'نزول الوحي الأول',
      description: 'Angel Jibril appeared in Cave Hira with the first words: "Read in the name of your Lord who created."',
      icon: '✦',
    };
  }
  if (age <= 52) {
    return {
      title: 'The Makkan Period',
      arabicTitle: 'العهد المكي',
      description: `At age ${age}, the Prophet ﷺ was calling people to Islam while facing persecution from the Quraysh.`,
      icon: '🕋',
    };
  }
  if (age === 53) {
    return {
      title: 'The Hijra',
      arabicTitle: 'الهجرة النبوية',
      description: 'The Prophet ﷺ migrated from Makkah to Madinah, marking the beginning of the Islamic calendar.',
      icon: '🌙',
    };
  }
  if (age <= 62) {
    return {
      title: 'The Madinan Period',
      arabicTitle: 'العهد المدني',
      description: `At age ${age}, the Prophet ﷺ was building the Muslim community in Madinah and receiving new guidance.`,
      icon: '🕌',
    };
  }
  return {
    title: 'The Final Year',
    arabicTitle: 'العام الأخير',
    description: 'The Prophet ﷺ performed the Farewell Pilgrimage. The religion was perfected and completed.',
    icon: '🤲',
  };
}

export function AgeExplorerModal({ isOpen, onClose }: AgeExplorerModalProps) {
  const [age, setAge] = useState<number | ''>('');
  const [showResults, setShowResults] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const setCurrentYear = useMapStore((state) => state.setCurrentYear);
  const setHasInteracted = useMapStore((state) => state.setHasInteracted);

  // Calculate year and get data
  const calculatedYear = useMemo(() => {
    if (age === '' || age < 1) return null;
    return ageToYear(age);
  }, [age]);

  const yearEvents = useMemo(() => {
    if (!calculatedYear) return [];
    return events.filter(
      (event) => event.year <= calculatedYear && (event.endYear ? event.endYear >= calculatedYear : event.year === calculatedYear)
    );
  }, [calculatedYear]);

  const yearSurahs = useMemo(() => {
    if (!calculatedYear) return [];
    return getSurahsAroundYear(calculatedYear);
  }, [calculatedYear]);

  const lifeStage = useMemo(() => {
    if (age === '' || age < 1) return null;
    return getLifeStage(age);
  }, [age]);

  const handleAgeChange = (value: string) => {
    const num = parseInt(value, 10);
    if (value === '') {
      setAge('');
      setShowResults(false);
    } else if (!isNaN(num) && num >= 0 && num <= 100) {
      setAge(num);
      setShowResults(num >= 1);
    }
  };

  const handleExploreOnMap = useCallback(() => {
    if (calculatedYear) {
      setCurrentYear(calculatedYear);
      setHasInteracted(true);
      onClose();
    }
  }, [calculatedYear, setCurrentYear, setHasInteracted, onClose]);

  const handleClose = useCallback(() => {
    setAge('');
    setShowResults(false);
    setIsShareModalOpen(false);
    onClose();
  }, [onClose]);

  // Determine if age is in the revelation period
  const isInRevelationPeriod = age !== '' && age >= 40 && age <= 63;

  // Accent color based on period
  const accentColor = age !== '' && age >= 53 ? '#2EC4B6' : '#C8A84E';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 z-[80]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[90%] max-w-[480px] max-h-[80vh] bg-[#0A0F1A] rounded-2xl border-2 overflow-hidden z-[85] flex flex-col"
            style={{
              borderColor: `${accentColor}40`,
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${accentColor}20`,
            }}
          >
            {/* Header */}
            <div
              className="px-6 py-5 border-b border-[#2A3342] shrink-0"
              style={{
                background: `linear-gradient(135deg, ${accentColor}15, transparent)`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Explore by Age
                  </div>
                  <h2
                    className="text-xl font-bold text-[#F5F0E8]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    At Your Age, What Was Revealed?
                  </h2>
                </div>

                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg bg-[#1F2937] hover:bg-[#2A3342] transition-colors shrink-0"
                >
                  <X className="w-5 h-5 text-[#9CA3AF]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Age Input - Redesigned as equation */}
              <div className="mb-6">
                <div
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#1A2332] border border-[#2A3342]"
                >
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-1">
                      Your Age
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={age}
                      onChange={(e) => handleAgeChange(e.target.value)}
                      placeholder="40"
                      className="w-full bg-transparent text-3xl font-bold text-[#F5F0E8] placeholder:text-[#4B5563] focus:outline-none"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    />
                  </div>

                  {age !== '' && (
                    <>
                      <ArrowRight
                        className="w-6 h-6 shrink-0"
                        style={{ color: accentColor }}
                      />
                      <div className="text-right">
                        <div className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-1">
                          Year
                        </div>
                        <div
                          className="text-3xl font-bold"
                          style={{ color: accentColor, fontFamily: 'var(--font-heading)' }}
                        >
                          {calculatedYear}
                          <span className="text-base font-normal opacity-70 ml-1">CE</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {age !== '' && age < 40 && (
                  <p className="mt-2 text-xs text-[#E8E3DB] opacity-60 text-center">
                    Revelation began at age 40 — showing that pivotal moment
                  </p>
                )}
                {age !== '' && age > 63 && (
                  <p className="mt-2 text-xs text-[#E8E3DB] opacity-60 text-center">
                    The Prophet ﷺ passed at age 63 — showing his final year
                  </p>
                )}
              </div>

              {/* Results */}
              <AnimatePresence mode="wait">
                {showResults && lifeStage && calculatedYear && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {/* Hero Life Stage Card */}
                    <div
                      className="relative p-5 rounded-2xl overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}05)`,
                        border: `1px solid ${accentColor}40`,
                      }}
                    >
                      {/* Glow effect */}
                      <div
                        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30"
                        style={{ backgroundColor: accentColor }}
                      />

                      {/* Icon */}
                      <div className="text-3xl mb-3">{lifeStage.icon}</div>

                      {/* Arabic title */}
                      <div
                        className="text-2xl text-[#F5F0E8] opacity-40 mb-1"
                        style={{ fontFamily: 'var(--font-arabic)' }}
                        dir="rtl"
                      >
                        {lifeStage.arabicTitle}
                      </div>

                      {/* English title */}
                      <h3
                        className="text-xl font-bold mb-3"
                        style={{ color: accentColor, fontFamily: 'var(--font-heading)' }}
                      >
                        {lifeStage.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#E8E3DB] leading-relaxed relative">
                        {lifeStage.description}
                      </p>
                    </div>

                    {/* Events - Compact with Arabic */}
                    {isInRevelationPeriod && yearEvents.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
                          <MapPin className="w-3.5 h-3.5" />
                          Events at This Time
                        </h3>
                        <div className="space-y-2">
                          {yearEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className="flex items-center justify-between p-3 rounded-xl bg-[#1A2332] border border-[#2A3342]"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-[#F5F0E8] text-sm truncate">
                                  {event.name}
                                </div>
                                {event.arabicName && (
                                  <div
                                    className="text-xs text-[#E8E3DB] opacity-50 truncate"
                                    style={{ fontFamily: 'var(--font-arabic)' }}
                                    dir="rtl"
                                  >
                                    {event.arabicName}
                                  </div>
                                )}
                              </div>
                              <div
                                className="text-xs font-medium px-2 py-1 rounded-lg shrink-0 ml-3"
                                style={{
                                  backgroundColor: `${accentColor}15`,
                                  color: accentColor,
                                }}
                              >
                                {event.year} CE
                              </div>
                            </div>
                          ))}
                          {yearEvents.length > 2 && (
                            <button
                              onClick={handleExploreOnMap}
                              className="w-full text-xs text-center py-2 rounded-lg hover:bg-[#1A2332] transition-colors"
                              style={{ color: accentColor }}
                            >
                              View all {yearEvents.length} events on map →
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Surahs - Clean grid */}
                    {isInRevelationPeriod && yearSurahs.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
                          <BookOpen className="w-3.5 h-3.5" />
                          Surahs Being Revealed
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {yearSurahs.slice(0, 4).map((surah) => (
                            <div
                              key={surah.number}
                              className="flex items-center gap-2 p-2.5 rounded-xl"
                              style={{
                                backgroundColor: surah.isMeccan ? '#C8A84E10' : '#2EC4B610',
                                border: `1px solid ${surah.isMeccan ? '#C8A84E25' : '#2EC4B625'}`,
                              }}
                            >
                              <span
                                className="w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0"
                                style={{
                                  backgroundColor: surah.isMeccan ? '#C8A84E20' : '#2EC4B620',
                                  color: surah.isMeccan ? '#C8A84E' : '#2EC4B6',
                                }}
                              >
                                {surah.number}
                              </span>
                              <div className="min-w-0">
                                <div className="text-sm text-[#E8E3DB] font-medium truncate">
                                  {surah.englishName}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {yearSurahs.length > 4 && (
                          <button
                            onClick={handleExploreOnMap}
                            className="w-full text-xs text-center py-2 mt-2 rounded-lg hover:bg-[#1A2332] transition-colors"
                            style={{ color: accentColor }}
                          >
                            View all {yearSurahs.length} surahs on map →
                          </button>
                        )}
                      </div>
                    )}

                    {/* Action Buttons - Share more prominent */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleExploreOnMap}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-[#0A0F1A] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                        style={{ backgroundColor: accentColor }}
                      >
                        <span>Explore on Map</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          borderColor: accentColor,
                          color: accentColor,
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Share Modal */}
          {showResults && calculatedYear && lifeStage && age !== '' && (
            <ShareModal
              isOpen={isShareModalOpen}
              onClose={() => setIsShareModalOpen(false)}
              content={{
                type: 'age',
                age: age as number,
                year: calculatedYear,
                lifeStage: {
                  title: lifeStage.title,
                  description: lifeStage.description,
                },
                events: yearEvents,
                surahs: yearSurahs,
              }}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
