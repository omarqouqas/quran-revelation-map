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
  const isExplorerOpen = useExplorerStore((state) => state.isExplorerOpen);
  const openExplorer = useExplorerStore((state) => state.openExplorer);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0A0F1A]">
      {/* Map */}
      <MapContainer />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[60]">
        {/* Title bar */}
        <div className="flex items-center justify-center py-4 px-6">
          <div className="text-center">
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

        {/* Explore button - positioned left, hidden when panel is open */}
        {!isExplorerOpen && (
          <div className="absolute top-4 left-4 sm:left-6">
            <button
              type="button"
              onClick={() => openExplorer()}
              className="group flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[#1A2332]/80 backdrop-blur-sm border border-[#C8A84E]/30 hover:border-[#C8A84E] hover:bg-[#1A2332] text-[#C8A84E] font-medium text-sm shadow-lg cursor-pointer transition-all duration-300"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Explore Surahs</span>
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="absolute top-5 right-4 sm:right-6 z-10 flex items-center gap-3 sm:gap-4 text-xs px-3 py-2 rounded-full bg-[#1A2332]/80 backdrop-blur-sm border border-[#2A3342]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C8A84E]" />
          <span className="text-[#E8E3DB] opacity-70">Makki</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF]" />
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
