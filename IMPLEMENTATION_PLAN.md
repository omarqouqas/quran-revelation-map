# Visual Storytelling Implementation Plan

## Core Vision

**Create a cinematic, visually immersive experience** that brings the 23-year Quran revelation journey to life through AI-generated visuals, engaging storytelling, and atmospheric design.

> "Feel like you're traveling through time, witnessing the moments when revelation descended."

---

## What We're Building

### The Experience
- **NOT** a Quran reader or recitation app
- **IS** a visual storytelling platform focused on the *journey* of revelation
- **Geographic focus**: Hijaz region (Makkah-Madinah corridor) in what is now Saudi Arabia
- **Emotional goal**: Awe, connection, understanding of historical context

### Content Types
| Type | Format | Purpose |
|------|--------|---------|
| **Surah visuals** | 5-10 sec AI video loops or images | Depict the context/atmosphere of each surah |
| **Event cinematics** | 15-30 sec AI videos | Bring major events to life (battles, migrations) |
| **Ambient backgrounds** | Looping video | Desert landscapes, sky changes, atmospheric depth |
| **Story cards** | Illustrated images | Shareable on social media |
| **Location art** | Static illustrations | Sacred sites (Cave Hira, Kaaba, Uhud) |

---

## Phase 5: AI-Generated Visuals

### 5.1 Surah Visual Library
Create visual content for all 114 surahs.

**Visual Categories:**
| Category | Style | Examples |
|----------|-------|----------|
| **Cave/Mountain** | Misty, dawn light, solitary | Al-Alaq (96), Al-Muzzammil (73) |
| **Desert Journey** | Caravans, sand, vast landscapes | Al-Quraish (106), Al-Fil (105) |
| **Night/Stars** | Celestial, spiritual, mysterious | Al-Qadr (97), Al-Buruj (85) |
| **Battle/Conflict** | Dust, movement, tension | Al-Anfal (8), Al-Imran (3) |
| **City/Community** | Madinah streets, gathering, unity | Al-Hujurat (49), Al-Nur (24) |
| **Sacred Sites** | Kaaba, mosques, pilgrimage | Al-Hajj (22), Al-Baqarah (2) |

**Production Approach:**
1. Create prompt templates for consistent style
2. Generate with Runway/Sora/Midjourney
3. 5-10 second seamless loops
4. Plays in surah detail panel or as overlay

**Effort:** High (114 surahs × prompt crafting + generation + curation)

### 5.2 Event Cinematics
Create videos for 24 historical events.

**Priority Events:**
| Event | Duration | Visual Focus |
|-------|----------|--------------|
| First Revelation | 15 sec | Cave Hira, dawn, light descending |
| Hijra | 30 sec | Night journey, desert, arrival in Madinah |
| Battle of Badr | 20 sec | Dust, movement, divine intervention |
| Conquest of Makkah | 25 sec | Peaceful army, Kaaba, unity |
| Farewell Pilgrimage | 20 sec | Arafat, vast gathering, sunset |

**Effort:** High (24 events × longer generation + editing)

### 5.3 Ambient Backgrounds
Subtle video backgrounds behind the map.

| Time of Day | Visual | Mood |
|-------------|--------|------|
| Dawn (610 CE) | Golden mist rising over mountains | New beginning |
| Morning | Clear desert, soft shadows | Growing clarity |
| Midday (621 CE) | Bright, minimal haze | Turning point |
| Afternoon | Warm golden light | Perseverance |
| Dusk (632 CE) | Purple/amber sky, stars appearing | Completion |

**Technical:** HTML5 video element behind map, opacity-blended, synced to timeline.

**Effort:** Medium (5-7 ambient loops)

---

## Phase 6: Cinematic Story Mode

### 6.1 Journey Framework
Pre-built cinematic tours that auto-advance with narration.

**UX Flow:**
1. User selects a journey from menu
2. Map enters "cinematic mode" (UI fades, fullscreen feel)
3. Timeline auto-advances
4. Narrative cards fade in/out
5. Visuals play at key moments
6. Map pans to relevant locations
7. Journey ends with summary

### 6.2 Planned Journeys

| Journey | Duration | Key Moments |
|---------|----------|-------------|
| **"The First Revelation"** | 3 min | Cave Hira → First words → Return to Khadijah |
| **"The Year of Sorrow"** | 5 min | Death of Khadijah → Death of Abu Talib → Taif rejection → Isra & Mi'raj |
| **"The Hijra"** | 7 min | Plot to kill → Cave Thawr → Journey → Arrival in Madinah |
| **"Victory & Mercy"** | 5 min | Treaty of Hudaybiyyah → Conquest of Makkah → Forgiveness |
| **"The Final Sermon"** | 4 min | Farewell Pilgrimage → Arafat → Last revelation → Completion |

