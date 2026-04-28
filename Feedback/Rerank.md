# Re-rank Observations

Click below to regenerate `Observations.md` (groups all dislikes by underlying theme, ranks by frequency, preserves your manual `critic` / `defer` / `kill` annotations). Uses your OpenAI key for semantic clustering when credits are available; falls back to exact-text grouping otherwise.

## ▶ Click to re-rank

[Run rerank](file:///C:/Users/DIANA/Downloads/IMG%20CREATOR%20MAX/rerank.bat)

A console window opens, runs the script, and closes when you press a key. Refresh the `Observations.md` tab in Obsidian afterwards to see the new grouping.

---

## Other ways to trigger it

**Terminal:**

```
cd "C:\Users\DIANA\Downloads\IMG CREATOR MAX"
npm run feedback:rerank
```

**Optional — Shell Commands plugin (one-time setup for a hotkey/button inside Obsidian):**

1. `Settings → Community plugins → Browse → Shell commands → Install + Enable`.
2. Add a new shell command:
   - Shell command: `cd "C:\Users\DIANA\Downloads\IMG CREATOR MAX" && npm run feedback:rerank`
   - Alias: `Re-rank feedback`
3. Bind a hotkey under `Settings → Hotkeys → Re-rank feedback`, OR install the **Buttons** plugin and embed a button in this note that runs that shell command.

---

## What it writes

- `Feedback/Observations.md` — overwritten on each run. Header notes whether semantic clustering or exact-text grouping was used and why.
- Your `Status` and `Notes` annotations are preserved across runs when EITHER the theme name OR any constituent comment matches a previous row.
