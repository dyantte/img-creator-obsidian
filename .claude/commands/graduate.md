# /graduate — Turn daily note streams into structured ideas

Scan recent daily notes for ideas, insights, and recurring themes that deserve to be "graduated" into standalone vault notes.

## Steps

1. Read the last 14-30 daily notes from `Daily/`
2. Identify:
   - Explicitly tagged ideas (any mention of "idea:", "#idea", or similar markers)
   - Recurring themes that appear 3+ times across different days
   - Insights that are buried in daily notes but deserve their own note
   - Tasks or projects that have grown beyond a single line item
   - Questions I keep asking that deserve a dedicated exploration note

## Output

For each candidate idea, present:

1. **Idea name** (give it a clear title)
2. **Source** (which daily notes it appears in, with dates)
3. **Current state** (rough thought vs. developed concept)
4. **Recommendation:**
   - **Graduate** → create a standalone note in the vault (suggest where and what it should contain)
   - **Merge** → add to an existing vault note (specify which one)
   - **Dismiss** → not worth developing further (say why)

Present all candidates and let me decide. Don't auto-create any files — just show me the options.

The goal is to turn the stream of daily notes into a structured knowledge base over time, so good ideas don't get lost in the chronological flow.
