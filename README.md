# Fact Board — setup

Two files: `index.html` (the whole app) and `sw.js` (makes it work offline after the first visit).

## Recommended: host once, install on each iPad

1. Put both files in a free static host. GitHub Pages is the easiest: create a repo, drop both files in the root, enable Pages in repo settings. Any static host works.
2. On each iPad, while on wifi, open the URL in Safari.
3. Tap Share, then "Add to Home Screen."
4. Open it once from the home screen icon while still on wifi. From that point on it works with zero connectivity, indefinitely.

## Notes

- All data (sessions, progress, reports) is stored on the iPad itself in localStorage. Nothing leaves the device. George's results live on George's iPad, Charlie's on Charlie's.
- Both names appear on both iPads. The app remembers whoever played last, so each kid taps their name once and it stays selected.
- If a session gets interrupted (app closed, iPad sleeps, battery dies), progress is saved on every single answer. The home screen offers a Resume button, and abandoned sessions are written to Reports as Partial.
- The timer only counts active time. Pauses longer than 30 seconds (bathroom break, gas stop) don't inflate the session length.
- "Erase all data on this iPad" is at the bottom of the Reports screen if you ever want a clean slate.
- To update the app later, replace the files on the host and bump the cache name in `sw.js` (change `factboard-v1` to `factboard-v2`), then reopen once on wifi.
