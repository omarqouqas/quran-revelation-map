/**
 * Dataset of significant historical events during the revelation period (610-632 CE)
 */

import type { HistoricalEvent } from '@/types';

export const events: HistoricalEvent[] = [
  {
    id: 'first-revelation',
    name: 'First Revelation',
    year: 610,
    locationId: 'cave-hira',
    description: 'Angel Jibril appeared to Prophet Muhammad (PBUH) in Cave Hira with the first verses of Surah Al-Alaq, marking the beginning of Quranic revelation.',
    relatedSurahs: [96, 68, 73, 74, 1],
  },
  {
    id: 'public-preaching',
    name: 'Public Preaching Begins',
    year: 613,
    locationId: 'makkah',
    description: 'After three years of private teaching, the Prophet was commanded to proclaim Islam publicly. He stood on Mount Safa and called the Quraysh to monotheism.',
    relatedSurahs: [111, 74, 15, 26],
  },
  {
    id: 'persecution',
    name: 'Persecution Period',
    year: 614,
    locationId: 'makkah',
    description: 'The Quraysh intensified persecution of Muslims. Believers were tortured, killed, and boycotted. Many surahs from this period offer consolation and warnings to oppressors.',
    relatedSurahs: [85, 16, 29, 25, 7],
  },
  {
    id: 'abyssinia',
    name: 'Migration to Abyssinia',
    year: 615,
    locationId: 'makkah',
    description: 'A group of Muslims migrated to Abyssinia (Ethiopia) to escape persecution. They were welcomed by the Christian king Negus after Ja\'far recited Surah Maryam.',
    relatedSurahs: [19, 20, 18],
  },
  {
    id: 'year-of-sorrow',
    name: 'Year of Sorrow',
    year: 619,
    locationId: 'makkah',
    description: 'The Prophet lost both his beloved wife Khadijah and his uncle Abu Talib within weeks. This was the most difficult year, leading to his journey to Taif.',
    relatedSurahs: [6, 12, 15, 31, 34, 37, 39, 40, 41],
  },
  {
    id: 'taif',
    name: 'Journey to Taif',
    year: 620,
    locationId: 'taif',
    description: 'The Prophet traveled to Taif seeking support but was rejected and stoned. On his return, a group of jinn heard him reciting Quran and believed.',
    relatedSurahs: [72, 46],
  },
  {
    id: 'isra-miraj',
    name: 'Isra and Mi\'raj',
    year: 621,
    locationId: 'makkah',
    description: 'The miraculous Night Journey from Makkah to Jerusalem and Ascension through the heavens. The five daily prayers were prescribed during this journey.',
    relatedSurahs: [17, 53, 81, 84],
  },
  {
    id: 'hijra',
    name: 'Hijra to Madinah',
    year: 622,
    locationId: 'madinah',
    description: 'The Prophet and Abu Bakr migrated to Madinah, establishing the first Islamic state. This event marks the beginning of the Islamic calendar.',
    relatedSurahs: [2, 8, 47],
  },
  {
    id: 'badr',
    name: 'Battle of Badr',
    year: 624,
    locationId: 'badr',
    description: 'The first major battle of Islam. 313 Muslims defeated over 1000 Quraysh fighters with divine support. This victory established the Muslim community.',
    relatedSurahs: [8, 3],
  },
  {
    id: 'uhud',
    name: 'Battle of Uhud',
    year: 625,
    locationId: 'mount-uhud',
    description: 'The Muslims faced setbacks after initial success when archers left their positions. 70 companions were martyred including Hamza. Important lessons were revealed.',
    relatedSurahs: [3, 4],
  },
  {
    id: 'trench',
    name: 'Battle of the Trench',
    year: 627,
    locationId: 'madinah',
    description: 'A confederation of 10,000 enemies besieged Madinah. The Muslims dug a trench on Salman al-Farisi\'s advice. After weeks, the siege failed miraculously.',
    relatedSurahs: [33, 59],
  },
  {
    id: 'hudaybiyyah',
    name: 'Treaty of Hudaybiyyah',
    year: 628,
    locationId: 'hudaybiyyah',
    description: 'A peace treaty with the Quraysh that seemed unfavorable but was declared by Allah as a clear victory. It allowed Islam to spread rapidly during the peace.',
    relatedSurahs: [48, 60],
  },
  {
    id: 'conquest-makkah',
    name: 'Conquest of Makkah',
    year: 630,
    locationId: 'makkah',
    description: 'The Prophet entered Makkah peacefully with 10,000 Muslims. He cleansed the Kaaba of idols and declared general amnesty. Most of Makkah accepted Islam.',
    relatedSurahs: [9, 110, 49],
  },
  {
    id: 'farewell-pilgrimage',
    name: 'Farewell Pilgrimage',
    year: 632,
    locationId: 'arafat',
    description: 'The Prophet\'s final pilgrimage where he delivered the Farewell Sermon at Arafat. The verse declaring the completion of the religion was revealed.',
    relatedSurahs: [5, 110],
  },
];

/** Get an event by its ID */
export const getEventById = (id: string): HistoricalEvent | undefined => {
  return events.find(event => event.id === id);
};

/** Get events by year */
export const getEventsByYear = (year: number): HistoricalEvent[] => {
  return events.filter(event => event.year === year);
};

/** Get events up to a specific year */
export const getEventsUpToYear = (year: number): HistoricalEvent[] => {
  return events.filter(event => event.year <= year);
};

/** Get events related to a specific surah */
export const getEventsForSurah = (surahNumber: number): HistoricalEvent[] => {
  return events.filter(event => event.relatedSurahs.includes(surahNumber));
};
