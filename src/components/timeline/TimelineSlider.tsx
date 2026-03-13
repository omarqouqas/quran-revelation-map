'use client';

/**
 * Timeline slider component for navigating through revelation years
 * Spans 610 CE to 632 CE with year markers, play controls, and period indicators
 */

import { useEffect, useRef } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Play, Pause } from 'lucide-react';
import { useMapStore } from '@/stores/useMapStore';
import { getAllCompleteSurahs } from '@/data/surah-locations';
import { cn } from '@/lib/utils';

const START_YEAR = 610;
const END_YEAR = 632;
const HIJRA_YEAR = 622;

/** Key year markers to display on the timeline */
const YEAR_MARKERS = [610, 613, 615, 619, 622, 624, 627, 630, 632];

// Cache all surahs
const allSurahs = getAllCompleteSurahs();

export function TimelineSlider() {
  const currentYear = useMapStore((state) => state.currentYear);
  const setCurrentYear = useMapStore((state) => state.setCurrentYear);
  const isPlaying = useMapStore((state) => state.isPlaying);
  const togglePlayback = useMapStore((state) => state.togglePlayback);
  const playbackSpeed = useMapStore((state) => state.playbackSpeed);
  const setPlaybackSpeed = useMapStore((state) => state.setPlaybackSpeed);

  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentYearRef = useRef(currentYear);

  // Keep ref in sync with state
  useEffect(() => {
    currentYearRef.current = currentYear;
  }, [currentYear]);

  const visibleSurahCount = allSurahs.filter(
    (s) => s.approximateYear <= currentYear
  ).length;

  const isMakkiPeriod = currentYear < HIJRA_YEAR;
  const totalYears = END_YEAR - START_YEAR;

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        const year = currentYearRef.current;
        if (year >= END_YEAR) {
          togglePlayback();
        } else {
          setCurrentYear(year + 1);
        }
      }, 1000 / playbackSpeed);
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, setCurrentYear, togglePlayback]);

  // Cycle through playback speeds
  const cycleSpeed = () => {
    const speeds: (1 | 2 | 4)[] = [1, 2, 4];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  return (
    <div className="w-full px-4 sm:px-8 py-4">
      {/* Year display and stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Play/Pause button */}
          <button
            onClick={togglePlayback}
            className={cn(
              'flex items-center justify-center w-10 h-10 rounded-full',
              'transition-all duration-200',
              'bg-[#1A2332] hover:bg-[#2A3342]',
              'border border-[#2A3342]'
            )}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-[#F5F0E8]" />
            ) : (
              <Play className="w-4 h-4 text-[#F5F0E8] ml-0.5" />
            )}
          </button>

          {/* Speed toggle */}
          <button
            onClick={cycleSpeed}
            className={cn(
              'px-2 py-1 rounded text-xs font-medium',
              'bg-[#1A2332] hover:bg-[#2A3342]',
              'border border-[#2A3342]',
              'text-[#E8E3DB] transition-colors'
            )}
          >
            {playbackSpeed}x
          </button>

          {/* Year display */}
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                'text-4xl sm:text-5xl font-semibold tracking-tight transition-colors duration-300',
                isMakkiPeriod ? 'text-[#C8A84E]' : 'text-[#2EC4B6]'
              )}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {currentYear}
            </span>
            <span className="text-[#E8E3DB] text-sm opacity-70">CE</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span
            className={cn(
              'text-sm font-medium transition-colors duration-300',
              isMakkiPeriod ? 'text-[#C8A84E]' : 'text-[#2EC4B6]'
            )}
          >
            {isMakkiPeriod ? 'Makki Period' : 'Madani Period'}
          </span>
          <span className="text-xs text-[#E8E3DB] opacity-60">
            {visibleSurahCount} of 114 surahs revealed
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-12"
          value={[currentYear]}
          min={START_YEAR}
          max={END_YEAR}
          step={1}
          onValueChange={([value]) => setCurrentYear(value)}
          aria-label="Year of revelation"
        >
          <Slider.Track className="bg-[#2A3342] relative grow rounded-full h-2">
            {/* Hijra indicator line */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-0.5 h-8 bg-[#F5F0E8] opacity-40 z-10"
              style={{
                left: `${((HIJRA_YEAR - START_YEAR) / totalYears) * 100}%`,
              }}
            />
            <Slider.Range
              className="absolute h-full rounded-full"
              style={{
                background:
                  currentYear < HIJRA_YEAR
                    ? '#C8A84E'
                    : `linear-gradient(90deg, #C8A84E 0%, #C8A84E ${
                        ((HIJRA_YEAR - START_YEAR) / totalYears) * 100
                      }%, #2EC4B6 ${
                        ((HIJRA_YEAR - START_YEAR) / totalYears) * 100
                      }%, #2EC4B6 100%)`,
              }}
            />
          </Slider.Track>
          <Slider.Thumb
            className={cn(
              'block w-6 h-6 rounded-full shadow-lg focus:outline-none',
              'transition-all duration-150',
              'bg-[#F5F0E8] border-2',
              isMakkiPeriod ? 'border-[#C8A84E]' : 'border-[#2EC4B6]'
            )}
            style={{
              boxShadow: isMakkiPeriod
                ? '0 0 12px rgba(200, 168, 78, 0.5)'
                : '0 0 12px rgba(46, 196, 182, 0.5)',
            }}
            aria-label={`Year ${currentYear} CE`}
          />
        </Slider.Root>

        {/* Year markers */}
        <div className="flex justify-between mt-2 px-1">
          {YEAR_MARKERS.map((year) => (
            <button
              key={year}
              onClick={() => setCurrentYear(year)}
              className={cn(
                'text-xs transition-all duration-200',
                'hover:opacity-100',
                year === HIJRA_YEAR
                  ? 'text-[#F5F0E8] font-medium opacity-80'
                  : 'text-[#E8E3DB] opacity-50',
                year <= currentYear
                  ? year < HIJRA_YEAR
                    ? 'text-[#C8A84E]'
                    : 'text-[#2EC4B6]'
                  : ''
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Period labels */}
      <div className="flex justify-between mt-3 text-xs opacity-60">
        <span className="text-[#C8A84E]">Makkah</span>
        <span className="text-[#F5F0E8] font-medium">Hijra (622)</span>
        <span className="text-[#2EC4B6]">Madinah</span>
      </div>
    </div>
  );
}
