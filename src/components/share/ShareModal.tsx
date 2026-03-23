'use client';

/**
 * Share Modal
 * Modal for previewing and sharing cards
 */

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy, Share2, Check, Loader2, ImageIcon } from 'lucide-react';
import { useShareCard } from './useShareCard';
import { SurahShareCard } from './SurahShareCard';
import { JourneyShareCard } from './JourneyShareCard';
import { EventShareCard } from './EventShareCard';
import { SacredSiteShareCard } from './SacredSiteShareCard';
import { AgeShareCard } from './AgeShareCard';
import { CompleteSurahData } from '@/data/surah-locations';
import { Journey } from '@/data/journeys';
import { HistoricalEvent } from '@/data/events';
import { SacredSite, SACRED_SITE_STYLES } from '@/data/sacred-sites';

type ShareContent =
  | { type: 'surah'; surah: CompleteSurahData }
  | { type: 'journey'; journey: Journey }
  | { type: 'event'; event: HistoricalEvent }
  | { type: 'site'; site: SacredSite }
  | { type: 'age'; age: number; year: number; lifeStage: { title: string; description: string }; events: HistoricalEvent[]; surahs: CompleteSurahData[] };

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ShareContent;
}

type FeedbackState = 'idle' | 'success' | 'error';

export function ShareModal({ isOpen, onClose, content }: ShareModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isGenerating, downloadCard, copyToClipboard, shareCard } = useShareCard();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState<FeedbackState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Get accent color based on content type
  const getAccentColor = () => {
    if (content.type === 'surah') {
      return content.surah.isMeccan ? '#C8A84E' : '#2EC4B6';
    }
    if (content.type === 'journey') {
      return content.journey.accentColor;
    }
    if (content.type === 'site') {
      return SACRED_SITE_STYLES[content.site.category].color;
    }
    if (content.type === 'age') {
      return content.year >= 622 ? '#2EC4B6' : '#C8A84E';
    }
    // Event - determine color from event category
    const id = content.event.id;
    if (id.includes('badr') || id.includes('uhud') || id.includes('trench') || id.includes('hunayn') || id.includes('khaybar')) {
      return '#EF4444'; // Battle - red
    }
    if (id.includes('abyssinia') || id.includes('hijra') || id.includes('taif')) {
      return '#3B82F6'; // Migration - blue
    }
    if (id.includes('revelation') || id.includes('isra')) {
      return '#F59E0B'; // Revelation - amber
    }
    if (id.includes('hudaybiyyah') || id.includes('aqabah') || id.includes('constitution')) {
      return '#10B981'; // Treaty - green
    }
    return '#8B5CF6'; // Milestone - purple
  };
  const accentColor = getAccentColor();

  const handleDownload = async () => {
    if (!cardRef.current) return;

    let filename: string;
    if (content.type === 'surah') {
      filename = `surah-${content.surah.number}-${content.surah.englishName.toLowerCase().replace(/\s+/g, '-')}`;
    } else if (content.type === 'journey') {
      filename = `journey-${content.journey.id}`;
    } else if (content.type === 'site') {
      filename = `site-${content.site.name.toLowerCase().replace(/\s+/g, '-')}`;
    } else if (content.type === 'age') {
      filename = `at-age-${content.age}-revelation`;
    } else {
      filename = `event-${content.event.id}`;
    }

    const result = await downloadCard(cardRef.current, { filename });
    if (result.success) {
      setDownloadFeedback('success');
      setTimeout(() => setDownloadFeedback('idle'), 2000);
    } else {
      setDownloadFeedback('error');
      setErrorMessage('Failed to download image');
      setTimeout(() => {
        setDownloadFeedback('idle');
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleCopy = async () => {
    if (!cardRef.current) return;

    const result = await copyToClipboard(cardRef.current);
    if (result.success) {
      setCopied(true);
      setErrorMessage(null);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setErrorMessage(result.error || 'Failed to copy to clipboard');
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;

    let shareData: { title: string; text: string };
    if (content.type === 'surah') {
      shareData = {
        title: `Surah ${content.surah.englishName}`,
        text: `Exploring Surah ${content.surah.englishName} (${content.surah.arabicName}) - ${content.surah.englishMeaning}. Revealed in ${content.surah.classification === 'Makki' ? 'Makkah' : 'Madinah'} around ${content.surah.approximateYear} CE.`,
      };
    } else if (content.type === 'journey') {
      shareData = {
        title: content.journey.title,
        text: `I just completed "${content.journey.title}" journey on Quran Revelation Map! ${content.journey.description}`,
      };
    } else if (content.type === 'site') {
      shareData = {
        title: content.site.name,
        text: `Exploring ${content.site.name} (${content.site.arabicName}) - ${content.site.description}`,
      };
    } else if (content.type === 'age') {
      shareData = {
        title: `At Age ${content.age}`,
        text: `At age ${content.age}, the Prophet Muhammad (peace be upon him) was experiencing: ${content.lifeStage.title}. Explore the Quran revelations through time!`,
      };
    } else {
      shareData = {
        title: content.event.name,
        text: `${content.event.name} (${content.event.year} CE) - ${content.event.description}`,
      };
    }

    const result = await shareCard(cardRef.current, shareData);
    if (result.success) {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const title = content.type === 'surah'
    ? `Share Surah ${content.surah.englishName}`
    : content.type === 'journey'
    ? `Share ${content.journey.title}`
    : content.type === 'site'
    ? `Share ${content.site.name}`
    : content.type === 'age'
    ? `Share "At Age ${content.age}"`
    : `Share ${content.event.name}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[201] bg-[#0A0F1A] rounded-2xl border border-[#2A3342] overflow-hidden flex flex-col max-w-[480px] max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A3342]">
              <h2
                className="text-lg font-bold text-[#F5F0E8]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[#1A2332] transition-colors"
              >
                <X className="w-5 h-5 text-[#E8E3DB]" />
              </button>
            </div>

            {/* Card preview */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center bg-[#0A0F1A]/50">
              {/* Preview label */}
              <div className="flex items-center gap-2 mb-3 text-xs text-[#E8E3DB]/60">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Preview · Exports at 800×1200 px</span>
              </div>

              {/* Card container with proper overflow handling */}
              <div className="flex-1 flex items-center justify-center w-full overflow-auto">
                <div className="transform scale-[0.75] sm:scale-[0.85] origin-center shrink-0">
                  {content.type === 'surah' ? (
                    <SurahShareCard ref={cardRef} surah={content.surah} />
                  ) : content.type === 'journey' ? (
                    <JourneyShareCard ref={cardRef} journey={content.journey} />
                  ) : content.type === 'site' ? (
                    <SacredSiteShareCard ref={cardRef} site={content.site} />
                  ) : content.type === 'age' ? (
                    <AgeShareCard
                      ref={cardRef}
                      age={content.age}
                      year={content.year}
                      lifeStage={content.lifeStage}
                      events={content.events}
                      surahs={content.surahs}
                    />
                  ) : (
                    <EventShareCard ref={cardRef} event={content.event} />
                  )}
                </div>
              </div>

              {/* Error message */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-3 px-3 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-xs"
                  >
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="px-5 py-4 border-t border-[#2A3342] flex items-center gap-3">
              {/* Download */}
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A2332] border border-[#2A3342] text-[#E8E3DB] hover:bg-[#2A3342] transition-all disabled:opacity-50"
                style={{
                  borderColor: downloadFeedback === 'success' ? '#2EC4B6' : undefined,
                  backgroundColor: downloadFeedback === 'success' ? 'rgba(46, 196, 182, 0.1)' : undefined
                }}
              >
                {downloadFeedback === 'success' ? (
                  <Check className="w-4 h-4 text-[#2EC4B6]" />
                ) : isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {downloadFeedback === 'success' ? 'Saved!' : 'Download'}
                </span>
              </button>

              {/* Copy */}
              <button
                onClick={handleCopy}
                disabled={isGenerating}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A2332] border border-[#2A3342] text-[#E8E3DB] hover:bg-[#2A3342] transition-all disabled:opacity-50"
                style={{
                  borderColor: copied ? '#2EC4B6' : undefined,
                  backgroundColor: copied ? 'rgba(46, 196, 182, 0.1)' : undefined
                }}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-[#2EC4B6]" />
                ) : isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </button>

              {/* Share - uses dynamic accent color */}
              <button
                onClick={handleShare}
                disabled={isGenerating}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[#0A0F1A] font-medium transition-all disabled:opacity-50"
                style={{
                  backgroundColor: shared ? '#2EC4B6' : accentColor,
                }}
              >
                {shared ? (
                  <Check className="w-4 h-4" />
                ) : isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {shared ? 'Shared!' : 'Share'}
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
