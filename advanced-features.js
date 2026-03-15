/* ============================================================
   Anshumaan Singh Portfolio — Advanced Features
   Enhanced interactivity, animations, and utilities
   Author: Anshumaan Singh | www.devsecopswithanshu.com
   ============================================================ */

"use strict";

/* ═══════════════════════════════════════════════════════════
   SECTION 1: ADVANCED PARTICLE SYSTEM
   ═══════════════════════════════════════════════════════════ */

class AdvancedParticleSystem {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };

    this.options = {
      particleCount: options.particleCount || 100,
      connectionDistance: options.connectionDistance || 150,
      particleSpeed: options.particleSpeed || 0.5,
      particleSize: options.particleSize || 2,
      particleColor: options.particleColor || 'rgba(139, 92, 246, 0.8)',
      lineColor: options.lineColor || 'rgba(139, 92, 246, 0.2)',
      interactive: options.interactive !== false,
      ...options
    };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.setupListeners();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setupListeners() {
    window.addEventListener('resize', () => this.resize());

    if (this.options.interactive) {
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      });

      window.addEventListener('mouseout', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }
  }

  createParticles() {
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push(new Particle(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        (Math.random() - 0.5) * this.options.particleSpeed,
        (Math.random() - 0.5) * this.options.particleSpeed,
        this.options.particleSize,
        this.options.particleColor
      ));
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle, i) => {
      particle.update(this.canvas, this.mouse);
      particle.draw(this.ctx);

      // Connect nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[j].x - particle.x;
        const dy = this.particles[j].y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.options.connectionDistance) {
          const opacity = 1 - distance / this.options.connectionDistance;
          this.ctx.strokeStyle = this.options.lineColor.replace(/[\d.]+\)$/g, `${opacity * 0.2})`);
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    });
  }
}

class Particle {
  constructor(x, y, vx, vy, size, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.color = color;
    this.baseSize = size;
  }

  update(canvas, mouse) {
    // Boundary check
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.vy = -this.vy;
    }

    // Mouse interaction
    if (mouse.x && mouse.y) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.vx -= Math.cos(angle) * force * 0.5;
        this.vy -= Math.sin(angle) * force * 0.5;
      }
    }

    // Apply velocity
    this.x += this.vx;
    this.y += this.vy;

    // Damping
    this.vx *= 0.99;
    this.vy *= 0.99;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2: 3D CARD TILT EFFECT
   ═══════════════════════════════════════════════════════════ */

