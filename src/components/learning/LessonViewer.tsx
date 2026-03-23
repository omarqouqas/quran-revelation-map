'use client';

/**
 * Lesson Viewer Component
 * Displays lesson content with sections, takeaways, and reflection prompts
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Quote, History, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { LessonSection } from '@/data/learning-paths';
import { useLearningStore, useCurrentLesson, useCurrentPath } from '@/stores/useLearningStore';

/** Render a single section */
function SectionContent({ section, index }: { section: LessonSection; index: number }) {
  // Narrative sections - clean card with title
  if (section.type === 'narrative') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        className="mb-6"
      >
        <div className="p-5 rounded-2xl bg-[#0D1219] border border-[#1E2736]">
          {section.title && (
            <h4
              className="text-lg font-bold text-[#F5F0E8] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {section.title}
            </h4>
          )}
          <p className="text-[#E8E3DB] text-base leading-[1.9]">
            {section.content}
          </p>
        </div>
      </motion.div>
    );
  }

  // Historical context - card with purple accent
  if (section.type === 'historical-context') {
    const color = '#8B5CF6';
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        className="mb-6"
      >
        <div
          className="p-5 rounded-2xl relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}08 0%, #0D121905 100%)`,
            border: `1px solid ${color}20`,
          }}
        >
          {/* Accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{ backgroundColor: color }}
          />

          {section.title && (
            <div className="flex items-center gap-3 mb-4 pl-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${color}20` }}
              >
                <History className="w-4 h-4" style={{ color }} />
              </div>
              <h4
                className="text-base font-bold uppercase tracking-wider"
                style={{ color }}
              >
                {section.title}
              </h4>
            </div>
          )}
          <p className="text-[#E8E3DB] text-base leading-[1.9] pl-3">
            {section.content}
          </p>
        </div>
      </motion.div>
    );
  }

  // Insight sections - highlighted card with icon
  if (section.type === 'insight') {
    const color = '#C8A84E';
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        className="mb-6"
      >
        <div
          className="p-6 rounded-2xl relative overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${color}12 0%, ${color}04 100%)`,
            border: `1px solid ${color}30`,
          }}
        >
          {/* Large decorative icon */}
          <div className="absolute -top-2 -right-2 opacity-10">
            <Lightbulb className="w-20 h-20" style={{ color }} />
          </div>

          {section.title ? (
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${color}25` }}
              >
                <Sparkles className="w-4 h-4" style={{ color }} />
              </div>
              <h4 className="text-base font-bold" style={{ color }}>
                {section.title}
              </h4>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5" style={{ color }} />
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color }}>
                Insight
              </span>
            </div>
          )}
          <p className="text-[#F5F0E8] text-base leading-[1.9] relative z-10">
            {section.content}
          </p>
        </div>
      </motion.div>
    );
  }

  // Quran reference - elegant quote card
  if (section.type === 'quran-reference') {
    const color = '#2EC4B6';
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        className="mb-6"
      >
        <div
          className="p-6 rounded-2xl relative overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${color}10 0%, ${color}03 100%)`,
            border: `1px solid ${color}25`,
          }}
        >
          {section.title && (
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${color}20` }}
              >
                <Quote className="w-4 h-4" style={{ color }} />
              </div>
              <h4 className="text-base font-bold" style={{ color }}>
                {section.title}
              </h4>
            </div>
          )}

          {/* Quote content */}
          <div className="relative">
            {/* Large decorative quote marks */}
            <div
              className="absolute -left-1 -top-3 text-6xl font-serif select-none opacity-15"
              style={{ color, fontFamily: 'Georgia, serif', lineHeight: 1 }}
            >
              &ldquo;
            </div>

            <p className="text-[#F5F0E8] text-lg leading-[2] italic pl-6 pr-4">
              {section.content}
            </p>

            <div
              className="absolute -right-1 -bottom-6 text-6xl font-serif select-none opacity-15"
              style={{ color, fontFamily: 'Georgia, serif', lineHeight: 1 }}
            >
              &rdquo;
            </div>
          </div>

          {section.surahNumber && (
            <p
              className="mt-6 text-sm font-semibold flex items-center gap-2 pl-6"
              style={{ color }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: color }} />
              Surah {section.surahNumber}
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="mb-6"
    >
      <div className="p-5 rounded-2xl bg-[#0D1219] border border-[#1E2736]">
        <p className="text-[#E8E3DB] text-base leading-[1.9]">
          {section.content}
        </p>
      </div>
    </motion.div>
  );
}

/** Takeaways section */
function TakeawaysSection({ takeaways, color }: { takeaways: string[]; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="mt-10 mb-8"
    >
      {/* Section header with lines */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#2A3342] to-transparent" />
        <div className="flex items-center gap-2.5 px-4">
          <CheckCircle2 className="w-5 h-5" style={{ color }} />
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color }}
          >
            Key Takeaways
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#2A3342] to-transparent" />
      </div>

      {/* Takeaways grid */}
      <div className="space-y-4">
        {takeaways.map((takeaway, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
            className="flex items-start gap-4 p-4 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${color}08 0%, transparent 100%)`,
              border: `1px solid ${color}15`,
            }}
          >
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
              style={{
                background: `linear-gradient(135deg, ${color}30 0%, ${color}15 100%)`,
                color: color,
              }}
            >
              {i + 1}
            </span>
            <span className="text-[#E8E3DB] text-base leading-relaxed pt-0.5">
              {takeaway}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/** Reflection prompts section */
