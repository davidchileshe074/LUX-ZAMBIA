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
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
        
        // Initialize Swiper (Hero)
        const heroSliderEl = document.querySelector('.hero-slideshow');
        if (heroSliderEl) {
            const heroSwiper = new Swiper('.hero-slideshow', {
                loop: true,
                speed: 2000,
                effect: 'fade',
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                preloadImages: true,
                updateOnImagesReady: true
            });
        }

        // Trigger AOS animations
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 50,
                easing: 'ease-out-cubic'
            });
        }

        // Initialize GSAP Hero Animations
        if (typeof gsap !== 'undefined') {
            initHeroAnimations();
        }

        // Initialize Membership Slider
        const memberSliderEl = document.querySelector('.membership-swiper');
        if (memberSliderEl) {
            const memberSwiper = new Swiper('.membership-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.membership-pagination',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }
            });
        }
    }, 1500);

    function initHeroAnimations() {
        if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline();
            
            tl.from('.hero-headline', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
            .from('.hero-subtext', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6")
            .from('.hero-cta .btn', {
                y: 20,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=0.4")
            .from('.booking-mockup', {
                x: 50,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");
        }
    }

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
        gsap.to('.hero-slide', {
            yPercent: 15,
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
        // Section Reveal Animations (Handled by AOS to avoid conflicts)
        
        // Magnetic Buttons
        const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline, .floating-whatsapp, .footer-social a');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });

        // Booking Mockup Parallax
        document.addEventListener('mousemove', (e) => {
            const mockup = document.querySelector('.booking-mockup');
            if (mockup) {
                const x = (window.innerWidth / 2 - e.clientX) / 50;
                const y = (window.innerHeight / 2 - e.clientY) / 50;
                
                gsap.to(mockup, {
                    rotationY: x,
                    rotationX: -y,
                    x: x * 2,
                    y: y * 2,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
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
