'use client';

/**
 * Share Modal
 * Modal for previewing and sharing cards
 */

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy, Share2, Check, Loader2 } from 'lucide-react';
import { useShareCard } from './useShareCard';
import { SurahShareCard } from './SurahShareCard';
import { JourneyShareCard } from './JourneyShareCard';
import { CompleteSurahData } from '@/data/surah-locations';
import { Journey } from '@/data/journeys';

type ShareContent =
  | { type: 'surah'; surah: CompleteSurahData }
  | { type: 'journey'; journey: Journey };

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ShareContent;
}

export function ShareModal({ isOpen, onClose, content }: ShareModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isGenerating, downloadCard, copyToClipboard, shareCard } = useShareCard();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    const filename = content.type === 'surah'
      ? `surah-${content.surah.number}-${content.surah.englishName.toLowerCase().replace(/\s+/g, '-')}`
      : `journey-${content.journey.id}`;

    await downloadCard(cardRef.current, { filename });
  };

  const handleCopy = async () => {
    if (!cardRef.current) return;

    const result = await copyToClipboard(cardRef.current);
    if (result.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;

    const shareData = content.type === 'surah'
      ? {
          title: `Surah ${content.surah.englishName}`,
          text: `Exploring Surah ${content.surah.englishName} (${content.surah.arabicName}) - ${content.surah.englishMeaning}. Revealed in ${content.surah.classification === 'Makki' ? 'Makkah' : 'Madinah'} around ${content.surah.approximateYear} CE.`,
        }
      : {
          title: content.journey.title,
          text: `I just completed "${content.journey.title}" journey on Quran Revelation Map! ${content.journey.description}`,
        };

    const result = await shareCard(cardRef.current, shareData);
    if (result.success) {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const title = content.type === 'surah'
    ? `Share Surah ${content.surah.englishName}`
    : `Share ${content.journey.title}`;

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
            <div className="flex-1 overflow-y-auto p-5 flex items-center justify-center bg-[#0A0F1A]/50">
              <div className="transform scale-[0.85] origin-center">
                {content.type === 'surah' ? (
                  <SurahShareCard ref={cardRef} surah={content.surah} />
                ) : (
                  <JourneyShareCard ref={cardRef} journey={content.journey} />
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 py-4 border-t border-[#2A3342] flex items-center gap-3">
              {/* Download */}
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A2332] border border-[#2A3342] text-[#E8E3DB] hover:bg-[#2A3342] hover:border-[#C8A84E]/50 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">Download</span>
              </button>

              {/* Copy */}
              <button
                onClick={handleCopy}
                disabled={isGenerating}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A2332] border border-[#2A3342] text-[#E8E3DB] hover:bg-[#2A3342] hover:border-[#C8A84E]/50 transition-all disabled:opacity-50"
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

              {/* Share */}
              <button
                onClick={handleShare}
                disabled={isGenerating}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C8A84E] text-[#0A0F1A] font-medium hover:bg-[#D4B96A] transition-all disabled:opacity-50"
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
