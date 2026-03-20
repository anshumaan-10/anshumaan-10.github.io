/* ============================================================
   Anshumaan Singh — portfolio.js  v3
   Dynamic particles · Radar chart · OSI interactions · counters
   ============================================================ */
(function () {
  'use strict';

  /* ── LOADER ── */
  const loader = document.getElementById('plLoader');
  const fill   = document.getElementById('plFill');
  let prog = 0;
  const tick = setInterval(() => {
    prog = Math.min(prog + Math.random() * 14, 95);
    if (fill) fill.style.width = prog + '%';
  }, 80);
  window.addEventListener('load', () => {
    clearInterval(tick);
    if (fill) fill.style.width = '100%';
    setTimeout(() => { loader && loader.classList.add('done'); }, 450);
  });

  /* ── TICKER DUPLICATE for seamless infinite scroll ── */
  const tickerTrack = document.querySelector('.cve-ticker-track');
  if (tickerTrack) {
    tickerTrack.innerHTML += tickerTrack.innerHTML;
  }

  /* ── TOP BANNER DISMISS ── */
  const tbClose = document.getElementById('tbClose');
  const topBanner = document.getElementById('topBanner');
  if (tbClose && topBanner) {
    tbClose.addEventListener('click', () => {
      topBanner.style.transition = 'opacity .3s, transform .3s';
      topBanner.style.opacity = '0';
      topBanner.style.transform = 'translateY(-100%)';
      setTimeout(() => { topBanner.remove(); }, 350);
    });
  }

  /* ── SCROLL PROGRESS ── */
  const scrollBar = document.getElementById('scrollProgress');
  function updateScroll() {
    const h = document.documentElement;
    const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
    if (scrollBar) scrollBar.style.transform = `scaleX(${pct})`;
  }
  window.addEventListener('scroll', updateScroll, { passive: true });

  /* ── NAV SCROLL SHADOW + SPY ── */
  const navHeader = document.getElementById('navHeader');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  function updateNav() {
    if (navHeader) navHeader.classList.toggle('scrolled', window.scrollY > 30);
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── MOBILE MENU ── */
  const ham     = document.getElementById('hamburger');
  const mMenu   = document.getElementById('mobileMenu');
  const mmClose = document.getElementById('mmClose');
  const mmBack  = document.getElementById('mmBackdrop');
  function openMenu()  { mMenu && mMenu.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { mMenu && mMenu.classList.remove('open'); document.body.style.overflow = ''; }
  ham     && ham.addEventListener('click', openMenu);
  mmClose && mmClose.addEventListener('click', closeMenu);
  mmBack  && mmBack.addEventListener('click', closeMenu);
  document.querySelectorAll('.mm-link').forEach(l => l.addEventListener('click', closeMenu));

  /* ── CLOCK ── */
  const clk = document.getElementById('blrClock');
  function updateClock() {
    if (!clk) return;
    const t = new Date().toLocaleTimeString('en-IN', { timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true });
    clk.textContent = '🕐 BLR ' + t;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ── BACK TO TOP ── */
  const btop = document.getElementById('btop');
  window.addEventListener('scroll', () => { btop && btop.classList.toggle('show', window.scrollY > 400); }, { passive:true });
  btop && btop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  /* ── HERO TYPING EFFECT ── */
  const typed = document.getElementById('heroTyped');
  const words = ['Kubernetes clusters', 'CI/CD pipelines', '350+ microservices', 'GCP cloud estates', 'supply chains', 'container runtimes'];
  let wi = 0, ci = 0, del = false;
  function typeIt() {
    if (!typed) return;
    const w = words[wi];
    if (!del) {
      typed.textContent = w.slice(0, ++ci);
      if (ci === w.length) { del = true; setTimeout(typeIt, 2000); return; }
    } else {
      typed.textContent = w.slice(0, --ci);
      if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(typeIt, del ? 55 : 80);
  }
  typeIt();

  /* ── COUNTER ANIMATION ── */
  function animateCounters() {
    document.querySelectorAll('.kpi-num[data-target], .sb-number, .ach-big-num').forEach(el => {
      const raw = el.getAttribute('data-target');
      if (!raw) return;
      const target = parseInt(raw, 10);
      if (isNaN(target)) return;
      let start = null;
      const duration = 1800;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(ease * target);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }
  // trigger on hero visibility
  const heroKpis = document.querySelector('.hero-kpis');
  if (heroKpis) {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { animateCounters(); ob.disconnect(); } }, { threshold:.3 });
    ob.observe(heroKpis);
  }

  /* ── SKILL BARS ── */
  const bars = document.querySelectorAll('.si-bar');
  const barOb = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const pct = e.target.getAttribute('data-pct') || '0';
      e.target.style.width = pct + '%';
      barOb.unobserve(e.target);
    });
  }, { threshold:.2 });
  bars.forEach((b, i) => { b.style.setProperty('--delay', (i * 0.06) + 's'); barOb.observe(b); });

  /* ── POSTURE BARS ── */
  const pFills = document.querySelectorAll('.pc-fill');
  const pfOb = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.width = e.target.style.getPropertyValue('--p') || '0%'; pfOb.unobserve(e.target); } });
  }, { threshold: .2 });
  pFills.forEach(p => pfOb.observe(p));

  /* ── RADAR LEGS ── */
  document.querySelectorAll('.radar-leg-fill').forEach((el, i) => {
    const ob2 = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      el.style.width = el.getAttribute('data-w') || '80%';
      ob2.disconnect();
    }, { threshold:.2 });
    ob2.observe(el);
  });

  /* ── PARTICLE CANVAS ── */
  (function initParticles() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'heroCanvas';
    hero.insertBefore(canvas, hero.firstChild);
    const ctx = canvas.getContext('2d');
    let W, H, particles, animId;
    function resize() {
      W = canvas.width  = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); initP(); });

    const COLS = ['rgba(124,58,237,', 'rgba(37,99,235,', 'rgba(16,185,129,'];
    function makeP() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.5 + .5,
        vx: (Math.random() - .5) * .4,
        vy: (Math.random() - .5) * .4,
        col: COLS[Math.floor(Math.random() * COLS.length)],
        alpha: Math.random() * .5 + .15
      };
    }
    function initP() { particles = Array.from({ length:80 }, makeP); }
    initP();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      // draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${.08 * (1 - d / 120)})`;
            ctx.lineWidth = .8;
            ctx.stroke();
          }
        }
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + p.alpha + ')';
        ctx.fill();

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ── RADAR CHART ── */
  (function initRadar() {
    const canvas = document.getElementById('radarCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const SIZE = 420;
    canvas.width = SIZE; canvas.height = SIZE;
    const cx = SIZE / 2; const cy = SIZE / 2; const R = 160;

    const skills = [
      { label:'DevSecOps',   score:.95, color:'#7c3aed' },
      { label:'K8s Security',score:.92, color:'#2563eb' },
      { label:'Supply Chain',score:.90, color:'#10b981' },
      { label:'AppSec',      score:.88, color:'#f59e0b' },
      { label:'Cloud Sec',   score:.85, color:'#ef4444' },
      { label:'Threat Model',score:.82, color:'#ec4899' },
      { label:'Pen Testing', score:.80, color:'#6366f1' },
      { label:'IaC / Infra', score:.88, color:'#0ea5e9' },
    ];
    const N = skills.length;
    let drawn = false;

    function getAngle(i) { return (Math.PI * 2 * i / N) - Math.PI / 2; }
    function pt(i, r) {
      const a = getAngle(i);
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    }

    function drawRadar(progress) {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // grid rings
      [.2, .4, .6, .8, 1].forEach(f => {
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const p = pt(i, R * f);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = f === 1 ? 'rgba(124,58,237,.2)' : 'rgba(124,58,237,.08)';
        ctx.lineWidth = f === 1 ? 1.5 : 1;
        ctx.stroke();
        ctx.fillStyle = 'rgba(248,250,252,.5)';
        ctx.fill();
      });

      // spokes
      for (let i = 0; i < N; i++) {
        const p = pt(i, R);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = 'rgba(124,58,237,.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // filled shape
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      grad.addColorStop(0, 'rgba(124,58,237,.25)');
      grad.addColorStop(1, 'rgba(37,99,235,.10)');
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const sc = skills[i].score * progress;
        const p  = pt(i, R * sc);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = '#7c3aed';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // dots
      for (let i = 0; i < N; i++) {
        const sc = skills[i].score * progress;
        const p  = pt(i, R * sc);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = skills[i].color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // labels
      ctx.font = '700 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let i = 0; i < N; i++) {
        const p = pt(i, R * 1.18);
        ctx.fillStyle = '#374151';
        ctx.fillText(skills[i].label, p.x, p.y);
      }

      // center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#7c3aed';
      ctx.fill();
    }

    // animated entry
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || drawn) return;
      drawn = true;
      let start = null;
      function anim(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1600, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        drawRadar(ease);
        if (p < 1) requestAnimationFrame(anim);
      }
      requestAnimationFrame(anim);
      ob.disconnect();
    }, { threshold:.3 });
    ob.observe(canvas);
    drawRadar(0);

    // update legend widths
    document.querySelectorAll('.radar-leg-fill').forEach((el, i) => {
      el.setAttribute('data-w', Math.round(skills[i % skills.length].score * 100) + '%');
    });
  })();

  /* ── OSI LAYER INTERACTION ── */
  (function initOSI() {
    const layers = document.querySelectorAll('.osi-layer');
    const detail = document.getElementById('osiDetail');
    if (!layers.length || !detail) return;

    const data = {
      7: {
        badge: { bg:'#ede9fe', color:'#7c3aed', text:'Layer 7 · Application' },
        title: 'Application Layer',
        sub:   'Where users, apps, and APIs live — highest risk surface',
        controls:[
          { icon:'🛡️', title:'OWASP ZAP DAST', desc:'Post-deploy dynamic scanning via kubectl URL extraction. Auth bypass, injection, IDOR detection on live endpoints.' },
          { icon:'🔍', title:'SAST + SCA', desc:'Pre-commit static analysis (Semgrep) and dependency CVE scanning (Snyk/Trivy) for all Maven/Node codebases.' },
          { icon:'🔐', title:'API Security', desc:'Token validation, OAuth scope enforcement, rate limiting, and header injection testing across REST & GraphQL APIs.' },
        ]
      },
      6: {
        badge: { bg:'#e0e7ff', color:'#4338ca', text:'Layer 6 · Presentation' },
        title: 'Presentation Layer',
        sub:   'Encoding, encryption, serialisation — TLS/mTLS enforcement',
        controls:[
          { icon:'🔒', title:'TLS Enforcement', desc:'Strict TLS 1.2+ enforcement across all service-to-service communication. Certificate rotation policies via cert-manager.' },
          { icon:'🗝️', title:'Secret Scanning', desc:'Org-wide GitHub secret scanning with custom regex patterns for Azure keys, OAuth tokens, internal API credentials.' },
          { icon:'📋', title:'Serialisation Safety', desc:'Deserialization attack surface analysis and safe encoding validation in API payloads.' },
        ]
      },
      5: {
        badge: { bg:'#dbeafe', color:'#1d4ed8', text:'Layer 5 · Session' },
        title: 'Session Layer',
        sub:   'Authentication, session tokens, identity — OIDC federation',
        controls:[
          { icon:'🪪', title:'OIDC Federated Identity', desc:'GitHub Actions workload identity via OIDC — no long-lived credentials, keyless auth to GCP and K8s.' },
          { icon:'🔑', title:'Session Management', desc:'Short-lived tokens, automatic rotation, and session invalidation patterns enforced across CI/CD and cloud APIs.' },
          { icon:'🛂', title:'MFA & Conditional Access', desc:'Org-level GitHub Enterprise MFA enforcement + GCP conditional access policies and IAM deny policies.' },
        ]
      },
      4: {
        badge: { bg:'#d1fae5', color:'#065f46', text:'Layer 4 · Transport' },
        title: 'Transport Layer',
        sub:   'TCP/TLS, service mesh encryption — Pod-to-Pod security',
        controls:[
          { icon:'🕸️', title:'Network Policy', desc:'Kubernetes NetworkPolicy enforcement restricting pod-to-pod traffic. Namespace isolation prevents lateral movement.' },
          { icon:'🔏', title:'mTLS (Service Mesh)', desc:'Mutual TLS between services ensures both client and server authentication — no plaintext internal traffic.' },
          { icon:'⚡', title:'K8s Service Hardening', desc:'ClusterIP over NodePort, no external exposure unless explicitly approved, ingress with WAF annotations.' },
        ]
      },
      3: {
        badge: { bg:'#fef3c7', color:'#92400e', text:'Layer 3 · Network' },
        title: 'Network Layer',
        sub:   'IP routing, VPC design, firewall rules — GCP network security',
        controls:[
          { icon:'🏰', title:'VPC Service Controls', desc:'GCP VPC-SC perimeter prevents data exfiltration from sensitive resources. Org-level org policies restrict resource creation.' },
          { icon:'🚧', title:'Firewall & Ingress Rules', desc:'Deny-by-default GCP firewall rules. Only explicitly approved ingress paths. Zero open 0.0.0.0/0 rules.' },
          { icon:'📡', title:'Egress Control', desc:'NAT gateway for outbound + VPC flow logging for anomaly detection. No direct internet access from workload VMs.' },
        ]
      },
      2: {
        badge: { bg:'#fee2e2', color:'#991b1b', text:'Layer 2 · Data Link' },
        title: 'Data Link Layer',
        sub:   'Container networking, CNI, node-level isolation',
        controls:[
          { icon:'☸️', title:'CIS K8s Benchmark', desc:'100% CIS Kubernetes Benchmark v1.5.1 compliance — node hardening, kubelet config, API server flags all audited.' },
          { icon:'🧱', title:'Node Isolation', desc:'Tainted nodes for sensitive workloads, dedicated node pools for security-critical services, no shared worker nodes.' },
          { icon:'📦', title:'Container Runtime', desc:'gVisor/runc policy enforcement. No privileged containers. Read-only root filesystem on all workloads via Kyverno.' },
        ]
      },
      1: {
        badge: { bg:'#f3f4f6', color:'#374151', text:'Layer 1 · Physical' },
        title: 'Physical / Infrastructure Layer',
        sub:   'GCP managed infra, CIS-hardened images, boot integrity',
        controls:[
          { icon:'💻', title:'CIS-Hardened Golden Images', desc:'Automated CIS-compliant Linux base image pipeline. OS hardening at build time — no manual patching in prod.' },
          { icon:'🔐', title:'Secure Boot + Shielded VM', desc:'GCP Shielded VMs with vTPM and Secure Boot ensure boot integrity. UEFI firmware verification on all nodes.' },
          { icon:'🗂️', title:'Immutable Infrastructure', desc:'No SSH in production. All changes via GitOps. Container images are immutable — no in-place patching.' },
        ]
      }
    };

    function renderDetail(layer) {
      const d = data[layer];
      if (!d || !detail) return;
      detail.innerHTML = `
        <span class="osi-detail-badge" style="background:${d.badge.bg};color:${d.badge.color}">${d.badge.text}</span>
        <h3 class="osi-detail-title">${d.title}</h3>
        <p class="osi-detail-sub">${d.sub}</p>
        <div class="osi-detail-controls">
          ${d.controls.map(c => `
            <div class="osi-ctrl">
              <span class="osi-ctrl-icon">${c.icon}</span>
              <div class="osi-ctrl-text">
                <h4>${c.title}</h4>
                <p>${c.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    layers.forEach(l => {
      l.addEventListener('click', () => {
        layers.forEach(x => x.classList.remove('active'));
        l.classList.add('active');
        renderDetail(parseInt(l.getAttribute('data-layer'), 10));
      });
    });

    // Default: Layer 7
    layers[0] && layers[0].click();
  })();

  /* ── PIPELINE HOVER ANIMATION ── */
  (function initPipeline() {
    const nodes = document.querySelectorAll('.pipe-node');
    nodes.forEach(n => {
      n.addEventListener('mouseenter', () => {
        n.style.transform = 'scale(1.18) translateY(-8px)';
      });
      n.addEventListener('mouseleave', () => {
        n.style.transform = '';
      });
    });

    // animate pipeline in sequence on scroll
    const track = document.querySelector('.pipeline-track');
    if (!track) return;
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      document.querySelectorAll('.pipe-stage').forEach((s, i) => {
        setTimeout(() => {
          s.style.opacity = '1';
          s.style.transform = 'translateY(0)';
        }, i * 120);
      });
      ob.disconnect();
    }, { threshold:.2 });
    ob.observe(track);

    document.querySelectorAll('.pipe-stage').forEach(s => {
      s.style.opacity = '0';
      s.style.transform = 'translateY(30px)';
      s.style.transition = 'opacity .5s ease, transform .5s ease';
    });
  })();

  /* ── AOS INIT ── */
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, duration: 650, easing: 'ease-out-cubic', offset: 80 });
  }

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<span style="opacity:.6">Sending…</span>';
      btn.disabled = true;
      try {
        const resp = await fetch(form.action, {
          method:'POST',
          body: new FormData(form),
          headers:{ 'Accept':'application/json' }
        });
        if (resp.ok) {
          btn.innerHTML = '✓ Sent!';
          form.reset();
          setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 3000);
        } else {
          btn.innerHTML = '✗ Error — try email';
          setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 3000);
        }
      } catch {
        btn.innerHTML = '✗ Network error';
        setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 3000);
      }
    });
  }

  /* ── SECURITY METRIC ARCS (canvas) ── */
  (function initArcs() {
    const canvas = document.getElementById('metricsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const SIZE = 320;
    canvas.width = SIZE; canvas.height = SIZE;
    const metrics = [
      { label:'CIS K8s', pct:1.00, color:'#7c3aed', r:140 },
      { label:'OWASP',   pct:.93,  color:'#2563eb', r:110 },
      { label:'SBOM',    pct:1.00, color:'#10b981', r:80  },
      { label:'CI Gates',pct:1.00, color:'#f59e0b', r:50  },
    ];
    let drawn2 = false;

    function drawArcs(progress) {
      ctx.clearRect(0, 0, SIZE, SIZE);
      metrics.forEach(m => {
        // bg ring
        ctx.beginPath();
        ctx.arc(SIZE/2, SIZE/2, m.r, 0, Math.PI*2);
        ctx.strokeStyle = 'rgba(0,0,0,.07)';
        ctx.lineWidth = 14;
        ctx.stroke();
        // arc
        const end = -Math.PI/2 + m.pct * progress * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(SIZE/2, SIZE/2, m.r, -Math.PI/2, end);
        ctx.strokeStyle = m.color;
        ctx.lineWidth = 14;
        ctx.lineCap = 'round';
        ctx.stroke();
        // label inside
        if (progress > .8) {
          ctx.font = `700 11px Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillStyle = m.color;
          const lx = SIZE/2 + m.r * Math.cos(end - .3);
          const ly = SIZE/2 + m.r * Math.sin(end - .3);
          ctx.fillText(Math.round(m.pct*100)+'%', SIZE/2, SIZE/2 + m.r*.05 - (metrics.indexOf(m)*14));
        }
      });
      // center text
      ctx.font = `800 20px Outfit, Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#0f172a';
      ctx.fillText('0', SIZE/2, SIZE/2 - 4);
      ctx.font = `500 11px Inter, sans-serif`;
      ctx.fillStyle = '#6b7280';
      ctx.fillText('Incidents', SIZE/2, SIZE/2 + 14);
    }

    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || drawn2) return;
      drawn2 = true;
      let start = null;
      function anim(ts) {
        if (!start) start = ts;
        const p = Math.min((ts-start)/1400, 1);
        const ease = 1 - Math.pow(1-p, 3);
        drawArcs(ease);
        if (p < 1) requestAnimationFrame(anim);
      }
      requestAnimationFrame(anim);
      ob.disconnect();
    }, { threshold:.3 });
    ob.observe(canvas);
    drawArcs(0);

    // legend
    const leg = document.getElementById('metricsLegend');
    if (leg) {
      leg.innerHTML = metrics.map(m => `
        <div style="display:flex;align-items:center;gap:10px;font-size:.82rem;">
          <span style="width:12px;height:12px;border-radius:3px;background:${m.color};flex-shrink:0;display:inline-block"></span>
          <span style="color:#374151;font-weight:600;flex:1">${m.label}</span>
          <span style="color:${m.color};font-weight:800;font-family:monospace">${Math.round(m.pct*100)}%</span>
        </div>
      `).join('');
    }
  })();

  /* ── FLOATING SHAPES ANIMATION ── */
  document.querySelectorAll('.pipe-node').forEach((el, i) => {
    el.style.animation = `blobDrift ${8 + i}s ease-in-out infinite alternate`;
    el.style.animationDelay = (i * 0.3) + 's';
  });

})();
