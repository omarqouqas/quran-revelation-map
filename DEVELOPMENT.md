# Quran Revelation Map - Development Documentation

## Project Overview

An interactive visualization tool that lets users experience the 23-year journey of Quranic revelation (610-632 CE). Users can "time travel" through a timeline, watching surahs appear on a geographic map of the Arabian Peninsula as they were revealed historically.

**Live URL:** http://localhost:3000

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| State Management | Zustand 5.0.11 |
| Mapping | Mapbox GL JS 3.20.0 |
| Animations | Framer Motion 12.36.0 |
| UI Components | Radix UI (Slider, Dialog, Tooltip) |
| Icons | Lucide React 0.577.0 |
| Quran Data | quran-meta 6.0.17 |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles & CSS variables
│
├── components/
│   ├── explorer/           # Surah Explorer (search/filter panel)
│   │   ├── SurahExplorer.tsx
│   │   ├── ExplorerHeader.tsx
│   │   ├── ExplorerFilters.tsx
│   │   ├── SurahResultsList.tsx
│   │   ├── SurahResultCard.tsx
│   │   └── index.ts
│   │
│   ├── layout/
│   │   ├── SurahDetailPanel.tsx   # Right-side surah details
│   │   ├── EventDetailModal.tsx   # Event details modal
│   │   └── LandingOverlay.tsx     # Onboarding overlay
│   │
│   ├── map/
│   │   └── MapContainer.tsx       # Mapbox GL map
│   │
│   └── timeline/
│       └── TimelineSlider.tsx     # Timeline controls
│
├── data/
│   ├── surah-locations.ts   # Surah coordinates, themes, context
│   ├── events.ts            # Historical events (battles, migrations)
│   └── tanzil-notes.ts      # Verse-level revelation notes
│
├── lib/
│   ├── quran-data.ts        # Canonical Quran metadata
│   ├── surah-filters.ts     # Filtering/sorting utilities
│   └── utils.ts             # Utility functions (cn, formatYear)
│
├── stores/
│   ├── useMapStore.ts       # Map/timeline state
│   └── useExplorerStore.ts  # Explorer panel state
│
└── types/
    └── index.ts             # TypeScript type definitions
