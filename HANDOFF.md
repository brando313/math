# Fact Board — handoff state

Snapshot taken 25 July 2026. Upload this zip at the start of a new chat and point at
this file.

## Current build

- Service worker cache: **factboard-v80**
- `index.html` is ~1.9 MB, all CSS and JS inline, three `<script>` blocks
- `sw.js` is a cache-first service worker, precache list must match the roster exactly
- Both files pass `node --check` as of this snapshot

## Modules

Twelve session types, keyed by the `op` value: `mult`, `div`, `add`, `sub`, `usa`,
`canada`, `countries`, `eagles`, `penguins`, `heroes`, `story`, `forge`.

Six screens: `home`, `session`, `done`, `reports`, `heroSelect`, `heroPreview`.

## Assets

| folder | files |
|---|---|
| flags | 63 |
| birds | 63 |
| worldflags | 197 |
| eagles | 21 |
| penguins | 18 |
| heroes | 148 |

**There is no `sounds/` folder in this zip.** `sw.js` precaches 39 mp3s under
`sounds/` for the eagle and penguin calls. If those files are already in the GitHub
repo they are fine, since only touched files get rebuilt here. If they were never
uploaded, those calls are silent on the iPads. Worth confirming once.

## Hero Stories

**151 heroes, 906 questions, 148 portraits.** Every hero has 3 beginner and 3
advanced questions. The first option in each `opts` array is the correct answer.

Categories, in roster order:

| category | heroes | portraits |
|---|---|---|
| Leaders & Pioneers | 33 | 31 |
| Rulers & Warriors | 8 | 8 |
| Builders & Founders | 10 | 9 |
| Hockey Legends | 21 | 21 |
| Sports Stars | 22 | 22 |
| Icons & Artists | 8 | 8 |
| Screen & Stage | 31 | 31 |
| Music Makers | 18 | 18 |

**Three portraits outstanding:** `edison`, `vanhorne`, `ysl`. Prompts are in
`firefly-prompts-remaining3.txt` in this zip.

Heroes are declared in `const HEROES` plus `HEROES_B1` through `HEROES_B15`, each
pushed onto `HEROES`. `HERO_CATS` maps category names to id lists and the render loop
is fully generic, so a new category needs no other code change. Adding heroes means
three edits: a new batch array spliced in before `const HERO_CATS`, the ids added to a
category, and the ids appended to `HEROPICS` in `sw.js`.

## Codebase constraints

These are load-bearing. Verified against this build.

- **No `confirm()` or `alert()`.** Zero occurrences. They are sandbox-blocked on the
  iPads. Destructive actions use a tap-twice red "armed" pattern with a 3 second
  revert.
- **`getBBox()` fails under `display:none`** and needs a guard. Five call sites.
- **`speechSynthesis.cancel()` on every `showScreen()` transition.** Three call sites.
- **`speakThen(text, cb, minDelay, maxWait)`** gates advancement on speech ending,
  waiting `max(minDisplay, speechEnd)` capped at 7 seconds.
- **Bump the `CACHE` string in `sw.js` on every single deploy.** Without it the iPads
  keep serving the old build.
- Missing image files never break install: the worker uses `Promise.allSettled` over
  individual `cache.add` calls, so absent portraits fail silently.

## Portrait pipeline

Firefly outputs 848x1264 PNG. Intake resizes to **exactly 640x953, JPEG quality 84,
optimize on**, saved as `heroes/<id>.jpg`. All 148 match that spec.

When several uploads match the same id, take the **newest by mtime**, not the first
alphabetically. An older duplicate nearly got shipped this session.

Audit to run after every batch: every file opens and verifies, every file is 640x953,
nothing under 20 KB, no orphan files in `heroes/`, and `HEROPICS` in `sw.js` matches
the roster ids exactly in both directions.

## Firefly prompt format

Master format, swap only the bracketed parts:

```
Dramatic comic book portrait of [PERSON], [APPEARANCE / CLOTHING AND ARTIFACTS],
[NOTABLE BACKGROUND / VENUE] heroic three-quarter view, bold heavy ink linework, deep
chiaroscuro shadows, fine cross-hatching, strong rim lighting, dark textured
background, dignified and inspiring expression, historically accurate likeness and
clothing, rich muted color palette, graphic novel cover art. Output dimensions need to
be 848 x 1264 pixels at 96dpi / portrait orientation, 2:3 aspect ratio
```

Two rules learned the hard way this session:

1. **State hair color and era explicitly, every time.** Firefly drifts badly on both,
   worst on women.
2. **Do not tell it to omit text. Describe the surfaces as blank instead.** "No
   signage" gets ignored; "plain unmarked walls, blank awnings, empty picture frames"
   works. Confirmed on Eddie Murphy and Drake after failures on Churchill, Gordy,
   Douglas, and Jack Ma.

## Open items

- **Verstappen needs a redo.** Firefly ignored the no-logo instruction completely and
  returned Red Bull, Oracle, Visa, AT&T, Mobil 1, Puma, Bybit, Tag Heuer and Ford across
  the suit and car. It is the only card of 148 covered in commercial branding, and it is
  dense small text on a card for early readers. The fix is to change the scene, not add
  more negations: put him alone on an empty test circuit with no car and no garage, so
  there is no surface for a logo. Replacement prompt is in the remaining-3 file.
- **Jack Ma** has garbled box labels reading "HAREWA EQUIPMENT" and a misspelled
  "ALIBABA.COM OFFICE". Misspelled words are the kind of thing a child learning to
  decode will stop on. Candidate for a redo.
- **Sun Tzu** has the word "STRATEGY" floating unattached in the sky. A defect, not set
  dressing.
- **Dave Bing** rendered as two figures in one frame, the young player and an older man
  in a suit. It reads as player-then-mayor, which is accurate to his life, but it was
  not asked for and it is the only card with two versions of one person.
- **Sean Connery** has a martini glass Firefly added on its own. Only card of 148 with a
  drink in it.
- **Sean Connery's story** ends with an honesty line about interviews where he defended
  hitting women. Flagged twice, never resolved. Still in the build.
- **Hercules** came back wearing a jersey reading HERCULES. Unrequested, but it solves
  the problem that the card is a dog and the name appears nowhere else. Recommend
  keeping.

## Deploy

1. Unzip. You get `index.html`, `sw.js`, `README.md`, this file, the prompts file, and
   the folders `flags/`, `birds/`, `worldflags/`, `eagles/`, `penguins/`, `heroes/`.
2. In the `fact-board` repo: Add file, Upload files, drag everything in preserving
   folder structure, commit.
3. Wait a minute or two for Pages to redeploy.
4. On each iPad, open the app over wifi and leave it open a minute so the new worker
   caches the images.
5. Force-quit and reopen once. Updates activate on the second launch.
6. Spot-check before travelling: open one hero card and one map card and confirm the
   portrait and flag appear. If they do, the cache is complete and airplane mode is safe.
