'use client';

/**
 * Global keyboard shortcuts for the Quran Revelation Map
 *
 * Shortcuts:
 * - ← / → : Navigate timeline by 1 year
 * - Shift + ← / → : Navigate timeline by 5 years
 * - Space : Play/pause timeline
 * - Cmd/Ctrl + K : Open search (Surah Explorer)
 * - Escape : Close panels (handled by individual components)
 * - ? : Show keyboard shortcuts help
 */

import { useEffect, useCallback } from 'react';
import { useMapStore } from '@/stores/useMapStore';
import { useExplorerStore } from '@/stores/useExplorerStore';

interface UseKeyboardShortcutsOptions {
  /** Whether shortcuts are enabled */
  enabled?: boolean;
  /** Callback when ? is pressed to show help */
  onShowHelp?: () => void;
}

export function useKeyboardShortcuts(options: UseKeyboardShortcutsOptions = {}) {
  const { enabled = true, onShowHelp } = options;

  const currentYear = useMapStore((state) => state.currentYear);
  const setCurrentYear = useMapStore((state) => state.setCurrentYear);
  const togglePlayback = useMapStore((state) => state.togglePlayback);
  const isPlaying = useMapStore((state) => state.isPlaying);
  const selectedSurahNumber = useMapStore((state) => state.selectedSurahNumber);
  const selectSurah = useMapStore((state) => state.selectSurah);
  const selectedEventId = useMapStore((state) => state.selectedEventId);
  const selectEvent = useMapStore((state) => state.selectEvent);

  const isExplorerOpen = useExplorerStore((state) => state.isExplorerOpen);
  const openExplorer = useExplorerStore((state) => state.openExplorer);
  const closeExplorer = useExplorerStore((state) => state.closeExplorer);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Skip if disabled
      if (!enabled) return;

      // Skip if user is typing in an input field
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Allow Escape to blur input
        if (e.key === 'Escape') {
          target.blur();
        }
        return;
      }

      const isMod = e.metaKey || e.ctrlKey;

      switch (e.key) {
        // Timeline navigation
        case 'ArrowLeft':
          e.preventDefault();
          const leftStep = e.shiftKey ? 5 : 1;
          setCurrentYear(Math.max(610, currentYear - leftStep));
          break;

        case 'ArrowRight':
          e.preventDefault();
          const rightStep = e.shiftKey ? 5 : 1;
          setCurrentYear(Math.min(632, currentYear + rightStep));
          break;

        // Play/pause timeline
        case ' ':
          e.preventDefault();
          togglePlayback();
          break;

        // Open search (Cmd/Ctrl + K)
        case 'k':
        case 'K':
          if (isMod) {
            e.preventDefault();
            if (isExplorerOpen) {
              closeExplorer();
            } else {
              openExplorer();
            }
          }
          break;

        // Close panels with Escape
        case 'Escape':
          e.preventDefault();
          if (isExplorerOpen) {
            closeExplorer();
          } else if (selectedSurahNumber) {
            selectSurah(null);
          } else if (selectedEventId) {
            selectEvent(null);
          }
          break;

        // Show help
        case '?':
          e.preventDefault();
          onShowHelp?.();
          break;

        // Jump to start/end of timeline
        case 'Home':
          e.preventDefault();
          setCurrentYear(610);
          break;

        case 'End':
          e.preventDefault();
          setCurrentYear(632);
          break;

        default:
          break;
      }
    },
    [
      enabled,
      currentYear,
      setCurrentYear,
      togglePlayback,
      isExplorerOpen,
      openExplorer,
      closeExplorer,
      selectedSurahNumber,
      selectSurah,
      selectedEventId,
      selectEvent,
      onShowHelp,
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    isPlaying,
    currentYear,
  };
}

/** Keyboard shortcuts for display in help modal */
export const KEYBOARD_SHORTCUTS = [
  { keys: ['←', '→'], description: 'Navigate timeline by 1 year' },
  { keys: ['Shift', '←', '→'], description: 'Navigate timeline by 5 years' },
  { keys: ['Space'], description: 'Play/pause timeline' },
  { keys: ['⌘', 'K'], description: 'Open search' },
  { keys: ['Esc'], description: 'Close panel' },
  { keys: ['Home'], description: 'Jump to 610 CE' },
  { keys: ['End'], description: 'Jump to 632 CE' },
  { keys: ['?'], description: 'Show shortcuts' },
];
