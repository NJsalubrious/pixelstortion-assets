/**
 * Ambient Audio Player
 * Plays the theme song on loop in the persistent shell.
 * Respects browser autoplay policy.
 */

(function () {
    'use strict';

    // Prevent duplicate initialization (Barba re-executes scripts on page swap)
    if (window.AmbientAudio && document.getElementById('ambient-audio')) {
        return;
    }

    const TRACK_URL = 'theme_song/NALANI_Silent_Watcher.mp3';

    let audio = null;
    let muteToggle = null;
    let isMuted = false;
    let isFadedOut = false;
    let fadeInterval = null;
    const TARGET_VOLUME = 0.35; // Ambient

    /**
     * Create the audio element in the persistent shell
     */
    function createAudioElement() {
        audio = document.createElement('audio');
        audio.id = 'ambient-audio';
        audio.preload = 'auto';
        audio.volume = TARGET_VOLUME;
        audio.src = TRACK_URL;
        audio.loop = true;

        document.body.appendChild(audio);
    }

    /**
     * Create the mute/unmute toggle button in the nav
     */
    function createMuteToggle() {
        muteToggle = document.createElement('button');
        muteToggle.id = 'ambient-mute-toggle';
        muteToggle.setAttribute('aria-label', 'Toggle ambient music');
        muteToggle.setAttribute('title', 'Toggle ambient music');
        muteToggle.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px;">volume_up</span>';
        
        // Style it
        Object.assign(muteToggle.style, {
            background: 'none',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            transition: 'all 0.3s ease',
            marginLeft: '12px',
            opacity: '0.6',
            flexShrink: '0'
        });

        muteToggle.addEventListener('mouseover', () => {
            muteToggle.style.opacity = '1';
            muteToggle.style.borderColor = '#fff';
        });
        muteToggle.addEventListener('mouseout', () => {
            muteToggle.style.opacity = '0.6';
            muteToggle.style.borderColor = 'rgba(255,255,255,0.15)';
        });

        muteToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMute();
        });

        // Insert into the nav bar, after the desktop nav links
        const navLinks = document.querySelector('.ml-10.flex.items-baseline');
        if (navLinks) {
            navLinks.appendChild(muteToggle);
        }
    }

    /**
     * Toggle mute state
     */
    function toggleMute() {
        if (!audio) return;
        
        if (audio.paused) {
            // First time play (or unpausing)
            audio.play().catch(e => console.log('Autoplay prevented:', e));
            isMuted = false;
        } else {
            isMuted = !isMuted;
        }
        
        updateMuteUI();
        
        // If not faded out by a specific page, apply mute state
        if (!isFadedOut) {
            audio.volume = isMuted ? 0 : TARGET_VOLUME;
        }
    }

    /**
     * Update icon based on state
     */
    function updateMuteUI() {
        if (!muteToggle) return;
        if (isMuted || (audio && audio.paused)) {
            muteToggle.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px;">volume_off</span>';
            muteToggle.style.color = '#888';
        } else {
            muteToggle.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px;">volume_up</span>';
            muteToggle.style.color = '#fff';
        }
    }

    /**
     * Try to start audio after user interaction (browser policy)
     */
    function tryStartAudio() {
        if (!audio || !audio.paused || isMuted) return;
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                updateMuteUI();
            }).catch(error => {
                // Autoplay was prevented. Wait for user interaction.
                console.log("Audio autoplay prevented. Will play on interaction.");
            });
        }
    }

    /**
     * Cross-fade to 0
     */
    function fadeOutAudio() {
        if (!audio) return;
        isFadedOut = true;
        clearInterval(fadeInterval);
        
        fadeInterval = setInterval(() => {
            if (audio.volume > 0.05) {
                audio.volume -= 0.05;
            } else {
                audio.volume = 0;
                clearInterval(fadeInterval);
            }
        }, 100);
    }

    /**
     * Cross-fade to target volume
     */
    function fadeInAudio() {
        if (!audio) return;
        isFadedOut = false;
        if (isMuted) return; // Stay at 0 if explicitly muted
        
        clearInterval(fadeInterval);
        if (audio.paused) {
            tryStartAudio();
        }
        
        fadeInterval = setInterval(() => {
            if (audio.volume < TARGET_VOLUME - 0.05) {
                audio.volume += 0.05;
            } else {
                audio.volume = TARGET_VOLUME;
                clearInterval(fadeInterval);
            }
        }, 100);
    }

    // Expose control to global scope (for Barba router)
    window.AmbientAudio = {
        fadeOut: fadeOutAudio,
        fadeIn: fadeInAudio
    };

    // Initialize
    window.addEventListener('DOMContentLoaded', () => {
        createAudioElement();
        createMuteToggle();

        // If the visitor landed directly on the Songs page, don't start the
        // theme — the YouTube player on that page will be the audio source.
        // Fade in when they navigate away (Barba router calls AmbientAudio.fadeIn).
        const initialContainer = document.querySelector('[data-barba="container"]');
        const initialNamespace = initialContainer && initialContainer.getAttribute('data-barba-namespace');
        if (initialNamespace === 'audio') {
            isFadedOut = true;
            audio.volume = 0;
            updateMuteUI();
            return;
        }

        // Try autoplay
        tryStartAudio();

        // Listen for interactions to start audio if autoplay failed
        document.body.addEventListener('click', () => {
            tryStartAudio();
        }, { once: true });

        // Also listen to Barba transitions to try playing
        document.body.addEventListener('click', (e) => {
            if(e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) {
                tryStartAudio();
            }
        });
    });
})();
