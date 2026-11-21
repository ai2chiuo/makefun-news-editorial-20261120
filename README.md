# A world in the balance

Original editorial print for world news of **20 November 2026**. Four stories share a globe and stage without asserting causation. The chip, empty negotiating table, open climate draft and play space are symbolic.

## Run
`node main.ts` copies the shipped JPEG to `/output/entry.png` (JPEG bytes are permitted under that contract filename). Set `MAKEFUN_OUTPUT_DIR` for local output. Runtime uses only Node standard libraries, no network.

## Reproduce
`node art/render.mjs` creates the original procedural SVG and renders `art/edition.jpg` with local headless Chrome. Seeded paper texture, SVG primitives and locally available generic serif/sans-serif fonts only; no photos, clip art, downloaded fonts or image-generation services. Rendering reads verified tool paths from `MAKEFUN_ENV`, defaulting to the supplied public environment.json. For another machine provide that JSON with local `playwright_module` and `chrome_executable` paths. No dependency is shipped or needed by main.ts.

## Test
`node tests/acceptance.mjs` runs main.ts twice into fresh temporary directories, compares exact bytes with the asset, checks artifact naming, JPEG signature/end marker, byte cap and dimensions, then fully decodes and draws the image with Chrome. Testing needs the same local browser tooling as rendering.

See SOURCES.md for research limitations. MIT licensed. Authorized host handles submission separately; this program accesses no account APIs.
