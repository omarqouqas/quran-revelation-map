/**
 * Period Context Data
 * Defines the 6 sub-periods of revelation with historical context
 */

/** Sub-period definition within the revelation period */
export interface RevelationPeriod {
  id: string;
  name: string;
  arabicName: string;
  yearRange: { start: number; end: number };
  color: string;
  description: string;
  context: string;
  keyThemes: string[];
  keyEventIds: string[];
}

/** The 6 sub-periods of Quranic revelation */
export const revelationPeriods: RevelationPeriod[] = [
  {
    id: 'early-makkan',
    name: 'Early Makkan',
    arabicName: 'المكي المبكر',
    yearRange: { start: 610, end: 614 },
    color: '#D4AF37',
    description: 'Secret preaching to close family and friends',
    context:
      'The Prophet Muhammad (peace be upon him) received the first revelation in Cave Hira and began inviting people privately to Islam. Early converts included Khadijah, Ali, Abu Bakr, and Zayd ibn Haritha. The message focused on Tawhid (oneness of Allah), the afterlife, and moral purification. Surahs from this period are typically short, powerful, and rhythmic.',
    keyThemes: ['Tawhid', 'Day of Judgment', 'Moral Purification', 'Warning'],
    keyEventIds: ['first-revelation', 'secret-preaching'],
  },
  {
    id: 'middle-makkan',
    name: 'Middle Makkan',
    arabicName: 'المكي الأوسط',
    yearRange: { start: 615, end: 618 },
    color: '#C8A84E',
    description: 'Persecution intensifies, migration to Abyssinia',
    context:
      'As Islam spread, the Quraysh intensified their persecution of Muslims. Some believers migrated to Abyssinia (Ethiopia) seeking refuge under the just Christian king, Negus. The Quraysh imposed a harsh boycott on Banu Hashim, isolating them in a valley for three years. Surahs from this period offered comfort, told stories of previous prophets who faced similar trials, and promised ultimate victory for the believers.',
    keyThemes: ['Patience', 'Comfort', 'Stories of Prophets', 'Promise of Victory'],
    keyEventIds: ['public-preaching', 'persecution', 'first-abyssinia', 'second-abyssinia', 'boycott'],
  },
  {
    id: 'late-makkan',
    name: 'Late Makkan',
    arabicName: 'المكي المتأخر',
    yearRange: { start: 619, end: 621 },
    color: '#B8984E',
    description: 'Year of Sorrow, seeking allies, Isra and Mi\'raj',
    context:
      'The Year of Sorrow (619 CE) brought the deaths of both Khadijah and Abu Talib, leaving the Prophet without his closest support. He traveled to Taif seeking allies but was rejected and stoned. Then came the miraculous Night Journey (Isra and Mi\'raj) - a divine consolation. The Prophet began meeting pilgrims from Yathrib (Madinah), leading to the Pledges of Aqabah. Hope emerged for a new beginning.',
    keyThemes: ['Perseverance', 'Divine Support', 'Hope', 'New Alliances'],
    keyEventIds: ['year-of-sorrow', 'taif-journey', 'isra-miraj', 'first-aqabah', 'second-aqabah'],
  },
  {
    id: 'early-madani',
    name: 'Early Madinan',
    arabicName: 'المدني المبكر',
    yearRange: { start: 622, end: 625 },
    color: '#3ECFC1',
    description: 'Establishing the Muslim community, early battles',
    context:
      'The Hijra to Madinah marked a turning point - Muslims now had a home. The Prophet established the Constitution of Madinah, creating a multi-faith society. The Muslims defended themselves at Badr (624 CE), a miraculous victory against overwhelming odds. The setback at Uhud (625 CE) taught valuable lessons. Surahs began addressing community laws, social structures, and relations with other groups.',
    keyThemes: ['Community Building', 'Defense', 'Law', 'Social Order'],
    keyEventIds: ['hijra', 'constitution-madinah', 'badr', 'uhud', 'banu-nadir'],
  },
  {
    id: 'middle-madani',
    name: 'Middle Madinan',
    arabicName: 'المدني الأوسط',
    yearRange: { start: 626, end: 629 },
    color: '#2EC4B6',
    description: 'Consolidation, treaties, and expansion',
    context:
      'The Battle of the Trench (627 CE) saw a coalition of enemies besiege Madinah, but the Muslims held firm with a defensive trench. The Treaty of Hudaybiyyah (628 CE) appeared unfavorable but was called "a clear victory" in the Quran - it brought peace and allowed Islam to spread rapidly. Khaybar was conquered. This period saw detailed social legislation and guidance for the growing community.',
    keyThemes: ['Treaties', 'Expansion', 'Detailed Laws', 'Hypocrites'],
    keyEventIds: ['trench', 'hudaybiyyah', 'khaybar'],
  },
  {
    id: 'late-madani',
    name: 'Late Madinan',
    arabicName: 'المدني المتأخر',
    yearRange: { start: 630, end: 632 },
    color: '#2DB4A6',
    description: 'Conquest, completion of religion, farewell',
    context:
      'Makkah was conquered peacefully in 630 CE - the Prophet forgave his former persecutors. The Battle of Hunayn followed, then delegations from across Arabia came to accept Islam. The Farewell Pilgrimage (632 CE) saw the final verses revealed, completing the religion. Shortly after, the Prophet passed away, having fulfilled his mission. These final surahs addressed completion, legacy, and the continuation of the message.',
    keyThemes: ['Victory', 'Forgiveness', 'Completion', 'Legacy'],
    keyEventIds: ['conquest-makkah', 'hunayn', 'farewell-pilgrimage', 'death-prophet'],
  },
];

/**
 * Get the revelation period for a specific year
 */
export function getPeriodForYear(year: number): RevelationPeriod {
  const period = revelationPeriods.find(
    (p) => year >= p.yearRange.start && year <= p.yearRange.end
  );
  // Default to first period if year is before 610 or last if after 632
  if (!period) {
    if (year < 610) return revelationPeriods[0];
    return revelationPeriods[revelationPeriods.length - 1];
  }
  return period;
}

/**
 * Calculate the Prophet's age for a given year
 * Prophet Muhammad (peace be upon him) was born in 570 CE
 */
export function getProphetAge(year: number): number {
  const PROPHET_BIRTH_YEAR = 570;
  return year - PROPHET_BIRTH_YEAR;
}

/**
 * Check if a year is in the Makkan period
 */
export function isMakkanYear(year: number): boolean {
  return year < 622;
}
