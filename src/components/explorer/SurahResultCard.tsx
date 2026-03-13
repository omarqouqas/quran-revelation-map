'use client';

/**
 * Individual surah card in the explorer results list
 */

import { ChevronRight } from 'lucide-react';
import type { CompleteSurahData } from '@/data/surah-locations';

interface SurahResultCardProps {
  surah: CompleteSurahData;
  isSelected: boolean;
  onClick: () => void;
}

export function SurahResultCard({ surah, isSelected, onClick }: SurahResultCardProps) {
  const isMakki = surah.isMeccan;
  const accentColor = isMakki ? '#C8A84E' : '#2EC4B6';

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '12px',
        borderRadius: '12px',
        border: `1px solid ${isSelected ? accentColor : '#1F2937'}`,
        backgroundColor: isSelected ? '#1A2332' : '#111827',
        boxShadow: isSelected ? `0 2px 12px ${accentColor}25` : 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'block',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Surah number badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 700,
            flexShrink: 0,
            background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}15)`,
            color: accentColor,
            fontFamily: 'var(--font-heading)',
            border: `1px solid ${accentColor}40`,
          }}
        >
          {surah.number}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Names row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span
              style={{
                fontSize: '14px',
                color: '#F5F0E8',
                fontWeight: 600,
                fontFamily: 'var(--font-heading)',
              }}
            >
              {surah.englishName}
            </span>
            <span
              style={{
                fontSize: '16px',
                color: 'rgba(245, 240, 232, 0.5)',
                fontFamily: 'var(--font-arabic)',
                flexShrink: 0,
              }}
            >
              {surah.arabicName}
            </span>
          </div>

          {/* Meta tags - inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor: '#1F2937',
              color: '#9CA3AF',
              fontSize: '11px',
            }}>
              {surah.approximateYear} CE
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor: '#1F2937',
              color: '#9CA3AF',
              fontSize: '11px',
            }}>
              {surah.ayahCount} ayat
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor: `${accentColor}20`,
              color: accentColor,
              fontSize: '11px',
              fontWeight: 500,
            }}>
              {surah.classification}
            </span>
          </div>
        </div>

        {/* Arrow indicator */}
        <ChevronRight style={{ width: '16px', height: '16px', color: '#4B5563', flexShrink: 0 }} />
      </div>
    </button>
  );
}
