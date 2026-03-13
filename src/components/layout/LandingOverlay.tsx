'use client';

/**
 * Landing overlay that shows instructions before first user interaction
 * Fades out when user interacts with the timeline
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useMapStore } from '@/stores/useMapStore';

export function LandingOverlay() {
  const hasInteracted = useMapStore((state) => state.hasInteracted);

  return (
    <AnimatePresence>
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
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
            className="text-center px-6"
          >
            <p
              className="text-lg sm:text-xl text-[#F5F0E8] opacity-80 mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Drag the timeline to experience
            </p>
            <p
              className="text-2xl sm:text-3xl text-[#F5F0E8]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              the revelation of the Quran
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="mt-8"
            >
              <svg
                className="w-6 h-6 mx-auto text-[#C8A84E] opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
