# Quran Revelation Map

An interactive educational platform that visualizes the 23-year journey of Quran revelation, helping Muslims understand when, where, and why each surah was revealed.

## Vision

> "Understand the Quran more deeply by learning when, where, and why each surah was revealed."

This is **not** a Quran reader or recitation app. It's an educational tool focused on the *context* of revelation - connecting surahs to their historical moments, geographic locations, and the circumstances of the early Muslim community.

## Features

### Currently Available
- **Learning Paths** - 11 structured courses (44 lessons) covering the entire revelation journey
  - 7 chronological paths: The Beginning, Persecution & Patience, The Turning Point, The Hijra, Building the Ummah, Trials & Triumph, Victory & Completion
  - 4 thematic paths: Surahs of Comfort, Stories of the Prophets, Makki vs Madani, The Night Surahs
  - Progress tracking saved locally
- **Timeline Learning Mode** - "What Was Happening" panel showing historical context as you navigate the timeline
  - 6 sub-periods with context narratives (Early/Middle/Late Makkan, Early/Middle/Late Madinan)
  - Prophet's age, events, surahs, and themes for each year
- **Enhanced Surah Data** - All 114 surahs with detailed circumstances (Asbab al-Nuzul), themes with explanations, learning insights, reflection prompts, and related surah links
- **Interactive Timeline** - Explore revelation chronologically from 610-632 CE
- **Geographic Map** - Hijaz region with sacred site markers (Makkah, Madinah, Cave Hira, etc.)
- **Global Search** - Unified search (Cmd/Ctrl+K) across surahs, events, and sacred sites
  - Keyboard navigation with arrow keys, Enter to select
  - "Browse All 114 Surahs" link opens detailed Surah Explorer
- **Surah Explorer** - Filter and browse all 114 surahs by period, year, themes, and locations
- **Age Explorer** - Enter your age to see what was revealed at that age in the Prophet's life
- **Sacred Site Modals** - Click locations to see related events and surahs
- **Revelation Order Comparison** - Compare Quran order vs revelation order
- **Shareable Cards** - Generate beautiful cards for surahs, events, and sites
- **Atmospheric Visuals** - Time-of-day effects synced to timeline

### In Development
See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for the full roadmap.

**Next priorities:**
1. Bookmarks & Notes

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Maps**: Mapbox GL JS
- **State**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Analytics**: PostHog

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Mapbox token and PostHog key to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/                  # Next.js app router
├── components/
│   ├── layout/          # Modals, panels, UI structure
│   ├── learning/        # Learning paths, lessons, navigation
│   ├── map/             # Map, markers, video background
│   ├── search/          # Global search modal
│   ├── share/           # Share cards and modal
│   └── timeline/        # Timeline slider
├── data/
│   ├── events.ts        # Historical events
│   ├── learning-paths.ts # Learning path definitions (11 paths, 44 lessons)
│   ├── enhanced-surah-data.ts # Deep surah context (all 114 surahs)
│   ├── surah-locations.ts # Surah data with locations
│   └── sacred-sites.ts  # Sacred site information
├── hooks/               # Custom React hooks
└── stores/              # Zustand state management
```

## Documentation

- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Detailed roadmap and feature specs

## License

Private - All rights reserved
