// config.js - State variables and configuration constants
// MUST load first - other scripts depend on these globals

// --- STATE VARIABLES (shared across scripts) ---
let ytPlayer = null;
let isPlaying = false;
let currentTrackId = null;
let galleryInterval = null;
let currentImageIndex = 0;
let activeImageElement = 1;
let galleryMap = {};
let protocolPanelOpen = false;
let mediaPanelOpen = false;
let currentTab = 'home';
let activePlayerType = null; // 'youtube' only

// --- CONFIGURATION ---
// Use the centralized manifest for gallery map URL
const MAP_URL = (typeof PIXEL_MANIFEST !== 'undefined' && PIXEL_MANIFEST.ASSETS?.GALLERY_MAP)
    ? PIXEL_MANIFEST.ASSETS.GALLERY_MAP
    : "/library/char_ethel_media/gallery_map.json";
