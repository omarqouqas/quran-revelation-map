'use client';

/**
 * Landing overlay that shows instructions before first user interaction
 * Fades out when user interacts with the timeline
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { useMapStore } from '@/stores/useMapStore';

export function LandingOverlay() {
  const hasInteracted = useMapStore((state) => state.hasInteracted);
  const setHasInteracted = useMapStore((state) => state.setHasInteracted);

  const handleBeginJourney = () => {
    setHasInteracted(true);
  };

  return (
    <AnimatePresence>
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center gap-6 py-8 overflow-y-auto"
        >
          {/* Subtle vignette overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(10, 15, 26, 0.4) 100%)',
            }}
          />

          {/* Instruction text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center px-6 relative"
          >
            <p
              className="text-lg sm:text-xl text-[#F5F0E8] opacity-70 mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Experience the 23-year journey of
            </p>
            <p
              className="text-3xl sm:text-4xl text-[#F5F0E8] font-medium"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Quranic Revelation
            </p>
          </motion.div>

          {/* Begin Journey button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            onClick={handleBeginJourney}
            className="pointer-events-auto relative group flex items-center gap-3 px-8 py-4 rounded-full bg-[#C8A84E] hover:bg-[#D4B85E] text-[#0A0F1A] font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Play className="w-5 h-5" />
            <span>Begin the Journey</span>
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: '0 0 30px rgba(200, 168, 78, 0.5)',
              }}
            />
          </motion.button>

          {/* Horizontal swipe indicator pointing to timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="relative mt-4 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-[#E8E3DB] opacity-50">
              or drag the timeline below
            </span>
            {/* Horizontal gesture indicator */}
            <motion.div
              animate={{ x: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="flex items-center gap-1"
            >
              <svg
                className="w-5 h-5 text-[#C8A84E] opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <div className="w-8 h-1 rounded-full bg-[#C8A84E] opacity-40" />
              <svg
                className="w-5 h-5 text-[#C8A84E] opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
