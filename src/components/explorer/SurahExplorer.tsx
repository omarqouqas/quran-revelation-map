'use client';

/**
 * Left-side slide-in panel for exploring and filtering surahs
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { ExplorerHeader } from './ExplorerHeader';
import { ExplorerFilters } from './ExplorerFilters';
import { SurahResultsList } from './SurahResultsList';
import { cn } from '@/lib/utils';

export function SurahExplorer() {
  const isExplorerOpen = useExplorerStore((state) => state.isExplorerOpen);
  const closeExplorer = useExplorerStore((state) => state.closeExplorer);

  // Close on Escape key (stop propagation so detail panel doesn't also close)
  useEffect(() => {
    if (!isExplorerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeExplorer();
      }
    };

    // Use capture phase to handle before detail panel
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isExplorerOpen, closeExplorer]);

  return (
    <AnimatePresence>
      {isExplorerOpen && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40 sm:hidden"
            onClick={closeExplorer}
          />

          {/* Panel - slides from LEFT */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              height: '100%',
              width: '420px',
              maxWidth: '100%',
              backgroundColor: '#0A0F1A',
              borderRight: '1px solid #2A3342',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 50,
              boxShadow: '4px 0 30px rgba(0,0,0,0.5)',
            }}
          >
            <ExplorerHeader />
            <ExplorerFilters />
            <SurahResultsList />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
