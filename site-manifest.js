/**
 * PIXELSTORTION SITE MANIFEST v3.0 (Portable / All Local)
 * ----------------------------------------------------------------
 * All paths are relative to the repo root.
 * Works on GitHub Pages, raw.githack, local file://, or any host.
 * ----------------------------------------------------------------
 */

const IMAGE_BASE = '/library/char_ethel_media';

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
        UI: '/library/media_ui_master/',
        GAME_THUMBS: '/library/silence_games/'
    },

    // 3. GAMES (Structured game data with url, name, thumbnail, fullscreen)
    GAMES: {
        Dominic_4: {
            url: '/zones/games/DominicsFreedom.html',
            name: "Dominic's Freedom V1.0",
            thumb: '/library/silence_games/Dominic_game_freedom_2.jpg',
            fullscreen: true
        },
        Dominic_3: {
            url: '/zones/games/DominicsGameTrailer.html',
            name: "Dominic's Game V1.0",
            thumb: '/library/silence_games/Dominic_game_2.jpg',
            fullscreen: true
        },
        ISLA: {
            url: '/zones/games/isla_protocol.html',
            name: "Isla's Phone V1.0",
            thumb: '/library/silence_games/isla_game_1.jpg',
            fullscreen: false
        },
        TRIVIA: {
            url: '/zones/games/trivia_protocol.html',
            name: 'Ryker Crime Trivia V1.0',
            thumb: '/library/silence_games/trivia_game_1.jpg',
            fullscreen: false
        },
        DOMINIC: {
            url: '/zones/games/Dominics_game.html',
            name: 'Systemic Failure V1.0',
            thumb: '/library/silence_games/Dominic_game_1.jpg',
            fullscreen: false
        },
        ETHEL: {
            url: '/zones/games/ethel_scanner.html',
            name: 'Ethel\'s thought Scanner V1.0',
            thumb: '/library/silence_games/Ethel_game_2__SemanticScanner.jpg',
            fullscreen: false
        },
        DOMINIC_2: {
            url: '/zones/games/ryker_consensus/ryker_consensus.html',
            name: 'Forced Network Compliance V1.0',
            thumb: '/library/silence_games/Dominic_game_3.jpg',
            fullscreen: true
        },
        Isla_2: {
            url: '/zones/games/BrutalTherapy_Isla.html',
            name: 'Isla in Therapy V1.0',
            thumb: '/library/silence_games/Isla_therapy_game.jpg',
            fullscreen: true
        },
        Dominic_5: {
            url: '/zones/games/DominicsGameFreeWillTest.html',
            name: "Dominic's Freedom V1.0",
            thumb: '/library/silence_games/free_you_game_1.jpg',
            fullscreen: true
        },


    },

    // 4. DATA HOOKS    
    ASSETS: {
        GALLERY_MAP: `${IMAGE_BASE}/gallery_map.json`,
        GALLERY_IMAGES: `${IMAGE_BASE}/images/`,
        ARCHIVES_BASE: '/library/loc_archives/'
    },

    // 5. MODE FLAG
    IS_LOCAL: true
};

// --- COMPATIBILITY SHORTCUTS (To support existing code) ---
PIXEL_MANIFEST.SILENCE = PIXEL_MANIFEST.ZONES.SILENCE;
PIXEL_MANIFEST.MATAALA = PIXEL_MANIFEST.ZONES.MATAALA;
PIXEL_MANIFEST.CINEMA = PIXEL_MANIFEST.ZONES.CINEMA;
PIXEL_MANIFEST.ETHEL_GALLERY = PIXEL_MANIFEST.ZONES.GALLERY;

window.PIXEL_MANIFEST = PIXEL_MANIFEST;
console.log('Manifest v3.0: 📦 PORTABLE MODE (all local paths)');
