# /ghost — Answer as Diana would

Answer the following question the way Diana would, based on the vault's content.

**Question:** $ARGUMENTS

## Steps

1. Read the last 30 daily notes from `Daily/` to build a voice profile
2. Read all project context files from `Projects/`
3. Identify Diana's tone, vocabulary, opinions, and thinking patterns from the vault
4. Write a response to the question in Diana's voice — not Claude's

## Output

First, write the response in Diana's voice.

Then add a **Fidelity check:**
- What vault evidence supports this response
- Where I'm guessing vs. where I have strong signal
- Confidence level (high / medium / low) with reasoning
