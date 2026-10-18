const CACHE = "build-a-word-v11";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./audio/chunk1_ad.mp3", "./audio/chunk1_ake.mp3", "./audio/chunk1_ap.mp3", "./audio/chunk1_ark.mp3", "./audio/chunk1_at.mp3", "./audio/chunk1_b.mp3", "./audio/chunk1_c.mp3", "./audio/chunk1_d.mp3", "./audio/chunk1_ed.mp3", "./audio/chunk1_ee.mp3", "./audio/chunk1_f.mp3", "./audio/chunk1_fr.mp3", "./audio/chunk1_h.mp3", "./audio/chunk1_ig.mp3", "./audio/chunk1_ip.mp3", "./audio/chunk1_ish.mp3", "./audio/chunk1_it.mp3", "./audio/chunk1_m.mp3", "./audio/chunk1_og.mp3", "./audio/chunk1_om.mp3", "./audio/chunk1_op.mp3", "./audio/chunk1_ose.mp3", "./audio/chunk1_ow.mp3", "./audio/chunk1_ox.mp3", "./audio/chunk1_p.mp3", "./audio/chunk1_r.mp3", "./audio/chunk1_s.mp3", "./audio/chunk1_sh.mp3", "./audio/chunk1_t.mp3", "./audio/chunk1_uck.mp3", "./audio/chunk1_un.mp3", "./audio/chunk1_up.mp3", "./audio/chunk1_us.mp3", "./audio/chunk_ad.mp3", "./audio/chunk_ake.mp3", "./audio/chunk_ap.mp3", "./audio/chunk_ark.mp3", "./audio/chunk_at.mp3", "./audio/chunk_b.mp3", "./audio/chunk_d.mp3", "./audio/chunk_ed.mp3", "./audio/chunk_ee.mp3", "./audio/chunk_f.mp3", "./audio/chunk_fr.mp3", "./audio/chunk_h.mp3", "./audio/chunk_ig.mp3", "./audio/chunk_ip.mp3", "./audio/chunk_ish.mp3", "./audio/chunk_it.mp3", "./audio/chunk_m.mp3", "./audio/chunk_og.mp3", "./audio/chunk_om.mp3", "./audio/chunk_op.mp3", "./audio/chunk_ose.mp3", "./audio/chunk_ow.mp3", "./audio/chunk_ox.mp3", "./audio/chunk_p.mp3", "./audio/chunk_r.mp3", "./audio/chunk_s.mp3", "./audio/chunk_sh.mp3", "./audio/chunk_t.mp3", "./audio/chunk_uck.mp3", "./audio/chunk_un.mp3", "./audio/chunk_up.mp3", "./audio/chunk_us.mp3", "./audio/praise_build_1.mp3", "./audio/praise_build_2.mp3", "./audio/praise_build_3.mp3", "./audio/praise_pick_1.mp3", "./audio/praise_pick_2.mp3", "./audio/prompt_build.mp3", "./audio/prompt_pick.mp3", "./audio/prompt_pick_sounds.mp3", "./audio/prompt_try_again.mp3", "./audio/prompt_watch_me.mp3", "./audio/word_bat.mp3", "./audio/word_bed.mp3", "./audio/word_bee.mp3", "./audio/word_box.mp3", "./audio/word_bus.mp3", "./audio/word_cake.mp3", "./audio/word_cat.mp3", "./audio/word_cow.mp3", "./audio/word_cup.mp3", "./audio/word_dad.mp3", "./audio/word_dog.mp3", "./audio/word_duck.mp3", "./audio/word_fish.mp3", "./audio/word_frog.mp3", "./audio/word_hat.mp3", "./audio/word_map.mp3", "./audio/word_mom.mp3", "./audio/word_pig.mp3", "./audio/word_rose.mp3", "./audio/word_rose_name.mp3", "./audio/word_shark.mp3", "./audio/word_ship.mp3", "./audio/word_sit.mp3", "./audio/word_sun.mp3", "./audio/word_top.mp3"];
// Self-healing service worker (v11): a new worker never waits behind a stale
// one, activation purges EVERY older cache, and fetches consult ONLY the
// current cache — a mixed/partial cache from a rapid update can never serve
// a garbled asset again.
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.open(CACHE).then(c => c.match(e.request)).then(r => r || fetch(e.request))
  );
});