```

---

## Data Architecture (3 Layers)

### Layer 1: Canonical Data (`quran-meta` package)
- All 114 surahs with Arabic/English names
- Ayah counts, revelation order
- Makki/Madani classification

### Layer 2: Historical Events (`events.ts`)
- 24 significant events (610-632 CE)
- **Categories:**
  - Battle (red): Badr, Uhud, Trench, Hunayn, Khaybar
  - Migration (blue): Abyssinia (x2), Hijra, Taif Journey
  - Revelation (amber): First Revelation, Isra & Mi'raj
  - Treaty (green): Hudaybiyyah, Aqabah Pledges, Constitution
  - Milestone (purple): Public Preaching, Year of Sorrow, Conquest of Makkah, etc.
- Each event has: coordinates, year, description, related surahs
- Off-map events (Abyssinia) shown at departure point with indicator

### Layer 3: Interpretive Data (`surah-locations.ts`)
- Geographic coordinates per surah
- Key themes (2-3 per surah, 59+ unique themes)
- Historical context descriptions
- Year overrides for precisely-dated surahs
- Coordinate jittering to prevent marker overlap

---

## Features Implemented

### Phase 1: Core Experience (Complete)

| Feature | Description | File |
|---------|-------------|------|
| Interactive Map | Mapbox GL map of Arabian Peninsula | `MapContainer.tsx` |
| Surah Markers | Dynamic markers with Makki (gold) / Madani (teal) colors | `MapContainer.tsx` |
| Timeline Slider | Year slider (610-632 CE) with play/pause | `TimelineSlider.tsx` |
| Auto-Play | Animated playback at 1x, 2x, 4x speed | `TimelineSlider.tsx` |
| Surah Detail Panel | Slide-in panel with full surah information | `SurahDetailPanel.tsx` |
| Landing Overlay | Onboarding instructions for first-time users | `LandingOverlay.tsx` |
| Makki/Madani Filters | Toggle visibility by revelation period | `useMapStore.ts` |

### Phase 2: Surah Explorer (Complete)

| Feature | Description | File |
|---------|-------------|------|
| Search | Search by surah name (Arabic/English) or number | `ExplorerHeader.tsx` |
| Period Filter | Toggle All / Makki / Madani | `ExplorerFilters.tsx` |
| Year Range | Dual-thumb slider (610-632 CE) | `ExplorerFilters.tsx` |
| Theme Filter | Multi-select from 59+ themes | `ExplorerFilters.tsx` |
| Location Filter | Filter by 10 locations (Makkah, Madinah, etc.) | `ExplorerFilters.tsx` |
| Sort Options | By number, revelation order, year, alphabetical | `SurahResultsList.tsx` |
| Result Cards | Clickable cards that jump timeline + open details | `SurahResultCard.tsx` |

### Phase 3: Historical Events Overlay (Complete)

| Feature | Description | File |
|---------|-------------|------|
| Event Markers | Diamond-shaped markers with category colors | `MapContainer.tsx` |
| Event Categories | Battle (red), Migration (blue), Revelation (amber), Treaty (green), Milestone (purple) | `MapContainer.tsx` |
| Event Detail Modal | Click event to see description, year, related surahs | `EventDetailModal.tsx` |
| Events Toggle | Show/hide events via legend button | `page.tsx` |
| Related Surahs | Click from event modal to open surah detail | `EventDetailModal.tsx` |
| Off-Map Indicator | Shows actual location for events outside map bounds (e.g., Abyssinia) | `EventDetailModal.tsx` |
| Coordinate Jittering | Prevents overlapping markers at same location | `events.ts` |

### Phase 4: Enhanced UX (Complete)

| Feature | Description | File |
|---------|-------------|------|
| Deep Linking | Direct URLs like `/surah/96` for sharing | `src/app/surah/[number]/page.tsx` |
| URL Sync | URL updates when selecting/deselecting surahs | `useSurahRouting.ts` |
| Keyboard Shortcuts | Arrow keys, Space, Cmd+K, Escape, Home/End | `useKeyboardShortcuts.ts` |
| Shortcuts Help Modal | Press `?` to see all keyboard shortcuts | `KeyboardShortcutsModal.tsx` |
| Opening Verses | Arabic + English for all 114 surahs | `opening-verses.ts` |
| Progress Tracking | Track explored surahs/events with localStorage | `useProgressStore.ts` |
| Progress Stats | Visual progress bar, streak tracking, stats | `ProgressStats.tsx` |
| Explored Indicators | Glow effect on explored surah markers | `MapContainer.tsx` |
| Day/Night Cycle | Atmospheric sky changes with timeline (dawn→dusk) | `MapContainer.tsx` |

### Keyboard Shortcuts

| Keys | Action |
|------|--------|
| `←` / `→` | Navigate timeline by 1 year |
| `Shift` + `←` / `→` | Navigate timeline by 5 years |
| `Space` | Play/pause timeline |
| `Cmd/Ctrl` + `K` | Toggle search panel |
| `Escape` | Close panels |
| `Home` / `End` | Jump to 610 / 632 CE |
| `?` | Show shortcuts help |

### Day/Night Cycle

The map features an atmospheric day/night cycle that mirrors the 23-year revelation journey as a single day - from dawn to dusk.

**Timeline Mapping:**

| Year | Time of Day | Sky Color | Atmosphere |
|------|-------------|-----------|------------|
| 610 CE | Dawn | Golden/rose | Stars fading, warm fog |
| 614 CE | Early Morning | Soft blue | Light mist clearing |
| 621 CE | Midday | Clear blue | Bright, minimal fog |
| 628 CE | Late Afternoon | Warm gold | Golden hour glow |
| 632 CE | Dusk | Purple/amber | Stars appearing, deep fog |

**Symbolic Meaning:**
- **Dawn (610)**: The first revelation in Cave Hira - a new light begins
- **Midday (621)**: The Hijra - the turning point, brightest moment
- **Dusk (632)**: Completion of the Quran - the journey fulfilled

**Technical Implementation:**
- Uses Mapbox GL's `fog` and `sky` layers
- `getDayCycleConfig()` calculates sun position, sky colors, fog opacity
- `lerpColor()` interpolates between colors smoothly
- Updates in real-time as timeline changes

---

## State Management

### useMapStore (Timeline & Map)
```typescript
{
  currentYear: number,        // 610-632
  isPlaying: boolean,         // Auto-play mode
  playbackSpeed: 1 | 2 | 4,   // Speed multiplier
  selectedSurahNumber: number | null,
  hoveredSurahNumber: number | null,
  selectedEventId: string | null,  // Selected historical event
  showMakki: boolean,         // Filter toggle
  showMadani: boolean,        // Filter toggle
  showEvents: boolean,        // Events layer toggle
  hasInteracted: boolean,     // Landing overlay trigger
}
```

### useExplorerStore (Explorer Panel)
```typescript
{
  isExplorerOpen: boolean,
  searchQuery: string,
  selectedThemes: string[],
  periodFilter: 'all' | 'makki' | 'madani',
  yearRange: [number, number],
  selectedLocations: LocationKey[],
  sortBy: 'number' | 'revelation' | 'year' | 'name',
}
```

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Navy (Background) | `#0A0F1A` | Main background |
| Navy Light | `#1A2332` | Cards, inputs |
| Navy Lighter | `#2A3342` | Borders, hover states |
| Cream | `#F5F0E8` | Primary text |
| Cream Muted | `#E8E3DB` | Secondary text |
| Gold (Makki) | `#C8A84E` | Makki period accent |
| Teal (Madani) | `#2EC4B6` | Madani period accent |

