console.log("System initialized. Welcome, Siesta.");

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. 載入畫面
    const loadingOverlay = document.getElementById("loading");
    const progressBar = document.getElementById("progress-bar");
    let progress = 0;

    if (loadingOverlay && progressBar) {
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 20) + 10; 
            if (progress > 100) progress = 100;
            progressBar.style.width = `${progress}%`;

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    const loadingContent = document.querySelector('.loading-content');
                    if(loadingContent) {
                        loadingContent.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                        loadingContent.style.transform = 'translateY(-100vh)';
                        loadingContent.style.opacity = '0';
                    }
                    setTimeout(() => {
                        loadingOverlay.style.transition = 'opacity 0.5s ease';
                        loadingOverlay.style.opacity = "0";
                        setTimeout(() => { loadingOverlay.style.display = "none"; }, 500); 
                    }, 500);
                }, 500);
            }
        }, 200);
    }

    // 2. Typed.js
    if (window.Typed) {
        new Typed(".typing", {
            strings: [
                'CYBER_SECURITY_ENTHUSIAST',
                'PYTHON_DEVELOPER',
                'FRONTEND_DESIGNER',
                'DIGITAL_CONTENT_CREATOR',
                'MDHS_STUDENT'
            ],
            typeSpeed: 60, backSpeed: 40, backDelay: 1500, loop: true, cursorChar: '_'
        });
    }

    // 3. 導覽列
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.classList.add("hidden");
            } else {
                navbar.classList.remove("hidden");
            }
            lastScrollTop = scrollTop;
        });
    }

    // 4. Hero 視差與浮現
    const heroImage = document.querySelector('.hero-content');
    if (heroImage) {
        heroImage.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
        heroImage.style.transform = 'translateY(-20px)';
        heroImage.style.opacity = '0';
        setTimeout(() => {
            heroImage.style.transform = 'translateY(0)';
            heroImage.style.opacity = '1';
        }, 800);
    }
    const hero = document.getElementById('home');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // 5. 滾動觸發動畫
    function setupScrollAnimation(sectionSelector, itemSelector, thresholdVal = 0.3) {
        const section = document.querySelector(sectionSelector);
        const items = document.querySelectorAll(itemSelector);
        if (!section || items.length === 0) return;

        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                observer.unobserve(section);
            }
        }, { threshold: thresholdVal });
        observer.observe(section);
    }
    setupScrollAnimation('#contact', '.contact-item', 0.5);
    setupScrollAnimation('#goals', '.goal-card', 0.3);

    // 6. 點狀背景
    function createHalftoneDots() {
        const container = document.getElementById('goals');
        if (!container) return;
        const dotContainer = document.createElement('div');
        dotContainer.className = 'halftone-container';
        dotContainer.style.position = 'absolute'; dotContainer.style.top = '0'; dotContainer.style.left = '0';
        dotContainer.style.width = '100%'; dotContainer.style.height = '100%';
        dotContainer.style.pointerEvents = 'none'; dotContainer.style.overflow = 'hidden'; dotContainer.style.zIndex = '0';
        container.style.position = 'relative'; container.appendChild(dotContainer);

        for (let i = 0; i < 30; i++) {
            const dot = document.createElement('div');
            dot.style.position = 'absolute'; dot.style.width = `20px`; dot.style.height = `20px`;
            dot.style.background = 'rgba(255, 255, 255, 0.05)'; dot.style.borderRadius = '50%';
            dot.style.left = `${Math.random() * 100}%`; dot.style.top = `${Math.random() * 100}%`;
            dot.animate([{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(1)', opacity: 0 }], { duration: 4000, iterations: Infinity, delay: Math.random() * 4000 });
            dotContainer.appendChild(dot);
        }
    }
    createHalftoneDots();

    // 7. Canvas 背景
    function createCanvasParticles() {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;
        const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
        canvas.style.position = 'absolute'; canvas.style.top = '0'; canvas.style.left = '0';
        canvas.style.width = '100%'; canvas.style.height = '100%'; canvas.style.zIndex = '0'; canvas.style.pointerEvents = 'none';
        contactSection.insertBefore(canvas, contactSection.firstChild);

        let width, height; const particles = []; const particleCount = window.innerWidth < 768 ? 40 : 80;
        function resize() { width = canvas.width = contactSection.offsetWidth; height = canvas.height = contactSection.offsetHeight; }
        window.addEventListener('resize', resize); resize();

        for (let i = 0; i < particleCount; i++) {
            particles.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 2 + 1, vx: (Math.random() - 0.5) * 1, vy: (Math.random() - 0.5) * 1 });
        }

        function draw() {
            ctx.clearRect(0, 0, width, height); ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            for (let i = 0; i < particleCount; i++) {
                const p = particles[i]; ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1; if (p.y < 0 || p.y > height) p.vy *= -1;
            }
            requestAnimationFrame(draw);
        }
        draw();
    }
    setTimeout(createCanvasParticles, 500);
});

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
