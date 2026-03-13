/**
 * Filtering and sorting utilities for the Surah Explorer
 */

import {
  getAllCompleteSurahs,
  LOCATIONS,
  type CompleteSurahData,
  type LocationKey,
} from '@/data/surah-locations';

type PeriodFilter = 'all' | 'makki' | 'madani';
type SortBy = 'number' | 'revelation' | 'year' | 'name';

export interface ExplorerFilters {
  searchQuery: string;
  selectedThemes: string[];
  periodFilter: PeriodFilter;
  yearRange: [number, number];
  selectedLocations: LocationKey[];
}

/**
 * Extract all unique themes from all surahs
 */
export function getAllUniqueThemes(): string[] {
  const themes = new Set<string>();
  getAllCompleteSurahs().forEach((surah) => {
    surah.themes.forEach((theme) => themes.add(theme));
  });
  return Array.from(themes).sort();
}

/**
 * Get all location keys with display names
 */
export function getLocationOptions(): { key: LocationKey; name: string; arabic: string }[] {
  return [
    { key: 'MAKKAH', name: 'Makkah', arabic: 'مكة' },
    { key: 'MADINAH', name: 'Madinah', arabic: 'المدينة' },
    { key: 'CAVE_HIRA', name: 'Cave Hira', arabic: 'غار حراء' },
    { key: 'BADR', name: 'Badr', arabic: 'بدر' },
    { key: 'UHUD', name: 'Uhud', arabic: 'أحد' },
    { key: 'HUDAYBIYYAH', name: 'Hudaybiyyah', arabic: 'الحديبية' },
    { key: 'TAIF', name: 'Taif', arabic: 'الطائف' },
    { key: 'ARAFAT', name: 'Arafat', arabic: 'عرفات' },
    { key: 'MINA', name: 'Mina', arabic: 'منى' },
    { key: 'JUHFA', name: 'Juhfa', arabic: 'الجحفة' },
  ];
}

/**
 * Get location key from coordinates (with tolerance for jitter)
 */
function getLocationKeyFromCoords(
  coords: { lat: number; lng: number },
  tolerance = 0.05
): LocationKey | null {
  for (const [key, loc] of Object.entries(LOCATIONS)) {
    if (
      Math.abs(coords.lat - loc.lat) < tolerance &&
      Math.abs(coords.lng - loc.lng) < tolerance
    ) {
      return key as LocationKey;
    }
  }
  return null;
}

/**
 * Check if surah matches the search query
 */
function matchesSearch(surah: CompleteSurahData, query: string): boolean {
  if (!query.trim()) return true;

  const lowerQuery = query.toLowerCase().trim();
  return (
    surah.englishName.toLowerCase().includes(lowerQuery) ||
    surah.arabicName.includes(query) ||
    surah.englishMeaning.toLowerCase().includes(lowerQuery) ||
    surah.number.toString() === lowerQuery
  );
}

/**
 * Check if surah matches the period filter
 */
function matchesPeriod(surah: CompleteSurahData, period: PeriodFilter): boolean {
  if (period === 'all') return true;
  if (period === 'makki') return surah.isMeccan;
  return !surah.isMeccan;
}

/**
 * Check if surah falls within year range
 */
function matchesYearRange(surah: CompleteSurahData, range: [number, number]): boolean {
  return surah.approximateYear >= range[0] && surah.approximateYear <= range[1];
}

/**
 * Check if surah matches any of the selected themes
 */
function matchesThemes(surah: CompleteSurahData, themes: string[]): boolean {
  if (themes.length === 0) return true;
  return surah.themes.some((theme) => themes.includes(theme));
}

/**
 * Check if surah matches any of the selected locations
 */
function matchesLocations(surah: CompleteSurahData, locations: LocationKey[]): boolean {
  if (locations.length === 0) return true;
  const surahLocation = getLocationKeyFromCoords(surah.location);
  if (!surahLocation) {
    // Default to Makkah or Madinah based on classification
    const defaultLocation = surah.isMeccan ? 'MAKKAH' : 'MADINAH';
    return locations.includes(defaultLocation);
  }
  return locations.includes(surahLocation);
}

/**
 * Filter surahs based on all criteria
 */
export function filterSurahs(
  surahs: CompleteSurahData[],
  filters: ExplorerFilters
): CompleteSurahData[] {
  return surahs.filter((surah) => {
    return (
      matchesSearch(surah, filters.searchQuery) &&
      matchesPeriod(surah, filters.periodFilter) &&
      matchesYearRange(surah, filters.yearRange) &&
      matchesThemes(surah, filters.selectedThemes) &&
      matchesLocations(surah, filters.selectedLocations)
    );
  });
}

/**
 * Sort surahs by specified criteria
 */
export function sortSurahs(surahs: CompleteSurahData[], sortBy: SortBy): CompleteSurahData[] {
  const sorted = [...surahs];

  switch (sortBy) {
    case 'number':
      return sorted.sort((a, b) => a.number - b.number);
    case 'revelation':
      return sorted.sort((a, b) => a.revelationOrder - b.revelationOrder);
    case 'year':
      return sorted.sort((a, b) => a.approximateYear - b.approximateYear);
    case 'name':
      return sorted.sort((a, b) => a.englishName.localeCompare(b.englishName));
    default:
      return sorted;
  }
}
