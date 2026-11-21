# Fault lines & lifelines

A revised original editorial cover for **20 November 2026**, retaining the first edition in Git history. Six scenes share one world and river-stage: AI-stock selloff, reported nuclear talks, Kyiv bridge strikes, disputed COP31 draft, UNICEF's Gaza campaign, and Alcaraz's Turin result. The shared composition does not assert causal links.

The revision uses specific actors, actions and places rather than generic labels. Three diplomats are symbolic retrospective figures, not a summit on this date. Kyiv includes the mayor's attribution and Reuters' verification limit. The sports scene is the group-stage result, not a tournament victory. Children have dignified movement and space without graphic harm.

## Run
`node main.ts` copies the shipped JPEG to `/output/entry.png`. JPEG bytes are allowed under that contract name. Set `MAKEFUN_OUTPUT_DIR` for local output. Standard library only, no network.

## Reproduce
`node art/render.mjs` writes the original procedural SVG and renders `art/edition.jpg` with real local headless Chrome. Seeded texture and SVG primitives; no photos, clip art, downloaded fonts or image-generation services. Generic serif/sans-serif fonts resolve locally and are not distributed. Repository paths resolve relative to the source file.

Tool paths come from `MAKEFUN_ENV`, defaulting to the supplied public environment.json. On another machine provide JSON with local `playwright_module` and `chrome_executable`. Playwright is a local development/test dependency only; main.ts needs none.

## Test
`node tests/acceptance.mjs` checks two fresh output runs for exact bytes, artifact naming, JPEG signature/end marker, byte cap, full Chrome decoding and dimensions. It also opens the SVG offline, rejects external resource requests and compares its Chrome rendering with the shipped JPEG. Rendering twice is additionally checked during development for seeded reproducibility.

See SOURCES.md for dated evidence and caveats. MIT licensed. Authorized host handles free submission separately; this code accesses no account APIs.
