/**
 * PIXELSTORTION SITE MANIFEST v4.0 (Studio Cleanup)
 * ----------------------------------------------------------------
 * Lean manifest reflecting the PIXELSTORTION studio after the
 * Mataala-only cleanup. SITT-related content (zones/silence,
 * ethel_gallery, silentcinema, games, podcasts, character media
 * libraries) now lives on silenceisthetrauma.com and on the
 * character-domain sites. Cross-domain destinations are surfaced
 * here as SIBLINGS so legacy code keeps resolving.
 *
 * Loaded by /index.html, /museum.html, /figures.html, /songs.html.
 * Only PIXEL_MANIFEST.SILENCE is currently referenced from page code
 * (the back-link onclick handler). The rest is for future use and
 * for any console / tooling that inspects the manifest.
 * ----------------------------------------------------------------
 */

const PIXEL_MANIFEST = {
    // On-domain studio pages (paths relative to https://pixelstortion.com/)
    PAGES: {
        HOME:       '/',
        MUSEUM:     '/museum.html',
        FIGURES:    '/figures.html',
        SONGS:      '/songs.html',
        BIO:        '/bio/',
        PHILOSOPHY: '/bio/philosophy.html'
    },

    // Mataala in-world journalism shipping with this domain
    ARCHIVES: {
        GEOLOGICAL_DETERMINISM: '/library/loc_archives/Geological_Determinism_in_the_Mataala_Conflict.html',
        NALANI_ARTIFACTS:       '/library/loc_archives/Museum_Nalani_Artifacts_1.html'
    },

    // Local asset folders that still ship with this domain
    LIBRARY: {
        MATAALA:  '/library/loc_mataala/',
        ARCHIVES: '/library/loc_archives/'
    },

    // Sibling works the studio publishes (external destinations)
    SIBLINGS: {
        SILENCE_IS_THE_TRAUMA: 'https://silenceisthetrauma.com/',
        ETHEL_RYKER:           'https://ethelryker.com/',
        ISLA_BAND:             'https://islaband.com/',
        DOMINIC_RYKER:         'https://dominicryker.com/',
        VEX_NETWORK:           'https://silenceisthetrauma.com/veX_social_network/',
        GALLERY:               'https://silenceisthetrauma.com/zones/ethel_gallery/',
        SILENT_CINEMA:         'https://silenceisthetrauma.com/zones/silentcinema/',
        SHORT_STORIES:         'https://silenceisthetrauma.com/stories.html'
    },

    IS_LOCAL: true
};

// --- COMPATIBILITY SHORTCUTS (legacy code in the 4 root pages uses these) ---
PIXEL_MANIFEST.SILENCE = PIXEL_MANIFEST.SIBLINGS.SILENCE_IS_THE_TRAUMA;

window.PIXEL_MANIFEST = PIXEL_MANIFEST;
console.log('Manifest v4.0: PIXELSTORTION studio, Mataala on-domain, siblings external');
