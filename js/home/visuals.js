// visuals.js - Cursor tracking and parallax effects

// Cursor movement (Desktop)
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return;
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Parallax
    const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
    const bgWar = document.getElementById('bgWar');
    if (bgWar) bgWar.style.transform = `scale(1.1) translate(${-moveX}px, ${-moveY}px)`;
});
