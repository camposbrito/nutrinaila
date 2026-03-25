/**
 * ============================================
 * NutriNaila v2 - Hero Slider
 * ============================================
 */

(function() {
    'use strict';

    const HeroSlider = {
        slides: [],
        currentSlide: 0,
        autoplayInterval: null,
        autoplayDelay: 5000, // 5 segundos

        init() {
            this.slides = document.querySelectorAll('.hero-slide');
            if (this.slides.length === 0) return;

            this.createDots();
            this.updateSlider();
            this.addEventListeners();
            this.startAutoplay();
            this.animateContent();
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
                slide.classList.toggle('active', index === this.currentSlide);
            });

            // Atualiza dots
            const dots = document.querySelectorAll('.hero-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });

            // Anima conteúdo
            this.animateContent();
        },

        animateContent() {
            const heroTitle = document.getElementById('heroTitle');
            const heroText = document.getElementById('heroText');
            const heroCta = document.querySelector('.hero-cta-btn');
            const heroNav = document.querySelector('.hero-nav');

            // Remove classe show para reiniciar animação
            [heroTitle, heroText, heroCta, heroNav].forEach(el => {
                if (el) {
                    el.classList.remove('show');
                    // Força reflow
                    void el.offsetWidth;
                    el.classList.add('show');
                }
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
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    this.nextSlide();
                });
            }

            // Pause no hover
            const hero = document.querySelector('.hero-bg');
            if (hero) {
                hero.addEventListener('mouseenter', () => this.stopAutoplay());
                hero.addEventListener('mouseleave', () => this.startAutoplay());
            }

            // Teclado
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
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
            const threshold = 50; // Mínimo de pixels para considerar swipe

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe para esquerda - próximo slide
                    this.nextSlide();
                } else {
                    // Swipe para direita - slide anterior
                    this.prevSlide();
                }
            }
        }
    };

    // Inicializa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => HeroSlider.init());
    } else {
        HeroSlider.init();
    }

    // Expõe globalmente se necessário
    window.HeroSlider = HeroSlider;

})();
