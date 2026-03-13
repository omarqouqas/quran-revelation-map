/**
 * Geographic coordinates, themes, and historical context for each surah
 * This is Layer 3 of our data architecture - manually curated interpretive data
 */

import { getQuranMetaSurah, SURAH_MEANINGS } from '@/lib/quran-data';

/** Key geographic locations during the revelation period */
export const LOCATIONS = {
  MAKKAH: { lat: 21.4225, lng: 39.8262 },
  MADINAH: { lat: 24.4686, lng: 39.6142 },
  CAVE_HIRA: { lat: 21.4574, lng: 39.8583 },
  BADR: { lat: 23.7833, lng: 38.7667 },
  UHUD: { lat: 24.5017, lng: 39.6150 },
  HUDAYBIYYAH: { lat: 21.4411, lng: 39.6083 },
  TAIF: { lat: 21.2703, lng: 40.4158 },
  ARAFAT: { lat: 21.3549, lng: 39.9842 },
  MINA: { lat: 21.4133, lng: 39.8933 },
  JUHFA: { lat: 22.7167, lng: 39.1500 },
} as const;

export type LocationKey = keyof typeof LOCATIONS;

/**
 * Seeded random number generator for deterministic jitter
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

/**
 * Apply jitter to coordinates to prevent marker stacking
 */
function applyJitter(
  base: { lat: number; lng: number },
  surahNumber: number,
  jitterAmount = 0.015
): { lat: number; lng: number } {
  const randLat = seededRandom(surahNumber * 17);
  const randLng = seededRandom(surahNumber * 31);
  return {
    lat: base.lat + (randLat - 0.5) * jitterAmount * 2,
    lng: base.lng + (randLng - 0.5) * jitterAmount * 2,
  };
}

/** Surah-specific location data */
interface SurahLocationData {
  /** Override location (if different from default Makkah/Madinah) */
  locationKey?: LocationKey;
  /** Key themes (2-3 broad categories) */
  themes: string[];
  /** Brief historical context */
  context: string;
  /** Override approximate year (if known precisely) */
  yearOverride?: number;
  /** Related event IDs */
  relatedEvents?: string[];
}

/**
 * Location and context data for all 114 surahs
 * Surahs not listed here use default location based on Makki/Madani classification
 */
