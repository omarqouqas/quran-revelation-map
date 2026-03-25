'use client';

/**
 * Global Search Modal
 * Searches across surahs, events, and sacred sites
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Sparkles, MapPin } from 'lucide-react';
import { globalSearch, getAllResultsFlat, type SearchResults, type SearchResult } from '@/lib/search';
import { useMapStore } from '@/stores/useMapStore';
import type { CompleteSurahData } from '@/data/surah-locations';
import type { HistoricalEvent } from '@/data/events';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Store actions for navigation
  const selectSurah = useMapStore((state) => state.selectSurah);
  const selectEvent = useMapStore((state) => state.selectEvent);
  const selectSite = useMapStore((state) => state.selectSite);
  const setCurrentYear = useMapStore((state) => state.setCurrentYear);
  const setHasInteracted = useMapStore((state) => state.setHasInteracted);

  // Flat list for keyboard navigation
  const flatResults = useMemo(() => {
    return results ? getAllResultsFlat(results) : [];
  }, [results]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const searchResults = globalSearch(query);
      setResults(searchResults);
      setSelectedIndex(0);
    }, 150);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults(null);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Navigate to result
  const navigateToResult = useCallback(
    (result: SearchResult) => {
      setHasInteracted(true);

      switch (result.type) {
        case 'surah': {
          const surah = result.data as CompleteSurahData;
          selectSurah(surah.number);
          setCurrentYear(surah.approximateYear);
          break;
        }
        case 'event': {
          const event = result.data as HistoricalEvent;
          setCurrentYear(event.year);
          selectEvent(event.id);
          break;
        }
        case 'site': {
          selectSite(result.id as string);
          break;
        }
      }

      onClose();
    },
    [selectSurah, selectEvent, selectSite, setCurrentYear, setHasInteracted, onClose]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (flatResults[selectedIndex]) {
            navigateToResult(flatResults[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [flatResults, selectedIndex, navigateToResult, onClose]
  );

  // Type icons
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'surah':
        return <BookOpen className="w-4 h-4" />;
      case 'event':
        return <Sparkles className="w-4 h-4" />;
      case 'site':
        return <MapPin className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Track cumulative index for keyboard navigation
  let cumulativeIndex = 0;

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
            className="fixed left-1/2 top-[15%] -translate-x-1/2 z-[101] w-[95%] max-w-[600px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(26, 35, 50, 0.98) 0%, rgba(10, 15, 26, 0.98) 100%)',
              border: '1px solid rgba(200, 168, 78, 0.2)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#2A3342]">
              <Search className="w-5 h-5 text-[#C8A84E] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search surahs, events, sites..."
                className="flex-1 bg-transparent text-lg text-[#F5F0E8] placeholder:text-[#6B7280] focus:outline-none"
                style={{ fontFamily: 'var(--font-body)' }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded hover:bg-[#2A3342] transition-colors"
                >
                  <X className="w-4 h-4 text-[#6B7280]" />
                </button>
              )}
              <div className="text-xs text-[#6B7280] px-2 py-1 rounded bg-[#1A2332] border border-[#2A3342]">
                Esc
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-4">
              {!query && (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-[#2A3342] mx-auto mb-3" />
                  <p className="text-[#6B7280] text-sm">
                    Search for surahs, historical events, or sacred sites
                  </p>
                  <p className="text-[#4B5563] text-xs mt-2">
                    Try &quot;Badr&quot;, &quot;patience&quot;, or &quot;Cave Hira&quot;
                  </p>
                </div>
              )}

              {query && results && results.total === 0 && (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-[#2A3342] mx-auto mb-3" />
                  <p className="text-[#6B7280] text-sm">No results found for &quot;{query}&quot;</p>
                  <p className="text-[#4B5563] text-xs mt-2">Try a different search term</p>
                </div>
              )}

              {results && results.total > 0 && (
                <div className="space-y-4">
                  {/* Surahs */}
                  {results.surahs.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5" />
                        Surahs
                      </h3>
                      <div className="space-y-1">
                        {results.surahs.map((result) => {
                          const index = cumulativeIndex++;
                          return (
                            <ResultItem
                              key={`surah-${result.id}`}
                              result={result}
                              isSelected={selectedIndex === index}
                              onClick={() => navigateToResult(result)}
                              icon={getTypeIcon(result.type)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Events */}
                  {results.events.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        Events
                      </h3>
                      <div className="space-y-1">
                        {results.events.map((result) => {
                          const index = cumulativeIndex++;
                          return (
                            <ResultItem
                              key={`event-${result.id}`}
                              result={result}
                              isSelected={selectedIndex === index}
                              onClick={() => navigateToResult(result)}
                              icon={getTypeIcon(result.type)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Sites */}
                  {results.sites.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        Sacred Sites
                      </h3>
                      <div className="space-y-1">
                        {results.sites.map((result) => {
                          const index = cumulativeIndex++;
                          return (
                            <ResultItem
                              key={`site-${result.id}`}
                              result={result}
                              isSelected={selectedIndex === index}
                              onClick={() => navigateToResult(result)}
                              icon={getTypeIcon(result.type)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {results && results.total > 0 && (
              <div className="px-4 py-3 border-t border-[#2A3342] text-xs text-[#6B7280] flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#1A2332] border border-[#2A3342]">
                    <span className="text-[10px]">&#x2191;&#x2193;</span>
                  </kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#1A2332] border border-[#2A3342] text-[10px]">
                    Enter
                  </kbd>
                  Open
                </span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** Individual result item */
interface ResultItemProps {
  result: SearchResult;
  isSelected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

function ResultItem({ result, isSelected, onClick, icon }: ResultItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all"
      style={{
        backgroundColor: isSelected ? `${result.metaColor}15` : 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: isSelected ? `${result.metaColor}40` : 'transparent',
      }}
    >
      {/* Type indicator */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${result.metaColor}20`, color: result.metaColor }}
      >
        {result.type === 'surah' ? (
          <span className="text-sm font-bold">{result.id}</span>
        ) : (
          icon
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[#F5F0E8] font-medium truncate">{result.title}</span>
          {result.titleArabic && (
            <span
              className="text-sm opacity-60 shrink-0"
              style={{ fontFamily: 'var(--font-arabic)', color: result.metaColor }}
            >
              {result.titleArabic}
            </span>
          )}
        </div>
        <p className="text-xs text-[#9CA3AF] truncate">{result.subtitle}</p>
      </div>

      {/* Meta */}
      {result.meta && (
        <span
          className="text-xs px-2 py-1 rounded-full shrink-0"
          style={{ backgroundColor: `${result.metaColor}20`, color: result.metaColor }}
        >
          {result.meta}
        </span>
      )}
    </button>
  );
}
