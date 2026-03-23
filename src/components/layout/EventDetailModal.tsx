'use client';

/**
 * Modal/panel for displaying historical event details
 */

import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, BookOpen, Swords, Plane, Star, FileText, Milestone, Share2, Sparkles } from 'lucide-react';
import { useMapStore } from '@/stores/useMapStore';
import { getEventById, type HistoricalEvent } from '@/data/events';
import { getSurahByNumber } from '@/lib/quran-data';
import { getCompleteSurahData } from '@/data/surah-locations';
import { ShareModal } from '@/components/share/ShareModal';

/** Get icon for event category */
function getEventIcon(event: HistoricalEvent) {
  const id = event.id;
  if (id.includes('badr') || id.includes('uhud') || id.includes('trench') || id.includes('hunayn') || id.includes('khaybar')) {
    return <Swords className="w-5 h-5" />;
  }
  if (id.includes('abyssinia') || id.includes('hijra') || id.includes('taif')) {
    return <Plane className="w-5 h-5" />;
  }
  if (id.includes('revelation') || id.includes('isra')) {
    return <Star className="w-5 h-5" />;
  }
  if (id.includes('hudaybiyyah') || id.includes('aqabah') || id.includes('constitution')) {
    return <FileText className="w-5 h-5" />;
  }
  return <Milestone className="w-5 h-5" />;
}