const surahLocationData: Partial<Record<number, SurahLocationData>> = {
  // Special location overrides and detailed context
  1: {
    themes: ['Praise and Worship', 'Guidance', 'Prayer'],
    context: 'The essential prayer taught by Allah, recited in every unit of salah.',
    relatedEvents: ['first-revelation'],
  },
  2: {
    themes: ['Islamic Law', 'Stories of Prophets', 'Community Guidance'],
    context: 'The longest surah, revealed over several years to guide the new Muslim community in Madinah.',
    relatedEvents: ['hijra', 'badr'],
  },
  3: {
    themes: ['Unity of Believers', 'Battle of Uhud', 'Dialogue with Christians'],
    context: 'Revealed after Uhud to console believers and address the Christian delegation from Najran.',
    yearOverride: 625,
    relatedEvents: ['uhud'],
  },
  4: {
    themes: ['Women\'s Rights', 'Inheritance Law', 'Social Justice'],
    context: 'Established rights for women and orphans after losses at Uhud.',
    yearOverride: 626,
    relatedEvents: ['uhud'],
  },
  5: {
    themes: ['Covenants', 'Dietary Laws', 'Completion of Religion'],
    context: 'Among the last surahs, contains the verse declaring perfection of the religion at Arafat.',
    yearOverride: 632,
    locationKey: 'ARAFAT',
    relatedEvents: ['farewell-pilgrimage'],
  },
  6: {
    themes: ['Tawhid', 'Arguments Against Polytheism', 'Creation Signs'],
    context: 'Revealed entirely at once during the Year of Sorrow to strengthen resolve.',
    yearOverride: 619,
    relatedEvents: ['year-of-sorrow'],
  },
  8: {
    themes: ['Warfare Ethics', 'Divine Support', 'Distribution of Gains'],
    context: 'Revealed after the Battle of Badr addressing the miraculous victory and war spoils.',
    yearOverride: 624,
    locationKey: 'BADR',
    relatedEvents: ['badr'],
  },
  9: {
    themes: ['Disavowal of Polytheists', 'Exposure of Hypocrites', 'Repentance'],
    context: 'One of the last surahs, no Basmalah as it declares severance from polytheists.',
    yearOverride: 631,
    relatedEvents: ['conquest-makkah'],
  },
  12: {
    themes: ['Story of Yusuf', 'Patience Through Trials', 'Divine Planning'],
    context: 'Complete narrative of Prophet Yusuf, revealed during the Year of Sorrow as consolation.',
    yearOverride: 619,
    relatedEvents: ['year-of-sorrow'],
  },
  17: {
    themes: ['Night Journey', 'Moral Guidelines', 'Children of Israel'],
    context: 'Commemorates the miraculous Isra from Makkah to Jerusalem.',
    yearOverride: 621,
    relatedEvents: ['isra-miraj'],
  },
  19: {
    themes: ['Story of Maryam and Isa', 'Mercy of Allah', 'Prophetic Stories'],
    context: 'Recited by Ja\'far to the Christian king of Abyssinia during the first migration.',
    yearOverride: 615,
    relatedEvents: ['first-abyssinia'],
  },
  28: {
    themes: ['Story of Musa', 'Pharaoh\'s Tyranny', 'Divine Justice'],
    context: 'Verse 85 revealed at Juhfa during the Hijra journey.',
    relatedEvents: ['hijra'],
  },
  33: {
    themes: ['Battle of the Trench', 'Prophet\'s Household', 'Social Legislation'],
    context: 'Revealed during and after the siege of Madinah by confederate forces.',
    yearOverride: 627,
    relatedEvents: ['trench'],
  },
  47: {
    themes: ['Fighting for Faith', 'Hypocrites', 'Paradise Description'],
    context: 'Verse 13 revealed during the Hijra journey to Madinah.',
    relatedEvents: ['hijra'],
  },
  48: {
    themes: ['Treaty of Hudaybiyyah', 'Pledge of Ridwan', 'Future Victory'],
    context: 'Revealed while returning from Hudaybiyyah, declaring the treaty a clear victory.',
    yearOverride: 628,
    locationKey: 'HUDAYBIYYAH',
    relatedEvents: ['hudaybiyyah'],
  },
  59: {
    themes: ['Banu Nadir Expulsion', 'Distribution of Gains', 'Names of Allah'],
    context: 'Revealed after the expulsion of Banu Nadir from Madinah.',
    yearOverride: 625,
    relatedEvents: ['banu-nadir'],
  },
  72: {
    themes: ['Jinn Accepting Islam', 'Unseen Knowledge', 'Protection of Revelation'],
    context: 'Revealed when jinn heard the Prophet reciting after the Taif journey.',
    yearOverride: 620,
    locationKey: 'TAIF',
    relatedEvents: ['taif-journey'],
  },
  74: {
    themes: ['Call to Warn', 'Purification', 'Patience'],
    context: 'Among the earliest revelations, commanding the Prophet to rise and warn.',
    yearOverride: 610,
    relatedEvents: ['first-revelation'],
  },
  96: {
    themes: ['First Revelation', 'Command to Read', 'Human Creation'],
    context: 'The very first revelation to Prophet Muhammad at Cave Hira.',
    yearOverride: 610,
    locationKey: 'CAVE_HIRA',
    relatedEvents: ['first-revelation'],
  },
  110: {
    themes: ['Victory', 'People Entering Islam', 'Seeking Forgiveness'],
    context: 'Last surah revealed, at Mina during the Farewell Pilgrimage, signaling the end.',
    yearOverride: 632,
    locationKey: 'MINA',
    relatedEvents: ['farewell-pilgrimage'],
  },
};

/**
 * Default themes by revelation period and position
 */
const MAKKI_THEMES = [
  ['Tawhid', 'Day of Judgment', 'Warning to Disbelievers'],
  ['Stories of Prophets', 'Patience in Persecution', 'Signs of Allah'],
  ['Resurrection', 'Divine Power', 'Rejection of Idolatry'],
  ['Previous Nations', 'Consolation', 'Truth vs Falsehood'],
  ['Gratitude', 'Creation Signs', 'Prophetic Mission'],
];

const MADANI_THEMES = [
  ['Community Building', 'Legal Rulings', 'Social Ethics'],
  ['Warfare Ethics', 'Hypocrites', 'Relations with Others'],
  ['Family Law', 'Inheritance', 'Justice'],
  ['Covenants', 'Unity of Believers', 'Obedience to Allah'],
];

