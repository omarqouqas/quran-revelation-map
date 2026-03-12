/**
 * Dataset of significant locations during the revelation period
 */

import type { Location } from '@/types';

export const locations: Location[] = [
  {
    id: 'makkah',
    name: 'Makkah',
    arabicName: 'مكة المكرمة',
    lat: 21.4225,
    lng: 39.8262,
    type: 'city',
    description: 'The holiest city in Islam, birthplace of Prophet Muhammad (PBUH) and location of the Kaaba. The majority of Makki surahs were revealed here during the first 13 years of prophethood.',
  },
  {
    id: 'madinah',
    name: 'Madinah',
    arabicName: 'المدينة المنورة',
    lat: 24.4686,
    lng: 39.6142,
    type: 'city',
    description: 'The city of the Prophet, where he migrated in 622 CE. All Madani surahs were revealed here, establishing the first Islamic state and community.',
  },
  {
    id: 'cave-hira',
    name: 'Cave Hira',
    arabicName: 'غار حراء',
    lat: 21.4574,
    lng: 39.8583,
    type: 'cave',
    description: 'The cave on Jabal al-Noor (Mountain of Light) where Prophet Muhammad (PBUH) received the first revelation of the Quran through Angel Jibril in 610 CE.',
  },
  {
    id: 'mount-uhud',
    name: 'Mount Uhud',
    arabicName: 'جبل أحد',
    lat: 24.4998,
    lng: 39.6151,
    type: 'mountain',
    description: 'The mountain north of Madinah where the Battle of Uhud took place in 625 CE. Several verses were revealed addressing the lessons from this battle.',
  },
  {
    id: 'badr',
    name: 'Badr',
    arabicName: 'بدر',
    lat: 23.7833,
    lng: 38.7667,
    type: 'battlefield',
    description: 'Site of the first major battle of Islam in 624 CE, where 313 Muslims defeated over 1000 Quraysh. Surah Al-Anfal was revealed regarding this victory.',
  },
  {
    id: 'hudaybiyyah',
    name: 'Hudaybiyyah',
    arabicName: 'الحديبية',
    lat: 21.4411,
    lng: 39.6083,
    type: 'plain',
    description: 'Location of the historic Treaty of Hudaybiyyah in 628 CE between the Muslims and Quraysh. Surah Al-Fath declared this apparent setback as a clear victory.',
  },
  {
    id: 'taif',
    name: 'Taif',
    arabicName: 'الطائف',
    lat: 21.2700,
    lng: 40.4150,
    type: 'city',
    description: 'Mountain city where the Prophet sought support after the Year of Sorrow but was rejected and stoned. The jinn heard him reciting Quran on his return journey.',
  },
  {
    id: 'arafat',
    name: 'Mount Arafat',
    arabicName: 'جبل عرفات',
    lat: 21.3549,
    lng: 39.9842,
    type: 'mountain',
    description: 'The plain where pilgrims gather during Hajj. The Prophet delivered his Farewell Sermon here, and the verse completing the religion was revealed.',
  },
];

/** Get a location by its ID */
export const getLocationById = (id: string): Location | undefined => {
  return locations.find(location => location.id === id);
};

/** Get all locations of a specific type */
export const getLocationsByType = (type: Location['type']): Location[] => {
  return locations.filter(location => location.type === type);
};
