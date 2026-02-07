/**
 * PIXELSTORTION SITE MANIFEST v2.4 (Dual Mode)
 * ----------------------------------------------------------------
 * TOGGLE INSTRUCTIONS:
 *   - To test LOCALLY:  Set USE_LOCAL_IMAGES = true
 *   - To deploy to PRODUCTION: Set USE_LOCAL_IMAGES = false
 * ----------------------------------------------------------------
 */

// ╔═══════════════════════════════════════════════════════════════╗
// ║  🔧 TOGGLE THIS BEFORE COMMITTING!                            ║
// ╠═══════════════════════════════════════════════════════════════╣
// ║  true  = Local testing (images from /library/...)             ║
// ║  false = Production (images from GitHub Pages)                ║
// ╚═══════════════════════════════════════════════════════════════╝
const USE_LOCAL_IMAGES = true;

// Base URLs for image assets
const IMAGE_BASE = USE_LOCAL_IMAGES
    ? '/library/char_ethel_media'
    : 'https://NJsalubrious.github.io/pixelstortion-assets/library/char_ethel_media';

const PIXEL_MANIFEST = {
    // 1. ZONES (Code Locations - Always Relative)
    ZONES: {
        HOME: '/index.html',
        SILENCE: '/zones/silence/index.html',
        MATAALA: '/zones/mataala/index.html',
        CINEMA: '/zones/silentcinema/index.html',
        GALLERY: '/zones/ethel_gallery/index.html',
        GAMES: '/zones/games/'
    },

    // 2. LIBRARY (Asset Locations - Always Relative)
    LIBRARY: {
        ETHEL_MEDIA: '/library/char_ethel_media/',
        ETHEL_MISC: '/library/char_ethel_misc/',
        NALANI_MEDIA: '/library/char_nalani_media/',
        ISLA_ART: '/library/char_isla_art/',
        ISLA_MISC: '/library/char_isla_misc/',
        DOMINIC_MISC: '/library/char_dominic_misc/',
        WRITERS: '/library/char_writers/',

        MATAALA: '/library/loc_mataala/',
        ARCHIVES: '/library/loc_archives/',

        ALBUM_COVERS: '/library/media_covers_album/',
        SONG_COVERS: '/library/media_covers_song/',
        CINEMA: '/library/media_cinema/',
        UI: '/library/media_ui_master/'
    },

    // 3. GAMES (Relative paths to game files)
    GAMES: {
        ISLA: '/zones/games/isla_protocol.html',
        TRIVIA: '/zones/games/trivia_protocol.html',
        DOMINIC: '/zones/games/Dominics_game.html',
        ETHEL: '/zones/games/ethel_scanner.html'
    },

    // 4. DATA HOOKS (Uses toggle for images)
    ASSETS: {
        GALLERY_MAP: `${IMAGE_BASE}/gallery_map.json`,
        GALLERY_IMAGES: `${IMAGE_BASE}/images/`,
        ARCHIVES_BASE: '/library/loc_archives/'
    },

    // 5. MODE FLAG (for debugging)
    IS_LOCAL: USE_LOCAL_IMAGES
};

// --- COMPATIBILITY SHORTCUTS (To support your existing code) ---
PIXEL_MANIFEST.SILENCE = PIXEL_MANIFEST.ZONES.SILENCE;
PIXEL_MANIFEST.MATAALA = PIXEL_MANIFEST.ZONES.MATAALA;
PIXEL_MANIFEST.CINEMA = PIXEL_MANIFEST.ZONES.CINEMA;
PIXEL_MANIFEST.ETHEL_GALLERY = PIXEL_MANIFEST.ZONES.GALLERY;

window.PIXEL_MANIFEST = PIXEL_MANIFEST;
console.log(`Manifest v2.4: ${USE_LOCAL_IMAGES ? '🏠 LOCAL' : '🌐 PRODUCTION'} MODE`);
