'use client';

/**
 * Lesson Viewer Component
 * Displays lesson content with sections, takeaways, and reflection prompts
 */

import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lightbulb, Quote, History, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
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
  narrative: '#E8E3DB',
  insight: '#C8A84E',
  'quran-reference': '#2EC4B6',
  'historical-context': '#8B5CF6',
};

/** Render a single section */
function SectionContent({ section, index }: { section: LessonSection; index: number }) {
  const Icon = sectionIcons[section.type];
  const color = sectionColors[section.type];

  // Narrative sections - clean text with optional title
  if (section.type === 'narrative') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        className="mb-8"
      >
        {section.title && (
          <h4
            className="text-base font-semibold text-[#F5F0E8] mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {section.title}
          </h4>
        )}
        <p className="text-[#E8E3DB] text-[0.95rem] leading-[1.8] opacity-90">
          {section.content}
        </p>
      </motion.div>
    );
  }

  // Historical context - subtle left border
  if (section.type === 'historical-context') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        className="mb-8 pl-4 border-l-2"
        style={{ borderColor: `${color}50` }}
      >
        {section.title && (
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4" style={{ color }} />
            <h4
              className="text-sm font-semibold uppercase tracking-wide"
              style={{ color }}
            >
              {section.title}
            </h4>
          </div>
        )}
        <p className="text-[#E8E3DB] text-[0.95rem] leading-[1.8] opacity-90">
          {section.content}
        </p>
      </motion.div>
    );
  }

  // Insight sections - highlighted box
  if (section.type === 'insight') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        className="mb-8"
      >
        <div
          className="p-5 rounded-xl relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}12 0%, ${color}06 100%)`,
            border: `1px solid ${color}25`,
          }}
        >
          {/* Subtle decorative element */}
          <div
            className="absolute top-3 right-3 opacity-20"
          >
            <Lightbulb className="w-8 h-8" style={{ color }} />
          </div>

          {section.title && (
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" style={{ color }} />
              <h4
                className="text-sm font-semibold"
                style={{ color }}
              >
                {section.title}
              </h4>
            </div>
          )}
          <p className="text-[#E8E3DB] text-[0.95rem] leading-[1.8] pr-8">
            {section.content}
          </p>
        </div>
      </motion.div>
    );
  }

  // Quran reference - elegant quote styling
  if (section.type === 'quran-reference') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        className="mb-8"
      >
        {section.title && (
          <div className="flex items-center gap-2 mb-4">
            <Quote className="w-4 h-4" style={{ color }} />
            <h4
              className="text-sm font-semibold"
              style={{ color }}
            >
              {section.title}
            </h4>
          </div>
        )}
        <div
          className="relative pl-5 py-1"
          style={{
            borderLeft: `3px solid ${color}`,
          }}
        >
          {/* Large decorative quote mark */}
          <div
            className="absolute -left-1 -top-2 text-5xl font-serif opacity-20 select-none"
            style={{ color, fontFamily: 'Georgia, serif' }}
          >
            "
          </div>

          <p
            className="text-[#F5F0E8] text-[1rem] leading-[1.9] italic relative z-10"
          >
            {section.content}
          </p>

          {section.surahNumber && (
            <p
              className="mt-3 text-sm font-medium"
              style={{ color }}
            >
              — Surah {section.surahNumber}
              {section.ayahRange && `, verses ${section.ayahRange.start}-${section.ayahRange.end}`}
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  // Fallback
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="mb-8"
    >
      <p className="text-[#E8E3DB] text-[0.95rem] leading-[1.8]">
        {section.content}
      </p>
    </motion.div>
  );
}

/** Takeaways section */
function TakeawaysSection({ takeaways, color }: { takeaways: string[]; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 mb-6"
    >
      {/* Section divider */}
      <div className="flex items-center gap-4 mb-5">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#2A3342] to-transparent" />
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" style={{ color }} />
          <span
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color }}
          >
            Key Takeaways
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#2A3342] to-transparent" />
      </div>

      <div
        className="p-5 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${color}08 0%, transparent 100%)`,
          border: `1px solid ${color}20`,
        }}
      >
        <ul className="space-y-3">
          {takeaways.map((takeaway, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-start gap-3"
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                style={{
                  backgroundColor: `${color}20`,
                  color: color,
                }}
              >
                {i + 1}
              </span>
              <span className="text-[#E8E3DB] text-[0.95rem] leading-relaxed">
                {takeaway}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/** Reflection prompts section */
function ReflectionSection({ prompts, color }: { prompts: string[]; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-4 h-4 text-[#E8E3DB] opacity-60" />
        <span className="text-sm font-semibold text-[#E8E3DB] opacity-80 uppercase tracking-wide">
          Reflect
        </span>
      </div>

      <div className="space-y-3">
        {prompts.map((prompt, i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-[#1A2332]/50 border border-[#2A3342]/50"
          >
            <p className="text-[#E8E3DB] opacity-80 text-[0.95rem] leading-relaxed italic">
              "{prompt}"
            </p>
          </div>
        ))}
      </div>
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
        className="px-6 py-6 border-b border-[#2A3342]/50 shrink-0"
        style={{
          background: `linear-gradient(180deg, ${accentColor}08 0%, transparent 100%)`,
        }}
      >
        {/* Path and progress */}
        <div className="flex items-center gap-2 text-xs mb-4">
          <span className="font-medium" style={{ color: accentColor }}>{currentPath.title}</span>
          <span className="text-[#E8E3DB] opacity-30">•</span>
          <span className="text-[#E8E3DB] opacity-50">
            Lesson {currentLesson.order} of {currentPath.lessons.length}
          </span>
          {isCompleted && (
            <>
              <span className="text-[#E8E3DB] opacity-30">•</span>
              <span className="flex items-center gap-1 text-green-500 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </span>
            </>
          )}
        </div>

        {/* Arabic title - larger and more prominent */}
        {currentLesson.arabicTitle && (
          <p
            className="text-2xl mb-2 opacity-50"
            style={{ fontFamily: 'var(--font-arabic)', color: accentColor }}
            dir="rtl"
          >
            {currentLesson.arabicTitle}
          </p>
        )}

        {/* Lesson title */}
        <h2
          className="text-2xl font-bold text-[#F5F0E8] mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {currentLesson.title}
        </h2>

        {/* Objective */}
        <p className="text-sm text-[#E8E3DB] opacity-60 leading-relaxed">
          {currentLesson.objective}
        </p>
      </div>

      {/* Lesson content - scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-8">
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

              {/* Bottom spacing for scroll */}
              <div className="h-4" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
