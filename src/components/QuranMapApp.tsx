'use client';

/**
 * Main Quran Revelation Map application component
 * Renders the immersive full-screen map experience with timeline controls
 * Used by both / and /surah/[number] routes
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Sparkles, Keyboard, ArrowLeftRight, Film, User, BookOpen } from 'lucide-react';
import { VideoBackground } from '@/components/map/VideoBackground';
import { MapContainer } from '@/components/map/MapContainer';
import { TimelineSlider } from '@/components/timeline/TimelineSlider';
import { TimelineContextPanel } from '@/components/timeline/TimelineContextPanel';
import { SurahDetailPanel } from '@/components/layout/SurahDetailPanel';
import { EventDetailModal } from '@/components/layout/EventDetailModal';
import { SacredSiteModal } from '@/components/layout/SacredSiteModal';
import { LandingOverlay } from '@/components/layout/LandingOverlay';
import { KeyboardShortcutsModal } from '@/components/layout/KeyboardShortcutsModal';
import { OrderComparisonModal } from '@/components/layout/OrderComparisonModal';
import { AgeExplorerModal } from '@/components/layout/AgeExplorerModal';
import { SearchModal } from '@/components/search';
import { SurahExplorer } from '@/components/explorer';
import { StoryMode, JourneySelector } from '@/components/story';
import { LearningMode, PathSelector } from '@/components/learning';
import { useMapStore } from '@/stores/useMapStore';
import { useStoryStore } from '@/stores/useStoryStore';
import { useLearningStore } from '@/stores/useLearningStore';
import { useSurahRouting } from '@/hooks/useSurahRouting';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface QuranMapAppProps {
  /** Initial surah number to display (from URL) */
  initialSurahNumber?: number;
}

