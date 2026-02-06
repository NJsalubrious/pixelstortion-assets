// youtube-player.js - YouTube API callbacks and player control
// Note: onYouTubeIframeAPIReady MUST be global for YouTube API to find it

// YouTube Player Setup - Called by YouTube API when ready
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtube-player', {
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'modestbranding': 1,
            'rel': 0,
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log("YouTube player ready");

    // Visitor Selection - Play Track 71 or specific track from URL
    const selectionMap = {
        "default": 71,
        "langtang": 71,
        "emotional_return": 68,
        "drop_from_the_fourth": 67,
        "dont_wake_him": 64,
        "pymble": 55,
        "ryker_report": 38,
        "negative_space": 8
    };

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

    // Play the selected track
    setTimeout(() => selectTrack(trackId), 500);
}

function onPlayerStateChange(event) {

    const status = document.getElementById('player-status');
    const playBtn = document.getElementById('play-btn');
    const visualizer = document.getElementById('visualizer-container');

    if (event.data === YT.PlayerState.PLAYING) {
        status.innerText = 'STREAMING';
        playBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">pause</span>';
        visualizer.style.opacity = '1';
        isPlaying = true;
    } else if (event.data === YT.PlayerState.PAUSED) {
        status.innerText = 'PAUSED';
        playBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">play_arrow</span>';
        visualizer.style.opacity = '0.3';
        isPlaying = false;
    } else if (event.data === YT.PlayerState.ENDED) {
        status.innerText = 'TRACK ENDED';
        playBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">play_arrow</span>';
        visualizer.style.opacity = '0';
        isPlaying = false;

        // Auto-advance to next track
        const nextId = currentTrackId + 1;
        const nextTrack = tracks.find(t => t.id === nextId);

        if (nextTrack) {
            selectTrack(nextId);
        } else {
            status.innerText = "PLAYLIST ENDED";
        }
    }
}

function selectTrack(id) {
    // Don't restart if same track is already playing
    if (currentTrackId === id) {
        console.log(`Track ${id} already playing - skipping restart`);
        return;
    }

    currentTrackId = id;
    const track = tracks.find(t => t.id === id);

    // UI Updates
    document.getElementById('current-track-title').innerText = track.title;

    // UPDATE DATE
    const dateEl = document.getElementById('current-track-date');
    if (track.storyDate) {
        dateEl.innerText = `TIMELINE: ${track.storyDate}`;
        dateEl.style.color = "#00ff41"; // Matrix Green
    } else {
        dateEl.innerText = "TIMELINE: REDACTED";
        dateEl.style.color = "#555"; // Dim Gray
    }

    document.getElementById('current-track-artist').innerText = "SOURCE NODE: " + (track.videoId || "UNKNOWN");
    document.getElementById('lyrics-display').innerText = track.lyric;
    document.getElementById('lyrics-display').scrollTop = 0;

    const ytIframe = document.getElementById('youtube-player'); // The actual iframe

    // Highlight active track
    document.querySelectorAll('[id^="track-"]').forEach(el => el.classList.remove('track-active'));
    document.getElementById(`track-${id}`).classList.add('track-active');

    // --- RESET STATES ---
    // Stop Gallery Timer by default
    if (galleryInterval) clearInterval(galleryInterval);

    // Default: Hide YouTube Player behind gallery
    if (ytIframe) ytIframe.style.zIndex = "-1";




    // Play YouTube Video (only if protocol panel is NOT open)
    if (ytPlayer && ytPlayer.loadVideoById && track.videoId) {
        // If protocol panel is open, just cue the video (don't auto-play)
        if (protocolPanelOpen) {
            ytPlayer.cueVideoById({
                videoId: track.videoId,
                suggestedQuality: 'hd720'
            });
            console.log("Protocol panel open - cueing video without auto-play");
        } else {
            // Normal behavior - load and auto-play
            ytPlayer.loadVideoById({
                videoId: track.videoId,
                suggestedQuality: 'hd720'
            });
        }
        activePlayerType = 'youtube';


        // --- CHECK: SHOW VIDEO OR SHOW GALLERY? ---
        if (track.showVideo === true) {
            // VIDEO MODE: Bring player above gallery
            if (ytIframe) {
                ytIframe.style.zIndex = '20'; // Above gallery
                ytIframe.style.opacity = '1';
            }
            console.log("Video Mode Active: Gallery disabled, player on-screen");
        } else {
            // GALLERY MODE: Keep player behind gallery (audio only), start slides
            if (ytIframe) {
                ytIframe.style.zIndex = '-1'; // Behind gallery
                ytIframe.style.opacity = '0';
            }
            const folderKey = `track_${id.toString().padStart(2, '0')}`;
            if (galleryMap[folderKey] && galleryMap[folderKey].length > 0) {
                startGallery(galleryMap[folderKey]);
            } else {
                const dummyList = [];
                for (let i = 1; i <= (track.imageCount || 3); i++) {
                    const num = i < 10 ? '0' + i : i;
                    dummyList.push(`${track.galleryPath || ''}${num}.jpg`);
                }
                startGallery(dummyList);
            }
        }
    }
}

function togglePlay() {
    console.log('togglePlay called');

    if (!currentTrackId) {
        console.log('No track selected, selecting track 1');
        selectTrack(1);
        return;
    }

    console.log('ytPlayer:', ytPlayer);
    console.log('activePlayerType:', activePlayerType);

    if (ytPlayer && ytPlayer.getPlayerState) {
        const state = ytPlayer.getPlayerState();
        console.log('Player state:', state);

        if (state === 1) { // Playing
            console.log('Pausing video');
            ytPlayer.pauseVideo();
        } else {
            console.log('Playing video');
            ytPlayer.playVideo();
        }
    } else {
        console.error('YouTube player not ready or getPlayerState not available');
    }
}

function toggleFocusMode() {
    document.body.classList.toggle('focus-mode');
}

// Cleanup gallery on page unload
window.addEventListener('beforeunload', () => {
    if (galleryInterval) {
        clearInterval(galleryInterval);
    }
});
