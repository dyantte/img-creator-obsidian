# Vault System — CLAUDE.md

This is Diana's central Obsidian vault. It serves as persistent memory across all projects and conversations.

## Vault Structure

```
Daily/              — Daily notes (YYYY-MM-DD format)
Projects/           — Context files for each active project
Templates/          — Note templates
scripts/            — Auto-sync and utility scripts
```

## Active Projects

- **IMG Creator Max** — Next.js image generation platform for scroll-stopping social media visuals. Uses an agent pipeline (Copy Analyst → Creative Director → Prompt Engineer → Quality Gate). Located at `C:\Users\DIANA\Downloads\IMG CREATOR MAX`
- **Ad Scraper** — Node.js ad scraping tool with UI. Uses SQLite, Anthropic SDK, Google Vision. Located at `C:\Users\DIANA\Downloads\SCRAPER`

## How This Vault Works

1. **Diana writes all vault notes.** Claude reads but does NOT create files in the vault unless Diana explicitly asks. This keeps the vault as a pure reflection of Diana's thinking — not the AI's.
2. **Slash commands** (in `.claude/commands/`) give Claude structured ways to interact with the vault — reading daily notes, surfacing patterns, generating ideas, etc.
3. **Project context files** (in `Projects/`) give Claude deep context about each project so Diana doesn't have to re-explain things every session.
4. **Daily notes** are where Diana logs focus, notes, and tasks each day. These accumulate into a rich history that commands like `/ideas`, `/trace`, and `/drift` can analyze.

## Rules

- Always read the relevant project context file before working on a project
- Never write files into this vault unless Diana explicitly asks
- Use `[[double brackets]]` when referencing other vault notes in output
- When surfacing patterns, always cite which daily notes or files the pattern comes from
- Keep vault content as Diana's voice, not Claude's

## Vault Path

`C:\Users\DIANA\Documents\img-creator-obsidian`
