# Merge Conflict Resolution Summary

## Context
When attempting to apply stashed changes to [Home.tsx](Home.tsx), a merge conflict occurred because the file had been modified since the stash was created.

## Conflict Details
The conflict was in the "Yogi Application Walkthrough" section, specifically on the sentence:
> "You will first experience Yogi v1, then continue to Yogi v2."

### Conflicting Versions
- **Updated upstream (current):** Basic `<strong>` tag without additional styling
- **Stashed changes:** Enhanced `<strong>` tag with `className="text-foreground"` for improved visibility

## Resolution Strategy
Chose the **stashed changes version** because it provides better visual emphasis by:
1. Making the sentence bold (`<strong>` tag)
2. Using `text-foreground` color class to make it darker and more prominent against the muted paragraph text

This aligns with the original user request to "make this sentence pop a bit more."

## Result
The final implementation uses:
```tsx
<strong className="text-foreground">You will first experience Yogi v1, then continue to Yogi v2.</strong>
```

This provides maximum contrast and draws user attention to the important sequential instruction.