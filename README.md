# Paws & Preferences

Swipe cats like Tinder, track your likes, then see a summary gallery of everything you liked. Built with React + Vite and deployed to GitHub Pages.

## Demo
- Live: `https://tharshen1823.github.io/paws-preferences/`
- Repo: This project

## Features
- Card deck of cats from [CATAAS](https://cataas.com)
- Swipe right to like, left to skip
- Like counter + summary grid of liked cats
- Mobile-friendly responsive layout
- Zero backend

## Stack
- React 18 + Vite
- TypeScript
- [`react-tinder-card`](https://www.npmjs.com/package/react-tinder-card) for swipe gestures
- [`gh-pages`](https://www.npmjs.com/package/gh-pages) for deployment

## Quick Start
```bash
# 1) Install dependencies
npm i

# 2) Run in development mode
npm run dev

# 3) Build for production
npm run build
```
## How It Works
- makeCatUrls() generates a list of random CATAAS image URLs with fixed width and height for consistent rendering.
- useMemo caches the URL list for the session so the deck doesn’t reshuffle.
- currentIndex tracks the top card in the deck. After each swipe, it decrements.
- Right swipe appends the card’s URL to the liked list. When all cards are swiped, a summary gallery is shown.

## Credits
- Images from CATAAS
- Swipe gestures from react-tinder-card

## License
MIT — free to use, modify, and share. Keep credits.
