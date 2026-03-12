'use client';

/**
 * Timeline slider component for navigating through revelation years
 * Spans 610 CE to 632 CE with year markers and period indicators
 */

import * as Slider from '@radix-ui/react-slider';
import { useMapStore } from '@/stores/useMapStore';
import { surahs } from '@/data/surahs';
import { cn } from '@/lib/utils';

const START_YEAR = 610;
const END_YEAR = 632;
const HIJRA_YEAR = 622;

/** Key year markers to display on the timeline */
const YEAR_MARKERS = [610, 615, 620, 622, 625, 630, 632];

export function TimelineSlider() {
  const currentYear = useMapStore((state) => state.currentYear);
  const setCurrentYear = useMapStore((state) => state.setCurrentYear);

  const visibleSurahCount = surahs.filter(
    (s) => s.approximateYear <= currentYear
  ).length;

  const isMakkiPeriod = currentYear < HIJRA_YEAR;
  const yearsFromStart = currentYear - START_YEAR;
  const totalYears = END_YEAR - START_YEAR;
  const progress = (yearsFromStart / totalYears) * 100;

  return (
    <div className="w-full px-4 sm:px-8 py-4">
      {/* Year display and stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-baseline gap-3">
          <span
            className={cn(
              'text-4xl sm:text-5xl font-semibold tracking-tight transition-colors duration-300',
              isMakkiPeriod ? 'text-[#C8A84E]' : 'text-[#2DD4BF]'
            )}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {currentYear}
          </span>
          <span className="text-[#E8E3DB] text-sm opacity-70">CE</span>
        </div>

        <div className="flex flex-col items-end">
          <span
            className={cn(
              'text-sm font-medium transition-colors duration-300',
              isMakkiPeriod ? 'text-[#C8A84E]' : 'text-[#2DD4BF]'
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
              className="absolute top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#F5F0E8] opacity-30"
              style={{
                left: `${((HIJRA_YEAR - START_YEAR) / totalYears) * 100}%`,
              }}
            />
            <Slider.Range
              className="absolute h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, #C8A84E 0%, #C8A84E ${
                  Math.min(progress, ((HIJRA_YEAR - START_YEAR) / totalYears) * 100)
                }%, #2DD4BF 100%)`,
              }}
            />
          </Slider.Track>
          <Slider.Thumb
            className={cn(
              'block w-6 h-6 rounded-full shadow-lg focus:outline-none',
              'transition-all duration-150',
              'bg-[#F5F0E8] border-2',
              isMakkiPeriod ? 'border-[#C8A84E]' : 'border-[#2DD4BF]'
            )}
            style={{
              boxShadow: isMakkiPeriod
                ? '0 0 12px rgba(200, 168, 78, 0.5)'
                : '0 0 12px rgba(45, 212, 191, 0.5)',
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
                    : 'text-[#2DD4BF]'
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
        <span className="text-[#F5F0E8]">Hijra</span>
        <span className="text-[#2DD4BF]">Madinah</span>
      </div>
    </div>
  );
}
