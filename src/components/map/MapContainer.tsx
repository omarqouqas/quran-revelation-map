'use client';

/**
 * Main map container component using Mapbox GL JS
 * Renders the interactive map centered on the Arabian Peninsula
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapStore } from '@/stores/useMapStore';
import { getAllCompleteSurahs, LOCATIONS, type CompleteSurahData } from '@/data/surah-locations';

// Initialize Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

/** Map center coordinates (between Makkah and Madinah) */
const MAP_CENTER: [number, number] = [39.5, 23.5];

/** Initial zoom level to show the Arabian Peninsula */
const MAP_ZOOM = 6.5;

/** Map bounds to restrict panning */
const MAP_BOUNDS: [[number, number], [number, number]] = [
  [35, 15], // Southwest
  [45, 30], // Northeast
];

/** Location labels to display on the map */
const LOCATION_LABELS = [
  { name: 'Makkah', arabicName: 'مكة', ...LOCATIONS.MAKKAH },
  { name: 'Madinah', arabicName: 'المدينة', ...LOCATIONS.MADINAH },
  { name: 'Cave Hira', arabicName: 'غار حراء', ...LOCATIONS.CAVE_HIRA },
  { name: 'Badr', arabicName: 'بدر', ...LOCATIONS.BADR },
  { name: 'Uhud', arabicName: 'أحد', ...LOCATIONS.UHUD },
  { name: 'Taif', arabicName: 'الطائف', ...LOCATIONS.TAIF },
  { name: 'Hudaybiyyah', arabicName: 'الحديبية', ...LOCATIONS.HUDAYBIYYAH },
];

export function MapContainer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<number, mapboxgl.Marker>>(new Map());
  const [mapLoaded, setMapLoaded] = useState(false);

  const currentYear = useMapStore((state) => state.currentYear);
  const showMakki = useMapStore((state) => state.showMakki);
  const showMadani = useMapStore((state) => state.showMadani);
  const selectedSurahNumber = useMapStore((state) => state.selectedSurahNumber);
  const selectSurah = useMapStore((state) => state.selectSurah);
  const hoverSurah = useMapStore((state) => state.hoverSurah);

  // Get all surahs once
  const allSurahs = useRef(getAllCompleteSurahs());

  /** Create a marker element for a surah */
  const createMarkerElement = useCallback(
    (surah: CompleteSurahData, isSelected: boolean): HTMLDivElement => {
      const el = document.createElement('div');
      const isMakki = surah.isMeccan;

      const baseSize = isSelected ? 18 : 8;
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

      el.setAttribute('data-surah', surah.number.toString());
      el.setAttribute('title', `${surah.englishName} (${surah.arabicName})`);

      // Hover effects
      el.addEventListener('mouseenter', () => {
        el.style.width = '14px';
        el.style.height = '14px';
        hoverSurah(surah.number);
      });

      el.addEventListener('mouseleave', () => {
        el.style.width = isSelected ? '18px' : '8px';
        el.style.height = isSelected ? '18px' : '8px';
        hoverSurah(null);
      });

      return el;
    },
    [hoverSurah]
  );

  /** Create a location label element */
  const createLocationLabelElement = useCallback(
    (name: string): HTMLDivElement => {
      const el = document.createElement('div');
      el.className = 'flex flex-col items-center pointer-events-none';

      const dot = document.createElement('div');
      dot.style.width = '6px';
      dot.style.height = '6px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = '#F5F0E8';
      dot.style.opacity = '0.5';

      const label = document.createElement('div');
      label.style.fontSize = '11px';
      label.style.color = '#F5F0E8';
      label.style.opacity = '0.5';
      label.style.marginTop = '4px';
      label.style.whiteSpace = 'nowrap';
      label.style.fontFamily = 'var(--font-heading)';
      label.style.fontWeight = '500';
      label.textContent = name;

      el.appendChild(dot);
      el.appendChild(label);

      return el;
    },
    []
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

    // Add location labels when map loads
    map.current.on('load', () => {
      LOCATION_LABELS.forEach((location) => {
        if (!map.current) return;

        const el = createLocationLabelElement(location.name);
        new mapboxgl.Marker({ element: el })
          .setLngLat([location.lng, location.lat])
          .addTo(map.current);
      });
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
      setMapLoaded(false);
    };
  }, [createLocationLabelElement]);

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
      const existingMarker = markersRef.current.get(surah.number);

      if (existingMarker) {
        // Update existing marker if selection changed
        const el = existingMarker.getElement();
        const size = isSelected ? '18px' : '8px';
        el.style.width = size;
        el.style.height = size;
        return;
      }

      const el = createMarkerElement(surah, isSelected);

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
    createMarkerElement,
    selectSurah,
  ]);

  return (
    <div
      ref={mapContainer}
      className="absolute inset-0 w-full h-full"
      aria-label="Interactive map of Quran revelation locations"
    />
  );
}
