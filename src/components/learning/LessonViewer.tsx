'use client';

/**
 * Lesson Viewer Component
 * Displays lesson content with sections, takeaways, and reflection prompts
 */

import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lightbulb, Quote, History, CheckCircle2, MessageCircle } from 'lucide-react';
import { Lesson, LessonSection, LessonSectionType } from '@/data/learning-paths';
import { useLearningStore, useCurrentLesson, useCurrentPath } from '@/stores/useLearningStore';

/** Icon for each section type */
const sectionIcons: Record<LessonSectionType, React.ElementType> = {
  narrative: BookOpen,
  insight: Lightbulb,
  'quran-reference': Quote,
  'historical-context': History,
};

/** Colors for each section type */
const sectionColors: Record<LessonSectionType, string> = {
  narrative: '#F5F0E8',
  insight: '#C8A84E',
  'quran-reference': '#2EC4B6',
  'historical-context': '#8B5CF6',
};

/** Render a single section */
function SectionContent({ section, index }: { section: LessonSection; index: number }) {
  const Icon = sectionIcons[section.type];
  const color = sectionColors[section.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-6"
    >
      {/* Section header */}
      {section.title && (
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
          <h4
            className="text-base font-semibold"
            style={{ color, fontFamily: 'var(--font-heading)' }}
          >
            {section.title}
          </h4>
        </div>
      )}

      {/* Section content */}
      <div
        className={`text-[#E8E3DB] leading-relaxed ${section.title ? 'pl-10' : ''}`}
        style={{ fontSize: '0.95rem' }}
      >
        {section.type === 'quran-reference' ? (
          <div
            className="p-4 rounded-xl border-l-4"
            style={{
              backgroundColor: `${color}10`,
              borderColor: color,
            }}
          >
            <p className="mb-2">{section.content}</p>
            {section.surahNumber && (
              <p className="text-sm opacity-70">
                — Surah {section.surahNumber}
                {section.ayahRange && `, verses ${section.ayahRange.start}-${section.ayahRange.end}`}
              </p>
            )}
          </div>
        ) : section.type === 'insight' ? (
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: `${color}10` }}
          >
            <p>{section.content}</p>
          </div>
        ) : (
          <p>{section.content}</p>
        )}
      </div>
    </motion.div>
  );
}

/** Takeaways section */
function TakeawaysSection({ takeaways, color }: { takeaways: string[]; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-5 rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        border: `1px solid ${color}30`,
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-5 h-5" style={{ color }} />
        <h4
          className="text-base font-semibold"
          style={{ color, fontFamily: 'var(--font-heading)' }}
        >
          Key Takeaways
        </h4>
      </div>
      <ul className="space-y-2">
        {takeaways.map((takeaway, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 text-[#E8E3DB]"
          >
            <span
              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
              style={{ backgroundColor: color }}
            />
            <span style={{ fontSize: '0.95rem' }}>{takeaway}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/** Reflection prompts section */
function ReflectionSection({ prompts, color }: { prompts: string[]; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-5 rounded-2xl bg-[#1A2332] border border-[#2A3342]"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5 text-[#E8E3DB] opacity-70" />
        <h4
          className="text-base font-semibold text-[#E8E3DB] opacity-90"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Reflection
        </h4>
      </div>
      <ul className="space-y-3">
        {prompts.map((prompt, i) => (
          <li
            key={i}
            className="text-[#E8E3DB] opacity-80 italic"
            style={{ fontSize: '0.95rem' }}
          >
            "{prompt}"
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function LessonViewer() {
  const currentPath = useCurrentPath();
  const currentLesson = useCurrentLesson();
  const currentSectionIndex = useLearningStore((s) => s.currentSectionIndex);
  const isLessonCompleted = useLearningStore((s) => s.isLessonCompleted);

  if (!currentPath || !currentLesson) {
    return null;
  }

  const accentColor = currentPath.accentColor;
  const isCompleted = isLessonCompleted(currentLesson.id);

  return (
    <div className="h-full flex flex-col">
      {/* Lesson header */}
      <div
        className="px-6 py-5 border-b border-[#2A3342] shrink-0"
        style={{
          background: `linear-gradient(135deg, ${accentColor}10 0%, transparent 100%)`,
        }}
      >
        {/* Path and progress */}
        <div className="flex items-center gap-2 text-xs mb-2">
          <span style={{ color: accentColor }}>{currentPath.title}</span>
          <span className="text-[#E8E3DB] opacity-40">•</span>
          <span className="text-[#E8E3DB] opacity-60">
            Lesson {currentLesson.order} of {currentPath.lessons.length}
          </span>
          {isCompleted && (
            <>
              <span className="text-[#E8E3DB] opacity-40">•</span>
              <span className="flex items-center gap-1 text-green-500">
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </span>
            </>
          )}
        </div>

        {/* Lesson title */}
        <div className="flex items-start justify-between gap-4">
          <div>
            {currentLesson.arabicTitle && (
              <p
                className="text-lg opacity-40 mb-1"
                style={{ fontFamily: 'var(--font-arabic)', color: accentColor }}
                dir="rtl"
              >
                {currentLesson.arabicTitle}
              </p>
            )}
            <h2
              className="text-xl font-bold text-[#F5F0E8]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {currentLesson.title}
            </h2>
            <p className="text-sm text-[#E8E3DB] opacity-70 mt-1">
              {currentLesson.objective}
            </p>
          </div>
        </div>
      </div>

      {/* Lesson content - scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLesson.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Sections */}
            {currentLesson.sections.map((section, index) => (
              <SectionContent key={index} section={section} index={index} />
            ))}

            {/* Takeaways */}
            {currentLesson.takeaways.length > 0 && (
              <TakeawaysSection takeaways={currentLesson.takeaways} color={accentColor} />
            )}

            {/* Reflection prompts */}
            {currentLesson.reflectionPrompts && currentLesson.reflectionPrompts.length > 0 && (
              <ReflectionSection prompts={currentLesson.reflectionPrompts} color={accentColor} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
