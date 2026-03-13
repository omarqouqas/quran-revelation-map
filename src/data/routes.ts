/**
 * Historical journey routes for map visualization
 */

export interface JourneyRoute {
  id: string;
  name: string;
  arabicName: string;
  year: number;
  description: string;
  /** Route coordinates [lng, lat] for each waypoint */
  coordinates: [number, number][];
  /** Color for the route line */
  color: string;
  /** Related event IDs */
  relatedEventIds: string[];
}

/**
 * The Hijra route from Makkah to Madinah (622 CE)
 *
 * Historical path:
 * 1. Makkah - Departure at night
 * 2. Cave Thawr - 3 days hiding south of Makkah
 * 3. Coastal route - Avoiding main roads
 * 4. Quba - First stop near Madinah (built first mosque)
 * 5. Madinah - Final destination
 */
const HIJRA_ROUTE: JourneyRoute = {
  id: 'hijra',
  name: 'The Hijra',
  arabicName: 'الهجرة',
  year: 622,
  description: 'The migration from Makkah to Madinah, marking the beginning of the Islamic calendar.',
  coordinates: [
    [39.8262, 21.4225],  // Makkah - starting point
    [39.8467, 21.3789],  // South of Makkah (toward Cave Thawr)
    [39.8283, 21.3456],  // Cave Thawr area
    [39.5500, 21.4000],  // Heading west to coast
    [39.1500, 21.6000],  // Coastal route
    [38.9000, 22.0000],  // Along Red Sea coast
    [38.8500, 22.5000],  // Continuing north
    [39.0000, 23.0000],  // Turning inland
    [39.2000, 23.5000],  // Approaching Madinah region
    [39.5000, 24.0000],  // Near Quba
    [39.6142, 24.4686],  // Madinah - destination
  ],
  color: '#3B82F6', // Blue (migration color)
  relatedEventIds: ['hijra'],
};

/**
 * First migration to Abyssinia route (615 CE)
 * Note: Abyssinia is off-map, so we show departure from Makkah
 * toward the Red Sea coast (departure point)
 */
const ABYSSINIA_ROUTE: JourneyRoute = {
  id: 'abyssinia-migration',
  name: 'Migration to Abyssinia',
  arabicName: 'الهجرة إلى الحبشة',
  year: 615,
  description: 'Muslims fled persecution to the Christian kingdom of Abyssinia (Ethiopia).',
  coordinates: [
    [39.8262, 21.4225],  // Makkah - starting point
    [39.5000, 21.4500],  // Heading west
    [39.1000, 21.5000],  // Toward coast (Jeddah area)
    [38.8000, 21.5500],  // Red Sea coast - departure point
  ],
  color: '#3B82F6', // Blue (migration color)
  relatedEventIds: ['first-abyssinia', 'second-abyssinia'],
};

/**
 * Journey to Taif (619 CE)
 */
const TAIF_JOURNEY: JourneyRoute = {
  id: 'taif-journey',
  name: 'Journey to Taif',
  arabicName: 'رحلة الطائف',
  year: 619,
  description: 'The Prophet traveled to Taif seeking support but was rejected.',
  coordinates: [
    [39.8262, 21.4225],  // Makkah
    [39.9500, 21.3800],  // East of Makkah
    [40.1000, 21.3500],  // Toward mountains
    [40.2500, 21.3000],  // Mountain pass
    [40.4158, 21.2703],  // Taif
  ],
  color: '#F59E0B', // Amber
  relatedEventIds: ['taif-journey'],
};

/** All journey routes */
export const JOURNEY_ROUTES: JourneyRoute[] = [
  HIJRA_ROUTE,
  ABYSSINIA_ROUTE,
  TAIF_JOURNEY,
];

/** Get route by ID */
export function getRouteById(id: string): JourneyRoute | undefined {
  return JOURNEY_ROUTES.find((r) => r.id === id);
}

/** Get routes visible at a specific year */
export function getRoutesForYear(year: number): JourneyRoute[] {
  return JOURNEY_ROUTES.filter((r) => r.year <= year);
}