function ReflectionSection({ prompts }: { prompts: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="mb-8"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#1A2332] flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-[#E8E3DB] opacity-70" />
        </div>
        <span className="text-sm font-bold text-[#E8E3DB] opacity-80 uppercase tracking-widest">
          Reflect
        </span>
      </div>

      {/* Prompts */}
      <div className="space-y-4">
        {prompts.map((prompt, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-[#0D1219] border border-[#1E2736]"
          >
            <p className="text-[#E8E3DB] text-base leading-relaxed italic">
              &ldquo;{prompt}&rdquo;
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
        className="px-6 py-6 border-b border-[#1E2736] shrink-0"
        style={{
          background: `linear-gradient(180deg, ${accentColor}10 0%, transparent 100%)`,
        }}
      >
        {/* Path and progress badge */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
            }}
          >
            {currentPath.title}
          </span>
          <span className="text-[#E8E3DB] opacity-40 text-sm">•</span>
          <span className="text-[#E8E3DB] opacity-50 text-sm">
            Lesson {currentLesson.order} of {currentPath.lessons.length}
          </span>
          {isCompleted && (
            <>
              <span className="text-[#E8E3DB] opacity-40 text-sm">•</span>
              <span className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Done
              </span>
            </>
          )}
        </div>

        {/* Arabic title */}
        {currentLesson.arabicTitle && (
          <p
            className="text-3xl mb-3 opacity-60"
            style={{ fontFamily: 'var(--font-arabic)', color: accentColor }}
            dir="rtl"
          >
            {currentLesson.arabicTitle}
          </p>
        )}

        {/* Lesson title */}
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mb-3"
          style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}
        >
          {currentLesson.title}
        </h2>

        {/* Objective */}
        <p className="text-base text-[#E8E3DB] opacity-60 leading-relaxed">
          {currentLesson.objective}
        </p>
      </div>

      {/* Lesson content - scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLesson.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Sections */}
              {currentLesson.sections.map((section, index) => (
                <SectionContent
                  key={index}
                  section={section}
                  index={index}
                />
              ))}

              {/* Takeaways */}
              {currentLesson.takeaways.length > 0 && (
                <TakeawaysSection takeaways={currentLesson.takeaways} color={accentColor} />
              )}

              {/* Reflection prompts */}
              {currentLesson.reflectionPrompts && currentLesson.reflectionPrompts.length > 0 && (
                <ReflectionSection prompts={currentLesson.reflectionPrompts} />
              )}

              {/* Bottom spacing */}
              <div className="h-8" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