export function QuranMapApp({ initialSurahNumber }: QuranMapAppProps) {
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [showOrderComparison, setShowOrderComparison] = useState(false);
  const [showAgeExplorer, setShowAgeExplorer] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Sync URL with surah selection
  useSurahRouting({ initialSurahNumber });

  // Enable keyboard shortcuts
  useKeyboardShortcuts({
    onShowHelp: () => setShowShortcutsHelp(true),
    onToggleSearch: () => setShowSearch((prev) => !prev),
  });

  const showEvents = useMapStore((state) => state.showEvents);
  const setShowEvents = useMapStore((state) => state.setShowEvents);
  const hasInteracted = useMapStore((state) => state.hasInteracted);

  // Story mode state
  const isStoryMode = useStoryStore((state) => state.isStoryMode);
  const isJourneySelectorOpen = useStoryStore((state) => state.isJourneySelectorOpen);
  const openJourneySelector = useStoryStore((state) => state.openJourneySelector);
  const closeJourneySelector = useStoryStore((state) => state.closeJourneySelector);

  // Learning mode state
  const isLearningMode = useLearningStore((state) => state.isLearningMode);
  const isPathSelectorOpen = useLearningStore((state) => state.isPathSelectorOpen);
  const openPathSelector = useLearningStore((state) => state.openPathSelector);
  const closePathSelector = useLearningStore((state) => state.closePathSelector);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0A0F1A]">
      {/* Ambient video/gradient background */}
      <VideoBackground />

      {/* Map */}
      <MapContainer />

      {/* Header - pointer-events-none so clicks pass through to map (hidden in story/learning mode and before interaction) */}
      {!isStoryMode && !isLearningMode && hasInteracted && (
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

          {/* Search button - positioned left */}
          <AnimatePresence>
            {hasInteracted && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                type="button"
                onClick={() => setShowSearch(true)}
                style={{ pointerEvents: 'auto' }}
                className="absolute top-4 left-4 sm:left-6 group flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[#1A2332]/80 backdrop-blur-sm border border-[#C8A84E]/30 hover:border-[#C8A84E] hover:bg-[#1A2332] text-[#C8A84E] font-medium text-sm shadow-lg cursor-pointer transition-all duration-300"
                title="Search (Cmd/Ctrl+K)"
              >
                <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#0A0F1A]/50 border border-[#2A3342] text-[10px] text-[#C8A84E]/60">
                  <span>⌘</span>K
                </kbd>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Legend - positioned below map controls (hidden in story/learning mode and before interaction) */}
      <AnimatePresence>
        {!isStoryMode && !isLearningMode && hasInteracted && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-32 right-3 z-10 flex flex-col gap-2 text-xs px-3 py-2.5 rounded-lg bg-[#1A2332]/90 backdrop-blur-sm border border-[#2A3342]"
          >
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
            <div className="border-t border-[#2A3342] my-1" />
            <button
              onClick={() => setShowOrderComparison(true)}
              style={{ pointerEvents: 'auto' }}
              className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              title="Compare Quran vs Revelation order"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span className="text-[#E8E3DB]">Order</span>
            </button>
            <button
              onClick={openJourneySelector}
              style={{ pointerEvents: 'auto' }}
              className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              title="Cinematic story journeys"
            >
              <Film className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span className="text-[#E8E3DB]">Journeys</span>
            </button>
            <button
              onClick={openPathSelector}
              style={{ pointerEvents: 'auto' }}
              className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              title="Structured learning paths"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#2EC4B6]" />
              <span className="text-[#E8E3DB]">Learn</span>
            </button>
            <button
              onClick={() => setShowAgeExplorer(true)}
              style={{ pointerEvents: 'auto' }}
              className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              title="Explore revelation at your age"
            >
              <User className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span className="text-[#E8E3DB]">Your Age</span>
            </button>
            <div className="border-t border-[#2A3342] my-1" />
            <button
              onClick={() => setShowShortcutsHelp(true)}
              style={{ pointerEvents: 'auto' }}
              className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              title="Keyboard shortcuts (?)"
            >
              <Keyboard className="w-3.5 h-3.5 text-[#E8E3DB]" />
              <span className="text-[#E8E3DB]">Shortcuts</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline panel (hidden in story/learning mode) */}
      {!isStoryMode && !isLearningMode && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div
            className="mx-auto max-w-3xl"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(10, 15, 26, 0.9) 30%, rgba(10, 15, 26, 0.98) 100%)',
            }}
          >
            <TimelineSlider />
            <TimelineContextPanel />
          </div>
        </div>
      )}

      {/* Surah detail panel (hidden in story/learning mode) */}
      {!isStoryMode && !isLearningMode && <SurahDetailPanel />}

      {/* Event detail modal (hidden in story/learning mode) */}
      {!isStoryMode && !isLearningMode && <EventDetailModal />}

      {/* Sacred site detail modal (hidden in story/learning mode) */}
      {!isStoryMode && !isLearningMode && <SacredSiteModal />}

      {/* Surah explorer panel (hidden in story/learning mode) */}
      {!isStoryMode && !isLearningMode && <SurahExplorer />}

      {/* Landing overlay (shows until first interaction) */}
      <LandingOverlay />

      {/* Keyboard shortcuts help modal */}
      <KeyboardShortcutsModal
        isOpen={showShortcutsHelp}
        onClose={() => setShowShortcutsHelp(false)}
      />

      {/* Order comparison modal */}
      <OrderComparisonModal
        isOpen={showOrderComparison}
        onClose={() => setShowOrderComparison(false)}
      />

      {/* Story mode overlay */}
      {isStoryMode && <StoryMode />}

      {/* Journey selector modal */}
      <JourneySelector
        isOpen={isJourneySelectorOpen}
        onClose={closeJourneySelector}
      />

      {/* Age explorer modal */}
      <AgeExplorerModal
        isOpen={showAgeExplorer}
        onClose={() => setShowAgeExplorer(false)}
      />

      {/* Learning mode panel */}
      {isLearningMode && <LearningMode />}

      {/* Learning path selector modal */}
      <PathSelector
        isOpen={isPathSelectorOpen}
        onClose={closePathSelector}
      />

      {/* Global search modal */}
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </main>
  );
}
