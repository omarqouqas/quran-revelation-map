'use client';

/**
 * Ambient video background component
 * Displays atmospheric visuals behind the map that change with the timeline
 *
 * Timeline mapping:
 * - 610 CE (Dawn): Golden mist, new beginning
 * - 614 CE (Morning): Clear desert, soft light
 * - 621 CE (Midday): Bright, clear skies
 * - 628 CE (Afternoon): Warm golden hour
 * - 632 CE (Dusk): Purple/amber, stars appearing
 */

import { useMemo } from 'react';
import { useMapStore } from '@/stores/useMapStore';

/** Time of day phases */
type TimePhase = 'dawn' | 'morning' | 'midday' | 'afternoon' | 'dusk';

/** Video/visual configuration for each phase */
interface PhaseConfig {
  phase: TimePhase;
  gradient: string;
  overlayOpacity: number;
  particleColor: string;
}

/** Calculate time phase from year */
function getTimePhase(year: number): TimePhase {
  const progress = (year - 610) / 22; // 0 to 1

  if (progress < 0.15) return 'dawn';
  if (progress < 0.4) return 'morning';
  if (progress < 0.6) return 'midday';
  if (progress < 0.85) return 'afternoon';
  return 'dusk';
}

/** Get visual configuration for each phase */
function getPhaseConfig(phase: TimePhase): PhaseConfig {
  switch (phase) {
    case 'dawn':
      return {
        phase: 'dawn',
        gradient: `
          radial-gradient(ellipse at 50% 120%, rgba(255, 153, 102, 0.4) 0%, transparent 50%),
          linear-gradient(to top,
            rgba(255, 140, 80, 0.3) 0%,
            rgba(255, 180, 120, 0.2) 20%,
            rgba(45, 55, 85, 0.6) 50%,
            rgba(25, 30, 50, 0.9) 100%
          )
        `,
        overlayOpacity: 0.7,
        particleColor: 'rgba(255, 200, 150, 0.6)',
      };
    case 'morning':
      return {
        phase: 'morning',
        gradient: `
          radial-gradient(ellipse at 30% 100%, rgba(255, 220, 180, 0.3) 0%, transparent 40%),
          linear-gradient(to top,
            rgba(200, 180, 150, 0.2) 0%,
            rgba(135, 180, 220, 0.3) 30%,
            rgba(70, 120, 180, 0.4) 60%,
            rgba(30, 50, 80, 0.8) 100%
          )
        `,
        overlayOpacity: 0.5,
        particleColor: 'rgba(255, 240, 220, 0.4)',
      };
    case 'midday':
      return {
        phase: 'midday',
        gradient: `
          radial-gradient(ellipse at 50% 0%, rgba(255, 255, 240, 0.2) 0%, transparent 50%),
          linear-gradient(to top,
            rgba(180, 160, 130, 0.15) 0%,
            rgba(135, 190, 230, 0.25) 30%,
            rgba(80, 140, 200, 0.35) 60%,
            rgba(40, 70, 120, 0.7) 100%
          )
        `,
        overlayOpacity: 0.35,
        particleColor: 'rgba(255, 255, 255, 0.3)',
      };
    case 'afternoon':
      return {
        phase: 'afternoon',
        gradient: `
          radial-gradient(ellipse at 70% 100%, rgba(255, 180, 100, 0.4) 0%, transparent 45%),
          linear-gradient(to top,
            rgba(255, 160, 80, 0.25) 0%,
            rgba(220, 150, 100, 0.2) 25%,
            rgba(100, 120, 160, 0.4) 55%,
            rgba(40, 50, 80, 0.85) 100%
          )
        `,
        overlayOpacity: 0.55,
        particleColor: 'rgba(255, 200, 120, 0.5)',
      };
    case 'dusk':
      return {
        phase: 'dusk',
        gradient: `
          radial-gradient(ellipse at 50% 130%, rgba(200, 100, 50, 0.5) 0%, transparent 45%),
          linear-gradient(to top,
            rgba(180, 80, 40, 0.35) 0%,
            rgba(120, 60, 80, 0.4) 25%,
            rgba(60, 40, 80, 0.6) 50%,
            rgba(20, 20, 40, 0.95) 100%
          )
        `,
        overlayOpacity: 0.75,
        particleColor: 'rgba(255, 150, 100, 0.4)',
      };
  }
}

/** Seeded random number generator for deterministic values */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

