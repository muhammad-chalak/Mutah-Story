document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. OPTIMIZED Parallax Effect (Glitches Fixed) ---
    // We use requestAnimationFrame and translate3d for smooth hardware acceleration
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                const heroContent = document.querySelector('.hero-content');
                
                if (heroContent) {
                    // Calculation for speed
                    const translateY = lastScrollY * 0.4;
                    const opacity = 1 - (lastScrollY / 700);
                    
                    // Stop animation if not visible to save resources
                    if (opacity >= -0.1) {
                        // translate3d forces GPU usage = No Glitches
                        heroContent.style.transform = `translate3d(0, ${translateY}px, 0)`;
                        heroContent.style.opacity = opacity;
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // --- 2. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 3. Count Up Animation (For Numbers) ---
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.count-up');
                numbers.forEach(num => {
                    const target = +num.getAttribute('data-count');
                    let count = 0;
                    
                    // Adaptive speed based on number size
                    const increment = target / 50 > 1 ? Math.ceil(target / 50) : 1; 
                    
                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            if (count > target) count = target;
                            num.innerText = count;
                            setTimeout(updateCount, 40);
                        } else {
                            num.innerText = target;
                        }
                    };
                    updateCount();
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const khalidSection = document.querySelector('.khalid-section'); // Fixed selector
    if (khalidSection) statsObserver.observe(khalidSection);

    // --- 4. Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
