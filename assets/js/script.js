// ===== GLOBAL VARIABLES & INITIALIZATION =====
let currentLanguage = 'ar';
let currentTheme = 'light';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    new LoadingScreen();
    new ThemeController();
    new LanguageController();
    new NavbarController();
    new PortfolioFilter();
    new ContactForm();
    new ParticleSystem();
    new EnhancedAnimations();
    new StatsCounter();
    
    // Initialize new creative components
    new AIChatWidget();
    new LiveCodeEditor();
    new ThreeJSBackground();
    new InteractiveCursor();
    
    // Initialize extreme creative features
    new AdvancedParticleSystem();
    new SoundVisualizer();
    new MatrixRain();
    new FloatingTechIcons();
    
    // Initialize light creative graphics
    new LightGraphics();
    
    // Initialize AOS with custom settings
    AOS.init({
        duration: 100,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 50,
        delay: 50
    });
    
    // Initialize interactive effects
    addInteractiveEffects();
    
    // Load saved preferences
    loadUserPreferences();
});

// ===== LOADING SCREEN =====
class LoadingScreen {
    constructor() {
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.loadingText = this.loadingOverlay.querySelector('.loading-text');
        this.init();
    }

    init() {
        window.addEventListener('load', () => this.hideLoader());
    }

    hideLoader() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.add('hidden');
            // Optionally remove the element from DOM after transition
            setTimeout(() => {
                if (this.loadingOverlay.parentNode) {
                    this.loadingOverlay.parentNode.removeChild(this.loadingOverlay);
                }
            }, 50); // Match transition duration
        }
    }
}

// ===== THEME CONTROLLER =====
class ThemeController {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.loadSavedTheme();
    }

    toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(currentTheme);
        this.saveTheme();
        this.updateThemeIcon();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Add transition class for smooth theme change
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        if (currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
            this.themeToggle.title = 'تبديل للوضع النهاري';
        } else {
            icon.className = 'fas fa-moon';
            this.themeToggle.title = 'تبديل للوضع المظلم';
        }
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        currentTheme = savedTheme;
        this.applyTheme(currentTheme);
        this.updateThemeIcon();
    }

    saveTheme() {
        localStorage.setItem('portfolio-theme', currentTheme);
    }
}

// ===== LANGUAGE CONTROLLER =====
class LanguageController {
    constructor() {
        this.langToggle = document.getElementById('lang-toggle');
        this.init();
    }

    init() {
        this.langToggle.addEventListener('click', () => this.toggleLanguage());
        this.loadSavedLanguage();
    }

    toggleLanguage() {
        currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        this.applyLanguage(currentLanguage);
        this.saveLanguage();
        this.updateLanguageButton();
    }

