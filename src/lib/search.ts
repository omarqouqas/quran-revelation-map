/**
 * Global search functionality for surahs, events, and sacred sites
 */

import { getAllCompleteSurahs, type CompleteSurahData } from '@/data/surah-locations';
import { events, type HistoricalEvent } from '@/data/events';
import { SACRED_SITES, SACRED_SITE_STYLES, type SacredSite } from '@/data/sacred-sites';

/** Search result type discriminator */
export type SearchResultType = 'surah' | 'event' | 'site';

/** Unified search result */
export interface SearchResult {
  type: SearchResultType;
  id: string | number;
  title: string;
  titleArabic?: string;
  subtitle: string;
  year?: number;
  meta?: string;
  metaColor?: string;
  score: number;
  data: CompleteSurahData | HistoricalEvent | SacredSite;
}

/** Categorized search results */
export interface SearchResults {
  surahs: SearchResult[];
  events: SearchResult[];
  sites: SearchResult[];
  total: number;
}

/** Result limits per category */
const LIMITS = {
  surahs: 5,
  events: 5,
  sites: 3,
} as const;

/**
 * Calculate match score for a query against text
 * Higher score = better match
 */
function calculateScore(text: string, query: string): number {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // Exact match: highest score
  if (lowerText === lowerQuery) return 100;

  // Starts with query: high score
  if (lowerText.startsWith(lowerQuery)) return 80;

  // Word starts with query: medium-high score
  const words = lowerText.split(/\s+/);
  if (words.some((word) => word.startsWith(lowerQuery))) return 70;

  // Contains query: medium score
  if (lowerText.includes(lowerQuery)) return 60;

  // No match
  return 0;
}

/**
 * Get the best score from multiple text fields
 */
function getBestScore(query: string, ...texts: (string | undefined)[]): number {
  return Math.max(
    ...texts.filter((t): t is string => !!t).map((text) => calculateScore(text, query))
  );
}

/**
 * Search surahs
 */
function searchSurahs(query: string): SearchResult[] {
  const allSurahs = getAllCompleteSurahs();
  const results: SearchResult[] = [];

  for (const surah of allSurahs) {
    // Check surah number match (exact)
    const numberMatch = surah.number.toString() === query;

    // Check text fields
    const score = Math.max(
      numberMatch ? 100 : 0,
      getBestScore(
        query,
        surah.englishName,
        surah.arabicName,
        surah.englishMeaning,
        ...surah.themes,
        surah.context
      )
    );

    if (score > 0) {
      results.push({
        type: 'surah',
        id: surah.number,
        title: surah.englishName,
        titleArabic: surah.arabicName,
        subtitle: surah.englishMeaning,
        year: surah.approximateYear,
        meta: surah.classification,
        metaColor: surah.isMeccan ? '#C8A84E' : '#2EC4B6',
        score,
        data: surah,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, LIMITS.surahs);
}

/**
 * Search events
 */
function searchEvents(query: string): SearchResult[] {
  const results: SearchResult[] = [];

  for (const event of events) {
    const score = getBestScore(query, event.name, event.arabicName, event.description);

    if (score > 0) {
      results.push({
        type: 'event',
        id: event.id,
        title: event.name,
        titleArabic: event.arabicName,
        subtitle:
          event.description.length > 80
            ? event.description.slice(0, 80) + '...'
            : event.description,
        year: event.year,
        meta: `${event.year} CE`,
        metaColor: '#8B5CF6',
        score,
        data: event,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, LIMITS.events);
}

/**
 * Search sacred sites
 */
function searchSites(query: string): SearchResult[] {
  const results: SearchResult[] = [];

  for (const site of SACRED_SITES) {
    const score = getBestScore(query, site.name, site.arabicName, site.description, site.category);

    if (score > 0) {
      const style = SACRED_SITE_STYLES[site.category];
      results.push({
        type: 'site',
        id: site.name,
        title: site.name,
        titleArabic: site.arabicName,
        subtitle:
          site.description.length > 80 ? site.description.slice(0, 80) + '...' : site.description,
        meta: style.label,
        metaColor: style.color,
        score,
        data: site,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, LIMITS.sites);
}

/**
 * Perform global search across all data types
 */
export function globalSearch(query: string): SearchResults {
  const trimmedQuery = query.trim();

  // Return empty results for empty queries
  if (!trimmedQuery) {
    return {
      surahs: [],
      events: [],
      sites: [],
      total: 0,
    };
  }

  const surahs = searchSurahs(trimmedQuery);
  const eventsResults = searchEvents(trimmedQuery);
  const sites = searchSites(trimmedQuery);

  return {
    surahs,
    events: eventsResults,
    sites,
    total: surahs.length + eventsResults.length + sites.length,
  };
}

/**
 * Get all results as a flat array (for keyboard navigation)
 */
export function getAllResultsFlat(results: SearchResults): SearchResult[] {
  return [...results.surahs, ...results.events, ...results.sites];
}
