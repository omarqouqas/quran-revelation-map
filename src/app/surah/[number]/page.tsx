'use client';

/**
 * Dynamic route for direct surah links
 * Example: /surah/96 opens Al-Alaq directly
 */

import { use } from 'react';
import { notFound } from 'next/navigation';
import { QuranMapApp } from '@/components/QuranMapApp';

interface SurahPageProps {
  params: Promise<{ number: string }>;
}

export default function SurahPage({ params }: SurahPageProps) {
  const { number } = use(params);
  const surahNumber = parseInt(number, 10);

  // Validate surah number (1-114)
  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  return <QuranMapApp initialSurahNumber={surahNumber} />;
}
