// panel-interaction.js - Panel tap/hover/swipe logic
// COMBINED version - includes audio stopping logic (no monkey-patching)

// Swipe detection variables
let touchStartY = 0;
let touchEndY = 0;
const swipeThreshold = 50; // minimum distance for a swipe

// Combined handlePanelTap - includes audio stop logic
function handlePanelTap(selected, other, hoverClass) {
    // Stop character audio when switching to NALANI (right panel)
    if (selected === rightPanel && typeof audioController !== 'undefined' && audioController.isPlaying) {
        audioController.stop();
    }

    // Stop NALANI audio when switching back to SILENCE (left panel)
    if (selected === leftPanel && nalaniAudioController && nalaniAudioController.isPlaying) {
        nalaniAudioController.stop();
    }

    // DESKTOP: Just handle cursor classes
    if (window.innerWidth > 768) {
        body.classList.remove('hover-left', 'hover-right');
        body.classList.add(hoverClass);
        return;
    }

    // MOBILE: Allow switching between panels at any time
    // Reset States
    selected.classList.remove('inactive');
    other.classList.remove('active');

    // Set New State (Arm the selected panel)
    selected.classList.add('active');
    other.classList.add('inactive');

    // Haptic feedback (Android)
    if (navigator.vibrate) navigator.vibrate(15);
}

// Left panel click handler
leftPanel.addEventListener('click', (e) => {
    // Ignore if clicking the button
    if (e.target.closest('a')) return;
    handlePanelTap(leftPanel, rightPanel, 'hover-left');
});

// Right panel click handler with NALANI audio
rightPanel.addEventListener('click', async (e) => {
    if (e.target.closest('a')) return;

    // Trigger NALANI bounce animation
    const nalaniContainer = document.querySelector('.nalani-container');
    if (nalaniContainer) {
        nalaniContainer.classList.remove('bounce');
        // Force reflow to restart animation
        void nalaniContainer.offsetWidth;
        nalaniContainer.classList.add('bounce');
    }

    // Initialize NALANI audio controller if needed
    if (!nalaniAudioController) {
        console.log('Creating NALANI audio controller...');
        const nalaniAudio = document.createElement('audio');
        nalaniAudio.id = 'nalaniAudio';
        nalaniAudio.preload = 'none';
        document.body.appendChild(nalaniAudio);
        nalaniAudioController = new AudioController(nalaniAudio);
    }

    // Select random NALANI track (different from last one if possible)
    let selectedTrack;
    if (nalaniTracks.length > 1) {
        do {
            selectedTrack = nalaniTracks[Math.floor(Math.random() * nalaniTracks.length)];
        } while (selectedTrack === lastNalaniTrack && nalaniTracks.length > 1);
    } else {
        selectedTrack = nalaniTracks[0];
    }

    lastNalaniTrack = selectedTrack;

    console.log('Playing NALANI:', selectedTrack.text, selectedTrack.url);

    // Play NALANI track
    try {
        await nalaniAudioController.playTrack(selectedTrack.url, 1500);
        console.log('NALANI track started successfully');
    } catch (error) {
        console.error('NALANI playback error:', error);
    }

    // Also handle panel switching
    handlePanelTap(rightPanel, leftPanel, 'hover-right');
});

// Desktop Hover Events
leftPanel.addEventListener('mouseenter', () => body.classList.add('hover-left'));
leftPanel.addEventListener('mouseleave', () => body.classList.remove('hover-left'));
rightPanel.addEventListener('mouseenter', () => body.classList.add('hover-right'));
rightPanel.addEventListener('mouseleave', () => body.classList.remove('hover-right'));

// Mobile swipe detection
document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (window.innerWidth > 768) return; // Only on mobile

    touchEndY = e.changedTouches[0].screenY;
    const swipeDistance = touchStartY - touchEndY;

    // Swipe up (to see MATAALA/bottom panel)
    if (swipeDistance > swipeThreshold) {
        handlePanelTap(rightPanel, leftPanel, 'hover-right');
    }
    // Swipe down (to see SILENCE/top panel)
    else if (swipeDistance < -swipeThreshold) {
        handlePanelTap(leftPanel, rightPanel, 'hover-left');
    }
}, { passive: true });
