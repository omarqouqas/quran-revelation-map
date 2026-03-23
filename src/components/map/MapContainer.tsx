'use client';

/**
 * Main map container component using Mapbox GL JS
 * Renders the interactive map centered on the Arabian Peninsula
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapStore } from '@/stores/useMapStore';
import { useStoryStore } from '@/stores/useStoryStore';
import { getAllCompleteSurahs, type CompleteSurahData } from '@/data/surah-locations';
import { events, type HistoricalEvent } from '@/data/events';
import { SACRED_SITES, SACRED_SITE_STYLES, type SacredSite } from '@/data/sacred-sites';

// Initialize Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

/** Map center coordinates (between Makkah and Madinah) */
const MAP_CENTER: [number, number] = [39.5, 22.8];

/** Initial zoom level - tighter focus on Hijaz region */
const MAP_ZOOM = 7.2;

/** Map bounds to restrict panning - focused on Hijaz region (Makkah-Madinah corridor) */
const MAP_BOUNDS: [[number, number], [number, number]] = [
  [37.5, 19.5], // Southwest (covers area south of Makkah)
  [42, 26.5],   // Northeast (covers area north of Madinah)
];

/**
 * Day/night cycle configuration
 * Maps timeline years (610-632) to time of day
 * Dawn (610) → Midday (621) → Dusk (632)
 */
interface DayCycleConfig {
  sunAltitude: number;      // Sun angle above horizon (0-90)
  sunAzimuth: number;       // Sun direction (0-360)
  skyColor: string;         // Sky gradient top color
  horizonColor: string;     // Sky gradient horizon color
  fogColor: string;         // Atmospheric fog color
  fogOpacity: number;       // Fog intensity (0-1)
  starIntensity: number;    // Star visibility (0-1)
}

/** Calculate day cycle properties based on year */
function getDayCycleConfig(year: number): DayCycleConfig {
  // Normalize year to 0-1 range (610=0, 632=1)
  const progress = (year - 610) / 22;

  // Map to sun position (dawn → noon → dusk)
  // Using sine curve for smooth transition
  const sunProgress = Math.sin(progress * Math.PI);
  const sunAltitude = 10 + sunProgress * 70; // 10° at dawn/dusk, 80° at noon

  // Sun moves from east (90°) to west (270°)
  const sunAzimuth = 90 + progress * 180;

  // Color transitions
  if (progress < 0.2) {
    // Dawn (610-614): Golden/rose
    const t = progress / 0.2;
    return {
      sunAltitude,
      sunAzimuth,
      skyColor: lerpColor('#1a1a2e', '#2d4a7c', t),
      horizonColor: lerpColor('#ff9966', '#ffcc99', t),
      fogColor: lerpColor('#ff9966', '#ffd699', t),
      fogOpacity: 0.3 - t * 0.1,
      starIntensity: 1 - t,
    };
  } else if (progress < 0.5) {
    // Morning (614-621): Clear blue
    const t = (progress - 0.2) / 0.3;
    return {
      sunAltitude,
      sunAzimuth,
      skyColor: lerpColor('#2d4a7c', '#1e3a5f', t),
      horizonColor: lerpColor('#ffcc99', '#87ceeb', t),
      fogColor: lerpColor('#ffd699', '#b0c4de', t),
      fogOpacity: 0.2 - t * 0.1,
      starIntensity: 0,
    };
  } else if (progress < 0.8) {
    // Afternoon (621-628): Warm
    const t = (progress - 0.5) / 0.3;
    return {
      sunAltitude,
      sunAzimuth,
      skyColor: lerpColor('#1e3a5f', '#2d4a7c', t),
      horizonColor: lerpColor('#87ceeb', '#ffc299', t),
      fogColor: lerpColor('#b0c4de', '#ffb366', t),
      fogOpacity: 0.1 + t * 0.1,
      starIntensity: 0,
    };
  } else {
    // Dusk (628-632): Purple/gold
    const t = (progress - 0.8) / 0.2;
    return {
      sunAltitude,
      sunAzimuth,
      skyColor: lerpColor('#2d4a7c', '#1a1a2e', t),
      horizonColor: lerpColor('#ffc299', '#ff7744', t),
      fogColor: lerpColor('#ffb366', '#cc6633', t),
      fogOpacity: 0.2 + t * 0.15,
      starIntensity: t * 0.5,
    };
  }
}

