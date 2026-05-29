/**
 * Barba.js PJAX Router
 * Intercepts navigation, swaps <main> content, preserves persistent shell
 */

(function () {
    'use strict';

    // Map namespace to nav button IDs
    const NAV_MAP = {
        home: 'nav-home',
        museum: 'nav-files',
        figures: 'nav-profiles',
        audio: 'nav-audio'
    };

    // Page-specific init functions to trigger on load/navigation
    const PAGE_INIT = {
        museum: ['renderFiles'],
        figures: ['renderProfiles'],
        audio: ['renderPlaylist']
    };

    /**
     * Update the active tab highlight in the navigation
     */
    function setActiveNav(namespace) {
        // Remove active from all
        Object.values(NAV_MAP).forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove('text-[var(--ember-color-2)]', 'active-tab');
                el.classList.add('text-gray-400');
            }
        });

        // Add to current
        const activeId = NAV_MAP[namespace];
        if (activeId) {
            const el = document.getElementById(activeId);
            if (el) {
                el.classList.remove('text-gray-400');
                el.classList.add('text-[var(--ember-color-2)]', 'active-tab');
            }
        }
    }

    /**
     * Handle logic based on the namespace we are entering
     */
    function handleNamespace(namespace) {
        setActiveNav(namespace);

        // Call any page-specific initialization scripts
        if (PAGE_INIT[namespace]) {
            PAGE_INIT[namespace].forEach(fnName => {
                if (typeof window[fnName] === 'function') {
                    window[fnName]();
                } else {
                    console.log(`[Barba] Function ${fnName} not found on window`);
                }
            });
        }

        // Music logic: Fade out when visiting audio/songs section
        if (window.AmbientAudio) {
            if (namespace === 'audio') {
                window.AmbientAudio.fadeOut();
            } else {
                window.AmbientAudio.fadeIn();
            }
        }
    }

    /**
     * Rebuild the songs-page YouTube player after a PJAX swap.
     *
     * The #youtube-player div lives inside the swapped <main> container, so
     * every entry to the songs page gets a fresh, player-less div. The YouTube
     * IFrame API only calls the global onYouTubeIframeAPIReady once (on the
     * first hard load), so on subsequent soft navigations no player is created
     * and videos won't play until a manual refresh. We invoke the global
     * initializer here to attach a player to the new div.
     *
     * No-op until the API is ready: it will call onYouTubeIframeAPIReady
     * itself once loading finishes.
     */
    function reinitYouTubePlayer() {
        if (!document.getElementById('youtube-player')) return;
        if (window.YT && window.YT.Player && typeof window.onYouTubeIframeAPIReady === 'function') {
            try {
                window.onYouTubeIframeAPIReady();
            } catch (e) {
                console.warn('[Barba] YouTube player reinit failed:', e);
            }
        }
    }

    // Initialize Barba
    window.addEventListener('DOMContentLoaded', () => {
        if (typeof barba === 'undefined') {
            console.warn("Barba.js not loaded.");
            return;
        }

        barba.init({
            debug: false,
            prevent: ({ el }) => {
                // Prevent Barba from handling external links or specific anchors
                if (el.hasAttribute('target') || el.hasAttribute('download')) return true;
                if (el.href && (el.href.includes('#') || el.href.startsWith('mailto:'))) return true;

                // Allow normal links but prevent those marked with barba-prevent
                if (el.classList && el.classList.contains('barba-prevent')) return true;
                if (el.hasAttribute('data-barba-prevent')) return true;
                return false;
            },
            transitions: [{
                name: 'opacity-transition',
                leave(data) {
                    return new Promise(resolve => {
                        data.current.container.style.transition = 'opacity 0.3s ease';
                        data.current.container.style.opacity = '0';
                        setTimeout(resolve, 300);
                    });
                },
                enter(data) {
                    // Update active nav and trigger scripts based on new namespace
                    handleNamespace(data.next.namespace);

                    // The songs page's YouTube player lives in the swapped
                    // container and the YT API only fires its ready callback
                    // once per hard load, so rebuild the player on entry.
                    if (data.next.namespace === 'audio') reinitYouTubePlayer();

                    // Reset scroll constraints that switchTab may have set.
                    // Archives (standalone) have no internal scroll container, so they
                    // need the body to scroll — must override the page-level
                    // `body { overflow: hidden }` rule via inline style.
                    if (data.next.namespace === 'standalone') {
                        document.body.style.overflow = 'auto';
                    } else {
                        // Clear first, then set Y. Doing it the other way around
                        // (overflowY then overflow='') silently wipes overflowY.
                        document.body.style.overflow = '';
                        document.body.style.overflowY = 'auto';
                    }
                    const mainEl = document.getElementById('main-content');
                    if (mainEl) {
                        mainEl.style.overflow = 'visible';
                    }
                    window.scrollTo(0, 0);

                    // Ensure sections are visible depending on namespace
                    const container = data.next.container;
                    container.style.opacity = '0';

                    // Kick autoplay videos: when Barba inserts a parsed <video autoplay> into
                    // the existing DOM (vs. the browser parsing it on initial page load),
                    // Chrome's autoplay policy often won't start playback even when muted.
                    // Explicit .load() + .play() restores the original behavior.
                    container.querySelectorAll('video[autoplay]').forEach(v => {
                        try { v.load(); } catch (_) {}
                        const p = v.play();
                        if (p && typeof p.catch === 'function') p.catch(() => {});
                    });

                    requestAnimationFrame(() => {
                        container.style.transition = 'opacity 0.3s ease';
                        container.style.opacity = '1';
                    });
                }
            }],
            views: [
                {
                    namespace: 'home',
                    beforeEnter() { handleNamespace('home'); }
                },
                {
                    namespace: 'museum',
                    beforeEnter() { handleNamespace('museum'); }
                },
                {
                    namespace: 'figures',
                    beforeEnter() { handleNamespace('figures'); }
                },
                {
                    namespace: 'audio',
                    beforeEnter() { handleNamespace('audio'); }
                },
                {
                    namespace: 'standalone',
                    beforeEnter() { handleNamespace('standalone'); }
                }
            ]
        });

        // Trigger for initial page load
        const initialNamespace = document.querySelector('main[data-barba="container"]')?.getAttribute('data-barba-namespace') || 'home';
        handleNamespace(initialNamespace);
    });
})();
