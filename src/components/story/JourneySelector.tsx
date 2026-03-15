'use client';

/**
 * Journey Selector Modal
 * Displays available cinematic journeys for the user to select
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Sunrise, CloudRain, Route, Heart, Sun } from 'lucide-react';
import { journeys, Journey } from '@/data/journeys';
import { useStoryStore } from '@/stores/useStoryStore';

interface JourneySelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Map icon names to components */
const iconMap: Record<string, React.ElementType> = {
  Sunrise,
  CloudRain,
  Route,
  Heart,
  Sun,
};

/** Single journey card */
function JourneyCard({ journey, onSelect }: { journey: Journey; onSelect: () => void }) {
  const IconComponent = iconMap[journey.icon] || Sunrise;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="group relative p-6 rounded-2xl text-left transition-all overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${journey.accentColor}15 0%, ${journey.accentColor}05 100%)`,
        border: `1px solid ${journey.accentColor}30`,
      }}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${journey.accentColor}20 0%, transparent 70%)`,
        }}
      />

      {/* Icon and duration badge */}
      <div className="relative flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${journey.accentColor}20` }}
        >
          <IconComponent
            className="w-6 h-6"
            style={{ color: journey.accentColor }}
          />
        </div>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${journey.accentColor}20`,
            color: journey.accentColor,
          }}
        >
          <Clock className="w-3 h-3" />
          {journey.duration}
        </div>
      </div>

      {/* Title and subtitle */}
      <h3
        className="text-lg font-bold text-[#F5F0E8] mb-1"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {journey.title}
      </h3>
      <p className="text-sm text-[#E8E3DB] opacity-60 mb-3">
        {journey.subtitle}
      </p>

      {/* Description */}
      <p className="text-sm text-[#E8E3DB] opacity-80 leading-relaxed">
        {journey.description}
      </p>

      {/* Start indicator */}
      <div className="relative mt-4 flex items-center gap-2 text-sm font-medium" style={{ color: journey.accentColor }}>
        <span>Begin Journey</span>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          →
        </motion.span>
      </div>
    </motion.button>
  );
}

export function JourneySelector({ isOpen, onClose }: JourneySelectorProps) {
  const startJourney = useStoryStore((s) => s.startJourney);

  const handleSelectJourney = (journeyId: string) => {
    startJourney(journeyId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-[101] bg-[#0A0F1A] rounded-2xl border border-[#2A3342] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A3342]">
              <div>
                <h2
                  className="text-2xl font-bold text-[#F5F0E8]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Cinematic Journeys
                </h2>
                <p className="text-sm text-[#E8E3DB] opacity-60 mt-1">
                  Experience the story of revelation through guided narratives
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-[#1A2332] transition-colors"
              >
                <X className="w-5 h-5 text-[#E8E3DB]" />
              </button>
            </div>

            {/* Journey grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {journeys.map((journey, index) => (
                  <motion.div
                    key={journey.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <JourneyCard
                      journey={journey}
                      onSelect={() => handleSelectJourney(journey.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer hint */}
            <div className="px-6 py-4 border-t border-[#2A3342] bg-[#0A0F1A]/80">
              <p className="text-xs text-[#E8E3DB] opacity-50 text-center">
                Each journey auto-advances with narrative cards. Press ESC or click exit to return to the map at any time.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
