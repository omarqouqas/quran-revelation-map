'use client';

/**
 * Modal showing available keyboard shortcuts
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';
import { KEYBOARD_SHORTCUTS } from '@/hooks/useKeyboardShortcuts';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md"
          >
            <div className="bg-[#0A0F1A] border border-[#2A3342] rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A3342]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#C8A84E]/10">
                    <Keyboard className="w-5 h-5 text-[#C8A84E]" />
                  </div>
                  <h2
                    className="text-lg font-semibold text-[#F5F0E8]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Keyboard Shortcuts
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[#1A2332] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-[#E8E3DB]" />
                </button>
              </div>

              {/* Shortcuts list */}
              <div className="px-6 py-5 space-y-4">
                {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-[#E8E3DB] opacity-80">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span key={keyIndex}>
                          <kbd className="px-2 py-1 text-xs font-medium text-[#F5F0E8] bg-[#1A2332] border border-[#2A3342] rounded-md shadow-sm">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 &&
                            shortcut.keys.length > 2 &&
                            key !== 'Shift' &&
                            key !== '⌘' && (
                              <span className="text-[#E8E3DB] opacity-40 mx-0.5">/</span>
                            )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer hint */}
              <div className="px-6 py-3 bg-[#1A2332]/50 border-t border-[#2A3342]">
                <p className="text-xs text-[#E8E3DB] opacity-50 text-center">
                  Press <kbd className="px-1.5 py-0.5 text-xs bg-[#1A2332] border border-[#2A3342] rounded">?</kbd> anytime to show this help
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
