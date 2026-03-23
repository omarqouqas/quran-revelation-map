# Quran Revelation Map

An interactive educational platform that visualizes the 23-year journey of Quran revelation, helping Muslims understand when, where, and why each surah was revealed.

## Vision

> "Understand the Quran more deeply by learning when, where, and why each surah was revealed."

This is **not** a Quran reader or recitation app. It's an educational tool focused on the *context* of revelation - connecting surahs to their historical moments, geographic locations, and the circumstances of the early Muslim community.

## Features

### Currently Available
- **Interactive Timeline** - Explore revelation chronologically from 610-632 CE
- **Geographic Map** - Hijaz region with sacred site markers (Makkah, Madinah, Cave Hira, etc.)
- **Surah Explorer** - View all 114 surahs with revelation order and context
- **Age Explorer** - Enter your age to see what was revealed at that age in the Prophet's life
- **Sacred Site Modals** - Click locations to see related events and surahs
- **Revelation Order Comparison** - Compare Quran order vs revelation order
- **Shareable Cards** - Generate beautiful cards for surahs, events, and sites
- **Atmospheric Visuals** - Time-of-day effects synced to timeline

### In Development
See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for the full roadmap.

**Next priorities:**
1. Guided Learning Paths (structured courses through revelation history)
2. Enhanced Surah Context (themes, insights, reflection prompts)
3. Progress Tracking (track your learning journey)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Maps**: Mapbox GL JS
- **State**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Mapbox token to .env.local

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
│   ├── map/             # Map, markers, video background
│   ├── share/           # Share cards and modal
│   └── timeline/        # Timeline slider
├── data/
│   ├── events.ts        # Historical events
│   ├── surah-locations.ts # Surah data with locations
│   └── sacred-sites.ts  # Sacred site information
├── hooks/               # Custom React hooks
└── stores/              # Zustand state management
```

## Documentation

- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Detailed roadmap and feature specs

## License

Private - All rights reserved
