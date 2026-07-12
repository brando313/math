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
- The timer counts time while the app is on screen and pauses automatically when the app is backgrounded or the iPad locks, so a gas stop doesn't inflate the session length.
- "Erase all data on this iPad" is at the bottom of the Reports screen if you ever want a clean slate.
- To update the app later, replace the files on the host and bump the cache name in `sw.js` (change `factboard-v1` to `factboard-v2`), then reopen once on wifi.

## Bird photos (optional)

The geography prompt shows a bird photo when a file named `birds/<id>.jpg` exists next to `index.html`.
Create a `birds` folder in the repo and add square-ish JPGs (about 300x300px is plenty).
Missing photos are skipped gracefully; the bird's name always shows either way.
The service worker pre-caches every bird photo it finds, so they work offline after one wifi visit.

Filename | Region | Bird
---|---|---
birds/al.jpg | Alabama | Yellowhammer
birds/ak.jpg | Alaska | Willow Ptarmigan
birds/az.jpg | Arizona | Cactus Wren
birds/ar.jpg | Arkansas | Northern Mockingbird
birds/ca.jpg | California | California Quail
birds/co.jpg | Colorado | Lark Bunting
birds/ct.jpg | Connecticut | American Robin
birds/de.jpg | Delaware | Delaware Blue Hen
birds/fl.jpg | Florida | Northern Mockingbird
birds/ga.jpg | Georgia | Brown Thrasher
birds/hi.jpg | Hawaii | Nene (Hawaiian Goose)
birds/id.jpg | Idaho | Mountain Bluebird
birds/il.jpg | Illinois | Northern Cardinal
birds/in.jpg | Indiana | Northern Cardinal
birds/ia.jpg | Iowa | American Goldfinch
birds/ks.jpg | Kansas | Western Meadowlark
birds/ky.jpg | Kentucky | Northern Cardinal
birds/la.jpg | Louisiana | Brown Pelican
birds/me.jpg | Maine | Black-capped Chickadee
birds/md.jpg | Maryland | Baltimore Oriole
birds/ma.jpg | Massachusetts | Black-capped Chickadee
birds/mi.jpg | Michigan | American Robin
birds/mn.jpg | Minnesota | Common Loon
birds/ms.jpg | Mississippi | Northern Mockingbird
birds/mo.jpg | Missouri | Eastern Bluebird
birds/mt.jpg | Montana | Western Meadowlark
birds/ne.jpg | Nebraska | Western Meadowlark
birds/nv.jpg | Nevada | Mountain Bluebird
birds/nh.jpg | New Hampshire | Purple Finch
birds/nj.jpg | New Jersey | American Goldfinch
birds/nm.jpg | New Mexico | Greater Roadrunner
birds/ny.jpg | New York | Eastern Bluebird
birds/nc.jpg | North Carolina | Northern Cardinal
birds/nd.jpg | North Dakota | Western Meadowlark
birds/oh.jpg | Ohio | Northern Cardinal
birds/ok.jpg | Oklahoma | Scissor-tailed Flycatcher
birds/or.jpg | Oregon | Western Meadowlark
birds/pa.jpg | Pennsylvania | Ruffed Grouse
birds/ri.jpg | Rhode Island | Rhode Island Red
birds/sc.jpg | South Carolina | Carolina Wren
birds/sd.jpg | South Dakota | Ring-necked Pheasant
birds/tn.jpg | Tennessee | Northern Mockingbird
birds/tx.jpg | Texas | Northern Mockingbird
birds/ut.jpg | Utah | California Gull
birds/vt.jpg | Vermont | Hermit Thrush
birds/va.jpg | Virginia | Northern Cardinal
birds/wa.jpg | Washington | American Goldfinch
birds/wv.jpg | West Virginia | Northern Cardinal
birds/wi.jpg | Wisconsin | American Robin
birds/wy.jpg | Wyoming | Western Meadowlark
birds/ab.jpg | Alberta | Great Horned Owl
birds/bc.jpg | British Columbia | Steller's Jay
birds/mb.jpg | Manitoba | Great Grey Owl
birds/nb.jpg | New Brunswick | Black-capped Chickadee
birds/nl.jpg | Newfoundland and Labrador | Atlantic Puffin
birds/nt.jpg | Northwest Territories | Gyrfalcon
birds/ns.jpg | Nova Scotia | Osprey
birds/nu.jpg | Nunavut | Rock Ptarmigan
birds/on.jpg | Ontario | Common Loon
birds/pe.jpg | Prince Edward Island | Blue Jay
birds/qc.jpg | Quebec | Snowy Owl
birds/sk.jpg | Saskatchewan | Sharp-tailed Grouse
birds/yt.jpg | Yukon | Common Raven

## Flag images (optional)

Same pattern as birds: create a `flags` folder next to `index.html` and add `flags/<id>.png`
for any region (e.g. `flags/mi.png` for Michigan, `flags/on.png` for Ontario). A flag card
appears in the geography prompt when the file exists and hides when it doesn't. The service
worker pre-caches them for offline use after one wifi visit. Region ids are the same as the
bird filenames in the table above.

## Bird illustrations

Every region has a built-in stylized bird illustration (embedded SVG, works offline with no
extra files). A real photo in `birds/<id>.jpg` automatically replaces the illustration for
that region.

## Penguins quiz

Penguin pictures live in the `penguins` folder (included). Optional: add real penguin
call recordings as `sounds/<id>.mp3` (e.g. `sounds/emperor.mp3`) and they'll play on
a reveal instead of the built-in synthesized honk. Ids: adelie, african, chinstrap,
emperor, erectcrested, fiordland, galapagos, gentoo, humboldt, king, littleblue,
macaroni, magellanic, srockhopper, nrockhopper, royal, snares, yelloweyed.

## Eagles quiz

Eagle pictures live in the `eagles` folder (included). Optional real calls: add
`sounds/<id>.mp3` (e.g. `sounds/bald.mp3`). Ids: whitetailed, booted, blackhawk, bald,
golden, little, philippine, stellerssea, bateleur, crowned, martial, africanfish,
crested, harpy, andamanserpent, brownsnake, papuanharpy, chaco, solitary,
madagascarfish, longcrested.

## Countries quiz

Tap the Countries button, pick a continent, and name every country on its map —
197 countries across six continents, plus Antarctica as a one-tap bonus round.
Country flags live in the `worldflags` folder (included). Capitals are built in.
