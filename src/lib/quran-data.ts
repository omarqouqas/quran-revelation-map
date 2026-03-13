/**
 * Wrapper for quran-meta package providing canonical surah data
 * This is Layer 1 of our data architecture
 */

import { getSurahMeta, type SurahMeta } from 'quran-meta/hafs';

export type { SurahMeta };

/**
 * Extended surah data combining quran-meta with our app's needs
 */
export interface AppSurahData {
  /** Surah number (1-114) */
  number: number;
  /** Arabic name from quran-meta */
  arabicName: string;
  /** English transliteration */
  englishName: string;
  /** Number of ayat */
  ayahCount: number;
  /** Chronological revelation order (1-114) */
  revelationOrder: number;
  /** Whether revealed in Makki or Madani period */
  isMeccan: boolean;
  /** Classification label */
  classification: 'Makki' | 'Madani';
}

/** English transliterations for all 114 surahs */
const SURAH_ENGLISH_NAMES: Record<number, string> = {
  1: 'Al-Fatihah',
  2: 'Al-Baqarah',
  3: 'Ali \'Imran',
  4: 'An-Nisa',
  5: 'Al-Ma\'idah',
  6: 'Al-An\'am',
  7: 'Al-A\'raf',
  8: 'Al-Anfal',
  9: 'At-Tawbah',
  10: 'Yunus',
  11: 'Hud',
  12: 'Yusuf',
  13: 'Ar-Ra\'d',
  14: 'Ibrahim',
  15: 'Al-Hijr',
  16: 'An-Nahl',
  17: 'Al-Isra',
  18: 'Al-Kahf',
  19: 'Maryam',
  20: 'Ta-Ha',
  21: 'Al-Anbiya',
  22: 'Al-Hajj',
  23: 'Al-Mu\'minun',
  24: 'An-Nur',
  25: 'Al-Furqan',
  26: 'Ash-Shu\'ara',
  27: 'An-Naml',
  28: 'Al-Qasas',
  29: 'Al-\'Ankabut',
  30: 'Ar-Rum',
  31: 'Luqman',
  32: 'As-Sajdah',
  33: 'Al-Ahzab',
  34: 'Saba',
  35: 'Fatir',
  36: 'Ya-Sin',
  37: 'As-Saffat',
  38: 'Sad',
  39: 'Az-Zumar',
  40: 'Ghafir',
  41: 'Fussilat',
  42: 'Ash-Shura',
  43: 'Az-Zukhruf',
  44: 'Ad-Dukhan',
  45: 'Al-Jathiyah',
  46: 'Al-Ahqaf',
  47: 'Muhammad',
  48: 'Al-Fath',
  49: 'Al-Hujurat',
  50: 'Qaf',
  51: 'Adh-Dhariyat',
  52: 'At-Tur',
  53: 'An-Najm',
  54: 'Al-Qamar',
  55: 'Ar-Rahman',
  56: 'Al-Waqi\'ah',
  57: 'Al-Hadid',
  58: 'Al-Mujadilah',
  59: 'Al-Hashr',
  60: 'Al-Mumtahanah',
  61: 'As-Saff',
  62: 'Al-Jumu\'ah',
  63: 'Al-Munafiqun',
  64: 'At-Taghabun',
  65: 'At-Talaq',
  66: 'At-Tahrim',
  67: 'Al-Mulk',
  68: 'Al-Qalam',
  69: 'Al-Haqqah',
  70: 'Al-Ma\'arij',
  71: 'Nuh',
  72: 'Al-Jinn',
  73: 'Al-Muzzammil',
  74: 'Al-Muddaththir',
  75: 'Al-Qiyamah',
  76: 'Al-Insan',
  77: 'Al-Mursalat',
  78: 'An-Naba',
  79: 'An-Nazi\'at',
  80: '\'Abasa',
  81: 'At-Takwir',
  82: 'Al-Infitar',
  83: 'Al-Mutaffifin',
  84: 'Al-Inshiqaq',
  85: 'Al-Buruj',
  86: 'At-Tariq',
  87: 'Al-A\'la',
  88: 'Al-Ghashiyah',
  89: 'Al-Fajr',
  90: 'Al-Balad',
  91: 'Ash-Shams',
  92: 'Al-Layl',
  93: 'Ad-Duha',
  94: 'Ash-Sharh',
  95: 'At-Tin',
  96: 'Al-\'Alaq',
  97: 'Al-Qadr',
  98: 'Al-Bayyinah',
  99: 'Az-Zalzalah',
  100: 'Al-\'Adiyat',
  101: 'Al-Qari\'ah',
  102: 'At-Takathur',
  103: 'Al-\'Asr',
  104: 'Al-Humazah',
  105: 'Al-Fil',
  106: 'Quraysh',
  107: 'Al-Ma\'un',
  108: 'Al-Kawthar',
  109: 'Al-Kafirun',
  110: 'An-Nasr',
  111: 'Al-Masad',
  112: 'Al-Ikhlas',
  113: 'Al-Falaq',
  114: 'An-Nas',
};

