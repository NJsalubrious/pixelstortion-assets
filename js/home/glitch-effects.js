// glitch-effects.js - Ambient glitch and character reveal effects

// Schedule next ambient glitch
function scheduleNextGlitch() {
    // Random interval between 5-8 seconds
    const nextGlitchDelay = 5000 + Math.random() * 3000;

    ambientGlitchTimeout = setTimeout(() => {
        // Only glitch if no character is active and not already glitching
        if (!isGlitching && !isCharacterActive && title.textContent === 'SILENCE') {
            doAmbientGlitch();
        }
        scheduleNextGlitch();
    }, nextGlitchDelay);
}

// Perform ambient glitch animation
function doAmbientGlitch() {
    const currentText = title.textContent;
    const textLength = currentText.length;
    let iteration = 0;
    const maxIterations = 8 + Math.floor(Math.random() * 5); // 8-12 frames

    const glitchInterval = setInterval(() => {
        if (iteration < maxIterations) {
            // Random glitch patterns
            const glitchType = Math.floor(Math.random() * 3);

            if (glitchType === 0) {
                // Full shuffle
                let shuffled = '';
                for (let i = 0; i < textLength; i++) {
                    shuffled += letters[Math.floor(Math.random() * letters.length)];
                }
                title.textContent = shuffled;
            } else if (glitchType === 1) {
                // Partial glitch - only some letters
                title.textContent = currentText
                    .split('')
                    .map(char => Math.random() > 0.5 ? char : letters[Math.floor(Math.random() * letters.length)])
                    .join('');
            } else {
                // Position shift glitch
                const shift = Math.floor(Math.random() * 3) - 1;
                title.textContent = currentText
                    .split('')
                    .map((char, i) => {
                        const newIndex = (i + shift + textLength) % textLength;
                        return currentText[newIndex];
                    })
                    .join('');
            }
            iteration++;
        } else {
            // Restore original text
            clearInterval(glitchInterval);
            title.textContent = currentText;
            isGlitching = false;
        }
    }, 60);

    isGlitching = true;
}

// Trigger glitch on click - reveals character with audio
function triggerGlitch() {
    let iteration = 0;

    // Select random track (excluding last selected)
    const availableTracks = lastSelectedTrack
        ? audioTracks.filter(track => track !== lastSelectedTrack)
        : audioTracks;

    const selectedTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)];
    const selectedName = selectedTrack.character;
    const selectedSubtitle = selectedTrack.subtitle;
    const selectedMessage = selectedTrack.text;
    const selectedUrl = selectedTrack.url;
    const selectedStatus = selectedTrack.status;

    // Update tracking
    lastSelectedTrack = selectedTrack;
    lastSelectedCharacter = selectedName;
    lastSelectedMessage = selectedMessage;

    // Apply character-specific vibe
    leftPanel.classList.remove('vibe-isla', 'vibe-ethel', 'vibe-dominic', 'vibe-witness', 'vibe-kinley', 'vibe-sticky');
    if (selectedName === 'ISLA') {
        leftPanel.classList.add('vibe-isla');
    } else if (selectedName === 'ETHEL') {
        leftPanel.classList.add('vibe-ethel');
    } else if (selectedName === 'DOMINIC') {
        leftPanel.classList.add('vibe-dominic');
    } else if (selectedName === 'WITNESS') {
        leftPanel.classList.add('vibe-witness');
    } else if (selectedName === 'KINLEY') {
        leftPanel.classList.add('vibe-kinley');
    } else if (selectedName === 'STICKY') {
        leftPanel.classList.add('vibe-sticky');
    }

    // Mark character as active to prevent ambient glitch
    isCharacterActive = true;

    clearInterval(title.interval);

    title.interval = setInterval(() => {
        const shuffledText = selectedName
            .split("")
            .map((letter, index) => {
                if (index < iteration) return selectedName[index];
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");

        // Cap at exact character name length to prevent blowout
        title.innerText = shuffledText.substring(0, selectedName.length);

        if (iteration >= selectedName.length) {
            clearInterval(title.interval);

            // Update the STATUS field with character status (not name)
            const subjectWrapper = document.querySelectorAll('.redacted-wrapper')[0];
            const subjectText = subjectWrapper.querySelector('span:not(.redacted-bar)') || subjectWrapper.childNodes[0];
            if (subjectText) {
                subjectText.textContent = selectedStatus;
            }

            // Update the MESSAGE with track text
            const messageText = messageWrapper.querySelector('span:not(.redacted-bar)') || messageWrapper.childNodes[0];
            if (messageText) {
                messageText.textContent = `"${selectedMessage}"`;
            }

            // Update subtitle with character-specific text
            subtitle.textContent = selectedSubtitle;

            // Play audio track with fade in
            console.log('Playing track:', selectedName, selectedMessage, selectedUrl);
            audioController.playTrack(selectedUrl, 500);
        }
        iteration += 1 / 2;
    }, 30);
}
