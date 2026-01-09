document.addEventListener('DOMContentLoaded', () => {

    // --- Audio Control ---
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = musicBtn.querySelector('i');
    let isPlaying = false;

    // Try to autoplay (might fail due to browser policy)
    // bgMusic.play().catch(e => console.log('Autoplay blocked'));

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.classList.remove('fa-volume-up');
            musicIcon.classList.add('fa-volume-mute');
            musicBtn.style.background = '#888';
            musicBtn.style.animation = 'none';
        } else {
            bgMusic.play();
            bgMusic.volume = 0.5;
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-volume-up');
            musicBtn.style.background = 'var(--primary-red)';
            musicBtn.style.animation = 'pulse 2s infinite';
        }
        isPlaying = !isPlaying;
    });

    // --- Confetti Explosion & Continuous Fall ---
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    // Initial Explosion
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Big burst at start
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D71920', '#ffd700', '#ffffff'],
        zIndex: 0
    });

    // Continuous flow ("Snow" effect but with confetti)
    function runConfetti() {
        // Red, White, Gold
        const colors = ['#D71920', '#ffffff', '#ffd700'];

        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
            zIndex: 0 // Behind glass cards
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
            zIndex: 0
        });

        requestAnimationFrame(runConfetti);
    }

    // Start continuous rain after a short delay
    setTimeout(runConfetti, 1000);


    // --- Countdown Timer ---
    // Target: Feb 1st, 2026 at 4:00 PM (16:00)
    // NOTE: If today is after this date, you might want to adjust the year logic.
    // Assuming next upcoming Feb 1st.
    const targetDate = new Date('February 1, 2026 16:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "¡LA MISIÓN HA COMENZADO!";
            document.getElementById("countdown").style.color = "var(--primary-red)";
            document.getElementById("countdown").style.fontSize = "2rem";
            document.getElementById("countdown").style.fontFamily = "Black Han Sans";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately


    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease-out';
        observer.observe(card);
    });

    // Add extra pulse animation to music button on load to draw attention
    musicBtn.style.animation = 'pulse 2s infinite';
});

// Add Keyframes via JS or rely on CSS? CSS is cleaner but let's ensure 'pulse' is defined.
// Actually, I missed 'pulse' in CSS. Let me inject it or just rely on the bounce I made.
// I will inject a style tag for the pulse animation to be sure.
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(215, 25, 32, 0.7); }
    70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(215, 25, 32, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(215, 25, 32, 0); }
}`;
document.head.appendChild(style);
