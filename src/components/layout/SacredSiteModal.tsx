'use client';

/**
 * Modal for displaying sacred site details
 * Shows site info, related surahs, and related events
 */

import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, BookOpen, Calendar, Star, Sun, Shield, Compass, Share2 } from 'lucide-react';
import { useMapStore } from '@/stores/useMapStore';
import { getSacredSiteByName, SACRED_SITE_STYLES, type SacredSite } from '@/data/sacred-sites';
import { getSurahsByLocation } from '@/data/surah-locations';
import { getEventById } from '@/data/events';
import { ShareModal } from '@/components/share/ShareModal';

/** Get icon for site category */
function getSiteIcon(category: SacredSite['category']) {
  switch (category) {
    case 'holy':
      return <Star className="w-5 h-5" />;
    case 'revelation':
      return <Sun className="w-5 h-5" />;
    case 'battle':
      return <Shield className="w-5 h-5" />;
    case 'journey':
      return <Compass className="w-5 h-5" />;
  }
}

export function SacredSiteModal() {
  const selectedSiteName = useMapStore((state) => state.selectedSiteName);
  const selectSite = useMapStore((state) => state.selectSite);
  const selectSurah = useMapStore((state) => state.selectSurah);
  const selectEvent = useMapStore((state) => state.selectEvent);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const site = selectedSiteName ? getSacredSiteByName(selectedSiteName) : null;
  const style = site ? SACRED_SITE_STYLES[site.category] : null;

  // Get related surahs
  const relatedSurahs = site ? getSurahsByLocation(site.locationKey).slice(0, 8) : [];

  // Get related events
  const relatedEvents = site
    ? site.relatedEventIds.map(id => getEventById(id)).filter(Boolean)
    : [];

  // Close on Escape key
  const handleClose = useCallback(() => {
    selectSite(null);
  }, [selectSite]);

  useEffect(() => {
    if (!selectedSiteName) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSiteName, handleClose]);

  const handleSurahClick = (surahNumber: number) => {
    selectSurah(surahNumber);
    selectSite(null);
  };

  const handleEventClick = (eventId: string) => {
    selectEvent(eventId);
    selectSite(null);
  };

  return (
    <AnimatePresence>
      {site && style && (
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
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '400px',
              maxHeight: 'calc(100vh - 160px)',
              backgroundColor: '#0A0F1A',
              borderRadius: '16px',
              border: `2px solid ${style.color}40`,
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${style.glowColor}`,
              overflow: 'hidden',
              zIndex: 85,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #2A3342',
                background: `linear-gradient(135deg, ${style.color}15, transparent)`,
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
                      backgroundColor: `${style.color}20`,
                      color: style.color,
                      fontSize: '12px',
                      fontWeight: 600,
                      marginBottom: '12px',
                    }}
                  >
                    {getSiteIcon(site.category)}
                    {style.label}
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#F5F0E8',
                      marginBottom: '2px',
                      fontFamily: 'var(--font-heading)',
                      lineHeight: 1.2,
                    }}
                  >
                    {site.name}
                  </h2>

                  {/* Arabic name */}
                  <p
                    style={{
                      fontSize: '18px',
                      color: style.color,
                      fontFamily: 'var(--font-arabic)',
                    }}
                    dir="rtl"
                  >
                    {site.arabicName}
                  </p>
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
                    title="Share this site"
                  >
                    <Share2 style={{ width: '18px', height: '18px', color: style.color }} />
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
            <div style={{ padding: '16px 20px', overflowY: 'auto', maxHeight: 'calc(100vh - 280px)' }}>
              {/* Coordinates */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <MapPin style={{ width: '16px', height: '16px', color: style.color }} />
                <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
                  {site.lat.toFixed(4)}°N, {site.lng.toFixed(4)}°E
                </span>
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
                {site.description}
              </p>

              {/* Related Events */}
              {relatedEvents.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <h3
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#9CA3AF',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    <Calendar style={{ width: '16px', height: '16px' }} />
                    Historical Events
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {relatedEvents.map((event) => event && (
                      <button
                        key={event.id}
                        onClick={() => handleEventClick(event.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          backgroundColor: '#1A2332',
                          border: '1px solid #2A3342',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          textAlign: 'left',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = style.color;
                          e.currentTarget.style.backgroundColor = '#1F2937';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#2A3342';
                          e.currentTarget.style.backgroundColor = '#1A2332';
                        }}
                      >
                        <span style={{ fontSize: '14px', color: '#F5F0E8', fontWeight: 500 }}>
                          {event.name}
                        </span>
                        <span style={{ fontSize: '12px', color: style.color }}>
                          {event.year} CE
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Surahs */}
              {relatedSurahs.length > 0 && (
                <div>
                  <h3
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#9CA3AF',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    <BookOpen style={{ width: '16px', height: '16px' }} />
                    Surahs Revealed Here
                    {site.locationKey === 'MAKKAH' || site.locationKey === 'MADINAH' ? (
                      <span style={{ fontSize: '11px', fontWeight: 400, textTransform: 'none' }}>
                        (showing first 8)
                      </span>
                    ) : null}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {relatedSurahs.map((surah) => (
                      <button
                        key={surah.number}
                        onClick={() => handleSurahClick(surah.number)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 14px',
                          borderRadius: '10px',
                          backgroundColor: '#1A2332',
                          border: '1px solid #2A3342',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = style.color;
                          e.currentTarget.style.backgroundColor = '#1F2937';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#2A3342';
                          e.currentTarget.style.backgroundColor = '#1A2332';
                        }}
                      >
                        <span
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            backgroundColor: `${style.color}20`,
                            color: style.color,
                            fontSize: '12px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {surah.number}
                        </span>
                        <span style={{ fontSize: '14px', color: '#F5F0E8', fontWeight: 500 }}>
                          {surah.englishName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Share Modal */}
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            content={{ type: 'site', site }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
