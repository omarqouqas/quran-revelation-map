'use client';

/**
 * Scrollable list of filtered surah results
 */

import { useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { useMapStore } from '@/stores/useMapStore';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { getAllCompleteSurahs } from '@/data/surah-locations';
import { filterSurahs, sortSurahs } from '@/lib/surah-filters';
import { SurahResultCard } from './SurahResultCard';
import { cn } from '@/lib/utils';

// Cache all surahs at module level to avoid recreating on every render
const allSurahsCache = getAllCompleteSurahs();

export function SurahResultsList() {
  const selectedSurahNumber = useMapStore((state) => state.selectedSurahNumber);
  const selectSurah = useMapStore((state) => state.selectSurah);
  const setCurrentYear = useMapStore((state) => state.setCurrentYear);
  const setHasInteracted = useMapStore((state) => state.setHasInteracted);

  const searchQuery = useExplorerStore((state) => state.searchQuery);
  const selectedThemes = useExplorerStore((state) => state.selectedThemes);
  const periodFilter = useExplorerStore((state) => state.periodFilter);
  const yearRange = useExplorerStore((state) => state.yearRange);
  const selectedLocations = useExplorerStore((state) => state.selectedLocations);
  const sortBy = useExplorerStore((state) => state.sortBy);
  const setSortBy = useExplorerStore((state) => state.setSortBy);
  const resetFilters = useExplorerStore((state) => state.resetFilters);
  const closeExplorer = useExplorerStore((state) => state.closeExplorer);

  // Filter and sort surahs
  const filteredSurahs = useMemo(() => {
    const filtered = filterSurahs(allSurahsCache, {
      searchQuery,
      selectedThemes,
      periodFilter,
      yearRange,
      selectedLocations,
    });
    return sortSurahs(filtered, sortBy);
  }, [searchQuery, selectedThemes, periodFilter, yearRange, selectedLocations, sortBy]);

  const handleSurahClick = (surahNumber: number, year: number) => {
    // Select surah (opens detail panel)
    selectSurah(surahNumber);
    // Jump timeline to surah's year
    setCurrentYear(year);
    // Mark as interacted
    setHasInteracted(true);
    // On mobile, close explorer to show map
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      closeExplorer();
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Results count and sort - compact */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        backgroundColor: '#0A0F1A',
        borderBottom: '1px solid #1F2937',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#F5F0E8' }}>{filteredSurahs.length}</span>
          <span style={{ fontSize: '12px', color: '#6B7280' }}>of 114</span>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          style={{
            fontSize: '12px',
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '6px 28px 6px 10px',
            color: '#E5E7EB',
            fontWeight: 500,
            cursor: 'pointer',
            outline: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 8px center',
            backgroundSize: '12px',
            appearance: 'none',
          }}
        >
          <option value="number">By Number</option>
          <option value="revelation">By Revelation</option>
          <option value="year">By Year</option>
          <option value="name">A-Z</option>
        </select>
      </div>

      {/* Results */}
      {filteredSurahs.length > 0 ? (
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredSurahs.map((surah) => (
            <SurahResultCard
              key={surah.number}
              surah={surah}
              isSelected={selectedSurahNumber === surah.number}
              onClick={() => handleSurahClick(surah.number, surah.approximateYear)}
            />
          ))}
        </div>
      ) : (
        // Empty state
        <div style={{ textAlign: 'center', padding: '64px 24px' }}>
          <BookOpen style={{ width: '64px', height: '64px', margin: '0 auto 16px', color: 'rgba(232, 227, 219, 0.2)' }} />
          <p style={{ color: 'rgba(232, 227, 219, 0.6)', marginBottom: '4px' }}>No surahs match your filters</p>
          <p style={{ fontSize: '14px', color: 'rgba(232, 227, 219, 0.4)', marginBottom: '16px' }}>Try adjusting your search or filters</p>
          <button
            onClick={resetFilters}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#C8A84E',
              color: '#0A0F1A',
              fontSize: '14px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
