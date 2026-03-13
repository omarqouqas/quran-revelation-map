'use client';

/**
 * Explorer panel header with search input
 */

import { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useExplorerStore } from '@/stores/useExplorerStore';

export function ExplorerHeader() {
  const searchQuery = useExplorerStore((state) => state.searchQuery);
  const setSearchQuery = useExplorerStore((state) => state.setSearchQuery);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Attach click listener directly to DOM element to bypass React event system
  useEffect(() => {
    const button = closeButtonRef.current;
    if (!button) return;

    const handleClick = () => {
      useExplorerStore.setState({ isExplorerOpen: false });
    };

    button.addEventListener('click', handleClick);
    return () => button.removeEventListener('click', handleClick);
  }, []);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#0A0F1A' }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 12px 16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#F5F0E8', margin: 0, fontFamily: 'var(--font-heading)' }}>
          Explore Surahs
        </h2>
        <button
          ref={closeButtonRef}
          type="button"
          style={{
            padding: '8px',
            borderRadius: '10px',
            backgroundColor: '#1F2937',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Close explorer"
        >
          <X style={{ width: '18px', height: '18px', color: '#9CA3AF', pointerEvents: 'none' }} />
        </button>
      </div>

      {/* Search input */}
      <div style={{ padding: '0 16px 12px 16px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <Search style={{ width: '16px', height: '16px', color: '#C8A84E' }} />
          </div>
          <input
            type="text"
            placeholder="Search by name, number, or meaning..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '42px',
              paddingRight: '40px',
              paddingTop: '10px',
              paddingBottom: '10px',
              borderRadius: '10px',
              backgroundColor: '#1A2332',
              border: '1px solid #2A3342',
              color: '#F5F0E8',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '4px',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <X style={{ width: '14px', height: '14px', color: '#6B7280' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
