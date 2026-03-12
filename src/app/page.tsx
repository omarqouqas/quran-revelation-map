'use client';

/**
 * Main page for Quran Revelation Map
 * Renders the immersive full-screen map experience with timeline controls
 */

import { MapContainer } from '@/components/map/MapContainer';
import { TimelineSlider } from '@/components/timeline/TimelineSlider';
import { SurahDetailPanel } from '@/components/layout/SurahDetailPanel';

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0A0F1A]">
      {/* Map */}
      <MapContainer />

      {/* Header overlay */}
      <header className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
        <div className="px-4 sm:px-8 py-4 sm:py-6">
          <h1
            className="text-xl sm:text-2xl text-[#F5F0E8] tracking-wide"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Quran Revelation Map
          </h1>
          <p className="text-xs sm:text-sm text-[#E8E3DB] opacity-60 mt-1">
            Journey through 23 years of divine revelation
          </p>
        </div>
      </header>

      {/* Legend */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-20 z-10 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#C8A84E]" />
          <span className="text-[#E8E3DB] opacity-70">Makki</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#2DD4BF]" />
          <span className="text-[#E8E3DB] opacity-70">Madani</span>
        </div>
      </div>

      {/* Timeline panel */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div
          className="mx-auto max-w-3xl"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(10, 15, 26, 0.9) 30%, rgba(10, 15, 26, 0.98) 100%)',
          }}
        >
          <TimelineSlider />
        </div>
      </div>

      {/* Surah detail panel */}
      <SurahDetailPanel />

      {/* Instructions hint (shows briefly on load) */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <p className="text-xs text-[#E8E3DB] opacity-40 text-center animate-pulse">
          Drag the timeline to explore • Click markers for details
        </p>
      </div>
    </main>
  );
}
