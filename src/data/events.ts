/**
 * Historical events during the revelation period (610-632 CE)
 * Events with strong scholarly consensus linking them to specific surahs
 */

export interface HistoricalEvent {
  id: string;
  name: string;
  arabicName?: string;
  year: number;
  endYear?: number;
  location: { lat: number; lng: number };
  /** If event happened outside map bounds, this is the actual location name */
  offMapLocation?: string;
  description: string;
  relatedSurahNumbers: number[];
}

/** Key geographic locations */
const LOCATIONS = {
  MAKKAH: { lat: 21.4225, lng: 39.8262 },
  MADINAH: { lat: 24.4686, lng: 39.6142 },
  CAVE_HIRA: { lat: 21.4574, lng: 39.8583 },
  BADR: { lat: 23.7833, lng: 38.7667 },
  UHUD: { lat: 24.5017, lng: 39.6150 },
  HUDAYBIYYAH: { lat: 21.4411, lng: 39.6083 },
  TAIF: { lat: 21.2703, lng: 40.4158 },
  ARAFAT: { lat: 21.3549, lng: 39.9842 },
  MINA: { lat: 21.4133, lng: 39.8933 },
} as const;

/** Seeded random for deterministic jitter */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

/** Add small jitter to prevent overlapping markers */
function jitter(base: { lat: number; lng: number }, seed: number): { lat: number; lng: number } {
  const jitterAmount = 0.12; // ~12km
  return {
    lat: base.lat + (seededRandom(seed) - 0.5) * jitterAmount,
    lng: base.lng + (seededRandom(seed + 100) - 0.5) * jitterAmount,
  };
}

