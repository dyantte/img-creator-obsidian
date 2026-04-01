# Ad Scraper

## Overview
Ad scraping and analysis tool. Scrapes ads, processes them with AI (Anthropic Claude + Google Vision + Gemini), stores in SQLite, and serves through a web UI.

- **Tech:** Node.js (ESM), Better-SQLite3, Anthropic SDK, Google Cloud Vision, Gemini, Sentry for monitoring
- **Local path:** `C:\Users\DIANA\Downloads\SCRAPER`
- **UI:** `ad-scraper-ui/` subfolder (Express server)
- **Status:** Active development

## Architecture Rules (from standards.md)
- **Every file does one thing, stays under 150 lines**
- **Route → Service → Data layer separation:**
  - Route layer: HTTP only, ~20-30 lines
  - Service layer: business logic, no HTTP knowledge
  - Data layer: database queries only, no business logic
- **Frontend is completely dumb** — no logic in React, backend sends exactly what frontend displays
- **Structured logging and observability** are priorities
- **No mocking the database in tests** — use real database

## Key Files
- `standards.md` — engineering standards (code structure, architecture rules)
- `ad-scraper-ui/server.js` — main Express server
- `ad-scraper-ui/instrument.js` — Sentry instrumentation
- `package.json` — dependencies and scripts
- `data/` — data storage
- `ad-scraper-491005-c7d18250ecbe.json` — GCP service account key

## Running
```bash
npm start  # runs with Sentry instrumentation
npm test   # vitest
```

## Notes

