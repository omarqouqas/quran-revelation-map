'use client';

/**
 * Main map container component using Mapbox GL JS
 * Renders the interactive map centered on the Arabian Peninsula
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapStore } from '@/stores/useMapStore';
import { useProgressStore } from '@/stores/useProgressStore';
import { getAllCompleteSurahs, LOCATIONS, type CompleteSurahData } from '@/data/surah-locations';
import { events, type HistoricalEvent } from '@/data/events';
import { JOURNEY_ROUTES, type JourneyRoute } from '@/data/routes';

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
  const selectSurah = useMapStore((state) => state.selectSurah);
  const selectEvent = useMapStore((state) => state.selectEvent);
  const hoverSurah = useMapStore((state) => state.hoverSurah);
  const exploredSurahs = useProgressStore((state) => state.exploredSurahs);

  // Get all surahs once
  const allSurahs = useRef(getAllCompleteSurahs());

  /** Create a marker element for a surah */
  const createMarkerElement = useCallback(
    (surah: CompleteSurahData, isSelected: boolean, isExplored: boolean): HTMLDivElement => {
      const el = document.createElement('div');
      const isMakki = surah.isMeccan;

      const baseSize = isSelected ? 18 : isExplored ? 10 : 8;
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

      // Add glow effect for explored surahs
      if (isExplored && !isSelected) {
        el.style.boxShadow = `0 0 6px ${color}, 0 0 12px ${color}40`;
      }

      el.setAttribute('data-surah', surah.number.toString());
      el.setAttribute('data-explored', isExplored.toString());
      el.setAttribute('title', `${surah.englishName} (${surah.arabicName})${isExplored ? ' ✓' : ''}`);

      // Hover effects
      el.addEventListener('mouseenter', () => {
        el.style.width = '14px';
        el.style.height = '14px';
        hoverSurah(surah.number);
      });

      el.addEventListener('mouseleave', () => {
        const size = isSelected ? '18px' : isExplored ? '10px' : '8px';
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
      const isExplored = exploredSurahs.includes(surah.number);
      const existingMarker = markersRef.current.get(surah.number);

      if (existingMarker) {
        // Update existing marker if selection or explored state changed
        const el = existingMarker.getElement();
        const size = isSelected ? '18px' : isExplored ? '10px' : '8px';
        el.style.width = size;
        el.style.height = size;

        // Update glow for explored
        const color = surah.isMeccan ? '#C8A84E' : '#2EC4B6';
        el.style.boxShadow = (isExplored && !isSelected)
          ? `0 0 6px ${color}, 0 0 12px ${color}40`
          : '';
        el.setAttribute('data-explored', isExplored.toString());
        return;
      }

      const el = createMarkerElement(surah, isSelected, isExplored);

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
    exploredSurahs,
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

  /** Update journey route lines based on current year and events visibility */
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const mapInstance = map.current;

    // Process each route
    JOURNEY_ROUTES.forEach((route) => {
      const sourceId = `route-${route.id}`;
      const layerId = `route-layer-${route.id}`;
      const glowLayerId = `route-glow-${route.id}`;

      // Should this route be visible?
      const isVisible = showEvents && route.year <= currentYear;
      const isCurrentYear = route.year === currentYear;

      // Check if source exists
      const sourceExists = mapInstance.getSource(sourceId);

      if (!isVisible) {
        // Remove layers and source if they exist
        if (mapInstance.getLayer(glowLayerId)) {
          mapInstance.removeLayer(glowLayerId);
        }
        if (mapInstance.getLayer(layerId)) {
          mapInstance.removeLayer(layerId);
        }
        if (sourceExists) {
          mapInstance.removeSource(sourceId);
        }
        return;
      }

      // Create GeoJSON for the route
      const routeGeoJSON: GeoJSON.Feature<GeoJSON.LineString> = {
        type: 'Feature',
        properties: {
          id: route.id,
          name: route.name,
        },
        geometry: {
          type: 'LineString',
          coordinates: route.coordinates,
        },
      };

      if (sourceExists) {
        // Update existing source
        (mapInstance.getSource(sourceId) as mapboxgl.GeoJSONSource).setData(routeGeoJSON);
      } else {
        // Add new source
        mapInstance.addSource(sourceId, {
          type: 'geojson',
          data: routeGeoJSON,
        });

        // Add glow layer (wider, blurred line behind)
        mapInstance.addLayer({
          id: glowLayerId,
          type: 'line',
          source: sourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': route.color,
            'line-width': 8,
            'line-opacity': 0.3,
            'line-blur': 3,
          },
        });

        // Add main route line
        mapInstance.addLayer({
          id: layerId,
          type: 'line',
          source: sourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': route.color,
            'line-width': 3,
            'line-opacity': 0.9,
            'line-dasharray': [2, 1],
          },
        });
      }

      // Animate dash for current year routes
      if (isCurrentYear) {
        // Pulse the glow
        mapInstance.setPaintProperty(glowLayerId, 'line-opacity', 0.5);
        mapInstance.setPaintProperty(glowLayerId, 'line-width', 12);
      } else {
        mapInstance.setPaintProperty(glowLayerId, 'line-opacity', 0.2);
        mapInstance.setPaintProperty(glowLayerId, 'line-width', 6);
      }
    });
  }, [currentYear, mapLoaded, showEvents]);

  return (
    <div
      ref={mapContainer}
      className="absolute inset-0 w-full h-full"
      aria-label="Interactive map of Quran revelation locations"
    />
  );
}