export const events: HistoricalEvent[] = [
  {
    id: 'first-revelation',
    name: 'First Revelation at Cave Hira',
    arabicName: 'نزول الوحي الأول',
    year: 610,
    location: LOCATIONS.CAVE_HIRA,
    description:
      'Angel Jibril appeared to Prophet Muhammad in Cave Hira with the first verses of Surah Al-Alaq, marking the beginning of Quranic revelation.',
    relatedSurahNumbers: [96, 74, 73],
  },
  {
    id: 'secret-preaching',
    name: 'Secret Preaching Period',
    arabicName: 'الدعوة السرية',
    year: 610,
    endYear: 613,
    location: jitter(LOCATIONS.MAKKAH, 1),
    description:
      'The Prophet privately invited close family and friends to Islam. Early converts included Khadijah, Ali, Abu Bakr, and Zayd ibn Haritha.',
    relatedSurahNumbers: [],
  },
  {
    id: 'public-preaching',
    name: 'Public Preaching Begins',
    arabicName: 'الجهر بالدعوة',
    year: 613,
    location: jitter(LOCATIONS.MAKKAH, 2),
    description:
      'The Prophet stood on Mount Safa and publicly called the Quraysh to Islam, marking the beginning of open preaching.',
    relatedSurahNumbers: [111, 26],
  },
  {
    id: 'persecution',
    name: 'Persecution of Early Muslims',
    arabicName: 'اضطهاد المسلمين',
    year: 614,
    endYear: 615,
    location: jitter(LOCATIONS.MAKKAH, 3),
    description:
      'The Quraysh intensified persecution of Muslims. Believers like Bilal, Ammar, and Sumayyah were tortured for their faith.',
    relatedSurahNumbers: [85, 16],
  },
  {
    id: 'first-abyssinia',
    name: 'First Migration to Abyssinia',
    arabicName: 'الهجرة الأولى إلى الحبشة',
    year: 615,
    location: jitter(LOCATIONS.MAKKAH, 4),
    offMapLocation: 'Axum, Ethiopia',
    description:
      'A group of Muslims fled persecution to the Christian kingdom of Abyssinia. Ja\'far ibn Abi Talib recited Surah Maryam to King Negus.',
    relatedSurahNumbers: [19],
  },
  {
    id: 'second-abyssinia',
    name: 'Second Migration to Abyssinia',
    arabicName: 'الهجرة الثانية إلى الحبشة',
    year: 616,
    location: jitter(LOCATIONS.MAKKAH, 5),
    offMapLocation: 'Axum, Ethiopia',
    description:
      'A larger group of Muslims migrated to Abyssinia, seeking protection under King Negus from increasing persecution.',
    relatedSurahNumbers: [],
  },
  {
    id: 'boycott',
    name: 'Boycott of Banu Hashim',
    arabicName: 'حصار الشعب',
    year: 616,
    endYear: 619,
    location: jitter(LOCATIONS.MAKKAH, 6),
    description:
      'The Quraysh imposed a complete social and economic boycott on Banu Hashim. Muslims suffered severe hardship for three years.',
    relatedSurahNumbers: [],
  },
  {
    id: 'year-of-sorrow',
    name: 'Year of Sorrow',
    arabicName: 'عام الحزن',
    year: 619,
    location: jitter(LOCATIONS.MAKKAH, 7),
    description:
      'The Prophet lost both his beloved wife Khadijah and his uncle and protector Abu Talib within weeks of each other.',
    relatedSurahNumbers: [6, 12],
  },
  {
    id: 'taif-journey',
    name: 'Journey to Taif',
    arabicName: 'رحلة الطائف',
    year: 619,
    location: LOCATIONS.TAIF,
    description:
      'The Prophet traveled to Taif seeking support but was rejected and stoned. On his return, jinn heard him reciting Quran and believed.',
    relatedSurahNumbers: [72, 46],
  },
  {
    id: 'isra-miraj',
    name: 'Isra and Mi\'raj',
    arabicName: 'الإسراء والمعراج',
    year: 621,
    location: jitter(LOCATIONS.MAKKAH, 8),
    description:
      'The miraculous Night Journey from Makkah to Jerusalem and Ascension through the heavens. The five daily prayers were prescribed.',
    relatedSurahNumbers: [17, 53],
  },
  {
    id: 'first-aqabah',
    name: 'First Pledge of Aqabah',
    arabicName: 'بيعة العقبة الأولى',
    year: 621,
    location: jitter(LOCATIONS.MINA, 9),
    description:
      'Twelve men from Yathrib (Madinah) pledged allegiance to the Prophet at Aqabah during the pilgrimage season.',
    relatedSurahNumbers: [],
  },
  {
    id: 'second-aqabah',
    name: 'Second Pledge of Aqabah',
    arabicName: 'بيعة العقبة الثانية',
    year: 622,
    location: jitter(LOCATIONS.MINA, 10),
    description:
      'Seventy-three men and two women from Madinah pledged to protect the Prophet, preparing for the Hijra.',
    relatedSurahNumbers: [],
  },
  {
    id: 'hijra',
    name: 'The Hijra to Madinah',
    arabicName: 'الهجرة إلى المدينة',
    year: 622,
    location: jitter(LOCATIONS.MADINAH, 11),
    description:
      'The Prophet and Abu Bakr migrated to Madinah, establishing the first Islamic state. This marks the beginning of the Islamic calendar.',
    relatedSurahNumbers: [2, 8, 47],
  },
  {
    id: 'constitution-madinah',
    name: 'Constitution of Madinah',
    arabicName: 'صحيفة المدينة',
    year: 622,
    location: jitter(LOCATIONS.MADINAH, 12),
    description:
      'The Prophet established a constitutional agreement defining the rights and duties of all citizens of Madinah.',
    relatedSurahNumbers: [],
  },
  {
    id: 'badr',
    name: 'Battle of Badr',
    arabicName: 'غزوة بدر',
    year: 624,
    location: LOCATIONS.BADR,
    description:
      'The first major battle of Islam. 313 Muslims defeated over 1000 Quraysh fighters with divine support, establishing the Muslim community.',
    relatedSurahNumbers: [8, 3],
  },
  {
    id: 'uhud',
    name: 'Battle of Uhud',
    arabicName: 'غزوة أحد',
    year: 625,
    location: LOCATIONS.UHUD,
    description:
      'Muslims faced setbacks after initial success. 70 companions were martyred including Hamza. Important lessons were revealed.',
    relatedSurahNumbers: [3, 4],
  },
  {
    id: 'banu-nadir',
    name: 'Expulsion of Banu Nadir',
    arabicName: 'إجلاء بني النضير',
    year: 625,
    location: jitter(LOCATIONS.MADINAH, 13),
    description:
      'The Jewish tribe of Banu Nadir was expelled from Madinah after plotting against the Prophet.',
    relatedSurahNumbers: [59],
  },
  {
    id: 'trench',
    name: 'Battle of the Trench',
    arabicName: 'غزوة الخندق',
    year: 627,
    location: jitter(LOCATIONS.MADINAH, 14),
    description:
      'A confederation of 10,000 enemies besieged Madinah. Muslims dug a trench on Salman al-Farisi\'s advice. The siege failed miraculously.',
    relatedSurahNumbers: [33],
  },
  {
    id: 'hudaybiyyah',
    name: 'Treaty of Hudaybiyyah',
    arabicName: 'صلح الحديبية',
    year: 628,
    location: LOCATIONS.HUDAYBIYYAH,
    description:
      'A peace treaty with Quraysh that seemed unfavorable but was declared by Allah as a clear victory. Islam spread rapidly during the peace.',
    relatedSurahNumbers: [48, 60],
  },
  {
    id: 'khaybar',
    name: 'Conquest of Khaybar',
    arabicName: 'فتح خيبر',
    year: 628,
    location: { lat: 25.6989, lng: 39.2961 },
    description:
      'Muslims conquered the Jewish stronghold of Khaybar, securing the northern frontier and gaining significant resources.',
    relatedSurahNumbers: [],
  },
  {
    id: 'conquest-makkah',
    name: 'Conquest of Makkah',
    arabicName: 'فتح مكة',
    year: 630,
    location: jitter(LOCATIONS.MAKKAH, 15),
    description:
      'The Prophet entered Makkah peacefully with 10,000 Muslims. He cleansed the Kaaba of idols and declared general amnesty.',
    relatedSurahNumbers: [9, 110],
  },
  {
    id: 'hunayn',
    name: 'Battle of Hunayn',
    arabicName: 'غزوة حنين',
    year: 630,
    location: { lat: 21.4500, lng: 40.1000 },
    description:
      'Shortly after the conquest of Makkah, Muslims faced the Hawazin and Thaqif tribes. Initial setback turned to victory.',
    relatedSurahNumbers: [9],
  },
  {
    id: 'farewell-pilgrimage',
    name: 'Farewell Pilgrimage',
    arabicName: 'حجة الوداع',
    year: 632,
    location: LOCATIONS.ARAFAT,
    description:
      'The Prophet\'s final pilgrimage where he delivered the Farewell Sermon at Arafat. The verse completing the religion was revealed.',
    relatedSurahNumbers: [5, 110],
  },
  {
    id: 'death-prophet',
    name: 'Death of the Prophet',
    arabicName: 'وفاة النبي ﷺ',
    year: 632,
    location: jitter(LOCATIONS.MADINAH, 16),
    description:
      'Prophet Muhammad (peace be upon him) passed away in Madinah, having completed his mission of delivering the Quran to humanity.',
    relatedSurahNumbers: [],
  },
];

/** Get an event by its ID */
export function getEventById(id: string): HistoricalEvent | undefined {
  return events.find((event) => event.id === id);
}

/** Get events by year */
export function getEventsByYear(year: number): HistoricalEvent[] {
  return events.filter((event) => event.year === year);
}

/** Get events up to a specific year (for timeline filtering) */
export function getEventsUpToYear(year: number): HistoricalEvent[] {
  return events.filter((event) => event.year <= year);
}

/** Get events related to a specific surah */
export function getEventsForSurah(surahNumber: number): HistoricalEvent[] {
  return events.filter((event) => event.relatedSurahNumbers.includes(surahNumber));
}
