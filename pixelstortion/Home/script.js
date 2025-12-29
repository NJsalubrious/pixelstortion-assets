       // --- 1. Noise Animation (Left) ---
        const canvas = document.getElementById('noiseCanvas');
        const ctx = canvas.getContext('2d');
        const resize = () => {
            canvas.width = window.innerWidth > 768 ? window.innerWidth / 2 : window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        function loopNoise() {
            const w = canvas.width, h = canvas.height;
            if(!w || !h) return;
            const idata = ctx.createImageData(w, h);
            const buffer = new Uint32Array(idata.data.buffer);
            for(let i=0; i<buffer.length; i++) {
                if(Math.random() < 0.08) buffer[i] = 0x10ffffff;
            }
            ctx.putImageData(idata, 0, 0);
            requestAnimationFrame(loopNoise);
        }
        loopNoise();

        // --- 2. Slower, Realistic Embers (Right) ---
        const emberContainer = document.getElementById('emberContainer');

        function spawnEmbers() {
            const count = 60;
            emberContainer.innerHTML = '';

            for(let i=0; i<count; i++) {
                const el = document.createElement('div');
                el.classList.add('ember');

                const size = Math.random() * 4 + 2;
                const left = Math.random() * 100;
                const duration = Math.random() * 4 + 4;
                const delay = Math.random() * 5;
                const drift = (Math.random() - 0.5) * 150;

                el.style.width = `${size}px`;
                el.style.height = `${size}px`;
                el.style.left = `${left}%`;
                el.style.animationDuration = `${duration}s`;
                el.style.animationDelay = `${delay}s`;
                el.style.setProperty('--drift', `${drift}px`);

                emberContainer.appendChild(el);
            }
        }
        spawnEmbers();

        // --- 3. Debug Download ---
        function downloadHTML() {
            const blob = new Blob([document.documentElement.outerHTML], {type: 'text/html'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'pixelstortion_fire_text_fixed.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }