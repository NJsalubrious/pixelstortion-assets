/**
 * PIXELSTORTION - Centralized URL Manifest
 * =========================================
 * This is the "Source of Truth" for all site links.
 * 
 * HOW TO UPDATE:
 * 1. Push your new files to GitHub
 * 2. Get the new Githack URLs
 * 3. Update ONLY this file with new URLs
 * 4. All pages will automatically use the new links
 * 
 * CACHE BUSTING:
 * When you update a URL here, append ?v=X (increment X) to force refresh
 * Example: SILENCE: 'https://...silence/index.html?v=2'
 */

const PIXEL_MANIFEST = {

    // ===== MAIN PAGES =====
    HOME: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/916844b1d47502996a7e01d7f8265efc50cdcf3b/pixelstortion/main/index.html',

    SILENCE: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/5cbcf4d27b7c152395512698e64a7ccfcb90ce22/pixelstortion/main/silence/index.html',

    MATAALA: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/5cbcf4d27b7c152395512698e64a7ccfcb90ce22/pixelstortion/main/mataala/index.html',

    CINEMA: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/5cbcf4d27b7c152395512698e64a7ccfcb90ce22/pixelstortion/main/silentcinema/index.html',

    // ===== PROTOCOL GAMES =====
    GAMES: {
        ISLA: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/5cbcf4d27b7c152395512698e64a7ccfcb90ce22/games/isla_protocol.html',

        TRIVIA: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/5cbcf4d27b7c152395512698e64a7ccfcb90ce22/games/trivia_protocol.html',

        DOMINIC: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/5cbcf4d27b7c152395512698e64a7ccfcb90ce22/games/Dominics_game.html',

        ETHEL: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/5cbcf4d27b7c152395512698e64a7ccfcb90ce22/games/ethel_scanner.html'
    },

    // ===== EXTERNAL LINKS =====
    BIO: 'https://bio.pixelstortion.com'
};

// Make it globally available (for compatibility with older code)
window.PIXEL_MANIFEST = PIXEL_MANIFEST;