### 6.3 Narrative Content
Each journey needs:
- **Script**: ~200-400 words of narration text
- **Timing**: When each card appears/disappears
- **Visuals**: Which AI videos play when
- **Map movements**: Pan/zoom coordinates
- **Surah highlights**: Which markers glow

**Effort:** High (writing + timing + integration)

---

## Phase 7: Visual Polish

### 7.1 Atmospheric Effects
| Effect | Description | Effort |
|--------|-------------|--------|
| Sand/dust particles | Drifting particles on map | Low |
| Light rays | Subtle god rays at dawn/dusk | Low |
| Marker animations | Pulse/glow on reveal | Low |
| Transition effects | Smooth fades between story beats | Medium |

### 7.2 Map Enhancements
| Enhancement | Description | Status |
|-------------|-------------|--------|
| 3D terrain | Mapbox elevation for mountains | Pending |
| Tighter bounds | Focus on Hijaz region only | ✅ Complete |
| Satellite toggle | Switch to realistic terrain view | Pending |
| Sacred site markers | Glowing icons for Kaaba, Cave Hira, etc. | ✅ Complete |

---

## Phase 8: Engagement & Sharing

### 8.1 Shareable Cards ✅ COMPLETE
Generate beautiful social media cards:
- ✅ Surah cards with visual + key info (SurahShareCard.tsx)
- ✅ Journey completion cards (JourneyShareCard.tsx)
- ✅ Event cards for historical events (EventShareCard.tsx)
- ✅ Sacred site cards with related events & surahs (SacredSiteShareCard.tsx)
- ✅ Share modal with preview (ShareModal.tsx)
- ✅ Download as PNG, Copy to clipboard, Native share (useShareCard.ts)
- ✅ Tailwind v4 LAB/OKLCH color compatibility fix

### 8.2 Daily Engagement
| Feature | Description | Status |
|---------|-------------|--------|
| Streak tracking | Already implemented | ✅ Complete |
| Achievement badges | Explorer, Scholar, Historian | Pending |

---

## Technical Architecture for Media

### Asset Storage
```
public/
├── visuals/
│   ├── surahs/
│   │   ├── 001-al-fatiha.mp4
│   │   ├── 002-al-baqarah.mp4
│   │   └── ...
│   ├── events/
│   │   ├── first-revelation.mp4
│   │   ├── hijra.mp4
│   │   └── ...
│   └── ambient/
│       ├── dawn.mp4
│       ├── midday.mp4
│       └── dusk.mp4
```

### Video Player Component
- Seamless looping
- Preload on hover/approach
- Graceful fallback to static image
- Optimized for mobile (reduced quality option)

### CDN Considerations
- Videos should be hosted on CDN (Cloudflare R2, AWS S3)
- Progressive loading
- Multiple quality levels (480p, 720p, 1080p)

---

## Implementation Priority

| Order | Phase | Feature | Effort | Impact |
|-------|-------|---------|--------|--------|
| 1 | 5.3 | Ambient video backgrounds | Medium | High - immediate atmosphere |
| 2 | 7.1 | Atmospheric particles | Low | Medium - polish |
| 3 | 5.1 | First 10 surah visuals (pilot) | Medium | High - prove concept |
| 4 | 6.1 | Story mode framework | High | Very High - core feature |
| 5 | 6.2 | First journey ("First Revelation") | High | Very High - showcase |
| ~~6~~ | ~~8.1~~ | ~~Shareable cards~~ | ~~Medium~~ | ✅ COMPLETE |
| 7 | 5.1 | Remaining surah visuals | High | High - completeness |
| 8 | 5.2 | Event cinematics | High | High - depth |

---

## AI Video Generation Strategy

### Existing Data Source: Asbab al-Nuzul
We already have historical context (revelation circumstances) in `src/data/surah-locations.ts`.

**Examples from our data:**
| Surah | Context (from codebase) | Visual Prompt Direction |
|-------|-------------------------|-------------------------|
| 96 (Al-Alaq) | "The very first revelation to Prophet Muhammad at Cave Hira" | Mountain cave, dawn light, mist, solitude |
| 19 (Maryam) | "Recited by Ja'far to the Christian king of Abyssinia during the first migration" | Palace court, diverse gathering, recitation moment |
| 8 (Al-Anfal) | "Revealed after the Battle of Badr addressing the miraculous victory" | Desert battlefield aftermath, dust settling, divine light |
| 33 (Al-Ahzab) | "Revealed during and after the siege of Madinah by confederate forces" | Trench fortifications, defensive posture, community unity |
| 48 (Al-Fath) | "Revealed while returning from Hudaybiyyah, declaring the treaty a clear victory" | Caravan returning, peaceful resolution, hopeful atmosphere |
| 72 (Al-Jinn) | "Revealed when jinn heard the Prophet reciting after the Taif journey" | Night desert, mysterious atmosphere, unseen presence |

