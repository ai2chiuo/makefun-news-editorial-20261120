# Fault lines & lifelines

A revised original editorial cover for **20 November 2026**, retaining the first edition in Git history. Six scenes share one world and river-stage: AI-stock selloff, reported nuclear talks, Kyiv bridge strikes, disputed COP31 draft, UNICEF's Gaza campaign, and Alcaraz's Turin result. The shared composition does not assert causal links.

The revision uses specific actors, actions and places rather than generic labels. The revised nuclear scene shows one symbolic speaker and an AP report, not a three-leader summit. The microphone is an editorial metaphor for reported remarks, not a documented venue or press event. Kyiv includes the mayor's attribution and Reuters' verification limit. The sports scene is the group-stage result, not a tournament victory. Children have dignified movement and space without graphic harm.

## Run
`node main.ts` copies the shipped JPEG to `/output/entry.png`. JPEG bytes are allowed under that contract name. Set `MAKEFUN_OUTPUT_DIR` for local output. Standard library only, no network.

## Reproduce
`node art/render.mjs` writes the original procedural SVG and renders `art/edition.jpg` with real local headless Chrome. Seeded texture and SVG primitives; no photos, clip art, downloaded fonts or image-generation services. Generic serif/sans-serif fonts resolve locally and are not distributed. Repository paths resolve relative to the source file.

Tool paths come from `MAKEFUN_ENV`, defaulting to the supplied public environment.json. On another machine provide JSON with local `playwright_module` and `chrome_executable`. Playwright is a local development/test dependency only; main.ts needs none.

## Test
`node tests/acceptance.mjs` first rebuilds the ignored SVG and JPEG from original source and compares the JPEG with the shipped bytes, then checks two fresh output runs for exact bytes, artifact naming, JPEG signature/end marker, byte cap, full Chrome decoding and dimensions. It also opens the SVG offline, rejects external resource requests and compares its Chrome rendering with the shipped JPEG. Rendering twice is additionally checked during development for seeded reproducibility.

See SOURCES.md for dated evidence and caveats. MIT licensed. Authorized host handles free submission separately; this code accesses no account APIs.

## Feedback-led round 1
The best graded edition remains in Git at a7ecf5c (official provisional 97.7198; supplied current cutoff 98.9221). This round replaces the ambiguous three-leader table with Trump discussing China's nuclear expansion, with reported talks explicitly following an earlier meeting. COP31 now shows delegates seeking draft revisions, not just energy symbols. The host obtains the next official score and retains the highest-scoring version; no improvement in score is claimed before that result.

## Craft revision from official 97.9552 feedback
This round keeps the same six verified developments and replaces the foreground stick figures with individually drawn clothed children passing a ball and an athletic tennis player with articulated limbs, connected racket grip, facial details and ground shadows. The speaker and climate delegates gain face, lapel and sleeve shading. A redundant small nuclear-talks label was removed to reduce crowding; the full report caption remains. These are symbolic illustrations, not documentary portraits or claims about actual clothing, handedness or a specific photographed moment. The last officially graded best remains 3788786 (97.9552), below the supplied cutoff 98.9288. The new candidate has no official score until the host grades it.

## Craft round 2: market action and spatial hierarchy
The previous craft candidate scored 97.8389, so the officially best 97.9552 edition at 3788786 remains preserved in history. This new candidate adds an original analyst studying the falling semiconductor-market display, an angled desk and report, layered bridge decks with cable detail and a subdued far bank, and a stronger dateline. COP31's caption now states the demand for stronger terms directly. No new events or factual claims are introduced. The host, not this build, determines whether a new official score exceeds the supplied 98.9288 cutoff.
