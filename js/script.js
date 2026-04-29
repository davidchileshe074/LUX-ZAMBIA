/* 
=======================================
   LUX ZAMBIA - MAIN SCRIPT
=======================================
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    
    // Simulate loading time for visual effect (min 1.5s)
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            // Trigger AOS animations after preloader
            AOS.init({
                duration: 1000,
                once: true,
                offset: 50,
                easing: 'ease-out-cubic'
            });
        }, 800);
    }, 1500);

    // 2. Scroll Progress Bar
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollIndicator.style.width = scrolled + '%';
    });

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 5. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 6. GSAP Animations (Advanced)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Parallax Effect
        gsap.to('.hero-bg img', {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Story Mode Pinned Animation
        const storySteps = gsap.utils.toArray('.story-step');
        
        storySteps.forEach((step, i) => {
            gsap.from(step, {
                opacity: 0.3,
                x: -50,
                duration: 1,
                scrollTrigger: {
                    trigger: step,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 1
                }
            });
        });

        // Flight Paths Animation (SVG)
        const paths = document.querySelectorAll('.animated-path');
        paths.forEach(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            
            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 4,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".global-presence",
                    start: "top 60%",
                    once: true
                }
            });
        });
    }

    // 7. Form Submission Prevention (Mockup)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]') || form.querySelector('.btn-primary');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Processing...';
            btn.disabled = true;

            const formData = new FormData(form);
            const action = form.getAttribute('action');

            fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    btn.innerHTML = '<i class="ri-check-line"></i> Success';
                    btn.style.backgroundColor = '#25D366';
                    btn.style.color = 'white';
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                btn.innerHTML = '<i class="ri-error-warning-line"></i> Error';
                btn.style.backgroundColor = '#ff4d4d';
            })
            .finally(() => {
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 4000);
            });
        });
    });
    
    // 8. Flight Type Toggle in Mockup
    const flightTypes = document.querySelectorAll('.flight-type span');
    flightTypes.forEach(type => {
        type.addEventListener('click', () => {
            flightTypes.forEach(t => t.classList.remove('active'));
            type.classList.add('active');
        });
    });
});
