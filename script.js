document.addEventListener('DOMContentLoaded', () => {

    // --- MENU TABS LOGIC ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    if (tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Remove active state from all
                tabButtons.forEach(b => b.classList.remove('active'));
                menuCategories.forEach(c => c.classList.remove('active'));

                // 2. Add active state to clicked
                btn.classList.add('active');

                // 3. Show target category
                const targetId = btn.getAttribute('data-target');
                const targetCategory = document.getElementById(targetId);
                if (targetCategory) {
                    targetCategory.classList.add('active');

                    // Auto-scroll to top of list
                    const tabsContainer = document.querySelector('.sticky-tabs');
                    if (tabsContainer) {
                        // Get position relative to viewport + current scroll
                        // We scroll so the tabs sit at the top of the screen
                        const yOffset = -5; // Small buffer
                        const y = tabsContainer.getBoundingClientRect().top + window.pageYOffset + yOffset;

                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }

                    // Just a small haptic feedback if available
                    if (navigator.vibrate) {
                        navigator.vibrate(10); // 10ms 'crunch'
                    }
                }
            });
        });
    }

    // --- CRUNCHY CLICKS ---
    // Add distinct visual/haptic feedback to all primary actions
    const actionableElements = document.querySelectorAll('.btn-cta, .menu-item, .social-link');

    actionableElements.forEach(el => {
        el.addEventListener('click', function (e) {
            // Visual Flash
            this.style.filter = 'brightness(1.5)';
            setTimeout(() => {
                this.style.filter = '';
            }, 100);

            // Haptic
            if (navigator.vibrate) {
                navigator.vibrate(15);
            }
        });
    });

    // --- NEON GLITCH EFFECT ON SCROLL (Hero) ---
    // Make the main title glitch randomly
    const title = document.querySelector('.glitch');
    if (title) {
        setInterval(() => {
            if (Math.random() > 0.9) {
                title.style.textShadow = `
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0px red,
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0px blue
                `;
                setTimeout(() => {
                    title.style.textShadow = ''; // Reset
                }, 100);
            }
        }, 2000);
    }
});