---

## Typography

| Font | Usage |
|------|-------|
| Amiri | Arabic text (surah names, location names) |
| Cormorant Garamond | Headings, titles, display numbers |
| Source Sans 3 | Body text, descriptions |

---

## Key Locations

| Location | Coordinates | Significance |
|----------|-------------|--------------|
| Makkah | 21.4225, 39.8262 | Primary Makki revelation site |
| Madinah | 24.4686, 39.6142 | Primary Madani revelation site |
| Cave Hira | 21.4574, 39.8583 | First revelation (Surah 96) |
| Badr | 23.7833, 38.7667 | Battle of Badr (Surah 8) |
| Uhud | 24.5017, 39.6150 | Battle of Uhud (Surah 3) |
| Hudaybiyyah | 21.4411, 39.6083 | Treaty site (Surah 48) |
| Taif | 21.2703, 40.4158 | Journey to Taif (Surah 72) |
| Arafat | 21.3549, 39.9842 | Farewell Pilgrimage (Surah 5) |
| Mina | 21.4133, 39.8933 | Last revelation (Surah 110) |

---

## Bugs Fixed

| Bug | File | Fix |
|-----|------|-----|
| Filter count badge not updating | `ExplorerFilters.tsx` | Changed from `getActiveFilterCount()` function call to reactive `useMemo` computation |
| Timeline auto-play using stale year | `TimelineSlider.tsx` | Added `currentYearRef` to track current year in setInterval closure |
| Both panels closing on Escape | `SurahExplorer.tsx` | Use capture phase event listener with `stopPropagation()` |
| getAllCompleteSurahs called repeatedly | `SurahResultsList.tsx` | Cached at module level |
| X button not clickable (production) | `SurahExplorer.tsx` | Fixed z-index hierarchy and used native DOM event listener |
| Map zoom controls blocked by header | `page.tsx` | Added `pointer-events-none` to header, `pointer-events-auto` to buttons |
| quran-meta v6.x API breaking change | `quran-data.ts` | Changed from `import { getSurahMeta } from 'quran-meta/hafs'` to `createHafs()` pattern |
| Surahs not loading (require in function) | `surah-locations.ts` | Replaced `require()` with proper ES module import at top of file |
| Event markers in wrong position | `MapContainer.tsx` | Separated wrapper div (for Mapbox positioning) from inner diamond div (for rotation) - CSS transform was overwriting Mapbox's positioning |
| Events appearing off-screen | `events.ts` | Moved Abyssinia events to departure point (Makkah) with `offMapLocation` indicator |
| Overlapping event markers | `events.ts` | Added jitter function with seeded random for deterministic spacing |

---

## Future Enhancements

### Quick Wins
- [x] Event markers on map (battles, migrations as distinct icons) ✓
- [x] URL routing (`/surah/1` for deep-linking) ✓
- [x] Keyboard shortcuts (arrows for timeline, Cmd+K for search) ✓
- [x] Progress tracking (remember explored surahs) ✓

### Medium Effort
- [ ] Audio recitation (play opening ayat via Quran.com API)
- [ ] Surah connections graph (thematic/temporal relationships)
- [ ] Multiple revelation chronologies (scholarly opinions)
- [ ] PWA/offline support

### Ambitious Features
- [ ] Narrative/story mode (guided tour with voiceover)
- [ ] 3D terrain (Mapbox 3D for mountains like Jabal al-Nour)
- [ ] Quiz/learning mode (gamified exploration)
- [ ] AR compass mode (point phone toward Makkah)

---

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

**Environment Variables Required:**
- `NEXT_PUBLIC_MAPBOX_TOKEN` - Mapbox GL access token (in `.env.local`)

---

## API & Data Sources

| Source | Usage |
|--------|-------|
| [quran-meta](https://www.npmjs.com/package/quran-meta) | Canonical surah metadata |
| [Tanzil.net](https://tanzil.net/) | Revelation order notes |
| [Mapbox](https://www.mapbox.com/) | Map tiles and GL JS |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is for educational purposes. Quran data is sourced from open scholarly resources.
