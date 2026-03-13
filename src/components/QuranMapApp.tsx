'use client';

/**
 * Main Quran Revelation Map application component
 * Renders the immersive full-screen map experience with timeline controls
 * Used by both / and /surah/[number] routes
 */

import { Search, Sparkles } from 'lucide-react';
import { MapContainer } from '@/components/map/MapContainer';
import { TimelineSlider } from '@/components/timeline/TimelineSlider';
import { SurahDetailPanel } from '@/components/layout/SurahDetailPanel';
import { EventDetailModal } from '@/components/layout/EventDetailModal';
import { LandingOverlay } from '@/components/layout/LandingOverlay';
import { SurahExplorer } from '@/components/explorer';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { useMapStore } from '@/stores/useMapStore';
import { useSurahRouting } from '@/hooks/useSurahRouting';

interface QuranMapAppProps {
  /** Initial surah number to display (from URL) */
  initialSurahNumber?: number;
}

export function QuranMapApp({ initialSurahNumber }: QuranMapAppProps) {
  // Sync URL with surah selection
  useSurahRouting({ initialSurahNumber });

  const isExplorerOpen = useExplorerStore((state) => state.isExplorerOpen);
  const openExplorer = useExplorerStore((state) => state.openExplorer);
  const showEvents = useMapStore((state) => state.showEvents);
  const setShowEvents = useMapStore((state) => state.setShowEvents);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0A0F1A]">
      {/* Map */}
      <MapContainer />

      {/* Header - pointer-events-none so clicks pass through to map */}
      <div className="absolute top-0 left-0 right-0 z-[60] pointer-events-none">
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
          <button
            type="button"
            onClick={() => openExplorer()}
            style={{ pointerEvents: 'auto' }}
            className="absolute top-4 left-4 sm:left-6 group flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[#1A2332]/80 backdrop-blur-sm border border-[#C8A84E]/30 hover:border-[#C8A84E] hover:bg-[#1A2332] text-[#C8A84E] font-medium text-sm shadow-lg cursor-pointer transition-all duration-300"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Explore Surahs</span>
          </button>
        )}
      </div>

      {/* Legend - positioned below map controls */}
      <div className="absolute top-32 right-3 z-10 flex flex-col gap-2 text-xs px-3 py-2.5 rounded-lg bg-[#1A2332]/90 backdrop-blur-sm border border-[#2A3342]">
        <div className="flex items-center gap-2 pointer-events-none">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C8A84E]" />
          <span className="text-[#E8E3DB] opacity-80">Makki</span>
        </div>
        <div className="flex items-center gap-2 pointer-events-none">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF]" />
          <span className="text-[#E8E3DB] opacity-80">Madani</span>
        </div>
        <div className="border-t border-[#2A3342] my-1" />
        <button
          onClick={() => setShowEvents(!showEvents)}
          style={{ pointerEvents: 'auto' }}
          className={`flex items-center gap-2 transition-opacity ${showEvents ? 'opacity-100' : 'opacity-50'}`}
        >
          <span
            className="w-2.5 h-2.5 rotate-45 rounded-sm"
            style={{ backgroundColor: showEvents ? '#8B5CF6' : '#4B5563' }}
          />
          <span className="text-[#E8E3DB]">Events</span>
          <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
        </button>
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

      {/* Event detail modal */}
      <EventDetailModal />

      {/* Surah explorer panel */}
      <SurahExplorer />

      {/* Landing overlay (shows until first interaction) */}
      <LandingOverlay />
    </main>
  );
}