class Card3DTilt {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      maxTilt: options.maxTilt || 15,
      perspective: options.perspective || 1000,
      scale: options.scale || 1.05,
      speed: options.speed || 400,
      glare: options.glare !== false,
      maxGlare: options.maxGlare || 0.3,
      ...options
    };

    this.init();
  }

  init() {
    this.element.style.transform = 'perspective(' + this.options.perspective + 'px)';
    this.element.style.transition = `all ${this.options.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;

    if (this.options.glare) {
      this.glareElement = document.createElement('div');
      this.glareElement.className = 'card-glare';
      this.glareElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        pointer-events: none;
        background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${this.options.maxGlare}) 100%);
        opacity: 0;
        transition: opacity ${this.options.speed}ms ease;
      `;
      this.element.appendChild(this.glareElement);
    }

    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener('mouseenter', () => this.onMouseEnter());
    this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.element.addEventListener('mouseleave', () => this.onMouseLeave());
  }

  onMouseEnter() {
    this.element.style.transform = `perspective(${this.options.perspective}px) scale(${this.options.scale})`;
    if (this.glareElement) {
      this.glareElement.style.opacity = '1';
    }
  }

  onMouseMove(e) {
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const tiltX = percentY * this.options.maxTilt;
    const tiltY = -percentX * this.options.maxTilt;

    this.element.style.transform = `
      perspective(${this.options.perspective}px)
      scale(${this.options.scale})
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
    `;

    if (this.glareElement) {
      const glareX = percentX * 100;
      const glareY = percentY * 100;
      this.glareElement.style.background = `
        radial-gradient(circle at ${50 + glareX}% ${50 + glareY}%,
        rgba(255,255,255,${this.options.maxGlare}) 0%,
        rgba(255,255,255,0) 80%)
      `;
    }
  }

  onMouseLeave() {
    this.element.style.transform = `perspective(${this.options.perspective}px) scale(1) rotateX(0) rotateY(0)`;
    if (this.glareElement) {
      this.glareElement.style.opacity = '0';
    }
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3: ADVANCED TEXT ANIMATIONS
   ═══════════════════════════════════════════════════════════ */

class TextAnimations {
  static typewriter(element, text, speed = 50, cursor = true) {
    let i = 0;
    element.textContent = '';

    if (cursor) {
      const cursorSpan = document.createElement('span');
      cursorSpan.className = 'typewriter-cursor';
      cursorSpan.textContent = '|';
      cursorSpan.style.cssText = 'animation: blink 0.7s infinite;';
      element.appendChild(cursorSpan);
    }

    const type = () => {
      if (i < text.length) {
        if (cursor) {
          element.childNodes[0]?.remove();
        }
        element.textContent += text.charAt(i);
        if (cursor) {
          const cursorSpan = document.createElement('span');
          cursorSpan.className = 'typewriter-cursor';
          cursorSpan.textContent = '|';
          cursorSpan.style.cssText = 'animation: blink 0.7s infinite;';
          element.appendChild(cursorSpan);
        }
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  static scramble(element, finalText, duration = 2000) {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const startTime = Date.now();
    const initialText = element.textContent;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        if (progress * finalText.length > i) {
          result += finalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      element.textContent = result;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = finalText;
      }
    };

    animate();
  }

  static wave(element) {
    const text = element.textContent;
    element.innerHTML = '';

    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.cssText = `
        display: inline-block;
        animation: wave 1s ease-in-out infinite;
        animation-delay: ${i * 0.05}s;
      `;
      element.appendChild(span);
    });

    // Add keyframes if not already present
    if (!document.querySelector('#wave-keyframes')) {
      const style = document.createElement('style');
      style.id = 'wave-keyframes';
      style.textContent = `
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  static glitch(element, iterations = 5) {
    const originalText = element.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let iteration = 0;

    const interval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= originalText.length) {
        clearInterval(interval);
        element.textContent = originalText;
      }

      iteration += 1 / 3;
    }, 30);
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4: ADVANCED SCROLL EFFECTS
   ═══════════════════════════════════════════════════════════ */

class ScrollEffects {
  static parallax(elements, speed = 0.5) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      elements.forEach(el => {
        if (typeof el === 'string') {
          el = document.querySelector(el);
        }
        if (el) {
          el.style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
    });
  }

  static fadeOnScroll(elements, options = {}) {
    const opts = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
      fadeIn: options.fadeIn !== false,
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        } else if (!opts.fadeIn) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';
        }
      });
    }, {
      threshold: opts.threshold,
      rootMargin: opts.rootMargin
    });

    elements.forEach(el => {
      if (typeof el === 'string') {
        el = document.querySelector(el);
      }
      if (el) {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
      }
    });
  }

  static progressBar(element, options = {}) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const opts = {
      color: options.color || '#8b5cf6',
      height: options.height || '3px',
      position: options.position || 'top',
      ...options
    };

    el.style.cssText = `
      position: fixed;
      ${opts.position}: 0;
      left: 0;
      width: 0%;
      height: ${opts.height};
      background: ${opts.color};
      z-index: 9999;
      transition: width 0.1s ease;
    `;

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      el.style.width = `${scrolled}%`;
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 5: INTERACTIVE CODE TERMINAL
   ═══════════════════════════════════════════════════════════ */

class InteractiveTerminal {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      prompt: options.prompt || '$ ',
      welcomeMessage: options.welcomeMessage || 'Welcome to Interactive Terminal',
      commands: options.commands || {},
      theme: options.theme || 'dark',
      ...options
    };

    this.history = [];
    this.historyIndex = -1;
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="terminal-output" id="${this.container.id}-output"></div>
      <div class="terminal-input-line">
        <span class="terminal-prompt">${this.options.prompt}</span>
        <input type="text" class="terminal-input" id="${this.container.id}-input" autocomplete="off" />
      </div>
    `;

    this.output = this.container.querySelector('.terminal-output');
    this.input = this.container.querySelector('.terminal-input');

    this.applyTheme();
    this.writeLine(this.options.welcomeMessage, 'info');
    this.writeLine('Type "help" for available commands.', 'info');
    this.setupListeners();
    this.input.focus();
  }

  applyTheme() {
    const themes = {
      dark: {
        bg: '#0a0e27',
        text: '#e2eeff',
        prompt: '#8b5cf6',
        success: '#a78bfa',
        error: '#ff5f57',
        info: '#8ba8cc'
      },
      light: {
        bg: '#f3f4f8',
        text: '#111827',
        prompt: '#7c3aed',
        success: '#8b5cf6',
        error: '#dc2626',
        info: '#6b7280'
      }
    };

    const theme = themes[this.options.theme] || themes.dark;

    this.container.style.cssText = `
      background: ${theme.bg};
      color: ${theme.text};
      padding: 20px;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      max-height: 500px;
      overflow-y: auto;
    `;

    this.container.querySelector('.terminal-prompt').style.color = theme.prompt;
    this.input.style.cssText = `
      background: transparent;
      border: none;
      color: ${theme.text};
      font-family: inherit;
      font-size: inherit;
      outline: none;
      flex: 1;
    `;
  }

  setupListeners() {
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = this.input.value.trim();
        if (command) {
          this.history.push(command);
          this.historyIndex = this.history.length;
          this.execute(command);
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });

    this.container.addEventListener('click', () => {
      this.input.focus();
    });
  }

  execute(command) {
    this.writeLine(`${this.options.prompt}${command}`, 'input');

    const [cmd, ...args] = command.split(' ');

    if (cmd === 'help') {
      this.showHelp();
    } else if (cmd === 'clear') {
      this.clear();
    } else if (this.options.commands[cmd]) {
      this.options.commands[cmd](args, this);
    } else {
      this.writeLine(`Command not found: ${cmd}`, 'error');
    }
  }

  writeLine(text, type = 'output') {
    const line = document.createElement('div');
    line.className = `terminal-line terminal-${type}`;
    line.textContent = text;

    const colors = {
      input: '#e2eeff',
      output: '#8ba8cc',
      success: '#a78bfa',
      error: '#ff5f57',
      info: '#8ba8cc'
    };

    line.style.color = colors[type] || colors.output;
    line.style.marginBottom = '4px';

    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  showHelp() {
    this.writeLine('Available commands:', 'info');
    this.writeLine('  help  - Show this help message', 'output');
    this.writeLine('  clear - Clear the terminal', 'output');
    Object.keys(this.options.commands).forEach(cmd => {
      this.writeLine(`  ${cmd}  - ${this.options.commands[cmd].description || 'No description'}`, 'output');
    });
  }

  clear() {
    this.output.innerHTML = '';
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 6: ADVANCED FORM VALIDATION
   ═══════════════════════════════════════════════════════════ */

class FormValidator {
  constructor(formId, rules, options = {}) {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.rules = rules;
    this.options = {
      validateOnBlur: options.validateOnBlur !== false,
      validateOnInput: options.validateOnInput || false,
      showErrors: options.showErrors !== false,
      errorClass: options.errorClass || 'error',
      successClass: options.successClass || 'success',
      ...options
    };

    this.errors = {};
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    if (this.options.validateOnBlur || this.options.validateOnInput) {
      Object.keys(this.rules).forEach(fieldName => {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        if (this.options.validateOnBlur) {
          field.addEventListener('blur', () => this.validateField(fieldName));
        }

        if (this.options.validateOnInput) {
          field.addEventListener('input', () => this.validateField(fieldName));
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validate()) {
      if (this.options.onSuccess) {
        this.options.onSuccess(this.getFormData());
      }
    } else {
      if (this.options.onError) {
        this.options.onError(this.errors);
      }
    }
  }

  validate() {
    this.errors = {};
    let isValid = true;

    Object.keys(this.rules).forEach(fieldName => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(fieldName) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (!field) return true;

    const value = field.value;
    const rules = this.rules[fieldName];
    let isValid = true;

    // Required validation
    if (rules.required && !value.trim()) {
      this.setError(fieldName, field, rules.messages?.required || 'This field is required');
      isValid = false;
    }

    // Min length validation
    else if (rules.minLength && value.length < rules.minLength) {
      this.setError(fieldName, field, rules.messages?.minLength || `Minimum ${rules.minLength} characters required`);
      isValid = false;
    }

    // Max length validation
    else if (rules.maxLength && value.length > rules.maxLength) {
      this.setError(fieldName, field, rules.messages?.maxLength || `Maximum ${rules.maxLength} characters allowed`);
      isValid = false;
    }

    // Email validation
    else if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      this.setError(fieldName, field, rules.messages?.email || 'Invalid email address');
      isValid = false;
    }

    // Pattern validation
    else if (rules.pattern && !rules.pattern.test(value)) {
      this.setError(fieldName, field, rules.messages?.pattern || 'Invalid format');
      isValid = false;
    }

    // Custom validation
    else if (rules.custom && !rules.custom(value)) {
      this.setError(fieldName, field, rules.messages?.custom || 'Invalid value');
      isValid = false;
    }

    // All validations passed
    else {
      this.clearError(fieldName, field);
    }

    return isValid;
  }

  setError(fieldName, field, message) {
    this.errors[fieldName] = message;

    if (this.options.showErrors) {
      field.classList.add(this.options.errorClass);
      field.classList.remove(this.options.successClass);

      let errorEl = field.parentElement.querySelector('.field-error');
      if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        errorEl.style.cssText = 'color: #ff5f57; font-size: 12px; margin-top: 4px;';
        field.parentElement.appendChild(errorEl);
      }
      errorEl.textContent = message;
    }
  }

  clearError(fieldName, field) {
    delete this.errors[fieldName];

    if (this.options.showErrors) {
      field.classList.remove(this.options.errorClass);
      field.classList.add(this.options.successClass);

      const errorEl = field.parentElement.querySelector('.field-error');
      if (errorEl) {
        errorEl.remove();
      }
    }
  }

  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 7: NOTIFICATION SYSTEM
   ═══════════════════════════════════════════════════════════ */

class NotificationSystem {
  constructor(options = {}) {
    this.options = {
      position: options.position || 'top-right',
      duration: options.duration || 3000,
      maxNotifications: options.maxNotifications || 5,
      ...options
    };

    this.notifications = [];
    this.container = null;
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'notification-container';

    const positions = {
      'top-right': 'top: 20px; right: 20px;',
      'top-left': 'top: 20px; left: 20px;',
      'bottom-right': 'bottom: 20px; right: 20px;',
      'bottom-left': 'bottom: 20px; left: 20px;',
      'top-center': 'top: 20px; left: 50%; transform: translateX(-50%);',
      'bottom-center': 'bottom: 20px; left: 50%; transform: translateX(-50%);'
    };

    this.container.style.cssText = `
      position: fixed;
      ${positions[this.options.position] || positions['top-right']}
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    `;

    document.body.appendChild(this.container);
  }

  show(message, type = 'info', duration) {
    const notification = this.createNotification(message, type);

    // Remove oldest if max reached
    if (this.notifications.length >= this.options.maxNotifications) {
      this.remove(this.notifications[0]);
    }

    this.notifications.push(notification);
    this.container.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove
    const autoRemoveDelay = duration || this.options.duration;
    if (autoRemoveDelay > 0) {
      setTimeout(() => this.remove(notification), autoRemoveDelay);
    }

    return notification;
  }

  createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const colors = {
      success: { bg: 'rgba(139, 92, 246, 0.1)', border: '#a78bfa', icon: '✓' },
      error: { bg: 'rgba(255, 95, 87, 0.1)', border: '#ff5f57', icon: '✕' },
      warning: { bg: 'rgba(255, 189, 46, 0.1)', border: '#ffbd2e', icon: '⚠' },
      info: { bg: 'rgba(74, 158, 255, 0.1)', border: '#4a9eff', icon: 'ℹ' }
    };

    const color = colors[type] || colors.info;

    notification.style.cssText = `
      background: ${color.bg};
      border-left: 3px solid ${color.border};
      color: #e2eeff;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      gap: 12px;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      cursor: pointer;
    `;

    notification.innerHTML = `
      <span style="font-size: 20px;">${color.icon}</span>
      <span style="flex: 1;">${message}</span>
      <button style="
        background: none;
        border: none;
        color: #e2eeff;
        cursor: pointer;
        font-size: 18px;
        opacity: 0.6;
        transition: opacity 0.2s;
      " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'">×</button>
    `;

    // Close button
    notification.querySelector('button').addEventListener('click', (e) => {
      e.stopPropagation();
      this.remove(notification);
    });

    // Click to dismiss
    notification.addEventListener('click', () => this.remove(notification));

    return notification;
  }

  remove(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';

    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
      const index = this.notifications.indexOf(notification);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    }, 300);
  }

  success(message, duration) {
    return this.show(message, 'success', duration);
  }

  error(message, duration) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration) {
    return this.show(message, 'info', duration);
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 8: MODAL SYSTEM
   ═══════════════════════════════════════════════════════════ */

class ModalSystem {
  constructor(options = {}) {
    this.options = {
      closeOnBackdrop: options.closeOnBackdrop !== false,
      closeOnEscape: options.closeOnEscape !== false,
      animation: options.animation || 'fade',
      ...options
    };

    this.modals = new Map();
    this.activeModal = null;
  }

  create(id, content, options = {}) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = id;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    modal.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    `;

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
      position: relative;
      background: #0f1433;
      border: 1px solid rgba(139, 92, 246, 0.3);
      border-radius: 12px;
      max-width: ${options.maxWidth || '600px'};
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      padding: 24px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      transform: scale(0.9);
      transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

    modalContent.innerHTML = content;

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close modal');
    closeBtn.style.cssText = `
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      color: #e2eeff;
      font-size: 32px;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s;
      line-height: 1;
      padding: 0;
      width: 32px;
      height: 32px;
    `;

    closeBtn.addEventListener('mouseover', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseout', () => closeBtn.style.opacity = '0.6');
    closeBtn.addEventListener('click', () => this.close(id));

    modalContent.appendChild(closeBtn);
    modal.appendChild(backdrop);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Event listeners
    if (this.options.closeOnBackdrop) {
      backdrop.addEventListener('click', () => this.close(id));
    }

    if (this.options.closeOnEscape) {
      const escHandler = (e) => {
        if (e.key === 'Escape' && this.activeModal === id) {
          this.close(id);
        }
      };
      document.addEventListener('keydown', escHandler);
      modal.dataset.escHandler = 'attached';
    }

    this.modals.set(id, { element: modal, content: modalContent, options });
    return modal;
  }

  open(id) {
    const modal = this.modals.get(id);
    if (!modal) return;

    this.activeModal = id;
    modal.element.style.opacity = '1';
    modal.element.style.visibility = 'visible';
    modal.content.style.transform = 'scale(1)';

    // Disable body scroll
    document.body.style.overflow = 'hidden';

    // Focus trap
    modal.element.focus();
  }

  close(id) {
    const modal = this.modals.get(id);
    if (!modal) return;

    modal.element.style.opacity = '0';
    modal.element.style.visibility = 'hidden';
    modal.content.style.transform = 'scale(0.9)';

    // Re-enable body scroll
    document.body.style.overflow = '';

    this.activeModal = null;
  }

  destroy(id) {
    const modal = this.modals.get(id);
    if (!modal) return;

    this.close(id);
    setTimeout(() => {
      modal.element.remove();
      this.modals.delete(id);
    }, 300);
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 9: LAZY LOADING UTILITIES
   ═══════════════════════════════════════════════════════════ */

class LazyLoader {
  static images(selector = 'img[data-src]', options = {}) {
    const images = document.querySelectorAll(selector);
    const opts = {
      rootMargin: options.rootMargin || '50px',
      threshold: options.threshold || 0.01,
      ...options
    };

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;

          if (src) {
            img.src = src;
            img.removeAttribute('data-src');

            img.addEventListener('load', () => {
              img.classList.add('loaded');
              if (opts.onLoad) opts.onLoad(img);
            });

            img.addEventListener('error', () => {
              if (opts.onError) opts.onError(img);
            });
          }

          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: opts.rootMargin,
      threshold: opts.threshold
    });

    images.forEach(img => imageObserver.observe(img));
  }

  static elements(selector, callback, options = {}) {
    const elements = document.querySelectorAll(selector);
    const opts = {
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0.1,
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: opts.rootMargin,
      threshold: opts.threshold
    });

    elements.forEach(el => observer.observe(el));
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 10: STORAGE UTILITIES
   ═══════════════════════════════════════════════════════════ */

class StorageManager {
  constructor(prefix = 'app_') {
    this.prefix = prefix;
    this.storage = window.localStorage;
  }

  set(key, value, expiry = null) {
    const data = {
      value: value,
      timestamp: Date.now(),
      expiry: expiry ? Date.now() + expiry : null
    };

    try {
      this.storage.setItem(this.prefix + key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  }

  get(key, defaultValue = null) {
    try {
      const item = this.storage.getItem(this.prefix + key);
      if (!item) return defaultValue;

      const data = JSON.parse(item);

      // Check expiry
      if (data.expiry && Date.now() > data.expiry) {
        this.remove(key);
        return defaultValue;
      }

      return data.value;
    } catch (e) {
      console.error('Storage error:', e);
      return defaultValue;
    }
  }

  remove(key) {
    try {
      this.storage.removeItem(this.prefix + key);
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  }

  clear() {
    try {
      const keys = Object.keys(this.storage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          this.storage.removeItem(key);
        }
      });
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  }

  has(key) {
    return this.get(key) !== null;
  }

  keys() {
    const keys = [];
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.push(key.substring(this.prefix.length));
      }
    }
    return keys;
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 11: DEBOUNCE AND THROTTLE UTILITIES
   ═══════════════════════════════════════════════════════════ */

class PerformanceUtils {
  static debounce(func, wait = 300) {
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

  static throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static rafThrottle(func) {
    let rafId = null;
    return function(...args) {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          func.apply(this, args);
          rafId = null;
        });
      }
    };
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 12: ANIMATION UTILITIES
   ═══════════════════════════════════════════════════════════ */

class AnimationUtils {
  static fadeIn(element, duration = 300, display = 'block') {
    element.style.opacity = '0';
    element.style.display = display;

    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.min(progress / duration, 1);

      element.style.opacity = opacity;

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  static fadeOut(element, duration = 300) {
    let start = null;
    const initialOpacity = parseFloat(window.getComputedStyle(element).opacity);

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = initialOpacity * (1 - Math.min(progress / duration, 1));

      element.style.opacity = opacity;

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    };

    requestAnimationFrame(animate);
  }

  static slideDown(element, duration = 300) {
    element.style.removeProperty('display');
    let display = window.getComputedStyle(element).display;
    if (display === 'none') display = 'block';
    element.style.display = display;

    const height = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    element.offsetHeight; // Force reflow

    element.style.transition = `height ${duration}ms ease, padding ${duration}ms ease, margin ${duration}ms ease`;
    element.style.height = height + 'px';
    element.style.removeProperty('padding-top');
    element.style.removeProperty('padding-bottom');
    element.style.removeProperty('margin-top');
    element.style.removeProperty('margin-bottom');

    setTimeout(() => {
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition');
    }, duration);
  }

  static slideUp(element, duration = 300) {
    element.style.height = element.offsetHeight + 'px';
    element.style.overflow = 'hidden';
    element.offsetHeight; // Force reflow

    element.style.transition = `height ${duration}ms ease, padding ${duration}ms ease, margin ${duration}ms ease`;
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;

    setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('height');
      element.style.removeProperty('padding-top');
      element.style.removeProperty('padding-bottom');
      element.style.removeProperty('margin-top');
      element.style.removeProperty('margin-bottom');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition');
    }, duration);
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 13: CLIPBOARD UTILITIES
   ═══════════════════════════════════════════════════════════ */

class ClipboardUtils {
  static async copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();

      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (err) {
        document.body.removeChild(textArea);
        return false;
      }
    }
  }

  static async paste() {
    try {
      return await navigator.clipboard.readText();
    } catch (err) {
      console.error('Failed to read clipboard:', err);
      return null;
    }
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 14: URL UTILITIES
   ═══════════════════════════════════════════════════════════ */

class URLUtils {
  static getParams() {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    return params;
  }

  static getParam(name, defaultValue = null) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name) || defaultValue;
  }

  static setParam(name, value, pushState = true) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);

    if (pushState) {
      window.history.pushState({}, '', url);
    } else {
      window.history.replaceState({}, '', url);
    }
  }

  static removeParam(name, pushState = true) {
    const url = new URL(window.location);
    url.searchParams.delete(name);

    if (pushState) {
      window.history.pushState({}, '', url);
    } else {
      window.history.replaceState({}, '', url);
    }
  }

  static buildQueryString(params) {
    return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 15: DATE AND TIME UTILITIES
   ═══════════════════════════════════════════════════════════ */

class DateUtils {
  static formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }

  static timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    for (const [name, count] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / count);
      if (interval >= 1) {
        return interval === 1 ? `1 ${name} ago` : `${interval} ${name}s ago`;
      }
    }

    return 'just now';
  }

  static addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static differenceInDays(date1, date2) {
    const diffTime = Math.abs(new Date(date2) - new Date(date1));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 16: DEVICE DETECTION
   ═══════════════════════════════════════════════════════════ */

class DeviceDetection {
  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  static isTablet() {
    const ua = navigator.userAgent;
    return /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua);
  }

  static isDesktop() {
    return !this.isMobile() && !this.isTablet();
  }

  static isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  static getOS() {
    const ua = navigator.userAgent;
    if (/Windows/.test(ua)) return 'Windows';
    if (/Mac/.test(ua)) return 'macOS';
    if (/Linux/.test(ua)) return 'Linux';
    if (/Android/.test(ua)) return 'Android';
    if (/iOS|iPhone|iPad|iPod/.test(ua)) return 'iOS';
    return 'Unknown';
  }

  static getBrowser() {
    const ua = navigator.userAgent;
    if (/Chrome/.test(ua) && !/Edge|Edg/.test(ua)) return 'Chrome';
    if (/Safari/.test(ua) && !/Chrome/.test(ua)) return 'Safari';
    if (/Firefox/.test(ua)) return 'Firefox';
    if (/Edge|Edg/.test(ua)) return 'Edge';
    if (/MSIE|Trident/.test(ua)) return 'Internet Explorer';
    return 'Unknown';
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 17: COLOR UTILITIES
   ═══════════════════════════════════════════════════════════ */

class ColorUtils {
  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  static rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  static lighten(hex, percent) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const amount = Math.round(2.55 * percent);
    const r = Math.min(255, rgb.r + amount);
    const g = Math.min(255, rgb.g + amount);
    const b = Math.min(255, rgb.b + amount);

    return this.rgbToHex(r, g, b);
  }

  static darken(hex, percent) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const amount = Math.round(2.55 * percent);
    const r = Math.max(0, rgb.r - amount);
    const g = Math.max(0, rgb.g - amount);
    const b = Math.max(0, rgb.b - amount);

    return this.rgbToHex(r, g, b);
  }

  static getContrastColor(hex) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return '#000000';

    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 18: RANDOM UTILITIES
   ═══════════════════════════════════════════════════════════ */

class RandomUtils {
  static integer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static float(min, max, decimals = 2) {
    const num = Math.random() * (max - min) + min;
    return parseFloat(num.toFixed(decimals));
  }

  static boolean(probability = 0.5) {
    return Math.random() < probability;
  }

  static item(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  static string(length = 10, charset = 'alphanumeric') {
    const charsets = {
      alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      numeric: '0123456789',
      hex: '0123456789ABCDEF'
    };

    const chars = charsets[charset] || charset;
    let result = '';

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  static uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 19: ARRAY UTILITIES
   ═══════════════════════════════════════════════════════════ */

class ArrayUtils {
  static chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  static unique(array) {
    return [...new Set(array)];
  }

  static flatten(array) {
    return array.reduce((acc, val) =>
      Array.isArray(val) ? acc.concat(this.flatten(val)) : acc.concat(val),
    []);
  }

  static groupBy(array, key) {
    return array.reduce((result, item) => {
      const group = typeof key === 'function' ? key(item) : item[key];
      (result[group] = result[group] || []).push(item);
      return result;
    }, {});
  }

  static sortBy(array, key, order = 'asc') {
    return [...array].sort((a, b) => {
      const aVal = typeof key === 'function' ? key(a) : a[key];
      const bVal = typeof key === 'function' ? key(b) : b[key];

      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  static difference(arr1, arr2) {
    return arr1.filter(x => !arr2.includes(x));
  }

  static intersection(arr1, arr2) {
    return arr1.filter(x => arr2.includes(x));
  }

  static union(arr1, arr2) {
    return this.unique([...arr1, ...arr2]);
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 20: STRING UTILITIES
   ═══════════════════════════════════════════════════════════ */

class StringUtils {
  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static titleCase(str) {
    return str.split(' ').map(word => this.capitalize(word)).join(' ');
  }

  static camelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  static kebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2')
              .replace(/\s+/g, '-')
              .toLowerCase();
  }

  static snakeCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2')
              .replace(/\s+/g, '_')
              .toLowerCase();
  }

  static truncate(str, length, suffix = '...') {
    if (str.length <= length) return str;
    return str.substring(0, length - suffix.length) + suffix;
  }

  static stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  static escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  static slugify(str) {
    return str.toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .trim();
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 21: NUMBER UTILITIES
   ═══════════════════════════════════════════════════════════ */

class NumberUtils {
  static format(num, decimals = 0, thousandsSep = ',', decimalSep = '.') {
    const parts = num.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);
    return parts.join(decimalSep);
  }

  static abbreviate(num, decimals = 1) {
    const abbrev = ['', 'K', 'M', 'B', 'T'];
    const tier = Math.log10(Math.abs(num)) / 3 | 0;

    if (tier === 0) return num.toString();

    const suffix = abbrev[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = num / scale;

    return scaled.toFixed(decimals) + suffix;
  }

  static clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  static lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  static mapRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  static isEven(num) {
    return num % 2 === 0;
  }

  static isOdd(num) {
    return num % 2 !== 0;
  }

  static isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
  }
}

/* ═══════════════════════════════════════════════════════════
   EXPORT ALL UTILITIES
   ═══════════════════════════════════════════════════════════ */

// Make all classes globally available
if (typeof window !== 'undefined') {
  window.AdvancedParticleSystem = AdvancedParticleSystem;
  window.Card3DTilt = Card3DTilt;
  window.TextAnimations = TextAnimations;
  window.ScrollEffects = ScrollEffects;
  window.InteractiveTerminal = InteractiveTerminal;
  window.FormValidator = FormValidator;
  window.NotificationSystem = NotificationSystem;
  window.ModalSystem = ModalSystem;
  window.LazyLoader = LazyLoader;
  window.StorageManager = StorageManager;
  window.PerformanceUtils = PerformanceUtils;
  window.AnimationUtils = AnimationUtils;
  window.ClipboardUtils = ClipboardUtils;
  window.URLUtils = URLUtils;
  window.DateUtils = DateUtils;
  window.DeviceDetection = DeviceDetection;
  window.ColorUtils = ColorUtils;
  window.RandomUtils = RandomUtils;
  window.ArrayUtils = ArrayUtils;
  window.StringUtils = StringUtils;
  window.NumberUtils = NumberUtils;
}

console.log('✓ Advanced Features loaded successfully');
