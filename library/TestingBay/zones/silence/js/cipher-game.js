// cipher-game.js - Protocol panel and media panel logic

// --- CIPHER GAME ---
function toggleCipherGame(protocolName) {
    const panel = document.getElementById('cipher-game-panel');
    const iframe = document.getElementById('cipher-game-iframe');
    const root = document.documentElement;

    // Protocol URL mapping - Uses centralized manifest
    const protocolUrls = {
        'isla': PIXEL_MANIFEST.GAMES.ISLA,
        'trivia': PIXEL_MANIFEST.GAMES.TRIVIA,
        'dom': PIXEL_MANIFEST.GAMES.DOMINIC,
        'ethel': PIXEL_MANIFEST.GAMES.ETHEL
    };

    // Protocol theme colors
    const protocolThemes = {
        'isla': { color1: '#ff00ff', color2: '#9d00ff' },
        'trivia': { color1: '#00ff41', color2: '#00ff00' },
        'dom': { color1: '#ff0055', color2: '#ff0000' },
        'ethel': { color1: '#00d4ff', color2: '#0088ff' }
    };

    // If no protocol specified (close button clicked), close the panel
    if (!protocolName) {
        panel.classList.remove('open');
        protocolPanelOpen = false; // Mark panel as closed

        // Revert theme to default green
        root.style.setProperty('--glitch-color-1', '#00ff41');
        root.style.setProperty('--glitch-color-2', '#ff0055');

        // Resume main site music
        if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
            ytPlayer.playVideo();
        }

        // Reset game (clear iframe completely - both src AND srcdoc)
        iframe.removeAttribute('srcdoc');
        iframe.src = 'about:blank';

        return;
    }

    // Opening a protocol
    const isAlreadyOpen = panel.classList.contains('open');

    // Set the theme for the selected protocol
    const theme = protocolThemes[protocolName];
    if (theme) {
        root.style.setProperty('--glitch-color-1', theme.color1);
        root.style.setProperty('--glitch-color-2', theme.color2);
    }

    // Pause main site music
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
        ytPlayer.pauseVideo();
    }

    // Load the protocol URL
    const protocolUrl = protocolUrls[protocolName];
    if (protocolUrl) {
        // Clear any stale srcdoc before loading new URL
        iframe.removeAttribute('srcdoc');
        iframe.src = protocolUrl;
    } else {
        // Fallback for undefined protocols
        iframe.src = 'about:blank';
        iframe.srcdoc = `
            <html>
                <body style="background: #000; color: #ff0055; font-family: monospace; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
                    <div style="text-align: center;">
                        <h1 style="font-size: 3rem; margin-bottom: 1rem;">ACCESS DENIED</h1>
                        <p style="font-size: 1.2rem;">Protocol "${protocolName.toUpperCase()}" is currently unavailable.</p>
                        <p style="font-size: 0.9rem; margin-top: 2rem; opacity: 0.7;">CLEARANCE LEVEL: INSUFFICIENT</p>
                    </div>
                </body>
            </html>
        `;
    }

    // Open the panel if not already open
    if (!isAlreadyOpen) {
        panel.classList.add('open');
    }
    protocolPanelOpen = true; // Mark panel as open (prevents music auto-start)
}

// --- MEDIA PANEL (Cinema/Gallery) ---
function toggleMediaPanel(type) {
    const panel = document.getElementById('media-panel');
    const iframe = document.getElementById('media-panel-iframe');

    // Media URL mapping - Uses centralized manifest
    const mediaUrls = {
        'cinema': PIXEL_MANIFEST.CINEMA,
        'gallery': PIXEL_MANIFEST.ETHEL_GALLERY
    };

    // If no type specified (close button clicked), close the panel
    if (!type) {
        panel.classList.remove('open');
        mediaPanelOpen = false;

        // Resume main site music
        if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
            ytPlayer.playVideo();
        }

        // Clear iframe
        iframe.src = 'about:blank';
        return;
    }

    // Opening a media panel
    // Pause main site music
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
        ytPlayer.pauseVideo();
    }

    // Load the media URL
    const mediaUrl = mediaUrls[type];
    if (mediaUrl) {
        iframe.src = mediaUrl;
    } else {
        iframe.src = 'about:blank';
    }

    // Open the panel
    panel.classList.add('open');
    mediaPanelOpen = true;
}
