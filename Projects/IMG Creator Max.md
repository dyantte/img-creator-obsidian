# IMG Creator Max

## Overview
Image generation platform for scroll-stopping social media visuals using Documentary Realism. Generates UGC-style (user-generated content) ad images that look authentic, not polished.

- **Tech:** Next.js 16.1.6, React 19, SQLite + Drizzle ORM, Tailwind CSS 4, shadcn/ui, bcryptjs auth, OpenAI API
- **Local path:** `C:\Users\DIANA\Downloads\IMG CREATOR MAX`
- **Status:** Active development

## Pipeline
Auth → Brief → Copy Analysis → Style Selection → Image Generation → Review → Upscale

## Agent Architecture (4-agent pipeline)
1. **Copy Analyst** — Understands the ad copy, extracts emotional arc, target audience, product promise
2. **Creative Director** — Designs the visual scene based on copy analysis
3. **Prompt Engineer** — Builds the technical prompt for image generation
4. **Quality Gate** — Validates prompt before sending to generation

Each agent has its own prompt file in `src/lib/agents/prompts/`.

## Core Principles
- **Photorealistic UGC** — iPhone camera quality, NOT DSLR. Imperfect framing, natural lighting
- **Real human skin** — pores, wrinkles, stretch marks. Zero glamour
- **Lived-in environments** — messy bathrooms, cluttered desks, real kitchens
- **No branding, no text in images** — pure visual direction only
- **Documentary Realism** style throughout

## Key Files
- `AGENT_ARCHITECTURE.md` — full agent pipeline design and contracts
- `IMAGE_PROMPT_RULES.md` — all rules for prompt construction (UGC, shot types, 20 concept styles, color psychology)
- `STYLE_DOCS.md` — style documentation
- `WORKFLOW.txt` — complete workflow from auth to upscale
- `FLUX_PHASE_DOCS.md` — Flux image generation phases
- `src/lib/agents/` — agent implementations and prompts
- `src/lib/schema.ts` — database schema (DO NOT MODIFY)
- `src/lib/constants.ts` — style constants and ratio definitions
- `src/lib/providers/registry.ts` — image provider registry

## What NOT to Touch
- Authentication (auth routes, middleware, sessions, bcryptjs)
- Database schema
- UI components (creation-panel, grid, library, bookmarks)
- SSE progress tracking
- Style constants and ratio definitions
- Provider registry
- Distribution logic

## Notes

