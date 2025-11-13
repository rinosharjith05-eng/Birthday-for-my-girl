document.addEventListener('DOMContentLoaded', () => {
    initSparkles();
    init3DPostcard();
    initSmoothScroll();
    initNavigation();
    initGallery();
    initSurprise();
});

function initSparkles() {
    const sparklesContainer = document.getElementById('sparkles');

    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparklesContainer.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }, 300);
}

function init3DPostcard() {
    const postcard = document.getElementById('postcard');

    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        postcard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.dataset.section === sectionId) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox(item);
        });
    });

    function openLightbox(item) {
        const img = item.querySelector('img');
        if (img) {
            lightboxImg.src = img.src;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        const img = galleryItems[currentIndex].querySelector('img');
        if (img) {
            lightboxImg.src = img.src;
        }
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        const img = galleryItems[currentIndex].querySelector('img');
        if (img) {
            lightboxImg.src = img.src;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
}

function initSurprise() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseMessage = document.getElementById('surpriseMessage');
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    surpriseBtn.addEventListener('click', () => {
        surpriseMessage.classList.add('show');
        surpriseBtn.style.display = 'none';
        launchConfetti();
    });

    function launchConfetti() {
        const confetti = [];
        const confettiCount = 150;
        const colors = ['#ff6b9d', '#ffc8dd', '#ffb6c1', '#c44569', '#ffa8c5', '#fff5f7'];

        class ConfettiPiece {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = -20;
                this.w = Math.random() * 10 + 5;
                this.h = Math.random() * 10 + 5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speed = Math.random() * 3 + 2;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 10 - 5;
                this.swing = Math.random() * 2 - 1;
            }

            update() {
                this.y += this.speed;
                this.x += this.swing;
                this.rotation += this.rotationSpeed;

                if (this.y > canvas.height) {
                    this.y = -20;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
                ctx.restore();
            }
        }

        for (let i = 0; i < confettiCount; i++) {
            confetti.push(new ConfettiPiece());
        }

        let animationFrameId;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confetti.forEach(piece => {
                piece.update();
                piece.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        setTimeout(() => {
            cancelAnimationFrame(animationFrameId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 10000);
    }
}

const memoryCards = document.querySelectorAll('.memory-card');
memoryCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});
