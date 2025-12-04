document.addEventListener("DOMContentLoaded", () => {
    // 1. REGISTER THE PLUGIN
    gsap.registerPlugin(ScrollToPlugin);

    // 2. DEFINE THE VARIABLES
    const scrollHint = document.getElementById('scrollHint');
    // Targeting both .section class and semantic <section> tags just to be safe
    const sections = document.querySelectorAll('.section, section'); 

    // Safety check
    if (!scrollHint || sections.length === 0) {
        console.warn("Scroll hint or sections not found");
        return;
    }

    function getCurrentSectionIndex() {
        let index = 0;
        sections.forEach((sec, i) => {
            const rect = sec.getBoundingClientRect();
            // Check if the section is in the middle of the viewport
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                index = i;
            }
        });
        return index;
    }

    // --- CLICK HANDLER ---
    scrollHint.addEventListener('click', () => {
        const currentIndex = getCurrentSectionIndex();
        
        // CHECK: Are we at the last section?
        if (currentIndex === sections.length - 1) {
            // YES: Scroll all the way to the top (0)
            gsap.to(window, { 
                duration: 1.5, // Slightly slower for the long scroll up
                scrollTo: { y: 0, autoKill: true },
                ease: "power2.inOut" 
            });
        } else {
            // NO: Scroll to the next section
            const nextIndex = currentIndex + 1;
            const nextSection = sections[nextIndex];

            if (nextSection) {
                gsap.to(window, { 
                    duration: 1, 
                    scrollTo: { y: nextSection, autoKill: true },
                    ease: "power2.out" 
                });
            }
        }
    });

    // --- SCROLL HANDLER (VISIBILITY & TEXT) ---
    window.addEventListener('scroll', () => {
        const currentIndex = getCurrentSectionIndex();

        // If we are at the last section
        if (currentIndex === sections.length - 1) {
            // Keep opacity 1, but change text
            scrollHint.style.opacity = '1';
            scrollHint.style.pointerEvents = 'all';
            scrollHint.innerText = "Back to Top"; // Update text for clarity
            scrollHint.classList.add('rotate-up'); // Optional: Add this class if you want to rotate the arrow with CSS
        } else {
            // Normal state
            scrollHint.style.opacity = '1';
            scrollHint.style.pointerEvents = 'all';
            scrollHint.innerText = "Scroll or Click"; // Reset text
            scrollHint.classList.remove('rotate-up');
        }
    });
});