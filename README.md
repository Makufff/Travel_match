# Travel Match

A travel discovery web app that lets users swipe through destinations in Chiang Mai, Chiang Rai, and Nan — save favourites, plan personalised trips, and earn coins along the way.

## Features

### ✈️ Travel Discovery
- **Tinder-style Swipe** — browse destinations and like or skip
- **Gallery** — view and manage saved places
- **Trip Planner** — plan routes with personality modes (temple lover, nature explorer, etc.)
- **Travel Companion** — track an active journey and earn coins for visiting places

### 🪙 Coin System
- Earn coins by completing journeys and visiting places
- Redeem coins for rewards on the Rewards page

### 🗺️ Map & Routing
- Interactive Leaflet map with route polylines
- Personality-based place filtering

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open `http://localhost:5173` in your browser — no login required.

## Project Structure

```
src/
├── App.tsx                  # App root with UserContext and splash screen
├── hooks/
│   └── useUser.ts           # User context hook and localStorage helpers
├── components/
│   ├── LaunchPage.tsx       # Home screen with carousel and province selector
│   ├── TinderPage.tsx       # Swipe interface
│   ├── GalleryPage.tsx      # Saved places
│   ├── RoutingPage.tsx      # Trip planning with map
│   ├── TravelCompanion.tsx  # Active journey tracker
│   ├── HistoryPage.tsx      # Past journeys
│   ├── CoinRewardsPage.tsx  # Rewards
│   └── AboutPage.tsx        # About
├── data/
│   └── seedData.ts          # Travel places data (CM / CR / Nan)
├── services/
│   └── mockApi.ts           # localStorage-based mock API
├── utils/
│   └── coinSystem.ts        # Coin and journey logic
└── types/
    └── TravelPlace.ts       # TypeScript interfaces
```

## User Data

All data is stored in `localStorage` — no backend required.

| Key | Description |
|---|---|
| `user_id` | Auto-generated guest ID |
| `user_displayName` | Editable display name |
| `user_pictureUrl` | Avatar URL |
| `{userId}_likedPlaces` | User's liked destinations |
| `{userId}_userProfile` | Coins and journey data |

## Technologies

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS 4** — styling
- **React Router** — navigation
- **React Leaflet** — interactive maps
- **React Spring** — swipe animations

## Provinces Covered

- 🏔️ **เชียงใหม่** (Chiang Mai)
- 🏯 **เชียงราย** (Chiang Rai)
- 🌿 **น่าน** (Nan)

## License

MIT
