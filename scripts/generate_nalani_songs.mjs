/**
 * generate_nalani_songs.mjs
 * Per-song throughput pages for the Mataala: Nalani world (pixelstortion.com/songs/<slug>).
 * Same layout/functionality as the SITT song pages, re-skinned in the songs.html palette
 * (jungle-dark, parchment, ember/gold, aged-paper, Cinzel headings). Lyrics come from the
 * .md files in MISC_INFO/NALANI; covers are copied from NALANI_ALBUM_COVERS.
 * Generic Polynesian/Pacific framing only — never names a specific real island or ancestor.
 *
 * Run: node scripts/generate_nalani_songs.mjs [--no-fetch]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));            // PIXELSTORTION
const NALANI = join(REPO, '..', 'MISC_INFO', 'NALANI');                   // source lyrics + covers
const SRC_COVERS = join(NALANI, 'NALANI_ALBUM_COVERS');
const OUT_DIR = join(REPO, 'songs');                                      // pixelstortion/songs/
const OUT_COVERS = join(OUT_DIR, 'covers');
const ORIGIN = 'https://pixelstortion.com';
const NO_FETCH = process.argv.includes('--no-fetch');

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
const TODAY = new Date().toISOString().slice(0, 10);

// ---- song data (videoIds + taglines from songs.html; lyrics from the .md files) ----
const SONGS = [
  {
    title: 'Tides of War', slug: 'nalani-mataala-tides-of-war', videoId: 'BaEDmidh2fg',
    tagline: 'First Contact', cover: 'Nalani-Mataala-Tides-Of-War.jpg', lyricsFile: 'Nalani-Mataala-Tides-Of-War-lyrics.md',
    story: 'Soft as an island eulogy. The first sails break the horizon while her people still dance on silver sand, and Nalani reads the hunger behind the traders’ silk and lies, already counting the true cost of welcome. A full short film in feel and story.',
    seoTitle: 'Tides of War by Nalani | First Contact | Mataala: Nalani',
    seoDesc: 'Tides of War: a soft, almost elegiac opening, the first traders on the horizon while the island still dances and Nalani reads the hunger behind their silk and lies. A cinematic short film from Mataala.',
    keywords: ['tides of war nalani', 'mataala songs', 'cinematic', 'island eulogy', 'elegiac', 'soft folk', 'anti-colonial historical fiction', 'indigenous resistance music', '19th century polynesian historical fiction', 'narrative short film', 'song as testimony', 'cinematic music video', 'short film with a story'],
  },
  {
    title: 'My Island School', slug: 'nalani-mataala-my-island-school', videoId: 'AD63pqPSdPs',
    tagline: 'The Storm Unseen', cover: 'Nalani-Mataala-My-island-school.jpg', lyricsFile: 'Nalani-Mataala-My-island-school.md',
    story: 'A powerful arc from a small island schoolroom to a mind no rule can hold. Dust, rain, and chalk on the wind. The sisters teach stillness; Nalani learns their language and their laws instead, reading lies in every face, and rows too far to ever be kept.',
    seoTitle: 'My Island School by Nalani | The Storm Unseen | Mataala: Nalani',
    seoDesc: 'My Island School: a powerful story arc, a girl in a mission schoolroom learns the colonizer’s language and laws to use them back, rowing too far to ever be kept. A cinematic short film from Mataala.',
    keywords: ['my island school nalani', 'mataala songs', 'cinematic', 'powerful story arc', 'coming of age', 'mission school colonial', 'indigenous resistance music', '19th century polynesian historical fiction', 'narrative short film', 'anti-colonial historical fiction', 'cinematic music video', 'short film with a story'],
  },
  {
    title: 'Born For Storms', slug: 'nalani-mataala-born-for-storms', videoId: 'Bqwv8iOsosE',
    tagline: 'Calm Before The War', cover: 'Nalani-Mataala-Born-For-Storms.jpg', lyricsFile: 'Nalani-Mataala-Born-For-Storms-lyrics.md',
    story: 'Called wild, called wrong, dragged north where no one smiled. Nalani bends without breaking, passing their tests with different eyes, a storm that waits then burns the sky.',
    seoTitle: 'Born For Storms by Nalani | Calm Before The War | Mataala: Nalani',
    seoDesc: 'Born For Storms: too loud, too sharp, made for war and trust, the storm that waits then burns the sky. A cinematic music video and short film from Mataala, a 19th-century Polynesian historical fiction.',
    keywords: ['born for storms nalani', 'mataala songs', 'cinematic', 'female rage', 'indigenous resistance music', '19th century polynesian historical fiction', 'indigenous resistance anthem', 'narrative short film', 'anti-colonial historical fiction', 'concept album', 'cinematic music video', 'short film with a story'],
  },
  {
    title: 'Silent Watcher', slug: 'nalani-mataala-silent-watcher', videoId: '8XbCkq59YJc',
    tagline: 'With Ash-Stained Skin', cover: 'Nalani-Mataala-The-Silent-Watcher.jpg', lyricsFile: 'Nalani-Mataala-The-Silent-Watcher-lyrics.md',
    story: 'The overseer sends his hound. Maps are drawn, borders traced, an island marked for a quiet fate, until the jungle answers and war is born beneath the trees.',
    seoTitle: 'Silent Watcher by Nalani | With Ash-Stained Skin | Mataala: Nalani',
    seoDesc: 'Silent Watcher: an overseer’s hand draws the maps and borders, an island marked for a quiet fate, until the jungle answers. A cinematic music video and short film from Mataala, an anti-colonial Polynesian historical fiction.',
    keywords: ['silent watcher nalani', 'mataala songs', 'cinematic', 'colonial overseer', 'indigenous resistance music', '19th century polynesian historical fiction', 'narrative short film', 'song as testimony', 'anti-colonial historical fiction', 'concept album', 'cinematic music video', 'short film with a story'],
  },
  {
    title: 'Blades of War', slug: 'nalani-mataala-blades-of-war', videoId: 'SpgAuLxiBzI', notFilm: true,
    tagline: 'Ash & Flame', cover: 'Nalani-Mataala-Blades-Of-War.jpg', lyricsFile: 'NALANI_ALBUM_COVERS/Nalani-Mataala-Blades-Of-War.md',
    story: 'It opens on a single tribal drum, struck hard and left to ring in the spaces between. Two hulls rise from the dark, one for wealth, one for debt; on the sand where steel meets the sea there are no kings and no names left, just ash and flame, and the ending turns heavy.',
    seoTitle: 'Blades of War by Nalani | Ash & Flame | Mataala: Nalani',
    seoDesc: 'Blades of War: a lone tribal drum opens hard and spaced, two forces meet on the sand, no kings, no names, just ash and flame, an ending that turns heavy and metal-tinged. A cinematic song from Mataala.',
    keywords: ['blades of war nalani', 'mataala songs', 'cinematic', 'tribal drums', 'metal-tinged', 'heavy cinematic', 'battle song', 'indigenous resistance music', '19th century polynesian historical fiction', 'anti-colonial historical fiction', 'cinematic music video', 'song as testimony'],
  },
  {
    type: 'film',
    title: 'Mataala (Short Film)', slug: 'nalani-mataala-short-film', videoId: 'Q6ZG0QXUD44',
    tagline: 'Not A Saviour, Just A Thief', cover: 'Nalani-Mataala-Short-Film.jpg',
    story: `TURNBULL, a persuasive figure, arrives on the island with ambitious plans for transformation. Beneath his charm lies a far-reaching agenda that extends beyond the island, representing the inevitable tide of progress and change that will come with or without him.
NALANI, a magnetic and highly articulate woman, refuses to be swayed by Turnbull's vision. Her ability to convey her thoughts on an emotional level, with clarity and directness, mirrors Turnbull's influence, setting the stage for a tense and volatile clash between two equally determined personalities.`,
    transcript: `He lets them think they're in control,
but this isn't a negotiation.
Speak directly to them.
Make them uncomfortable.
Be a thorn in their side.

Look them in the eye and laugh at them.
Show people that they are flesh and bone.
They will fear us.
They are not invincible.
Not a saviour. Just a thief.

Give them none of your time.
Give them none of your respect.
Act before we are acted upon.

No time for games.`,
    seoTitle: 'Mataala: A Short Film | Not A Saviour, Just A Thief | Mataala: Nalani',
    seoDesc: 'Mataala, a short film: Turnbull arrives with ambitious plans for the island; Nalani, magnetic and articulate, refuses to be swayed. A 19th-century Polynesian historical fiction.',
    keywords: ['mataala short film', 'nalani short film', 'anti-colonial short film', 'indigenous resistance film', '19th century polynesian historical fiction', 'pacific historical drama', 'colonial first contact film', 'not a saviour just a thief', 'pixelstortion mataala', 'historical fiction short film'],
  },
];

function readLyrics(lyricsFile) {
  const p = lyricsFile.includes('/') ? join(NALANI, lyricsFile) : join(NALANI, lyricsFile);
  if (!existsSync(p)) return '';
  let t = readFileSync(p, 'utf8').replace(/\r/g, '');
  const m = t.split(/^\s*lyrics:\s*$/im);
  if (m.length > 1) t = m[1];
  return t.trim();
}
function lyricsHtml(lyrics) {
  if (!lyrics.trim()) return '<div class="lyric-line opacity-40">[ no transcript ]</div>';
  return lyrics.split('\n').map(l => l.trim() ? `<div class="lyric-line">${esc(l)}</div>` : '<div class="lyric-line empty-line"></div>').join('\n');
}
function storyHtml(story) {
  return String(story).split('\n').filter(p => p.trim()).map(p => `<p>${esc(p)}</p>`).join('\n');
}

async function ytDate(videoId) {
  if (NO_FETCH || !videoId) return null;
  try {
    const r = await fetch(`https://www.youtube.com/watch?v=${videoId}`, { headers: { 'User-Agent': 'Mozilla/5.0', 'Cookie': 'CONSENT=YES+1' } });
    const t = await r.text();
    const m = t.match(/"uploadDate":"([^"]{10})/);
    return m ? m[1] : null;
  } catch { return null; }
}
const DATES_FILE = join(REPO, 'scripts', 'nalani_dates.json');
let DATES = {};
if (existsSync(DATES_FILE)) { try { DATES = JSON.parse(readFileSync(DATES_FILE, 'utf8').replace(/^﻿/, '')); } catch {} }

function page(song, uploadDate) {
  const { title, slug, videoId, tagline, cover, story } = song;
  const url = `${ORIGIN}/songs/${slug}`;
  const coverRel = `covers/${encodeURIComponent(cover)}`;
  const coverAbs = `${ORIGIN}/songs/covers/${encodeURIComponent(cover)}`;
  const thumb = videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : coverAbs;
  const isFilm = song.type === 'film';
  const kindLine = isFilm
    ? 'A short film from a 19th-century Polynesian historical fiction'
    : song.notFilm
      ? 'A cinematic song and music video from a 19th-century Polynesian historical fiction'
      : 'A cinematic music video and short film from a 19th-century Polynesian historical fiction';
  const body = isFilm ? (song.transcript || '') : readLyrics(song.lyricsFile);
  const videoObj = videoId ? {
    '@type': 'VideoObject', name: `${title} — Nalani`, description: song.seoDesc, thumbnailUrl: thumb,
    ...(uploadDate ? { uploadDate } : {}),
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`, contentUrl: `https://www.youtube.com/watch?v=${videoId}`, isFamilyFriendly: true,
    isPartOf: { '@type': 'CreativeWorkSeries', name: 'Mataala: Nalani', url: `${ORIGIN}/` },
  } : null;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': isFilm
      ? [videoObj].filter(Boolean)
      : [
          {
            '@type': 'MusicRecording', name: title, byArtist: { '@type': 'MusicGroup', name: 'Nalani' },
            url, genre: ['Cinematic', 'Dramatic', 'Historical Fiction Soundtrack'],
            ...(uploadDate ? { datePublished: uploadDate } : {}),
            isPartOf: { '@type': 'CreativeWorkSeries', name: 'Mataala: Nalani', url: `${ORIGIN}/` },
          },
          ...(videoObj ? [videoObj] : []),
        ],
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Favicon (browser tab + Google domain icon). Square PNG at site root. -->
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/favicon.png" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(song.seoTitle)}</title>
    <meta name="description" content="${esc(song.seoDesc)}">
    <meta name="keywords" content="${esc(song.keywords.join(', '))}">
    <link rel="canonical" href="${url}">
    <meta name="classification" content="Historical Fiction, Art Project">
    <meta name="author" content="Pixelstortion">
    <meta name="genre" content="Dark Folk, Historical Fiction">
    <meta property="og:type" content="music.song">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${esc(song.seoTitle)}">
    <meta property="og:description" content="${esc(song.seoDesc)}">
    <meta property="og:image" content="${esc(thumb)}">
    <meta property="og:site_name" content="Pixelstortion">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(song.seoTitle)}">
    <meta name="twitter:description" content="${esc(song.seoDesc)}">
    <meta name="twitter:image" content="${esc(thumb)}">

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-34H8LS884F"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-34H8LS884F');</script>

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Lato:wght@300;400;700&family=Courier+Prime:wght@400;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0&display=swap" rel="stylesheet">
    <style>
        :root { --parchment:#d2b48c; --muted:#886644; --gold:#d4af37; --ember:#ff4500; --jungle:#0a0f05; --panel:#14100c; --line:#3d2b1f; }
        body { background:#0a0f05 url('https://www.transparenttextures.com/patterns/aged-paper.png'); color:var(--parchment); font-family:'Lato',sans-serif; }
        .font-cinzel { font-family:'Cinzel',serif; }
        .font-mono { font-family:'Courier Prime',monospace; }
        .ps-brand { font-family:'Cinzel',serif; letter-spacing:0.25em; color:var(--muted); text-decoration:none; transition:color .2s,text-shadow .2s; }
        .ps-brand:hover { color:var(--gold); text-shadow:0 0 10px rgba(212,175,55,0.4); }
        .more-songs { font-family:'Cinzel',serif; letter-spacing:0.15em; color:var(--parchment); border:1px solid var(--muted); padding:.4rem 1rem; text-decoration:none; transition:all .25s; }
        .more-songs:hover { background:var(--muted); color:#14100c; box-shadow:0 0 14px rgba(212,175,55,0.3); }
        .sec-head { font-family:'Cinzel',serif; color:var(--gold); letter-spacing:0.12em; border-bottom:1px solid var(--line); }
        .lyrics-wrap { background:rgba(0,0,0,0.35); border:1px solid var(--line); }
        .lyric-line { transition:color .2s; }
        .lyric-line:hover { color:var(--gold); }
        .empty-line { height:.9rem; }
        .scanlines { position:fixed; inset:0; pointer-events:none; z-index:50; opacity:0.05; background:linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 50%); background-size:100% 3px; }
    </style>
    <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
    </script>
</head>
<body>
    <div class="scanlines"></div>

    <header class="fixed top-0 w-full z-40 bg-[#0a0f05]/90 border-b border-[#3d2b1f] backdrop-blur-md">
        <div class="container mx-auto px-4 py-3 flex flex-wrap gap-y-2 justify-between items-center">
            <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full" style="background:var(--ember);box-shadow:0 0 10px var(--ember);"></div>
                <a href="https://pixelstortion.com/" class="ps-brand text-lg md:text-xl">PIXELSTORTION</a>
                <span class="text-[10px] opacity-50 font-mono uppercase tracking-widest text-[#886644]">Mataala&nbsp;: Nalani</span>
            </div>
            <a href="/nalani_gallery" class="more-songs text-xs uppercase">More Films &rsaquo;</a>
        </div>
    </header>

    <main class="container mx-auto px-4 pt-24 pb-20 relative z-10 min-h-screen">
      <article class="w-full max-w-7xl mx-auto bg-[#14100c] border border-[#3d2b1f] flex flex-col md:flex-row shadow-2xl overflow-hidden">

        <!-- LEFT: video + cover + meta (pinned) -->
        <div class="w-full md:w-5/12 flex flex-col bg-black/40 border-r border-[#3d2b1f] md:self-start md:sticky md:top-0">
            <div class="w-full aspect-video bg-black border-b border-[#3d2b1f]">
                ${videoId ? `<iframe class="w-full h-full" src="https://www.youtube-nocookie.com/embed/${videoId}" title="${esc(title)} — Nalani" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="origin" allowfullscreen></iframe>` : ''}
            </div>
            <div class="relative overflow-hidden flex flex-col p-6">
                <div class="flex items-center justify-center relative">
                    <img src="${coverRel}" alt="${esc(title)} cover art, Mataala: Nalani" class="max-h-[200px] md:max-h-[300px] w-auto border border-[#3d2b1f] shadow-[0_0_30px_rgba(0,0,0,0.6)]">
                </div>
                <div class="mt-4 font-mono text-xs text-[#886644] space-y-1">
                    <div class="flex justify-between border-b border-[#3d2b1f]/60 pb-1"><span>WORLD</span><span class="text-[#d2b48c]">MATAALA</span></div>
                    <div class="flex justify-between border-b border-[#3d2b1f]/60 pb-1"><span>VOICE</span><span class="text-[#d2b48c]">NALANI</span></div>
                    <div class="flex justify-between"><span>${isFilm ? 'FORMAT' : 'MOVEMENT'}</span><span class="text-[#d2b48c] uppercase">${isFilm ? 'Short Film' : esc(tagline)}</span></div>
                </div>
            </div>
        </div>

        <!-- RIGHT: title + story + lyrics -->
        <div class="w-full md:w-7/12 flex flex-col bg-[#0f0a08]">
            <div class="p-6 md:p-8 border-b border-[#3d2b1f]">
                <h1 class="font-cinzel text-3xl md:text-5xl font-black text-[#d2b48c] uppercase leading-none tracking-tight">${esc(title)}</h1>
                <p class="text-[11px] md:text-xs text-[#886644] font-mono italic mt-2 tracking-wider uppercase">${esc(tagline)} &middot; ${kindLine}</p>
            </div>
            <div class="p-6 md:p-10 space-y-10">
                <section>
                    <h2 class="sec-head text-sm md:text-base uppercase mb-4 pb-2">The Scene</h2>
                    <div class="text-[#c8b89a] font-light text-sm md:text-base leading-relaxed space-y-5">${storyHtml(story)}</div>
                </section>
                <section>
                    <h2 class="sec-head text-sm md:text-base uppercase mb-4 pb-2">${isFilm ? 'Transcript' : 'Lyrics'}</h2>
                    <div class="lyrics-wrap p-5 md:p-6">
                        <div class="font-mono text-xs md:text-sm leading-loose text-center text-[#c8b89a]">
                            ${lyricsHtml(body)}
                        </div>
                    </div>
                </section>
            </div>
        </div>
      </article>
    </main>
</body>
</html>
`;
}

// ---- gallery hub page (visual grid of all covers, dropdown nav, links to each song page) ----
function galleryPage(dates = {}) {
  const cards = SONGS.map(s => {
    const badge = s.type === 'film' ? 'Short Film' : (s.notFilm ? 'Song' : 'Music Video / Short Film');
    return `        <a href="/songs/${s.slug}" class="group block bg-[#14100c] border border-[#3d2b1f] overflow-hidden transition-all duration-300 hover:border-[#d4af37] hover:shadow-[0_0_25px_rgba(212,175,55,0.18)]">
          <div class="aspect-square overflow-hidden bg-black">
            <img src="/songs/covers/${encodeURIComponent(s.cover)}" alt="${esc(s.title)} cover, Mataala: Nalani" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          </div>
          <div class="p-4">
            <div class="font-mono text-[10px] uppercase tracking-widest text-[#886644] mb-1">${badge}</div>
            <h2 class="font-cinzel text-lg md:text-xl text-[#d2b48c] leading-tight group-hover:text-[#d4af37] transition-colors">${esc(s.title)}</h2>
            <p class="font-mono text-[11px] italic text-[#886644] mt-1 uppercase tracking-wider">${esc(s.tagline)}</p>
          </div>
        </a>`;
  }).join('\n');
  const ld = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'Musical Short Films | Mataala: Nalani', url: `${ORIGIN}/nalani_gallery`,
    description: 'The musical short films and songs of Mataala: Nalani, a 19th-century Polynesian historical fiction of indigenous strategy and resistance.',
    isPartOf: { '@type': 'CreativeWorkSeries', name: 'Mataala: Nalani', url: `${ORIGIN}/` },
    hasPart: SONGS.map(s => {
      const itemUrl = `${ORIGIN}/songs/${s.slug}`;
      if (s.type === 'film') {
        const thumb = s.videoId ? `https://i.ytimg.com/vi/${s.videoId}/maxresdefault.jpg` : `${ORIGIN}/songs/covers/${encodeURIComponent(s.cover)}`;
        const d = dates[s.videoId];
        return {
          '@type': 'VideoObject', name: s.title, url: itemUrl,
          description: s.seoDesc, thumbnailUrl: thumb,
          ...(d ? { uploadDate: d } : {}),
          embedUrl: `https://www.youtube-nocookie.com/embed/${s.videoId}`,
          contentUrl: `https://www.youtube.com/watch?v=${s.videoId}`,
        };
      }
      return { '@type': 'MusicRecording', name: s.title, url: itemUrl };
    }),
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Favicon (browser tab + Google domain icon). Square PNG at site root. -->
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/favicon.png" />
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Musical Short Films | Mataala: Nalani</title>
  <meta name="description" content="The musical short films and songs of Mataala: Nalani, a 19th-century Polynesian historical fiction. Cinematic music videos and short films of indigenous strategy and resistance.">
  <meta name="keywords" content="mataala musical short films, nalani films, nalani songs, cinematic short films, indigenous resistance, 19th century polynesian historical fiction, anti-colonial short films, music videos with a story, pixelstortion mataala">
  <link rel="canonical" href="${ORIGIN}/nalani_gallery">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${ORIGIN}/nalani_gallery">
  <meta property="og:title" content="Musical Short Films | Mataala: Nalani">
  <meta property="og:description" content="The musical short films and songs of Mataala: Nalani, a 19th-century Polynesian historical fiction.">
  <meta property="og:image" content="${ORIGIN}/NALANI_MATAALA.jpg">
  <meta property="og:site_name" content="Pixelstortion">
  <meta name="twitter:card" content="summary_large_image">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-34H8LS884F"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-34H8LS884F');</script>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Lato:wght@300;400;700&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root{--parchment:#d2b48c;--muted:#886644;--gold:#d4af37;--ember:#ff4500;--line:#3d2b1f;}
    body{background:#0a0f05 url('https://www.transparenttextures.com/patterns/aged-paper.png');color:var(--parchment);font-family:'Lato',sans-serif;}
    .font-cinzel{font-family:'Cinzel',serif;}.font-mono{font-family:'Courier Prime',monospace;}
    .ps-brand{font-family:'Cinzel',serif;letter-spacing:0.22em;color:var(--muted);transition:color .2s,text-shadow .2s;}
    .ps-brand:hover{color:var(--gold);text-shadow:0 0 10px rgba(212,175,55,0.4);}
    .more-songs{font-family:'Cinzel',serif;letter-spacing:0.15em;color:var(--parchment);border:1px solid var(--muted);padding:.4rem 1rem;text-decoration:none;transition:all .25s;}
    .more-songs:hover{background:var(--muted);color:#14100c;box-shadow:0 0 14px rgba(212,175,55,0.3);}
    .brand-dropdown-container{position:relative;}
    .brand-dropdown-menu{position:absolute;top:100%;left:0;margin-top:8px;min-width:200px;background:rgba(10,15,5,0.97);border:1px solid #3d2b1f;opacity:0;visibility:hidden;transform:translateY(-8px);transition:all .25s;z-index:60;padding:4px 0;}
    .brand-dropdown-menu.active{opacity:1;visibility:visible;transform:translateY(0);}
    .brand-dropdown-item{display:block;padding:9px 16px;font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.12em;color:#886644;text-decoration:none;border-left:2px solid transparent;transition:all .2s;}
    .brand-dropdown-item:hover{color:#d4af37;background:rgba(212,175,55,0.06);border-left-color:#d4af37;}
    .scanlines{position:fixed;inset:0;pointer-events:none;z-index:50;opacity:0.05;background:linear-gradient(rgba(0,0,0,0) 50%,rgba(0,0,0,0.4) 50%);background-size:100% 3px;}
  </style>
  <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
  </script>
</head>
<body>
  <div class="scanlines"></div>
  <header class="fixed top-0 w-full z-40 bg-[#0a0f05]/90 border-b border-[#3d2b1f] backdrop-blur-md">
    <div class="container mx-auto px-4 py-3 flex flex-wrap gap-y-2 justify-between items-center">
      <div class="flex items-center gap-3">
        <div class="w-2 h-2 rounded-full" style="background:var(--ember);box-shadow:0 0 10px var(--ember);"></div>
        <div class="brand-dropdown-container">
          <button onclick="toggleBrandMenu(event)" class="ps-brand text-lg md:text-xl" style="background:none;border:none;cursor:pointer;padding:0;">PIXELSTORTION &#9662;</button>
          <div id="brandDropdown" class="brand-dropdown-menu" onclick="event.stopPropagation()">
            <a href="/" class="brand-dropdown-item">Home</a>
            <a href="/museum.html" class="brand-dropdown-item">Museum</a>
            <a href="/figures.html" class="brand-dropdown-item">Figures</a>
            <a href="/songs.html" class="brand-dropdown-item">Songs</a>
            <a href="/nalani_gallery" class="brand-dropdown-item">Musical Short Films</a>
            <a href="/bio/" class="brand-dropdown-item">Bio</a>
          </div>
        </div>
        <span class="text-[10px] opacity-50 font-mono uppercase tracking-widest text-[#886644]">Mataala&nbsp;: Nalani</span>
      </div>
      <a href="/figures.html" class="more-songs text-xs uppercase">Figures &rsaquo;</a>
    </div>
  </header>

  <main class="container mx-auto px-4 pt-28 pb-20 relative z-10 min-h-screen">
    <div class="text-center mb-12 max-w-3xl mx-auto">
      <h1 class="font-cinzel text-4xl md:text-6xl font-black text-[#d2b48c] uppercase tracking-tight">Musical Short Films</h1>
      <p class="font-mono text-xs md:text-sm text-[#886644] italic mt-3 tracking-wider">Mataala : Nalani &middot; a 19th-century Polynesian historical fiction of indigenous strategy and resistance</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
${cards}
    </div>
  </main>

  <script>
    function toggleBrandMenu(e){e.stopPropagation();var m=document.getElementById('brandDropdown');if(m)m.classList.toggle('active');}
    document.addEventListener('click',function(){var m=document.getElementById('brandDropdown');if(m)m.classList.remove('active');});
  </script>
</body>
</html>
`;
}

// ---- run ----
mkdirSync(OUT_COVERS, { recursive: true });
for (const s of SONGS) {
  const src = join(SRC_COVERS, s.cover);
  if (existsSync(src)) copyFileSync(src, join(OUT_COVERS, s.cover));
}
const pageEntries = [], videoEntries = [], imageEntries = [];
const dates = {};
let n = 0;
for (const song of SONGS) {
  const uploadDate = DATES[song.videoId] || await ytDate(song.videoId);
  if (uploadDate) dates[song.videoId] = uploadDate;
  writeFileSync(join(OUT_DIR, `${song.slug}.html`), page(song, uploadDate), 'utf8');
  const cAbs = `${ORIGIN}/songs/covers/${encodeURIComponent(song.cover)}`;
  const thumb = `https://i.ytimg.com/vi/${song.videoId}/maxresdefault.jpg`;
  const loc = `${ORIGIN}/songs/${song.slug}`;
  pageEntries.push(`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </url>\n`);
  imageEntries.push(`  <url>\n    <loc>${loc}</loc>\n    <image:image>\n      <image:loc>${esc(cAbs)}</image:loc>\n      <image:title>${esc(song.title + ' by Nalani, Mataala')}</image:title>\n    </image:image>\n  </url>\n`);
  videoEntries.push(`  <url>\n    <loc>${loc}</loc>\n    <video:video>\n      <video:thumbnail_loc>${thumb}</video:thumbnail_loc>\n      <video:title>${esc(song.seoTitle.split(' | ')[0])}</video:title>\n      <video:description>${esc(song.seoDesc)}</video:description>\n      <video:player_loc allow_embed="yes">https://www.youtube-nocookie.com/embed/${song.videoId}</video:player_loc>\n${uploadDate ? `      <video:publication_date>${uploadDate}T00:00:00+00:00</video:publication_date>\n` : ''}      <video:family_friendly>yes</video:family_friendly>\n    </video:video>\n  </url>\n`);
  n++;
  console.log(`  [${n}/${SONGS.length}] /songs/${song.slug}  (${song.videoId}, date=${uploadDate || 'none'})`);
}
// hub page (pages sitemap only)
pageEntries.unshift(`  <url>\n    <loc>${ORIGIN}/nalani_gallery</loc>\n    <lastmod>${TODAY}</lastmod>\n  </url>\n`);
const wrap = (ns, body) => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${ns}>\n${body}</urlset>\n`;
writeFileSync(join(REPO, 'sitemap-songs.xml'), wrap('', pageEntries.join('')), 'utf8');
writeFileSync(join(REPO, 'sitemap-songs-video.xml'), wrap('\n        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"', videoEntries.join('')), 'utf8');
writeFileSync(join(REPO, 'sitemap-songs-images.xml'), wrap('\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"', imageEntries.join('')), 'utf8');
writeFileSync(join(REPO, 'nalani_gallery.html'), galleryPage(dates), 'utf8');
console.log(`Done. ${n} pages + hub + 3 sitemaps (pages/video/images) -> ${REPO}`);