    applyLanguage(lang) {
        // Update document direction and language
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update all elements with data attributes
        const elements = document.querySelectorAll('[data-ar][data-en]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });

        // Update placeholder texts
        this.updatePlaceholders(lang);
        
        // Update document title
        this.updateTitle(lang);
    }

    updatePlaceholders(lang) {
        const placeholders = {
            ar: {
                name: 'الاسم',
                email: 'البريد الإلكتروني',
                subject: 'الموضوع',
                message: 'الرسالة'
            },
            en: {
                name: 'Name',
                email: 'Email',
                subject: 'Subject',
                message: 'Message'
            }
        };

        Object.keys(placeholders[lang]).forEach(key => {
            const element = document.querySelector(`input[placeholder*="${key}"], textarea[placeholder*="${key}"]`);
            if (element) {
                element.placeholder = placeholders[lang][key];
            }
        });
    }

    updateTitle(lang) {
        const titles = {
            ar: 'أحمد أشرف - مطور فرونت إند ومختص AI وسايبر سيكيورتي',
            en: 'Ahmed Ashraf - Frontend Developer & AI Expert & Cybersecurity Specialist'
        };
        document.title = titles[lang];
    }

    updateLanguageButton() {
        const langText = this.langToggle.querySelector('.lang-text');
        if (currentLanguage === 'ar') {
            langText.textContent = 'EN';
            this.langToggle.title = 'Switch to English';
        } else {
            langText.textContent = 'ع';
            this.langToggle.title = 'التبديل للعربية';
        }
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('portfolio-language') || 'ar';
        currentLanguage = savedLang;
        this.applyLanguage(currentLanguage);
        this.updateLanguageButton();
    }

    saveLanguage() {
        localStorage.setItem('portfolio-language', currentLanguage);
    }
}

// ===== ENHANCED NAVBAR CONTROLLER =====
class NavbarController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.handleScroll();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.updateActiveLink();
        
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateActiveLink();
        });

        // Close menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            }
        });
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            }
        });
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===== ENHANCED PORTFOLIO FILTER =====
class PortfolioFilter {
    constructor() {
        this.navBtns = document.querySelectorAll('.portfolio-nav-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.featuredProject = document.querySelector('.featured-project');
        this.loadMoreBtn = document.querySelector('.load-more-btn');
        
        this.init();
    }

    init() {
        this.navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                this.filterPortfolio(category);
                this.updateActiveButton(btn);
            });
        });

        // Load more functionality
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.loadMoreProjects();
            });
        }
    }

    filterPortfolio(category) {
        // Show/hide featured project
        if (category === 'all' || category === 'educational') {
            this.featuredProject.style.display = 'block';
            this.featuredProject.classList.remove('hidden');
        } else {
            this.featuredProject.classList.add('hidden');
            setTimeout(() => {
                this.featuredProject.style.display = 'none';
            }, 50); // Reduced timeout for hiding
        }

        // Filter project cards
        this.projectCards.forEach((card) => {
            if (card.classList.contains('featured-project')) {
                return;
            }
            
            const cardClasses = card.className;
            let shouldShow = false;

            switch(category) {
                case 'all':
                    shouldShow = true;
                    break;
                case 'portfolios':
                    shouldShow = cardClasses.includes('portfolios');
                    break;
                case 'landing':
                    shouldShow = cardClasses.includes('landing');
                    break;
                case 'companies':
                    shouldShow = cardClasses.includes('companies');
                    break;
                case 'educational':
                    shouldShow = cardClasses.includes('educational');
                    break;
            }

            if (shouldShow) {
                card.style.display = 'block';
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 50); // Reduced timeout for hiding
            }
        });
    }

    addStaggerAnimation() {
        const visibleCards = Array.from(this.projectCards).filter(card => 
            !card.classList.contains('hidden') && card.style.display !== 'none'
        );

        visibleCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-in');
        });
    }

    updateActiveButton(activeBtn) {
        this.navBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');

        // Add ripple effect
        this.addRippleEffect(activeBtn);
    }

    addRippleEffect(button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.classList.add('nav-ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    loadMoreProjects() {
        // Simulate loading more projects
        this.loadMoreBtn.innerHTML = '<div class="loading"></div> <span>جاري التحميل...</span>';
        this.loadMoreBtn.disabled = true;

        setTimeout(() => {
            // Reset button
            this.loadMoreBtn.innerHTML = `
                <span class="btn-text">عرض جميع المشاريع</span>
                <div class="btn-icon">
                    <i class="fas fa-arrow-down"></i>
                </div>
            `;
            this.loadMoreBtn.disabled = false;

            // Show success message
            this.showLoadMessage('تم تحميل المزيد من المشاريع!');
        }, 2000);
    }

    showLoadMessage(text) {
        const message = document.createElement('div');
        message.className = 'load-message';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${text}</span>
        `;
        
        Object.assign(message.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '15px 20px',
            background: 'var(--success-color)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            zIndex: '9999',
            transform: 'translateY(100px)',
            transition: 'transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: '600'
        });
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
            message.style.transform = 'translateY(100px)';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 3000);
    }
}

// ===== ENHANCED CONTACT FORM =====
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupInputAnimations();
        }
    }

    setupInputAnimations() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<div class="loading"></div> <span>جاري الإرسال...</span>';
        submitBtn.disabled = true;
        
        try {
            await this.simulateFormSubmission();
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            this.showErrorMessage();
        } finally {
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    }

    simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    showSuccessMessage() {
        this.showMessage('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
    }

    showErrorMessage() {
        this.showMessage('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
    }

    showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${text}</span>
        `;
        
        Object.assign(message.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            zIndex: '9999',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        });
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            message.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 5000);
    }
}

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor() {
        this.particlesContainer = document.getElementById('particles');
        if (this.particlesContainer) {
            this.createParticles();
        }
    }

    createParticles() {
        const particleCount = window.innerWidth > 768 ? 50 : 25;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            Object.assign(particle.style, {
                position: 'absolute',
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                borderRadius: '50%',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.2,
                animation: `float ${Math.random() * 10 + 10}s infinite linear`
            });
            
            this.particlesContainer.appendChild(particle);
        }
    }
}

