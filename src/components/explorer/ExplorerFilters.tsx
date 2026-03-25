'use client';

/**
 * Filter controls for the Surah Explorer
 */

import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, MapPin, X } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { getAllUniqueThemes, getLocationOptions } from '@/lib/surah-filters';

export function ExplorerFilters() {
  const [themesExpanded, setThemesExpanded] = useState(false);
  const [locationsExpanded, setLocationsExpanded] = useState(false);
  const [showAllThemes, setShowAllThemes] = useState(false);

  const periodFilter = useExplorerStore((state) => state.periodFilter);
  const setPeriodFilter = useExplorerStore((state) => state.setPeriodFilter);
  const yearRange = useExplorerStore((state) => state.yearRange);
  const setYearRange = useExplorerStore((state) => state.setYearRange);
  const selectedThemes = useExplorerStore((state) => state.selectedThemes);
  const toggleTheme = useExplorerStore((state) => state.toggleTheme);
  const clearThemes = useExplorerStore((state) => state.clearThemes);
  const selectedLocations = useExplorerStore((state) => state.selectedLocations);
  const toggleLocation = useExplorerStore((state) => state.toggleLocation);
  const clearLocations = useExplorerStore((state) => state.clearLocations);
  const resetFilters = useExplorerStore((state) => state.resetFilters);

  const allThemes = useMemo(() => getAllUniqueThemes(), []);
  const locationOptions = useMemo(() => getLocationOptions(), []);

  // Show only first 12 themes unless expanded
  const visibleThemes = showAllThemes ? allThemes : allThemes.slice(0, 12);

  // Compute active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedThemes.length > 0) count++;
    if (periodFilter !== 'all') count++;
    if (yearRange[0] !== 610 || yearRange[1] !== 632) count++;
    if (selectedLocations.length > 0) count++;
    return count;
  }, [selectedThemes, periodFilter, yearRange, selectedLocations]);

  return (
    <div style={{ borderBottom: '1px solid #2A3342' }}>
      {/* Active filters summary - inline */}
      {activeFilterCount > 0 && (
        <div style={{ padding: '8px 16px', backgroundColor: 'rgba(26, 35, 50, 0.5)', borderBottom: '1px solid #2A3342', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', color: 'rgba(232, 227, 219, 0.6)' }}>
            {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
          </span>
          <button
            onClick={resetFilters}
            style={{ fontSize: '11px', color: '#C8A84E', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Clear all
          </button>
        </div>
      )}

      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Period Toggle */}
        <div>
          <label style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Period
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['all', 'makki', 'madani'] as const).map((period) => {
              const isActive = periodFilter === period;
              const colors = {
                all: { bg: '#374151', text: '#fff', border: '#4B5563' },
                makki: { bg: '#C8A84E', text: '#0A0F1A', border: '#C8A84E' },
                madani: { bg: '#2EC4B6', text: '#0A0F1A', border: '#2EC4B6' },
              };
              const dotColors = { all: '#9CA3AF', makki: '#C8A84E', madani: '#2EC4B6' };

              return (
                <button
                  key={period}
                  onClick={() => setPeriodFilter(period)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: '2px solid',
                    borderColor: isActive ? colors[period].border : '#1F2937',
                    backgroundColor: isActive ? colors[period].bg : '#111827',
                    color: isActive ? colors[period].text : '#9CA3AF',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {period !== 'all' && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? 'currentColor' : dotColors[period],
                      }}
                    />
                  )}
                  {period === 'all' ? 'All' : period === 'makki' ? 'Makki' : 'Madani'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Year Range Slider - Compact */}
        <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#111827', border: '1px solid #1F2937' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Year Range
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#1F2937', fontSize: '13px', fontWeight: 700, color: '#C8A84E' }}>
                {yearRange[0]}
              </span>
              <span style={{ color: '#4B5563', fontSize: '12px' }}>–</span>
              <span style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#1F2937', fontSize: '13px', fontWeight: 700, color: '#2EC4B6' }}>
                {yearRange[1]}
              </span>
              <span style={{ fontSize: '11px', color: '#6B7280' }}>CE</span>
            </div>
          </div>
          <div style={{ padding: '0 4px' }}>
            <Slider.Root
              className="relative flex items-center w-full h-6 select-none touch-none"
              value={yearRange}
              min={610}
              max={632}
              step={1}
              minStepsBetweenThumbs={1}
              onValueChange={(value) => setYearRange(value as [number, number])}
            >
              <Slider.Track className="bg-[#1F2937] relative grow rounded-full h-2">
                <Slider.Range
                  className="absolute h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #C8A84E, #2EC4B6)' }}
                />
              </Slider.Track>
              <Slider.Thumb
                style={{ display: 'block', width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', border: '3px solid #C8A84E', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', cursor: 'grab' }}
                aria-label="Start year"
              />
              <Slider.Thumb
                style={{ display: 'block', width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', border: '3px solid #2EC4B6', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', cursor: 'grab' }}
                aria-label="End year"
              />
            </Slider.Root>
          </div>
        </div>

        {/* Themes Section - Collapsible */}
        <div style={{ border: '1px solid #2A3342', borderRadius: '10px', overflow: 'hidden' }}>
          <button
            onClick={() => setThemesExpanded(!themesExpanded)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '10px 12px',
              backgroundColor: 'rgba(26, 35, 50, 0.5)',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {themesExpanded ? (
                <ChevronDown style={{ width: '14px', height: '14px', color: 'rgba(232, 227, 219, 0.6)' }} />
              ) : (
                <ChevronRight style={{ width: '14px', height: '14px', color: 'rgba(232, 227, 219, 0.6)' }} />
              )}
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#E8E3DB' }}>Themes</span>
              {selectedThemes.length > 0 && (
                <span style={{ padding: '2px 6px', borderRadius: '999px', backgroundColor: 'rgba(200, 168, 78, 0.2)', color: '#C8A84E', fontSize: '11px', fontWeight: 500 }}>
                  {selectedThemes.length}
                </span>
              )}
            </div>
          </button>

          {themesExpanded && (
            <div style={{ padding: '16px', borderTop: '1px solid #2A3342' }}>
              {selectedThemes.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {selectedThemes.slice(0, 3).map((theme) => (
                      <span
                        key={theme}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '6px', backgroundColor: 'rgba(200, 168, 78, 0.2)', color: '#C8A84E', fontSize: '12px' }}
                      >
                        {theme}
                        <X
                          style={{ width: '12px', height: '12px', cursor: 'pointer' }}
                          onClick={() => toggleTheme(theme)}
                        />
                      </span>
                    ))}
                    {selectedThemes.length > 3 && (
                      <span style={{ fontSize: '12px', color: 'rgba(232, 227, 219, 0.5)' }}>
                        +{selectedThemes.length - 3} more
                      </span>
                    )}
                  </div>
                  <button
                    onClick={clearThemes}
                    style={{ fontSize: '12px', color: 'rgba(232, 227, 219, 0.5)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Clear
                  </button>
                </div>
              )}

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                maxHeight: showAllThemes ? '300px' : 'none',
                overflowY: showAllThemes ? 'auto' : 'visible',
                paddingRight: showAllThemes ? '8px' : '0',
              }}>
                {visibleThemes.map((theme) => (
                  <button
                    key={theme}
                    onClick={() => toggleTheme(theme)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 500,
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: selectedThemes.includes(theme) ? '#C8A84E' : '#2A3342',
                      color: selectedThemes.includes(theme) ? '#0A0F1A' : 'rgba(232, 227, 219, 0.7)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {theme}
                  </button>
                ))}
              </div>

              {allThemes.length > 12 && (
                <button
                  onClick={() => setShowAllThemes(!showAllThemes)}
                  style={{ marginTop: '12px', fontSize: '12px', color: '#C8A84E', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showAllThemes ? 'Show less' : `Show all ${allThemes.length} themes`}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Locations Section - Collapsible */}
        <div style={{ border: '1px solid #2A3342', borderRadius: '10px', overflow: 'hidden' }}>
          <button
            onClick={() => setLocationsExpanded(!locationsExpanded)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '10px 12px',
              backgroundColor: 'rgba(26, 35, 50, 0.5)',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {locationsExpanded ? (
                <ChevronDown style={{ width: '14px', height: '14px', color: 'rgba(232, 227, 219, 0.6)' }} />
              ) : (
                <ChevronRight style={{ width: '14px', height: '14px', color: 'rgba(232, 227, 219, 0.6)' }} />
              )}
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#E8E3DB' }}>Locations</span>
              {selectedLocations.length > 0 && (
                <span style={{ padding: '2px 6px', borderRadius: '999px', backgroundColor: 'rgba(200, 168, 78, 0.2)', color: '#C8A84E', fontSize: '11px', fontWeight: 500 }}>
                  {selectedLocations.length}
                </span>
              )}
            </div>
          </button>

          {locationsExpanded && (
            <div style={{ padding: '16px', borderTop: '1px solid #2A3342' }}>
              {selectedLocations.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <button
                    onClick={clearLocations}
                    style={{ fontSize: '12px', color: 'rgba(232, 227, 219, 0.5)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Clear selection
                  </button>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {locationOptions.map(({ key, name }) => (
                  <button
                    key={key}
                    onClick={() => toggleLocation(key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: selectedLocations.includes(key) ? '#C8A84E' : '#2A3342',
                      color: selectedLocations.includes(key) ? '#0A0F1A' : 'rgba(232, 227, 219, 0.7)',
                      fontWeight: selectedLocations.includes(key) ? 500 : 400,
                      transition: 'all 0.2s',
                    }}
                  >
                    <MapPin style={{ width: '16px', height: '16px' }} />
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
