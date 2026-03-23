/**
 * Learning Path Definitions
 * Structured educational courses through the Quran's revelation history
 */

import { LOCATIONS } from './surah-locations';

/** Section types for lesson content */
export type LessonSectionType = 'narrative' | 'insight' | 'quran-reference' | 'historical-context';

/** A section within a lesson */
export interface LessonSection {
  type: LessonSectionType;
  title?: string;
  content: string;
  /** For quran-reference type */
  surahNumber?: number;
  ayahRange?: { start: number; end: number };
}

/** Map highlighting configuration for a lesson */
export interface LessonMapHighlights {
  /** Year to set on timeline */
  year?: number;
  /** Surah numbers to highlight on map */
  surahNumbers?: number[];
  /** Event IDs to highlight on map */
  eventIds?: string[];
  /** Location to fly camera to */
  location?: { lat: number; lng: number; zoom?: number };
}

/** A single lesson within a learning path */
export interface Lesson {
  id: string;
  /** Order within path (1-based) */
  order: number;
  title: string;
  arabicTitle?: string;
  /** Learning objective statement */
  objective: string;
  /** Estimated reading time in minutes */
  estimatedTime: number;
  /** Main content sections */
  sections: LessonSection[];
  /** Key takeaways (3-5 bullets) */
  takeaways: string[];
  /** Optional reflection prompts */
  reflectionPrompts?: string[];
  /** Map coordination */
  mapHighlights: LessonMapHighlights;
}

/** A complete learning path */
export interface LearningPath {
  id: string;
  title: string;
  arabicTitle: string;
  subtitle: string;
  description: string;
  /** Icon name from lucide-react */
  icon: string;
  /** Accent color for theming */
  accentColor: string;
  /** Estimated total time (e.g., "15 min") */
  estimatedTime: string;
  /** Category for grouping */
  category: 'chronological' | 'thematic';
  /** All lessons in order */
  lessons: Lesson[];
}

/** Progress data stored in localStorage */
export interface LearningProgress {
  /** Lesson ID -> completion timestamp */
  completedLessons: Record<string, number>;
  /** Path ID -> last accessed lesson ID */
  lastAccessedLesson: Record<string, string>;
  /** Path ID -> started timestamp */
  startedPaths: Record<string, number>;
}

/** Default empty progress */
export const defaultProgress: LearningProgress = {
  completedLessons: {},
  lastAccessedLesson: {},
  startedPaths: {},
};

/**
 * All learning paths
 */