### Prompt Generation Pipeline
```
1. Read surah.context from surah-locations.ts
2. Extract key visual elements (location, time, mood)
3. Add standard style modifiers
4. Generate with AI tool
5. Review for appropriateness
```

### Tools
| Tool | Best For | Cost |
|------|----------|------|
| **Runway Gen-3** | Short cinematic clips | $15-100/mo |
| **Sora** (when available) | Longer, coherent scenes | TBD |
| **Midjourney** | Static images, concept art | $10-60/mo |
| **Pika** | Quick iterations | $8-58/mo |

### Prompt Engineering
Create consistent visual language:
- **Color palette**: Warm golds, deep blues, desert tones
- **Style**: Cinematic, reverent, historically-inspired (not cartoonish)
- **Mood**: Awe-inspiring, peaceful, spiritually evocative
- **Avoid**: Modern elements, faces of prophets, literal depictions

### Example Prompt Template
```
[CONTEXT]: {surah.context}
[THEMES]: {surah.themes.join(', ')}
[LOCATION]: {location name}
[YEAR]: {surah.approximateYear} CE

GENERATED PROMPT:
"Cinematic shot of {location description}, {time of day based on themes},
{atmospheric elements}, ancient Arabian setting, no faces visible,
{mood from context}, 4K, documentary film style, reverent atmosphere"
```

### Example Outputs
```
Surah Al-Alaq (First Revelation):
Context: "The very first revelation to Prophet Muhammad at Cave Hira"
→ "Cinematic shot of a misty mountain cave at dawn, golden light
   streaming through the entrance, ancient Arabian landscape visible
   below, ethereal atmosphere, no people visible, 4K, reverent mood"

Surah Al-Anfal (Battle of Badr):
Context: "Revealed after the Battle of Badr addressing the miraculous victory"
→ "Aerial view of Arabian desert battlefield at golden hour, dust
   clouds settling, distant camp fires, dramatic lighting breaking
   through clouds, historical epic cinematography, victorious mood"

Surah Maryam (Abyssinia Migration):
Context: "Recited by Ja'far to the Christian king of Abyssinia"
→ "Interior of ancient African palace hall, warm candlelight,
   ornate architecture, dignified atmosphere, cross-cultural
   moment, documentary style, peaceful and hopeful mood"
```

---

## Success Metrics

> **"Does this feel like a documentary film about the Quran's revelation?"**

| Metric | Target |
|--------|--------|
| Time on site | > 5 minutes average |
| Journey completion rate | > 60% |
| Social shares | Trackable via card generation |
| Return visits | > 30% within 7 days |

---

## Recently Completed

| Feature | Description |
|---------|-------------|
| **Sacred Site Modal** | Clickable sacred site markers open a detailed modal showing site info, Arabic name, coordinates, description, related historical events, and related surahs revealed at that location. Share button allows exporting site cards. |
| **Sacred Site Share Cards** | Beautiful shareable cards for all 8 sacred sites with category-based styling, related events, and related surahs. |
| **html2canvas Tailwind v4 Fix** | Fixed "unsupported color function 'lab'" error by converting all LAB/OKLCH colors to RGB using canvas 2D context and removing stylesheets from cloned document. |
| **Sacred Site Markers** | Glowing icons for 8 key locations: Makkah, Madinah, Cave Hira, Badr, Uhud, Taif, Hudaybiyyah, Arafat. Category-based colors (holy=gold, revelation=amber, battle=red, journey=blue) with pulsing glow animations. |
| **Landing Page UX** | "Begin the Journey" button, horizontal swipe indicator, hidden sidebar until interaction, pulsing timeline handle. |
| **Tighter Map Bounds** | Map now focuses on the Hijaz region (Makkah-Madinah corridor) with tighter bounds, centered zoom, and restricted panning. Improved initial view at zoom 7.2 with minZoom 6.5. |
| **Event Share Cards** | Share historical events (battles, migrations, revelations) with beautiful cards. Includes event details, related surahs, and category-specific styling. |
| **Shareable Cards** | Beautiful card designs for sharing surah info, journey completions, historical events, and sacred sites. Download as PNG, copy to clipboard, or use native Web Share API. |
| **Revelation Order Comparison** | Full-screen modal showing all 114 surahs with toggle between Quran order and revelation order. Visual indicators show position changes. Click any surah to view details. |
| **Order Comparison in Detail Panel** | Each surah's detail panel now shows Quran position vs revelation position with difference indicator. |

---

## What NOT to Build

| Skip | Why |
|------|-----|
| AI chat/Q&A | Risk of errors in religious content |
| Audio recitation | Other apps do this better; not our focus |
| Global map | Dilutes geographic focus |
| Gamification/Quiz modes | Trivializes sacred content |
| User accounts | Adds complexity; localStorage sufficient |
| Leaderboards | Inappropriate for sacred content |
