'use client';

/**
 * Period Badge Component
 * Displays the current revelation sub-period with colored styling
 */

import { RevelationPeriod } from '@/data/period-context';

interface PeriodBadgeProps {
  period: RevelationPeriod;
  size?: 'sm' | 'md';
}

export function PeriodBadge({ period, size = 'md' }: PeriodBadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-[10px]'
    : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`${sizeClasses} rounded-full font-medium whitespace-nowrap`}
      style={{
        backgroundColor: `${period.color}20`,
        color: period.color,
        border: `1px solid ${period.color}40`,
      }}
    >
      {period.name}
    </span>
  );
}
