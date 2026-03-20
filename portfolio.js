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
    const dpr = window.devicePixelRatio || 1;
    const SIZE = 500;
    canvas.width = SIZE * dpr; canvas.height = SIZE * dpr;
    canvas.style.width = SIZE + 'px'; canvas.style.height = SIZE + 'px';
    ctx.scale(dpr, dpr);
    const cx = SIZE / 2; const cy = SIZE / 2; const R = 175;

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

      // labels — pushed further out and aligned to avoid clipping
      ctx.font = '700 13px Inter, sans-serif';
      ctx.textBaseline = 'middle';
      for (let i = 0; i < N; i++) {
        const a = getAngle(i);
        const p = pt(i, R + 32);
        // align text based on which side of the chart
        if (Math.abs(Math.cos(a)) < 0.15) ctx.textAlign = 'center';
        else if (Math.cos(a) > 0) ctx.textAlign = 'left';
        else ctx.textAlign = 'right';
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

  /* ── PIPELINE HOVER ANIMATION + CLICK TO DETAIL SUBFLOW ── */
  (function initPipeline() {
    const nodes = document.querySelectorAll('.pipe-node');
    const stages = document.querySelectorAll('.pipe-stage');
    const detailEl = document.getElementById('pipeDetail');

    /* Substep data for each of the 7 stages (index 0-6) */
    const stageData = [
      {
        name:'Code & PR Governance', emoji:'💻', color:'#7c3aed',
        desc:'Every line of code goes through a verifiable, auditable gate before it ever touches the main branch.',
        steps:[
          { n:'01', icon:'🔀', title:'PR-Only Merges', desc:'CODEOWNERS enforces review ownership. No direct push to main — ever.', tool:'CODEOWNERS' },
          { n:'02', icon:'🔒', title:'Branch Protection', desc:'Required status checks + signed commits enforced at org level via GitHub Enterprise.', tool:'Branch Rules' },
          { n:'03', icon:'🔍', title:'Push-Time Secret Scan', desc:'Custom regex patterns catch org-specific credentials on every push before they enter history.', tool:'GH Advanced Security' },
          { n:'04', icon:'✅', title:'Review Gates', desc:'Minimum reviews + conversation resolution enforced. No self-approval. Reviewer rotation tracked.', tool:'GitHub API' },
          { n:'05', icon:'📋', title:'Audit Logging', desc:'All PR events, reviews, and merges stream to SIEM in real time. Full legal-grade record.', tool:'GitHub Audit Log' },
        ]
      },
      {
        name:'Build & Static Analysis', emoji:'🏗️', color:'#2563eb',
        desc:'Before a container image exists, code and infrastructure are scanned at the source.',
        steps:[
          { n:'01', icon:'🔎', title:'SAST (Semgrep)', desc:'Static analysis catches injection, XSS, hardcoded secrets, insecure API usage across all languages.', tool:'Semgrep' },
          { n:'02', icon:'📦', title:'SCA Dependency Scan', desc:'Snyk + Trivy cross-validate every dependency\'s CVE status against org-defined thresholds.', tool:'Snyk / Trivy' },
          { n:'03', icon:'🏗️', title:'IaC Security Scan', desc:'Terraform plans and K8s manifests scanned for misconfigurations before any apply.', tool:'Checkov' },
          { n:'04', icon:'🐳', title:'Dockerfile Lint', desc:'Dockerfile analysed for unsafe base images, root users, exposed ports, and missing healthchecks.', tool:'Hadolint' },
          { n:'05', icon:'🚫', title:'Policy Threshold Gate', desc:'High/Critical CVEs halt the build. CVSS + EPSS used for triage. No noise — only block on exploitable risk.', tool:'Policy Engine' },
        ]
      },
      {
        name:'Container Scanning & CVE Triage', emoji:'🔍', color:'#10b981',
        desc:'Two independent scanners. Cross-validated results. No scanner trust failures.',
        steps:[
          { n:'01', icon:'🔬', title:'Trivy Deep Scan', desc:'Full OS + language-package CVE scan against NVD, GitHub Advisory, and custom databases.', tool:'Trivy' },
          { n:'02', icon:'☁️', title:'Prisma Cloud (twistcli)', desc:'Cloud-native scanner with org-defined compliance policies and policy-block enforcement.', tool:'Prisma Cloud' },
          { n:'03', icon:'📊', title:'CVSS + EPSS Triage', desc:'Severity combined with exploitation probability. Avoids blocking on theoretical-only CVEs.', tool:'EPSS + NVD' },
          { n:'04', icon:'📄', title:'Scan Report Attestation', desc:'JSON scan output signed and attached as an attestation layer to the image. Audit-ready.', tool:'Cosign Attach' },
          { n:'05', icon:'🚧', title:'Block or Promote Gate', desc:'Critical/High = build dies. Medium/Low = document with expiry + required review ticket.', tool:'Policy Gate' },
        ]
      },
      {
        name:'SBOM Generation & Signing', emoji:'🔐', color:'#f59e0b',
        desc:'Every artifact that ships carries verifiable provenance — who built it, from what, and when.',
        steps:[
          { n:'01', icon:'📦', title:'SBOM Generation (Syft)', desc:'CycloneDX/SPDX SBOM listing every dependency — name, version, license, and package hash.', tool:'Syft' },
          { n:'02', icon:'🔏', title:'Cosign Image Signing', desc:'Keyless signing via Sigstore OIDC flow — identity-bound, no long-lived private keys stored.', tool:'Cosign / Sigstore' },
          { n:'03', icon:'📜', title:'Attestation Attach', desc:'SBOM + scan output attached as signed attestations. Verifiable chain-of-custody established.', tool:'Cosign Attach' },
          { n:'04', icon:'✍️', title:'Digest Pinning', desc:'Image digest (SHA256) written to deployment manifest. Mutable :latest tags are banned.', tool:'Registry Digest' },
          { n:'05', icon:'🔗', title:'Provenance Record', desc:'Commit → build ID → image digest → SBOM hash all linked in Artifact Registry metadata.', tool:'Artifact Registry' },
        ]
      },
      {
        name:'Controlled Artifact Promotion', emoji:'🚀', color:'#6366f1',
        desc:'No image reaches production without a verified signature, QA approval, and registry validation.',
        steps:[
          { n:'01', icon:'🔎', title:'Signature Verification', desc:'Promotion gate verifies Cosign signature before pull. An unsigned image is a hard rejection.', tool:'Cosign Verify' },
          { n:'02', icon:'🗃️', title:'Registry Allowlist Check', desc:'Only images from approved registry paths pass. Unknown sources are silently blocked.', tool:'Registry Policy' },
          { n:'03', icon:'👤', title:'QA Human Approval', desc:'Named QA owner approves promotion. No self-approval path. Action is logged to audit trail.', tool:'GitHub Environments' },
          { n:'04', icon:'📦', title:'Image Promote (no rebuild)', desc:'QA copies approved image to UAT/Prod repo. The exact same bits that were scanned ship to prod.', tool:'Registry Copy' },
          { n:'05', icon:'📋', title:'GitOps Manifest Update', desc:'Manifest updated with immutable digest. ArgoCD detects drift and triggers controlled rollout.', tool:'ArgoCD / Helm' },
        ]
      },
      {
        name:'Kubernetes Admission & Deploy', emoji:'☸️', color:'#0ea5e9',
        desc:'Kyverno acts as the last enforcement layer before any workload reaches the cluster.',
        steps:[
          { n:'01', icon:'🛂', title:'Kyverno Admission Control', desc:'Every manifest validated at admission: no privileged pods, required labels, resource limits enforced.', tool:'Kyverno' },
          { n:'02', icon:'📷', title:'Image Signature Check', desc:'ClusterPolicy verifies Cosign signature on every image at deploy time. Unsigned = rejected.', tool:'Kyverno + Cosign' },
          { n:'03', icon:'🔗', title:'Registry Allowlist Enforce', desc:'Only images from approved registries admitted. Blocks supply-chain injection at the cluster gate.', tool:'Kyverno Policy' },
          { n:'04', icon:'🔄', title:'ArgoCD GitOps Sync', desc:'Cluster state must mirror Git. Manual kubectl apply is blocked — GitOps is the only deploy path.', tool:'ArgoCD' },
          { n:'05', icon:'💚', title:'Health Probe Validation', desc:'Readiness + liveness probes enforced via Kyverno. Pod receives no traffic before passing health checks.', tool:'K8s Probes' },
        ]
      },
      {
        name:'Runtime Monitoring & DAST', emoji:'📡', color:'#ec4899',
        desc:'Post-deploy is not post-security. Runtime and dynamic testing run continuously.',
        steps:[
          { n:'01', icon:'🦅', title:'Falco Runtime Detection', desc:'eBPF syscall-level monitoring detects container escapes, privilege escalations, unexpected shell spawns.', tool:'Falco' },
          { n:'02', icon:'🕷️', title:'OWASP ZAP DAST', desc:'Dynamic scanner uses kubectl-extracted live URLs to test auth bypass, injection, and header security.', tool:'OWASP ZAP' },
          { n:'03', icon:'📱', title:'Slack Release Telemetry', desc:'Every deploy posts commit SHA, build actor, image digest, and scan status to the security channel.', tool:'Slack / GH Actions' },
          { n:'04', icon:'📊', title:'SIEM Correlation', desc:'GitHub audit + GCP audit + Falco alerts correlated. Anomalies surface immediately, not in batch.', tool:'SIEM' },
          { n:'05', icon:'🔔', title:'Runbook-Linked Alerts', desc:'Every alert includes a runbook link. No ambiguity: who responds, what they check, when it escalates.', tool:'Incident Runbook' },
        ]
      },
    ];

    function renderDetail(idx) {
      const d = stageData[idx];
      if (!d || !detailEl) return;

      const stepsHtml = d.steps.map((s, i) => `
        <div class="pd-step">
          <div class="pd-step-inner">
            <div class="pd-step-num">Step ${s.n}</div>
            <div class="pd-step-icon">${s.icon}</div>
            <div class="pd-step-name">${s.title}</div>
            <div class="pd-step-desc">${s.desc}</div>
            <span class="pd-step-tool">${s.tool}</span>
          </div>
        </div>
        ${i < d.steps.length - 1 ? '<div class="pd-arrow"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>' : ''}
      `).join('');

      detailEl.innerHTML = `
        <div class="pd-header">
          <div class="pd-emoji">${d.emoji}</div>
          <div class="pd-title-block">
            <div class="pd-stage-label">Stage ${idx + 1} of 7</div>
            <div class="pd-title">${d.name}</div>
            <div class="pd-desc">${d.desc}</div>
          </div>
        </div>
        <div class="pd-flow">${stepsHtml}</div>
      `;

      /* animate steps in */
      detailEl.querySelectorAll('.pd-step').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity .3s ease, transform .3s ease';
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 70);
      });
    }

    /* click handler */
    stages.forEach((stage, idx) => {
      stage.style.cursor = 'pointer';
      stage.addEventListener('click', () => {
        stages.forEach(s => s.classList.remove('pipe-active'));
        stage.classList.add('pipe-active');
        renderDetail(idx);
        /* scroll detail panel into view softly */
        const wrap = document.getElementById('pipeDetailWrap');
        if (wrap) {
          setTimeout(() => wrap.scrollIntoView({ behavior:'smooth', block:'nearest' }), 100);
        }
      });
      /* hover scale */
      stage.addEventListener('mouseenter', () => {
        const n = stage.querySelector('.pipe-node');
        if (n) n.style.transform = 'scale(1.18) translateY(-8px)';
      });
      stage.addEventListener('mouseleave', () => {
        const n = stage.querySelector('.pipe-node');
        if (n) n.style.transform = '';
      });
    });

    /* animate pipeline in sequence on scroll */
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

    /* pre-render first stage so panel isn't blank */
    if (stages.length) {
      stages[0].classList.add('pipe-active');
      renderDetail(0);
    }
  })();

  /* ── DARK METRICS COUNTER ANIMATION ── */
  (function initDmCounters() {
    const counters = document.querySelectorAll('.dm-counter[data-target]');
    if (!counters.length) return;
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;
        let start = null;
        const dur = 1600;
        function step(ts) {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          el.textContent = Math.round(ease * target);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
        ob.unobserve(el);
      });
    }, { threshold:.3 });
    counters.forEach(c => ob.observe(c));
  })();

  /* ── TERMINAL WIDGET ANIMATION ── */
  (function initTerminal() {
    const body = document.getElementById('termBody');
    if (!body) return;
    const lines = [
      { type:'cmd',  text:'anshumaan --contact' },
      { type:'out',  text:'> Anshumaan Singh — Security Systems Engineer' },
      { type:'out',  text:'> Location  : Bengaluru, India (IST)' },
      { type:'out',  text:'> Company   : ZEE Entertainment Enterprises Ltd' },
      { type:'cmd',  text:'cat status.json' },
      { type:'value',text:'{ "open_to_work": true, "role": "Security Engineering / DevSecOps" }' },
      { type:'cmd',  text:'echo $EMAIL' },
      { type:'value',text:'anshumaansingh10jan@gmail.com' },
      { type:'cmd',  text:'curl linkedin.com/in/anshumaan-singh-6b51b5239' },
      { type:'value',text:'→ 200 OK | Profile live' },
    ];
    let lineIdx = 0;
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      ob.disconnect();
      typeLines();
    }, { threshold:.4 });
    ob.observe(body);

    function typeLines() {
      if (lineIdx >= lines.length) {
        /* add blinking cursor at end */
        const cur = document.createElement('div');
        cur.className = 'tw-line';
        cur.innerHTML = '<span class="tw-prompt">$</span> <span class="tw-cursor"></span>';
        body.appendChild(cur);
        return;
      }
      const l = lines[lineIdx++];
      const div = document.createElement('div');
      div.className = 'tw-line';
      if (l.type === 'cmd') {
        div.innerHTML = `<span class="tw-prompt">$</span> <span class="tw-cmd"></span>`;
        body.appendChild(div);
        const span = div.querySelector('.tw-cmd');
        typeText(span, l.text, 38, typeLines);
      } else if (l.type === 'value') {
        div.innerHTML = `<span class="tw-value">${l.text}</span>`;
        body.appendChild(div);
        setTimeout(typeLines, 80);
      } else {
        div.innerHTML = `<span class="tw-out">${l.text}</span>`;
        body.appendChild(div);
        setTimeout(typeLines, 60);
      }
    }
    function typeText(el, text, speed, done) {
      let i = 0;
      function t() {
        el.textContent = text.slice(0, ++i);
        if (i < text.length) setTimeout(t, speed);
        else setTimeout(done, 200);
      }
      t();
    }
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
    const SIZE = 360;
    canvas.width = SIZE; canvas.height = SIZE;
    const metrics = [
      { label:'CIS K8s', pct:1.00, color:'#7c3aed', r:155 },
      { label:'OWASP',   pct:.93,  color:'#2563eb', r:120 },
      { label:'SBOM',    pct:1.00, color:'#10b981', r:85  },
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
        ctx.lineWidth = 16;
        ctx.stroke();
        // arc
        const end = -Math.PI/2 + m.pct * progress * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(SIZE/2, SIZE/2, m.r, -Math.PI/2, end);
        ctx.strokeStyle = m.color;
        ctx.lineWidth = 16;
        ctx.lineCap = 'round';
        ctx.stroke();
        // percentage label at the arc tip (outside the ring)
        if (progress > .6) {
          const tipAngle = end;
          const lx = SIZE/2 + (m.r + 16) * Math.cos(tipAngle);
          const ly = SIZE/2 + (m.r + 16) * Math.sin(tipAngle);
          ctx.font = `800 10px Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = m.color;
          const a = Math.min(1, (progress-.6)/.4);
          ctx.globalAlpha = a;
          ctx.fillText(Math.round(m.pct*100)+'%', lx, ly);
          ctx.globalAlpha = 1;
        }
      });
      // center text
      ctx.font = `800 22px Outfit, Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#0f172a';
      ctx.fillText('0', SIZE/2, SIZE/2 - 6);
      ctx.font = `500 11px Inter, sans-serif`;
      ctx.fillStyle = '#6b7280';
      ctx.fillText('Incidents', SIZE/2, SIZE/2 + 12);
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

  /* ═══════════════════════════════════════════════════════
     V15 MICRO-INTERACTIONS — Premium JS Enhancements
     ═══════════════════════════════════════════════════════ */

  /* ── 1. CARD MOUSE TRACKING GLOW ── */
  document.querySelectorAll('.exp-domain, .cert-card, .opp-card, .achieve-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  /* ── 2. BADGE ROW STAGGER ANIMATION ON SCROLL ── */
  const badgeRow = document.querySelector('.exp-badge-row');
  if (badgeRow) {
    const badgeObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const badges = badgeRow.querySelectorAll('.exp-badge');
          badges.forEach((b, i) => {
            b.style.opacity = '0';
            b.style.transform = 'translateY(12px) scale(0.9)';
            setTimeout(() => {
              b.style.transition = 'all .35s cubic-bezier(.34,1.56,.64,1)';
              b.style.opacity = '1';
              b.style.transform = 'translateY(0) scale(1)';
            }, 40 * i);
          });
          badgeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    badgeObs.observe(badgeRow);
  }

  /* ── 3. IMPACT STRIP COUNTER ANIMATION ── */
  const impactNums = document.querySelectorAll('.is-num');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const span = el.querySelector('span');
        const suffix = span ? span.textContent : '';
        const numText = text.replace(suffix, '').trim();
        const target = parseInt(numText, 10);
        
        if (!isNaN(target) && target > 0) {
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.childNodes[0].textContent = current;
          }, 30);
        }
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  impactNums.forEach(n => counterObs.observe(n));

  /* ── 4. SMOOTH SECTION REVEAL ON SCROLL ── */
  const allSections = document.querySelectorAll('section');
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  allSections.forEach(s => secObs.observe(s));

  /* ── 5. BACK TO TOP BUTTON ── */
  const btt = document.createElement('button');
  btt.className = 'back-to-top';
  btt.setAttribute('aria-label', 'Back to top');
  btt.innerHTML = '↑';
  document.body.appendChild(btt);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  }, { passive: true });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── 6. IMAGE LAZY LOAD FADE-IN ── */
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });

  /* ── 7. DOMAIN EXPAND/COLLAPSE ON MOBILE ── */
  if (window.innerWidth < 768) {
    document.querySelectorAll('.exp-domain').forEach(domain => {
      const head = domain.querySelector('.epd-head');
      const ul = domain.querySelector('ul');
      if (head && ul) {
        ul.style.maxHeight = '0';
        ul.style.overflow = 'hidden';
        ul.style.transition = 'max-height .5s cubic-bezier(.34,1.56,.64,1), opacity .3s ease';
        ul.style.opacity = '0';
        domain.dataset.expanded = 'false';
        
        head.style.cursor = 'pointer';
        head.addEventListener('click', () => {
          const isExpanded = domain.dataset.expanded === 'true';
          if (isExpanded) {
            ul.style.maxHeight = '0';
            ul.style.opacity = '0';
            domain.dataset.expanded = 'false';
          } else {
            ul.style.maxHeight = ul.scrollHeight + 'px';
            ul.style.opacity = '1';
            domain.dataset.expanded = 'true';
          }
        });
      }
    });
  }

  /* ── 8. TILT EFFECT FOR CERT CARDS ── */
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
      card.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .1s ease';
    });
  });

  /* ── 9. MAGNETIC EFFECT FOR CTA BUTTONS ── */
  document.querySelectorAll('.cta-btn, .opp-cta a, .hero-cta a').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1)';
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform .1s ease';
    });
  });

  /* ── 10. COPY EMAIL ON CLICK (TOAST) ── */
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', e => {
      const email = link.href.replace('mailto:', '');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email copied to clipboard!', 'success');
        });
      }
    });
  });

  function showToast(msg, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${msg}</span><span class="toast-close">×</span>`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  /* ── 11. SCROLL-LINKED SECTION PARALLAX ── */
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroSection.style.opacity = 1 - (scrollY / window.innerHeight) * 0.3;
      }
    }, { passive: true });
  }

  /* ── 12. EXPERIENCE DOMAIN COUNT INDICATOR ── */
  document.querySelectorAll('.exp-domain').forEach((domain, i) => {
    const head = domain.querySelector('.epd-head');
    if (head) {
      const counter = document.createElement('span');
      counter.style.cssText = 'font-size:.68rem;color:var(--text-faint);font-weight:500;margin-left:auto;font-family:var(--font-mono);';
      const bullets = domain.querySelectorAll('li').length;
      counter.textContent = `${bullets} items`;
      head.style.display = 'flex';
      head.style.alignItems = 'center';
      head.appendChild(counter);
    }
  });

  /* ── 13. KEYBOARD SHORTCUTS ── */
  document.addEventListener('keydown', e => {
    // Press '/' to focus search or nav
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      const target = document.activeElement;
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const firstInput = document.querySelector('input[type="text"], input[type="email"]');
        if (firstInput) firstInput.focus();
      }
    }
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
      }
    }
  });

  /* ── 14. VIEWPORT ANIMATION STAGGER FOR MOMENT CARDS ── */
  const momentCards = document.querySelectorAll('.moment-card');
  const momentObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, i * 80);
        momentObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  momentCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) scale(0.97)';
    card.style.transition = 'all .5s cubic-bezier(.34,1.56,.64,1)';
    momentObs.observe(card);
  });

  /* ── 15. PRINT-FRIENDLY TRIGGER ── */
  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('[data-aos]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  });

  /* ═══════════════════════════════════════════════════════
     V16 UI/UX MASTERCLASS — Advanced Interactions
     ═══════════════════════════════════════════════════════ */

  /* ── 16. CURSOR FOLLOWER ── */
  (function initCursorFollower() {
    if (window.matchMedia('(pointer:coarse)').matches) return;
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.cssText = 'position:fixed;width:8px;height:8px;border-radius:50%;background:var(--violet);pointer-events:none;z-index:99999;transition:transform .15s ease,opacity .3s ease;opacity:0;mix-blend-mode:difference;';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.style.cssText = 'position:fixed;width:36px;height:36px;border-radius:50%;border:1.5px solid var(--violet);pointer-events:none;z-index:99998;transition:transform .25s ease,width .3s ease,height .3s ease,opacity .3s ease;opacity:0;';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    let mx=0,my=0;
    document.addEventListener('mousemove',function(e){
      mx=e.clientX; my=e.clientY;
      dot.style.transform='translate('+(mx-4)+'px,'+(my-4)+'px)';
      ring.style.transform='translate('+(mx-18)+'px,'+(my-18)+'px)';
      dot.style.opacity='1'; ring.style.opacity='1';
    },{passive:true});
    document.addEventListener('mousedown',function(){
      ring.style.width='28px'; ring.style.height='28px';
      ring.style.transform='translate('+(mx-14)+'px,'+(my-14)+'px)';
    });
    document.addEventListener('mouseup',function(){
      ring.style.width='36px'; ring.style.height='36px';
      ring.style.transform='translate('+(mx-18)+'px,'+(my-18)+'px)';
    });
    document.querySelectorAll('a,button,[role="button"],.exp-domain,.cert-card,.moment-card,.opp-card').forEach(function(el){
      el.addEventListener('mouseenter',function(){
        ring.style.width='48px'; ring.style.height='48px';
        ring.style.borderColor='var(--violet)';
        ring.style.opacity='.5';
        dot.style.transform='translate('+(mx-4)+'px,'+(my-4)+'px) scale(1.5)';
      });
      el.addEventListener('mouseleave',function(){
        ring.style.width='36px'; ring.style.height='36px';
        ring.style.opacity='1';
        dot.style.transform='translate('+(mx-4)+'px,'+(my-4)+'px) scale(1)';
      });
    });
  })();

  /* ── 17. SMOOTH SCROLL SECTION REVEAL ── */
  (function initSectionReveal() {
    var targets = document.querySelectorAll('.anim-on-scroll,.anim-on-scroll-left,.anim-on-scroll-right,.anim-on-scroll-scale');
    if (!targets.length) return;
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function(t) { obs.observe(t); });
  })();

  /* ── 18. LIGHTBOX FOR MOMENT CARDS ── */
  (function initLightbox() {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<img class="lightbox-img" src="" alt=""><button class="lightbox-close" aria-label="Close lightbox">&times;</button><div class="lightbox-caption"></div>';
    document.body.appendChild(overlay);
    var img = overlay.querySelector('.lightbox-img');
    var caption = overlay.querySelector('.lightbox-caption');
    var closeBtn = overlay.querySelector('.lightbox-close');
    function openLB(src, cap) {
      img.src = src;
      caption.textContent = cap || '';
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLB() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    closeBtn.addEventListener('click', closeLB);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeLB();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeLB();
    });
    document.querySelectorAll('.moment-card img').forEach(function(im) {
      im.style.cursor = 'zoom-in';
      im.addEventListener('click', function(e) {
        e.stopPropagation();
        var card = im.closest('.moment-card');
        var titleEl = card ? card.querySelector('.mc-title') : null;
        openLB(im.src, titleEl ? titleEl.textContent : '');
      });
    });
  })();

  /* ── 19. SECTION SIDE INDICATOR DOTS ── */
  (function initSectionIndicator() {
    if (window.innerWidth < 768) return;
    var navSections = document.querySelectorAll('section[id]');
    if (navSections.length < 3) return;
    var wrap = document.createElement('div');
    wrap.className = 'section-indicator';
    wrap.setAttribute('aria-hidden', 'true');
    navSections.forEach(function(sec) {
      var dot = document.createElement('div');
      dot.className = 'section-indicator-dot';
      dot.title = sec.id.replace(/-/g, ' ');
      dot.addEventListener('click', function() {
        sec.scrollIntoView({ behavior: 'smooth' });
      });
      wrap.appendChild(dot);
    });
    document.body.appendChild(wrap);
    var dots = wrap.querySelectorAll('.section-indicator-dot');
    var sidObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          dots.forEach(function(d) { d.classList.remove('active'); });
          var idx = Array.from(navSections).indexOf(e.target);
          if (dots[idx]) dots[idx].classList.add('active');
        }
      });
    }, { threshold: 0.3 });
    navSections.forEach(function(s) { sidObs.observe(s); });
  })();

  /* ── 20. TEXT SCRAMBLE EFFECT ON SECTION TITLES ── */
  (function initTextScramble() {
    var chars = '!@#$%^&*()_+=-<>?/|{}[]';
    function scramble(el) {
      var original = el.textContent;
      var length = original.length;
      var iteration = 0;
      var interval = setInterval(function() {
        el.textContent = original.split('').map(function(c, i) {
          if (i < iteration) return original[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        iteration += 1;
        if (iteration > length) {
          el.textContent = original;
          clearInterval(interval);
        }
      }, 30);
    }
    var headings = document.querySelectorAll('.sec-title,h2.section-title');
    if (!headings.length) return;
    var scrObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          scramble(e.target);
          scrObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    headings.forEach(function(h) { scrObs.observe(h); });
  })();

  /* ── 21. SCROLL VELOCITY PROGRESS ENHANCEMENT ── */
  (function initScrollVelocity() {
    var lastScroll = 0;
    var lastTime = Date.now();
    var topbar = document.querySelector('.topbar');
    if (!topbar) return;
    window.addEventListener('scroll', function() {
      var now = Date.now();
      var dt = now - lastTime;
      if (dt < 16) return;
      var velocity = Math.abs(window.scrollY - lastScroll) / dt;
      lastScroll = window.scrollY;
      lastTime = now;
      if (velocity > 2) {
        topbar.style.transition = 'transform .15s ease';
        if (window.scrollY > 200) {
          topbar.style.transform = 'translateY(-100%)';
        }
      } else {
        topbar.style.transition = 'transform .4s ease';
        topbar.style.transform = 'translateY(0)';
      }
    }, { passive: true });
  })();

  /* ── 22. EXPERIENCE DOMAIN READ-MORE TOGGLE ── */
  (function initDomainReadMore() {
    if (window.innerWidth > 768) return;
    document.querySelectorAll('.exp-domain').forEach(function(dom) {
      var list = dom.querySelector('ul,ol');
      if (!list) return;
      var items = list.querySelectorAll('li');
      if (items.length <= 4) return;
      items.forEach(function(li, i) {
        if (i >= 4) {
          li.style.display = 'none';
          li.classList.add('domain-hidden-item');
        }
      });
      var btn = document.createElement('button');
      btn.textContent = 'Show ' + (items.length - 4) + ' more';
      btn.style.cssText = 'margin-top:8px;padding:4px 12px;font-size:.78rem;font-weight:600;color:var(--violet);background:var(--violet-dim);border:1px solid var(--border-violet);border-radius:20px;cursor:pointer;transition:all .2s ease;';
      btn.addEventListener('click', function() {
        var hidden = list.querySelectorAll('.domain-hidden-item');
        var isHidden = hidden[0] && hidden[0].style.display === 'none';
        hidden.forEach(function(li) { li.style.display = isHidden ? '' : 'none'; });
        btn.textContent = isHidden ? 'Show less' : 'Show ' + (items.length - 4) + ' more';
      });
      dom.appendChild(btn);
    });
  })();

  /* ── 23. INTERSECTION OBSERVER COUNTER RE-ANIMATE ── */
  (function initCounterReanimate() {
    var counters = document.querySelectorAll('.is-num,[data-count]');
    if (!counters.length) return;
    var cObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var el = e.target;
          var target = parseInt(el.getAttribute('data-count') || el.textContent, 10);
          if (isNaN(target)) return;
          var suffix = el.textContent.replace(/[\d,]+/, '');
          var start = 0;
          var duration = 1200;
          var startTime = null;
          function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function(c) { cObs.observe(c); });
  })();

  /* ── 24. SMOOTH ANCHOR SCROLLING WITH OFFSET ── */
  (function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var href = a.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var offset = 80;
        var y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        history.replaceState(null, '', href);
      });
    });
  })();

  /* ── 25. IMAGE PROGRESSIVE LOAD ── */
  (function initProgressiveImages() {
    document.querySelectorAll('img[data-src]').forEach(function(img) {
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) {
            var i = e.target;
            i.src = i.getAttribute('data-src');
            i.removeAttribute('data-src');
            i.style.transition = 'opacity .5s ease';
            i.style.opacity = '0';
            i.onload = function() { i.style.opacity = '1'; };
            obs.unobserve(i);
          }
        });
      }, { rootMargin: '100px' });
      obs.observe(img);
    });
  })();

  /* ── 26. KEYBOARD NAV MODE DETECTION ── */
  (function initKeyboardNavDetection() {
    var isKeyboard = false;
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        isKeyboard = true;
        document.body.classList.add('keyboard-nav-active');
      }
    });
    document.addEventListener('mousedown', function() {
      if (isKeyboard) {
        isKeyboard = false;
        document.body.classList.remove('keyboard-nav-active');
      }
    });
  })();

  /* ── 27. SCROLL-TRIGGERED PROGRESS BARS ── */
  (function initScrollBars() {
    var bars = document.querySelectorAll('.skill-bar-fill,[data-width]');
    if (!bars.length) return;
    var bObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var bar = e.target;
          var w = bar.getAttribute('data-width') || bar.style.width;
          bar.style.width = '0%';
          requestAnimationFrame(function() {
            bar.style.transition = 'width 1s cubic-bezier(.34,1.56,.64,1)';
            bar.style.width = w;
          });
          bObs.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });
    bars.forEach(function(b) { bObs.observe(b); });
  })();

  /* ── 28. THEME PERSISTENCE ── */
  (function initThemePersist() {
    var saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
    var toggle = document.querySelector('.theme-toggle,[data-theme-toggle]');
    if (!toggle) return;
    toggle.addEventListener('click', function() {
      var curr = document.documentElement.getAttribute('data-theme');
      var next = curr === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
    });
  })();

  /* ── 29. PERFORMANCE MONITOR (DEV ONLY) ── */
  (function initPerfMonitor() {
    if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') return;
    var perfDiv = document.createElement('div');
    perfDiv.style.cssText = 'position:fixed;bottom:8px;left:8px;padding:4px 8px;background:rgba(0,0,0,.7);color:#0f0;font-family:monospace;font-size:11px;z-index:99999;border-radius:4px;pointer-events:none;';
    document.body.appendChild(perfDiv);
    var frames = 0, last = performance.now();
    function loop(now) {
      frames++;
      if (now - last >= 1000) {
        perfDiv.textContent = frames + ' FPS | ' + Math.round(performance.memory ? performance.memory.usedJSHeapSize / 1048576 : 0) + ' MB';
        frames = 0; last = now;
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  })();

  /* ── 30. PREFERS REDUCED MOTION RESPECT ── */
  (function respectReducedMotion() {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('[data-aos]').forEach(function(el) {
      el.removeAttribute('data-aos');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    var style = document.createElement('style');
    style.textContent = '*,*::before,*::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important;scroll-behavior:auto!important;}';
    document.head.appendChild(style);
  })();

  /* ═══════════════════════════════════════════════════════
     V17 PROTOTYPE POLISH — JS Micro-Interactions
     ═══════════════════════════════════════════════════════ */

  /* ── 31. RIPPLE EFFECT ON BUTTONS ── */
  (function initRipple() {
    document.querySelectorAll('.ripple-btn,.cta-primary,.cta-secondary,button[type="submit"]').forEach(function(btn) {
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.addEventListener('click', function(e) {
        var rect = btn.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height) * 2;
        var wave = document.createElement('span');
        wave.className = 'ripple-wave';
        wave.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,.3);pointer-events:none;animation:ripple .6s ease-out forwards;width:'+size+'px;height:'+size+'px;left:'+(e.clientX-rect.left-size/2)+'px;top:'+(e.clientY-rect.top-size/2)+'px;';
        btn.appendChild(wave);
        setTimeout(function() { wave.remove(); }, 700);
      });
    });
  })();

  /* ── 32. FAQ ACCORDION SMOOTH TOGGLE ── */
  (function initFAQAccordion() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;
    items.forEach(function(item) {
      var toggle = item.querySelector('.faq-toggle,.faq-q');
      if (!toggle) return;
      toggle.addEventListener('click', function() {
        var wasActive = item.classList.contains('active');
        items.forEach(function(i) { i.classList.remove('active'); });
        if (!wasActive) item.classList.add('active');
      });
    });
  })();

  /* ── 33. ACCORDION V2 GENERAL ── */
  (function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(function(header) {
      header.addEventListener('click', function() {
        var item = header.closest('.accordion-item');
        if (!item) return;
        var wasActive = item.classList.contains('active');
        var accordion = item.closest('.accordion');
        if (accordion) {
          accordion.querySelectorAll('.accordion-item').forEach(function(i) {
            i.classList.remove('active');
          });
        }
        if (!wasActive) item.classList.add('active');
      });
    });
  })();

  /* ── 34. TOOLTIP POSITION FIX ── */
  (function initTooltipFix() {
    document.querySelectorAll('.tooltip-v2[data-tip]').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        var tip = el.querySelector('.tooltip-generated');
        if (!tip) return;
        var rect = tip.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          tip.style.left = 'auto';
          tip.style.right = '0';
          tip.style.transform = 'none';
        }
        if (rect.left < 0) {
          tip.style.left = '0';
          tip.style.transform = 'none';
        }
      });
    });
  })();

  /* ── 35. NUMBER STEPPER ── */
  (function initSteppers() {
    document.querySelectorAll('.number-stepper').forEach(function(wrap) {
      var input = wrap.querySelector('input');
      var btns = wrap.querySelectorAll('button');
      if (!input || btns.length < 2) return;
      var min = parseInt(input.min, 10) || 0;
      var max = parseInt(input.max, 10) || 999;
      btns[0].addEventListener('click', function() {
        var v = parseInt(input.value, 10) || 0;
        if (v > min) { input.value = v - 1; input.dispatchEvent(new Event('change')); }
      });
      btns[1].addEventListener('click', function() {
        var v = parseInt(input.value, 10) || 0;
        if (v < max) { input.value = v + 1; input.dispatchEvent(new Event('change')); }
      });
    });
  })();

  /* ── 36. TOGGLE SWITCH ── */
  (function initToggles() {
    document.querySelectorAll('.toggle-switch input').forEach(function(inp) {
      inp.addEventListener('change', function() {
        var ev = new CustomEvent('toggle-change', { detail: { checked: inp.checked } });
        inp.closest('.toggle-switch').dispatchEvent(ev);
      });
    });
  })();

  /* ── 37. IMAGE COMPARE SLIDER ── */
  (function initImageCompare() {
    document.querySelectorAll('.img-compare').forEach(function(wrap) {
      var handle = wrap.querySelector('.img-compare-handle');
      var before = wrap.querySelector('.img-compare-before');
      if (!handle || !before) return;
      var dragging = false;
      function update(x) {
        var rect = wrap.getBoundingClientRect();
        var pct = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
        handle.style.left = pct + '%';
        before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      }
      handle.addEventListener('mousedown', function() { dragging = true; });
      handle.addEventListener('touchstart', function() { dragging = true; }, { passive: true });
      window.addEventListener('mouseup', function() { dragging = false; });
      window.addEventListener('touchend', function() { dragging = false; });
      window.addEventListener('mousemove', function(e) { if (dragging) update(e.clientX); });
      window.addEventListener('touchmove', function(e) { if (dragging) update(e.touches[0].clientX); }, { passive: true });
    });
  })();

  /* ── 38. SEARCH INPUT CLEAR ── */
  (function initSearchClear() {
    document.querySelectorAll('.search-clear').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var wrap = btn.closest('.search-input-wrap');
        if (!wrap) return;
        var input = wrap.querySelector('input');
        if (input) { input.value = ''; input.focus(); input.dispatchEvent(new Event('input')); }
      });
    });
  })();

  /* ── 39. SCROLL TO TOP ENHANCED ── */
  (function initScrollTopV2() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    var lastY = 0;
    window.addEventListener('scroll', function() {
      var y = window.scrollY;
      if (y > 400) {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        btn.style.transform = y < lastY ? 'translateY(0)' : 'translateY(80px)';
      } else {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
      }
      lastY = y;
    }, { passive: true });
  })();

  /* ── 40. CHAR COUNT FOR TEXTAREAS ── */
  (function initCharCount() {
    document.querySelectorAll('.form-textarea[maxlength]').forEach(function(ta) {
      var max = parseInt(ta.getAttribute('maxlength'), 10);
      var counter = ta.parentElement.querySelector('.form-char-count');
      if (!counter) {
        counter = document.createElement('div');
        counter.className = 'form-char-count';
        ta.parentElement.appendChild(counter);
      }
      function update() { counter.textContent = ta.value.length + '/' + max; }
      ta.addEventListener('input', update);
      update();
    });
  })();

  /* ── 41. FLOATING LABEL INTERACTION ── */
  (function initFloatLabels() {
    document.querySelectorAll('.float-label input, .float-label textarea').forEach(function(el) {
      if (!el.placeholder) el.setAttribute('placeholder', ' ');
    });
  })();

  /* ── 42. FORM VALIDATION FEEDBACK ── */
  (function initFormValidation() {
    var form = document.querySelector('form[action*="formspree"]');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      var valid = true;
      form.querySelectorAll('[required]').forEach(function(field) {
        field.classList.remove('error', 'success');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        } else {
          field.classList.add('success');
        }
      });
      if (!valid) e.preventDefault();
    });
    form.querySelectorAll('[required]').forEach(function(field) {
      field.addEventListener('blur', function() {
        field.classList.remove('error', 'success');
        if (!field.value.trim()) {
          field.classList.add('error');
        } else {
          field.classList.add('success');
        }
      });
    });
  })();

  /* ── 43. EXTERNAL LINK INDICATOR ── */
  (function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(function(a) {
      if (a.hostname === location.hostname) return;
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });
  })();

  /* ── 44. COPY CODE BLOCK ── */
  (function initCodeCopy() {
    document.querySelectorAll('pre code').forEach(function(block) {
      var pre = block.parentElement;
      pre.style.position = 'relative';
      var btn = document.createElement('button');
      btn.textContent = 'Copy';
      btn.style.cssText = 'position:absolute;top:8px;right:8px;padding:3px 10px;font-size:.72rem;font-weight:600;background:var(--bg-alt);border:1px solid var(--border);border-radius:4px;cursor:pointer;color:var(--text-muted);transition:all .2s;';
      btn.addEventListener('click', function() {
        navigator.clipboard.writeText(block.textContent).then(function() {
          btn.textContent = 'Copied!';
          btn.style.color = 'var(--green)';
          setTimeout(function() { btn.textContent = 'Copy'; btn.style.color = ''; }, 2000);
        });
      });
      pre.appendChild(btn);
    });
  })();

  /* ── 45. PAGE VISIBILITY — Pause Animations ── */
  (function initVisibilityPause() {
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
      } else {
        document.body.style.animationPlayState = 'running';
      }
    });
  })();

})();
