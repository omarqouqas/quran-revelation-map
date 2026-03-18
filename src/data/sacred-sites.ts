/**
 * Sacred sites data for the Quran Revelation Map
 * Contains key locations with descriptions and related content
 */

import { LOCATIONS, type LocationKey } from './surah-locations';

/** Sacred site categories */
export type SacredSiteCategory = 'holy' | 'revelation' | 'battle' | 'journey';

/** Sacred site data structure */
export interface SacredSite {
  name: string;
  arabicName: string;
  lat: number;
  lng: number;
  category: SacredSiteCategory;
  description: string;
  locationKey: LocationKey;
  relatedEventIds: string[];
}

/** Sacred site category colors and styling */
export const SACRED_SITE_STYLES: Record<SacredSiteCategory, {
  color: string;
  glowColor: string;
  label: string;
}> = {
  holy: {
    color: '#FFD700',
    glowColor: 'rgba(255, 215, 0, 0.6)',
    label: 'Holy Site'
  },
  revelation: {
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    label: 'Revelation Site'
  },
  battle: {
    color: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    label: 'Battle Site'
  },
  journey: {
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    label: 'Journey Site'
  },
};

/** All sacred sites */
export const SACRED_SITES: SacredSite[] = [
  {
    name: 'Makkah',
    arabicName: 'مكة المكرمة',
    ...LOCATIONS.MAKKAH,
    category: 'holy',
    locationKey: 'MAKKAH',
    description: 'The holiest city in Islam, home of the Kaaba. Most Makki surahs were revealed here during the first 13 years of prophethood.',
    relatedEventIds: ['first-revelation', 'public-preaching', 'year-of-sorrow', 'conquest-makkah'],
  },
  {
    name: 'Madinah',
    arabicName: 'المدينة المنورة',
    ...LOCATIONS.MADINAH,
    category: 'holy',
    locationKey: 'MADINAH',
    description: 'The radiant city and second holiest site in Islam. After the Hijra in 622 CE, it became the center of the Muslim community where Madani surahs were revealed.',
    relatedEventIds: ['hijra', 'constitution-madinah', 'trench'],
  },
  {
    name: 'Cave Hira',
    arabicName: 'غار حراء',
    ...LOCATIONS.CAVE_HIRA,
    category: 'revelation',
    locationKey: 'CAVE_HIRA',
    description: 'The mountain cave where the first revelation descended to Prophet Muhammad in 610 CE. Here the opening verses of Surah Al-Alaq were revealed.',
    relatedEventIds: ['first-revelation'],
  },
  {
    name: 'Badr',
    arabicName: 'بدر',
    ...LOCATIONS.BADR,
    category: 'battle',
    locationKey: 'BADR',
    description: 'Site of the decisive Battle of Badr in 624 CE, where 313 Muslims achieved victory against a much larger Quraysh army. Surah Al-Anfal addresses this event.',
    relatedEventIds: ['badr'],
  },
  {
    name: 'Uhud',
    arabicName: 'أحد',
    ...LOCATIONS.UHUD,
    category: 'battle',
    locationKey: 'UHUD',
    description: 'Mountain near Madinah where the Battle of Uhud took place in 625 CE. The battle is extensively discussed in Surah Al-Imran.',
    relatedEventIds: ['uhud'],
  },
  {
    name: 'Taif',
    arabicName: 'الطائف',
    ...LOCATIONS.TAIF,
    category: 'journey',
    locationKey: 'TAIF',
    description: 'Mountain city visited by the Prophet during the Year of Sorrow (619 CE) seeking support. Though rejected, Surah Al-Jinn was revealed during the return journey.',
    relatedEventIds: ['taif-journey'],
  },
  {
    name: 'Hudaybiyyah',
    arabicName: 'الحديبية',
    ...LOCATIONS.HUDAYBIYYAH,
    category: 'journey',
    locationKey: 'HUDAYBIYYAH',
    description: 'Site of the historic peace treaty in 628 CE between Muslims and Quraysh. Surah Al-Fath was revealed declaring this "clear victory".',
    relatedEventIds: ['hudaybiyyah'],
  },
  {
    name: 'Arafat',
    arabicName: 'عرفات',
    ...LOCATIONS.ARAFAT,
    category: 'holy',
    locationKey: 'ARAFAT',
    description: 'Sacred mount of the Farewell Pilgrimage in 632 CE. Here the final verse declaring the perfection of Islam was revealed (Surah Al-Ma\'idah 5:3).',
    relatedEventIds: ['farewell-pilgrimage'],
  },
];

/** Get a sacred site by name */
export function getSacredSiteByName(name: string): SacredSite | undefined {
  return SACRED_SITES.find(site => site.name === name);
}

/** Get sacred sites by category */
export function getSacredSitesByCategory(category: SacredSiteCategory): SacredSite[] {
  return SACRED_SITES.filter(site => site.category === category);
}
