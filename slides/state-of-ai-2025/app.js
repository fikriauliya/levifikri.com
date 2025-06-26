// Slide Navigation System
class SlidePresentation {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.totalSlides = this.slides.length;
        this.navHintShown = true;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    showSlide(index) {
        // Remove all classes from slides
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i < index) slide.classList.add('prev');
            if (i === index) slide.classList.add('active');
        });

        // Update indicators
        this.indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        this.currentSlide = index;
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.showSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }

    hideNavHint() {
        if (this.navHintShown) {
            const navHint = document.querySelector('.nav-hint');
            if (navHint) {
                navHint.style.display = 'none';
            }
            this.navHintShown = false;
        }
    }

    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextSlide();
                this.hideNavHint();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
                this.hideNavHint();
            }
        });

        // Touch navigation
        this.setupTouchNavigation();

        // Click on indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.showSlide(index);
                this.hideNavHint();
            });
        });
    }

    setupTouchNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        
        if (endX < startX - swipeThreshold) {
            this.nextSlide();
            this.hideNavHint();
        }
        if (endX > startX + swipeThreshold) {
            this.prevSlide();
            this.hideNavHint();
        }
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SlidePresentation();
});