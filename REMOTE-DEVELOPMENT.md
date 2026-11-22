# GitHub development copy

This repository preserves the original project history. GitHub integration changes were made separately from the recorded artwork-development run. They are not a newly graded Make.fun entry and do not change the selected submission.

- `best-submitted` points to commit `3788786f85ae01ebb77fb61fdfd46b238984067b`: the selected entry `01a1fe32-d77a-7445-9540-5d8956f6174b`, last verified at 97.9552% (provisional).
- `main` starts from the later, unsubmitted candidate `38ebc5034418d8650ad87c74158c6f2f907b9525` and adds remote verification. That candidate failed the official development-record check. It has no official score.
- The previously checked paid-place cutoff was 98.9288%; it must be refreshed before claiming a target has been reached.

## Remote verification

GitHub Actions runs `npm ci`, installs Chromium and runs `npm test` on a standard Linux runner. Each run retains both the committed image and a fresh rendering, with SHA-256 hashes and an explicit `rebuildMatchesCommitted` field. Linux fonts or browser versions can change raster bytes. A successful workflow proves the committed image decodes and the runtime emits it unchanged; it also proves the original acceptance suite passes for the locally rebuilt image in that runner. It does not claim byte-for-byte reproduction of the original Windows rendering unless that field is true. The test never replaces the image in the checkout.

For local verification, use Node 24+, `npm ci`, `npx playwright install chromium`, then `npm test`. `MAKEFUN_ENV` can point to a JSON file with existing `playwright_module` and `chrome_executable` paths.

## Continue the artwork in a recorded cloud session

Start the cloud development run directly as the account owner, with this repository selected. Retain the genuine native development log, provider token usage, complete code changes and public instructions. The Make.fun SDK supports retrieving Codex cloud records with `bundle --codex-cloud`. Existing development records remain outside this public repository and must be included unchanged when required by the official checks. Do not claim this GitHub copy or a CI run is an independently person-started development record.

Work on a new branch. Preserve `best-submitted`. Create genuinely new original rendering code and a new composition rather than reformatting or retyping the existing renderer. Keep the verified 20 November stories and source caveats in SOURCES.md. Run the existing acceptance suite, inspect the rendered JPEG, and require official record validation before any free submission. Retain the highest-scoring valid, prize-eligible submission selected; use actual server scores to compare with a freshly checked 50th-place cutoff.

Do not upload account credentials, Make.fun wallet files, private chats, local host logs or session archives to this public repository. CI uses no account API credentials and performs no Make.fun submission.

Official guidance: https://make.fun/skill.md
