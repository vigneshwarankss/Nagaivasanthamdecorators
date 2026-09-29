/**
 * Nagai Vasantham Decorators - JS Core Interactions
 * Features: Typewriter, Particle Canvas, Scroll Reveals, Active Nav Observer,
 *           Gallery Filter, Lightbox, Stats Counter, Testimonial Carousel,
 *           Form validation and toast notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Global Micro Loading Bar Indicator
    const loaderBar = document.getElementById('loader-bar');
    if (loaderBar) {
        loaderBar.style.width = '30%';
        const completeLoading = () => {
            loaderBar.style.width = '100%';
            setTimeout(() => {
                loaderBar.style.opacity = '0';
                setTimeout(() => {
                    loaderBar.style.display = 'none';
                }, 400);
            }, 300);
        };
        
        if (document.readyState === 'complete') {
            completeLoading();
        } else {
            window.addEventListener('load', completeLoading);
        }
    }

    /* ==========================================================================
       1. Sticky Navigation & Responsive Hamburger Menu
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    /* ==========================================================================
       2. Typewriter Effect (Tagline Animation)
       ========================================================================== */
    const taglineElement = document.getElementById('tagline-text');
    const taglines = [
        "Creating Beautiful Moments for Every Event",
        "Making Your Dream Wedding a Reality",
        "Nagapattinam's Premier Event Decorators",
        "Exquisite Flowers, Lighting & Royal Stage Themes"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        if (!taglineElement) return;

        const currentText = taglines[wordIndex];
        
        if (isDeleting) {
            taglineElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40; // Speed up deletion
        } else {
            taglineElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 85; // Normal typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % taglines.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start Tagline Animation
    setTimeout(typeEffect, 1000);


    /* ==========================================================================
       3. Particle Canvas (Falling Petals & Gold Sparkles)
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        const maxParticles = 45;

        // Set Canvas Size
        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle Constructor
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.size = Math.random() * 8 + 4;
                this.speedY = Math.random() * 1.2 + 0.6;
                this.speedX = Math.random() * 1.5 - 0.75;
                this.opacity = Math.random() * 0.6 + 0.3;
                this.colorType = Math.random() > 0.4 ? 'gold' : 'petal'; // Gold dust or Rose petal
                
                // For Petal rotation
                this.angle = Math.random() * 360;
                this.spin = Math.random() * 1.2 - 0.6;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.angle * Math.PI) / 180);
                ctx.globalAlpha = this.opacity;

                if (this.colorType === 'gold') {
                    // Glow sparkle
                    let gradient = ctx.createRadialGradient(0, 0, 1, 0, 0, this.size);
                    gradient.addColorStop(0, '#FFFDF6');
                    gradient.addColorStop(0.3, '#F6E4A6');
                    gradient.addColorStop(1, 'rgba(197, 155, 39, 0)');
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Soft Blush Rose Petal
                    ctx.fillStyle = 'rgba(242, 186, 192, 0.7)'; // Rose Gold Pink
                    ctx.strokeStyle = 'rgba(224, 168, 153, 0.4)';
                    ctx.lineWidth = 1;
                    
                    ctx.beginPath();
                    // Draw a soft oval leaf shape
                    ctx.moveTo(0, -this.size);
                    ctx.quadraticCurveTo(this.size * 1.5, -this.size / 2, this.size, this.size);
                    ctx.quadraticCurveTo(-this.size * 0.5, this.size * 1.5, -this.size, this.size / 2);
                    ctx.quadraticCurveTo(-this.size * 1.2, -this.size / 2, 0, -this.size);
                    ctx.fill();
                    ctx.stroke();
                }
                ctx.restore();
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.angle += this.spin;

                // Reposition when it leaves screen
                if (this.y > canvas.height + 20) {
                    this.y = -20;
                    this.x = Math.random() * canvas.width;
                    this.opacity = Math.random() * 0.6 + 0.3;
                    this.speedY = Math.random() * 1.2 + 0.6;
                }
                if (this.x > canvas.width + 10 || this.x < -10) {
                    this.speedX = -this.speedX;
                }
            }
        }

        // Initialize particles
        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < maxParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        initParticles();

        // Animate particles
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }


    /* ==========================================================================
       4. Intersection Observer for Scroll Reveals
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-left, .reveal-right');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once animate is done, stop tracking
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }


    /* ==========================================================================
       5. Active Navigation State on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const scrollObserverOptions = {
        root: null,
        threshold: 0.25, // When section takes 25% of viewport
        rootMargin: '-80px 0px 0px 0px' // adjust for navbar height
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, scrollObserverOptions);

    sections.forEach(sec => sectionObserver.observe(sec));


    /* ==========================================================================
       6. Gallery Filtering Logic
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update Active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category.includes(filterValue)) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });


    /* ==========================================================================
       7. Lightbox Popup with Slide Navigation
       ========================================================================== */
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentGalleryArray = [];
    let currentImageIndex = 0;

    // Get list of active images currently visible (not hidden by filter)
    function updateVisibleGallery() {
        currentGalleryArray = [];
        galleryItems.forEach(item => {
            if (!item.classList.contains('hide')) {
                const img = item.querySelector('img');
                const title = item.querySelector('.item-title').textContent;
                const category = item.querySelector('.item-category').textContent;
                currentGalleryArray.push({
                    src: img.getAttribute('src'),
                    title: title,
                    category: category
                });
            }
        });
    }

    // Set lightbox image content
    function setLightboxContent(index) {
        if (index < 0 || index >= currentGalleryArray.length) return;
        currentImageIndex = index;
        const item = currentGalleryArray[index];
        
        lightboxImg.setAttribute('src', item.src);
        lightboxTitle.textContent = item.title;
        lightboxCategory.textContent = item.category;
    }

    // Bind click events on gallery inner blocks
    galleryItems.forEach(item => {
        const inner = item.querySelector('.gallery-inner');
        inner.addEventListener('click', () => {
            updateVisibleGallery();
            
            const itemImgSrc = item.querySelector('img').getAttribute('src');
            const targetIdx = currentGalleryArray.findIndex(element => element.src === itemImgSrc);
            
            if (targetIdx !== -1) {
                setLightboxContent(targetIdx);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop background scrolls
            }
        });
    });

    // Close Lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Close lightbox on clicking outside content area
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Prev/Next Navigation
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            let newIndex = currentImageIndex - 1;
            if (newIndex < 0) newIndex = currentGalleryArray.length - 1;
            setLightboxContent(newIndex);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            let newIndex = currentImageIndex + 1;
            if (newIndex >= currentGalleryArray.length) newIndex = 0;
            setLightboxContent(newIndex);
        });
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight') {
                lightboxNext.click();
            }
        }
    });


    /* ==========================================================================
       8. Stats Count-up Animation
       ========================================================================== */
    const statsSection = document.querySelector('.why-choose-us');
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function startCounters() {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000; // 2 seconds animation duration
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Ease out cubic multiplier
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(easeProgress * target);
                
                counter.textContent = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target; // Ensure exact final count
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    if (statsSection && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    startCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        statsObserver.observe(statsSection);
    }


    /* ==========================================================================
       9. Testimonials Sliding Carousel
       ========================================================================== */
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevReviewBtn = document.getElementById('prev-review');
    const nextReviewBtn = document.getElementById('next-review');
    let currentSlide = 0;
    let autoPlayInterval = null;

    function showSlide(index) {
        slides.forEach((slide, idx) => {
            slide.classList.remove('active', 'prev-slide');
            dots[idx].classList.remove('active');

            if (idx === index) {
                slide.classList.add('active');
                dots[idx].classList.add('active');
            } else if (idx < index) {
                slide.classList.add('prev-slide'); // handles sliding out direction
            }
        });
        currentSlide = index;
    }

    // Arrow controls
    if (nextReviewBtn) {
        nextReviewBtn.addEventListener('click', () => {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            showSlide(nextIndex);
            resetAutoplay();
        });
    }

    if (prevReviewBtn) {
        prevReviewBtn.addEventListener('click', () => {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1;
            showSlide(prevIndex);
            resetAutoplay();
        });
    }

    // Dot indicators click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoplay();
        });
    });

    // Autoplay Timer
    function startAutoplay() {
        autoPlayInterval = setInterval(() => {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            showSlide(nextIndex);
        }, 5000);
    }

    function resetAutoplay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            startAutoplay();
        }
    }

    // Pause autoplay on hover
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
        });
        sliderContainer.addEventListener('mouseleave', startAutoplay);
    }

    // Initial Testimonial Activation
    if (slides.length > 0) {
        showSlide(0);
        startAutoplay();
    }


    /* ==========================================================================
       10. Scroll-to-Top Button
       ========================================================================== */
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* ==========================================================================
       11. Contact Form Validations & Simulation
       ========================================================================== */
    const bookingForm = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('submitBtn');
    const successToast = document.getElementById('successToast');
    const toastClose = document.getElementById('toastClose');

    // Live validation listener helper
    function setupFormValidation() {
        if (!bookingForm) return;

        const inputs = bookingForm.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateField(input);
            });
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });
    }

    function validateField(input) {
        const formGroup = input.closest('.form-group');
        let isValid = true;

        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
        } else if (input.type === 'tel') {
            // Check for valid Indian 10-digit number
            const phonePattern = /^[0-9]{10}$/;
            isValid = phonePattern.test(input.value.trim());
        } else if (input.type === 'date') {
            const selectedDate = new Date(input.value);
            const today = new Date();
            today.setHours(0,0,0,0);
            isValid = selectedDate >= today; // Must be today or upcoming date
        }

        if (!isValid) {
            formGroup.classList.add('has-error');
        } else {
            formGroup.classList.remove('has-error');
        }

        return isValid;
    }

    setupFormValidation();

    // Form Submit Event
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = bookingForm.querySelectorAll('input, select');
            let isFormValid = true;

            inputs.forEach(input => {
                const isValid = validateField(input);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                simulateFormSubmit();
            } else {
                // Focus on first error element
                const firstError = bookingForm.querySelector('.form-group.has-error input, .form-group.has-error select');
                if (firstError) firstError.focus();
            }
        });
    }

    function simulateFormSubmit() {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // 1. Gather Form Data
        const name = document.getElementById('form-name').value;
        const phone = document.getElementById('form-phone').value;
        const eventSelect = document.getElementById('form-event-type');
        const eventType = eventSelect.options[eventSelect.selectedIndex].text;
        const date = document.getElementById('form-date').value;
        const message = document.getElementById('form-message').value;

        // 2. Format the WhatsApp Message (using WhatsApp formatting: *bold*, %0A for newlines)
        const textMsg = `Hi Nagai Vasantham Decorators,%0A%0AI would like to inquire about booking decoration services.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Event Type:* ${encodeURIComponent(eventType)}%0A*Date:* ${encodeURIComponent(date)}%0A*Details/Dream Decor:* ${encodeURIComponent(message || 'No additional details provided.')}`;

        // 3. Open WhatsApp link (Business Number: +91 98653 34050)
        const waUrl = `https://wa.me/919865334050?text=${textMsg}`;

        // Simulate a brief loading animation before redirect
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show Success Notification toast
            showToastNotification();
            
            // Reset Form fields
            bookingForm.reset();
            
            // Open WhatsApp in a new tab/window
            window.open(waUrl, '_blank');
        }, 1200);
    }

    // Success Toast controls
    function showToastNotification() {
        if (successToast) {
            successToast.classList.add('active');
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                hideToastNotification();
            }, 6000);
        }
    }

    function hideToastNotification() {
        if (successToast) {
            successToast.classList.remove('active');
        }
    }

    if (toastClose) {
        toastClose.addEventListener('click', hideToastNotification);
    }

});
