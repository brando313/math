/* Fact Board offline cache */
const CACHE = "factboard-v31";
const ASSETS = ["./", "./index.html", "./sw.js"];
/* bird photos: cached individually so missing files never break install */
const EAGLES = ["eagles/whitetailed.jpg", "eagles/booted.jpg", "eagles/blackhawk.jpg", "eagles/bald.jpg", "eagles/golden.jpg", "eagles/little.jpg", "eagles/philippine.jpg", "eagles/stellerssea.jpg", "eagles/bateleur.jpg", "eagles/crowned.jpg", "eagles/martial.jpg", "eagles/africanfish.jpg", "eagles/crested.jpg", "eagles/harpy.jpg", "eagles/andamanserpent.jpg", "eagles/brownsnake.jpg", "eagles/papuanharpy.jpg", "eagles/chaco.jpg", "eagles/solitary.jpg", "eagles/madagascarfish.jpg", "eagles/longcrested.jpg"];
const EAGLE_SOUNDS = ["sounds/whitetailed.mp3", "sounds/booted.mp3", "sounds/blackhawk.mp3", "sounds/bald.mp3", "sounds/golden.mp3", "sounds/little.mp3", "sounds/philippine.mp3", "sounds/stellerssea.mp3", "sounds/bateleur.mp3", "sounds/crowned.mp3", "sounds/martial.mp3", "sounds/africanfish.mp3", "sounds/crested.mp3", "sounds/harpy.mp3", "sounds/andamanserpent.mp3", "sounds/brownsnake.mp3", "sounds/papuanharpy.mp3", "sounds/chaco.mp3", "sounds/solitary.mp3", "sounds/madagascarfish.mp3", "sounds/longcrested.mp3"];
const PENGUINS = ["penguins/adelie.jpg", "penguins/african.jpg", "penguins/chinstrap.jpg", "penguins/emperor.jpg", "penguins/erectcrested.jpg", "penguins/fiordland.jpg", "penguins/galapagos.jpg", "penguins/gentoo.jpg", "penguins/humboldt.jpg", "penguins/king.jpg", "penguins/littleblue.jpg", "penguins/macaroni.jpg", "penguins/magellanic.jpg", "penguins/srockhopper.jpg", "penguins/nrockhopper.jpg", "penguins/royal.jpg", "penguins/snares.jpg", "penguins/yelloweyed.jpg"];
const SOUNDS = ["sounds/adelie.mp3", "sounds/african.mp3", "sounds/chinstrap.mp3", "sounds/emperor.mp3", "sounds/erectcrested.mp3", "sounds/fiordland.mp3", "sounds/galapagos.mp3", "sounds/gentoo.mp3", "sounds/humboldt.mp3", "sounds/king.mp3", "sounds/littleblue.mp3", "sounds/macaroni.mp3", "sounds/magellanic.mp3", "sounds/srockhopper.mp3", "sounds/nrockhopper.mp3", "sounds/royal.mp3", "sounds/snares.mp3", "sounds/yelloweyed.mp3"];
const FLAGS = ["flags/al.png", "flags/ak.png", "flags/az.png", "flags/ar.png", "flags/ca.png", "flags/co.png", "flags/ct.png", "flags/de.png", "flags/fl.png", "flags/ga.png", "flags/hi.png", "flags/id.png", "flags/il.png", "flags/in.png", "flags/ia.png", "flags/ks.png", "flags/ky.png", "flags/la.png", "flags/me.png", "flags/md.png", "flags/ma.png", "flags/mi.png", "flags/mn.png", "flags/ms.png", "flags/mo.png", "flags/mt.png", "flags/ne.png", "flags/nv.png", "flags/nh.png", "flags/nj.png", "flags/nm.png", "flags/ny.png", "flags/nc.png", "flags/nd.png", "flags/oh.png", "flags/ok.png", "flags/or.png", "flags/pa.png", "flags/ri.png", "flags/sc.png", "flags/sd.png", "flags/tn.png", "flags/tx.png", "flags/ut.png", "flags/vt.png", "flags/va.png", "flags/wa.png", "flags/wv.png", "flags/wi.png", "flags/wy.png", "flags/ab.png", "flags/bc.png", "flags/mb.png", "flags/nb.png", "flags/nl.png", "flags/nt.png", "flags/ns.png", "flags/nu.png", "flags/on.png", "flags/pe.png", "flags/qc.png", "flags/sk.png", "flags/yt.png"];
const BIRDS = ["birds/al.jpg", "birds/ak.jpg", "birds/az.jpg", "birds/ar.jpg", "birds/ca.jpg", "birds/co.jpg", "birds/ct.jpg", "birds/de.jpg", "birds/fl.jpg", "birds/ga.jpg", "birds/hi.jpg", "birds/id.jpg", "birds/il.jpg", "birds/in.jpg", "birds/ia.jpg", "birds/ks.jpg", "birds/ky.jpg", "birds/la.jpg", "birds/me.jpg", "birds/md.jpg", "birds/ma.jpg", "birds/mi.jpg", "birds/mn.jpg", "birds/ms.jpg", "birds/mo.jpg", "birds/mt.jpg", "birds/ne.jpg", "birds/nv.jpg", "birds/nh.jpg", "birds/nj.jpg", "birds/nm.jpg", "birds/ny.jpg", "birds/nc.jpg", "birds/nd.jpg", "birds/oh.jpg", "birds/ok.jpg", "birds/or.jpg", "birds/pa.jpg", "birds/ri.jpg", "birds/sc.jpg", "birds/sd.jpg", "birds/tn.jpg", "birds/tx.jpg", "birds/ut.jpg", "birds/vt.jpg", "birds/va.jpg", "birds/wa.jpg", "birds/wv.jpg", "birds/wi.jpg", "birds/wy.jpg", "birds/ab.jpg", "birds/bc.jpg", "birds/mb.jpg", "birds/nb.jpg", "birds/nl.jpg", "birds/nt.jpg", "birds/ns.jpg", "birds/nu.jpg", "birds/on.jpg", "birds/pe.jpg", "birds/qc.jpg", "birds/sk.jpg", "birds/yt.jpg"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS).then(() =>
        Promise.allSettled(BIRDS.concat(FLAGS, PENGUINS, SOUNDS, EAGLES, EAGLE_SOUNDS).map(u => c.add(u)))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit =>
      hit || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
