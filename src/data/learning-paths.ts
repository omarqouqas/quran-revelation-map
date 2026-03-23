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

  // Path 2: Persecution & Patience (placeholder structure)
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
    lessons: [], // To be filled
  },

  // Path 3: The Turning Point (placeholder structure)
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
    lessons: [], // To be filled
  },

  // Path 4: The Hijra (placeholder structure)
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
    lessons: [], // To be filled
  },

  // Path 5: Building the Ummah (placeholder structure)
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
    lessons: [], // To be filled
  },

  // Path 6: Trials & Triumph (placeholder structure)
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
    lessons: [], // To be filled
  },

  // Path 7: Victory & Completion (placeholder structure)
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
    lessons: [], // To be filled
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
