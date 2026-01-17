/**
 * PIXELSTORTION - Centralized URL Manifest
 * =========================================
 
 
 */

const PIXEL_MANIFEST = {

    // ===== MAIN PAGES =====
    HOME: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/pixelstortion/main/index.html',

    SILENCE: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/pixelstortion/main/silence/index.html',

    MATAALA: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/pixelstortion/main/mataala/index.html',

    CINEMA: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/pixelstortion/main/silentcinema/index.html',

    ETHEL_GALLERY: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/pixelstortion/main/ethel_gallery/index.html',

    // ===== PROTOCOL GAMES ===== 
    GAMES: {
        ISLA: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/games/isla_protocol.html',
        TRIVIA: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/games/trivia_protocol.html',
        DOMINIC: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/games/Dominics_game.html',
        ETHEL: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/games/ethel_scanner.html'
    },

    // ===== EXTERNAL LINKS =====
    BIO: 'https://bio.pixelstortion.com',

    // ===== ASSET BASES (for dynamic content) =====
    ASSETS: {
        // Song cover art - main branch = auto-updates on git push
        SONG_COVERS: 'https://raw.githubusercontent.com/NJsalubrious/pixelstortion-assets/SongCovers/',

        // Album/EP covers (legacy)
        ALBUM_COVERS: 'https://raw.githubusercontent.com/NJsalubrious/pixelstortion-assets/album_ep_single_covers/',

        // Gallery data files
        GALLERY_DATA: './ethel_lyrics_data.js',
        GALLERY_CONTENT: './song_content.txt',

        // The map that controls "The Story" images
        GALLERY_MAP: 'https://pixelstortion.com/pixelstortion/assets_for_ethel_songs/gallery_map.json',

        // The base URL for all "The Files" archive pages
        ARCHIVES_BASE: 'https://pixelstortion.com/archives'
    }
};

// Make it globally available
window.PIXEL_MANIFEST = PIXEL_MANIFEST;