// ===== ENHANCED ANIMATIONS =====
class EnhancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupTypingEffect();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.portfolio-card, .skill-category, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }

    setupHoverEffects() {
        // 3D tilt effect for portfolio cards
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 8;
                const rotateY = (centerX - x) / 8;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    setupTypingEffect() {
        const typingElement = document.querySelector('.typing-effect');
        if (typingElement) {
            this.typeWriter(typingElement);
        }
    }

    typeWriter(element) {
        const texts = [
            currentLanguage === 'ar' ? 'أحمد أشرف' : 'Ahmed Ashraf'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let speed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            setTimeout(type, speed);
        };
        
        // Start after a delay
        setTimeout(type, 1000);
    }
}

// ===== STATS COUNTER =====
class StatsCounter {
    constructor() {
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                }
            });
        });

        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            observer.observe(heroStats);
        }
    }

    animateCounters() {
        this.statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace('+', ''));
            let current = 0;
            const increment = target / 60;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + '+';
            }, 50);
        });
    }
}

// ===== CURSOR TRAIL =====
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 20;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailPoint(e.clientX, e.clientY);
        });

        this.createTrailElements();
        this.animate();
    }

    createTrailElements() {
        for (let i = 0; i < this.maxTrailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            Object.assign(dot.style, {
                position: 'fixed',
                width: '6px',
                height: '6px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: '9999',
                opacity: '0',
                transform: 'translate(-50%, -50%)',
                transition: 'opacity 0.3s ease'
            });
            document.body.appendChild(dot);
        }
    }

    addTrailPoint(x, y) {
        this.trail.push({ x, y, life: 1 });
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
    }

    animate() {
        const dots = document.querySelectorAll('.cursor-trail');
        
        this.trail.forEach((point, index) => {
            const dot = dots[index];
            if (dot) {
                dot.style.left = point.x + 'px';
                dot.style.top = point.y + 'px';
                dot.style.opacity = point.life * 0.8;
            }
            point.life -= 0.05;
        });

        this.trail = this.trail.filter(point => point.life > 0);
        requestAnimationFrame(() => this.animate());
    }
}

// ===== INTERACTIVE EFFECTS =====
function addInteractiveEffects() {
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn, .category-btn, .social-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.btn-primary, .social-btn');
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });

    // Parallax effect for hero shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.hero-shapes > div');
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function loadUserPreferences() {
    // Load theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    // Load language
    const savedLang = localStorage.getItem('portfolio-language');
    if (savedLang) {
        currentLanguage = savedLang;
        document.documentElement.lang = currentLanguage;
        document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    }
}