/** Get category label and color */
function getEventCategory(event: HistoricalEvent): { label: string; color: string; bg: string } {
  const id = event.id;
  if (id.includes('badr') || id.includes('uhud') || id.includes('trench') || id.includes('hunayn') || id.includes('khaybar')) {
    return { label: 'Battle', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)' };
  }
  if (id.includes('abyssinia') || id.includes('hijra') || id.includes('taif')) {
    return { label: 'Migration', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.15)' };
  }
  if (id.includes('revelation') || id.includes('isra')) {
    return { label: 'Revelation', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' };
  }
  if (id.includes('hudaybiyyah') || id.includes('aqabah') || id.includes('constitution')) {
    return { label: 'Treaty', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' };
  }
  return { label: 'Milestone', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.15)' };
}

export function EventDetailModal() {
  const selectedEventId = useMapStore((state) => state.selectedEventId);
  const selectEvent = useMapStore((state) => state.selectEvent);
  const selectSurah = useMapStore((state) => state.selectSurah);
  const setCurrentYear = useMapStore((state) => state.setCurrentYear);
  const setHighlightedSurahs = useMapStore((state) => state.setHighlightedSurahs);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const event = selectedEventId ? getEventById(selectedEventId) : null;

  // Highlight related surahs on the map when event is selected
  useEffect(() => {
    if (event && event.relatedSurahNumbers.length > 0) {
      setHighlightedSurahs(event.relatedSurahNumbers);
    }
    return () => {
      setHighlightedSurahs([]);
    };
  }, [event, setHighlightedSurahs]);

  // Close on Escape key
  const handleClose = useCallback(() => {
    setHighlightedSurahs([]);
    selectEvent(null);
  }, [selectEvent, setHighlightedSurahs]);

  useEffect(() => {
    if (!selectedEventId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEventId, handleClose]);

  const handleSurahClick = (surahNumber: number) => {
    selectSurah(surahNumber);
    selectEvent(null);
  };

  const category = event ? getEventCategory(event) : null;

  return (
    <AnimatePresence>
      {event && category && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 80,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '480px',
              maxHeight: '85vh',
              backgroundColor: '#0A0F1A',
              borderRadius: '20px',
              border: `2px solid ${category.color}40`,
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${category.color}20`,
              overflow: 'hidden',
              zIndex: 85,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #2A3342',
                background: `linear-gradient(135deg, ${category.bg}, transparent)`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  {/* Category badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      backgroundColor: category.bg,
                      color: category.color,
                      fontSize: '12px',
                      fontWeight: 600,
                      marginBottom: '12px',
                    }}
                  >
                    {getEventIcon(event)}
                    {category.label}
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#F5F0E8',
                      marginBottom: '4px',
                      fontFamily: 'var(--font-heading)',
                      lineHeight: 1.3,
                    }}
                  >
                    {event.name}
                  </h2>

                  {/* Arabic name */}
                  {event.arabicName && (
                    <p
                      style={{
                        fontSize: '18px',
                        color: 'rgba(245, 240, 232, 0.6)',
                        fontFamily: 'var(--font-arabic)',
                      }}
                    >
                      {event.arabicName}
                    </p>
                  )}
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  {/* Share button */}
                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    style={{
                      padding: '8px',
                      borderRadius: '10px',
                      backgroundColor: '#1F2937',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title="Share this event"
                  >
                    <Share2 style={{ width: '18px', height: '18px', color: category.color }} />
                  </button>

                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    style={{
                      padding: '8px',
                      borderRadius: '10px',
                      backgroundColor: '#1F2937',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <X style={{ width: '18px', height: '18px', color: '#9CA3AF' }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '20px 24px', overflowY: 'auto', maxHeight: 'calc(85vh - 180px)' }}>
              {/* Meta info */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar style={{ width: '16px', height: '16px', color: category.color }} />
                  <span style={{ fontSize: '14px', color: '#E8E3DB' }}>
                    {event.year} CE
                    {event.endYear && ` - ${event.endYear} CE`}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin style={{ width: '16px', height: '16px', color: category.color }} />
                  <button
                    onClick={() => setCurrentYear(event.year)}
                    style={{
                      fontSize: '14px',
                      color: category.color,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px',
                    }}
                  >
                    Jump to {event.year} CE
                  </button>
                </div>
                {event.offMapLocation && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    <span style={{ fontSize: '12px', color: '#93C5FD' }}>
                      📍 Actual location: {event.offMapLocation}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'rgba(232, 227, 219, 0.85)',
                  marginBottom: '24px',
                }}
              >
                {event.description}
              </p>

              {/* Related Surahs - Enhanced with context */}
              {event.relatedSurahNumbers.length > 0 && (
                <div>
                  {/* Section header with context hint */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <h3
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#9CA3AF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      <BookOpen style={{ width: '16px', height: '16px' }} />
                      Revelation Context
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        color: category.color,
                        opacity: 0.8,
                      }}
                    >
                      <Sparkles style={{ width: '12px', height: '12px' }} />
                      Pulsing on map
                    </div>
                  </div>

                  {/* Context explanation */}
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      backgroundColor: `${category.bg}`,
                      border: `1px solid ${category.color}30`,
                      marginBottom: '12px',
                    }}
                  >
                    <p style={{ fontSize: '13px', color: '#E8E3DB', lineHeight: 1.6 }}>
                      {event.relatedSurahNumbers.length === 1
                        ? 'This surah contains verses revealed in response to this event, providing divine guidance and context.'
                        : `These ${event.relatedSurahNumbers.length} surahs contain verses revealed in connection with this event, addressing the situation and guiding the believers.`}
                    </p>
                  </div>

                  {/* Surah cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {event.relatedSurahNumbers.map((surahNumber) => {
                      const surah = getSurahByNumber(surahNumber);
                      const completeSurah = getCompleteSurahData(surahNumber);
                      if (!surah) return null;

                      const surahColor = completeSurah?.isMeccan ? '#C8A84E' : '#2EC4B6';

                      return (
                        <button
                          key={surahNumber}
                          onClick={() => handleSurahClick(surahNumber)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 14px',
                            borderRadius: '12px',
                            backgroundColor: '#1A2332',
                            border: '1px solid #2A3342',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            textAlign: 'left',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = surahColor;
                            e.currentTarget.style.backgroundColor = '#1F2937';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#2A3342';
                            e.currentTarget.style.backgroundColor = '#1A2332';
                          }}
                        >
                          {/* Surah number badge */}
                          <span
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              backgroundColor: `${surahColor}20`,
                              color: surahColor,
                              fontSize: '14px',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {surahNumber}
                          </span>

                          {/* Surah info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '15px', color: '#F5F0E8', fontWeight: 600 }}>
                                {surah.englishName}
                              </span>
                              <span
                                style={{
                                  fontSize: '11px',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  backgroundColor: `${surahColor}15`,
                                  color: surahColor,
                                }}
                              >
                                {completeSurah?.isMeccan ? 'Makki' : 'Madani'}
                              </span>
                            </div>
                            {completeSurah?.context && (
                              <p
                                style={{
                                  fontSize: '12px',
                                  color: '#9CA3AF',
                                  marginTop: '2px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {completeSurah.context}
                              </p>
                            )}
                          </div>

                          {/* Arrow indicator */}
                          <span style={{ color: '#6B7280', fontSize: '18px' }}>→</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Share Modal */}
          {event && (
            <ShareModal
              isOpen={isShareModalOpen}
              onClose={() => setIsShareModalOpen(false)}
              content={{ type: 'event', event }}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
