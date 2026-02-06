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

    // 3. GAMES (Structured game data with url, name, and thumbnail)
    GAMES: {
        ISLA: {
            url: '/zones/games/isla_protocol.html',
            name: "Isla's Phone",
            thumb: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/35ecd089732798a3a5bb709ee980fc2889396a3a/library/silence_games/isla_game_1.jpg',
            fullscreen: false
        },
        TRIVIA: {
            url: '/zones/games/trivia_protocol.html',
            name: 'Silence Trivia',
            thumb: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/f54f00a38546f7943d9419ae32276ecda901fddb/library/silence_games/trivia_game_1.jpg',
            fullscreen: false
        },
        DOMINIC: {
            url: '/zones/games/Dominics_game.html',
            name: 'RYKER - Systemic Failure',
            thumb: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/52c22c4699c95321c2a2498274141f2229515424/library/silence_games/ryker_game_1.jpg',
            fullscreen: false
        },
        ETHEL: {
            url: '/zones/games/ethel_scanner.html',
            name: 'System Locked - Scanner',
            thumb: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/2c513281c167be40eb3db06a0338bda81f989f7d/library/silence_games/Ethel_game_2__SemanticScanner.jpg',
            fullscreen: false
        },
        DOMINIC_2: {
            url: '/zones/games/ryker_consensus/ryker_consensus.html',
            name: 'Forced Compliance Loop',
            thumb: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/2c513281c167be40eb3db06a0338bda81f989f7d/library/silence_games/Dominic_game_3.jpg',
            fullscreen: true
        }
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
