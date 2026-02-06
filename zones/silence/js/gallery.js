// gallery.js - Gallery slideshow functions

// Gallery Map Loader
async function loadGalleryMap() {
    try {
        console.log("Connecting to Archives...");
        const response = await fetch(MAP_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const rawMap = await response.json();

        // Rewrite URLs based on manifest mode
        if (typeof PIXEL_MANIFEST !== 'undefined' && PIXEL_MANIFEST.IS_LOCAL) {
            // Convert GitHub URLs to local paths
            const gitHubBase = 'https://NJsalubrious.github.io/pixelstortion-assets';
            for (const trackKey in rawMap) {
                rawMap[trackKey] = rawMap[trackKey].map(url =>
                    url.replace(gitHubBase, '').replace('/assets_for_ethel_songs/', '/library/char_ethel_media/')
                );
            }
            console.log("🏠 LOCAL MODE: URLs rewritten to local paths");
        }

        galleryMap = rawMap;
        console.log("Archives Decrypted. " + Object.keys(galleryMap).length + " tracks indexed.");
    } catch (e) {
        console.error("Archive Connection Failed:", e);
    }
}

// Story Gallery Functions
function startGallery(imageList) {
    if (galleryInterval) clearInterval(galleryInterval);

    currentImageIndex = 0;
    activeImageElement = 1;

    const track = tracks.find(t => t.id === currentTrackId);
    // Default time per slide based on user preference: 6 seconds.
    // We use the math to be precise: Total Duration / Image Count.
    let timePerSlide = 6000;

    if (track && track.time && imageList.length > 0) {
        const timeParts = track.time.split(':');
        const totalSeconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
        // If the user provided image list matches the calculated count, this will result in ~6000ms.
        // If the folder has FEWER images than expected, this number increases (slower).
        // If the folder has MORE images, this number decreases (faster).
        timePerSlide = (totalSeconds * 1000) / imageList.length;
    }

    console.log(`Starting gallery with ${imageList.length} images. Time per slide: ${(timePerSlide / 1000).toFixed(2)}s`);

    showImage(imageList[0], 1);

    galleryInterval = setInterval(() => {
        // Check global isPlaying flag (works for both MP3 and YouTube)
        if (isPlaying) {
            currentImageIndex = (currentImageIndex + 1) % imageList.length;
            activeImageElement = activeImageElement === 1 ? 2 : 1;
            showImage(imageList[currentImageIndex], activeImageElement);
        }
    }, timePerSlide);
}

function showImage(url, elementNum) {
    const img = document.getElementById(`story-bg-${elementNum}`);
    const otherImg = document.getElementById(`story-bg-${elementNum === 1 ? 2 : 1}`);

    const temp = new Image();
    temp.onload = () => {
        img.src = url;
        img.classList.add('active-slide');
        otherImg.classList.remove('active-slide');
    };
    temp.src = url;
}