export const learningPaths: LearningPath[] = [
  // Path 1: The Beginning
  {
    id: 'the-beginning',
    title: 'The Beginning',
    arabicTitle: 'البداية',
    subtitle: '610 CE - The First Revelation',
    description:
      'Explore the circumstances that led to the first revelation and understand the earliest surahs of the Quran.',
    icon: 'Sunrise',
    accentColor: '#C8A84E',
    estimatedTime: '15 min',
    category: 'chronological',
    lessons: [
      {
        id: 'tb-1',
        order: 1,
        title: 'Arabia Before Revelation',
        arabicTitle: 'العرب قبل الوحي',
        objective: 'Understand the social and spiritual context of pre-Islamic Arabia',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'The Age of Ignorance',
            content:
              'The Arabian Peninsula in the 7th century was known as the "Jahiliyyah" — the Age of Ignorance. This was not ignorance of trade or poetry, for the Arabs excelled in both. Rather, it was a spiritual darkness where idol worship had replaced the monotheism of Ibrahim (Abraham).',
          },
          {
            type: 'historical-context',
            title: 'Makkah: The Sacred City',
            content:
              'At the heart of Arabia stood Makkah, home to the Kaaba — the ancient house built by Ibrahim and Ismail for the worship of the One God. By the 7th century, however, the Kaaba housed 360 idols, and pilgrims came from across Arabia to worship them.',
          },
          {
            type: 'insight',
            content:
              'The Prophet Muhammad ﷺ grew up in this environment but never participated in idol worship. Even before revelation, he was known as "Al-Amin" (The Trustworthy) for his exceptional character.',
          },
          {
            type: 'narrative',
            title: 'A Man of Contemplation',
            content:
              'As Muhammad ﷺ approached the age of 40, he began retreating to a cave called Hira on the Mountain of Light (Jabal al-Nur), high above Makkah. There, in solitude, he would contemplate the purpose of existence and the state of his society.',
          },
        ],
        takeaways: [
          'Pre-Islamic Arabia had strayed from the monotheism of Ibrahim',
          'Makkah was the spiritual center of Arabia, housing the Kaaba',
          'The Prophet ﷺ was known for his integrity even before prophethood',
          'He sought truth through contemplation in Cave Hira',
        ],
        reflectionPrompts: [
          'Why do you think solitude and reflection were important preparation for receiving revelation?',
        ],
        mapHighlights: {
          year: 610,
          location: { ...LOCATIONS.MAKKAH, zoom: 10 },
        },
      },
      {
        id: 'tb-2',
        order: 2,
        title: 'The Night of Destiny',
        arabicTitle: 'ليلة القدر',
        objective: 'Learn about the first revelation and its immediate impact',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'In the Cave of Hira',
            content:
              'It was the month of Ramadan in the year 610 CE. Muhammad ﷺ, now 40 years old, was in his usual retreat in Cave Hira when the angel Jibril (Gabriel) appeared before him.',
          },
          {
            type: 'quran-reference',
            title: 'The First Command',
            content:
              'The angel commanded: "Read!" The Prophet ﷺ, who could not read or write, replied: "I cannot read." The angel embraced him tightly, then released him and repeated: "Read!" After three such embraces, the first verses of the Quran were revealed.',
            surahNumber: 96,
            ayahRange: { start: 1, end: 5 },
          },
          {
            type: 'insight',
            content:
              'The first word revealed was "Iqra" (Read/Recite) — emphasizing that Islam would be a religion that values knowledge, learning, and reflection. The Quran would be recited, memorized, and studied for centuries to come.',
          },
          {
            type: 'historical-context',
            title: 'The Immediate Aftermath',
            content:
              'The Prophet ﷺ descended from the mountain, trembling. He rushed home to his wife Khadijah, asking her to cover him. "Wrap me! Wrap me!" he said. Khadijah comforted him and took him to her learned cousin Waraqah ibn Nawfal, who confirmed that this was the same revelation that had come to Moses.',
          },
        ],
        takeaways: [
          'The first revelation came in Cave Hira during Ramadan, 610 CE',
          '"Iqra" (Read) was the first word revealed — emphasizing knowledge',
          'Surah Al-Alaq (96) contains the first five verses revealed',
          'Khadijah was the first to support and believe in the Prophet ﷺ',
        ],
        reflectionPrompts: [
          'What does it mean that the first command was to "Read" in a religion?',
          'How did Khadijah\'s support shape the early mission?',
        ],
        mapHighlights: {
          year: 610,
          surahNumbers: [96],
          eventIds: ['first-revelation'],
          location: { ...LOCATIONS.CAVE_HIRA, zoom: 13 },
        },
      },
      {
        id: 'tb-3',
        order: 3,
        title: 'The Early Surahs',
        arabicTitle: 'السور المكية الأولى',
        objective: 'Explore the themes and style of the earliest revelations',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'The Pause and Resumption',
            content:
              'After the first revelation, there was a pause (known as "Fatrat al-Wahy") that caused the Prophet ﷺ great distress. Then revelation resumed with Surah Al-Muddathir, commanding him to rise and warn.',
          },
          {
            type: 'quran-reference',
            title: 'The Command to Warn',
            content:
              '"O you who covers himself, arise and warn! And your Lord glorify, and your garments purify." These verses transformed Muhammad ﷺ from a recipient of revelation into an active messenger with a mission.',
            surahNumber: 74,
            ayahRange: { start: 1, end: 5 },
          },
          {
            type: 'insight',
            title: 'Characteristics of Early Makkan Surahs',
            content:
              'The earliest surahs share distinctive features: they are short, with powerful rhythmic verses. They focus on fundamental beliefs — the Oneness of Allah, the Day of Judgment, and moral accountability. They call people to reflect on creation and their own souls.',
          },
          {
            type: 'narrative',
            title: 'Surah Al-Muzzammil: The Night Prayer',
            content:
              'Among the earliest revelations was Surah Al-Muzzammil, which established the night prayer (Tahajjud) as a means of spiritual strengthening. The Prophet ﷺ and early Muslims would spend much of the night in prayer, preparing their hearts for the mission ahead.',
          },
        ],
        takeaways: [
          'After a pause, Surah Al-Muddathir (74) commanded the Prophet to warn',
          'Early Makkan surahs are short, rhythmic, and focus on core beliefs',
          'The night prayer (Tahajjud) was established early for spiritual strength',
          'Themes include Tawhid (Oneness), accountability, and reflection on creation',
        ],
        reflectionPrompts: [
          'Why might Allah have started the revelation with short, powerful surahs rather than long legal chapters?',
        ],
        mapHighlights: {
          year: 610,
          surahNumbers: [74, 73],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
      {
        id: 'tb-4',
        order: 4,
        title: 'The Secret Call',
        arabicTitle: 'الدعوة السرية',
        objective: 'Understand the first three years of private preaching',
        estimatedTime: 3,
        sections: [
          {
            type: 'narrative',
            title: 'Building the Foundation',
            content:
              'For approximately three years (610-613 CE), the Prophet ﷺ shared the message of Islam privately, inviting those closest to him. This was not out of fear, but strategic wisdom — building a core group of committed believers before facing public opposition.',
          },
          {
            type: 'historical-context',
            title: 'The First Believers',
            content:
              'The first to believe were: Khadijah bint Khuwaylid (his wife), Ali ibn Abi Talib (his young cousin), Zayd ibn Haritha (his freed slave and adopted son), and Abu Bakr al-Siddiq (his closest friend). Abu Bakr\'s belief led to the conversion of several prominent Makkans.',
          },
          {
            type: 'insight',
            content:
              'Notice the diversity of the first believers: a wealthy businesswoman, a young boy, a former slave, and a successful merchant. From the very beginning, Islam cut across all social boundaries.',
          },
          {
            type: 'narrative',
            title: 'Preparing for the Public Call',
            content:
              'During these three years, the small community of believers would gather secretly in the house of Al-Arqam ibn Abi al-Arqam to learn the Quran and pray together. When their number had grown strong enough, Allah commanded the Prophet ﷺ to make the call public.',
          },
        ],
        takeaways: [
          'The first three years of Islam were a period of private invitation',
          'The first believers came from all levels of society',
          'The house of Al-Arqam served as the first center of Islamic learning',
          'This period built a strong core community before public preaching',
        ],
        reflectionPrompts: [
          'What can we learn from the diversity of the first believers?',
          'Why was building a strong community important before going public?',
        ],
        mapHighlights: {
          year: 613,
          eventIds: ['secret-preaching'],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
    ],
  },

  // Path 2: Persecution & Patience
  {
    id: 'persecution-patience',
    title: 'Persecution & Patience',
    arabicTitle: 'الاضطهاد والصبر',
    subtitle: '613-619 CE - Trials of Faith',
    description:
      'Learn how the early Muslims endured persecution and find comfort in the surahs revealed during this difficult period.',
    icon: 'Shield',
    accentColor: '#6B7280',
    estimatedTime: '20 min',
    category: 'chronological',
    lessons: [
      {
        id: 'pp-1',
        order: 1,
        title: 'The Public Call',
        arabicTitle: 'الدعوة الجهرية',
        objective: 'Understand why and how the Prophet ﷺ began public preaching',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'The Command to Go Public',
            content:
              'After three years of secret preaching, the command came: "And warn your closest kindred" (26:214). The Prophet ﷺ climbed Mount Safa and called out to the clans of Quraysh. When they gathered, he asked: "If I told you there was an army behind this mountain, would you believe me?" They said: "Yes, you have never lied to us." He said: "Then I warn you of a severe punishment."',
          },
          {
            type: 'historical-context',
            title: 'The Response of Quraysh',
            content:
              'Abu Lahab, the Prophet\'s own uncle, responded with hostility: "May you perish! Is this why you gathered us?" In response, Surah Al-Masad (111) was revealed, the only surah that names a specific enemy of Islam. This marked the beginning of organized opposition.',
          },
          {
            type: 'quran-reference',
            title: 'Divine Response',
            content:
              '"May the hands of Abu Lahab perish, and may he perish! His wealth and what he earned will not benefit him. He will burn in a Fire of blazing flames..." This surah remains a testament to divine protection of the message.',
            surahNumber: 111,
            ayahRange: { start: 1, end: 5 },
          },
          {
            type: 'insight',
            content:
              'The public call transformed Islam from a private spiritual movement into a direct challenge to Makkan society. The Quraysh\'s power was built on the pilgrimage trade to the idols — monotheism threatened their economy and authority.',
          },
        ],
        takeaways: [
          'The Prophet ﷺ went public after building a core community of believers',
          'Even his own uncle Abu Lahab rejected and cursed him',
          'Surah Al-Masad was revealed in direct response to this rejection',
          'The public call threatened Quraysh\'s religious and economic power',
        ],
        reflectionPrompts: [
          'Why do you think truth often faces resistance from those in power?',
        ],
        mapHighlights: {
          year: 613,
          surahNumbers: [111],
          eventIds: ['public-preaching'],
          location: { ...LOCATIONS.MAKKAH, zoom: 12 },
        },
      },
      {
        id: 'pp-2',
        order: 2,
        title: 'The Suffering of the Weak',
        arabicTitle: 'معاناة المستضعفين',
        objective: 'Learn how early Muslims endured physical persecution',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'Those Without Protection',
            content:
              'In Makkan society, tribal protection was everything. The weak — slaves, foreigners, and those without powerful relatives — had no shield against persecution. These became the primary targets of Quraysh\'s wrath.',
          },
          {
            type: 'historical-context',
            title: 'Stories of the Persecuted',
            content:
              'Bilal ibn Rabah, an Abyssinian slave, was dragged onto the burning desert sand with a boulder on his chest. His master Umayyah demanded he renounce Islam. Bilal\'s only response: "Ahad, Ahad" (One, One). Ammar ibn Yasir and his parents Yasir and Sumayyah were tortured daily — Sumayyah became the first martyr in Islam.',
          },
          {
            type: 'quran-reference',
            title: 'Comfort for the Persecuted',
            content:
              'During these trials, Surah Al-Buruj was revealed, telling the story of believers who were burned alive in trenches for their faith, yet remained steadfast. The message: "Indeed, those who have tortured the believing men and women and then have not repented will have the punishment of Hell."',
            surahNumber: 85,
            ayahRange: { start: 4, end: 10 },
          },
          {
            type: 'insight',
            content:
              'The Quran\'s response to persecution was not immediate victory, but eternal perspective. The early surahs repeatedly emphasize the Day of Judgment — reminding the oppressed that justice would come, and warning the oppressors that their power was temporary.',
          },
        ],
        takeaways: [
          'The weakest members of society suffered the most severe persecution',
          'Bilal\'s "Ahad, Ahad" became a symbol of unbreakable faith',
          'Sumayyah bint Khayyat was the first martyr of Islam',
          'The Quran provided comfort through eternal perspective and promise of justice',
        ],
        reflectionPrompts: [
          'What gave the early Muslims strength to endure such suffering?',
          'How does faith provide strength during trials?',
        ],
        mapHighlights: {
          year: 614,
          surahNumbers: [85],
          eventIds: ['persecution'],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
      {
        id: 'pp-3',
        order: 3,
        title: 'Migration to Abyssinia',
        arabicTitle: 'الهجرة إلى الحبشة',
        objective: 'Understand the first migration in Islamic history',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'The Decision to Migrate',
            content:
              'As persecution intensified, the Prophet ﷺ told his companions: "If you were to go to Abyssinia, you would find a king under whom no one is wronged." In the fifth year of prophethood (615 CE), a small group of Muslims left Makkah for the Christian kingdom across the Red Sea.',
          },
          {
            type: 'historical-context',
            title: 'Before the Negus',
            content:
              'Quraysh sent emissaries to bring the Muslims back. The Negus (King) asked the Muslims about their faith. Ja\'far ibn Abi Talib stood and recited the opening verses of Surah Maryam (19), describing the miraculous birth of Prophet Isa (Jesus). The Christian king wept and said: "This and what Jesus brought come from the same source."',
          },
          {
            type: 'quran-reference',
            title: 'The Opening of Surah Maryam',
            content:
              '"And mention, [O Muhammad], in the Book [the story of] Mary, when she withdrew from her family to a place toward the east..." These verses, honoring Mary and Jesus, protected the Muslim refugees under a Christian king.',
            surahNumber: 19,
            ayahRange: { start: 16, end: 21 },
          },
          {
            type: 'insight',
            content:
              'This first migration established an important principle: when believers cannot practice their faith freely, migration becomes a valid — even noble — option. The Negus later accepted Islam secretly, and when he died, the Prophet ﷺ prayed the funeral prayer for him from Madinah.',
          },
        ],
        takeaways: [
          'Abyssinia was the first migration (Hijra) in Islamic history (615 CE)',
          'Surah Maryam was recited before the Christian king',
          'The Negus protected the Muslims despite Quraysh\'s pressure',
          'This established the principle that migration for faith is honorable',
        ],
        reflectionPrompts: [
          'What does the Negus\'s response teach us about interfaith understanding?',
        ],
        mapHighlights: {
          year: 615,
          surahNumbers: [19],
          eventIds: ['first-abyssinia'],
          location: { ...LOCATIONS.MAKKAH, zoom: 8 },
        },
      },
      {
        id: 'pp-4',
        order: 4,
        title: 'The Boycott',
        arabicTitle: 'حصار الشعب',
        objective: 'Learn about the three-year economic and social siege',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'The Pact Against Banu Hashim',
            content:
              'Unable to stop Islam through violence alone, Quraysh took extreme measures. In 616 CE, they wrote a pact: no one would trade with, marry into, or interact with Banu Hashim (the Prophet\'s clan) until they handed over Muhammad ﷺ to be killed. The pact was hung inside the Kaaba.',
          },
          {
            type: 'historical-context',
            title: 'Three Years in the Valley',
            content:
              'Banu Hashim — Muslims and non-Muslims alike, protected by Abu Talib — withdrew to the Valley of Abu Talib (Shi\'b Abi Talib). For three years, they lived in near starvation. Children cried from hunger. The Prophet ﷺ shared their suffering completely.',
          },
          {
            type: 'quran-reference',
            title: 'Surahs of Comfort',
            content:
              'During this period, surahs like Ash-Sharh (94) were revealed: "Indeed, with hardship comes ease. Indeed, with hardship comes ease." The repetition emphasizes: every difficulty is accompanied by multiple ways out.',
            surahNumber: 94,
            ayahRange: { start: 5, end: 6 },
          },
          {
            type: 'narrative',
            title: 'The End of the Boycott',
            content:
              'After three years, some Qurayshi nobles felt shame at the treatment of their own kin. When they went to remove the pact, they found that termites had eaten all of it except the words "In Your Name, O Allah." The boycott ended in 619 CE, but the damage was done.',
          },
        ],
        takeaways: [
          'Quraysh implemented a total social and economic boycott (616-619 CE)',
          'Banu Hashim endured three years of near-starvation in a valley',
          'The Quran promised: "With hardship comes ease"',
          'The pact was miraculously destroyed except for God\'s name',
        ],
        reflectionPrompts: [
          'How do communities support each other during collective hardship?',
          'What does "with hardship comes ease" mean in your life?',
        ],
        mapHighlights: {
          year: 617,
          surahNumbers: [94],
          eventIds: ['boycott'],
          location: { ...LOCATIONS.MAKKAH, zoom: 12 },
        },
      },
    ],
  },

  // Path 3: The Turning Point
  {
    id: 'turning-point',
    title: 'The Turning Point',
    arabicTitle: 'نقطة التحول',
    subtitle: '619-622 CE - From Sorrow to Hope',
    description:
      'Experience the Year of Sorrow, the Night Journey, and the events that led to the Hijra.',
    icon: 'Compass',
    accentColor: '#8B5CF6',
    estimatedTime: '20 min',
    category: 'chronological',
    lessons: [
      {
        id: 'tp-1',
        order: 1,
        title: 'The Year of Sorrow',
        arabicTitle: 'عام الحزن',
        objective: 'Understand the personal losses that shook the Prophet ﷺ',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'A Year of Devastation',
            content:
              'The year 619 CE became known as the "Year of Sorrow" (Aam al-Huzn). Within weeks of each other, the Prophet ﷺ lost the two people who had protected and supported him most: his uncle Abu Talib and his beloved wife Khadijah.',
          },
          {
            type: 'historical-context',
            title: 'The Loss of Abu Talib',
            content:
              'Abu Talib, though he never publicly accepted Islam, had used his tribal authority to shield the Prophet ﷺ from Quraysh. On his deathbed, the Prophet ﷺ begged him to say the shahada. Abu Talib refused, saying he could not abandon the religion of his fathers. With his death, the Prophet ﷺ lost his political protection.',
          },
          {
            type: 'historical-context',
            title: 'The Loss of Khadijah',
            content:
              'Shortly after, Khadijah passed away. She had been his first believer, his comfort, his confidante, and his supporter. She had spent her wealth for the cause and held him when he trembled after the first revelation. The Prophet ﷺ called the year she died the "Year of Sorrow" and never forgot her.',
          },
          {
            type: 'insight',
            content:
              'Even prophets experience profound grief. The Quran does not minimize human emotion — it validates it while directing the heart toward divine comfort. The Prophet ﷺ later said: "Allah gave me her love."',
          },
        ],
        takeaways: [
          '619 CE was called the "Year of Sorrow" for two major losses',
          'Abu Talib\'s death removed political protection in Makkah',
          'Khadijah\'s death was an irreplaceable personal loss',
          'The Prophet ﷺ faced his darkest hour at this time',
        ],
        reflectionPrompts: [
          'How do we cope when multiple trials strike at once?',
          'What role did Khadijah play in supporting the mission of Islam?',
        ],
        mapHighlights: {
          year: 619,
          eventIds: ['year-of-sorrow'],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
      {
        id: 'tp-2',
        order: 2,
        title: 'The Journey to Taif',
        arabicTitle: 'رحلة الطائف',
        objective: 'Learn about the most difficult day in the Prophet\'s mission',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'Seeking New Support',
            content:
              'With protection gone in Makkah, the Prophet ﷺ traveled to Taif, a city southeast of Makkah, hoping its leaders might accept Islam or at least offer refuge. He walked the 60-mile journey with his adopted son Zayd ibn Haritha.',
          },
          {
            type: 'historical-context',
            title: 'The Rejection at Taif',
            content:
              'The leaders of Taif not only rejected him but mocked him. They set the children and slaves of the town upon him, who threw stones at him until his feet bled. Zayd tried to shield him with his own body. Exhausted and bleeding, they took refuge in an orchard.',
          },
          {
            type: 'quran-reference',
            title: 'The Prayer of the Persecuted',
            content:
              'In that orchard, the Prophet ﷺ raised his hands and made the famous du\'a: "O Allah, to You I complain of my weakness, my lack of resources, and my lowliness before the people..." Despite everything, he refused to curse the people of Taif, hoping their descendants might accept Islam.',
          },
          {
            type: 'narrative',
            title: 'The Angel\'s Offer',
            content:
              'Jibril appeared with the angel of the mountains, offering to crush Taif between two mountains. The Prophet ﷺ refused: "No, I hope that Allah will bring forth from their descendants people who will worship Allah alone." This was later called his most difficult day — harder even than Uhud.',
          },
        ],
        takeaways: [
          'After losing protection, the Prophet ﷺ sought support in Taif',
          'He was stoned until his blessed feet bled',
          'He refused to curse Taif, hoping for their descendants',
          'He called this his most difficult day',
        ],
        reflectionPrompts: [
          'What does the Prophet\'s response teach us about mercy?',
          'How do we maintain hope when all doors seem closed?',
        ],
        mapHighlights: {
          year: 619,
          eventIds: ['taif-journey'],
          location: { ...LOCATIONS.TAIF, zoom: 10 },
        },
      },
      {
        id: 'tp-3',
        order: 3,
        title: 'The Night Journey',
        arabicTitle: 'الإسراء والمعراج',
        objective: 'Experience the miraculous journey that changed everything',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'From Makkah to Jerusalem',
            content:
              'At the lowest point of his mission, Allah granted the Prophet ﷺ the greatest gift. One night, Jibril came with a winged creature called al-Buraq. In moments, he was transported from the Sacred Mosque in Makkah to the Farthest Mosque (al-Masjid al-Aqsa) in Jerusalem.',
          },
          {
            type: 'quran-reference',
            title: 'Surah Al-Isra',
            content:
              '"Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed, to show him of Our signs." This night journey (Isra) connected Islam to the legacy of all previous prophets.',
            surahNumber: 17,
            ayahRange: { start: 1, end: 1 },
          },
          {
            type: 'narrative',
            title: 'The Ascension Through the Heavens',
            content:
              'From Jerusalem, the Prophet ﷺ ascended (Mi\'raj) through the seven heavens. At each level, he met previous prophets: Adam, Isa, Yahya, Yusuf, Idris, Harun, Musa, and finally Ibrahim at the highest heaven. Then he went beyond, to the Lote Tree (Sidrat al-Muntaha), where no creation had been.',
          },
          {
            type: 'historical-context',
            title: 'The Gift of Salah',
            content:
              'At the Divine Presence, the five daily prayers were prescribed. Originally fifty, Musa advised the Prophet ﷺ to return and ask for reduction. After multiple returns, they became five prayers with the reward of fifty. The daily salah became Islam\'s direct connection to this miraculous night.',
          },
        ],
        takeaways: [
          'The Isra (Night Journey) took the Prophet ﷺ to Jerusalem',
          'The Mi\'raj (Ascension) took him through the seven heavens',
          'He met all the previous prophets during this journey',
          'The five daily prayers were prescribed during this night',
        ],
        reflectionPrompts: [
          'Why was this gift given at the Prophet\'s darkest hour?',
          'What does salah mean as a connection to this miraculous night?',
        ],
        mapHighlights: {
          year: 620,
          surahNumbers: [17],
          eventIds: ['isra-miraj'],
          location: { ...LOCATIONS.MAKKAH, zoom: 7 },
        },
      },
      {
        id: 'tp-4',
        order: 4,
        title: 'The Pledges of Aqabah',
        arabicTitle: 'بيعة العقبة',
        objective: 'Learn how Islam found a new home in Yathrib',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'Pilgrims from Yathrib',
            content:
              'Every year, tribes came to Makkah for pilgrimage. The Prophet ﷺ would visit their camps, inviting them to Islam. In 620 CE, six men from Yathrib (later called Madinah) listened. They returned home and spread the message. The next year, twelve came and pledged their faith — the First Pledge of Aqabah.',
          },
          {
            type: 'historical-context',
            title: 'Why Yathrib?',
            content:
              'The people of Yathrib were familiar with monotheism through their Jewish neighbors who spoke of a coming prophet. When they heard Muhammad ﷺ, many recognized the signs. Furthermore, Yathrib was torn by tribal warfare between Aws and Khazraj — they saw in Islam a unifying force.',
          },
          {
            type: 'narrative',
            title: 'The Second Pledge',
            content:
              'In 622 CE, seventy-three men and two women came secretly to Aqabah during the pilgrimage. They pledged to protect the Prophet ﷺ as they would their own families, to fight for Islam, and to give him refuge in their city. This was the Second Pledge of Aqabah — the invitation that made the Hijra possible.',
          },
          {
            type: 'insight',
            content:
              'When one door closes, Allah opens another. The same year that Taif rejected him, Yathrib embraced him. The Ansar (Helpers) of Madinah would become the foundation of the Muslim state.',
          },
        ],
        takeaways: [
          'Six men from Yathrib first accepted Islam in 620 CE',
          'The First Pledge of Aqabah (621 CE) brought twelve believers',
          'The Second Pledge (622 CE) brought seventy-five believers',
          'Yathrib invited the Prophet ﷺ to migrate and lead them',
        ],
        reflectionPrompts: [
          'How did the timing of Yathrib\'s acceptance show divine wisdom?',
        ],
        mapHighlights: {
          year: 622,
          eventIds: ['first-aqabah', 'second-aqabah'],
          location: { ...LOCATIONS.MAKKAH, zoom: 10 },
        },
      },
    ],
  },

  // Path 4: The Hijra
  {
    id: 'the-hijra',
    title: 'The Hijra',
    arabicTitle: 'الهجرة',
    subtitle: '622 CE - The Migration',
    description:
      'Follow the journey from Makkah to Madinah and understand the surahs that mark this new chapter.',
    icon: 'Route',
    accentColor: '#2EC4B6',
    estimatedTime: '20 min',
    category: 'chronological',
    lessons: [
      {
        id: 'th-1',
        order: 1,
        title: 'The Plot to Kill',
        arabicTitle: 'مؤامرة القتل',
        objective: 'Understand why Quraysh planned to assassinate the Prophet ﷺ',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'Emergency in Dar al-Nadwa',
            content:
              'News of the Second Pledge of Aqabah leaked to Quraysh. They realized: if Muhammad ﷺ reached Yathrib, he would have an army. The leaders gathered in Dar al-Nadwa (their council hall) to decide his fate. Options ranged from imprisonment to exile, but Abu Jahl proposed the final solution.',
          },
          {
            type: 'historical-context',
            title: 'The Assassination Plan',
            content:
              'Abu Jahl\'s plan: select one young man from each clan to strike Muhammad ﷺ simultaneously. This way, the blood guilt would be distributed across all tribes, and Banu Hashim could not seek revenge against everyone. They agreed and set the night.',
          },
          {
            type: 'quran-reference',
            title: 'Divine Revelation',
            content:
              '"And [remember] when those who disbelieved plotted against you to restrain you or kill you or evict you. But they plan, and Allah plans. And Allah is the best of planners." The Prophet ﷺ was informed of the plot and given permission to migrate.',
            surahNumber: 8,
            ayahRange: { start: 30, end: 30 },
          },
          {
            type: 'insight',
            content:
              'This verse reveals a profound truth: human plotting, no matter how sophisticated, cannot override divine decree. The very night they planned to kill him became the night of his escape.',
          },
        ],
        takeaways: [
          'Quraysh discovered the pledge with Yathrib',
          'They planned to assassinate the Prophet ﷺ collectively',
          'Allah revealed their plot and commanded migration',
          '"Allah is the best of planners" (8:30)',
        ],
        reflectionPrompts: [
          'How do we trust in Allah\'s plan when facing overwhelming opposition?',
        ],
        mapHighlights: {
          year: 622,
          surahNumbers: [8],
          location: { ...LOCATIONS.MAKKAH, zoom: 12 },
        },
      },
      {
        id: 'th-2',
        order: 2,
        title: 'The Night of Escape',
        arabicTitle: 'ليلة الخروج',
        objective: 'Follow the Prophet\'s miraculous escape from Makkah',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'Ali\'s Sacrifice',
            content:
              'As assassins surrounded his house, the Prophet ﷺ asked his young cousin Ali to sleep in his bed, wearing his green cloak. Ali, knowing the danger, agreed without hesitation. The Prophet ﷺ slipped out at night, passing through the assassins who had been blinded to his presence.',
          },
          {
            type: 'quran-reference',
            title: 'The Divine Veil',
            content:
              '"And We have put before them a barrier and behind them a barrier and covered them, so they do not see." The Prophet ﷺ walked past his would-be killers, reciting these verses, sprinkling dust on their heads — yet they perceived nothing.',
            surahNumber: 36,
            ayahRange: { start: 9, end: 9 },
          },
          {
            type: 'historical-context',
            title: 'To Abu Bakr\'s House',
            content:
              'The Prophet ﷺ went to Abu Bakr\'s house. When told they would migrate together, Abu Bakr wept with joy. He had prepared two camels for months, hoping for this moment. His daughter Asma\' prepared provisions, tearing her belt to tie the food bag — earning the title "She of the Two Belts."',
          },
          {
            type: 'narrative',
            title: 'The Journey South',
            content:
              'Instead of heading north to Madinah, they went south to Cave Thawr — the opposite direction. They would hide there for three days while Quraysh searched. The guide Abdullah ibn Urayqit would then lead them on the coastal route, avoiding all roads.',
          },
        ],
        takeaways: [
          'Ali risked his life sleeping in the Prophet\'s bed',
          'The Prophet ﷺ passed through assassins unseen — a miracle',
          'Abu Bakr was chosen as his sole companion',
          'They traveled south first to evade pursuit',
        ],
        reflectionPrompts: [
          'What does Ali\'s willingness teach us about sacrifice for truth?',
          'How do we balance trust in Allah with practical planning?',
        ],
        mapHighlights: {
          year: 622,
          surahNumbers: [36],
          eventIds: ['hijra'],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
      {
        id: 'th-3',
        order: 3,
        title: 'The Cave of Thawr',
        arabicTitle: 'غار ثور',
        objective: 'Experience the miracle of the cave',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'Three Days in Hiding',
            content:
              'The Prophet ﷺ and Abu Bakr hid in Cave Thawr for three days. Abu Bakr\'s son Abdullah would bring news at night. His daughter Asma\' brought food. His freed slave Amir would graze sheep over their tracks to hide them. A family coordinated perfectly to save the message of Islam.',
          },
          {
            type: 'historical-context',
            title: 'The Search Party Arrives',
            content:
              'Quraysh sent trackers who followed the trail to the cave entrance. Abu Bakr trembled, not for himself, but fearing for the Prophet ﷺ. He whispered: "If they look down at their feet, they will see us." The Prophet ﷺ replied with words of absolute certainty.',
          },
          {
            type: 'quran-reference',
            title: 'Do Not Grieve',
            content:
              '"Do not grieve; indeed Allah is with us." These words, spoken in the darkest moment, became immortalized in the Quran: "If you do not aid him, Allah has already aided him when those who disbelieved had driven him out as one of two, when they were in the cave and he said to his companion, \'Do not grieve; indeed Allah is with us.\'"',
            surahNumber: 9,
            ayahRange: { start: 40, end: 40 },
          },
          {
            type: 'insight',
            content:
              'A spider had woven a web over the cave entrance, and a dove had nested there with eggs. The trackers saw this and assumed no one had entered recently. They left. Divine protection came through the smallest of Allah\'s creatures.',
          },
        ],
        takeaways: [
          'The Prophet ﷺ and Abu Bakr hid for three days in Cave Thawr',
          'A spider web and dove nest concealed the entrance',
          '"Do not grieve; indeed Allah is with us" (9:40)',
          'Abu Bakr\'s entire family participated in the mission',
        ],
        reflectionPrompts: [
          'What does "La tahzan, inna Allaha ma\'ana" mean to you?',
          'How does Allah use the smallest things for the greatest purposes?',
        ],
        mapHighlights: {
          year: 622,
          surahNumbers: [9],
          eventIds: ['hijra'],
          location: { ...LOCATIONS.MAKKAH, zoom: 10 },
        },
      },
      {
        id: 'th-4',
        order: 4,
        title: 'Arrival in Madinah',
        arabicTitle: 'الوصول إلى المدينة',
        objective: 'Witness the founding of the Muslim city-state',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'The Coastal Route',
            content:
              'After three days, the guide Abdullah ibn Urayqit led them along the Red Sea coast — a longer but safer route. The journey took about eight days. Along the way, they stopped at the tent of Umm Ma\'bad, who witnessed a miracle when the Prophet ﷺ blessed her dry she-goat to give milk.',
          },
          {
            type: 'historical-context',
            title: 'Welcome at Quba',
            content:
              'The Prophet ﷺ arrived first at Quba, on the outskirts of Yathrib, on Monday, 12th Rabi\' al-Awwal (September 24, 622 CE). He stayed there for several days and established the first mosque in Islam — Masjid Quba, about which the Quran says it was "founded on righteousness from the first day."',
          },
          {
            type: 'narrative',
            title: 'Entry into Yathrib',
            content:
              'When the Prophet ﷺ finally entered Yathrib, the people lined the streets. Every clan wanted him to stay with them. He said: "Let the camel go, for she is commanded." The camel stopped at an empty plot owned by two orphan boys. There, he would build his mosque and home. From this day, Yathrib became "Madinah al-Munawwarah" — the Radiant City.',
          },
          {
            type: 'insight',
            content:
              'The Hijra was so transformative that the Islamic calendar begins from it — not from the Prophet\'s birth, or first revelation, but from the establishment of the Muslim community. Islam is not just individual faith; it is a civilization.',
          },
        ],
        takeaways: [
          'The migration took about 8 days via the coastal route',
          'Masjid Quba was the first mosque established in Islam',
          'The Prophet ﷺ let his camel choose the site for his mosque',
          'The Islamic calendar (Hijri) begins from this migration',
        ],
        reflectionPrompts: [
          'Why does the Islamic calendar begin from Hijra, not the birth of the Prophet ﷺ?',
          'What does Hijra symbolize beyond physical migration?',
        ],
        mapHighlights: {
          year: 622,
          eventIds: ['hijra'],
          location: { ...LOCATIONS.MADINAH, zoom: 11 },
        },
      },
    ],
  },

  // Path 5: Building the Ummah
  {
    id: 'building-ummah',
    title: 'Building the Ummah',
    arabicTitle: 'بناء الأمة',
    subtitle: '622-627 CE - A New Community',
    description:
      'Explore how the Muslim community was established in Madinah and the new type of surahs revealed there.',
    icon: 'Users',
    accentColor: '#10B981',
    estimatedTime: '25 min',
    category: 'chronological',
    lessons: [
      {
        id: 'bu-1',
        order: 1,
        title: 'The Constitution of Madinah',
        arabicTitle: 'صحيفة المدينة',
        objective: 'Learn about the first written constitution in Islamic history',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'A New Kind of Community',
            content:
              'Within months of arrival, the Prophet ﷺ established something unprecedented: a written constitution defining the rights and responsibilities of all inhabitants of Madinah — Muslims, Jews, and polytheists alike. This document, known as the Sahifah (صحيفة), created a new type of community.',
          },
          {
            type: 'historical-context',
            title: 'Key Provisions',
            content:
              'The Constitution declared that the diverse groups were "one Ummah to the exclusion of others." It guaranteed religious freedom for Jews ("To the Jews their religion and to the Muslims their religion"). It established mutual defense obligations, prohibition of separate peace treaties, and the Prophet ﷺ as the final arbiter of disputes.',
          },
          {
            type: 'insight',
            content:
              'This was revolutionary. In a world of tribal loyalties, the Madinah Constitution created citizenship based on agreement rather than blood. Muslims from different tribes, and non-Muslims who accepted the pact, became one political community.',
          },
          {
            type: 'quran-reference',
            title: 'The Quranic Foundation',
            content:
              'The Medinan surahs now began addressing communal concerns: "O you who have believed, fulfill your contracts" (5:1). Unlike the Makkan surahs focused on theology and personal faith, these verses built a functioning society.',
            surahNumber: 5,
            ayahRange: { start: 1, end: 1 },
          },
        ],
        takeaways: [
          'The Constitution of Madinah was among the first written constitutions',
          'It united diverse groups into one political community',
          'Religious freedom was explicitly guaranteed',
          'The Prophet ﷺ served as the final arbiter of disputes',
        ],
        reflectionPrompts: [
          'What principles from this constitution remain relevant today?',
          'How did Islam balance religious identity with civic pluralism?',
        ],
        mapHighlights: {
          year: 622,
          surahNumbers: [5],
          eventIds: ['constitution-madinah'],
          location: { ...LOCATIONS.MADINAH, zoom: 12 },
        },
      },
      {
        id: 'bu-2',
        order: 2,
        title: 'Brotherhood of Faith',
        arabicTitle: 'المؤاخاة',
        objective: 'Understand the pairing of Muhajirin and Ansar',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'The Institution of Brotherhood',
            content:
              'The Muhajirin (Emigrants from Makkah) had left everything behind — their homes, businesses, and sometimes families. They arrived in Madinah as refugees. The Prophet ﷺ established a brotherhood (Mu\'akhat) pairing each Muhajir with an Ansari (Helper from Madinah).',
          },
          {
            type: 'historical-context',
            title: 'Sharing Everything',
            content:
              'The Ansar shared their homes, wealth, and even offered to divorce one of their wives so their Muhajir brothers could marry. Abd al-Rahman ibn Awf, a wealthy Muhajir merchant, was offered half of his partner\'s wealth. He declined, asking only to be shown the marketplace. Within months, he had rebuilt his fortune through honest trade.',
          },
          {
            type: 'quran-reference',
            title: 'Divine Praise',
            content:
              '"And those who made their home in the city and embraced the faith before them love whoever migrated to them and find no desire in their hearts for what was given to them, but give preference over themselves even if they are in need. And whoever is protected from the stinginess of his soul — it is those who will be successful."',
            surahNumber: 59,
            ayahRange: { start: 9, end: 9 },
          },
          {
            type: 'insight',
            content:
              'This verse (59:9) defines the Ansar\'s character: "yuthiroona \'ala anfusihim" — they preferred others over themselves. This wasn\'t charity; it was true brotherhood. The bond cut across all tribal, ethnic, and social lines.',
          },
        ],
        takeaways: [
          'Muhajirin were refugees who left everything in Makkah',
          'Each was paired with an Ansari brother who shared his wealth',
          'This created bonds stronger than blood kinship',
          'The Quran praises those who "prefer others over themselves" (59:9)',
        ],
        reflectionPrompts: [
          'What would it mean to truly prefer others over yourself?',
          'How can communities today support refugees and newcomers?',
        ],
        mapHighlights: {
          year: 623,
          surahNumbers: [59],
          location: { ...LOCATIONS.MADINAH, zoom: 12 },
        },
      },
      {
        id: 'bu-3',
        order: 3,
        title: 'The Change of Qiblah',
        arabicTitle: 'تحويل القبلة',
        objective: 'Learn about the pivotal change in prayer direction',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'Facing Jerusalem',
            content:
              'For the first sixteen or seventeen months in Madinah, Muslims prayed facing Jerusalem (Bayt al-Maqdis). This was the direction of the previous prophets. But the Prophet ﷺ longed to face the Kaaba — the house built by Ibrahim for pure monotheism.',
          },
          {
            type: 'quran-reference',
            title: 'The Heavenly Answer',
            content:
              '"We have certainly seen the turning of your face toward the heaven, and We will surely turn you to a qiblah with which you will be pleased. So turn your face toward al-Masjid al-Haram. And wherever you are, turn your faces toward it."',
            surahNumber: 2,
            ayahRange: { start: 144, end: 144 },
          },
          {
            type: 'historical-context',
            title: 'The Moment of Change',
            content:
              'The command came during Dhuhr prayer in the mosque of Banu Salamah. Mid-prayer, the congregation turned from Jerusalem toward Makkah. That mosque is still called Masjid al-Qiblatain (Mosque of the Two Qiblahs). This event occurred around February 624 CE.',
          },
          {
            type: 'insight',
            content:
              'The change of Qiblah was a test of obedience and a declaration of Islamic identity. It distinguished the Muslim community while honoring the legacy of Ibrahim. The Kaaba, cleansed of idols, would once again serve its original purpose.',
          },
        ],
        takeaways: [
          'Muslims initially prayed toward Jerusalem for 16-17 months',
          'The Qiblah was changed to the Kaaba in Makkah in 624 CE',
          'This occurred during prayer — the congregation turned mid-salah',
          'It established the Kaaba as the center of Muslim worship',
        ],
        reflectionPrompts: [
          'Why was the Kaaba chosen over Jerusalem?',
          'What does the Qiblah represent beyond just direction?',
        ],
        mapHighlights: {
          year: 624,
          surahNumbers: [2],
          location: { ...LOCATIONS.MADINAH, zoom: 11 },
        },
      },
      {
        id: 'bu-4',
        order: 4,
        title: 'The Nature of Medinan Surahs',
        arabicTitle: 'السور المدنية',
        objective: 'Understand how revelation changed after the Hijra',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'A New Style of Revelation',
            content:
              'The surahs revealed in Madinah have a distinctly different character from those revealed in Makkah. While Makkan surahs are often short, rhythmic, and focused on belief, Medinan surahs tend to be longer and address the practical needs of a growing community.',
          },
          {
            type: 'insight',
            title: 'Characteristics of Medinan Surahs',
            content:
              'Medinan surahs address: family law (marriage, divorce, inheritance), criminal law (punishments, witnesses), economic law (interest, trade, charity), international relations (treaties, warfare), and community organization. They often begin with "O you who believe..." — addressing an established community.',
          },
          {
            type: 'quran-reference',
            title: 'Example: Surah Al-Baqarah',
            content:
              'Surah Al-Baqarah (2) is the longest surah and was revealed over several years in Madinah. It contains the verse of the Throne (Ayat al-Kursi), the longest verse about debt transactions, and comprehensive guidance on fasting, pilgrimage, and fighting.',
            surahNumber: 2,
          },
          {
            type: 'historical-context',
            title: 'Responding to Events',
            content:
              'Many Medinan verses were revealed in response to specific situations: questions from companions, challenges from hypocrites or opponents, or the aftermath of battles. This gave the Quran its characteristic blend of timeless principles and contextual guidance.',
          },
        ],
        takeaways: [
          'Medinan surahs are typically longer than Makkan surahs',
          'They address law, governance, and community life',
          'Many begin with "O you who believe..."',
          'They often respond to specific events and questions',
        ],
        reflectionPrompts: [
          'Why did the style of revelation change after the Hijra?',
          'How do timeless principles adapt to changing circumstances?',
        ],
        mapHighlights: {
          year: 625,
          surahNumbers: [2, 4, 5],
          location: { ...LOCATIONS.MADINAH, zoom: 11 },
        },
      },
    ],
  },

  // Path 6: Trials & Triumph
  {
    id: 'trials-triumph',
    title: 'Trials & Triumph',
    arabicTitle: 'المحن والنصر',
    subtitle: '624-630 CE - The Defining Years',
    description:
      'Study the major battles and treaties, and the surahs revealed in response to these pivotal events.',
    icon: 'Swords',
    accentColor: '#EF4444',
    estimatedTime: '25 min',
    category: 'chronological',
    lessons: [
      {
        id: 'tt-1',
        order: 1,
        title: 'The Battle of Badr',
        arabicTitle: 'غزوة بدر',
        objective: 'Understand the first major battle and its divine support',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Odds Against Them',
            content:
              'In Ramadan of 624 CE (2 AH), the Muslims marched to intercept a Qurayshi trade caravan. The caravan escaped, but Quraysh sent an army of 1,000 warriors to crush the Muslims once and for all. The Muslim force numbered only 313 — poorly equipped, with only two horses and seventy camels among them.',
          },
          {
            type: 'historical-context',
            title: 'The Decision at Badr',
            content:
              'At the wells of Badr, the Prophet ﷺ consulted his companions. Miqdad ibn Amr declared: "We will not say as the people of Musa said, \'Go you and your Lord and fight.\' Rather, we will fight alongside you." Sa\'d ibn Mu\'adh of the Ansar pledged: "Even if you lead us into the sea, we will follow."',
          },
          {
            type: 'quran-reference',
            title: 'Divine Aid',
            content:
              '"[Remember] when you asked help of your Lord, and He answered you, \'Indeed, I will reinforce you with a thousand angels following one another.\'" The entire eighth surah (Al-Anfal) was revealed about this battle.',
            surahNumber: 8,
            ayahRange: { start: 9, end: 10 },
          },
          {
            type: 'narrative',
            title: 'Victory Against All Odds',
            content:
              'The battle lasted a single morning. Seventy Qurayshi leaders were killed, including Abu Jahl, and seventy captured. The Muslims lost only fourteen. It was a stunning, inexplicable victory that proved to Arabia that this new community was under divine protection.',
          },
        ],
        takeaways: [
          'Badr was the first major battle (624 CE, Ramadan)',
          '313 Muslims faced approximately 1,000 Qurayshi warriors',
          'Divine aid came through angels as promised in the Quran',
          'The victory established Muslim credibility in Arabia',
        ],
        reflectionPrompts: [
          'What does Badr teach about reliance on Allah versus numbers?',
          'Why is Badr called "Yawm al-Furqan" (Day of Criterion)?',
        ],
        mapHighlights: {
          year: 624,
          surahNumbers: [8],
          eventIds: ['badr'],
          location: { ...LOCATIONS.BADR, zoom: 10 },
        },
      },
      {
        id: 'tt-2',
        order: 2,
        title: 'The Battle of Uhud',
        arabicTitle: 'غزوة أحد',
        objective: 'Learn the lessons from the Muslim setback at Uhud',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'Quraysh\'s Revenge',
            content:
              'A year after Badr, Quraysh returned with 3,000 warriors, determined to avenge their loss. They camped near Mount Uhud, north of Madinah. The Prophet ﷺ positioned his archers on a hill with strict orders: "Do not leave your positions even if you see birds snatching our corpses."',
          },
          {
            type: 'historical-context',
            title: 'The Turning Point',
            content:
              'The battle began well. The Muslims pushed Quraysh back, and it seemed victory was assured. But the archers, seeing the enemy fleeing and fearing they would miss the spoils, abandoned their hill. Khalid ibn Walid (then fighting for Quraysh) saw the opening and led his cavalry around.',
          },
          {
            type: 'narrative',
            title: 'The Prophet ﷺ Wounded',
            content:
              'Chaos followed. The Prophet ﷺ himself was wounded — his helmet cut his blessed face, and a ring of his chainmail pierced his cheek. Seventy companions were martyred, including Hamza, his beloved uncle. A rumor spread that the Prophet ﷺ had been killed.',
          },
          {
            type: 'quran-reference',
            title: 'Divine Lessons',
            content:
              '"Muhammad is not but a messenger. Messengers have passed on before him. So if he was to die or be killed, would you turn back on your heels?" Surah Aal Imran (3) was revealed to analyze the defeat and rebuild morale.',
            surahNumber: 3,
            ayahRange: { start: 144, end: 144 },
          },
        ],
        takeaways: [
          'Uhud (625 CE) began as victory but turned to setback',
          'The archers\' disobedience led to a devastating cavalry charge',
          'Seventy Muslims were martyred, including Hamza',
          'The Quran taught that obedience and steadfastness are essential',
        ],
        reflectionPrompts: [
          'What happens when material concerns override divine commands?',
          'How do we respond to setbacks in our spiritual journey?',
        ],
        mapHighlights: {
          year: 625,
          surahNumbers: [3],
          eventIds: ['uhud'],
          location: { ...LOCATIONS.UHUD, zoom: 12 },
        },
      },
      {
        id: 'tt-3',
        order: 3,
        title: 'The Battle of the Trench',
        arabicTitle: 'غزوة الخندق',
        objective: 'Understand how faith triumphed over the greatest coalition',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Coalition of All Arabia',
            content:
              'In 627 CE (5 AH), Quraysh assembled the largest army Arabia had ever seen: 10,000 warriors from multiple tribes. They marched on Madinah to end Islam once and for all. The Muslims numbered only 3,000, with no hope of meeting such a force in open battle.',
          },
          {
            type: 'historical-context',
            title: 'The Strategy of the Trench',
            content:
              'Salman al-Farisi, a Persian companion, suggested a strategy unknown to the Arabs: dig a trench around the exposed parts of Madinah. For weeks, the Prophet ﷺ dug alongside his companions, tying a stone to his stomach against hunger. The trench made cavalry charges impossible.',
          },
          {
            type: 'quran-reference',
            title: 'Terror from Above and Below',
            content:
              '"[Remember] when they came at you from above you and from below you, and when eyes shifted and hearts reached the throats, and you assumed about Allah [various] assumptions. There the believers were tested and shaken with a severe shaking."',
            surahNumber: 33,
            ayahRange: { start: 10, end: 11 },
          },
          {
            type: 'narrative',
            title: 'Divine Intervention',
            content:
              'The siege lasted nearly a month. Then Allah sent a fierce, cold wind that overturned tents, extinguished fires, and demoralized the coalition. They withdrew in disarray without breaching the trench. The Prophet ﷺ declared: "Now we will march against them; they will never march against us."',
          },
        ],
        takeaways: [
          'The Confederates numbered 10,000 against 3,000 Muslims',
          'The trench was a Persian strategy suggested by Salman',
          'The siege lasted about a month (627 CE)',
          'A divine wind ended the siege — Quraysh never attacked again',
        ],
        reflectionPrompts: [
          'What does it mean to be "tested and shaken with a severe shaking"?',
          'How can we adopt beneficial practices from any culture?',
        ],
        mapHighlights: {
          year: 627,
          surahNumbers: [33],
          eventIds: ['trench'],
          location: { ...LOCATIONS.MADINAH, zoom: 11 },
        },
      },
      {
        id: 'tt-4',
        order: 4,
        title: 'The Treaty of Hudaybiyyah',
        arabicTitle: 'صلح الحديبية',
        objective: 'Learn how apparent defeat became the greatest victory',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Journey for Umrah',
            content:
              'In 628 CE (6 AH), the Prophet ﷺ set out for Makkah with 1,400 companions in pilgrim garb, unarmed, intending only Umrah. Quraysh blocked them at Hudaybiyyah and refused entry. Negotiations began, and the Prophet ﷺ sent Uthman as his envoy.',
          },
          {
            type: 'historical-context',
            title: 'The Controversial Terms',
            content:
              'The treaty seemed humiliating: Muslims could not enter Makkah that year. Any Qurayshi who became Muslim must be returned to Makkah. Any Muslim who left for Quraysh need not be returned. The treaty was for ten years. Umar questioned: "Are we not upon the truth? Why should we accept humiliation?"',
          },
          {
            type: 'quran-reference',
            title: 'The Clear Victory',
            content:
              '"Indeed, We have given you a clear victory." When Surah Al-Fath was revealed, calling this a "clear victory," some companions were confused. But the Prophet ﷺ explained: this peace would allow Islam to spread freely.',
            surahNumber: 48,
            ayahRange: { start: 1, end: 1 },
          },
          {
            type: 'insight',
            content:
              'In the two years of peace that followed, more people embraced Islam than in all the previous eighteen years combined. Without war, people could hear the message, meet Muslims, and judge for themselves. The "defeat" at Hudaybiyyah led directly to the Conquest of Makkah.',
          },
        ],
        takeaways: [
          'Hudaybiyyah (628 CE) seemed like a humiliating treaty',
          'Muslims could not perform Umrah that year',
          'The Quran called it a "clear victory" (Fath Mubin)',
          'In two years of peace, Islam spread faster than ever',
        ],
        reflectionPrompts: [
          'How can apparent setbacks be hidden victories?',
          'What does Hudaybiyyah teach about patience and trust?',
        ],
        mapHighlights: {
          year: 628,
          surahNumbers: [48],
          eventIds: ['hudaybiyyah'],
          location: { ...LOCATIONS.HUDAYBIYYAH, zoom: 11 },
        },
      },
    ],
  },

  // Path 7: Victory & Completion
  {
    id: 'victory-completion',
    title: 'Victory & Completion',
    arabicTitle: 'الفتح والإتمام',
    subtitle: '630-632 CE - The Final Chapter',
    description:
      'Witness the Conquest of Makkah, the Farewell Pilgrimage, and the completion of the Quran.',
    icon: 'Crown',
    accentColor: '#F59E0B',
    estimatedTime: '20 min',
    category: 'chronological',
    lessons: [
      {
        id: 'vc-1',
        order: 1,
        title: 'The Conquest of Makkah',
        arabicTitle: 'فتح مكة',
        objective: 'Witness the peaceful liberation of the sacred city',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Treaty Broken',
            content:
              'In 630 CE (8 AH), Quraysh\'s allies attacked a tribe allied with the Muslims, violating the Treaty of Hudaybiyyah. The Prophet ﷺ mobilized 10,000 Muslims and marched on Makkah. So swift and secret was the movement that Quraysh only learned of it when they saw the Muslim campfires surrounding the city.',
          },
          {
            type: 'historical-context',
            title: 'The Entry',
            content:
              'The Prophet ﷺ entered Makkah with his head bowed so low it nearly touched his camel, reciting Surah Al-Fath. He granted general amnesty: "Go, you are free." The same people who had tortured Muslims, killed his companions, and driven him from his home — all were forgiven.',
          },
          {
            type: 'narrative',
            title: 'Cleansing the Kaaba',
            content:
              'The Prophet ﷺ entered the Kaaba and destroyed the 360 idols, reciting: "Truth has come and falsehood has vanished. Indeed, falsehood is bound to vanish." The house built by Ibrahim was restored to its original purpose after centuries of idol worship.',
          },
          {
            type: 'quran-reference',
            title: 'When Victory Comes',
            content:
              '"When the victory of Allah has come and the conquest, and you see the people entering into the religion of Allah in multitudes, then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance."',
            surahNumber: 110,
            ayahRange: { start: 1, end: 3 },
          },
        ],
        takeaways: [
          'Makkah was conquered peacefully in 630 CE (8 AH)',
          'The Prophet ﷺ granted general amnesty to his former enemies',
          'The 360 idols were removed from the Kaaba',
          'Surah An-Nasr was revealed about this victory',
        ],
        reflectionPrompts: [
          'What does the general amnesty teach about mercy and power?',
          'How did the conquest differ from typical military victories?',
        ],
        mapHighlights: {
          year: 630,
          surahNumbers: [110, 48],
          eventIds: ['conquest-makkah'],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
      {
        id: 'vc-2',
        order: 2,
        title: 'The Year of Delegations',
        arabicTitle: 'عام الوفود',
        objective: 'See how Arabia embraced Islam after the Conquest',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'Tribes Coming to Islam',
            content:
              'The year following the Conquest (9 AH / 630-631 CE) became known as the "Year of Delegations" (Aam al-Wufud). Tribes from across Arabia sent delegations to Madinah to accept Islam and pledge allegiance to the Prophet ﷺ. What once spread quietly now spread like wildfire.',
          },
          {
            type: 'historical-context',
            title: 'The Transformation',
            content:
              'Just twenty years earlier, Muhammad ﷺ had been a single man in a cave receiving revelation. Now, the entirety of Arabia was embracing his message. Kings of Persia, Rome, Egypt, and Abyssinia had received his letters. The world was changing.',
          },
          {
            type: 'quran-reference',
            title: 'People Entering in Multitudes',
            content:
              'This was the fulfillment of the prophecy: "You see the people entering into the religion of Allah in multitudes" (110:2). No longer individuals secretly converting — now entire tribes, entire regions were accepting Islam collectively.',
            surahNumber: 110,
            ayahRange: { start: 2, end: 2 },
          },
          {
            type: 'insight',
            content:
              'The Prophet ﷺ sent teachers with these delegations to educate their tribes about Islam. The focus was never merely on political allegiance — it was on genuine understanding and transformation of hearts.',
          },
        ],
        takeaways: [
          '9 AH was called the "Year of Delegations"',
          'Tribes from all over Arabia came to accept Islam',
          'This fulfilled the prophecy of Surah An-Nasr',
          'Teachers were sent to educate new communities',
        ],
        reflectionPrompts: [
          'How does patience in early struggles lead to later success?',
          'What role does education play after people accept a message?',
        ],
        mapHighlights: {
          year: 631,
          surahNumbers: [110],
          location: { ...LOCATIONS.MADINAH, zoom: 8 },
        },
      },
      {
        id: 'vc-3',
        order: 3,
        title: 'The Farewell Pilgrimage',
        arabicTitle: 'حجة الوداع',
        objective: 'Experience the final pilgrimage and its profound sermon',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Final Journey',
            content:
              'In the tenth year after Hijra (632 CE), the Prophet ﷺ announced he would perform Hajj. Over 100,000 Muslims accompanied him — the largest gathering in Islamic history until then. None knew it would be his last pilgrimage.',
          },
          {
            type: 'historical-context',
            title: 'The Farewell Sermon',
            content:
              'On the 9th of Dhul Hijjah, at Mount Arafat, the Prophet ﷺ delivered his Farewell Sermon. He addressed fundamental principles: the sanctity of life, property, and honor; equality regardless of race; the rights of women; the prohibition of usury; and the importance of the Quran and Sunnah.',
          },
          {
            type: 'quran-reference',
            title: 'The Completion of Religion',
            content:
              'That day, the final verse of legislation was revealed: "This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion." Umar wept when he heard it — he understood this meant the Prophet\'s mission was complete.',
            surahNumber: 5,
            ayahRange: { start: 3, end: 3 },
          },
          {
            type: 'narrative',
            title: 'The Final Question',
            content:
              'The Prophet ﷺ asked: "Have I conveyed the message?" The multitude roared: "Yes, you have!" He raised his finger to the sky: "O Allah, bear witness. O Allah, bear witness. O Allah, bear witness."',
          },
        ],
        takeaways: [
          'Over 100,000 Muslims performed Hajj with the Prophet ﷺ in 632 CE',
          'The Farewell Sermon established fundamental human rights',
          'Verse 5:3 declared the religion "perfected and completed"',
          'The Prophet ﷺ confirmed he had conveyed the message fully',
        ],
        reflectionPrompts: [
          'What principles from the Farewell Sermon are most relevant today?',
          'What does it mean that the religion was "completed"?',
        ],
        mapHighlights: {
          year: 632,
          surahNumbers: [5],
          eventIds: ['farewell-pilgrimage'],
          location: { ...LOCATIONS.ARAFAT, zoom: 11 },
        },
      },
      {
        id: 'vc-4',
        order: 4,
        title: 'The Legacy Endures',
        arabicTitle: 'الإرث الخالد',
        objective: 'Reflect on the completion of revelation and its eternal message',
        estimatedTime: 4,
        sections: [
          {
            type: 'narrative',
            title: 'The Return to Madinah',
            content:
              'After the Farewell Pilgrimage, the Prophet ﷺ returned to Madinah. In the following weeks, he began to show signs of illness. He continued to lead prayers when able, and when too weak, he appointed Abu Bakr to lead.',
          },
          {
            type: 'historical-context',
            title: 'The Final Days',
            content:
              'On Monday, 12th Rabi\' al-Awwal, 11 AH (June 8, 632 CE), the Prophet ﷺ passed away in the apartment of Aisha, his head resting on her lap. His last words included prayers for his Ummah and the reminder: "Prayer, prayer, and those whom your right hands possess."',
          },
          {
            type: 'quran-reference',
            title: 'The Reminder of Mortality',
            content:
              '"Muhammad is not but a messenger. Messengers have passed on before him. So if he was to die or be killed, would you turn back on your heels?" Abu Bakr recited this verse to the shocked community, reminding them that their faith was in Allah, not in any man.',
            surahNumber: 3,
            ayahRange: { start: 144, end: 144 },
          },
          {
            type: 'insight',
            content:
              'In 23 years, an unlettered man from Makkah transformed Arabia and set in motion a civilization that would span continents and centuries. The Quran he transmitted remains unchanged, memorized by millions, recited daily across the globe. The message continues.',
          },
        ],
        takeaways: [
          'The Prophet ﷺ passed away on 12th Rabi\' al-Awwal, 11 AH (632 CE)',
          'In 23 years, the entire Quran was revealed and Arabia was transformed',
          'Abu Bakr reminded the community that faith transcends any individual',
          'The Quran and Sunnah remain as the eternal legacy',
        ],
        reflectionPrompts: [
          'How do we continue the mission of conveying this message?',
          'What does it mean to follow a prophet who has passed on?',
        ],
        mapHighlights: {
          year: 632,
          surahNumbers: [3],
          eventIds: ['death-prophet'],
          location: { ...LOCATIONS.MADINAH, zoom: 12 },
        },
      },
    ],
  },

  // ============================================
  // THEMATIC LEARNING PATHS
  // ============================================

  // Thematic Path 1: Surahs of Comfort
  {
    id: 'surahs-of-comfort',
    title: 'Surahs of Comfort',
    arabicTitle: 'سور الطمأنينة',
    subtitle: 'Divine Consolation in Times of Hardship',
    description:
      'Explore the surahs revealed during the most difficult moments — offering timeless comfort and hope for all who struggle.',
    icon: 'Heart',
    accentColor: '#F472B6',
    estimatedTime: '20 min',
    category: 'thematic',
    lessons: [
      {
        id: 'soc-1',
        order: 1,
        title: 'When Revelation Paused',
        arabicTitle: 'فترة الوحي',
        objective: 'Understand the context of Surah Ad-Duha and its message of hope',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Painful Silence',
            content:
              'After the initial revelations, there came a pause. Days turned to weeks, and the Prophet ﷺ waited anxiously for Jibril. The Quraysh mocked him: "Your Lord has abandoned you!" This silence was devastating for someone who had tasted the sweetness of divine communication.',
          },
          {
            type: 'quran-reference',
            title: 'The Morning Light Breaks',
            content:
              '"By the morning brightness, and by the night when it covers with darkness — your Lord has not forsaken you, nor has He detested you. And the Hereafter is better for you than the first life. And your Lord is going to give you, and you will be satisfied."',
            surahNumber: 93,
            ayahRange: { start: 1, end: 5 },
          },
          {
            type: 'insight',
            content:
              'Notice the imagery: the morning (duha) always follows the night. The pause in revelation was like night — dark and difficult — but the morning was coming. Allah swears by both, teaching us that darkness is temporary and part of the divine plan.',
          },
          {
            type: 'historical-context',
            title: 'The Reminder of Blessings',
            content:
              'The surah then reminds the Prophet ﷺ of his past: "Did He not find you an orphan and give you refuge? And He found you lost and guided you. And He found you poor and made you self-sufficient." Past blessings prove future care.',
          },
        ],
        takeaways: [
          'Surah Ad-Duha was revealed after a painful pause in revelation',
          'The imagery of morning following night teaches that hardship is temporary',
          'Past blessings are proof of Allah\'s continued care',
          'The surah commands us to care for orphans and those in need',
        ],
        reflectionPrompts: [
          'When have you felt "abandoned" only to later see Allah\'s wisdom?',
          'What past blessings remind you of Allah\'s care during difficulty?',
        ],
        mapHighlights: {
          year: 610,
          surahNumbers: [93],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
      {
        id: 'soc-2',
        order: 2,
        title: 'Expansion After Constriction',
        arabicTitle: 'الشرح بعد الضيق',
        objective: 'Learn how Surah Ash-Sharh promises ease with every hardship',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Companion Surah',
            content:
              'Surah Ash-Sharh (94) is the twin of Ad-Duha. Together they form a pair of comfort revealed during the early Makkan period. While Ad-Duha addressed the pause in revelation, Ash-Sharh addresses the weight of the mission itself.',
          },
          {
            type: 'quran-reference',
            title: 'The Expanding of the Chest',
            content:
              '"Did We not expand for you your chest? And We removed from you your burden, which had weighed upon your back. And We raised high for you your reputation. For indeed, with hardship comes ease. Indeed, with hardship comes ease."',
            surahNumber: 94,
            ayahRange: { start: 1, end: 6 },
          },
          {
            type: 'insight',
            title: 'The Double Promise',
            content:
              'The phrase "with hardship comes ease" is repeated twice. Scholars explain: one hardship is mentioned, but ease is mentioned twice — meaning every difficulty brings multiple forms of relief. The Arabic uses "ma\'a" (with), not "ba\'da" (after), teaching that ease exists alongside hardship, not just after it.',
          },
          {
            type: 'narrative',
            title: 'Your Reputation Raised High',
            content:
              'At a time when the Prophet ﷺ was mocked and rejected, Allah promised: "We raised high for you your reputation." Today, his name is mentioned alongside Allah\'s name in every adhan, every prayer, billions of times daily across the globe.',
          },
        ],
        takeaways: [
          'Surah Ash-Sharh is the twin of Ad-Duha, revealed together',
          '"With hardship comes ease" is repeated twice — double ease for each hardship',
          'Ease comes WITH hardship, not just after it',
          'The Prophet\'s reputation was raised to be mentioned in every prayer',
        ],
        reflectionPrompts: [
          'Can you identify forms of ease that exist alongside your current hardship?',
        ],
        mapHighlights: {
          year: 610,
          surahNumbers: [94],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
      {
        id: 'soc-3',
        order: 3,
        title: 'The Abundance',
        arabicTitle: 'الكوثر',
        objective: 'Discover how Surah Al-Kawthar responded to mockery with eternal promise',
        estimatedTime: 5,
        sections: [
          {
            type: 'historical-context',
            title: 'The Insult',
            content:
              'When the Prophet\'s son passed away, his enemies rejoiced. Al-As ibn Wa\'il called him "abtar" — cut off, without legacy, soon to be forgotten. In a society that valued sons above all, this was the ultimate insult.',
          },
          {
            type: 'quran-reference',
            title: 'The Shortest Surah',
            content:
              '"Indeed, We have granted you Al-Kawthar. So pray to your Lord and sacrifice. Indeed, your enemy is the one who is cut off."',
            surahNumber: 108,
            ayahRange: { start: 1, end: 3 },
          },
          {
            type: 'insight',
            title: 'What is Al-Kawthar?',
            content:
              'Al-Kawthar means "abundance" or "the most good." It refers to a river in Paradise, but also to the abundance of followers, knowledge, and blessings. The Prophet ﷺ has more spiritual children — over a billion Muslims — than any person in history.',
          },
          {
            type: 'narrative',
            title: 'Who is Really Cut Off?',
            content:
              'The stunning reversal: "Your enemy is the one who is cut off." Al-As ibn Wa\'il is forgotten except when Muslims read about how wrong he was. The Prophet ﷺ is remembered and loved by billions. This three-verse surah completely inverted the insult.',
          },
        ],
        takeaways: [
          'Surah Al-Kawthar was revealed when enemies mocked the Prophet\'s loss of his son',
          'Al-Kawthar means abundance — a river in Paradise and countless followers',
          'The shortest surah carries one of the most powerful reversals',
          'Those who mock believers are the ones truly "cut off"',
        ],
        reflectionPrompts: [
          'How does this surah change how you view worldly "success" vs. divine blessing?',
        ],
        mapHighlights: {
          year: 616,
          surahNumbers: [108],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
      {
        id: 'soc-4',
        order: 4,
        title: 'Surahs for Every Struggle',
        arabicTitle: 'سور لكل محنة',
        objective: 'Explore other Makkan surahs that provide comfort during trials',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'A Collection of Comfort',
            content:
              'Beyond Ad-Duha, Ash-Sharh, and Al-Kawthar, the Quran contains many surahs revealed specifically during times of hardship. Each addresses different aspects of struggle and provides unique forms of comfort.',
          },
          {
            type: 'quran-reference',
            title: 'Surah Al-Inshirah (The Relief)',
            content:
              'Surah Yusuf was revealed during the "Year of Sorrow" when the Prophet ﷺ lost both Khadijah and Abu Talib. The story of Yusuf — separated from his father for decades, then reunited — offered hope that separation and grief are not permanent.',
            surahNumber: 12,
          },
          {
            type: 'historical-context',
            title: 'Surah Al-Kahf: Protection from Trials',
            content:
              'Surah Al-Kahf was revealed when the Quraysh asked trick questions. It teaches protection from four great trials: faith (People of the Cave), wealth (Two Gardens), knowledge (Musa and Khidr), and power (Dhul-Qarnayn). Reading it weekly is recommended.',
          },
          {
            type: 'insight',
            title: 'The Pattern of Comfort',
            content:
              'Notice the pattern in surahs of comfort: acknowledgment of difficulty, reminder of Allah\'s past help, promise of future ease, and a call to action (prayer, patience, gratitude). This is the Quranic model for processing hardship.',
          },
        ],
        takeaways: [
          'The Quran contains many surahs specifically addressing hardship',
          'Surah Yusuf was revealed during the Year of Sorrow as comfort',
          'Surah Al-Kahf protects from trials of faith, wealth, knowledge, and power',
          'The Quranic pattern: acknowledge → remind → promise → act',
        ],
        reflectionPrompts: [
          'Which surah of comfort resonates most with your current situation?',
          'How can you use the Quranic pattern when facing difficulty?',
        ],
        mapHighlights: {
          year: 619,
          surahNumbers: [12, 18],
          location: { ...LOCATIONS.MAKKAH, zoom: 10 },
        },
      },
    ],
  },

  // Thematic Path 2: Stories of the Prophets
  {
    id: 'stories-of-prophets',
    title: 'Stories of the Prophets',
    arabicTitle: 'قصص الأنبياء',
    subtitle: 'Lessons from Those Who Came Before',
    description:
      'Journey through the narrative surahs that tell the stories of prophets — each story a mirror reflecting timeless lessons.',
    icon: 'ScrollText',
    accentColor: '#60A5FA',
    estimatedTime: '25 min',
    category: 'thematic',
    lessons: [
      {
        id: 'sop-1',
        order: 1,
        title: 'The Best of Stories',
        arabicTitle: 'أحسن القصص',
        objective: 'Understand why and how the Quran tells prophetic stories',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'Why Stories?',
            content:
              'The Quran is not a storybook, yet nearly one-third of it consists of narratives. Why? Because stories bypass intellectual defenses and speak directly to the heart. They show rather than tell. They make abstract principles concrete through lived experience.',
          },
          {
            type: 'quran-reference',
            title: 'The Declaration',
            content:
              '"We relate to you the best of stories in what We have revealed to you of this Quran, although you were, before it, among the unaware." This verse opens Surah Yusuf, the most complete narrative in the Quran.',
            surahNumber: 12,
            ayahRange: { start: 3, end: 3 },
          },
          {
            type: 'insight',
            title: 'Stories as Mirrors',
            content:
              'Each prophetic story serves as a mirror. Musa\'s story teaches confronting tyranny. Yusuf\'s teaches patience through injustice. Ibrahim\'s teaches breaking with tradition for truth. We see ourselves in their struggles and find guidance in their responses.',
          },
          {
            type: 'historical-context',
            title: 'Comfort for the Prophet ﷺ',
            content:
              'Many prophetic stories were revealed when the Prophet ﷺ faced rejection. "All we relate to you of the news of the messengers is that by which We make firm your heart" (11:120). The struggles of past prophets validated his own.',
          },
        ],
        takeaways: [
          'Nearly one-third of the Quran consists of narratives',
          'Stories bypass defenses and speak to the heart',
          'Surah Yusuf is called "the best of stories"',
          'Prophetic stories were revealed to strengthen the Prophet\'s heart',
        ],
        reflectionPrompts: [
          'Which prophetic story do you relate to most? Why?',
        ],
        mapHighlights: {
          year: 619,
          surahNumbers: [12],
          location: { ...LOCATIONS.MAKKAH, zoom: 10 },
        },
      },
      {
        id: 'sop-2',
        order: 2,
        title: 'Yusuf: Beauty Through Trial',
        arabicTitle: 'يوسف: الجمال في المحنة',
        objective: 'Learn the lessons of patience and trust from the story of Yusuf',
        estimatedTime: 6,
        sections: [
          {
            type: 'narrative',
            title: 'The Only Complete Story',
            content:
              'Surah Yusuf (12) is unique — it tells one complete story from beginning to end, unlike other surahs that contain fragments of multiple stories. It follows Yusuf from a child\'s dream to becoming the most powerful man in Egypt.',
          },
          {
            type: 'historical-context',
            title: 'When It Was Revealed',
            content:
              'This surah was revealed during the "Year of Sorrow" when the Prophet ﷺ lost Khadijah and Abu Talib. A story about separation from loved ones, betrayal by one\'s own people, and ultimate reunion — it was perfectly timed comfort.',
          },
          {
            type: 'quran-reference',
            title: 'The Key Verse',
            content:
              'When Yusuf\'s brothers finally stood before him, not recognizing him, and then the revelation came — his response: "No blame upon you today. Allah will forgive you, and He is the Most Merciful of the merciful." After decades of injustice, his first words were forgiveness.',
            surahNumber: 12,
            ayahRange: { start: 92, end: 92 },
          },
          {
            type: 'insight',
            title: 'Patience with Purpose',
            content:
              'Yusuf\'s story teaches "sabr jameel" — beautiful patience. Not passive resignation, but active trust. In the well, in slavery, in prison, in power — he maintained his character. His beauty was not just physical; it was moral consistency through every circumstance.',
          },
        ],
        takeaways: [
          'Surah Yusuf is the only complete narrative in the Quran',
          'It was revealed during the Year of Sorrow as comfort',
          'Yusuf\'s first words to his brothers were forgiveness, not blame',
          '"Sabr jameel" (beautiful patience) is active trust, not passive resignation',
        ],
        reflectionPrompts: [
          'How can you practice "beautiful patience" in your current trial?',
          'What does Yusuf\'s forgiveness teach about responding to those who wronged us?',
        ],
        mapHighlights: {
          year: 619,
          surahNumbers: [12],
          eventIds: ['year-of-sorrow'],
          location: { ...LOCATIONS.MAKKAH, zoom: 10 },
        },
      },
      {
        id: 'sop-3',
        order: 3,
        title: 'Musa: The Most Mentioned',
        arabicTitle: 'موسى: أكثر الأنبياء ذكراً',
        objective: 'Understand why Musa appears more than any other prophet in the Quran',
        estimatedTime: 6,
        sections: [
          {
            type: 'narrative',
            title: 'The Most Frequent Name',
            content:
              'Musa (Moses) is mentioned by name 136 times in the Quran — more than any other individual. His story appears in over 30 surahs. Why such emphasis? Because his mission most closely paralleled that of Muhammad ﷺ.',
          },
          {
            type: 'historical-context',
            title: 'Parallel Missions',
            content:
              'Both faced tyrannical opposition (Pharaoh/Quraysh). Both led their people on a migration (Exodus/Hijra). Both received divine law (Torah/Quran). Both built communities from oppressed minorities. The Prophet ﷺ could see his own journey reflected in Musa\'s.',
          },
          {
            type: 'quran-reference',
            title: 'The Staff and the Miracles',
            content:
              'Surah Ta-Ha recounts Musa\'s calling at the burning bush, the miracles of the staff and the shining hand, the confrontation with Pharaoh, and the parting of the sea. Each miracle taught: Allah\'s power transforms the ordinary (a staff) into the extraordinary.',
            surahNumber: 20,
          },
          {
            type: 'insight',
            title: 'The Human Prophet',
            content:
              'Musa is portrayed with remarkable humanity — his fear at the staff becoming a snake, his speech impediment, his anger at his people, his fatigue. This accessibility makes his story relatable. If Musa, with his imperfections, could be a great prophet, there is hope for all of us.',
          },
        ],
        takeaways: [
          'Musa is mentioned 136 times — more than any other individual',
          'His mission closely paralleled Muhammad\'s ﷺ',
          'His story appears in over 30 different surahs',
          'He is portrayed with human imperfections, making him relatable',
        ],
        reflectionPrompts: [
          'What aspect of Musa\'s story speaks to your current situation?',
        ],
        mapHighlights: {
          year: 615,
          surahNumbers: [20, 28],
          location: { ...LOCATIONS.MAKKAH, zoom: 10 },
        },
      },
      {
        id: 'sop-4',
        order: 4,
        title: 'Ibrahim: The Father of Prophets',
        arabicTitle: 'إبراهيم: أبو الأنبياء',
        objective: 'Learn from Ibrahim\'s unwavering submission to Allah',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Shared Ancestor',
            content:
              'Ibrahim holds a unique position: he is the father of both the Israelite prophets (through Ishaq) and Muhammad ﷺ (through Ismail). He built the Kaaba, established the Hajj rituals, and exemplified pure monotheism (hanifiyyah).',
          },
          {
            type: 'quran-reference',
            title: 'The Test of Tests',
            content:
              '"And when his Lord tested Ibrahim with words and he fulfilled them, [Allah] said, \'Indeed, I will make you a leader for the people.\'" Ibrahim passed every test — leaving his homeland, facing the fire, sacrificing his son — earning the title "Khalil Allah" (Friend of Allah).',
            surahNumber: 2,
            ayahRange: { start: 124, end: 124 },
          },
          {
            type: 'historical-context',
            title: 'The Connection to Makkah',
            content:
              'Ibrahim\'s story is intimately connected to Makkah. He brought Hajar and Ismail to this barren valley. He raised the foundations of the Kaaba. His footsteps are preserved at Maqam Ibrahim. Every pilgrim reenacts his family\'s journey.',
          },
          {
            type: 'insight',
            title: 'Submission as Liberation',
            content:
              'Ibrahim\'s story teaches that submission to Allah is not restriction but liberation. By submitting to the command to sacrifice his son, he was freed from attachment to anything besides Allah. The knife did not cut Ismail; it cut Ibrahim\'s attachment to the world.',
          },
        ],
        takeaways: [
          'Ibrahim is the father of prophets — ancestor to both Israelite prophets and Muhammad ﷺ',
          'He built the Kaaba and established Hajj rituals',
          'He earned the title "Khalil Allah" (Friend of Allah) through his tests',
          'His story teaches that submission to Allah is liberation, not restriction',
        ],
        reflectionPrompts: [
          'What are you being asked to "sacrifice" in submission to Allah?',
        ],
        mapHighlights: {
          year: 613,
          surahNumbers: [2, 14],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
      {
        id: 'sop-5',
        order: 5,
        title: 'Maryam and Isa',
        arabicTitle: 'مريم وعيسى',
        objective: 'Understand the Quranic portrayal of Maryam and Isa',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Only Woman Named',
            content:
              'Maryam is the only woman mentioned by name in the entire Quran — and she has an entire surah named after her. She is mentioned more times in the Quran (34) than in the entire New Testament. Her honor in Islam is unparalleled.',
          },
          {
            type: 'quran-reference',
            title: 'The Annunciation',
            content:
              '"And mention, [O Muhammad], in the Book [the story of] Mary, when she withdrew from her family to a place toward the east... Then We sent to her Our Spirit, and he represented himself to her as a well-proportioned man." The Quran\'s account of the miraculous conception.',
            surahNumber: 19,
            ayahRange: { start: 16, end: 17 },
          },
          {
            type: 'historical-context',
            title: 'Protection in Abyssinia',
            content:
              'When Muslims sought refuge in Christian Abyssinia, Ja\'far recited the opening of Surah Maryam before the Negus. The king wept. This surah, honoring Mary and Jesus, became a bridge between the faiths and protected the Muslim refugees.',
          },
          {
            type: 'insight',
            title: 'Isa in Islam',
            content:
              'Isa (Jesus) is a mighty messenger, born miraculously, who performed miracles by Allah\'s permission. He was not crucified but raised to Allah, and will return before the Day of Judgment. The Quran honors him while clarifying theological points.',
          },
        ],
        takeaways: [
          'Maryam is the only woman named in the Quran',
          'She is mentioned 34 times — more than in the New Testament',
          'Surah Maryam protected Muslim refugees in Abyssinia',
          'Isa is honored as a mighty messenger who will return',
        ],
        reflectionPrompts: [
          'What does Maryam\'s story teach about devotion and trust?',
        ],
        mapHighlights: {
          year: 615,
          surahNumbers: [19],
          eventIds: ['first-abyssinia'],
          location: { ...LOCATIONS.MAKKAH, zoom: 9 },
        },
      },
    ],
  },

  // Thematic Path 3: Makki vs Madani
  {
    id: 'makki-vs-madani',
    title: 'Makki vs Madani',
    arabicTitle: 'المكي والمدني',
    subtitle: 'Two Eras, Two Styles, One Message',
    description:
      'Compare the surahs revealed in Makkah versus Madinah — understanding how context shaped style while the core message remained unchanged.',
    icon: 'GitCompare',
    accentColor: '#A78BFA',
    estimatedTime: '20 min',
    category: 'thematic',
    lessons: [
      {
        id: 'mvm-1',
        order: 1,
        title: 'What Makes a Surah Makki or Madani?',
        arabicTitle: 'ما الفرق بين المكي والمدني؟',
        objective: 'Learn the criteria scholars use to classify surahs',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Primary Definition',
            content:
              'The most accepted definition: Makki surahs are those revealed BEFORE the Hijra (622 CE), regardless of location. Madani surahs are those revealed AFTER the Hijra. So a verse revealed in Makkah after the Conquest (630 CE) would be Madani, not Makki.',
          },
          {
            type: 'historical-context',
            title: 'The Numbers',
            content:
              '86 surahs are classified as Makki, 28 as Madani. However, this is simplified — many surahs contain both Makki and Madani verses. Surah Al-Baqarah, for example, is Madani but contains verse 281, believed to be the last verse revealed.',
          },
          {
            type: 'insight',
            title: 'Why the Distinction Matters',
            content:
              'Understanding whether a surah is Makki or Madani helps with: interpreting verses in context, understanding the progression of Islamic law, seeing how the Quran responded to changing circumstances, and appreciating the wisdom in the order of revelation.',
          },
          {
            type: 'narrative',
            title: 'Identifying Features',
            content:
              'Scholars developed markers: Makki surahs often address "O mankind" while Madani address "O you who believe." Makki surahs discuss Tawhid and the afterlife; Madani discuss law and community. Makki surahs are often shorter with powerful rhythms; Madani are often longer with detailed guidance.',
          },
        ],
        takeaways: [
          'Makki = revealed before Hijra; Madani = revealed after Hijra',
          '86 surahs are Makki, 28 are Madani',
          'Many surahs contain verses from both periods',
          'The distinction helps interpret verses in their proper context',
        ],
        reflectionPrompts: [
          'Why might Allah have revealed different styles for different contexts?',
        ],
        mapHighlights: {
          year: 622,
          location: { ...LOCATIONS.MAKKAH, zoom: 8 },
        },
      },
      {
        id: 'mvm-2',
        order: 2,
        title: 'The Makkan Style',
        arabicTitle: 'أسلوب السور المكية',
        objective: 'Understand the distinctive features of Makkan surahs',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Audience',
            content:
              'In Makkah, the Prophet ﷺ addressed polytheists who denied the resurrection, associated partners with Allah, and rejected prophethood. The Makkan surahs therefore focus on establishing fundamental beliefs rather than detailed laws.',
          },
          {
            type: 'quran-reference',
            title: 'Powerful and Concise',
            content:
              'Consider Surah Al-Ikhlas: "Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent." Four verses that demolish polytheism. This concise, powerful style is quintessentially Makkan.',
            surahNumber: 112,
            ayahRange: { start: 1, end: 4 },
          },
          {
            type: 'insight',
            title: 'Characteristics of Makkan Surahs',
            content:
              'Short, punchy verses with strong rhythm. Oaths by natural phenomena (sun, moon, stars, night). Emphasis on Tawhid (Oneness), the Day of Judgment, and moral accountability. Stories of past nations who rejected prophets. Addresses "O mankind" more than "O you who believe."',
          },
          {
            type: 'historical-context',
            title: 'Building Faith Under Persecution',
            content:
              'These surahs were revealed while Muslims were a persecuted minority. They needed spiritual fortification, not community laws. The Makkan surahs built unshakeable conviction in hearts that would later be tested to their limits.',
          },
        ],
        takeaways: [
          'Makkan surahs addressed polytheists, focusing on core beliefs',
          'They feature short, powerful verses with strong rhythm',
          'Common themes: Tawhid, Day of Judgment, stories of past nations',
          'They built conviction in hearts before community laws were needed',
        ],
        reflectionPrompts: [
          'Which Makkan surah strengthens your faith the most?',
        ],
        mapHighlights: {
          year: 615,
          surahNumbers: [112, 111, 113, 114],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
      {
        id: 'mvm-3',
        order: 3,
        title: 'The Madinan Style',
        arabicTitle: 'أسلوب السور المدنية',
        objective: 'Understand the distinctive features of Madinan surahs',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'A New Context',
            content:
              'In Madinah, Muslims were no longer a persecuted minority but a community building a state. They needed laws for family, commerce, warfare, and governance. The audience now included Jews, Christians, and hypocrites alongside believers.',
          },
          {
            type: 'quran-reference',
            title: 'Detailed Guidance',
            content:
              'Surah Al-Baqarah contains the longest verse in the Quran — verse 282, about documenting debts. This level of detail is characteristic of Madinan surahs: "O you who believe, when you contract a debt for a specified term, write it down..."',
            surahNumber: 2,
            ayahRange: { start: 282, end: 282 },
          },
          {
            type: 'insight',
            title: 'Characteristics of Madinan Surahs',
            content:
              'Longer verses with detailed legal guidance. Addresses "O you who believe" frequently. Laws of inheritance, marriage, divorce, criminal punishment. Rules of warfare and treaties. Dialogue with People of the Book (Jews and Christians). Exposure of hypocrites.',
          },
          {
            type: 'historical-context',
            title: 'Building a Civilization',
            content:
              'The Madinan surahs transformed a community of faith into a functioning civilization. Laws were revealed gradually, in response to specific situations. This "gradual legislation" (tadrij) allowed the community to adapt without being overwhelmed.',
          },
        ],
        takeaways: [
          'Madinan surahs addressed a Muslim community building a state',
          'They feature longer verses with detailed legal guidance',
          'Common themes: family law, commerce, warfare, governance',
          'Laws were revealed gradually in response to specific situations',
        ],
        reflectionPrompts: [
          'Why might detailed laws come after establishing faith?',
        ],
        mapHighlights: {
          year: 625,
          surahNumbers: [2, 4, 5],
          location: { ...LOCATIONS.MADINAH, zoom: 11 },
        },
      },
      {
        id: 'mvm-4',
        order: 4,
        title: 'One Message, Adapted to Context',
        arabicTitle: 'رسالة واحدة بأساليب متعددة',
        objective: 'See how the core message remained constant while style adapted',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Constant Core',
            content:
              'Despite the differences in style, the core message never changed: Tawhid (Oneness of Allah), prophethood of Muhammad ﷺ, the Day of Judgment, and moral accountability. These appear in both Makki and Madani surahs — only the emphasis shifts.',
          },
          {
            type: 'insight',
            title: 'Wisdom in Gradual Revelation',
            content:
              'If the entire Quran had been revealed at once in Makkah, the detailed laws would have overwhelmed a persecuted community. If it had all been revealed in Madinah, the spiritual foundations might not have been as deep. The 23-year period allowed both foundations and structure.',
          },
          {
            type: 'quran-reference',
            title: 'Why Gradual Revelation?',
            content:
              '"And those who disbelieve say, \'Why was the Quran not revealed to him all at once?\' Thus [it is] that We may strengthen thereby your heart. And We have spaced it distinctly." Gradual revelation strengthened hearts and addressed circumstances.',
            surahNumber: 25,
            ayahRange: { start: 32, end: 32 },
          },
          {
            type: 'historical-context',
            title: 'A Model for Da\'wah',
            content:
              'The Makki-Madani distinction offers a model for sharing Islam: establish beliefs before laws, build conviction before community, address the heart before the actions. Prophet Musa was told: "Speak to him gently" even when addressing Pharaoh.',
          },
        ],
        takeaways: [
          'Core beliefs (Tawhid, prophethood, judgment) appear in both Makki and Madani',
          'Gradual revelation allowed hearts to be strengthened over 23 years',
          'The sequence offers a model: establish faith before detailed law',
          'Context shaped style, but the essential message remained unchanged',
        ],
        reflectionPrompts: [
          'How can the Makki-Madani model guide how we share Islam today?',
        ],
        mapHighlights: {
          year: 622,
          location: { lat: 22.5, lng: 39.5, zoom: 7 },
        },
      },
    ],
  },

  // Thematic Path 4: The Night Surahs
  {
    id: 'night-surahs',
    title: 'The Night Surahs',
    arabicTitle: 'سور الليل',
    subtitle: 'Revelations of the Night',
    description:
      'Explore surahs revealed at night or about the night — understanding the special relationship between darkness, devotion, and divine communication.',
    icon: 'Moon',
    accentColor: '#6366F1',
    estimatedTime: '15 min',
    category: 'thematic',
    lessons: [
      {
        id: 'ns-1',
        order: 1,
        title: 'The Night of Power',
        arabicTitle: 'ليلة القدر',
        objective: 'Understand the significance of the night when revelation began',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'The Greatest Night',
            content:
              'The Quran began its descent on a single night — Laylat al-Qadr, the Night of Power. This night, occurring in the last ten nights of Ramadan, is described as better than a thousand months. It is the anniversary of when the heavens opened.',
          },
          {
            type: 'quran-reference',
            title: 'Surah Al-Qadr',
            content:
              '"Indeed, We sent it down during the Night of Decree. And what can make you know what the Night of Decree is? The Night of Decree is better than a thousand months. The angels and the Spirit descend therein by permission of their Lord for every matter. Peace it is until the emergence of dawn."',
            surahNumber: 97,
            ayahRange: { start: 1, end: 5 },
          },
          {
            type: 'insight',
            title: 'Why Night?',
            content:
              'Night is when the world quiets, when distractions fade, when the soul can focus. The Prophet ﷺ was in seclusion at night when Jibril came. The night prayer (Tahajjud) is emphasized repeatedly. Darkness of the world allows the light of revelation to shine brightest.',
          },
          {
            type: 'historical-context',
            title: 'Seeking the Night',
            content:
              'The Prophet ﷺ would increase his worship in the last ten nights of Ramadan, seeking Laylat al-Qadr. He said: "Whoever stands in prayer on Laylat al-Qadr, out of faith and seeking reward, will have all his past sins forgiven."',
          },
        ],
        takeaways: [
          'Laylat al-Qadr is the night when Quran revelation began',
          'It is better than 1,000 months (83+ years)',
          'Angels descend on this night by Allah\'s permission',
          'The Prophet ﷺ intensified worship in the last ten nights of Ramadan',
        ],
        reflectionPrompts: [
          'How do you seek Laylat al-Qadr in Ramadan?',
          'What makes night a special time for worship?',
        ],
        mapHighlights: {
          year: 610,
          surahNumbers: [97],
          eventIds: ['first-revelation'],
          location: { ...LOCATIONS.CAVE_HIRA, zoom: 12 },
        },
      },
      {
        id: 'ns-2',
        order: 2,
        title: 'The Wrapped One',
        arabicTitle: 'المزمل',
        objective: 'Learn about the night prayer commanded in Surah Al-Muzzammil',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'Among the Earliest Revelations',
            content:
              'Surah Al-Muzzammil (The Wrapped One) was among the first surahs revealed. It addresses the Prophet ﷺ as he wrapped himself in his cloak, perhaps after the overwhelming experience of revelation. It establishes the night prayer as foundational.',
          },
          {
            type: 'quran-reference',
            title: 'The Night Vigil',
            content:
              '"O you who wraps himself [in clothing]! Arise [to pray] the night, except for a little — half of it, or subtract from it a little, or add to it — and recite the Quran with measured recitation. Indeed, We will cast upon you a heavy word."',
            surahNumber: 73,
            ayahRange: { start: 1, end: 5 },
          },
          {
            type: 'insight',
            title: 'Preparation for a Heavy Word',
            content:
              'The command to pray at night came BEFORE most of the Quran was revealed. Why? Because the "heavy word" (the Quran) required spiritual preparation. Night prayer builds the strength needed to carry and convey divine revelation.',
          },
          {
            type: 'historical-context',
            title: 'Later Easing',
            content:
              'Initially, the night prayer was obligatory, and Muslims would pray most of the night. Later, verse 20 of the same surah eased this: "Recite what is easy from the Quran." The obligation was reduced, but the virtue remained immense.',
          },
        ],
        takeaways: [
          'Surah Al-Muzzammil was among the earliest revelations',
          'It establishes night prayer (Tahajjud) as foundational',
          'Night prayer was commanded BEFORE most revelation — as preparation',
          'The obligation was later eased, but the virtue remains',
        ],
        reflectionPrompts: [
          'How can you incorporate night prayer into your life?',
        ],
        mapHighlights: {
          year: 610,
          surahNumbers: [73],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
      {
        id: 'ns-3',
        order: 3,
        title: 'Oaths by the Night',
        arabicTitle: 'القسم بالليل',
        objective: 'Explore surahs that swear by the night and nighttime phenomena',
        estimatedTime: 5,
        sections: [
          {
            type: 'narrative',
            title: 'Divine Oaths',
            content:
              'Multiple surahs begin with oaths by the night or night-related phenomena. When Allah swears by something, He draws our attention to its significance. The night, stars, moon, and dawn are witnesses to truths we need to understand.',
          },
          {
            type: 'quran-reference',
            title: 'Surah Al-Lail',
            content:
              '"By the night when it covers, and by the day when it appears, and by He who created the male and female — indeed, your efforts are diverse." The night "covering" symbolizes how our deeds can be hidden, but Allah sees all.',
            surahNumber: 92,
            ayahRange: { start: 1, end: 4 },
          },
          {
            type: 'quran-reference',
            title: 'Surah Al-Fajr',
            content:
              '"By the dawn, and by the ten nights, and by the even and the odd, and by the night when it passes — is there [not] in [all] that an oath for one of discernment?" The "ten nights" are understood as the last ten nights of Ramadan.',
            surahNumber: 89,
            ayahRange: { start: 1, end: 5 },
          },
          {
            type: 'insight',
            title: 'Night as Symbol',
            content:
              'Night in the Quran symbolizes: difficulty before ease (night before morning), hiddenness (what is done in private), tranquility (when the soul can reflect), and divine timing (much happens at night that day reveals).',
          },
        ],
        takeaways: [
          'Multiple surahs swear by the night — signifying its importance',
          'Surah Al-Lail uses night as a symbol of hidden deeds',
          'Surah Al-Fajr references the "ten nights" of Ramadan',
          'Night symbolizes difficulty, hiddenness, and tranquility',
        ],
        reflectionPrompts: [
          'What does the night symbolize in your spiritual journey?',
        ],
        mapHighlights: {
          year: 612,
          surahNumbers: [92, 89],
          location: { ...LOCATIONS.MAKKAH, zoom: 11 },
        },
      },
    ],
  },
];

