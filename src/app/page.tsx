'use client';

/**
 * Main page for Quran Revelation Map
 * Renders the immersive full-screen map experience with timeline controls
 */

import { Search } from 'lucide-react';
import { MapContainer } from '@/components/map/MapContainer';
import { TimelineSlider } from '@/components/timeline/TimelineSlider';
import { SurahDetailPanel } from '@/components/layout/SurahDetailPanel';
import { LandingOverlay } from '@/components/layout/LandingOverlay';
import { SurahExplorer } from '@/components/explorer';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { cn } from '@/lib/utils';

export default function Home() {
  const openExplorer = useExplorerStore((state) => state.openExplorer);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0A0F1A]">
      {/* Map */}
      <MapContainer />

      {/* Header with Explore button */}
      <div className="absolute top-0 left-0 right-0 z-[60] p-6">
        <div className="flex items-center gap-6">
          {/* Explore button */}
          <button
            onClick={() => {
              console.log('Explore clicked');
              openExplorer();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C8A84E] hover:bg-[#D4B96A] text-[#0A0F1A] font-semibold text-sm shadow-xl cursor-pointer transition-all hover:scale-105"
          >
            <Search className="w-5 h-5" />
            <span>Explore Surahs</span>
          </button>

          {/* Title */}
          <div>
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
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-8 right-6 z-10 flex items-center gap-4 text-xs">
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

      {/* Surah explorer panel */}
      <SurahExplorer />

      {/* Landing overlay (shows until first interaction) */}
      <LandingOverlay />
    </main>
  );
}
