<<<<<<< HEAD
/* ============================================= */
/*  PORTFOLIO — Japanese Theme JavaScript        */
/* ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Initialise Lucide icons
    lucide.createIcons();

    // Set current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ========================================== */
    /*  FALLING SAKURA PETALS (Canvas)            */
    /* ========================================== */
    const canvas = document.getElementById('petals-canvas');
    const ctx = canvas.getContext('2d');
    let petals = [];
    const PETAL_COUNT = 40;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createPetals() {
        petals = [];
        for (let i = 0; i < PETAL_COUNT; i++) {
            petals.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 2 - canvas.height,
                size: Math.random() * 10 + 3,
                speedY: Math.random() * 0.25 + 0.08,
                speedX: Math.random() * 0.1 - 0.05,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.006,
                swayAmplitude: Math.random() * 45 + 15,
                swaySpeed: Math.random() * 0.002 + 0.0008,
                swayOffset: Math.random() * Math.PI * 2,
                opacity: Math.random() * 0.35 + 0.08,
                color: getPetalColor(),
                // 3D tilt simulation
                tiltPhase: Math.random() * Math.PI * 2,
                tiltSpeed: Math.random() * 0.008 + 0.003,
            });
        }
    }

    function getPetalColor() {
        const r = Math.random();
        if (r < 0.50) return '#C41E3A';   // Crimson
        if (r < 0.70) return '#E63946';   // Scarlet
        if (r < 0.85) return '#8B0000';   // Blood red
        return '#ffffff';                  // White
    }

    function drawPetal(petal, time) {
        const swayX = Math.sin(time * petal.swaySpeed + petal.swayOffset) * petal.swayAmplitude;
        // Simulate 3D tilt: the petal appears to flip in space
        const tilt = Math.cos(time * petal.tiltSpeed + petal.tiltPhase);
        const scaleX = tilt * 0.7 + 0.3; // ranges from 0.3 to 1.0

        ctx.save();
        ctx.translate(petal.x + swayX, petal.y);
        ctx.rotate(petal.rotation);
        ctx.scale(scaleX, 1);
        ctx.globalAlpha = petal.opacity * (0.6 + Math.abs(tilt) * 0.4);

        // Draw a sakura petal shape using bezier curves
        const s = petal.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.8, -s * 0.6, s * 0.6, s * 0.3, 0, s * 0.5);
        ctx.bezierCurveTo(-s * 0.6, s * 0.3, -s * 0.8, -s * 0.6, 0, -s);
        ctx.closePath();
        ctx.fillStyle = petal.color;
        ctx.fill();

        ctx.restore();
    }

    function animatePetals(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        petals.forEach((petal) => {
            petal.y += petal.speedY;
            petal.x += petal.speedX;
            petal.rotation += petal.rotationSpeed;

            // Reset petal when it goes off screen
            if (petal.y > canvas.height + 20) {
                petal.y = -20;
                petal.x = Math.random() * canvas.width;
                petal.color = getPetalColor();
            }
            if (petal.x > canvas.width + 30) petal.x = -30;
            if (petal.x < -30) petal.x = canvas.width + 30;

            drawPetal(petal, time);
        });

        requestAnimationFrame(animatePetals);
    }

    resizeCanvas();
    createPetals();
    requestAnimationFrame(animatePetals);

    window.addEventListener('resize', () => {
        resizeCanvas();
        createPetals();
    });

    /* ========================================== */
    /*  NAVBAR SCROLL EFFECT                      */
    /* ========================================== */
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        updateActiveNavLink();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ========================================== */
    /*  ACTIVE NAV LINK                           */
    /* ========================================== */
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.dataset.section === current) {
                link.classList.add('active');
            }
        });
    }

    /* ========================================== */
    /*  MOBILE MENU                               */
    /* ========================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileToggle?.addEventListener('click', () => {
        const isOpen = mobileToggle.classList.toggle('menu-open');
        if (isOpen) {
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        } else {
            mobileMenu.style.maxHeight = '0';
        }
    });

    document.querySelectorAll('.mobile-link').forEach((link) => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('menu-open');
            mobileMenu.style.maxHeight = '0';
        });
    });

    /* ========================================== */
    /*  TYPING EFFECT                             */
    /* ========================================== */
    const typedEl = document.getElementById('typed-role');
    const roles = [
        'Desenvolvedor Full-Stack',
        'Especialista em Back-End',
        'Desenvolvedor Java & Spring Boot',
        'Apaixonado por Tecnologia',
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const TYPING_SPEED = 80;
    const DELETING_SPEED = 40;
    const PAUSE_AFTER_TYPING = 2000;
    const PAUSE_AFTER_DELETING = 500;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typedEl.textContent = currentRole.slice(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeRole, PAUSE_AFTER_TYPING);
                return;
            }
            setTimeout(typeRole, TYPING_SPEED);
        } else {
            typedEl.textContent = currentRole.slice(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, PAUSE_AFTER_DELETING);
                return;
            }
            setTimeout(typeRole, DELETING_SPEED);
        }
    }

    setTimeout(typeRole, 1200);

    /* ========================================== */
    /*  SCROLL REVEAL                             */
    /* ========================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                } else {
                    entry.target.classList.remove('revealed');
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    /* ========================================== */
    /*  COUNTER ANIMATION                         */
    /* ========================================== */
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach((el) => counterObserver.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function update() {
            current += step;
            if (current >= target) {
                el.textContent = target;
                return;
            }
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    /* ========================================== */
    /*  PROJECT FILTER                            */
    /* ========================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach((card) => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden-card');
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden-card');
                }
            });
        });
    });

    /* ========================================== */
    /*  CONTACT FORM                              */
    /* ========================================== */
    const form = document.getElementById('contact-form');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('submit-btn');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = `
      <svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      <span>Enviando...</span>
    `;
        btn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                form.reset();
                showToast('Mensagem enviada com sucesso!', 'success');
            } else {
                showToast('Erro ao enviar. Tente novamente.', 'error');
            }
        } catch (err) {
            showToast('Erro de conexão. Verifique sua internet.', 'error');
        } finally {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            lucide.createIcons();
        }
    });

    function showToast(message, type = 'success') {
        document.querySelector('.toast')?.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type} flex items-center gap-3`;

        const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
        toast.innerHTML = `
            <i data-lucide="${iconName}" class="w-5 h-5"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);
        lucide.createIcons();

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    /* ========================================== */
    /*  SMOOTH SCROLL                             */
    /* ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* ========================================== */
    /*  PARALLAX — Sakura branches follow mouse   */
    /* ========================================== */
    const sakuraBranches = document.querySelectorAll('.sakura-branch');

    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;

        const x = (e.clientX / window.innerWidth - 0.5) * 8;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;

        sakuraBranches.forEach((branch, i) => {
            const factor = i === 0 ? 1 : -0.6;
            const baseRotation = i === 0 ? 0 : 180;
            branch.style.transform = `rotate(${baseRotation}deg) translate(${x * factor}px, ${y * factor}px)`;
        });

        // Parallax for hero red glow blobs
        const heroSection = document.getElementById('hero');
        const glows = heroSection?.querySelectorAll('.red-glow');
        if (glows) {
            glows.forEach((glow, i) => {
                const f = (i + 1) * 0.4;
                glow.style.transform = `translate(${x * f}px, ${y * f}px)`;
            });
        }
    });
});
=======
/* ============================================= */
/*  PORTFOLIO — Space Theme JavaScript           */
/* ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Initialise Lucide icons
    lucide.createIcons();

    // Set current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ========================================== */
    /*  STAR FIELD CANVAS                         */
    /* ========================================== */
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const STAR_COUNT = 280;

    // Mouse Interaction setup
    let mouse = {
        x: null,
        y: null,
        radius: 150 // Distance the mouse repels the stars
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Touch support for mobile devices
    window.addEventListener('touchmove', (event) => {
        if (event.touches.length > 0) {
            mouse.x = event.touches[0].clientX;
            mouse.y = event.touches[0].clientY;
        }
    });

    window.addEventListener('touchend', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            stars.push({
                x: x,
                y: y,
                baseX: x,
                baseY: y,
                radius: Math.random() * 1.5 + 0.3,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.002 + 0.002,
                twinklePhase: Math.random() * Math.PI * 2,
                // Color variety: mostly white, some cyan/purple tints
                color: getStarColor(),
            });
        }
    }

    function getStarColor() {
        const r = Math.random();
        if (r < 0.1) return { r: 34, g: 211, b: 238 };    // Cyan
        if (r < 0.18) return { r: 167, g: 139, b: 250 };   // Purple
        if (r < 0.22) return { r: 244, g: 114, b: 182 };   // Pink
        if (r < 0.26) return { r: 251, g: 191, b: 36 };    // Gold
        return { r: 255, g: 255, b: 255 };                  // White
    }

    function drawStars(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach((star) => {
            // Mouse Repel Logic
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - star.x;
                let dy = mouse.y - star.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let force = (mouse.radius - distance) / mouse.radius;

                    // Move the star away from the mouse
                    let speed = force * 6;
                    star.x -= forceDirectionX * speed;
                    star.y -= forceDirectionY * speed;
                } else {
                    // Slowly return to base position if out of range
                    if (Math.abs(star.baseX - star.x) > 0.5) {
                        star.x += (star.baseX - star.x) * 0.05;
                    }
                    if (Math.abs(star.baseY - star.y) > 0.5) {
                        star.y += (star.baseY - star.y) * 0.05;
                    }
                }
            } else {
                // Return to base position when mouse is out
                if (Math.abs(star.baseX - star.x) > 0.5) {
                    star.x += (star.baseX - star.x) * 0.05;
                }
                if (Math.abs(star.baseY - star.y) > 0.5) {
                    star.y += (star.baseY - star.y) * 0.05;
                }
            }

            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
            const currentOpacity = star.opacity * (0.5 + twinkle * 0.5);
            const { r, g, b } = star.color;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
            ctx.fill();

            // Glow for larger stars
            if (star.radius > 1) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.08})`;
                ctx.fill();
            }
        });

        requestAnimationFrame(drawStars);
    }

    resizeCanvas();
    createStars();
    requestAnimationFrame(drawStars);

    window.addEventListener('resize', () => {
        resizeCanvas();
        createStars();
    });

    /* ========================================== */
    /*  SHOOTING STARS                            */
    /* ========================================== */
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.left = Math.random() * 70 + '%';
        star.style.top = Math.random() * 40 + '%';

        const duration = 1 + Math.random() * 1.5;
        const distance = 200 + Math.random() * 300;
        const angle = 30 + Math.random() * 30; // degrees

        star.style.animation = `none`;
        document.body.appendChild(star);

        star.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${distance}px, ${distance * Math.tan(angle * Math.PI / 180)}px)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'ease-out',
            fill: 'forwards'
        });

        setTimeout(() => star.remove(), duration * 1000 + 100);
    }

    // Random shooting stars every 4-10 seconds
    function scheduleShootingStar() {
        const delay = 4000 + Math.random() * 6000;
        setTimeout(() => {
            createShootingStar();
            scheduleShootingStar();
        }, delay);
    }
    scheduleShootingStar();

    /* ========================================== */
    /*  NAVBAR SCROLL EFFECT                      */
    /* ========================================== */
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        updateActiveNavLink();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ========================================== */
    /*  ACTIVE NAV LINK                           */
    /* ========================================== */
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.dataset.section === current) {
                link.classList.add('active');
            }
        });
    }

    /* ========================================== */
    /*  MOBILE MENU                               */
    /* ========================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileToggle?.addEventListener('click', () => {
        const isOpen = mobileToggle.classList.toggle('menu-open');
        if (isOpen) {
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        } else {
            mobileMenu.style.maxHeight = '0';
        }
    });

    document.querySelectorAll('.mobile-link').forEach((link) => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('menu-open');
            mobileMenu.style.maxHeight = '0';
        });
    });

    /* ========================================== */
    /*  TYPING EFFECT                             */
    /* ========================================== */
    const typedEl = document.getElementById('typed-role');
    const roles = [
        'Desenvolvedor Full-Stack',
        'Especialista em Back-End',
        'Desenvolvedor Java & Spring Boot',
        'Apaixonado por Tecnologia',
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const TYPING_SPEED = 80;
    const DELETING_SPEED = 40;
    const PAUSE_AFTER_TYPING = 2000;
    const PAUSE_AFTER_DELETING = 500;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typedEl.textContent = currentRole.slice(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeRole, PAUSE_AFTER_TYPING);
                return;
            }
            setTimeout(typeRole, TYPING_SPEED);
        } else {
            typedEl.textContent = currentRole.slice(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, PAUSE_AFTER_DELETING);
                return;
            }
            setTimeout(typeRole, DELETING_SPEED);
        }
    }

    setTimeout(typeRole, 1200);

    /* ========================================== */
    /*  SCROLL REVEAL                             */
    /* ========================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                } else {
                    entry.target.classList.remove('revealed');
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    /* ========================================== */
    /*  COUNTER ANIMATION                         */
    /* ========================================== */
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach((el) => counterObserver.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function update() {
            current += step;
            if (current >= target) {
                el.textContent = target;
                return;
            }
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    /* ========================================== */
    /*  PROJECT FILTER                            */
    /* ========================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach((card) => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden-card');
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden-card');
                }
            });
        });
    });

    /* ========================================== */
    /*  CONTACT FORM                              */
    /* ========================================== */
    const form = document.getElementById('contact-form');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('submit-btn');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = `
      <svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      <span>Enviando...</span>
    `;
        btn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                form.reset();
                showToast('Mensagem enviada com sucesso!', 'success');
            } else {
                showToast('Erro ao enviar. Tente novamente.', 'error');
            }
        } catch (err) {
            showToast('Erro de conexão. Verifique sua internet.', 'error');
        } finally {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            lucide.createIcons();
        }
    });

    function showToast(message, type = 'success') {
        document.querySelector('.toast')?.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type} flex items-center gap-3`;
        
        const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
        toast.innerHTML = `
            <i data-lucide="${iconName}" class="w-5 h-5"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        lucide.createIcons();

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    /* ========================================== */
    /*  SMOOTH SCROLL                             */
    /* ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* ========================================== */
    /*  PARALLAX — Nebula blobs follow mouse      */
    /* ========================================== */
    const heroSection = document.getElementById('hero');

    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;

        const blobs = heroSection?.querySelectorAll('.animate-float');
        if (!blobs) return;

        const x = (e.clientX / window.innerWidth - 0.5) * 25;
        const y = (e.clientY / window.innerHeight - 0.5) * 25;

        blobs.forEach((blob, i) => {
            const factor = i % 2 === 0 ? 1 : -0.7;
            blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });

        // Also subtly move planets
        const planets = heroSection?.querySelectorAll('.planet');
        planets?.forEach((planet, i) => {
            const pFactor = (i + 1) * 0.3;
            planet.style.transform = `translate(${x * pFactor * 0.3}px, ${y * pFactor * 0.3}px)`;
        });
    });
});
>>>>>>> de3e4e2e31cd6789cd07ae838557b6a270ce8a1e