/**
 * Get a learning path by its ID
 */
export function getLearningPathById(id: string): LearningPath | undefined {
  return learningPaths.find((p) => p.id === id);
}

/**
 * Get a lesson by its ID from any path
 */
export function getLessonById(lessonId: string): { path: LearningPath; lesson: Lesson } | undefined {
  for (const path of learningPaths) {
    const lesson = path.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return { path, lesson };
    }
  }
  return undefined;
}

/**
 * Get the next lesson in a path
 */
export function getNextLesson(pathId: string, currentLessonId: string): Lesson | undefined {
  const path = getLearningPathById(pathId);
  if (!path) return undefined;

  const currentIndex = path.lessons.findIndex((l) => l.id === currentLessonId);
  if (currentIndex === -1 || currentIndex >= path.lessons.length - 1) return undefined;

  return path.lessons[currentIndex + 1];
}

/**
 * Get the previous lesson in a path
 */
export function getPreviousLesson(pathId: string, currentLessonId: string): Lesson | undefined {
  const path = getLearningPathById(pathId);
  if (!path) return undefined;

  const currentIndex = path.lessons.findIndex((l) => l.id === currentLessonId);
  if (currentIndex <= 0) return undefined;

  return path.lessons[currentIndex - 1];
}

/**
 * Calculate path progress
 */
export function getPathProgress(
  pathId: string,
  completedLessons: Record<string, number>
): { completed: number; total: number; percentage: number } {
  const path = getLearningPathById(pathId);
  if (!path) return { completed: 0, total: 0, percentage: 0 };

  const total = path.lessons.length;
  const completed = path.lessons.filter((l) => completedLessons[l.id]).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}

/**
 * Check if a path is complete
 */
export function isPathComplete(pathId: string, completedLessons: Record<string, number>): boolean {
  const { completed, total } = getPathProgress(pathId, completedLessons);
  return total > 0 && completed === total;
}
