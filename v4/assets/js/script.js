/**
 * ============================================
 * NutriNaila - JavaScript Principal
 * Versão: 2.0.0
 * ============================================
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURAÇÃO
    // ============================================
    const CONFIG = {
        whatsappNumber: '554132220108',
        gaTrackingId: 'G-XXXXXXXXXX',
        pixelId: 'XXXXXXXXXXXXXXX',
        scrollThreshold: 50,
        debounceDelay: 250
    };

    // ============================================
    // UTILITÁRIOS
    // ============================================
    
    /**
     * Debounce para otimizar eventos
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Track de eventos do Google Analytics
     */
    function trackGAEvent(eventName, eventParams = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'engagement',
                event_label: window.location.pathname,
                ...eventParams
            });
        }
    }

    /**
     * Track de eventos do Meta Pixel
     */
    function trackPixelEvent(eventName, eventData = {}) {
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, eventData);
        }
    }

    /**
     * Track unificado para ambos os sistemas
     */
    function trackConversion(eventName, eventData = {}) {
        trackGAEvent(eventName, eventData);
        trackPixelEvent(eventData.pixelEvent || 'Lead', eventData);
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        const handleScroll = debounce(() => {
            if (window.scrollY > CONFIG.scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, CONFIG.debounceDelay);

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial state
    }

    // ============================================
    // MOBILE MENU
    // ============================================
    
    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.mobile-menu');
        const links = document.querySelectorAll('.mobile-nav-link');

        if (!toggle || !menu) return;

        function toggleMenu() {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('active');
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
            
            // Track event
            if (!isExpanded) {
                trackGAEvent('mobile_menu_open');
            }
        }

        function closeMenu() {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }

        toggle.addEventListener('click', toggleMenu);

        // Fechar menu ao clicar em um link
        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Fechar menu ao clicar fora
        menu.addEventListener('click', (e) => {
            if (e.target === menu) {
                closeMenu();
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL PARA LINKS INTERNOS
    // ============================================
    
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#' || href === '') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Track event
                trackGAEvent('navigation_click', {
                    event_label: href
                });
            });
        });
    }

    // ============================================
    // TRACKING DE CLIQUES WHATSAPP
    // ============================================
    
    function initWhatsAppTracking() {
        const whatsappLinks = document.querySelectorAll('[data-ga-event*="whatsapp"]');

        whatsappLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const eventName = link.getAttribute('data-ga-event');
                const pixelEvent = link.getAttribute('data-pixel-event');

                trackConversion(eventName, {
                    pixelEvent: pixelEvent || 'Lead',
                    value: 0,
                    currency: 'BRL'
                });

                // Fallback: abrir WhatsApp manualmente se necessário
                const href = link.getAttribute('href');
                if (href && href.includes('wa.me')) {
                    // O link já abrirá naturalmente, apenas trackeamos
                }
            });
        });
    }

    // ============================================
    // ANIMAÇÃO DE ELEMENTOS AO SCROLL (Intersection Observer)
    // ============================================
    
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Elementos para animar
        const elementsToAnimate = document.querySelectorAll(
            '.service-card, .testimonial-card, .blog-card, .feature-card, .about-image, .about-content'
        );

        elementsToAnimate.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    // ============================================
    // LAZY LOADING DE IMAGENS
    // ============================================
    
    function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser suporta lazy loading nativo
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (!img.src) {
                    img.src = img.dataset.src || '';
                }
            });
        } else {
            // Fallback para browsers antigos (pode usar library como lazysizes)
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }

    // ============================================
    // ATUALIZAR ANO NO FOOTER
    // ============================================
    
    function updateFooterYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // ============================================
    // FORMULÁRIO DE CONTATO (se existir)
    // ============================================
    
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Loading state
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            try {
                // Aqui você implementaria o envio real do formulário
                // Por enquanto, apenas simulamos
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Track conversion
                trackConversion('form_submit', {
                    pixelEvent: 'Lead',
                    content_name: 'Formulário de Contato'
                });

                // Success message
                form.innerHTML = `
                    <div class="form-success">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <h3>Mensagem enviada!</h3>
                        <p>Entrarei em contato em breve.</p>
                    </div>
                `;
            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Track error
                trackGAEvent('form_error', {
                    event_label: 'Erro no formulário de contato'
                });
            }
        });
    }

    // ============================================
    // ACCORDION PARA PERGUNTAS FREQUENTES (se existir)
    // ============================================
    
    function initAccordion() {
        const accordions = document.querySelectorAll('.accordion-item');
        
        accordions.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (!header) return;

            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Fecha todos
                accordions.forEach(acc => acc.classList.remove('active'));
                
                // Abre o atual se estava fechado
                if (!isOpen) {
                    item.classList.add('active');
                }

                trackGAEvent('accordion_toggle', {
                    event_label: header.textContent
                });
            });
        });
    }

    // ============================================
    // PERFORMANCE: PRELOAD DE IMAGENS CRÍTICAS
    // ============================================
    
    function preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('img[fetchpriority="high"]');
        
        criticalImages.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    }

    // ============================================
    // ACESSIBILIDADE: GERENCIAMENTO DE FOCO
    // ============================================
    
    function initFocusManagement() {
        // Melhorar foco para navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    // ============================================
    // SERVICE WORKER (PWA - Opcional)
    // ============================================
    
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registrado:', registration.scope);
                    })
                    .catch(error => {
                        console.log('ServiceWorker falhou:', error);
                    });
            });
        }
    }

    // ============================================
    // COMPARTILHAMENTO WEB (Web Share API)
    // ============================================
    
    function initWebShare() {
        const shareButtons = document.querySelectorAll('[data-share]');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const shareData = {
                    title: document.title,
                    text: 'Confira este site da Nutricionista Naila Gomes',
                    url: window.location.href
                };

                if (navigator.share) {
                    try {
                        await navigator.share(shareData);
                        trackGAEvent('web_share', {
                            event_label: 'Compartilhamento bem-sucedido'
                        });
                    } catch (error) {
                        console.log('Compartilhamento cancelado');
                    }
                } else {
                    // Fallback: copiar URL
                    navigator.clipboard.writeText(window.location.href);
                    alert('URL copiada para a área de transferência!');
                }
            });
        });
    }

    // ============================================
    // DETECÇÃO DE REDUÇÃO DE MOVIMENTO
    // ============================================

    function respectReducedMotion() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (mediaQuery.matches) {
            document.documentElement.style.setProperty('--transition-base', '0ms');
            document.documentElement.style.setProperty('--transition-fast', '0ms');
            document.documentElement.style.setProperty('--transition-slow', '0ms');
            document.documentElement.style.scrollBehavior = 'auto';
        }
    }

    // ============================================
    // ANIMAÇÃO DE CONTAGEM (STATS)
    // ============================================

    function initCounterAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');

        if (statNumbers.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const animateCounter = (element) => {
            const text = element.textContent.trim();
            
            // Ignora strings que não são apenas números com opcional '+'
            // Ex: "CRN-8 1557" não anima, "+10" anima
            const isPureNumber = /^[\+\d]+$/.test(text.replace(/\s/g, ''));
            
            if (!isPureNumber) return;
            
            const hasPlus = text.includes('+');
            const hasNumbers = /\d/.test(text);

            if (!hasNumbers) return;

            // Extrai números do texto
            const match = text.match(/(\d+)/);
            if (!match) return;

            const finalValue = parseInt(match[1]);
            const prefix = text.replace(/\d+/g, '').trim();
            const duration = 2000; // 2 segundos
            const step = finalValue / (duration / 16); // 60fps
            let currentValue = 0;

            const updateCounter = () => {
                currentValue += step;
                if (currentValue < finalValue) {
                    const displayValue = Math.floor(currentValue);
                    element.textContent = prefix + displayValue + (hasPlus ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = text;
                }
            };

            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => counterObserver.observe(stat));
    }

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    
    function init() {
        // Respeitar preferência de movimento reduzido
        respectReducedMotion();
        
        // Atualizar ano no footer
        updateFooterYear();
        
        // Quando o DOM estiver pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initAll();
            });
        } else {
            initAll();
        }
    }

    function initAll() {
        initHeaderScroll();
        initMobileMenu();
        initSmoothScroll();
        initWhatsAppTracking();
        initLazyLoading();
        preloadCriticalImages();
        initFocusManagement();
        initContactForm();
        initAccordion();
        initWebShare();
        initCounterAnimation();

        // Scroll animations após carregamento inicial
        setTimeout(() => {
            initScrollAnimations();
        }, 100);

        console.log('NutriNaila: Site inicializado com sucesso! 🌿');
    }

    // Iniciar
    init();

    // Expor funções globalmente se necessário
    window.NutriNaila = {
        trackConversion,
        trackGAEvent,
        trackPixelEvent
    };

})();
