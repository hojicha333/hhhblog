# Project Instructions

## Product intent

This is a curated personal magazine, not a public raw-notes vault. Preserve its three-part direction:

- Editorial homepage and visual tone
- Stable room-based information architecture
- Evidence-oriented project and research pages

The site must remain static, portable, inexpensive, and easy to publish from Markdown.

## Source boundaries

- `content/` is the canonical authoring source.
- Never hand-edit `.generated/`, `public/content-media/`, or `dist/`.
- `scripts/prepare-content.mjs` may read and copy canonical content but must never mutate it.
- Keep questionnaire exports and design briefs at the repository root unless the owner requests otherwise.

## Engineering constraints

- Prefer Astro components and build-time data over client JavaScript.
- Do not add a database, CMS, analytics, comments, accounts, or external runtime API without an explicit product decision.
- Avoid dependencies for behavior that can be expressed clearly with the existing stack.
- Preserve static output and platform portability.
- Do not invent biographical claims, project outcomes, affiliations, awards, or research results.
- Mark placeholder copy as sample content.

## Visual constraints

- Keep dark mode as the default while supporting a complete light theme.
- Use neutral foundations and the existing coral, green, yellow, and blue signal colors.
- Preserve editorial typography and restrained motion.
- Avoid gradients, decorative blobs, excessive rounding, nested cards, and dashboard styling outside project/research contexts.
- Verify desktop and mobile layout, keyboard focus, reduced motion, and horizontal overflow after visual changes.

## Required checks

Run these before handing off code changes:

```bash
npm run check
npm run build
```

For visual changes, also inspect the built site at desktop and 390px mobile widths.
