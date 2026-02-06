// main.js - Entry point: initialization and visitor selection

// Init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initNoiseCanvas();
    renderFiles();
    renderProfiles();
    renderGames();
    renderPlaylist();
    createVisualizerBars();
    initCursor();
    loadGalleryMap();
});

// INSTANT AUDIO - Select track on load (preserves double-fire pattern)
// This ensures UI updates happen immediately even if YouTube API takes time
window.addEventListener('load', function () {
    // Visitor Selection Map
    const selectionMap = {
        "default": 16,
        "langtang": 71,
        "emotional_return": 68,
        "drop_from_the_fourth": 67,
        "dont_wake_him": 64,
        "pymble": 55,
        "ryker_report": 38,
        "negative_space": 8
    };

    // Check URL for selection parameter
    const urlParams = new URLSearchParams(window.location.search);
    const selectionParam = urlParams.get('selection');
    let trackId = selectionMap["default"];

    if (selectionParam) {
        for (const [key, id] of Object.entries(selectionMap)) {
            if (key !== "default" && selectionParam.toLowerCase().includes(key)) {
                trackId = id;
                console.log(`Visitor Selection: ${key} -> Track ${id}`);
                break;
            }
        }
    }

    // Just select the track - the media player handles everything
    setTimeout(() => selectTrack(trackId), 500);
});
