// audio-controller.js - AudioController class with fade effects

class AudioController {
    constructor(audioElement = null) {
        this.audio = audioElement || document.getElementById('characterAudio');
        this.isPlaying = false;
        this.currentFade = null;
    }

    async playTrack(url, fadeInDuration = 2000) {
        // Stop any ongoing fade
        if (this.currentFade) {
            clearInterval(this.currentFade);
            this.currentFade = null;
        }

        // Fade out current track if playing
        if (this.isPlaying) {
            await this.fadeOut(300);
        }

        // Load and play new track
        this.audio.src = url;
        this.audio.volume = 0;

        try {
            await this.audio.play();
            this.isPlaying = true;

            // Fade in
            await this.fadeIn(fadeInDuration);
        } catch (error) {
            console.error('Audio playback failed:', error);
            this.isPlaying = false;
        }
    }

    fadeIn(duration) {
        return new Promise((resolve) => {
            const steps = 20;
            const stepDuration = duration / steps;
            const volumeIncrement = 1 / steps;
            let currentStep = 0;

            this.currentFade = setInterval(() => {
                currentStep++;
                this.audio.volume = Math.min(currentStep * volumeIncrement, 1);

                if (currentStep >= steps) {
                    clearInterval(this.currentFade);
                    this.currentFade = null;
                    this.audio.volume = 1;
                    resolve();
                }
            }, stepDuration);
        });
    }

    fadeOut(duration) {
        return new Promise((resolve) => {
            const steps = 20;
            const stepDuration = duration / steps;
            const startVolume = this.audio.volume;
            const volumeDecrement = startVolume / steps;
            let currentStep = 0;

            this.currentFade = setInterval(() => {
                currentStep++;
                this.audio.volume = Math.max(startVolume - (currentStep * volumeDecrement), 0);

                if (currentStep >= steps) {
                    clearInterval(this.currentFade);
                    this.currentFade = null;
                    this.audio.pause();
                    this.audio.volume = 0;
                    this.isPlaying = false;
                    resolve();
                }
            }, stepDuration);
        });
    }

    stop() {
        if (this.currentFade) {
            clearInterval(this.currentFade);
            this.currentFade = null;
        }
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.volume = 0;
        this.isPlaying = false;
    }
}