// Add theme transition CSS
const themeTransitionCSS = `
    .theme-transition * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = themeTransitionCSS;
document.head.appendChild(styleSheet);

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=smoothscroll';
    document.head.appendChild(script);
}

// Performance optimization
window.addEventListener('resize', debounce(() => {
    // Reinitialize components that depend on window size
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.cursor-trail').forEach(dot => dot.remove());
    }
}, 250));

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

// ===== AI CHAT WIDGET =====
class AIChatWidget {
    constructor() {
        this.widget = document.getElementById('aiChatWidget');
        this.toggle = document.getElementById('chatToggle');
        this.container = document.getElementById('chatContainer');
        this.closeBtn = document.getElementById('chatClose');
        this.input = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('chatSend');
        this.messages = document.getElementById('chatMessages');
        
        this.responses = {
            ar: [
                'أحمد مطور فرونت إند محترف مع خبرة 3+ سنوات في Angular وReact.',
                'يتخصص أحمد في تطوير المواقع التفاعلية والمنصات التعليمية.',
                'لديه خبرة في الذكاء الاصطناعي والأمن السيبراني أيضاً.',
                'يمكنك التواصل معه مباشرة من خلال قسم التواصل في الموقع.',
                'أحمد يعمل حالياً كمدرب برمجة ومطور فريلانسر.',
                'شاهد مشاريعه المميزة في قسم البورتفوليو!'
            ],
            en: [
                'Ahmed is a professional frontend developer with 3+ years of experience in Angular and React.',
                'He specializes in developing interactive websites and educational platforms.',
                'He also has experience in AI and cybersecurity.',
                'You can contact him directly through the contact section on the website.',
                'Ahmed currently works as a programming trainer and freelance developer.',
                'Check out his amazing projects in the portfolio section!'
            ]
        };
        
        this.init();
    }

    init() {
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Auto greet after 5 seconds
        setTimeout(() => {
            if (!this.container.classList.contains('active')) {
                this.addNotification();
            }
        }, 5000);
    }

    toggleChat() {
        this.container.classList.toggle('active');
        if (this.container.classList.contains('active')) {
            this.input.focus();
        }
    }

    closeChat() {
        this.container.classList.remove('active');
    }

    addNotification() {
        const notification = document.createElement('div');
        notification.className = 'chat-notification';
        notification.innerHTML = '<i class="fas fa-comment"></i>';
        notification.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            width: 20px;
            height: 20px;
            background: #ef4444;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 10px;
            animation: pulse 2s infinite;
        `;
        
        this.toggle.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 10000);
    }

    sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.input.value = '';

        // Simulate AI response
        setTimeout(() => {
            const responses = this.responses[currentLanguage] || this.responses.ar;
            const response = responses[Math.floor(Math.random() * responses.length)];
            this.addMessage(response, 'ai');
        }, 1000);
    }

    addMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message ${type}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;
        
        message.appendChild(avatar);
        message.appendChild(content);
        
        this.messages.appendChild(message);
        this.messages.scrollTop = this.messages.scrollHeight;
    }
}

// ===== LIVE CODE EDITOR =====
class LiveCodeEditor {
    constructor() {
        this.widget = document.getElementById('codeEditorWidget');
        this.toggle = document.getElementById('codeToggle');
        this.container = document.getElementById('codeContainer');
        this.closeBtn = document.getElementById('codeClose');
        this.runBtn = document.getElementById('codeRun');
        this.textarea = document.getElementById('codeTextarea');
        this.preview = document.getElementById('previewFrame');
        this.tabs = document.querySelectorAll('.code-tab');
        
        this.currentLang = 'html';
        this.code = {
            html: `<!DOCTYPE html>
<html>
<head>
    <title>Live Demo</title>
    <style>
        body { 
            font-family: Arial; 
            padding: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
        }
        .demo { 
            text-align: center; 
            margin-top: 50px;
        }
        button {
            padding: 10px 20px;
            background: white;
            color: #667eea;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="demo">
        <h1>مرحباً من أحمد أشرف!</h1>
        <p>هذا مثال على الكود المباشر</p>
        <button onclick="alert('Hello from Ahmed!')">اضغط هنا</button>
    </div>
</body>
</html>`,
            css: `body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 50px 20px;
}

h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.btn {
    display: inline-block;
    padding: 15px 30px;
    background: rgba(255,255,255,0.2);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    border: 2px solid white;
    transition: all 0.3s ease;
}

.btn:hover {
    background: white;
    color: #667eea;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}`,
            js: `// Ahmed Ashraf - Interactive Demo
console.log('Welcome to Ahmed\'s Portfolio!');

// Dynamic greeting
function greetUser() {
    const hours = new Date().getHours();
    let greeting;
    
    if (hours < 12) {
        greeting = 'صباح الخير!';
    } else if (hours < 18) {
        greeting = 'مساء الخير!';
    } else {
        greeting = 'مساء الخير!';
    }
    
    return greeting;
}

// Create interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const container = document.createElement('div');
    container.innerHTML = \`
        <h1>\${greetUser()}</h1>
        <p>أنا أحمد أشرف - مطور فرونت إند</p>
        <button onclick="showSkills()">مهاراتي</button>
    \`;
    document.body.appendChild(container);
});

function showSkills() {
    alert('Angular, React, Vue.js, Node.js, AI, Cybersecurity');
}`
        };
        
        this.init();
    }

