'use client';

/**
 * Hook to sync surah selection with URL
 * - Updates URL when surah is selected/deselected
 * - Reads initial surah from URL on mount
 */

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useMapStore } from '@/stores/useMapStore';
import { getCompleteSurahData } from '@/data/surah-locations';

interface UseSurahRoutingOptions {
  /** Initial surah number from URL (for /surah/[number] routes) */
  initialSurahNumber?: number;
}

export function useSurahRouting(options: UseSurahRoutingOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const selectedSurahNumber = useMapStore((state) => state.selectedSurahNumber);
  const selectSurah = useMapStore((state) => state.selectSurah);
  const setCurrentYear = useMapStore((state) => state.setCurrentYear);
  const setHasInteracted = useMapStore((state) => state.setHasInteracted);

  // Track if we've handled the initial surah
  const hasInitialized = useRef(false);

  // Handle initial surah from URL on mount
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const { initialSurahNumber } = options;

    if (initialSurahNumber && initialSurahNumber >= 1 && initialSurahNumber <= 114) {
      const surahData = getCompleteSurahData(initialSurahNumber);
      if (surahData) {
        // Select the surah and jump to its year
        selectSurah(initialSurahNumber);
        setCurrentYear(surahData.approximateYear);
        // Dismiss landing overlay since user came with intent
        setHasInteracted(true);
      }
    }
  }, [options, selectSurah, setCurrentYear, setHasInteracted]);

  // Update URL when surah selection changes
  useEffect(() => {
    // Skip during initial mount
    if (!hasInitialized.current) return;

    const currentPath = pathname;

    if (selectedSurahNumber) {
      // Surah selected - update URL to /surah/[number]
      const newPath = `/surah/${selectedSurahNumber}`;
      if (currentPath !== newPath) {
        router.replace(newPath, { scroll: false });
      }
    } else {
      // No surah selected - go to root
      if (currentPath !== '/') {
        router.replace('/', { scroll: false });
      }
    }
  }, [selectedSurahNumber, pathname, router]);
}
