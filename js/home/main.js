// main.js - Entry point: initialization, event wiring, and startup

// Initialize audio controller
const audioController = new AudioController();

// Auto-reset to SILENCE when track ends
const audio = document.getElementById('characterAudio');
audio.addEventListener('ended', () => {
    // Reset to SILENCE
    title.textContent = 'SILENCE';
    subtitle.textContent = 'IS THE TRAUMA';

    const subjectWrapper = document.querySelectorAll('.redacted-wrapper')[0];
    const subjectText = subjectWrapper.querySelector('span:not(.redacted-bar)') || subjectWrapper.childNodes[0];
    if (subjectText) {
        subjectText.textContent = 'SILENCE';
    }

    const messageText = messageWrapper.querySelector('span:not(.redacted-bar)') || messageWrapper.childNodes[0];
    if (messageText) {
        messageText.textContent = '"Silence isn\'t absence."';
    }

    // Remove all vibe classes
    leftPanel.classList.remove('vibe-isla', 'vibe-ethel', 'vibe-dominic', 'vibe-witness', 'vibe-kinley', 'vibe-sticky');

    // Mark character as inactive to allow ambient glitch
    isCharacterActive = false;

    // Reset tracking
    lastSelectedTrack = null;
    lastSelectedCharacter = null;
    lastSelectedMessage = null;
});

// Wire up glitch trigger on left panel click
leftPanel.addEventListener('click', triggerGlitch);

// Start ambient glitch cycle
scheduleNextGlitch();

// Debug: Check if audio element exists
console.log('Audio element:', document.getElementById('characterAudio'));
console.log('Audio controller initialized:', audioController);