    init() {
        this.toggle.addEventListener('click', () => this.toggleEditor());
        this.closeBtn.addEventListener('click', () => this.closeEditor());
        this.runBtn.addEventListener('click', () => this.runCode());
        
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.lang));
        });
        
        this.textarea.value = this.code[this.currentLang];
        
        // Auto-run on load
        setTimeout(() => this.runCode(), 500);
    }

    toggleEditor() {
        this.container.classList.toggle('active');
    }

    closeEditor() {
        this.container.classList.remove('active');
    }

    switchTab(lang) {
        this.code[this.currentLang] = this.textarea.value;
        this.currentLang = lang;
        this.textarea.value = this.code[lang];
        
        this.tabs.forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    }

    runCode() {
        let code = this.textarea.value;
        
        // Add syntax highlighting
        if (window.hljs) {
            const highlightedCode = hljs.highlightAuto(code);
            this.textarea.style.background = 'linear-gradient(45deg, #1e1e1e, #2d2d2d)';
        }
        
        // Show loading indicator
        this.showLoadingIndicator();
        
        setTimeout(() => {
            try {
                if (this.currentLang === 'html') {
                    this.preview.srcdoc = code;
                } else if (this.currentLang === 'css') {
                    const html = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                                * { margin: 0; padding: 0; box-sizing: border-box; }
                                body { 
                                    font-family: 'Arial', sans-serif; 
                                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                    color: white;
                                    min-height: 100vh;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                }
                                ${code}
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>CSS Demo by Ahmed Ashraf</h1>
                                <p>تصميم CSS مباشر</p>
                                <div class="demo-element">Demo Element</div>
                                <button class="btn">Button Demo</button>
                            </div>
                        </body>
                        </html>
                    `;
                    this.preview.srcdoc = html;
                } else if (this.currentLang === 'js') {
                    const html = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                                body { 
                                    font-family: 'Arial', sans-serif; 
                                    padding: 20px; 
                                    background: linear-gradient(45deg, #667eea, #764ba2); 
                                    color: white;
                                    min-height: 100vh;
                                }
                                .output { 
                                    background: rgba(255,255,255,0.1); 
                                    padding: 20px; 
                                    border-radius: 10px; 
                                    margin: 20px 0;
                                    backdrop-filter: blur(10px);
                                }
                                button {
                                    padding: 10px 20px;
                                    background: white;
                                    color: #667eea;
                                    border: none;
                                    border-radius: 25px;
                                    cursor: pointer;
                                    font-weight: bold;
                                    margin: 10px;
                                    transition: all 0.3s ease;
                                }
                                button:hover {
                                    transform: translateY(-2px);
                                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                                }
                            </style>
                        </head>
                        <body>
                            <h1>JavaScript Demo by Ahmed Ashraf</h1>
                            <div class="output" id="output">
                                <p>Output will appear here...</p>
                            </div>
                            <script>
                                // Override console.log to show in output
                                const originalLog = console.log;
                                console.log = function(...args) {
                                    const output = document.getElementById('output');
                                    const logEntry = document.createElement('div');
                                    logEntry.style.cssText = 'margin: 5px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 5px; font-family: monospace;';
                                    logEntry.textContent = args.join(' ');
                                    output.appendChild(logEntry);
                                    originalLog.apply(console, args);
                                };
                                
                                // Wrap user code in try-catch
                                try {
                                    ${code}
                                } catch (error) {
                                    console.log('Error: ' + error.message);
                                }
                            </script>
                        </body>
                        </html>
                    `;
                    this.preview.srcdoc = html;
                }
                
                this.hideLoadingIndicator();
                this.showSuccessMessage();
                
            } catch (error) {
                this.hideLoadingIndicator();
                this.showErrorMessage(error.message);
            }
        }, 300);
    }

    showLoadingIndicator() {
        const loader = document.createElement('div');
        loader.id = 'code-loader';
        loader.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(102, 126, 234, 0.9);
                color: white;
                padding: 15px 25px;
                border-radius: 25px;
                display: flex;
                align-items: center;
                gap: 10px;
                backdrop-filter: blur(10px);
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                animation: pulse 1s infinite;
            ">
                <div style="
                    width: 20px;
                    height: 20px;
                    border: 2px solid white;
                    border-top: 2px solid transparent;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                <span>Running Code...</span>
            </div>
            <style>
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
            </style>
        `;
        loader.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 100;
        `;
        this.preview.parentNode.appendChild(loader);
    }

    hideLoadingIndicator() {
        const loader = document.getElementById('code-loader');
        if (loader) loader.remove();
    }

    showSuccessMessage() {
        this.showMessage('Code executed successfully! ✅', 'success');
    }

    showErrorMessage(error) {
        this.showMessage(`Error: ${error} ❌`, 'error');
    }

    showMessage(text, type) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 25px;
            color: white;
            font-weight: bold;
            z-index: 1001;
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        message.textContent = text;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            style.remove();
        }, 3000);
    }
}

