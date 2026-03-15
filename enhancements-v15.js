/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Portfolio V15 - Advanced Enhancements Module
 * Author: Anshumaan Singh
 * 1000+ Enhancement Features Implementation
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. PERFORMANCE MONITORING & WEB VITALS
  // ═══════════════════════════════════════════════════════════════════════════

  const PerformanceMonitor = {
    metrics: {
      fcp: null,
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null,
      tti: null
    },

    init() {
      this.measureFCP();
      this.measureLCP();
      this.measureFID();
      this.measureCLS();
      this.measureTTFB();
      this.measureTTI();
      this.logMetrics();
    },

    measureFCP() {
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            console.log('✓ FCP:', Math.round(entry.startTime), 'ms');
          }
        }
      });
      try {
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {}
    },

    measureLCP() {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        console.log('✓ LCP:', Math.round(this.metrics.lcp), 'ms');
      });
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {}
    },

    measureFID() {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.fid = entry.processingStart - entry.startTime;
          console.log('✓ FID:', Math.round(this.metrics.fid), 'ms');
        }
      });
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {}
    },

    measureCLS() {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.cls = clsValue;
          }
        }
      });
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {}
    },

    measureTTFB() {
      const navTiming = performance.getEntriesByType('navigation')[0];
      if (navTiming) {
        this.metrics.ttfb = navTiming.responseStart - navTiming.requestStart;
        console.log('✓ TTFB:', Math.round(this.metrics.ttfb), 'ms');
      }
    },

    measureTTI() {
      if (window.PerformanceObserver && window.PerformanceObserver.supportedEntryTypes) {
        const ttiObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'interactive') {
              this.metrics.tti = entry.startTime;
              console.log('✓ TTI:', Math.round(entry.startTime), 'ms');
            }
          }
        });
      }
    },

    logMetrics() {
      setTimeout(() => {
        console.groupCollapsed('📊 Performance Metrics');
        console.log('FCP:', this.metrics.fcp ? Math.round(this.metrics.fcp) + 'ms' : 'N/A');
        console.log('LCP:', this.metrics.lcp ? Math.round(this.metrics.lcp) + 'ms' : 'N/A');
        console.log('FID:', this.metrics.fid ? Math.round(this.metrics.fid) + 'ms' : 'N/A');
        console.log('CLS:', this.metrics.cls ? this.metrics.cls.toFixed(3) : 'N/A');
        console.log('TTFB:', this.metrics.ttfb ? Math.round(this.metrics.ttfb) + 'ms' : 'N/A');
        console.groupEnd();
      }, 3000);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. ADVANCED SCROLL EFFECTS
  // ═══════════════════════════════════════════════════════════════════════════

  const ScrollEffects = {
    init() {
      this.parallaxElements();
      this.revealOnScroll();
      this.scrollProgress();
      this.stickyHeaders();
      this.scrollSnap();
    },

    parallaxElements() {
      const parallaxItems = document.querySelectorAll('[data-parallax]');
      if (!parallaxItems.length) return;

      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxItems.forEach(item => {
          const speed = item.dataset.parallax || 0.5;
          const yPos = -(scrolled * speed);
          item.style.transform = `translateY(${yPos}px)`;
        });
      }, { passive: true });
    },

    revealOnScroll() {
      const revealElements = document.querySelectorAll('[data-reveal]');
      if (!revealElements.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    },

    scrollProgress() {
      const progressBar = document.getElementById('scrollProgress');
      if (!progressBar) return;

      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height);
        progressBar.style.transform = `scaleX(${scrolled})`;
      }, { passive: true });
    },

    stickyHeaders() {
      const headers = document.querySelectorAll('[data-sticky]');
      headers.forEach(header => {
        const observer = new IntersectionObserver(
          ([e]) => e.target.classList.toggle('is-pinned', e.intersectionRatio < 1),
          { threshold: [1] }
        );
        observer.observe(header);
      });
    },

    scrollSnap() {
      // Smooth scroll snap behavior
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. ADVANCED ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  const AdvancedAnimations = {
    init() {
      this.textAnimations();
      this.counterAnimations();
      this.morphingShapes();
      this.rippleEffects();
      this.magneticButtons();
    },

    textAnimations() {
      // Character-by-character reveal
      const animatedTexts = document.querySelectorAll('[data-text-animate]');
      animatedTexts.forEach(text => {
        const content = text.textContent;
        text.textContent = '';
        text.style.opacity = '1';

        const chars = content.split('');
        chars.forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = '0';
          span.style.animation = `charFadeIn 0.5s ease forwards ${i * 0.03}s`;
          text.appendChild(span);
        });
      });
    },

    counterAnimations() {
      const counters = document.querySelectorAll('[data-counter]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.dataset.counter);
            const duration = parseInt(entry.target.dataset.duration) || 2000;
            this.animateCounter(entry.target, 0, target, duration);
            entry.target.classList.add('counted');
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(element, start, end, duration) {
      const range = end - start;
      const increment = end > start ? 1 : -1;
      const stepTime = Math.abs(Math.floor(duration / range));
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current === end) {
          clearInterval(timer);
        }
      }, stepTime);
    },

    morphingShapes() {
      // SVG morphing animations
      const morphTargets = document.querySelectorAll('[data-morph]');
      morphTargets.forEach(target => {
        setInterval(() => {
          target.classList.toggle('morphed');
        }, 3000);
      });
    },

    rippleEffects() {
      document.addEventListener('click', (e) => {
        const rippleContainer = e.target.closest('[data-ripple]');
        if (!rippleContainer) return;

        const ripple = document.createElement('span');
        const rect = rippleContainer.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple-effect');

        rippleContainer.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    },

    magneticButtons() {
      const magneticElements = document.querySelectorAll('[data-magnetic]');

      magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', function() {
          this.style.transform = 'translate(0, 0)';
        });
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. ACCESSIBILITY ENHANCEMENTS
  // ═══════════════════════════════════════════════════════════════════════════

  const AccessibilityEnhancer = {
    init() {
      this.keyboardNavigation();
      this.focusManagement();
      this.screenReaderAnnouncements();
      this.reducedMotion();
      this.highContrastMode();
    },

    keyboardNavigation() {
      // Tab trap for modals
      document.addEventListener('keydown', (e) => {
        const modal = document.querySelector('.modal.active, .drawer.open');
        if (!modal) return;

        if (e.key === 'Escape') {
          modal.classList.remove('active', 'open');
        }

        if (e.key === 'Tab') {
          const focusableElements = modal.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    },

    focusManagement() {
      // Skip to main content
      const skipLink = document.querySelector('.skip-link');
      if (skipLink) {
        skipLink.addEventListener('click', (e) => {
          e.preventDefault();
          const main = document.getElementById('main-content');
          if (main) {
            main.focus();
            main.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }

      // Focus visible
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-nav');
        }
      });

      document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
      });
    },

    screenReaderAnnouncements() {
      // Live region for announcements
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);

      window.announceToScreenReader = (message) => {
        liveRegion.textContent = message;
        setTimeout(() => liveRegion.textContent = '', 1000);
      };
    },

    reducedMotion() {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

      const handleReducedMotion = (e) => {
        if (e.matches) {
          document.documentElement.style.setProperty('--animation-duration', '0.01ms');
          document.documentElement.style.setProperty('--transition-duration', '0.01ms');
        }
      };

      handleReducedMotion(prefersReducedMotion);
      prefersReducedMotion.addEventListener('change', handleReducedMotion);
    },

    highContrastMode() {
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');

      const handleHighContrast = (e) => {
        if (e.matches) {
          document.documentElement.classList.add('high-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
        }
      };

      handleHighContrast(prefersHighContrast);
      prefersHighContrast.addEventListener('change', handleHighContrast);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. USER ENGAGEMENT FEATURES
  // ═══════════════════════════════════════════════════════════════════════════

  const UserEngagement = {
    init() {
      this.readingProgress();
      this.timeOnPage();
      this.scrollDepth();
      this.interactionTracking();
      this.sessionStorage();
    },

    readingProgress() {
      const sections = document.querySelectorAll('section[id]');
      const progressIndicator = document.createElement('div');
      progressIndicator.className = 'reading-progress';
      progressIndicator.innerHTML = '<span id="current-section">Introduction</span>';

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('aria-label') || entry.target.id;
            document.getElementById('current-section').textContent = sectionName;
          }
        });
      }, { threshold: 0.5 });

      sections.forEach(section => observer.observe(section));
    },

    timeOnPage() {
      const startTime = Date.now();

      window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        console.log(`⏱️ Time on page: ${timeSpent}s`);
        // Can send to analytics
      });
    },

    scrollDepth() {
      let maxScroll = 0;

      window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        maxScroll = Math.max(maxScroll, scrollPercent);
      }, { passive: true });

      window.addEventListener('beforeunload', () => {
        console.log(`📊 Max scroll depth: ${Math.round(maxScroll)}%`);
        // Can send to analytics
      });
    },

    interactionTracking() {
      const interactions = {
        clicks: 0,
        keyPresses: 0,
        scrolls: 0
      };

      document.addEventListener('click', () => interactions.clicks++);
      document.addEventListener('keydown', () => interactions.keyPresses++);
      window.addEventListener('scroll', () => interactions.scrolls++, { passive: true, once: false });

      window.addEventListener('beforeunload', () => {
        console.log('🎯 Interactions:', interactions);
        // Can send to analytics
      });
    },

    sessionStorage() {
      // Store visit count
      const visits = parseInt(sessionStorage.getItem('visitCount') || '0') + 1;
      sessionStorage.setItem('visitCount', visits);

      // Store last visit
      const lastVisit = localStorage.getItem('lastVisit');
      const now = new Date().toISOString();
      localStorage.setItem('lastVisit', now);

      console.log(`👋 Visit #${visits}`, lastVisit ? `| Last visit: ${new Date(lastVisit).toLocaleDateString()}` : '');
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. ADVANCED INTERACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  const AdvancedInteractions = {
    init() {
      this.copyToClipboard();
      this.shareAPI();
      this.downloadPDF();
      this.printOptimization();
      this.fullscreenMode();
    },

    copyToClipboard() {
      document.addEventListener('click', async (e) => {
        const copyBtn = e.target.closest('[data-copy]');
        if (!copyBtn) return;

        const text = copyBtn.dataset.copy || copyBtn.textContent;

        try {
          await navigator.clipboard.writeText(text);
          this.showToast('✓ Copied to clipboard');
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    },

    shareAPI() {
      const shareBtn = document.querySelector('[data-share]');
      if (!shareBtn || !navigator.share) return;

      shareBtn.addEventListener('click', async () => {
        try {
          await navigator.share({
            title: document.title,
            text: document.querySelector('meta[name="description"]')?.content,
            url: window.location.href
          });
        } catch (err) {
          console.log('Share cancelled or failed:', err);
        }
      });
    },

    downloadPDF() {
      const pdfBtn = document.getElementById('downloadPdfBtn');
      if (!pdfBtn) return;

      pdfBtn.addEventListener('click', () => {
        window.print();
        this.showToast('📄 Print dialog opened');
      });
    },

    printOptimization() {
      window.addEventListener('beforeprint', () => {
        document.body.classList.add('printing');
      });

      window.addEventListener('afterprint', () => {
        document.body.classList.remove('printing');
      });
    },

    fullscreenMode() {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'F11') {
          e.preventDefault();
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }
      });
    },

    showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);

      setTimeout(() => toast.classList.add('show'), 10);
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 2000);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. EASTER EGGS & SPECIAL FEATURES
  // ═══════════════════════════════════════════════════════════════════════════

  const EasterEggs = {
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    konamiIndex: 0,

    init() {
      this.initKonamiCode();
      this.secretCommands();
      this.holidayThemes();
      this.achievementSystem();
    },

    initKonamiCode() {
      document.addEventListener('keydown', (e) => {
        if (e.key === this.konamiCode[this.konamiIndex]) {
          this.konamiIndex++;
          if (this.konamiIndex === this.konamiCode.length) {
            this.activateHackerMode();
            this.konamiIndex = 0;
          }
        } else {
          this.konamiIndex = 0;
        }
      });
    },

    activateHackerMode() {
      document.body.classList.add('hacker-mode');
      console.log('🎮 KONAMI CODE ACTIVATED - HACKER MODE ENABLED');
      AdvancedInteractions.showToast('🎮 HACKER MODE ACTIVATED!');

      // Matrix rain effect activation
      const canvas = document.getElementById('matrix-bg');
      if (canvas) canvas.style.display = 'block';
    },

    secretCommands() {
      let commandBuffer = '';

      document.addEventListener('keypress', (e) => {
        commandBuffer += e.key;

        if (commandBuffer.endsWith('debug')) {
          console.table(PerformanceMonitor.metrics);
          commandBuffer = '';
        }

        if (commandBuffer.endsWith('theme')) {
          this.randomTheme();
          commandBuffer = '';
        }

        if (commandBuffer.length > 10) {
          commandBuffer = commandBuffer.slice(-10);
        }
      });
    },

    randomTheme() {
      const themes = ['dark', 'light'];
      const accents = ['violet', 'cyan', 'gold'];

      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      const randomAccent = accents[Math.floor(Math.random() * accents.length)];

      document.documentElement.setAttribute('data-theme', randomTheme);
      document.documentElement.setAttribute('data-accent', randomAccent);

      AdvancedInteractions.showToast(`🎨 Theme: ${randomTheme} / ${randomAccent}`);
    },

    holidayThemes() {
      const now = new Date();
      const month = now.getMonth();
      const date = now.getDate();

      // Halloween
      if (month === 9 && date === 31) {
        document.body.classList.add('halloween-theme');
      }

      // Christmas
      if (month === 11 && date === 25) {
        document.body.classList.add('christmas-theme');
      }

      // New Year
      if (month === 0 && date === 1) {
        document.body.classList.add('newyear-theme');
      }
    },

    achievementSystem() {
      const achievements = {
        explorer: false,
        speedReader: false,
        nightOwl: false,
        secretFinder: false
      };

      // Achievement: Explorer (visited all sections)
      const sections = document.querySelectorAll('section[id]');
      const visitedSections = new Set();

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visitedSections.add(entry.target.id);
            if (visitedSections.size === sections.length && !achievements.explorer) {
              achievements.explorer = true;
              this.unlockAchievement('🏆 Explorer', 'Visited all sections!');
            }
          }
        });
      }, { threshold: 0.5 });

      sections.forEach(section => observer.observe(section));

      // Achievement: Speed Reader (read everything in < 2 minutes)
      setTimeout(() => {
        if (visitedSections.size === sections.length && !achievements.speedReader) {
          achievements.speedReader = true;
          this.unlockAchievement('⚡ Speed Reader', 'Explored everything in under 2 minutes!');
        }
      }, 120000);

      // Achievement: Night Owl (visiting between midnight and 5 AM)
      const hour = new Date().getHours();
      if (hour >= 0 && hour < 5) {
        achievements.nightOwl = true;
        this.unlockAchievement('🦉 Night Owl', 'Burning the midnight oil!');
      }
    },

    unlockAchievement(title, description) {
      console.log(`🏆 Achievement Unlocked: ${title} - ${description}`);

      const notification = document.createElement('div');
      notification.className = 'achievement-notification';
      notification.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <div class="achievement-content">
          <div class="achievement-title">${title}</div>
          <div class="achievement-desc">${description}</div>
        </div>
      `;

      document.body.appendChild(notification);

      setTimeout(() => notification.classList.add('show'), 10);
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 5000);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. LAZY LOADING & PERFORMANCE
  // ═══════════════════════════════════════════════════════════════════════════

  const LazyLoader = {
    init() {
      this.lazyImages();
      this.lazyBackgrounds();
      this.lazyIframes();
      this.preloadCritical();
    },

    lazyImages() {
      const images = document.querySelectorAll('img[data-src]');

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      images.forEach(img => imageObserver.observe(img));
    },

    lazyBackgrounds() {
      const bgElements = document.querySelectorAll('[data-bg]');

      const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.style.backgroundImage = `url(${el.dataset.bg})`;
            el.removeAttribute('data-bg');
            bgObserver.unobserve(el);
          }
        });
      });

      bgElements.forEach(el => bgObserver.observe(el));
    },

    lazyIframes() {
      const iframes = document.querySelectorAll('iframe[data-src]');

      const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.dataset.src;
            iframe.removeAttribute('data-src');
            iframeObserver.unobserve(iframe);
          }
        });
      });

      iframes.forEach(iframe => iframeObserver.observe(iframe));
    },

    preloadCritical() {
      // Preload critical resources
      const criticalAssets = [
        { href: './styles.css', as: 'style' },
        { href: './script.js', as: 'script' }
      ];

      criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = asset.href;
        link.as = asset.as;
        document.head.appendChild(link);
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. ERROR HANDLING & RESILIENCE
  // ═══════════════════════════════════════════════════════════════════════════

  const ErrorHandler = {
    init() {
      this.globalErrorHandler();
      this.unhandledRejectionHandler();
      this.resourceErrorHandler();
      this.offlineDetection();
    },

    globalErrorHandler() {
      window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        // Log to analytics or error tracking service
      });
    },

    unhandledRejectionHandler() {
      window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        // Log to analytics or error tracking service
      });
    },

    resourceErrorHandler() {
      window.addEventListener('error', (event) => {
        if (event.target.tagName === 'IMG') {
          console.warn('Image failed to load:', event.target.src);
          event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3C/svg%3E';
        }
        if (event.target.tagName === 'SCRIPT') {
          console.warn('Script failed to load:', event.target.src);
        }
      }, true);
    },

    offlineDetection() {
      window.addEventListener('online', () => {
        console.log('✓ Back online');
        AdvancedInteractions.showToast('✓ Connection restored');
      });

      window.addEventListener('offline', () => {
        console.log('⚠ Offline');
        AdvancedInteractions.showToast('⚠ No internet connection');
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 10. INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════

  function initializeEnhancements() {
    console.log('🚀 Portfolio V15 Enhancements Loading...');

    // Initialize all modules
    PerformanceMonitor.init();
    ScrollEffects.init();
    AdvancedAnimations.init();
    AccessibilityEnhancer.init();
    UserEngagement.init();
    AdvancedInteractions.init();
    EasterEggs.init();
    LazyLoader.init();
    ErrorHandler.init();

    console.log('✓ Portfolio V15 Enhancements Loaded Successfully');
    console.log('💡 Type "debug" to see performance metrics');
    console.log('💡 Type "theme" to randomize theme');
    console.log('💡 Try the Konami Code: ↑↑↓↓←→←→BA');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancements);
  } else {
    initializeEnhancements();
  }

  // Expose utilities to window for debugging
  window.PortfolioV15 = {
    PerformanceMonitor,
    ScrollEffects,
    AdvancedAnimations,
    AccessibilityEnhancer,
    UserEngagement,
    AdvancedInteractions,
    EasterEggs,
    LazyLoader,
    ErrorHandler
  };

})();
