/**
 * ============================================
 * NutriNaila v4 - Hero Slider
 * ============================================
 */

(function() {
    'use strict';

    const HeroSlider = {
        slides: [],
        currentSlide: 0,
        autoplayInterval: null,
        autoplayDelay: 6000, // 6 segundos

        init() {
            this.slides = document.querySelectorAll('.hero-slide');
            if (this.slides.length === 0) return;

            this.createDots();
            this.updateSlider();
            this.addEventListeners();
            this.startAutoplay();
        },

        createDots() {
            const dotsContainer = document.getElementById('heroDots');
            if (!dotsContainer) return;

            dotsContainer.innerHTML = '';
            this.slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'hero-dot' + (index === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
                dot.addEventListener('click', () => this.goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        },

        updateSlider() {
            // Atualiza slides
            this.slides.forEach((slide, index) => {
                const isActive = index === this.currentSlide;
                slide.classList.toggle('active', isActive);
                
                // Gerencia animações internas
                const animatedElements = slide.querySelectorAll('.fade-up');
                animatedElements.forEach(el => {
                    if (isActive) {
                        // Força reinício da animação
                        el.classList.remove('show');
                        void el.offsetWidth; // Force reflow
                        el.classList.add('show');
                    } else {
                        el.classList.remove('show');
                    }
                });
            });

            // Atualiza dots
            const dots = document.querySelectorAll('.hero-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });
        },

        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.updateSlider();
        },

        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.updateSlider();
        },

        goToSlide(index) {
            if (this.currentSlide === index) return;
            this.currentSlide = index;
            this.updateSlider();
            this.resetAutoplay();
        },

        startAutoplay() {
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoplayDelay);
        },

        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        },

        resetAutoplay() {
            this.stopAutoplay();
            this.startAutoplay();
        },

        addEventListeners() {
            // Botões de navegação
            const prevBtn = document.getElementById('heroPrev');
            const nextBtn = document.getElementById('heroNext');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    this.prevSlide();
                    this.resetAutoplay();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    this.nextSlide();
                    this.resetAutoplay();
                });
            }

            // Teclado
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                    this.resetAutoplay();
                }
                if (e.key === 'ArrowRight') {
                    this.nextSlide();
                    this.resetAutoplay();
                }
            });

            // Touch/Swipe
            this.initTouch();
        },

        initTouch() {
            let touchStartX = 0;
            let touchEndX = 0;
            const hero = document.querySelector('.hero-bg');

            if (!hero) return;

            hero.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            hero.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX);
            }, { passive: true });
        },

        handleSwipe(startX, endX) {
            const diff = startX - endX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
                this.resetAutoplay();
            }
        }
    };

    // Inicializa
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => HeroSlider.init());
    } else {
        HeroSlider.init();
    }

})();