/**
 * Get themes for a surah (custom or generated)
 */
function getThemes(surahNumber: number, isMeccan: boolean): string[] {
  const custom = surahLocationData[surahNumber];
  if (custom?.themes) {
    return custom.themes;
  }

  // Generate default themes based on period and position
  const themeSet = isMeccan ? MAKKI_THEMES : MADANI_THEMES;
  const index = surahNumber % themeSet.length;
  return themeSet[index];
}

/**
 * Generate default context based on classification
 */
function getDefaultContext(surahNumber: number, isMeccan: boolean): string {
  if (isMeccan) {
    return 'Revealed during the Makki period, focusing on fundamentals of faith and building spiritual resilience.';
  }
  return 'Revealed during the Madani period, establishing laws and guidance for the growing Muslim community.';
}

/**
 * Calculate approximate year based on revelation order
 */
function calculateApproximateYear(revelationOrder: number, isMeccan: boolean): number {
  if (isMeccan) {
    // Makki period: 610-622 CE (86 surahs over 13 years)
    const makkiSurahCount = 86;
    const yearRange = 12; // 610-622
    const position = Math.min(revelationOrder, makkiSurahCount);
    return 610 + Math.floor((position / makkiSurahCount) * yearRange);
  } else {
    // Madani period: 622-632 CE (28 surahs over 10 years)
    const madaniPosition = revelationOrder - 86;
    const madaniSurahCount = 28;
    const yearRange = 10;
    const position = Math.max(0, Math.min(madaniPosition, madaniSurahCount));
    return 622 + Math.floor((position / madaniSurahCount) * yearRange);
  }
}

/** Complete surah data for the app */
export interface CompleteSurahData {
  number: number;
  arabicName: string;
  englishName: string;
  englishMeaning: string;
  ayahCount: number;
  revelationOrder: number;
  isMeccan: boolean;
  classification: 'Makki' | 'Madani';
  approximateYear: number;
  location: { lat: number; lng: number };
  themes: string[];
  context: string;
  relatedEvents: string[];
}

/**
 * Build complete surah data by combining all three layers
 */
export function getCompleteSurahData(surahNumber: number): CompleteSurahData {
  // Layer 1: Canonical data from quran-meta
  const canonical = getQuranMetaSurah(surahNumber);

  // Layer 3: Location and context data
  const locationData = surahLocationData[surahNumber];

  // Determine base location
  let baseLocation: { lat: number; lng: number } = canonical.isMeccan
    ? LOCATIONS.MAKKAH
    : LOCATIONS.MADINAH;
  if (locationData?.locationKey) {
    baseLocation = LOCATIONS[locationData.locationKey];
  }

  // Apply jitter for clustering (except for special locations)
  const location = locationData?.locationKey
    ? baseLocation
    : applyJitter(baseLocation, surahNumber);

  // Calculate approximate year
  let approximateYear = calculateApproximateYear(
    canonical.revelationOrder,
    canonical.isMeccan
  );
  if (locationData?.yearOverride) {
    approximateYear = locationData.yearOverride;
  }

  return {
    number: surahNumber,
    arabicName: canonical.arabicName,
    englishName: canonical.englishName,
    englishMeaning: SURAH_MEANINGS[surahNumber] || '',
    ayahCount: canonical.ayahCount,
    revelationOrder: canonical.revelationOrder,
    isMeccan: canonical.isMeccan,
    classification: canonical.classification,
    approximateYear,
    location,
    themes: getThemes(surahNumber, canonical.isMeccan),
    context: locationData?.context || getDefaultContext(surahNumber, canonical.isMeccan),
    relatedEvents: locationData?.relatedEvents || [],
  };
}

/**
 * Get all 114 surahs with complete data
 */
export function getAllCompleteSurahs(): CompleteSurahData[] {
  const surahs: CompleteSurahData[] = [];
  for (let i = 1; i <= 114; i++) {
    surahs.push(getCompleteSurahData(i));
  }
  return surahs;
}

/**
 * Get surahs visible at a given year
 */
export function getSurahsByYear(year: number): CompleteSurahData[] {
  return getAllCompleteSurahs().filter((s) => s.approximateYear <= year);
}

/**
 * Get surahs sorted by revelation order
 */
export function getSurahsByRevelationOrder(): CompleteSurahData[] {
  return getAllCompleteSurahs().sort((a, b) => a.revelationOrder - b.revelationOrder);
}