/** Sand/dust particle component with wind drift effect */
function DustParticles({ phase }: { phase: TimePhase }) {
  // More particles at dawn/dusk for atmospheric effect
  const count = phase === 'dawn' || phase === 'dusk' ? 45 : phase === 'midday' ? 20 : 30;

  // Phase-aware dust colors
  const dustColor = phase === 'dawn' ? 'rgba(212, 168, 78, 0.6)' :
                    phase === 'dusk' ? 'rgba(200, 148, 110, 0.5)' :
                    phase === 'afternoon' ? 'rgba(220, 180, 120, 0.4)' :
                    'rgba(232, 227, 219, 0.3)';

  // Generate particles with seeded random for deterministic values
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${seededRandom(i * 3 + 1) * 120 - 10}%`, // Start slightly off-screen
      top: `${seededRandom(i * 3 + 2) * 100}%`,
      size: 1 + seededRandom(i * 3 + 3) * 3, // 1-4px variety
      duration: 20 + seededRandom(i * 5 + 1) * 25, // 20-45s
      delay: seededRandom(i * 5 + 2) * 15,
      opacity: 0.3 + seededRandom(i * 5 + 3) * 0.5, // Vary opacity
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" suppressHydrationWarning>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-dust-drift"
          suppressHydrationWarning
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: dustColor,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/** Light rays (god rays) component for dawn/dusk phases */
function LightRays({ phase }: { phase: TimePhase }) {
  const isVisible = phase === 'dawn' || phase === 'dusk';

  // Different colors for dawn vs dusk
  const rayColor = phase === 'dawn'
    ? 'rgba(255, 200, 100, 0.12)'
    : 'rgba(255, 150, 80, 0.10)';

  const rayHighlight = phase === 'dawn'
    ? 'rgba(255, 220, 150, 0.08)'
    : 'rgba(255, 120, 80, 0.06)';

  // Generate rays with seeded random for deterministic positioning
  const rays = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: 10 + seededRandom(i * 11 + 200) * 80, // 10-90% spread
      width: 60 + seededRandom(i * 11 + 201) * 100, // 60-160px width
      rotation: -15 + seededRandom(i * 11 + 202) * 30, // -15 to 15 degrees
      delay: seededRandom(i * 11 + 203) * 2, // Stagger animations
      height: 50 + seededRandom(i * 11 + 204) * 30, // 50-80% height
    }));
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-[2000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      suppressHydrationWarning
    >
      {rays.map((ray) => (
        <div
          key={ray.id}
          className="absolute top-0 animate-ray"
          suppressHydrationWarning
          style={{
            left: `${ray.left}%`,
            width: ray.width,
            height: `${ray.height}%`,
            background: `linear-gradient(180deg, ${rayHighlight} 0%, ${rayColor} 30%, transparent 100%)`,
            transform: `rotate(${ray.rotation}deg)`,
            transformOrigin: 'top center',
            animationDelay: `${ray.delay}s`,
            filter: 'blur(20px)',
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </div>
  );
}

/** Simple stars effect for dawn/dusk */
function Stars({ opacity = 0.5 }: { opacity?: number }) {
  // Generate stars with seeded random for deterministic values
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${seededRandom(i * 7 + 100) * 100}%`,
      top: `${seededRandom(i * 7 + 101) * 60}%`, // Only in upper portion
      size: 1 + seededRandom(i * 7 + 102) * 2,
      twinkleDuration: 2 + seededRandom(i * 7 + 103) * 3,
      delay: seededRandom(i * 7 + 104) * 3,
    }));
  }, []);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-[2000ms]"
      style={{ opacity }}
      suppressHydrationWarning
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          suppressHydrationWarning
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDuration: `${star.twinkleDuration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function VideoBackground() {
  const currentYear = useMapStore((state) => state.currentYear);

  const phase = getTimePhase(currentYear);
  const config = getPhaseConfig(phase);

  return (
    <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
      {/* Atmospheric gradient overlay - blends with the map */}
      <div
        className="absolute inset-0 transition-all duration-[2000ms] ease-in-out mix-blend-soft-light opacity-60"
        style={{ background: config.gradient }}
      />

      {/* Edge vignette for cinematic feel */}
      <div
        className="absolute inset-0 transition-opacity duration-[2000ms]"
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(10, 15, 26, ${config.overlayOpacity * 0.5}) 100%)`,
        }}
      />

      {/* Sand/dust particles with wind drift */}
      <DustParticles phase={phase} />

      {/* Light rays (god rays) for dawn/dusk */}
      <LightRays phase={phase} />

      {/* Stars overlay for dawn/dusk */}
      {(phase === 'dawn' || phase === 'dusk') && (
        <Stars opacity={phase === 'dusk' ? 0.6 : 0.25} />
      )}

      {/* Horizon glow effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 transition-all duration-[2000ms]"
        style={{
          background: `linear-gradient(to top, ${config.particleColor} 0%, transparent 100%)`,
          opacity: 0.15,
        }}
      />
    </div>
  );
}
