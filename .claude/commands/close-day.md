# /close-day — End of day processing

End of day wrap-up. Extract what happened today, surface connections, and set up tomorrow.

## Steps

1. Read today's daily note from `Daily/`
2. Read any files that were linked or mentioned today
3. Scan the full vault for connections to today's topics

## Output

Append to today's daily note:

```
## End of Day Review
### What got done
- [completed items]

### What didn't get done (and why)
- [incomplete items with brief note]

### Vault connections surfaced
- [any interesting links between today's work and other vault notes]

### Tomorrow's suggested focus
- [based on momentum and incomplete items]
```

Be honest about what didn't happen. Don't sugarcoat. The point is to build an accurate record, not a feel-good summary.
