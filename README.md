# Saffron Match

A polished interactive demo for a cross-cultural dating app concept.

## Demo story

The seeded experience is designed to be shown on a phone in a couple of minutes:

1. Welcome
2. Create Ati's demo profile
3. Browse seeded matches
4. Open Daniel's profile
5. Send a like
6. See the "It's a Match" moment
7. Chat with Daniel
8. Plan a first coffee date
9. Explore safety / verification
10. Explore Saffron Gold and profile settings

The demo uses local state and `localStorage` only. There is no real authentication, payment processing, backend database, or live messaging yet.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS v4
- Next Image for remote demo photography
- Mobile-first responsive UI

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Product direction

This repository intentionally starts demo-first. The next phase, after validating the concept and flow, would add real authentication, profile storage, matching, messaging, moderation, and payments.