// ===== THREE.JS BACKGROUND =====
class ThreeJSBackground {
    constructor() {
        this.canvas = document.getElementById('threejs-canvas');
        if (!this.canvas || !window.THREE) return;
        
        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        this.createGeometry();
        this.setupLights();
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    createGeometry() {
        this.geometries = [];
        
        // Create floating geometric shapes
        for (let i = 0; i < 15; i++) {
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
                transparent: true,
                opacity: 0.7
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            this.scene.add(mesh);
            this.geometries.push(mesh);
        }
        
        this.camera.position.z = 15;
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }

    onMouseMove(event) {
        if (!this.camera) return;
        
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        this.camera.position.x += (mouseX * 2 - this.camera.position.x) * 0.05;
        this.camera.position.y += (mouseY * 2 - this.camera.position.y) * 0.05;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.geometries.forEach((mesh, index) => {
            mesh.rotation.x += 0.01 + index * 0.002;
            mesh.rotation.y += 0.01 + index * 0.002;
            
            mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        });
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// ===== INTERACTIVE CURSOR =====
class InteractiveCursor {
    constructor() {
        if (window.innerWidth <= 768) return; // Disable on mobile
        
        this.cursor = document.getElementById('interactiveCursor');
        this.dot = this.cursor.querySelector('.cursor-dot');
        this.ring = this.cursor.querySelector('.cursor-ring');
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.dotX = 0;
        this.dotY = 0;
        this.ringX = 0;
        this.ringY = 0;
        
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .nav-link');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.ring.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.ring.classList.remove('hover'));
        });
        
        this.animate();
    }

    animate() {
        // Smooth follow effect
        this.dotX += (this.mouseX - this.dotX) * 0.8;
        this.dotY += (this.mouseY - this.dotY) * 0.8;
        
        this.ringX += (this.mouseX - this.ringX) * 0.15;
        this.ringY += (this.mouseY - this.ringY) * 0.15;
        
        this.dot.style.left = this.dotX + 'px';
        this.dot.style.top = this.dotY + 'px';
        
        this.ring.style.left = this.ringX + 'px';
        this.ring.style.top = this.ringY + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== ADVANCED PARTICLE SYSTEM =====
class AdvancedParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 15000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor(),
                trail: []
            });
        }
    }

    getRandomColor() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.5;
                particle.vy += (dy / distance) * force * 0.5;
            }

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Add to trail
            particle.trail.push({ x: particle.x, y: particle.y });
            if (particle.trail.length > 10) {
                particle.trail.shift();
            }

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -0.8;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -0.8;

            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));

            // Apply friction
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            // Draw trail
            this.ctx.beginPath();
            particle.trail.forEach((point, i) => {
                if (i === 0) {
                    this.ctx.moveTo(point.x, point.y);
                } else {
                    this.ctx.lineTo(point.x, point.y);
                }
            });
            this.ctx.strokeStyle = particle.color + '40';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
            this.ctx.fill();

            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = particle.color + Math.floor((1 - distance / 150) * 50).toString(16).padStart(2, '0');
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ===== SOUND VISUALIZER =====
class SoundVisualizer {
    constructor() {
        this.toggle = document.getElementById('visualizerToggle');
        this.canvas = document.getElementById('visualizer-canvas');
        if (!this.toggle || !this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.isActive = false;
        
        this.init();
    }

    init() {
        this.canvas.width = 200;
        this.canvas.height = 100;
        
        this.toggle.addEventListener('click', () => this.toggleVisualizer());
        
        // Create fake audio data for demo
        this.createFakeAudioData();
        this.animate();
    }

    toggleVisualizer() {
        this.isActive = !this.isActive;
        this.canvas.classList.toggle('active', this.isActive);
        
        if (this.isActive) {
            this.toggle.innerHTML = '<i class="fas fa-pause"></i>';
            this.toggle.style.background = 'linear-gradient(45deg, #10b981, #3b82f6)';
        } else {
            this.toggle.innerHTML = '<i class="fas fa-music"></i>';
            this.toggle.style.background = 'linear-gradient(45deg, #ff6b6b, #feca57)';
        }
    }

    createFakeAudioData() {
        // Create fake frequency data for visualization
        this.fakeData = new Array(32).fill(0).map(() => Math.random() * 255);
    }

    animate() {
        if (this.isActive) {
            // Update fake data
            this.fakeData = this.fakeData.map(value => {
                return Math.max(0, value + (Math.random() - 0.5) * 50);
            });
            
            // Clear canvas
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Draw bars
            const barWidth = this.canvas.width / this.fakeData.length;
            
            this.fakeData.forEach((value, index) => {
                const barHeight = (value / 255) * this.canvas.height;
                const x = index * barWidth;
                const y = this.canvas.height - barHeight;
                
                // Create gradient
                const gradient = this.ctx.createLinearGradient(0, y, 0, this.canvas.height);
                gradient.addColorStop(0, '#667eea');
                gradient.addColorStop(1, '#764ba2');
                
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(x, y, barWidth - 2, barHeight);
                
                // Add glow effect
                this.ctx.shadowColor = '#667eea';
                this.ctx.shadowBlur = 10;
                this.ctx.fillRect(x, y, barWidth - 2, barHeight);
                this.ctx.shadowBlur = 0;
            });
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== MATRIX RAIN EFFECT =====
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.chars = 'أحمدأشرفAHMEDAshraf01010101';
        this.charArray = this.chars.split('');
        this.drops = [];
        
        this.init();
    }

    init() {
        this.resize();
        this.createDrops();
        this.animate();
        
        window.addEventListener('resize', () => {
            this.resize();
            this.createDrops();
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
    }

    createDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }
    }

    animate() {
        // Semi-transparent black to create trailing effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Green text
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(char, x, y);
            
            // Reset drop randomly
            if (y > this.canvas.height && Math.random() > 0.99) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== FLOATING TECH ICONS =====
class FloatingTechIcons {
    constructor() {
        this.container = document.getElementById('floatingIcons');
        this.icons = document.querySelectorAll('.tech-icon');
        if (!this.container || this.icons.length === 0) return;
        
        this.init();
    }

    init() {
        this.icons.forEach((icon, index) => {
            // Add click interaction
            icon.addEventListener('click', () => this.iconClick(icon, index));
            
            // Add random animation delays
            icon.style.animationDelay = `${index * -2}s`;
            
            // Add hover effects
            icon.addEventListener('mouseenter', () => this.iconHover(icon));
            icon.addEventListener('mouseleave', () => this.iconLeave(icon));
        });
        
        // Add periodic repositioning
        setInterval(() => this.repositionIcons(), 10000);
    }

    iconClick(icon, index) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: iconRipple 0.8s ease-out;
            pointer-events: none;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes iconRipple {
                to { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        icon.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
            style.remove();
        }, 800);
        
        // Show tech info
        this.showTechInfo(icon.dataset.tech);
    }

    iconHover(icon) {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.boxShadow = '0 15px 40px rgba(0,0,0,0.5)';
    }

    iconLeave(icon) {
        icon.style.transform = '';
        icon.style.boxShadow = '';
    }

    showTechInfo(tech) {
        const techInfo = {
            angular: 'Angular - Frontend Framework للتطبيقات المتقدمة',
            react: 'React - مكتبة JavaScript للواجهات التفاعلية',
            vue: 'Vue.js - إطار عمل تدريجي للواجهات',
            js: 'JavaScript - لغة البرمجة الأساسية للويب',
            node: 'Node.js - بيئة تشغيل JavaScript',
            python: 'Python - لغة برمجة قوية للذكاء الاصطناعي'
        };
        
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            font-size: 1.1rem;
            font-weight: 600;
            z-index: 10000;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            animation: fadeInScale 0.3s ease;
        `;
        
        message.textContent = techInfo[tech] || 'تقنية متقدمة';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInScale {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            style.remove();
        }, 2000);
    }

    repositionIcons() {
        this.icons.forEach((icon, index) => {
            const newTop = Math.random() * 80 + 10 + '%';
            const newLeft = Math.random() * 80 + 10 + '%';
            const newRight = Math.random() * 80 + 10 + '%';
            
            icon.style.transition = 'all 3s ease-in-out';
            
            if (index % 2 === 0) {
                icon.style.top = newTop;
                icon.style.left = newLeft;
                icon.style.right = 'auto';
            } else {
                icon.style.top = newTop;
                icon.style.right = newRight;
                icon.style.left = 'auto';
            }
        });
    }
}

// ===== LIGHT GRAPHICS =====
class LightGraphics {
    constructor() {
        this.init();
    }

    init() {
        this.addMouseInteraction();
        this.addScrollEffects();
        this.createRandomShapes();
    }

    addMouseInteraction() {
        document.addEventListener('mousemove', (e) => {
            this.createMouseTrail(e.clientX, e.clientY);
        });
    }

    createMouseTrail(x, y) {
        if (Math.random() > 0.95) { // Only 5% chance to avoid lag
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                top: ${y}px;
                left: ${x}px;
                width: 6px;
                height: 6px;
                background: linear-gradient(45deg, #8a2be2, #ff1493);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: fadeTrail 1s ease-out forwards;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeTrail {
                    0% { opacity: 0.8; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0.2); }
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.remove();
                style.remove();
            }, 1000);
        }
    }

    addScrollEffects() {
        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            
            // Update shapes position based on scroll
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                shape.style.transform = `translateY(${scrollPercent * 100 * speed}px) rotate(${scrollPercent * 360}deg)`;
            });
            
            // Update glow effects
            const glows = document.querySelectorAll('.glow');
            glows.forEach((glow, index) => {
                const opacity = 0.2 + scrollPercent * 0.4;
                glow.style.opacity = opacity;
            });
        });
    }

    createRandomShapes() {
        setInterval(() => {
            if (Math.random() > 0.98) { // Very rare random shapes
                this.createTemporaryShape();
            }
        }, 5000);
    }

    createTemporaryShape() {
        const shape = document.createElement('div');
        const colors = [
            'rgba(138, 43, 226, 0.4)',
            'rgba(0, 255, 255, 0.4)',
            'rgba(255, 215, 0, 0.4)',
            'rgba(50, 205, 50, 0.4)',
            'rgba(255, 69, 0, 0.4)'
        ];
        
        const size = Math.random() * 50 + 20;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shape.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${x}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: temporaryShape 8s ease-out forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes temporaryShape {
                0% { 
                    opacity: 0; 
                    transform: scale(0) rotate(0deg); 
                }
                20% { 
                    opacity: 1; 
                    transform: scale(1) rotate(90deg); 
                }
                80% { 
                    opacity: 1; 
                    transform: scale(1.2) rotate(270deg); 
                }
                100% { 
                    opacity: 0; 
                    transform: scale(0) rotate(360deg); 
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(shape);
        
        setTimeout(() => {
            shape.remove();
            style.remove();
        }, 8000);
    }
}