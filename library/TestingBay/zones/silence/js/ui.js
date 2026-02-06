// ui.js - Tab navigation, cursor, modals, rendering functions

function initCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorGlow = document.getElementById('cursor-glow');

    document.addEventListener('mousemove', (e) => {
        if (cursorDot) cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        if (cursorGlow) cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}

function switchTab(tabId) {
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('active-tab', 'text-white');
        btn.classList.add('text-gray-300');
    });
    const activeBtn = document.getElementById(`nav-${tabId}`);
    if (activeBtn) {
        activeBtn.classList.add('active-tab', 'text-white');
        activeBtn.classList.remove('text-gray-300');
    }
    ['home-section', 'files-section', 'profiles-section', 'games-section', 'audio-section'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(`${tabId}-section`).classList.remove('hidden');
    document.getElementById('mobile-menu').classList.add('hidden');
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

function renderFiles() {
    const container = document.getElementById('files-grid');

    // Sort articles by sortDate (newest first)
    const sortedArticles = [...articles].sort((a, b) => {
        return new Date(b.sortDate) - new Date(a.sortDate);
    });

    container.innerHTML = sortedArticles.map((article, index) => {
        // Find original index for onclick handler
        const originalIndex = articles.findIndex(a => a.title === article.title);

        return `
        <div class="bg-zinc-900 border border-gray-800 hover:border-gray-600 transition-colors group cursor-pointer" onclick="openArticle(${originalIndex})" style="animation: fadeInUp 0.6s ease forwards ${index * 0.1}s; opacity: 0;">
            <div class="aspect-video overflow-hidden bg-black relative">
                ${article.thumbnail ?
                `<img src="${article.thumbnail}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` :
                `<div class="w-full h-full" style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);"></div>`
            }
                <div class="absolute bottom-2 left-2 bg-black/80 px-2 py-1 text-[10px] font-mono-custom text-white">REF: 00${index + 1}-A</div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-white group-hover:text-green-500 transition-colors mb-1">${article.title}</h3>
                <p class="text-xs font-mono-custom text-gray-500 mb-4">${article.date}</p>
                <p class="text-gray-400 text-sm line-clamp-3">${article.excerpt}</p>
            </div>
        </div>
    `;
    }).join('');
}

function renderProfiles() {
    const container = document.getElementById('profiles-grid');
    container.innerHTML = profiles.map((profile, index) => `
        <div class="group relative bg-black border border-gray-800 hover:border-gray-600 transition-all duration-500 overflow-hidden" style="animation: fadeInUp 0.6s ease forwards ${index * 0.15}s; opacity: 0;">
            <div class="aspect-[3/4] overflow-hidden relative">
                <!-- Video -->
                <video class="character-video w-full h-full object-cover filter grayscale group-hover:filter-none transition-all duration-700" 
                       muted loop playsinline preload="metadata">
                    <source src="${profile.video}" type="video/mp4">
                </video>
                <!-- Dark overlay -->
                <div class="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all duration-500"></div>
                <!-- Character initial overlay -->
                <div class="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500">
                    <span class="text-[20vw] md:text-[12rem] font-bold text-white/10 font-mono">${profile.name[0]}</span>
                </div>
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                <!-- Character info -->
                <div class="absolute bottom-0 left-0 p-6">
                    <h3 class="text-3xl font-bold text-white mb-1">${profile.name}</h3>
                    <p style="color: ${profile.color};" class="font-mono-custom text-xs tracking-wider">STATUS: ${profile.status}</p>
                </div>
            </div>
            <div class="p-6 space-y-4">
                <p class="text-gray-400 text-sm leading-relaxed">${profile.desc}</p>
                <div class="border-t border-gray-800 pt-4">
                    <p class="text-xs text-gray-500 font-mono-custom mb-2">${profile.notes}:</p>
                    <p class="text-sm text-gray-300 italic">${profile.quote}</p>
                </div>
            </div>
        </div>
    `).join('');

    // Add video interaction functionality
    setTimeout(() => {
        const characterVideos = document.querySelectorAll('.character-video');

        // Intersection Observer for scroll-into-view on mobile
        const observerOptions = {
            threshold: 0.5, // Play when 50% visible
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting && window.innerWidth <= 768) {
                    // On mobile, play when scrolled into view
                    video.play().catch(err => console.log('Video play failed:', err));
                } else if (!entry.isIntersecting) {
                    // Pause when out of view
                    video.pause();
                    video.currentTime = 0;
                }
            });
        }, observerOptions);

        characterVideos.forEach(video => {
            const parentCard = video.closest('.group');
            if (parentCard) {
                // Desktop: hover to play
                parentCard.addEventListener('mouseenter', function () {
                    video.play().catch(err => console.log('Video play failed:', err));
                });
                parentCard.addEventListener('mouseleave', function () {
                    if (window.innerWidth > 768) {
                        // Only pause on desktop hover-out
                        video.pause();
                        video.currentTime = 0;
                    }
                });

                // Click to play (if paused) - doesn't pause if already playing
                parentCard.addEventListener('click', function () {
                    if (video.paused) {
                        video.play().catch(err => console.log('Video play failed:', err));
                    }
                });

                // Observe video for scroll-into-view
                observer.observe(video);
            }
        });
    }, 100);
}

function renderGames() {
    const container = document.getElementById('games-grid');
    const games = Object.entries(PIXEL_MANIFEST.GAMES);

    container.innerHTML = games.map(([key, game], index) => `
        <div class="group relative bg-black border border-gray-800 hover:border-gray-600 transition-all duration-500 overflow-hidden cursor-pointer" 
             onclick="openGameModal('${key}')"
             style="animation: fadeInUp 0.6s ease forwards ${index * 0.1}s; opacity: 0;">
            <div class="aspect-[3/4] overflow-hidden relative">
                <!-- Thumbnail Image -->
                <img src="${game.thumb}" 
                     alt="${game.name}" 
                     class="w-full h-full object-cover filter grayscale group-hover:filter-none transition-all duration-700">
                <!-- Dark overlay -->
                <div class="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all duration-500"></div>
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                <!-- Game name (matching profile styling) -->
                <div class="absolute bottom-0 left-0 p-4 md:p-6">
                    <h3 class="text-xl md:text-2xl font-bold text-white mb-1">${game.name}</h3>
                    <p class="font-mono-custom text-xs tracking-wider text-green-500 group-hover:text-green-400">PLAY NOW</p>
                </div>
            </div>
        </div>
    `).join('');
}

function openGameModal(gameKey) {
    const game = PIXEL_MANIFEST.GAMES[gameKey];
    if (!game) return;

    const modal = document.getElementById('game-modal');
    const iframe = document.getElementById('game-modal-iframe');
    const modalContent = document.getElementById('game-modal-content');

    // Set modal size based on fullscreen flag
    if (game.fullscreen) {
        modalContent.className = 'relative w-[95vw] h-[90vh] bg-black rounded-lg overflow-hidden';
    } else {
        modalContent.className = 'relative w-full max-w-2xl h-[80vh] bg-black rounded-lg overflow-hidden';
    }

    // Resolve game URL - always use relative path from current page (zones/silence/)
    // This works for both local file:// and GitHub Pages (even in subdirectories)
    // Convert /zones/games/... to ../games/...
    let gameUrl = game.url.replace('/zones/', '../');

    console.log('Original URL:', game.url);
    console.log('Resolved URL:', gameUrl);
    iframe.src = gameUrl;

    // Pause main site music
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
        ytPlayer.pauseVideo();
    }

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeGameModal() {
    const modal = document.getElementById('game-modal');
    const iframe = document.getElementById('game-modal-iframe');

    // Clear iframe
    iframe.src = 'about:blank';

    // Resume music
    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
        ytPlayer.playVideo();
    }

    // Hide modal
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function openArticle(index) {
    const article = articles[index];

    // Map articles to tracks (all 9 articles covered)
    const articleToTrackMap = {
        "THE MERIDIAN: NEPAL 1966 - FIELD NOTES": 71,  // Travelers (langtang)
        "Isla's Emotional Return to the Stage - Cultural Review": 68,  // What You Don't See
        "ISLA AND THE QUIET TRUTH BEHIND THE NOISE": 67,  // Drop From the Fourth
        "ISLA - FLIGHT TRAGEDY - 2017": 64,  // Don't Wake Him Yet
        "From Pymble to the Pit: ISLA": 55,  // This Isn't Therapy
        "THE RYKER REPORT": 38,  // You Will Thank Me Later
        "EXPULSION RECORD: ETHEL RYKER": 38,  // You Will Thank Me Later (Ryker-related)
        "SURVEILLANCE LOG: MOSMAN HOUSE": 38,  // You Will Thank Me Later (Ryker-related)
        "ANALYSIS: NEGATIVE SPACE": 8   // Structural Psychopathy
    };

    // START LOADING MUSIC FIRST - before opening modal
    const trackId = articleToTrackMap[article.title];
    if (trackId) {
        console.log(`Archive opened: ${article.title} -> Playing Track ${trackId}`);
        selectTrack(trackId);
    }

    // Set up the modal content immediately
    document.getElementById('modal-title').innerText = article.title;

    // Helper: Resolve archive URL using manifest base
    // Extracts filename from old njsalubrious.github.io URLs and applies new domain
    function resolveArchiveUrl(originalUrl) {
        if (!originalUrl) return null;

        const archivesBase = (typeof PIXEL_MANIFEST !== 'undefined' && PIXEL_MANIFEST.ASSETS?.ARCHIVES_BASE)
            ? PIXEL_MANIFEST.ASSETS.ARCHIVES_BASE
            : 'https://pixelstortion.com/archives/';

        // Extract filename from the URL (handles both old and new URLs)
        const filename = originalUrl.split('/').pop();
        return archivesBase + filename;
    }

    // Check if article has external URL (iframe mode)
    const resolvedUrl = resolveArchiveUrl(article.url);
    if (resolvedUrl) {
        // Show loading indicator first
        document.getElementById('modal-content').innerHTML = `
            <div class="flex items-center justify-center h-full">
                <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
                    <p class="text-gray-500 font-mono-custom text-sm">LOADING ARCHIVE...</p>
                </div>
            </div>
        `;

        // Show modal immediately
        document.getElementById('info-modal').classList.remove('hidden');

        // Hide header and remove padding for immersive view
        document.getElementById('modal-title').parentElement.style.display = 'none';
        document.getElementById('modal-content').classList.remove('p-8');

        // Load iframe after a brief moment
        setTimeout(() => {
            document.getElementById('modal-content').innerHTML = `
                <iframe 
                    src="${resolvedUrl}" 
                    class="w-full border-0 block"
                    style="height: 100vh; min-height: 100vh;"
                    title="${article.title}"
                ></iframe>
            `;
        }, 100);
    } else {
        // Original content rendering
        document.getElementById('modal-content').innerHTML = `
            <div class="flex justify-between text-xs font-mono-custom text-gray-500 mb-6 border-b border-gray-800 pb-2">
                <span>AUTHOR: ${article.author}</span>
                <span>DATE: ${article.date}</span>
            </div>
            <div class="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed">${article.content}</div>
        `;

        // Show header and padding for text view
        document.getElementById('modal-title').parentElement.style.display = 'flex';
        document.getElementById('modal-content').classList.add('p-8');

        // Show modal
        document.getElementById('info-modal').classList.remove('hidden');
    }
}

function openModal(char) {
    const profile = profiles.find(p => p.id === char);
    if (!profile) return;

    // Reset layout for profiles
    document.getElementById('modal-title').parentElement.style.display = 'flex';
    document.getElementById('modal-content').classList.add('p-8');

    document.getElementById('modal-title').innerText = `SUBJECT: ${profile.name}`;
    document.getElementById('modal-content').innerHTML = `
        <div class="mb-4 p-3 bg-black/50 border border-gray-700" style="color: ${profile.color};">
            STATUS: ${profile.status}
        </div>
        <p class="text-gray-300 text-sm leading-relaxed">${profile.desc}</p>
        <div class="mt-4 border-t border-gray-800 pt-4">
            <p class="text-xs text-gray-500 font-mono-custom mb-2">${profile.notes}:</p>
            <p class="text-sm text-gray-300 italic">${profile.quote}</p>
        </div>
    `;
    document.getElementById('info-modal').classList.remove('hidden');
}

function closeModal() {
    // Reset defaults
    document.getElementById('modal-title').parentElement.style.display = 'flex';
    document.getElementById('modal-content').classList.add('p-8');

    // Stop all iframes (including YouTube embeds) using postMessage
    const modalContent = document.getElementById('modal-content');
    const iframes = modalContent.querySelectorAll('iframe');

    iframes.forEach(iframe => {
        // For YouTube iframes, send pause command via postMessage
        if (iframe.src.includes('youtube.com')) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            console.log('Sent pause command to YouTube iframe');
        }

        // Also reload the iframe as fallback for non-YouTube content
        const src = iframe.src;
        iframe.src = '';
        setTimeout(() => {
            iframe.src = src;
        }, 100);
    });

    // Hide modal
    document.getElementById('info-modal').classList.add('hidden');

    // Resume music when closing modal
    if (ytPlayer && ytPlayer.playVideo) {
        ytPlayer.playVideo();
        console.log('Music resumed - closing archive modal');
    }
}

function renderPlaylist() {
    const container = document.getElementById('playlist-container');
    container.innerHTML = tracks.map(track => `
        <div id="track-${track.id}" class="p-3 border-b border-gray-800 hover:bg-zinc-800 cursor-pointer transition-colors flex justify-between items-center group" onclick="selectTrack(${track.id})">
            <div class="flex items-center gap-3">
                <span class="text-xs font-mono-custom text-gray-500 group-hover:text-green-500">${track.id < 10 ? '0' + track.id : track.id}</span>
                <p class="text-sm font-medium text-gray-300 group-hover:text-white">${track.title}</p>
            </div>
            <div class="text-right">
                <p class="text-xs font-mono-custom text-gray-500">${track.time}</p>
                <p class="text-xs text-gray-600">${track.storyDate}</p>
            </div>
        </div>
    `).join('');
}



function toggleFocusMode() {
    document.getElementById('audio-section').classList.toggle('focus-mode');
}


function createVisualizerBars() {
    const container = document.getElementById('visualizer-container');
    let bars = '';
    for (let i = 0; i < 60; i++) {
        bars += `<div class="bar" style="height: ${Math.random() * 50 + 10}%; animation-delay: -${Math.random()}s"></div>`;
    }
    container.innerHTML = bars;
}

function initNoiseCanvas() {
    const canvas = document.getElementById('noiseCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();
    function drawNoise() {
        const w = canvas.width, h = canvas.height;
        const idata = ctx.createImageData(w, h);
        const buffer32 = new Uint32Array(idata.data.buffer);
        for (let i = 0; i < buffer32.length; i++) {
            if (Math.random() < 0.03) buffer32[i] = 0xff000000 | (Math.random() * 0x202020);
        }
        ctx.putImageData(idata, 0, 0);
        requestAnimationFrame(drawNoise);
    }
    drawNoise();
}

// Bio Popup Functions
function openBioPopup() {
    document.getElementById('bioPopup').classList.remove('hidden');
    document.getElementById('bioPopup').classList.add('flex');
}

function closeBioPopup() {
    document.getElementById('bioPopup').classList.add('hidden');
    document.getElementById('bioPopup').classList.remove('flex');
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBioPopup();
    }
});