/** Linear interpolation between two hex colors */
function lerpColor(color1: string, color2: string, t: number): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

/** Get event category for styling */
function getEventCategory(event: HistoricalEvent): 'battle' | 'migration' | 'revelation' | 'treaty' | 'milestone' {
  const id = event.id;
  if (id.includes('badr') || id.includes('uhud') || id.includes('trench') || id.includes('hunayn') || id.includes('khaybar')) return 'battle';
  if (id.includes('abyssinia') || id.includes('hijra') || id.includes('taif')) return 'migration';
  if (id.includes('revelation') || id.includes('isra')) return 'revelation';
  if (id.includes('hudaybiyyah') || id.includes('aqabah') || id.includes('constitution')) return 'treaty';
  return 'milestone';
}

/** Event category colors */
const EVENT_COLORS = {
  battle: { bg: '#EF4444', border: '#FCA5A5' },      // Red
  migration: { bg: '#3B82F6', border: '#93C5FD' },   // Blue
  revelation: { bg: '#F59E0B', border: '#FCD34D' },  // Amber
  treaty: { bg: '#10B981', border: '#6EE7B7' },      // Green
  milestone: { bg: '#8B5CF6', border: '#C4B5FD' },   // Purple
};

export function MapContainer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<number, mapboxgl.Marker>>(new Map());
  const eventMarkersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const [mapLoaded, setMapLoaded] = useState(false);

  const currentYear = useMapStore((state) => state.currentYear);
  const showMakki = useMapStore((state) => state.showMakki);
  const showMadani = useMapStore((state) => state.showMadani);
  const showEvents = useMapStore((state) => state.showEvents);
  const selectedSurahNumber = useMapStore((state) => state.selectedSurahNumber);
  const selectedEventId = useMapStore((state) => state.selectedEventId);
  const highlightedSurahNumbers = useMapStore((state) => state.highlightedSurahNumbers);
  const selectSurah = useMapStore((state) => state.selectSurah);
  const selectEvent = useMapStore((state) => state.selectEvent);
  const selectSite = useMapStore((state) => state.selectSite);
  const hoverSurah = useMapStore((state) => state.hoverSurah);

  // Story mode location for flyTo
  const storyLocation = useStoryStore((state) => state.storyLocation);
  const isStoryMode = useStoryStore((state) => state.isStoryMode);

  // Get all surahs once
  const allSurahs = useRef(getAllCompleteSurahs());

  /** Create a marker element for a surah */
  const createMarkerElement = useCallback(
    (surah: CompleteSurahData, isSelected: boolean, isHighlighted: boolean): HTMLDivElement => {
      const el = document.createElement('div');
      const isMakki = surah.isMeccan;

      const baseSize = isSelected ? 18 : isHighlighted ? 14 : 8;
      const color = isMakki ? '#C8A84E' : '#2EC4B6';
      const borderColor = isMakki ? '#D4B96A' : '#5EEAD4';

      el.style.width = `${baseSize}px`;
      el.style.height = `${baseSize}px`;
      el.style.borderRadius = '50%';
      el.style.backgroundColor = color;
      el.style.border = `2px solid ${borderColor}`;
      el.style.cursor = 'pointer';
      el.style.transition = 'all 0.2s ease-out';
      el.className = isMakki ? 'marker-makki' : 'marker-madani';

      // Add pulsing glow for highlighted surahs
      if (isHighlighted) {
        el.style.boxShadow = `0 0 12px ${color}, 0 0 24px ${color}60`;
        el.style.animation = 'surah-pulse 1.5s ease-in-out infinite';
      }

      el.setAttribute('data-surah', surah.number.toString());
      el.setAttribute('title', `${surah.englishName} (${surah.arabicName})`);

      // Hover effects
      el.addEventListener('mouseenter', () => {
        el.style.width = '14px';
        el.style.height = '14px';
        hoverSurah(surah.number);
      });

      el.addEventListener('mouseleave', () => {
        const size = isSelected ? '18px' : '8px';
        el.style.width = size;
        el.style.height = size;
        hoverSurah(null);
      });

      return el;
    },
    [hoverSurah]
  );

  /** Create an event marker element (diamond shape) */
  const createEventMarkerElement = useCallback(
    (event: HistoricalEvent, isSelected: boolean, isCurrentYear: boolean): HTMLDivElement => {
      const category = getEventCategory(event);
      const colors = EVENT_COLORS[category];
      const size = isSelected ? 24 : 16;

      // Outer wrapper - Mapbox uses this for positioning (don't set transform here!)
      const wrapper = document.createElement('div');
      wrapper.style.cursor = 'pointer';
      wrapper.setAttribute('data-event', event.id);
      wrapper.setAttribute('title', event.name);

      // Inner diamond element with rotation
      const diamond = document.createElement('div');
      diamond.style.width = `${size}px`;
      diamond.style.height = `${size}px`;
      diamond.style.transform = 'rotate(45deg)';
      diamond.style.backgroundColor = colors.bg;
      diamond.style.border = `2px solid ${colors.border}`;
      diamond.style.borderRadius = '3px';
      diamond.style.transition = 'all 0.2s ease-out';
      diamond.style.boxShadow = isCurrentYear
        ? `0 0 12px ${colors.bg}, 0 0 24px ${colors.bg}40`
        : `0 2px 8px rgba(0,0,0,0.3)`;

      // Pulsing animation for current year events
      if (isCurrentYear) {
        diamond.style.animation = 'pulse 2s infinite';
      }

      wrapper.appendChild(diamond);

      // Hover effects
      wrapper.addEventListener('mouseenter', () => {
        diamond.style.width = '20px';
        diamond.style.height = '20px';
        diamond.style.boxShadow = `0 0 16px ${colors.bg}, 0 0 32px ${colors.bg}60`;
      });

      wrapper.addEventListener('mouseleave', () => {
        diamond.style.width = isSelected ? '24px' : '16px';
        diamond.style.height = isSelected ? '24px' : '16px';
        diamond.style.boxShadow = isCurrentYear
          ? `0 0 12px ${colors.bg}, 0 0 24px ${colors.bg}40`
          : `0 2px 8px rgba(0,0,0,0.3)`;
      });

      return wrapper;
    },
    []
  );

  /** Create a sacred site marker element with glowing icon */
  const createSacredSiteMarker = useCallback(
    (site: SacredSite): HTMLDivElement => {
      const style = SACRED_SITE_STYLES[site.category];

      const el = document.createElement('div');
      el.className = 'sacred-site-marker flex flex-col items-center';
      el.style.cursor = 'pointer';
      el.setAttribute('title', `${site.name} - ${site.description}`);

      // Icon container with glow
      const iconContainer = document.createElement('div');
      iconContainer.className = `sacred-site-icon sacred-site-${site.category}`;
      iconContainer.style.width = '28px';
      iconContainer.style.height = '28px';
      iconContainer.style.borderRadius = '50%';
      iconContainer.style.display = 'flex';
      iconContainer.style.alignItems = 'center';
      iconContainer.style.justifyContent = 'center';
      iconContainer.style.backgroundColor = 'rgba(10, 15, 26, 0.8)';
      iconContainer.style.border = `2px solid ${style.color}`;
      iconContainer.style.boxShadow = `0 0 12px ${style.glowColor}, 0 0 24px ${style.glowColor}`;
      iconContainer.style.transition = 'all 0.3s ease';

      // SVG icon based on category
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '14');
      svg.setAttribute('height', '14');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', style.color);
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');

      let pathD = '';
      switch (site.category) {
        case 'holy':
          // Star/sparkle icon for holy sites
          pathD = 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z';
          break;
        case 'revelation':
          // Sun/light icon for revelation
          pathD = 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 6a6 6 0 100 12 6 6 0 000-12z';
          svg.setAttribute('fill', style.color);
          svg.setAttribute('fill-opacity', '0.3');
          break;
        case 'battle':
          // Shield icon for battle sites
          pathD = 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z';
          break;
        case 'journey':
          // Compass/direction icon for journey sites
          pathD = 'M12 2L19 21L12 17L5 21L12 2Z';
          break;
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathD);
      svg.appendChild(path);
      iconContainer.appendChild(svg);

      // Label
      const label = document.createElement('div');
      label.style.fontSize = '10px';
      label.style.color = style.color;
      label.style.marginTop = '4px';
      label.style.whiteSpace = 'nowrap';
      label.style.fontFamily = 'var(--font-heading)';
      label.style.fontWeight = '600';
      label.style.textShadow = '0 1px 3px rgba(0,0,0,0.8)';
      label.style.letterSpacing = '0.5px';
      label.textContent = site.name;

      // Arabic name (smaller, below)
      const arabicLabel = document.createElement('div');
      arabicLabel.style.fontSize = '9px';
      arabicLabel.style.color = '#F5F0E8';
      arabicLabel.style.opacity = '0.6';
      arabicLabel.style.marginTop = '1px';
      arabicLabel.style.whiteSpace = 'nowrap';
      arabicLabel.style.fontFamily = 'var(--font-arabic)';
      arabicLabel.textContent = site.arabicName;

      el.appendChild(iconContainer);
      el.appendChild(label);
      el.appendChild(arabicLabel);

      // Click handler to open site modal
      el.addEventListener('click', () => {
        selectSite(site.name);
      });

      // Hover effects
      el.addEventListener('mouseenter', () => {
        iconContainer.style.transform = 'scale(1.15)';
        iconContainer.style.boxShadow = `0 0 20px ${style.glowColor}, 0 0 40px ${style.glowColor}`;
      });

      el.addEventListener('mouseleave', () => {
        iconContainer.style.transform = 'scale(1)';
        iconContainer.style.boxShadow = `0 0 12px ${style.glowColor}, 0 0 24px ${style.glowColor}`;
      });

      return el;
    },
    [selectSite]
  );

  /** Initialize map */
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      maxBounds: MAP_BOUNDS,
      minZoom: 6.5,
      maxZoom: 12,
      attributionControl: true,
      pitch: 40, // Tilt to show sky layer
      pitchWithRotate: false,
      dragRotate: false,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-right'
    );

    // Add location labels and sky layer when map loads
    map.current.on('load', () => {
      if (!map.current) return;

      // Add sky layer for day/night cycle
      map.current.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'gradient',
          'sky-gradient': [
            'interpolate',
            ['linear'],
            ['sky-radial-progress'],
            0.8, '#1a1a2e',
            1, '#ff9966',
          ],
          'sky-gradient-center': [0, 0],
          'sky-gradient-radius': 90,
          'sky-opacity': 0.85,
        },
      });

      // Add fog for atmospheric depth (dawn-like initial state)
      map.current.setFog({
        color: 'rgb(255, 153, 102)',
        'high-color': 'rgb(40, 40, 60)',
        'horizon-blend': 0.25,
        'space-color': 'rgb(20, 20, 35)',
        'star-intensity': 0.8,
      });

      // Add sacred site markers
      SACRED_SITES.forEach((site) => {
        if (!map.current) return;

        const el = createSacredSiteMarker(site);
        new mapboxgl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([site.lng, site.lat])
          .addTo(map.current);
      });

      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
      setMapLoaded(false);
    };
  }, [createSacredSiteMarker]);

  /** Update day/night cycle based on current year */
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const config = getDayCycleConfig(currentYear);

    // Update fog/atmosphere
    map.current.setFog({
      color: config.fogColor,
      'high-color': config.skyColor,
      'horizon-blend': 0.15 + config.fogOpacity * 0.25, // More prominent atmospheric effect
      'space-color': 'rgb(15, 15, 25)',
      'star-intensity': config.starIntensity,
    });

    // Update sky gradient if layer exists
    if (map.current.getLayer('sky')) {
      map.current.setPaintProperty('sky', 'sky-gradient', [
        'interpolate',
        ['linear'],
        ['sky-radial-progress'],
        0.7, config.skyColor,
        1, config.horizonColor,
      ]);
    }
  }, [currentYear, mapLoaded]);

  /** Update markers based on current year and filters */
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const visibleSurahs = allSurahs.current.filter((s) => {
      if (s.approximateYear > currentYear) return false;
      if (s.isMeccan && !showMakki) return false;
      if (!s.isMeccan && !showMadani) return false;
      return true;
    });

    const visibleNumbers = new Set(visibleSurahs.map((s) => s.number));

    // Remove markers that should no longer be visible
    markersRef.current.forEach((marker, surahNumber) => {
      if (!visibleNumbers.has(surahNumber)) {
        marker.remove();
        markersRef.current.delete(surahNumber);
      }
    });

    // Add or update markers for visible surahs
    visibleSurahs.forEach((surah) => {
      const isSelected = surah.number === selectedSurahNumber;
      const isHighlighted = highlightedSurahNumbers.includes(surah.number);
      const existingMarker = markersRef.current.get(surah.number);
      const color = surah.isMeccan ? '#C8A84E' : '#2EC4B6';

      if (existingMarker) {
        // Update existing marker if selection or highlight state changed
        const el = existingMarker.getElement();
        const size = isSelected ? '18px' : isHighlighted ? '14px' : '8px';
        el.style.width = size;
        el.style.height = size;

        // Update glow and animation for highlighted state
        if (isHighlighted) {
          el.style.boxShadow = `0 0 12px ${color}, 0 0 24px ${color}60`;
          el.style.animation = 'surah-pulse 1.5s ease-in-out infinite';
        } else {
          el.style.boxShadow = '';
          el.style.animation = '';
        }
        return;
      }

      const el = createMarkerElement(surah, isSelected, isHighlighted);

      el.addEventListener('click', () => {
        selectSurah(surah.number);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([surah.location.lng, surah.location.lat])
        .addTo(map.current!);

      markersRef.current.set(surah.number, marker);
    });
  }, [
    currentYear,
    mapLoaded,
    showMakki,
    showMadani,
    selectedSurahNumber,
    highlightedSurahNumbers,
    createMarkerElement,
    selectSurah,
  ]);

  /** Update event markers based on current year and visibility toggle */
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // If events are hidden, remove all event markers
    if (!showEvents) {
      eventMarkersRef.current.forEach((marker) => marker.remove());
      eventMarkersRef.current.clear();
      return;
    }

    // Get events up to current year
    const visibleEvents = events.filter((e) => e.year <= currentYear);
    const visibleIds = new Set(visibleEvents.map((e) => e.id));

    // Remove markers that should no longer be visible
    eventMarkersRef.current.forEach((marker, eventId) => {
      if (!visibleIds.has(eventId)) {
        marker.remove();
        eventMarkersRef.current.delete(eventId);
      }
    });

    // Add or update markers for visible events
    visibleEvents.forEach((event) => {
      const isSelected = event.id === selectedEventId;
      const isCurrentYear = event.year === currentYear;
      const existingMarker = eventMarkersRef.current.get(event.id);

      if (existingMarker) {
        // Update existing marker if selection or year changed
        const wrapper = existingMarker.getElement();
        const diamond = wrapper.firstChild as HTMLDivElement;
        if (!diamond) return;

        const size = isSelected ? '24px' : '16px';
        diamond.style.width = size;
        diamond.style.height = size;

        const category = getEventCategory(event);
        const colors = EVENT_COLORS[category];
        diamond.style.boxShadow = isCurrentYear
          ? `0 0 12px ${colors.bg}, 0 0 24px ${colors.bg}40`
          : `0 2px 8px rgba(0,0,0,0.3)`;
        diamond.style.animation = isCurrentYear ? 'pulse 2s infinite' : 'none';
        return;
      }

      const el = createEventMarkerElement(event, isSelected, isCurrentYear);

      el.addEventListener('click', () => {
        selectEvent(event.id);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([event.location.lng, event.location.lat])
        .addTo(map.current!);

      eventMarkersRef.current.set(event.id, marker);
    });
  }, [
    currentYear,
    mapLoaded,
    showEvents,
    selectedEventId,
    createEventMarkerElement,
    selectEvent,
  ]);

  /** Fly to location during story mode */
  useEffect(() => {
    if (!map.current || !mapLoaded || !isStoryMode || !storyLocation) return;

    map.current.flyTo({
      center: [storyLocation.lng, storyLocation.lat],
      zoom: storyLocation.zoom,
      duration: 2000,
      essential: true,
      easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2, // easeInOutQuad
    });
  }, [storyLocation, mapLoaded, isStoryMode]);

  return (
    <div
      ref={mapContainer}
      className="absolute inset-0 w-full h-full"
      aria-label="Interactive map of Quran revelation locations"
    />
  );
}
