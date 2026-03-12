'use client';

/**
 * Main map container component using Mapbox GL JS
 * Renders the interactive map centered on the Arabian Peninsula
 */

import { useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapStore } from '@/stores/useMapStore';
import { surahs } from '@/data/surahs';
import { locations } from '@/data/locations';
import type { Surah } from '@/types';

// Initialize Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

/** Map center coordinates (between Makkah and Madinah) */
const MAP_CENTER: [number, number] = [39.75, 22.9];

/** Initial zoom level to show the Arabian Peninsula */
const MAP_ZOOM = 6.5;

/** Map bounds to restrict panning */
const MAP_BOUNDS: [[number, number], [number, number]] = [
  [35, 15], // Southwest
  [45, 30], // Northeast
];

export function MapContainer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<number, mapboxgl.Marker>>(new Map());

  const currentYear = useMapStore((state) => state.currentYear);
  const setSelectedSurah = useMapStore((state) => state.setSelectedSurah);

  /** Create a marker element for a surah */
  const createMarkerElement = useCallback((surah: Surah): HTMLDivElement => {
    const el = document.createElement('div');
    const isMakki = surah.classification === 'Makki';

    el.className = `
      w-4 h-4 rounded-full cursor-pointer
      transition-all duration-300 ease-out
      hover:scale-125
      ${isMakki ? 'bg-[#C8A84E] marker-makki' : 'bg-[#2DD4BF] marker-madani'}
    `.replace(/\s+/g, ' ').trim();

    el.style.border = `2px solid ${isMakki ? '#D4B96A' : '#5EEAD4'}`;
    el.style.boxShadow = isMakki
      ? '0 0 8px rgba(200, 168, 78, 0.6)'
      : '0 0 8px rgba(45, 212, 191, 0.6)';

    el.setAttribute('data-surah', surah.number.toString());
    el.setAttribute('title', `${surah.englishName} (${surah.arabicName})`);

    return el;
  }, []);

  /** Create a location marker element */
  const createLocationMarkerElement = useCallback((name: string): HTMLDivElement => {
    const el = document.createElement('div');
    el.className = 'flex flex-col items-center';

    const dot = document.createElement('div');
    dot.className = 'w-2 h-2 rounded-full bg-[#F5F0E8] opacity-60';

    const label = document.createElement('div');
    label.className = 'text-xs text-[#F5F0E8] opacity-60 mt-1 whitespace-nowrap font-medium';
    label.style.fontFamily = 'var(--font-body)';
    label.textContent = name;

    el.appendChild(dot);
    el.appendChild(label);

    return el;
  }, []);

  /** Initialize map */
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      maxBounds: MAP_BOUNDS,
      minZoom: 5,
      maxZoom: 12,
      attributionControl: true,
      pitchWithRotate: false,
      dragRotate: false,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-right'
    );

    // Add location markers when map loads
    map.current.on('load', () => {
      locations.forEach((location) => {
        if (!map.current) return;

        const el = createLocationMarkerElement(location.name);
        new mapboxgl.Marker({ element: el })
          .setLngLat([location.lng, location.lat])
          .addTo(map.current);
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [createLocationMarkerElement]);

  /** Update markers based on current year */
  useEffect(() => {
    if (!map.current) return;

    const visibleSurahs = surahs.filter((s) => s.approximateYear <= currentYear);
    const visibleNumbers = new Set(visibleSurahs.map((s) => s.number));

    // Remove markers that should no longer be visible
    markersRef.current.forEach((marker, surahNumber) => {
      if (!visibleNumbers.has(surahNumber)) {
        marker.remove();
        markersRef.current.delete(surahNumber);
      }
    });

    // Add markers for newly visible surahs
    visibleSurahs.forEach((surah) => {
      if (markersRef.current.has(surah.number)) return;

      const el = createMarkerElement(surah);

      el.addEventListener('click', () => {
        setSelectedSurah(surah);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([surah.location.lng, surah.location.lat])
        .addTo(map.current!);

      markersRef.current.set(surah.number, marker);
    });
  }, [currentYear, createMarkerElement, setSelectedSurah]);

  return (
    <div
      ref={mapContainer}
      className="absolute inset-0 w-full h-full"
      aria-label="Interactive map of Quran revelation locations"
    />
  );
}
