/**
 * Cinematic Journey Definitions
 * Pre-scripted narrative tours through the Quran's revelation history
 */

import { LOCATIONS } from './surah-locations';

/** A single step in a journey */
export interface JourneyStep {
  id: string;
  /** Year on the timeline */
  year: number;
  /** Optional location to fly to */
  location?: {
    lat: number;
    lng: number;
    zoom?: number;
  };
  /** Narrative content for this step */
  narrative: {
    title?: string;
    text: string;
    /** Duration in seconds */
    duration: number;
  };
  /** Surah numbers to highlight during this step */
  highlightSurahs?: number[];
  /** Event IDs to highlight during this step */
  highlightEvents?: string[];
}

/** A complete journey experience */
export interface Journey {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Display duration (e.g., "3 min") */
  duration: string;
  /** Icon name from lucide-react */
  icon: string;
  /** Accent color for the journey card */
  accentColor: string;
  /** All steps in the journey */
  steps: JourneyStep[];
}

/**
 * All available journeys
 */
export const journeys: Journey[] = [
  // Journey 1: The First Revelation (3 min)
  {
    id: 'first-revelation',
    title: 'The First Revelation',
    subtitle: '610 CE - Cave Hira',
    description: 'Experience the moment when the first words of the Quran descended upon Prophet Muhammad in the solitude of Cave Hira.',
    duration: '3 min',
    icon: 'Sunrise',
    accentColor: '#C8A84E',
    steps: [
      {
        id: 'fr-1',
        year: 610,
        location: {
          lat: 21.4225,
          lng: 39.8262,
          zoom: 9,
        },
        narrative: {
          title: 'Arabia, 610 CE',
          text: 'In the year 610 CE, the Arabian Peninsula stood at a crossroads. In the city of Makkah, a man known for his honesty and contemplation would soon receive a message that would change the course of history.',
          duration: 10,
        },
      },
      {
        id: 'fr-2',
        year: 610,
        location: {
          ...LOCATIONS.CAVE_HIRA,
          zoom: 12,
        },
        narrative: {
          title: 'The Mountain of Light',
          text: 'High in the mountains above Makkah, in a cave called Hira on Jabal al-Nur, Muhammad ﷺ would retreat for days of contemplation, seeking truth in an age of ignorance.',
          duration: 10,
        },
      },
      {
        id: 'fr-3',
        year: 610,
        location: {
          ...LOCATIONS.CAVE_HIRA,
          zoom: 14,
        },
        narrative: {
          title: 'The Night of Destiny',
          text: 'It was here, in the stillness of the cave, that the Angel Jibreel appeared with the command: "Read, in the name of your Lord who created..."',
          duration: 12,
        },
        highlightEvents: ['first-revelation'],
      },
      {
        id: 'fr-4',
        year: 610,
        location: {
          ...LOCATIONS.CAVE_HIRA,
          zoom: 13,
        },
        narrative: {
          title: 'Surah Al-Alaq',
          text: 'These were the first five verses of Surah Al-Alaq — the 96th chapter of the Quran. In this moment, the 23-year journey of revelation began.',
          duration: 10,
        },
        highlightSurahs: [96],
      },
      {
        id: 'fr-5',
        year: 610,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 11,
        },
        narrative: {
          title: 'Return to Khadijah',
          text: 'Trembling and overwhelmed, Muhammad ﷺ descended the mountain and returned to his wife Khadijah, who wrapped him in her cloak and spoke words of comfort: "Allah will never disgrace you."',
          duration: 12,
        },
      },
      {
        id: 'fr-6',
        year: 610,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 10,
        },
        narrative: {
          title: 'A New Dawn',
          text: 'This moment in a mountain cave would ignite a spiritual revolution. The Quran would continue to be revealed over the next 23 years, transforming hearts, societies, and the course of human history.',
          duration: 10,
        },
      },
    ],
  },

  // Journey 2: The Year of Sorrow (5 min)
  {
    id: 'year-of-sorrow',
    title: 'The Year of Sorrow',
    subtitle: '619 CE - Trial and Transcendence',
    description: 'Walk through the most difficult year in the Prophet\'s life — losing his beloved wife and protector, yet finding divine consolation.',
    duration: '5 min',
    icon: 'CloudRain',
    accentColor: '#6B7280',
    steps: [
      {
        id: 'ys-1',
        year: 619,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 10,
        },
        narrative: {
          title: 'The Tenth Year',
          text: 'By the tenth year of prophethood, the Muslims of Makkah had endured years of persecution. A three-year boycott had left them weakened, but the community remained steadfast.',
          duration: 10,
        },
        highlightEvents: ['boycott'],
      },
      {
        id: 'ys-2',
        year: 619,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 11,
        },
        narrative: {
          title: 'Farewell to Khadijah',
          text: 'Then came devastating loss. Khadijah bint Khuwaylid — the first believer, the Prophet\'s confidante, his source of comfort for 25 years — returned to her Lord. The house fell silent.',
          duration: 12,
        },
      },
      {
        id: 'ys-3',
        year: 619,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 11,
        },
        narrative: {
          title: 'Loss of Protection',
          text: 'Mere weeks later, Abu Talib — the Prophet\'s uncle who had shielded him from Quraysh for a decade — also passed away. The Prophet ﷺ now stood without his two greatest supporters.',
          duration: 10,
        },
        highlightEvents: ['year-of-sorrow'],
      },
      {
        id: 'ys-4',
        year: 619,
        location: {
          ...LOCATIONS.TAIF,
          zoom: 10,
        },
        narrative: {
          title: 'The Journey to Taif',
          text: 'Seeking new allies, the Prophet ﷺ walked to the mountain city of Taif. But instead of support, he was met with rejection and cruelty — chased and pelted with stones until his blessed feet bled.',
          duration: 12,
        },
        highlightEvents: ['taif-journey'],
      },
      {
        id: 'ys-5',
        year: 619,
        location: {
          lat: 21.35,
          lng: 40.0,
          zoom: 9,
        },
        narrative: {
          title: 'A Prayer in the Wilderness',
          text: 'Wounded and alone, he ﷺ raised his hands and prayed one of the most moving supplications: "O Allah, I complain to You of my weakness..." An angel appeared, offering to destroy Taif, but the Prophet ﷺ refused.',
          duration: 12,
        },
      },
      {
        id: 'ys-6',
        year: 619,
        location: {
          lat: 21.35,
          lng: 40.0,
          zoom: 9,
        },
        narrative: {
          title: 'The Jinn Believe',
          text: 'As he recited Quran in the night, a group of jinn listened in wonder and believed. Even in his darkest hour, Allah was expanding the reach of His message to realms unseen.',
          duration: 10,
        },
        highlightSurahs: [72],
      },
      {
        id: 'ys-7',
        year: 619,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 10,
        },
        narrative: {
          title: 'Divine Consolation',
          text: 'During this year, Surah Yusuf was revealed — the story of a prophet who faced betrayal, imprisonment, and separation, yet emerged triumphant. A reminder that after hardship comes ease.',
          duration: 12,
        },
        highlightSurahs: [12],
      },
      {
        id: 'ys-8',
        year: 621,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 10,
        },
        narrative: {
          title: 'Light After Darkness',
          text: 'The Year of Sorrow would soon give way to the Night of Ascension and the dawn of Madinah. Allah had not abandoned His messenger — He was preparing him for an even greater mission.',
          duration: 10,
        },
        highlightEvents: ['isra-miraj'],
      },
    ],
  },

  // Journey 3: The Hijra (7 min)
  {
    id: 'hijra',
    title: 'The Hijra',
    subtitle: '622 CE - The Migration',
    description: 'Follow the perilous journey from Makkah to Madinah that marks the beginning of the Islamic calendar and the birth of a new nation.',
    duration: '7 min',
    icon: 'Route',
    accentColor: '#2EC4B6',
    steps: [
      {
        id: 'hj-1',
        year: 622,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 10,
        },
        narrative: {
          title: 'The Plot to Kill',
          text: 'In the thirteenth year of prophethood, the chiefs of Quraysh gathered in Dar al-Nadwa to make a final decision: Muhammad ﷺ must die. They plotted to strike him down as one, spreading the blood-guilt among all tribes.',
          duration: 12,
        },
      },
      {
        id: 'hj-2',
        year: 622,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 11,
        },
        narrative: {
          title: 'Divine Permission',
          text: 'But Allah informed His messenger of their scheme and granted permission to emigrate. That night, as assassins surrounded his home, the Prophet ﷺ recited Surah Ya-Sin and walked past them, unseen.',
          duration: 12,
        },
        highlightSurahs: [36],
      },
      {
        id: 'hj-3',
        year: 622,
        location: {
          lat: 21.38,
          lng: 39.82,
          zoom: 11,
        },
        narrative: {
          title: 'Cave Thawr',
          text: 'The Prophet ﷺ and Abu Bakr headed south to Cave Thawr, opposite the route to Madinah. For three days they sheltered there while search parties combed the mountains.',
          duration: 12,
        },
      },
      {
        id: 'hj-4',
        year: 622,
        location: {
          lat: 21.38,
          lng: 39.82,
          zoom: 12,
        },
        narrative: {
          title: '"Do Not Grieve"',
          text: 'When pursuers stood at the cave\'s entrance, Abu Bakr trembled with fear. The Prophet ﷺ whispered: "What do you think of two when Allah is their third?" A spider\'s web and dove\'s nest veiled the opening.',
          duration: 12,
        },
      },
      {
        id: 'hj-5',
        year: 622,
        location: {
          lat: 22.5,
          lng: 39.5,
          zoom: 8,
        },
        narrative: {
          title: 'The Desert Crossing',
          text: 'After three nights, they emerged and began the 400-kilometer journey north through the coastal route. The desert stretched before them, but so did the promise of a new beginning.',
          duration: 10,
        },
      },
      {
        id: 'hj-6',
        year: 622,
        location: {
          lat: 23.5,
          lng: 39.4,
          zoom: 7,
        },
        narrative: {
          title: 'Bounty Hunters',
          text: 'Quraysh offered 100 camels for their capture. The tracker Suraqa ibn Malik found them, but each time he approached, his horse sank into the sand. He would later embrace Islam.',
          duration: 10,
        },
      },
      {
        id: 'hj-7',
        year: 622,
        location: {
          lat: 24.2,
          lng: 39.55,
          zoom: 9,
        },
        narrative: {
          title: 'Approaching Yathrib',
          text: 'After eight days of travel, the outskirts of Yathrib appeared. The Ansar — the helpers of Madinah — had been waiting daily at the edge of the lava fields, scanning the horizon.',
          duration: 10,
        },
      },
      {
        id: 'hj-8',
        year: 622,
        location: {
          ...LOCATIONS.MADINAH,
          zoom: 11,
        },
        narrative: {
          title: 'The Arrival',
          text: 'When the Prophet ﷺ finally appeared, joy erupted. Women and children sang: "The full moon has risen upon us!" Every family begged him to stay with them.',
          duration: 10,
        },
        highlightEvents: ['hijra'],
      },
      {
        id: 'hj-9',
        year: 622,
        location: {
          ...LOCATIONS.MADINAH,
          zoom: 10,
        },
        narrative: {
          title: 'The Camel\'s Choice',
          text: 'The Prophet ﷺ let his camel walk freely: "Leave her, for she is commanded." Where the camel knelt, the Prophet\'s Mosque would rise — the heart of the first Islamic state.',
          duration: 10,
        },
      },
      {
        id: 'hj-10',
        year: 622,
        location: {
          ...LOCATIONS.MADINAH,
          zoom: 9,
        },
        narrative: {
          title: 'A New Era Begins',
          text: 'The Hijra was not flight — it was the birth of a nation. This moment marks Year One of the Islamic calendar. From persecution, a civilization would rise that would light the world for centuries.',
          duration: 12,
        },
        highlightEvents: ['constitution-madinah'],
      },
    ],
  },

  // Journey 4: Victory & Mercy (5 min)
  {
    id: 'victory-mercy',
    title: 'Victory & Mercy',
    subtitle: '630 CE - The Conquest of Makkah',
    description: 'Witness the moment when the Prophet ﷺ returned to his homeland with 10,000 believers — not for revenge, but with forgiveness.',
    duration: '5 min',
    icon: 'Heart',
    accentColor: '#E11D48',
    steps: [
      {
        id: 'vm-1',
        year: 628,
        location: {
          ...LOCATIONS.HUDAYBIYYAH,
          zoom: 10,
        },
        narrative: {
          title: 'The Treaty',
          text: 'Two years earlier at Hudaybiyyah, the Muslims signed a treaty that seemed unfavorable. But Allah called it a "clear victory" — the peace allowed Islam to spread without warfare.',
          duration: 10,
        },
        highlightSurahs: [48],
        highlightEvents: ['hudaybiyyah'],
      },
      {
        id: 'vm-2',
        year: 630,
        location: {
          lat: 22.0,
          lng: 39.7,
          zoom: 8,
        },
        narrative: {
          title: 'The Treaty Broken',
          text: 'When Quraysh\'s allies attacked the Prophet\'s allies, the treaty was violated. The time had come. In secret, the Prophet ﷺ gathered the largest Muslim army yet assembled — 10,000 strong.',
          duration: 10,
        },
      },
      {
        id: 'vm-3',
        year: 630,
        location: {
          lat: 21.8,
          lng: 39.75,
          zoom: 9,
        },
        narrative: {
          title: 'The March to Makkah',
          text: 'They marched in the month of Ramadan, fasting by day. As night fell near Makkah, the Prophet ﷺ ordered each soldier to light a fire. The hills blazed with 10,000 flames.',
          duration: 12,
        },
      },
      {
        id: 'vm-4',
        year: 630,
        location: {
          lat: 21.5,
          lng: 39.82,
          zoom: 10,
        },
        narrative: {
          title: 'Abu Sufyan\'s Surrender',
          text: 'Abu Sufyan, leader of Quraysh and once the Prophet\'s fiercest enemy, came to negotiate. He saw the endless campfires and said: "The dominion of your nephew has become mighty indeed." He embraced Islam that night.',
          duration: 12,
        },
      },
      {
        id: 'vm-5',
        year: 630,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 11,
        },
        narrative: {
          title: 'Entry into Makkah',
          text: 'The Prophet ﷺ entered Makkah with his head bowed so low it nearly touched his camel. This was not a conqueror\'s pride — it was the humility of a servant thanking his Lord.',
          duration: 10,
        },
        highlightEvents: ['conquest-makkah'],
      },
      {
        id: 'vm-6',
        year: 630,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 12,
        },
        narrative: {
          title: 'The Kaaba Cleansed',
          text: 'At the Kaaba, 360 idols surrounded the House of Allah. The Prophet ﷺ pointed his staff at each one reciting: "Truth has come, and falsehood has departed. Indeed, falsehood is bound to depart."',
          duration: 12,
        },
        highlightSurahs: [17],
      },
      {
        id: 'vm-7',
        year: 630,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 11,
        },
        narrative: {
          title: 'The Question of Mercy',
          text: 'The people of Makkah gathered, fearful. They had tortured Muslims, killed the Prophet\'s family, driven him from his home. They expected revenge. The Prophet ﷺ asked: "What do you think I will do with you?"',
          duration: 12,
        },
      },
      {
        id: 'vm-8',
        year: 630,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 10,
        },
        narrative: {
          title: '"Go, You Are Free"',
          text: 'They replied: "A noble brother, son of a noble brother." He ﷺ said: "Go, for you are free." In that moment, hearts transformed. Most of Makkah embraced Islam — not through force, but through mercy.',
          duration: 12,
        },
        highlightSurahs: [110],
      },
    ],
  },

  // Journey 5: The Final Sermon (4 min)
  {
    id: 'final-sermon',
    title: 'The Final Sermon',
    subtitle: '632 CE - Farewell Pilgrimage',
    description: 'Stand at Arafat with 100,000 believers as the Prophet ﷺ delivers his final message and the Quran is completed.',
    duration: '4 min',
    icon: 'Sun',
    accentColor: '#F59E0B',
    steps: [
      {
        id: 'fs-1',
        year: 632,
        location: {
          ...LOCATIONS.MADINAH,
          zoom: 10,
        },
        narrative: {
          title: 'The Last Journey',
          text: 'In the tenth year of Hijra, the Prophet ﷺ announced he would perform Hajj. News spread across Arabia. Over 100,000 believers gathered in Madinah to accompany him on what would be his final pilgrimage.',
          duration: 10,
        },
      },
      {
        id: 'fs-2',
        year: 632,
        location: {
          lat: 22.5,
          lng: 39.6,
          zoom: 8,
        },
        narrative: {
          title: 'The Caravan of Believers',
          text: 'The largest gathering of Muslims in history set out for Makkah. Rich and poor, Arab and non-Arab, former enemies now brothers — all dressed in simple white, equal before Allah.',
          duration: 10,
        },
      },
      {
        id: 'fs-3',
        year: 632,
        location: {
          ...LOCATIONS.MAKKAH,
          zoom: 11,
        },
        narrative: {
          title: 'Tawaf and Sa\'i',
          text: 'They circled the Kaaba and walked between Safa and Marwa, performing the rituals of Ibrahim. The Prophet ﷺ taught them every detail, saying: "Learn your rites from me."',
          duration: 10,
        },
      },
      {
        id: 'fs-4',
        year: 632,
        location: {
          ...LOCATIONS.ARAFAT,
          zoom: 11,
        },
        narrative: {
          title: 'The Day of Arafat',
          text: 'On the 9th of Dhul Hijjah, the multitude gathered at the plain of Arafat. As far as the eye could see, pilgrims stood in prayer and supplication under the afternoon sun.',
          duration: 10,
        },
        highlightEvents: ['farewell-pilgrimage'],
      },
      {
        id: 'fs-5',
        year: 632,
        location: {
          ...LOCATIONS.ARAFAT,
          zoom: 12,
        },
        narrative: {
          title: 'The Farewell Sermon',
          text: 'Mounted on his camel Qaswa, the Prophet ﷺ delivered his final sermon: "O People, listen well. I may not be among you after this year." A hundred thousand hearts hung on every word.',
          duration: 12,
        },
      },
      {
        id: 'fs-6',
        year: 632,
        location: {
          ...LOCATIONS.ARAFAT,
          zoom: 12,
        },
        narrative: {
          title: 'The Message of Equality',
          text: '"All mankind is from Adam and Eve. An Arab has no superiority over a non-Arab, nor does a non-Arab have superiority over an Arab — except by piety and good action."',
          duration: 10,
        },
      },
      {
        id: 'fs-7',
        year: 632,
        location: {
          ...LOCATIONS.ARAFAT,
          zoom: 11,
        },
        narrative: {
          title: 'The Final Revelation',
          text: 'Then came the words: "This day I have perfected for you your religion, completed My favor upon you, and chosen for you Islam as your way." The Quran was complete.',
          duration: 12,
        },
        highlightSurahs: [5],
      },
      {
        id: 'fs-8',
        year: 632,
        location: {
          ...LOCATIONS.MINA,
          zoom: 10,
        },
        narrative: {
          title: 'The Trust Passed On',
          text: 'At Mina, the final surah was revealed: "When the victory of Allah has come... glorify your Lord and seek His forgiveness." The mission was complete. The trust now passed to every believer who would come.',
          duration: 12,
        },
        highlightSurahs: [110],
        highlightEvents: ['farewell-pilgrimage'],
      },
    ],
  },
];

/**
 * Get a journey by its ID
 */
export function getJourneyById(id: string): Journey | undefined {
  return journeys.find((j) => j.id === id);
}

/**
 * Get the total duration of a journey in seconds
 */
export function getJourneyDurationSeconds(journey: Journey): number {
  return journey.steps.reduce((total, step) => total + step.narrative.duration, 0);
}