/** English meanings for all 114 surahs */
export const SURAH_MEANINGS: Record<number, string> = {
  1: 'The Opening',
  2: 'The Cow',
  3: 'The Family of Imran',
  4: 'The Women',
  5: 'The Table Spread',
  6: 'The Cattle',
  7: 'The Heights',
  8: 'The Spoils of War',
  9: 'The Repentance',
  10: 'Jonah',
  11: 'Hud',
  12: 'Joseph',
  13: 'The Thunder',
  14: 'Abraham',
  15: 'The Rocky Tract',
  16: 'The Bee',
  17: 'The Night Journey',
  18: 'The Cave',
  19: 'Mary',
  20: 'Ta-Ha',
  21: 'The Prophets',
  22: 'The Pilgrimage',
  23: 'The Believers',
  24: 'The Light',
  25: 'The Criterion',
  26: 'The Poets',
  27: 'The Ant',
  28: 'The Stories',
  29: 'The Spider',
  30: 'The Romans',
  31: 'Luqman',
  32: 'The Prostration',
  33: 'The Combined Forces',
  34: 'Sheba',
  35: 'The Originator',
  36: 'Ya-Sin',
  37: 'Those Ranged in Ranks',
  38: 'Sad',
  39: 'The Groups',
  40: 'The Forgiver',
  41: 'Explained in Detail',
  42: 'The Consultation',
  43: 'The Gold Adornment',
  44: 'The Smoke',
  45: 'The Kneeling',
  46: 'The Sand Dunes',
  47: 'Muhammad',
  48: 'The Victory',
  49: 'The Private Chambers',
  50: 'Qaf',
  51: 'The Scattering Winds',
  52: 'The Mount',
  53: 'The Star',
  54: 'The Moon',
  55: 'The Most Merciful',
  56: 'The Inevitable Event',
  57: 'The Iron',
  58: 'The Pleading Woman',
  59: 'The Gathering',
  60: 'The Woman Examined',
  61: 'The Row',
  62: 'Friday',
  63: 'The Hypocrites',
  64: 'The Mutual Disillusion',
  65: 'The Divorce',
  66: 'The Prohibition',
  67: 'The Sovereignty',
  68: 'The Pen',
  69: 'The Inevitable Reality',
  70: 'The Ascending Stairways',
  71: 'Noah',
  72: 'The Jinn',
  73: 'The Enshrouded One',
  74: 'The Cloaked One',
  75: 'The Resurrection',
  76: 'The Human',
  77: 'Those Sent Forth',
  78: 'The Great News',
  79: 'Those Who Pull Out',
  80: 'He Frowned',
  81: 'The Folding Up',
  82: 'The Cleaving',
  83: 'Those Who Give Short Measure',
  84: 'The Splitting Asunder',
  85: 'The Constellations',
  86: 'The Night-Comer',
  87: 'The Most High',
  88: 'The Overwhelming Event',
  89: 'The Dawn',
  90: 'The City',
  91: 'The Sun',
  92: 'The Night',
  93: 'The Morning Brightness',
  94: 'The Relief',
  95: 'The Fig',
  96: 'The Clinging Clot',
  97: 'The Night of Decree',
  98: 'The Clear Evidence',
  99: 'The Earthquake',
  100: 'The Charging Steeds',
  101: 'The Striking Calamity',
  102: 'The Competition in Increase',
  103: 'The Time',
  104: 'The Slanderer',
  105: 'The Elephant',
  106: 'Quraysh',
  107: 'The Small Kindnesses',
  108: 'The Abundance',
  109: 'The Disbelievers',
  110: 'The Divine Support',
  111: 'The Palm Fiber',
  112: 'The Purity',
  113: 'The Daybreak',
  114: 'Mankind',
};

/**
 * Get canonical surah data from quran-meta for a single surah
 */
export function getQuranMetaSurah(surahNumber: number): AppSurahData {
  const meta = getSurahMeta(surahNumber as 1);

  return {
    number: surahNumber,
    arabicName: meta.name,
    englishName: SURAH_ENGLISH_NAMES[surahNumber] || meta.name,
    ayahCount: meta.ayahCount,
    revelationOrder: meta.surahOrder,
    isMeccan: meta.isMeccan,
    classification: meta.isMeccan ? 'Makki' : 'Madani',
  };
}

/**
 * Get all 114 surahs with canonical data from quran-meta
 */
export function getAllSurahs(): AppSurahData[] {
  const surahs: AppSurahData[] = [];

  for (let i = 1; i <= 114; i++) {
    surahs.push(getQuranMetaSurah(i));
  }

  return surahs;
}

/**
 * Get surahs sorted by revelation order
 */
export function getSurahsByRevelationOrder(): AppSurahData[] {
  return getAllSurahs().sort((a, b) => a.revelationOrder - b.revelationOrder);
}

/**
 * Get English meaning for a surah
 */
export function getSurahMeaning(surahNumber: number): string {
  return SURAH_MEANINGS[surahNumber] || '';
}
