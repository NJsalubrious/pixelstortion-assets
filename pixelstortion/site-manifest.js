/**
 * PIXELSTORTION - Centralized URL Manifest
 * =========================================
 * SIMPLE WORKFLOW:
 * 1. Make changes to your files locally
 * 2. Commit & Push via TortoiseGit  
 * 3. Wait ~2 minutes for cache refresh
 * 4. Changes are live!
 * 
 * Using 'main' branch URLs = automatic updates, no commit hash juggling
 */

const PIXEL_MANIFEST = {

    // ===== MAIN PAGES =====
    HOME: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/pixelstortion/main/index.html',

    SILENCE: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/pixelstortion/main/silence/index.html',

    MATAALA: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/pixelstortion/main/mataala/index.html',

    CINEMA: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/pixelstortion/main/silentcinema/index.html',

    // ===== PROTOCOL GAMES =====
    GAMES: {
        ISLA: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/games/isla_protocol.html',
        TRIVIA: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/games/trivia_protocol.html',
        DOMINIC: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/games/Dominics_game.html',
        ETHEL: 'https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/games/ethel_scanner.html'
    },

    // ===== EXTERNAL LINKS =====
    BIO: 'https://bio.pixelstortion.com'
};

// Make it globally available
window.PIXEL_MANIFEST = PIXEL_MANIFEST;
