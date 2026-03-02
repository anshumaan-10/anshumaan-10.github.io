/* ============================================================
   Anshumaan Singh Portfolio — script.js
   Maps to index.html IDs / classes.
   Author: Anshumaan Singh | www.devsecopswithanshu.com
   ============================================================ */
"use strict";

/* ── CONFIG ── */
const TOPBAR_H       = 80;
const PARTICLE_COUNT = 50;
const MAX_DIST       = 140;

const TYPED_PHRASES = [
  "Security Systems Engineer",
  "Kubernetes Security Specialist",
  "Cloud & Container Security",
  "DevSecOps Practitioner",
  "Threat Modeler & Risk Analyst",
  "SBOM & Supply‑Chain Security",
  "Zero‑Trust Architecture Advocate",
];

const CMDK_ITEMS = [
  { icon:"👤", label:"About Me",          action:()=>scrollToSection("about") },
  { icon:"🏗️", label:"Architecture",      action:()=>scrollToSection("architecture") },
  { icon:"💼", label:"Experience",        action:()=>scrollToSection("experience") },
  { icon:"📂", label:"Projects",          action:()=>scrollToSection("projects") },
  { icon:"✍️", label:"Writing & Blog",     action:()=>scrollToSection("writing") },
  { icon:"🗺️", label:"Explorer",          action:()=>scrollToSection("explorer") },
  { icon:"🧠", label:"Skills",            action:()=>scrollToSection("skills") },
  { icon:"🏅", label:"Certifications",    action:()=>scrollToSection("certs") },
  { icon:"🔬", label:"Case Studies",      action:()=>scrollToSection("case-studies") },
  { icon:"📊", label:"Threat Model",      action:()=>scrollToSection("threat-model") },
  { icon:"📈", label:"Risk Engine",       action:()=>scrollToSection("risk-engine") },
  { icon:"🎓", label:"Education",         action:()=>scrollToSection("education") },
  { icon:"📬", label:"Connect",           action:()=>scrollToSection("connect") },
  { icon:"🌓", label:"Toggle Theme",      action:()=>toggleTheme() },
  { icon:"🟣", label:"Violet Accent",     action:()=>setAccent("violet") },
  { icon:"🩵", label:"Cyan Accent",       action:()=>setAccent("cyan") },
  { icon:"🥇", label:"Gold Accent",       action:()=>setAccent("gold") },
  { icon:"📄", label:"Download CV (PDF)", action:()=>generatePDF() },
  { icon:"📧", label:"Copy Email",        action:()=>copyEmail() },
  { icon:"💼", label:"Open LinkedIn",     action:()=>window.open("https://www.linkedin.com/in/anshumaan-singh-6b51b5239/","_blank") },
  { icon:"🐙", label:"Open GitHub",       action:()=>window.open("https://github.com/anshumaan-10","_blank") },
  { icon:"✍️", label:"Open Medium Blog",  action:()=>window.open("https://medium.com/@anshumaansingh10jan","_blank") },
];

/* ── UTILITIES ── */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const byId = id => document.getElementById(id);

function scrollToSection(id) {
  const el = byId(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - TOPBAR_H - 8;
  window.scrollTo({ top: y, behavior: "smooth" });
  // Update URL hash so the browser address bar reflects the section
  const hash = (id === 'top') ? location.pathname : '#' + id;
  history.pushState({ section: id }, '', hash);
}

function showToast(msg) {
  const t = byId("toast") || $(".toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t.__tid);
  t.__tid = setTimeout(() => t.classList.remove("show"), 2800);
}

/* ── LOADER + HASH-ON-LOAD ── */
// Reliability: ensure loader is removed even if external scripts block window.load
document.addEventListener("DOMContentLoaded", () => {
  const l = document.getElementById("loader");
  if (l) setTimeout(() => l.classList.add("hide"), 2000);
});

window.addEventListener("load", () => {
  // ── Terminal boot sequence ──
  const loader   = byId("loader");
  const fill     = byId("loaderFill");
  const scanLine = byId("ltScan");
  const doneLine = byId("ltDone");

  // Hard-timeout failsafe: loader NEVER blocks user > 2s
  const hideLoaderNow = () => {
    if (loader) {
      loader.classList.add("hide");
      // Clear DOM node after transition
      setTimeout(() => { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 600);
      // Trigger counters after loader hides
      setTimeout(() => {
        $$("[data-target]").forEach(el => animateCounter(el));
      }, 100);
    }
  };
  const loaderKill = setTimeout(hideLoaderNow, 1200);

  if (loader && fill) {
    // Animate progress bar — fast boot sequence
    let pct = 0;
    const tick = setInterval(() => {
      pct = Math.min(pct + (Math.random() * 45 + 22), 100);
      fill.style.width = pct + "%";
      if (pct >= 100) {
        clearInterval(tick);
        clearTimeout(loaderKill);
        if (scanLine) scanLine.style.display = "none";
        if (doneLine) doneLine.style.display = "flex";
        setTimeout(hideLoaderNow, 280);
      }
    }, 60);
  } else if (loader) {
    clearTimeout(loaderKill);
    setTimeout(hideLoaderNow, 500);
  }

  const yr = byId("year");
  if (yr) yr.textContent = new Date().getFullYear();
  // If URL has a hash, scroll to it after loader clears
  if (location.hash) {
    const id = location.hash.slice(1);
    setTimeout(() => scrollToSection(id), 900);
  }
  // Trigger counters that are already in viewport on page load
  setTimeout(() => {
    $$(".counter[data-target]").forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.5) animateCounter(el);
    });
  }, 400);
});

/* ── SCROLL PROGRESS ── */
const progressBar = $(".scroll-progress");
window.addEventListener("scroll", onScroll, { passive:true });

function onScroll() {
  const doc = document.documentElement;
  const pct = window.scrollY / (doc.scrollHeight - doc.clientHeight);
  if (progressBar) progressBar.style.transform = `scaleX(${Math.min(pct, 1)})`;

  // Topbar shadow
  const tb = $(".topbar");
  if (tb) tb.classList.toggle("shadow", window.scrollY > 12);

  // Back to top
  const btt = byId("backToTop");
  if (btt) {
    btt.classList.toggle("visible", window.scrollY > 400);
    btt.setAttribute("aria-hidden", window.scrollY <= 400 ? "true" : "false");
  }

  highlightNav();
  highlightDots();
}

/* ── SMOOTH NAV LINKS ── */
$$("a[href^='#']").forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href").slice(1);
    if (document.getElementById(id)) {
      e.preventDefault(); scrollToSection(id);
    }
  });
});

/* ── NAV SLIDER ── */
const navSlider = byId("navSlider");
const navLinks  = $$(".nav-link");

function moveSlider(el) {
  if (!navSlider || !el) return;
  const navEl = byId("desktopNav");
  if (!navEl) return;
  const nr = navEl.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  navSlider.style.left  = (er.left - nr.left) + "px";
  navSlider.style.width = er.width + "px";
}

navLinks.forEach(l => l.addEventListener("mouseenter", () => moveSlider(l)));
byId("desktopNav")?.addEventListener("mouseleave", () => {
  const active = navLinks.find(l => l.classList.contains("active"));
  if (active) moveSlider(active); else if (navSlider) navSlider.style.width = "0";
});

function highlightNav() {
  const sections = $$("section[id]");
  let current = "";
  sections.forEach(s => {
    if (s.getBoundingClientRect().top < TOPBAR_H + 80) current = s.id;
  });
  navLinks.forEach(l => {
    const id = l.getAttribute("data-nav") || l.getAttribute("href")?.slice(1);
    const match = id === current;
    l.classList.toggle("active", match);
    if (match) moveSlider(l);
  });
}

/* ── SECTION DOTS ── */
function highlightDots() {
  const allSections = $$("section[id]");
  let current = "";
  allSections.forEach(s => {
    if (s.getBoundingClientRect().top < TOPBAR_H + 120) current = s.id;
  });
  $$(".sdot").forEach(d => {
    const id = d.getAttribute("data-s") || d.getAttribute("href")?.slice(1);
    d.classList.toggle("active", id === current);
  });
}

/* ── MOBILE DRAWER ── */
const hamburger   = byId("hamburgerBtn");
const drawer      = byId("mobileDrawer");
const drawerClose = byId("drawerCloseBtn");

function openDrawer()  {
  drawer?.classList.add("open");
  hamburger?.classList.add("open");
  hamburger?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  drawer?.classList.remove("open");
  hamburger?.classList.remove("open");
  hamburger?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

hamburger?.addEventListener("click", () => drawer?.classList.contains("open") ? closeDrawer() : openDrawer());
drawerClose?.addEventListener("click", closeDrawer);
$$(".mnav").forEach(l => l.addEventListener("click", closeDrawer));
drawer?.addEventListener("click", e => { if (e.target === drawer) closeDrawer(); });

/* ── CUSTOM CURSOR — single unified implementation below (V9) ── */
/* old left/top cursor removed — V9 uses transform exclusively */

/* ── TYPED EFFECT ── */
(function typedEffect() {
  const el = byId("typingTarget");
  if (!el) return;
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = TYPED_PHRASES[pi];
    if (!deleting) {
      ci++;
      el.textContent = phrase.slice(0, ci);
      if (ci === phrase.length) { deleting = true; setTimeout(tick, 2000); return; }
      setTimeout(tick, 55);
    } else {
      ci--;
      el.textContent = phrase.slice(0, ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % TYPED_PHRASES.length; setTimeout(tick, 400); return; }
      setTimeout(tick, 28);
    }
  }
  tick();
})();

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); revealObs.unobserve(e.target); } });
}, { threshold: 0.07 });

$$(".reveal, .scroll-reveal-item").forEach(el => revealObs.observe(el));

/* ── KPI COUNTERS ── */
function easeOutCubic(p) { return 1 - Math.pow(1 - p, 3); }

function animateCounter(el) {
  const target = parseFloat(el.dataset.target || "0");
  const suffix = el.dataset.suffix || "";
  const dec    = el.dataset.dec ? parseInt(el.dataset.dec) : 0;
  const dur    = 1600;
  let start    = null;

  function step(ts) {
    if (!start) start = ts;
    const p   = Math.min((ts - start) / dur, 1);
    const val = target * easeOutCubic(p);
    el.textContent = val.toFixed(dec) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); }
  });
}, { threshold: 0.1 });

$$(".counter[data-target]").forEach(el => counterObs.observe(el));

/* ── 3D TILT ── */
$$(".tilt-el, .tilt").forEach(card => {
  const MAX_ROT = 10;
  card.addEventListener("mousemove", e => {
    const r  = card.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    card.style.transform = `perspective(700px) rotateX(${-dy * MAX_ROT}deg) rotateY(${dx * MAX_ROT}deg) scale(1.02)`;
    card.style.setProperty("--mouse-x", `${((e.clientX - r.left) / r.width  * 100)}%`);
    card.style.setProperty("--mouse-y", `${((e.clientY - r.top)  / r.height * 100)}%`);
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.removeProperty("--mouse-x");
    card.style.removeProperty("--mouse-y");
  });
});

/* Spotlight on regular cards */
$$(".card:not(.tilt-el):not(.tilt), .cert-card, .proj-card, .connect-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${((e.clientX - r.left) / r.width  * 100)}%`);
    card.style.setProperty("--mouse-y", `${((e.clientY - r.top)  / r.height * 100)}%`);
  });
});

/* ── MAGNETIC BUTTONS ── */
$$(".magnetic").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const r  = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
  });
  btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
});

/* ── PARTICLE CANVAS ── */
(function particles() {
  const canvas = byId("particleCanvas");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) { canvas.style.display = "none"; return; }

  const ctx = canvas.getContext("2d");
  let nodes = [];
  let W, H;

  function getAccentColor() {
    const s = getComputedStyle(document.documentElement);
    const r = s.getPropertyValue("--accent-r").trim() || "139";
    const g = s.getPropertyValue("--accent-g").trim() || "92";
    const b = s.getPropertyValue("--accent-b").trim() || "246";
    return { r: parseInt(r), g: parseInt(g), b: parseInt(b) };
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    nodes = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r:  Math.random() * 2 + 1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const ac = getAccentColor();

    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
      if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ac.r},${ac.g},${ac.b},0.5)`;
      ctx.fill();
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          const alpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.strokeStyle = `rgba(${ac.r},${ac.g},${ac.b},${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener("resize", init);
})();

/* ── COPY EMAIL ── */
function copyEmail() {
  navigator.clipboard.writeText("anshumaansingh10jan@gmail.com")
    .then(() => showToast("📧 Email copied!"))
    .catch(() => showToast("anshumaansingh10jan@gmail.com"));
}
byId("copyEmailBtn")?.addEventListener("click", copyEmail);

/* ── THEME TOGGLE ── */
function toggleTheme() {
  const html = document.documentElement;
  const next = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = next;
  if (next === "light") {
    localStorage.setItem("as-theme-pref", "light");
  } else {
    localStorage.removeItem("as-theme-pref");
  }
  const icon = byId("themeIcon");
  if (icon) icon.textContent = next === "dark" ? "🌙" : "☀️";
  showToast(next === "dark" ? "🌙 Dark mode" : "☀️ Light mode");
}
byId("themeToggleBtn")?.addEventListener("click", toggleTheme);
byId("themeToggleBtnMobile")?.addEventListener("click", () => { closeDrawer(); toggleTheme(); });

/* ── ACCENT SWITCHER ── */
function setAccent(name) {
  document.documentElement.dataset.accent = name;
  localStorage.setItem("as-accent", name);
  $$(".accent-dot").forEach(d => d.classList.toggle("active", d.dataset.accent === name));
  showToast(`Accent: ${name}`);
}

$$(".accent-dot").forEach(d => d.addEventListener("click", () => setAccent(d.dataset.accent)));
document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

/* Sync persisted preferences — dark mode is ALWAYS the default on every visit */
(function syncUI() {
  const accent = localStorage.getItem("as-accent") || document.documentElement.dataset.accent || "violet";
  // Only restore light mode if user explicitly switched to it in this device profile
  const savedTheme = localStorage.getItem("as-theme-pref");
  const theme = savedTheme || "dark";
  document.documentElement.dataset.accent = accent;
  document.documentElement.dataset.theme  = theme;
  $$(".accent-dot").forEach(d => d.classList.toggle("active", d.dataset.accent === accent));
  const icon = byId("themeIcon");
  if (icon) icon.textContent = theme === "dark" ? "🌙" : "☀️";
})();

/* ── COMMAND PALETTE ── */
const cmdkOverlay = byId("cmdkOverlay");
const cmdkInput   = byId("cmdkInput");
const cmdkResults = byId("cmdkResults");
let cmdkIndex     = -1;
let cmdkFiltered  = [];

function openCmdk() {
  if (!cmdkOverlay) return;
  cmdkOverlay.classList.add("open");
  cmdkOverlay.setAttribute("aria-hidden", "false");
  if (cmdkInput) cmdkInput.value = "";
  renderCmdk("");
  setTimeout(() => cmdkInput?.focus(), 60);
}
function closeCmdk() {
  cmdkOverlay?.classList.remove("open");
  cmdkOverlay?.setAttribute("aria-hidden", "true");
}

function renderCmdk(q) {
  if (!cmdkResults) return;
  cmdkFiltered = CMDK_ITEMS.filter(i => i.label.toLowerCase().includes(q.toLowerCase()));
  cmdkIndex = -1;
  cmdkResults.innerHTML = cmdkFiltered.map((item, idx) =>
    `<div class="cmdk-item" data-idx="${idx}" role="option" tabindex="-1">
      <span class="cmdk-item-icon" aria-hidden="true">${item.icon}</span>
      <span class="cmdk-item-label">${item.label}</span>
    </div>`
  ).join("");

  cmdkResults.querySelectorAll(".cmdk-item").forEach((el, idx) => {
    el.addEventListener("click", () => { closeCmdk(); cmdkFiltered[idx]?.action(); });
    el.addEventListener("mouseenter", () => { cmdkIndex = idx; highlightCmdk(); });
  });
}

function highlightCmdk() {
  $$(".cmdk-item").forEach((el, i) => el.classList.toggle("active", i === cmdkIndex));
  cmdkResults?.querySelector(".cmdk-item.active")?.scrollIntoView({ block: "nearest" });
}

cmdkInput?.addEventListener("input", e => renderCmdk(e.target.value));
cmdkInput?.addEventListener("keydown", e => {
  const items = $$(".cmdk-item");
  if (e.key === "ArrowDown") { e.preventDefault(); cmdkIndex = Math.min(cmdkIndex + 1, items.length - 1); highlightCmdk(); }
  else if (e.key === "ArrowUp")  { e.preventDefault(); cmdkIndex = Math.max(cmdkIndex - 1, 0); highlightCmdk(); }
  else if (e.key === "Enter")    { closeCmdk(); cmdkFiltered[cmdkIndex]?.action(); }
  else if (e.key === "Escape")   { closeCmdk(); }
});

cmdkOverlay?.addEventListener("click", e => { if (e.target === cmdkOverlay) closeCmdk(); });

document.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); openCmdk(); }
  if (e.key === "Escape" && cmdkOverlay?.classList.contains("open")) closeCmdk();
});

byId("cmdkBtn")?.addEventListener("click", openCmdk);
byId("cmdkBtnMobile")?.addEventListener("click", () => { closeDrawer(); openCmdk(); });
byId("cmdkCloseBtn")?.addEventListener("click", closeCmdk);

/* ── PDF / RESUME — Open Google Drive view ── */
function generatePDF() {
  // Open the Google Drive resume view directly — clean, professional, always current
  window.open("https://drive.google.com/file/d/1jszWhJhFO3DbrWxVLpTgekNKkPDKPObb/view", "_blank", "noopener,noreferrer");
  showToast("📄 Opening resume on Google Drive…");
}

["downloadPdfBtn", "downloadPdfBtnMobile", "downloadPdfBtnHero"].forEach(id => {
  byId(id)?.addEventListener("click", generatePDF);
});

/* ── BACK TO TOP ── */
byId("backToTop")?.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));

/* ── LIGHTBOX ── */
(function initLightbox() {
  const lightbox      = byId("archLightbox");
  const lightboxBg    = byId("lightboxBg");
  const lightboxClose = byId("lightboxClose");
  const archImgWrap   = byId("archImgWrap");

  function openLightbox()  { lightbox?.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeLightbox() { lightbox?.classList.remove("open"); document.body.style.overflow = ""; }

  archImgWrap?.addEventListener("click", openLightbox);
  archImgWrap?.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(); } });
  lightboxBg?.addEventListener("click", closeLightbox);
  lightboxClose?.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && lightbox?.classList.contains("open")) closeLightbox();
  });
})();

/* ── SKILL BARS ── */
(function initSkillBars() {
  const sbObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const pct = e.target.dataset.pct || "0";
        e.target.style.width = pct + "%";
        sbObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  $$(".sb-fill[data-pct]").forEach(el => sbObs.observe(el));
})();

/* ── LOGO IMAGE FALLBACK — hide broken simpleicons silently ── */
$$("img[src*='simpleicons']").forEach(img => {
  img.addEventListener("error", function() {
    this.style.display = "none";
    // Show a text badge fallback
    const badge = document.createElement("span");
    badge.textContent = this.alt || this.title || "?";
    badge.title = this.alt || this.title || "";
    badge.style.cssText = `
      display:inline-flex;align-items:center;justify-content:center;
      width:${this.width || 22}px;height:${this.height || 22}px;
      background:rgba(var(--accent-r,139),var(--accent-g,92),var(--accent-b,246),.15);
      border:1px solid rgba(var(--accent-r,139),var(--accent-g,92),var(--accent-b,246),.3);
      border-radius:4px;font-size:9px;font-family:var(--font-mono,'monospace');
      color:var(--accent,#8B5CF6);font-weight:600;letter-spacing:-.02em;
      vertical-align:middle;flex-shrink:0;
    `;
    this.parentNode.insertBefore(badge, this.nextSibling);
  });
});

/* ── INITIAL CALL ── */
onScroll();


/* ─────────────────────────────────────────────────
   MATRIX RAIN — Hacker Background
   Security-themed: binary, hex, CVE chars, symbols
   ───────────────────────────────────────────────── */
(function initMatrixRain() {
  const canvas = document.getElementById("matrix-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Character pools
  const BINARY   = "01";
  const HEX      = "0123456789ABCDEF";
  const SECURITY = "$#[]{}|/\\!@%^*+=-~<>?;:._,";
  const LABELS   = ["CVE","RCE","XSS","LFI","RFI","IAM","TLS","JWT","K8S","SSH",
                    "GPG","AES","RSA","SBOM","SAST","DAST","OWASP","SOC2","0x"];

  // Build full char pool: 50% binary, 30% hex, 20% security
  const CHARS = [];
  for (let i = 0; i < 200; i++) {
    if      (i < 100) CHARS.push(BINARY[Math.random() > .5 ? 1 : 0]);
    else if (i < 160) CHARS.push(HEX[Math.floor(Math.random() * HEX.length)]);
    else              CHARS.push(SECURITY[Math.floor(Math.random() * SECURITY.length)]);
  }

  const FONT_SIZE  = 14;
  const LABEL_PROB = 0.003;  // occasional security label burst
  const BASE_SPEED = 0.4;    // rows per frame (fractional)
  const OPACITY_CANVAS = 0.55;

  let cols, drops, speeds, chars;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols   = Math.floor(canvas.width  / FONT_SIZE);
    drops  = new Float32Array(cols).fill(-1);
    speeds = new Float32Array(cols).map(() => BASE_SPEED * (.5 + Math.random() * 1.2));
    chars  = Array.from({length: cols}, () => randomChar());

    // Stagger start positions so they don't all start at once
    for (let i = 0; i < cols; i++) {
      drops[i] = -Math.floor(Math.random() * (canvas.height / FONT_SIZE));
    }
  }

  function randomChar() {
    if (Math.random() < LABEL_PROB) {
      return LABELS[Math.floor(Math.random() * LABELS.length)];
    }
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  function draw() {
    // Fade trail — very dark with slight green
    ctx.fillStyle = "rgba(4, 8, 12, 0.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `600 ${FONT_SIZE}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < cols; i++) {
      const y = drops[i] * FONT_SIZE;
      if (y < -FONT_SIZE) { drops[i] += speeds[i]; continue; }

      const ch = chars[i];
      const isHead = drops[i] > 0;

      if (isHead) {
        // Bright head — white-green
        ctx.fillStyle = "rgba(180, 255, 200, 0.92)";
        ctx.shadowBlur   = 12;
        ctx.shadowColor  = "#00ff41";
      } else {
        // Body gradient fading
        const progress = y / canvas.height;
        const alpha = Math.max(0.04, 0.55 * (1 - progress * 0.7));
        ctx.fillStyle   = `rgba(0, 255, 65, ${alpha})`;
        ctx.shadowBlur  = 4;
        ctx.shadowColor = "transparent";
      }

      ctx.fillText(ch, i * FONT_SIZE, y);
      ctx.shadowBlur = 0;

      // Randomise char each frame occasionally
      if (Math.random() < 0.04) chars[i] = randomChar();

      // Advance drop
      drops[i] += speeds[i];

      // Reset after off-screen — random delay before next drop
      if (y > canvas.height + FONT_SIZE * 5) {
        drops[i] = -(Math.floor(Math.random() * 20) + 2);
        chars[i] = randomChar();
      }
    }
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  // Throttle to ~30fps for performance
  let last = 0;
  function loop(ts) {
    if (ts - last > 33) { draw(); last = ts; }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Pause when tab is hidden (save CPU)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(loop);
    else requestAnimationFrame(loop);
  });
})();


/* ─────────────────────────────────────────────────
   LIVE SECURITY FEED — auto-updates every 3s
   ───────────────────────────────────────────────── */
(function initLiveFeed() {
  const body = document.getElementById("liveLogBody");
  if (!body) return;

  const events = [
    { type: "ok",   msg: "Pipeline scan \u2014 0 criticals \u2014 promoted" },
    { type: "ok",   msg: "SBOM generated \u2014 digest: sha256:a3f2b1..4d" },
    { type: "ok",   msg: "K8s audit: 100% CIS compliant \u2014 pass" },
    { type: "warn", msg: "CVE-2024-3094 detected \u2014 EPSS 0.002 \u2014 accepted" },
    { type: "ok",   msg: "Secret scan: 0 exposed credentials found" },
    { type: "ok",   msg: "Image digest verified \u2014 UAT gate passed" },
    { type: "warn", msg: "IaC scan: 1 low-sev misconfiguration \u2014 patched" },
    { type: "ok",   msg: "OWASP ZAP DAST \u2014 93% coverage \u2014 no blockers" },
    { type: "ok",   msg: "Artifact promoted Dev\u2192UAT\u2192Prod \u2014 evidence retained" },
    { type: "ok",   msg: "Golden image build \u2014 CIS hardened \u2014 deployed" },
    { type: "warn", msg: "Anomaly detected \u2014 SIEM alert \u2014 false positive" },
    { type: "ok",   msg: "Runtime policy enforced \u2014 no privilege escalation" },
    { type: "ok",   msg: "Conditional Access: all sessions verified" },
    { type: "ok",   msg: "GitHub Enterprise audit log \u2014 no anomalies" },
    { type: "ok",   msg: "kubeaudit pass \u2014 0 risky workloads" },
  ];

  let idx = events.length; // start after initial entries

  function pad(n) { return String(n).padStart(2, "0"); }
  function ts() {
    const d = new Date();
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  function addEntry() {
    const e = events[idx % events.length];
    idx++;
    const div = document.createElement("div");
    div.className = `ll-entry ll-${e.type}`;
    div.innerHTML = `<span class="ll-ts mono">${ts()}</span> ${e.msg}`;
    body.appendChild(div);
    // keep max 12 entries
    while (body.children.length > 12) body.removeChild(body.firstChild);
    body.scrollTop = body.scrollHeight;
  }

  // Add new entry every 2.8s
  setInterval(addEntry, 2800);
})();

/* ─────────────────────────────────────────────────
   HERO TERMINAL: type-in effect on term-body lines
   ───────────────────────────────────────────────── */
(function animateTerminal() {
  const term = document.getElementById("termLines");
  if (!term) return;
  const lines = [...term.querySelectorAll("li")];
  lines.forEach(l => { l.style.opacity = "0"; });

  let delay = 800;
  lines.forEach((li, i) => {
    setTimeout(() => {
      li.style.opacity = "1";
      li.style.transition = "opacity 0.2s ease";
    }, delay);
    delay += li.classList.contains("t-section") ? 150 : 220;
  });
})();


/* ─────────────────────────────────────────────────────
   HACKER PORTFOLIO V7 — ENHANCED JS
   ───────────────────────────────────────────────────── */

/* ── CURSOR V9: single RAF loop, transform-only, no left/top conflict ── */
(function initCursorV9() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring || !window.matchMedia('(pointer:fine)').matches) return;

  // Hide native cursor
  document.documentElement.style.cursor = 'none';

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx, ry = my;
  let isDown = false, isHover = false;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  document.addEventListener('mousedown', () => {
    isDown = true;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%) scale(0.55)`;
  });
  document.addEventListener('mouseup', () => { isDown = false; });

  // Hover detection — include all interactive elements
  const hoverSel = 'a, button, [role=button], .card, .cert-card, .connect-card, .proj-card, .phil-card, .case-card, .edu-card, details, summary, .tilt-el, .nav-link, .mnav, .sdot, .tech-badge, .tag, .stag';
  document.querySelectorAll(hoverSel).forEach(el => {
    el.addEventListener('mouseenter', () => { isHover = true; document.body.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { isHover = false; document.body.classList.remove('hovering'); });
  });

  function tick() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;

    if (!isDown) {
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%) scale(1)`;
    }
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;

    if (isHover) {
      ring.style.width        = '46px';
      ring.style.height       = '46px';
      ring.style.borderColor  = 'rgba(0,255,65,.55)';
      ring.style.background   = 'rgba(0,255,65,.04)';
      dot.style.background    = '#00ff41';
      dot.style.width         = '7px';
      dot.style.height        = '7px';
    } else {
      ring.style.width        = '26px';
      ring.style.height       = '26px';
      ring.style.borderColor  = 'rgba(0,255,65,.35)';
      ring.style.background   = 'transparent';
      dot.style.background    = '#00ff41';
      dot.style.width         = '5px';
      dot.style.height        = '5px';
    }

    requestAnimationFrame(tick);
  }
  tick();
})();

/* ── 2. SCROLL REVEAL V7: stagger by index ── */
(function initRevealV7() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      const siblings = e.target.parentElement
        ? [...e.target.parentElement.querySelectorAll('.reveal')]
        : [];
      const idx = siblings.indexOf(e.target);
      setTimeout(() => {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }, Math.min(idx * 60, 400));
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
})();

/* ── 3. KPI COUNTER ANIMATION V7 ── */
(function initKPICounters() {
  document.querySelectorAll('.v7-val').forEach(el => {
    const text = el.textContent.trim();
    const match = text.match(/^(0x)?(\d+)(.*)$/);
    if (!match) return;
    const prefix = match[1] || '';
    const target = parseInt(match[2], prefix === '0x' ? 16 : 10);
    const suffix = match[3] || '';
    el.setAttribute('data-target', target);
    el.setAttribute('data-prefix', prefix);
    el.setAttribute('data-suffix', suffix);
    el.textContent = prefix + '0' + suffix;

    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      obs.unobserve(el);
      let start = 0;
      const dur = 1400;
      const startTime = performance.now();
      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / dur, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(ease * target);
        el.textContent = prefix + val + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target + suffix;
      }
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    obs.observe(el);
  });
})();

/* ── 4. SKILL BAR ANIMATION V7 ── */
(function initSkillBarsV7() {
  document.querySelectorAll('.sb-fill').forEach(bar => {
    const pct = bar.getAttribute('data-pct') || '0';
    bar.style.width = '0%';
    bar.style.transition = 'none';
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      obs.unobserve(bar);
      setTimeout(() => {
        bar.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
        bar.style.width = pct + '%';
      }, 100);
    }, { threshold: 0.5 });
    obs.observe(bar);
  });
})();

/* ── 5. SECTION ACTIVE NAV V7 ── */
(function initActiveNavV7() {
  const navLinks = document.querySelectorAll('.nav-link[data-nav]');
  const sections = [...navLinks].map(l => document.getElementById(l.dataset.nav)).filter(Boolean);

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(l => l.classList.toggle('active', l.dataset.nav === e.target.id));
    });
  }, { threshold: 0.35 });
  sections.forEach(s => obs.observe(s));
})();

/* ── 6. GLITCH EFFECT V7: intensify on scroll ── */
(function initGlitchV7() {
  const glitch = document.querySelector('.glitch-text');
  if (!glitch) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const dy = Math.abs(window.scrollY - lastY);
    lastY = window.scrollY;
    if (dy > 30) {
      glitch.classList.add('glitch-active');
      setTimeout(() => glitch.classList.remove('glitch-active'), 400);
    }
  }, { passive: true });
})();

/* ── 7. TILT CARDS V7 ── */
(function initTiltV7() {
  document.querySelectorAll('.tilt-el').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) / (r.width  / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      el.style.transform = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateZ(4px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();

/* ── 8. TYPING TARGET V7: multi-phrase typewriter ── */
(function initTyperV7() {
  const el = document.getElementById('typingTarget');
  if (!el) return;
  const phrases = [
    'DevSecOps engineer',
    'K8s security specialist',
    'supply-chain defender',
    'CI/CD gate-keeper',
    'zero-trust architect',
    'SBOM practitioner',
    'cloud security engineer',
  ];
  let pi = 0, ci = 0, deleting = false;
  function tick() {
    const phrase = phrases[pi % phrases.length];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci >= phrase.length) { deleting = true; setTimeout(tick, 1800); return; }
      setTimeout(tick, 60 + Math.random() * 40);
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi++; setTimeout(tick, 400); return; }
      setTimeout(tick, 35);
    }
  }
  tick();
})();


/* ══════════════════════════════════════════════════════════
   V10 — Explorer Terminal + Misc Enhancements
   ══════════════════════════════════════════════════════════ */

/* ── OTW Banner dismiss ── */
(function initOTWBanner() {
  const banner = document.getElementById('otwBanner');
  const closeBtn = document.getElementById('otwClose');
  if (!banner || !closeBtn) return;

  // Add body class to shift topbar
  document.body.classList.add('otw-visible');
  // Also push topbar below the banner
  const topbar = document.querySelector('.topbar');
  if (topbar) topbar.style.top = '40px';

  closeBtn.addEventListener('click', () => {
    banner.classList.add('hidden');
    document.body.classList.remove('otw-visible');
    if (topbar) topbar.style.top = '';
    try { localStorage.setItem('otwDismissed', '1'); } catch(e) {}
  });

  // Auto-dismiss if already dismissed
  try {
    if (localStorage.getItem('otwDismissed') === '1') {
      banner.classList.add('hidden');
      document.body.classList.remove('otw-visible');
      if (topbar) topbar.style.top = '';
    }
  } catch(e) {}
})();

/* ── Lazy image loaded class ── */
(function initLazyImages() {
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) { img.classList.add('loaded'); return; }
    img.addEventListener('load', () => img.classList.add('loaded'));
  });
})();

/* ── Last built date in footer ── */
(function initLastBuilt() {
  const el = document.getElementById('lastBuilt');
  if (!el) return;
  const d = new Date();
  el.textContent = d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
})();

/* ── Explorer Terminal ── */
(function initExplorerTerminal() {
  const input  = document.getElementById('explorerInput');
  const body   = document.getElementById('explorerBody');
  const chips  = document.querySelectorAll('.exp-hint-chip');
  if (!input || !body) return;

  const COMMANDS = {
    help: () => [
      `<span class="exp-out"><strong>Available commands:</strong></span>`,
      `<span class="exp-out">  <strong>whoami</strong>        — identity &amp; role</span>`,
      `<span class="exp-out">  <strong>skills</strong>        — technical proficiencies</span>`,
      `<span class="exp-out">  <strong>certs</strong>         — certifications (6 active)</span>`,
      `<span class="exp-out">  <strong>experience</strong>    — work history at ZEE</span>`,
      `<span class="exp-out">  <strong>projects</strong>      — open source repos</span>`,
      `<span class="exp-out">  <strong>github</strong>        — open GitHub profile</span>`,
      `<span class="exp-out">  <strong>contact</strong>       — contact information</span>`,
      `<span class="exp-out">  <strong>resume</strong>        — open resume PDF</span>`,
      `<span class="exp-out">  <strong>matrix</strong>        — ;)</span>`,
      `<span class="exp-out">  <strong>clear</strong>         — clear terminal</span>`,
    ],
    whoami: () => [
      `<span class="exp-out">┌─[ <strong>Identity</strong> ]</span>`,
      `<span class="exp-out">│  Name     : <strong>Anshumaan Singh</strong></span>`,
      `<span class="exp-out">│  Role     : InfoSec Analyst IC-2 @ ZEE Entertainment</span>`,
      `<span class="exp-out">│  Scope    : 350+ microservices · CI/CD · K8s · Cloud · AppSec</span>`,
      `<span class="exp-out">│  Location : Bengaluru, India</span>`,
      `<span class="exp-out">│  Certs    : CKS · CKA · GCP-SEC · GCP-PCA · GCP-ACE · TF-ASC</span>`,
      `<span class="exp-out">└─[ <strong>Status: ACTIVE ✓ · Zero production incidents</strong> ]</span>`,
    ],
    skills: () => [
      `<span class="exp-out">┌─[ <strong>Security Engineering</strong> ]</span>`,
      `<span class="exp-out">│  DevSecOps Engineering          ████████████████████ 95%</span>`,
      `<span class="exp-out">│  Kubernetes Security (CKS)      ███████████████████░ 92%</span>`,
      `<span class="exp-out">│  Supply Chain / SBOM            ██████████████████░░ 90%</span>`,
      `<span class="exp-out">│  Application Security           █████████████████░░░ 88%</span>`,
      `<span class="exp-out">│  Cloud Security (GCP/AWS/Azure) █████████████████░░░ 85%</span>`,
      `<span class="exp-out">│  Threat Modeling                ████████████████░░░░ 82%</span>`,
      `<span class="exp-out">│  Penetration Testing            ████████████████░░░░ 80%</span>`,
      `<span class="exp-out">└─[ CI/CD: 93% · K8s: 90% · Docker: 88% · Terraform: 82% ]</span>`,
    ],
    certs: () => [
      `<span class="exp-out">┌─[ <strong>Certifications · 6 Active</strong> ]</span>`,
      `<span class="exp-out">│  [✓] CKS  — Certified Kubernetes Security Specialist   (CNCF)</span>`,
      `<span class="exp-out">│  [✓] CKA  — Certified Kubernetes Administrator          (CNCF)</span>`,
      `<span class="exp-out">│  [✓] GCP-SEC — Professional Cloud Security Engineer   (Google)</span>`,
      `<span class="exp-out">│  [✓] GCP-PCA — Professional Cloud Architect           (Google)</span>`,
      `<span class="exp-out">│  [✓] TF-ASC  — HashiCorp Terraform Associate         (HashiCorp)</span>`,
      `<span class="exp-out">│  [✓] GCP-ACE — Associate Cloud Engineer               (Google)</span>`,
      `<span class="exp-out">└─[ Verify: <a href="https://www.credly.com/users/anshumaan-singh" target="_blank">credly.com/anshumaan-singh</a> ]</span>`,
    ],
    experience: () => [
      `<span class="exp-out">┌─[ <strong>Work History</strong> ]</span>`,
      `<span class="exp-out">│  Company  : ZEE Entertainment Enterprises Ltd</span>`,
      `<span class="exp-out">│  Role     : Information Security Analyst (IC-2)</span>`,
      `<span class="exp-out">│  Period   : Jun 2023 – Present  (Bengaluru, India)</span>`,
      `<span class="exp-out">│  Scope    : AppSec + DevSecOps — 350+ microservices</span>`,
      `<span class="exp-out">│  Impact   : CI/CD Security Control Plane (8-stage pipeline)</span>`,
      `<span class="exp-out">│           : 100% CIS K8s Benchmark · 93% OWASP Top 10</span>`,
      `<span class="exp-out">│           : SBOM + Cosign supply chain signing</span>`,
      `<span class="exp-out">│           : Golden Image pipeline · GitHub Enterprise hardening</span>`,
      `<span class="exp-out">└─[ <strong>0 production incidents on record</strong> ]</span>`,
    ],
    projects: () => [
      `<span class="exp-out">┌─[ <strong>Open Source Projects · github.com/anshumaan-10</strong> ]</span>`,
      `<span class="exp-out">│  k8s-security-lab          — 10 K8s misconfigs, exploited + hardened</span>`,
      `<span class="exp-out">│  phoenix                   — Vulnerable Flask app for K8s lab (RCE)</span>`,
      `<span class="exp-out">│  k8s-lab-deployments       — ArgoCD GitOps + K8s manifests</span>`,
      `<span class="exp-out">│  image-attestation-cosign  — Sigstore/Cosign supply chain signing</span>`,
      `<span class="exp-out">│  kyverno-policy-demo       — Policy-as-code admission control</span>`,
      `<span class="exp-out">│  custom-secret-regex       — Org-specific secret detection patterns</span>`,
      `<span class="exp-out">└─[ Total: 59 repositories · <a href="https://github.com/anshumaan-10" target="_blank">github.com/anshumaan-10</a> ]</span>`,
    ],
    github: () => {
      window.open('https://github.com/anshumaan-10', '_blank');
      return [`<span class="exp-out">Opening GitHub profile... <a href="https://github.com/anshumaan-10" target="_blank">github.com/anshumaan-10</a></span>`];
    },
    contact: () => [
      `<span class="exp-out">┌─[ <strong>Contact Channels</strong> ]</span>`,
      `<span class="exp-out">│  Email    : <a href="mailto:anshumaansingh10jan@gmail.com">anshumaansingh10jan@gmail.com</a></span>`,
      `<span class="exp-out">│  LinkedIn : <a href="https://www.linkedin.com/in/anshumaan-singh-6b51b5239/" target="_blank">linkedin.com/in/anshumaan-singh-6b51b5239</a></span>`,
      `<span class="exp-out">│  GitHub   : <a href="https://github.com/anshumaan-10" target="_blank">github.com/anshumaan-10</a></span>`,
      `<span class="exp-out">│  Medium   : <a href="https://medium.com/@anshumaansingh10jan" target="_blank">medium.com/@anshumaansingh10jan</a></span>`,
      `<span class="exp-out">└─[ Usually respond within 24h ]</span>`,
    ],
    resume: () => {
      window.open('https://drive.google.com/file/d/1jszWhJhFO3DbrWxVLpTgekNKkPDKPObb/view', '_blank');
      return [`<span class="exp-out">Opening resume PDF... <a href="https://drive.google.com/file/d/1jszWhJhFO3DbrWxVLpTgekNKkPDKPObb/view" target="_blank">Open Resume ↗</a></span>`];
    },
    matrix: () => [
      `<span class="exp-out" style="color:rgba(0,255,65,.9)">There is no spoon.</span>`,
      `<span class="exp-out" style="color:rgba(0,255,65,.7)">You already know the path. You just have to walk it.</span>`,
      `<span class="exp-out" style="color:rgba(0,255,65,.5)">// The Matrix of DevSecOps has you...</span>`,
    ],
    clear: () => { body.innerHTML = ''; return []; },
  };

  const AUTOCOMPLETE = Object.keys(COMMANDS);

  function addLines(cmd, lines) {
    // Show the command
    const cmdLine = document.createElement('div');
    cmdLine.className = 'exp-line';
    cmdLine.innerHTML = `<span class="exp-prompt mono accent-color">$ </span><span class="exp-cmd mono">${escapeHtml(cmd)}</span>`;
    body.appendChild(cmdLine);

    // Show output
    lines.forEach(l => {
      const div = document.createElement('div');
      div.className = 'exp-line';
      div.innerHTML = l;
      body.appendChild(div);
    });
    body.scrollTop = body.scrollHeight;
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (COMMANDS[cmd]) {
      const out = COMMANDS[cmd]();
      addLines(raw.trim(), out || []);
    } else {
      addLines(raw.trim(), [
        `<span class="exp-err">command not found: ${escapeHtml(cmd)}</span>`,
        `<span class="exp-out muted">Type <strong>help</strong> for available commands.</span>`,
      ]);
    }
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      runCommand(val);
    }
    // Tab autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.value.toLowerCase();
      const match = AUTOCOMPLETE.find(c => c.startsWith(val));
      if (match) input.value = match;
    }
  });

  // Click hint chips to run command
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.dataset.cmd;
      if (cmd) { input.value = cmd; runCommand(cmd); input.value = ''; }
    });
  });

  // Focus terminal when section is scrolled to
  const section = document.getElementById('explorer');
  if (section) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => input.focus(), 300);
        obs.unobserve(section);
      }
    }, { threshold: 0.4 });
    obs.observe(section);
  }
})();

/* ── Contact Form Handling ── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const origText = btn.innerHTML;
    btn.innerHTML = '⏳ Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btn.innerHTML = '✓ Message Sent!';
        btn.style.background = 'rgba(74,222,128,.2)';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.disabled = false;
          btn.style.background = '';
        }, 4000);
        // Show toast if available
        const toast = document.getElementById('toast');
        if (toast) {
          toast.textContent = 'Message sent! I\'ll reply within 24h.';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        }
      } else {
        throw new Error('Failed');
      }
    } catch {
      btn.innerHTML = '✕ Failed — try email instead';
      btn.style.background = 'rgba(255,100,100,.2)';
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.disabled = false;
        btn.style.background = '';
      }, 4000);
    }
  });
})();

/* ── AOS init ── */
(function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }
})();


/* ── BENGALURU LIVE CLOCK ── */
(function initBLRClock() {
  const el = document.getElementById('blrClock');
  if (!el) return;
  function tick() {
    const t = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });
    el.textContent = '📍 IST ' + t;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ── PLAIN ENGLISH BANNER DISMISS ── */
(function initPEI() {
  const btn = document.getElementById('peiClose');
  const banner = btn && btn.closest('.plain-english-intro');
  if (!btn || !banner) return;
  const KEY = 'pei_dismissed';
  if (localStorage.getItem(KEY)) { banner.remove(); return; }
  btn.addEventListener('click', () => {
    banner.style.transition = 'opacity .3s, transform .3s';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-8px)';
    setTimeout(() => banner.remove(), 320);
    localStorage.setItem(KEY, '1');
  });
})();

/* ── SECURITY THOUGHTS ROTATOR ── */
(function initThoughts() {
  const THOUGHTS = [
    '"Zero trust is not a product to buy — it\'s a mental model to apply. Every access decision should be made as if the network is already compromised."',
    '"The SBOM is not just an artifact — it is an evidence contract. If you can\'t enumerate what\'s in your container, you cannot claim to secure it."',
    '"The real threat model is not OWASP Top 10. It\'s the one your developers write feature tickets in Jira and forget to close. Shift threat modeling left — into design."',
    '"Security gates in CI/CD are not bottlenecks. They are the first place adversaries meet resistance. Build gates that fail gracefully and audit loudly."',
    '"A vulnerability with EPSS 0.001 and CVSS 9.8 is less urgent than one with EPSS 0.80 and CVSS 6.5. Context matters more than scores."',
    '"Kubernetes RBAC is not an access control system. It is an attack surface with a configuration language. Treat it accordingly."',
  ];
  let idx = 0;
  const el = document.getElementById('thoughtQuote');
  const btn = document.getElementById('thoughtNext');
  if (!el || !btn) return;
  btn.addEventListener('click', () => {
    el.style.opacity = '0';
    setTimeout(() => {
      idx = (idx + 1) % THOUGHTS.length;
      el.textContent = THOUGHTS[idx];
      el.style.opacity = '1';
    }, 200);
  });
  el.style.transition = 'opacity .2s';
})();

/* ── READING TIME BADGES ── */
(function addReadingTime() {
  document.querySelectorAll('.pub-card, .pub-card--wide').forEach(card => {
    if (card.querySelector('.rt-badge')) return;
    const text = card.textContent || '';
    const words = text.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    const badge = document.createElement('span');
    badge.className = 'rt-badge mono';
    badge.textContent = mins + ' min read';
    badge.setAttribute('aria-label', mins + ' minute read');
    // Insert after the meta row or title
    const meta = card.querySelector('.pub-meta, .pub-card-meta, .pub-tags');
    if (meta) meta.appendChild(badge);
  });
})();

/* ── SKILL BAR ANIMATION (robust version) ── */
(function fixSkillBars() {
  const fills = document.querySelectorAll('.sb-fill[data-pct], .sb-fill');
  const obs = ('IntersectionObserver' in window)
    ? new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const fill = e.target;
          const item = fill.closest('.skill-bar-item, .sb-item');
          const pct = (item && item.dataset.pct)
                   || fill.dataset.pct
                   || fill.style.getPropertyValue('--pct')?.replace('%','')
                   || '80';
          fill.style.transition = 'width 1.1s cubic-bezier(.4,0,.2,1)';
          fill.style.width = pct + '%';
          obs.unobserve(fill);
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' })
    : null;

  fills.forEach(el => {
    el.style.width = '0%';
    if (obs) obs.observe(el);
    else {
      const pct = el.dataset.pct || el.style.getPropertyValue('--pct')?.replace('%','') || '80';
      el.style.width = pct + '%';
    }
  });
})();

/* ── READING TIME BADGE CSS (injected via JS for isolation) ── */
(function injectRTStyle() {
  if (document.getElementById('rtStyle')) return;
  const s = document.createElement('style');
  s.id = 'rtStyle';
  s.textContent = `.rt-badge{font-size:.62rem;color:rgba(0,255,65,.5);background:rgba(0,200,60,.06);border:1px solid rgba(0,200,60,.12);border-radius:3px;padding:1px 6px;margin-left:8px;white-space:nowrap;}`;
  document.head.appendChild(s);
})();


/* ── BENGALURU LIVE CLOCK ── */
(function initBLRClock() {
  const el = document.getElementById('blrClock');
  if (!el) return;
  function tick() {
    const t = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });
    el.textContent = '📍 IST ' + t;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ── PLAIN ENGLISH BANNER DISMISS ── */
(function initPEI() {
  const btn = document.getElementById('peiClose');
  const banner = btn && btn.closest('.plain-english-intro');
  if (!btn || !banner) return;
  const KEY = 'pei_dismissed';
  if (localStorage.getItem(KEY)) { banner.remove(); return; }
  btn.addEventListener('click', () => {
    banner.style.transition = 'opacity .3s, transform .3s';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-8px)';
    setTimeout(() => banner.remove(), 320);
    localStorage.setItem(KEY, '1');
  });
})();

/* ── SECURITY THOUGHTS ROTATOR ── */
(function initThoughts() {
  const THOUGHTS = [
    '"Zero trust is not a product to buy — it\'s a mental model to apply. Every access decision should be made as if the network is already compromised."',
    '"The SBOM is not just an artifact — it is an evidence contract. If you can\'t enumerate what\'s in your container, you cannot claim to secure it."',
    '"The real threat model is not OWASP Top 10. It\'s the one your developers write feature tickets in Jira and forget to close. Shift threat modeling left — into design."',
    '"Security gates in CI/CD are not bottlenecks. They are the first place adversaries meet resistance. Build gates that fail gracefully and audit loudly."',
    '"A vulnerability with EPSS 0.001 and CVSS 9.8 is less urgent than one with EPSS 0.80 and CVSS 6.5. Context matters more than scores."',
    '"Kubernetes RBAC is not an access control system. It is an attack surface with a configuration language. Treat it accordingly."',
  ];
  let idx = 0;
  const el = document.getElementById('thoughtQuote');
  const btn = document.getElementById('thoughtNext');
  if (!el || !btn) return;
  btn.addEventListener('click', () => {
    el.style.opacity = '0';
    setTimeout(() => {
      idx = (idx + 1) % THOUGHTS.length;
      el.textContent = THOUGHTS[idx];
      el.style.opacity = '1';
    }, 200);
  });
  el.style.transition = 'opacity .2s';
})();

/* ── READING TIME BADGES ── */
(function addReadingTime() {
  document.querySelectorAll('.pub-card, .pub-card--wide').forEach(card => {
    if (card.querySelector('.rt-badge')) return;
    const text = card.textContent || '';
    const words = text.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    const badge = document.createElement('span');
    badge.className = 'rt-badge mono';
    badge.textContent = mins + ' min read';
    badge.setAttribute('aria-label', mins + ' minute read');
    // Insert after the meta row or title
    const meta = card.querySelector('.pub-meta, .pub-card-meta, .pub-tags');
    if (meta) meta.appendChild(badge);
  });
})();

/* ── SKILL BAR ANIMATION (robust version) ── */
(function fixSkillBars() {
  const fills = document.querySelectorAll('.sb-fill[data-pct], .sb-fill');
  const obs = ('IntersectionObserver' in window)
    ? new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const fill = e.target;
          const item = fill.closest('.skill-bar-item, .sb-item');
          const pct = (item && item.dataset.pct)
                   || fill.dataset.pct
                   || fill.style.getPropertyValue('--pct')?.replace('%','')
                   || '80';
          fill.style.transition = 'width 1.1s cubic-bezier(.4,0,.2,1)';
          fill.style.width = pct + '%';
          obs.unobserve(fill);
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' })
    : null;

  fills.forEach(el => {
    el.style.width = '0%';
    if (obs) obs.observe(el);
    else {
      const pct = el.dataset.pct || el.style.getPropertyValue('--pct')?.replace('%','') || '80';
      el.style.width = pct + '%';
    }
  });
})();

/* ── READING TIME BADGE CSS (injected via JS for isolation) ── */
(function injectRTStyle() {
  if (document.getElementById('rtStyle')) return;
  const s = document.createElement('style');
  s.id = 'rtStyle';
  s.textContent = `.rt-badge{font-size:.62rem;color:rgba(0,255,65,.5);background:rgba(0,200,60,.06);border:1px solid rgba(0,200,60,.12);border-radius:3px;padding:1px 6px;margin-left:8px;white-space:nowrap;}`;
  document.head.appendChild(s);
})();


/* ══ V12 JS ══ */

// ── Command Palette ─────────────────────────────────────────────────────────
(function initCommandPalette() {
  const COMMANDS = [
    { icon: '🏠', label: 'Home / Hero',        hint: '#hero',         action: () => scrollTo(0,0) },
    { icon: '👤', label: 'About',              hint: '#about',        action: () => document.getElementById('about')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '🛠', label: 'What I Built',       hint: '#build',        action: () => document.getElementById('build')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '🏗', label: 'Architecture',       hint: '#architecture', action: () => document.getElementById('architecture')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '📦', label: 'SBOM Pipeline',      hint: '#sbom-flow',    action: () => document.getElementById('sbom-flow')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '🔬', label: 'Evidence',           hint: '#evidence',     action: () => document.getElementById('evidence')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '📊', label: 'Risk Engine',        hint: '#risk-engine',  action: () => document.getElementById('risk-engine')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '💼', label: 'Experience',         hint: '#experience',   action: () => document.getElementById('experience')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '🎓', label: 'Education',          hint: '#education',    action: () => document.getElementById('education')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '🚀', label: 'Projects',           hint: '#projects',     action: () => document.getElementById('projects')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '💻', label: 'Terminal Explorer',  hint: '#explorer',     action: () => document.getElementById('explorer')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '📈', label: 'Skills',             hint: '#skills',       action: () => document.getElementById('skills')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '🏆', label: 'Certifications',     hint: '#certs',        action: () => document.getElementById('certs')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '⭐', label: 'Achievements',       hint: '#achievements', action: () => document.getElementById('achievements')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '❓', label: 'FAQ',                hint: '#faq',          action: () => document.getElementById('faq')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '✍️', label: 'Writing',            hint: '#writing',      action: () => document.getElementById('writing')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '📬', label: 'Contact / Connect',  hint: '#connect',      action: () => document.getElementById('connect')?.scrollIntoView({behavior:'smooth'}) },
    { icon: '📄', label: 'View Resume PDF',    hint: 'Google Drive',  action: () => window.open('https://drive.google.com/file/d/1jszWhJhFO3DbrWxVLpTgekNKkPDKPObb/view','_blank') },
    { icon: '🔗', label: 'LinkedIn',           hint: 'linkedin.com',  action: () => window.open('https://www.linkedin.com/in/anshumaan-singh-6b51b5239/','_blank') },
    { icon: '🐙', label: 'GitHub',             hint: 'github.com',    action: () => window.open('https://github.com/anshumaan-10','_blank') },
    { icon: '📧', label: 'Email',              hint: 'anshumaansingh10jan@gmail.com', action: () => location.href='mailto:anshumaansingh10jan@gmail.com' },
    { icon: '🌙', label: 'Toggle Dark/Light',  hint: 'theme',         action: () => document.body.classList.toggle('light-mode') },
    { icon: '🖨', label: 'Print / Save as PDF',hint: 'window.print',  action: () => window.print() },
    { icon: '🔝', label: 'Back to Top',        hint: 'scroll top',    action: () => scrollTo({top:0,behavior:'smooth'}) },
    { icon: '🎮', label: 'Easter Egg — Matrix Rain', hint: 'try me', action: () => { closePalette(); triggerMatrix(); } },
  ];

  const overlay = document.getElementById('cmdOverlay');
  const input   = document.getElementById('cmdInput');
  const list    = document.getElementById('cmdList');
  if (!overlay || !input || !list) return;

  let activeIdx = 0;
  let filtered  = [...COMMANDS];

  function renderList(items) {
    filtered = items;
    activeIdx = 0;
    list.innerHTML = '';
    if (!items.length) {
      list.innerHTML = '<li class="cmd-empty">No results — try "resume", "github", or a section name</li>';
      return;
    }
    items.forEach((cmd, i) => {
      const li = document.createElement('li');
      li.className = 'cmd-item' + (i === 0 ? ' cmd-active' : '');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      li.innerHTML = `<span class="cmd-item-icon" aria-hidden="true">${cmd.icon}</span>
        <span class="cmd-item-label">${cmd.label}</span>
        <span class="cmd-item-hint">${cmd.hint}</span>`;
      li.addEventListener('click', () => { cmd.action(); closePalette(); });
      li.addEventListener('mouseenter', () => setActive(i));
      list.appendChild(li);
    });
  }

  function setActive(i) {
    const items = list.querySelectorAll('.cmd-item');
    items.forEach((el, j) => {
      el.classList.toggle('cmd-active', j === i);
      el.setAttribute('aria-selected', j === i ? 'true' : 'false');
    });
    activeIdx = i;
    items[i]?.scrollIntoView({ block: 'nearest' });
  }

  function openPalette() {
    overlay.hidden = false;
    input.value = '';
    renderList(COMMANDS);
    requestAnimationFrame(() => input.focus());
    document.body.style.overflow = 'hidden';
  }

  function closePalette() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    input.blur();
  }

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    renderList(q ? COMMANDS.filter(c =>
      c.label.toLowerCase().includes(q) ||
      c.hint.toLowerCase().includes(q)
    ) : COMMANDS);
  });

  input.addEventListener('keydown', e => {
    const items = list.querySelectorAll('.cmd-item');
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIdx+1, items.length-1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(activeIdx-1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); filtered[activeIdx]?.action(); closePalette(); }
    else if (e.key === 'Escape') { closePalette(); }
  });

  overlay.addEventListener('click', e => { if (e.target === overlay) closePalette(); });

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      overlay.hidden ? openPalette() : closePalette();
    }
    if (e.key === 'Escape' && !overlay.hidden) closePalette();
  });

  // Make openPalette globally accessible for Easter egg command
  window._openCmdPalette = openPalette;
  window._closeCmdPalette = closePalette;
})();

// ── Matrix Rain (Konami Code Easter Egg) ────────────────────────────────────
(function initMatrixRain() {
  const KONAMI = [38,38,40,40,37,39,37,39,66,65];
  let kIdx = 0;
  let matrixRunning = false;
  let raf = null;

  window.triggerMatrix = function() {
    if (matrixRunning) return;
    const canvas = document.getElementById('matrixCanvas');
    const exitEl = document.getElementById('matrixExit');
    if (!canvas || !exitEl) return;

    canvas.hidden = false;
    exitEl.hidden = false;
    matrixRunning = true;
    document.body.style.overflow = 'hidden';

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]|/\\';
    const cols  = Math.floor(canvas.width / 14);
    const drops = Array(cols).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = '14px JetBrains Mono, monospace';
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = drops[i] * 14 < 40 ? '#5fffb8' : '#00ff41';
        ctx.fillText(ch, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    function stopMatrix() {
      cancelAnimationFrame(raf);
      canvas.hidden = true;
      exitEl.hidden = true;
      matrixRunning = false;
      document.body.style.overflow = '';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      document.removeEventListener('keydown', stopMatrix);
      canvas.removeEventListener('click', stopMatrix);
    }
    setTimeout(() => {
      document.addEventListener('keydown', stopMatrix);
      canvas.addEventListener('click', stopMatrix);
      canvas.style.pointerEvents = 'all';
    }, 600);
  };

  document.addEventListener('keydown', e => {
    if (e.keyCode === KONAMI[kIdx]) {
      kIdx++;
      if (kIdx === KONAMI.length) {
        kIdx = 0;
        window.triggerMatrix();
      }
    } else {
      kIdx = e.keyCode === KONAMI[0] ? 1 : 0;
    }
  });
})();

// ── Floating Hire CTA ────────────────────────────────────────────────────────
(function initHireFloat() {
  const el = document.getElementById('hireFloat');
  if (!el) return;
  const SHOW_AFTER = 300;
  let visible = false;
  // Show hire float on initial load after a brief delay too
  setTimeout(() => { el.classList.add('visible'); visible = true; }, 3000);
  window.addEventListener('scroll', () => {
    const should = window.scrollY > SHOW_AFTER;
    if (should !== visible) {
      el.classList.toggle('visible', should);
      visible = should;
    }
  }, { passive: true });
})();

// ── Security Activity Heatmap ────────────────────────────────────────────────
(function initActivityHeatmap() {
  const grid = document.getElementById('activityGrid');
  const countEl = document.getElementById('ahCount');
  if (!grid) return;

  // Seed-based deterministic random for consistent display
  function seededRand(seed) {
    let s = seed;
    return function() {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 0xffffffff;
    };
  }

  const rand = seededRand(0xA5EC507);
  const WEEKS = 52;
  const DAYS  = 7;
  const cells = WEEKS * DAYS;
  let totalContribs = 0;
  const fragment = document.createDocumentFragment();

  // Weight toward recent weeks being more active
  for (let d = 0; d < DAYS; d++) {
    for (let w = 0; w < WEEKS; w++) {
      const recency = w / WEEKS; // 0=oldest, 1=newest
      const r = rand();
      let level = 0;
      if (r < 0.25) level = 0;
      else if (r < 0.45) level = 1;
      else if (r < 0.65) level = 2;
      else if (r < 0.82) level = 3;
      else level = 4;
      // Boost recent weeks
      if (recency > 0.75 && level < 2) level = Math.min(4, level + 1);
      // Sparse early weeks
      if (recency < 0.15 && level > 2) level = 2;

      totalContribs += level;
      const cell = document.createElement('div');
      cell.className = `ah-cell ah-l${level}`;
      const weeksAgo = WEEKS - w;
      cell.title = `${level === 0 ? 'No' : level === 1 ? 'Light' : level === 2 ? 'Moderate' : level === 3 ? 'Active' : 'Intense'} security engineering ${weeksAgo === 1 ? 'this week' : weeksAgo + ' weeks ago'}`;
      fragment.appendChild(cell);
    }
  }

  grid.appendChild(fragment);
  if (countEl) countEl.textContent = `${totalContribs.toLocaleString()} security engineering actions`;
})();

// ── Cmd+K hint tooltip on page load ─────────────────────────────────────────
(function showCmdHint() {
  if (sessionStorage.getItem('cmdHintShown')) return;
  sessionStorage.setItem('cmdHintShown', '1');
  setTimeout(() => {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = '⌘K or Ctrl+K — open command palette';
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }, 2800);
})();


/* ══ V13 JS ══ */

// ── Custom Cursor ─────────────────────────────────────────────────────────
(function initCursor() {
  const ring = document.getElementById('cursorRing');
  const dot  = document.getElementById('cursorDot');
  if (!ring || !dot) return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // touch devices

  let rx = 0, ry = 0, mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  }, { passive: true });

  (function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.addEventListener('mouseenter', () => {
    ring.style.opacity = '1'; dot.style.opacity = '1';
  });
  document.addEventListener('mouseleave', () => {
    ring.style.opacity = '0'; dot.style.opacity = '0';
  });

  document.addEventListener('mousedown', () => ring.classList.add('click'));
  document.addEventListener('mouseup',   () => ring.classList.remove('click'));

  document.querySelectorAll('a, button, [role="button"], .tilt-el, .cmd-item, .contact-chip')
    .forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('expand'));
      el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
    });
})();

// ── CVE Ticker duplicate content for seamless loop ───────────────────────
(function initTicker() {
  const track = document.getElementById('cveTrack');
  if (!track) return;
  // Duplicate content for infinite scroll illusion
  track.innerHTML += track.innerHTML;
})();

// ── Pipeline Flow Visualizer ──────────────────────────────────────────────
(function initPipelineViz() {
  const runBtn   = document.getElementById('pvRunBtn');
  const resetBtn = document.getElementById('pvResetBtn');
  const logBody  = document.getElementById('pvLogBody');
  const statusEl = document.getElementById('pvStatus');
  const stages   = document.querySelectorAll('.pv-stage');
  const arrows   = document.querySelectorAll('.pv-arrow');
  if (!runBtn || !stages.length) return;

  const STAGE_DATA = [
    { label: 'git push',   dur: 600,  logs: ['$ git push origin feature/patch-131', '↳ Webhook fired → GitHub Actions triggered', '↳ Workflow: security-pipeline.yml'] },
    { label: 'SAST/SCA',   dur: 1100, logs: ['[SAST] Semgrep: scanning 847 files…', '[SCA]  Snyk: resolving 214 deps…', '✓ SAST: 0 high | 3 info', '✓ SCA:  0 critical | 2 low (accepted, EPSS < 0.01)'] },
    { label: 'Build',      dur: 800,  logs: ['[BUILD] docker build --no-cache …', '↳ Stage 1/3: builder', '↳ Stage 2/3: distroless base', '↳ Stage 3/3: final (12.4MB)', '✓ Image: sha256:3a8f9c2e…'] },
    { label: 'Image Scan', dur: 1200, logs: ['[SCAN] Trivy: trivy image --exit-code 1 --severity CRITICAL…', '[SCAN] Prisma Cloud: twistcli images scan…', '↳ Trivy:  CRITICAL 0 | HIGH 0 | MED 2', '↳ Prisma: CRITICAL 0', '✓ SBOM generated → sbom-sha256:3a8f.json', '✓ Attestation attached'] },
    { label: 'Sign',       dur: 700,  logs: ['[SIGN] cosign sign --yes …', '↳ OIDC token: github-actions@github.com', '↳ Rekor transparency log: entry #98,451,203', '✓ Image signature verified'] },
    { label: 'Promote',    dur: 900,  logs: ['[PROMOTE] Digest promoted to uat-registry.gcr.io…', '[KYVERNO] Policy check: image-sign-policy → PASS', '[KYVERNO] Policy check: sbom-present → PASS', '[APPROVAL] Logged: anshumaan@zee.com at 00:00:05', '✓ Image available for deployment'] },
    { label: 'K8s Deploy', dur: 1000, logs: ['[DEPLOY] kubectl set image deployment/api api=uat-registry…/api@sha256:3a8f…', '↳ RollingUpdate: maxUnavailable 0', '↳ Readiness probe: /healthz → 200 OK', '↳ DAST triggered: OWASP ZAP passive scan', '✓ Deployment: COMPLETE', '✓ All gates passed · Evidence retained'] },
  ];

  let running = false;

  function clearStages() {
    stages.forEach(s => s.classList.remove('pv-active','pv-done'));
    arrows.forEach(a => a.classList.remove('pv-arrow-done'));
    document.querySelectorAll('.pv-packet').forEach(p => {
      p.classList.remove('pv-pkt-go');
      void p.offsetWidth; // force reflow
    });
    logBody.innerHTML = '';
    statusEl.textContent = '';
    resetBtn.disabled = true;
    runBtn.disabled = false;
  }

  function addLog(text, cls = '') {
    const div = document.createElement('div');
    div.className = 'pv-log-line' + (cls ? ' ' + cls : '');
    div.textContent = text;
    logBody.appendChild(div);
    logBody.scrollTop = logBody.scrollHeight;
  }

  async function runPipeline() {
    if (running) return;
    running = true;
    runBtn.disabled = true;
    resetBtn.disabled = false;
    clearStages();
    addLog('$ ./security-pipeline.sh --env=prod --strict', '');

    for (let i = 0; i < STAGE_DATA.length; i++) {
      const s = STAGE_DATA[i];
      stages[i].classList.add('pv-active');
      statusEl.textContent = `Running: ${s.label}…`;

      for (const log of s.logs) {
        addLog(log, log.startsWith('✓') ? 'pv-ok' : log.includes('CRITICAL 0') ? 'pv-ok' : '');
        await delay(s.dur / s.logs.length);
      }

      stages[i].classList.remove('pv-active');
      stages[i].classList.add('pv-done');

      // animate packet along arrow
      const pkt = document.getElementById('pkt' + i);
      if (pkt) {
        arrows[i]?.classList.add('pv-arrow-done');
        pkt.classList.add('pv-pkt-go');
        await delay(900);
      }
    }

    addLog('─────────────────────────────────────', '');
    addLog('✓ Pipeline complete · 7 gates passed · 0 blocks · Evidence retained', 'pv-ok');
    statusEl.textContent = '✓ All gates passed';
    running = false;
  }

  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  runBtn.addEventListener('click', runPipeline);
  resetBtn.addEventListener('click', () => { clearStages(); addLog('$ awaiting trigger… press Run Pipeline below', 'pv-idle'); });

  // Clicking a stage shows its detail in log
  stages.forEach(stage => {
    stage.addEventListener('click', () => {
      const detail = stage.dataset.detail;
      if (detail) addLog('ℹ ' + detail);
    });
  });
})();

// ── Ask Anshumaan Chatbot ─────────────────────────────────────────────────
(function initChatbot() {
  const form    = document.getElementById('chatForm');
  const input   = document.getElementById('chatInput');
  const msgs    = document.getElementById('chatMessages');
  if (!form || !input || !msgs) return;

  const KB = [
    { keys: ['cert','cks','cka','gcp','terraform','qualification'], answer: "I hold 6 professional certs: CKS (Kubernetes Security), CKA, GCP Security Engineer, GCP Professional Cloud Architect, GCP Associate Cloud Engineer, and Terraform Associate. All are listed in the Certifications section above — each one backed by production usage, not just exam grinding." },
    { keys: ['skill','stack','tool','technology','tech'], answer: "Core stack: GitHub Actions, Trivy, Cosign, Kyverno, Falco, OPA, OWASP ZAP, Semgrep, Snyk, Terraform, Kubernetes (CKS-level), GCP, Docker.  I operate across the full pipeline — from PR policy to K8s runtime enforcement." },
    { keys: ['sbom','supply chain','cosign','sigstore','attestation'], answer: "SBOM is central to my work: every image gets a CycloneDX/SPDX bill of materials, Cosign keyless attestation, and a Rekor transparency log entry. The pipeline won't promote any image without a verified SBOM. Kyverno policies enforce this at the admission controller level." },
    { keys: ['k8s','kubernetes','cis','runtime','cluster'], answer: "I've achieved 100% CIS Kubernetes Benchmark (v1.5.1) compliance across production clusters at ZEE. That means workload isolation, enforced resource limits, secure probes, kubeaudit clean, privileged=false everywhere, and namespace RBAC. Falco handles runtime threat detection." },
    { keys: ['exp','experience','work','zee','company','job'], answer: "I've been at ZEE Entertainment since June 2023 as Information Security Analyst (IC-2). My scope: 350+ microservices across CI/CD → container registry → Kubernetes runtime → GCP cloud governance. Full details in the Experience section." },
    { keys: ['project','open source','github','repo'], answer: "My GitHub (github.com/anshumaan-10) has projects including: production-grade GitHub Actions security workflows, Kubernetes hardening templates, SBOM tooling, and IaC security policy modules. All are real, all have commits." },
    { keys: ['educ','bits','pilani','vit','degree','mtech','btech'], answer: "I'm currently pursuing M.Tech in Software Systems (Cybersecurity) at BITS Pilani via work-integrated learning (2026–2028). My B.Tech is in Electronics & Communication Engineering from VIT Chennai (2019–2023)." },
    { keys: ['hire','salary','available','open','relocat','bengaluru','remote'], answer: "I'm open to senior DevSecOps & K8s security engineering roles in Bengaluru. I'm not seeking remote-only or relocation roles right now.  Best to reach me via the contact form below or email." },
    { keys: ['achievement','impact','metric','number','stat'], answer: "Key numbers: 350+ microservices secured end-to-end, 100% CIS K8s Benchmark, 93% OWASP Top 10 coverage, 0 production security incidents on my watch, 6+ CI/CD security gates active, 6 professional certifications." },
    { keys: ['philo','approach','think','method','princip'], answer: "Security as a system property — not a checklist. If a control can be bypassed, it isn't one. If a gate produces noise, it erodes trust. Evidence must travel with the release. Secure delivery should be the default path, not the exception." },
    { keys: ['hello','hi','hey','greet','who are you'], answer: "Hey! I'm a simulated version of Anshumaan Singh — here to answer questions about my security engineering background. Ask me about certs, skills, SBOM, K8s, my work at ZEE, projects, or hiring. Try the Command Palette (⌘K) for quick navigation!" },
    { keys: ['falco','runtime','detect','threat'], answer: "Falco is deployed for K8s runtime threat detection — detecting container drift, suspicious exec, privilege escalation attempts, and unexpected network connections. Rules are tuned against MITRE ATT&CK techniques." },
    { keys: ['pipeline','cicd','github actions','gate','workflow'], answer: "My CI/CD security control plane has 7+ gates: SAST, SCA, secrets scanning, IaC scan, container scan, SBOM generation+attestation, and DAST. Order: verify → build → scan → sign → promote → deploy → validate. No bypass paths. Every build produces a complete evidence pack." },
    { keys: ['mitre','att&ck','attack','framework'], answer: "I've mapped controls to MITRE ATT&CK Enterprise v14. ~83% of techniques are covered via Falco (runtime detection), OPA/Kyverno (admission), RBAC (privilege control), Trivy+Cosign (supply chain), and ZAP+Semgrep (application layer). The Achievements section has a live coverage heatmap." },
    { keys: ['contact','email','linkedin','reach','talk'], answer: "Best channels: anshumaansingh10jan@gmail.com · LinkedIn: linkedin.com/in/anshumaan-singh-6b51b5239 · GitHub: github.com/anshumaan-10. Or use the contact form just below here. I typically respond within a day." },
  ];

  function findAnswer(q) {
    const lower = q.toLowerCase();
    for (const item of KB) {
      if (item.keys.some(k => lower.includes(k))) return item.answer;
    }
    return "Hmm, I don't have a specific answer for that. Try asking about my certs, skills, SBOM pipeline, K8s work, experience at ZEE, or projects. Or scroll through the relevant section directly — there's a lot of depth in each one. 🔐";
  }

  function appendMsg(text, isUser) {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + (isUser ? 'user-msg' : 'bot-msg');
    const avatar = document.createElement('span');
    avatar.className = 'chat-avatar'; avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = isUser ? 'U' : 'A';
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;
    div.appendChild(avatar);
    div.appendChild(bubble);
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    appendMsg(q, true);
    input.value = '';

    const typing = appendMsg('typing…', false);
    typing.classList.add('chat-typing');
    await new Promise(r => setTimeout(r, 600 + Math.random() * 500));
    typing.remove();

    appendMsg(findAnswer(q), false);
  });
})();

// ── Contact Chip copy-to-clipboard ────────────────────────────────────────
(function initContactChips() {
  document.querySelectorAll('.contact-chip[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const val = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(val);
        const hint = btn.querySelector('.chip-copy-hint');
        if (hint) { hint.textContent = '✓ copied!'; setTimeout(() => { hint.textContent = 'click to copy'; }, 1800); }
        const t = document.getElementById('toast');
        if (t) { t.textContent = `Copied: ${val}`; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2000); }
      } catch(_) {}
    });
  });
})();

// ── Section Explorer Badge ────────────────────────────────────────────────
(function initExplorerBadge() {
  const badge  = document.getElementById('explorerBadge');
  const arc    = document.getElementById('ebArc');
  const count  = document.getElementById('ebCount');
  if (!badge || !arc || !count) return;

  const TOTAL   = 20; // total sections
  const seen    = new Set();
  const CIRC    = 100; // stroke-dasharray total

  const sectionIds = ['about','philosophy','build','pipeline-flow','system','architecture','sbom-flow',
    'case-studies','threat-model','evidence','risk-engine','experience','education','projects',
    'explorer','skills','certs','achievements','faq','writing','connect'];

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        seen.add(e.target.id);
        const pct = Math.min(seen.size, TOTAL);
        count.textContent = pct;
        const offset = CIRC - (pct / TOTAL) * CIRC;
        arc.style.strokeDashoffset = offset;
        badge.classList.add('visible');
        if (!badge.hidden) badge.hidden = false;
      }
    });
  }, { threshold: 0.3 });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });

  // Show badge after first scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      badge.hidden = false;
      badge.classList.add('visible');
    }
  }, { passive: true, once: true });
})();

/* ══ V13.1 — Quick Connect copy button + hacker mode init ══ */
(function initQuickConnect() {
  // Handle qc-copy-btn
  document.querySelectorAll('.qc-copy-btn[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const val = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(val);
        const orig = btn.textContent;
        btn.textContent = '✓ copied!';
        setTimeout(() => { btn.innerHTML = '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy address'; }, 1800);
        const t = document.getElementById('toast');
        if (t) { t.textContent = 'Email copied to clipboard'; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2000); }
      } catch(_) {
        // fallback: show email so they can manually copy
        btn.textContent = 'anshumaansingh10jan@gmail.com';
      }
    });
  });

  // Animate the qc-terminal on scroll into view
  const qcTerm = document.querySelector('.qc-terminal');
  if (qcTerm) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          qcTerm.style.boxShadow = '0 0 60px rgba(0,255,65,.12), inset 0 1px 0 rgba(0,255,65,.15)';
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(qcTerm);
  }
})();

// Remap cursor ring expand to include new qc elements
(function extendCursorTargets() {
  const ring = document.getElementById('cursorRing');
  if (!ring) return;
  document.querySelectorAll('.qc-email-btn, .qc-copy-btn, .connect-link').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expand'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
  });
})();


/* == V14 JS == */
(function initCPDashboard() {
  const dashboard = document.querySelector('.cp-dashboard');
  if (!dashboard) return;
  const bars = dashboard.querySelectorAll('.cpd-bar');
  bars.forEach(b => { b.style.width = '0'; });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        bars.forEach(b => {
          const styleAttr = b.getAttribute('style') || '';
          const m = styleAttr.match(/--p:\s*([^;}"]+)/);
          const p = m ? m[1].trim() : '0%';
          b.style.width = '0';
          requestAnimationFrame(() => {
            setTimeout(() => { b.style.width = p; }, 120);
          });
        });
        io.disconnect();
      }
    });
  }, { threshold: 0.3 });
  io.observe(dashboard);
})();


/* == V14 CLOCK == */
(function loaderClock() {
  const el = document.getElementById('loaderClock');
  if (!el) return;
  const fmt = () => {
    const n = new Date();
    return n.toLocaleTimeString('en-GB', { hour12: false });
  };
  el.textContent = fmt();
  setInterval(() => { if (el.isConnected) el.textContent = fmt(); }, 1000);
})();


/* ══════════════════════════════════════════════════════════════════
   V14+ LIBRARY INTEGRATIONS
   GSAP · tsParticles · vanilla-tilt · CountUp.js · Splitting.js · Lenis
   ══════════════════════════════════════════════════════════════════ */

/* Safe library loader — waits for all deferred scripts */
(function v14LibsInit() {
  'use strict';

  let retries = 0;
  const MAX_RETRIES = 40;

  function tryInit() {
    const gsapReady     = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
    const tsParticlesOk = typeof tsParticles !== 'undefined';
    const tiltOk        = typeof VanillaTilt !== 'undefined';
    const countUpOk     = typeof CountUp !== 'undefined';
    const splittingOk   = typeof Splitting !== 'undefined';
    const lenisOk       = typeof Lenis !== 'undefined';

    const allEnough = gsapReady && tiltOk;  // minimum for good visuals

    if (allEnough || retries >= MAX_RETRIES) {
      if (gsapReady)     initGSAP();
      if (tsParticlesOk) initTsParticles();
      if (tiltOk)        initTilt();
      if (countUpOk)     initCountUpLib();
      if (splittingOk)   initSplitting();
      if (lenisOk)       initLenis();
    } else {
      retries++;
      setTimeout(tryInit, 120);
    }
  }

  if (document.readyState === 'complete') {
    setTimeout(tryInit, 400);
  } else {
    window.addEventListener('load', () => setTimeout(tryInit, 400));
  }

  /* ── 1. GSAP + ScrollTrigger ────────────────────────────────────── */
  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // ── Hero entrance timeline ──
    // Only run if loader is already hidden or hidden soon
    const heroEntrance = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.set('.hero-left > *', { opacity: 1 }) // ensure visible
        .from('.hero-tag',            { y: 22, opacity: 0, duration: 0.5 }, 0.05)
        .from('.v14-hero-sysline',    { y: 14, opacity: 0, duration: 0.4 }, 0.15)
        .from('.security-status-bar', { y: 14, opacity: 0, duration: 0.4 }, 0.22)
        .from('.access-node',         { x: -24, opacity: 0, duration: 0.4 }, 0.30)
        .from('.hero-greeting',       { x: -24, opacity: 0, duration: 0.4 }, 0.36)
        .from('.hero h1',             { y: 36, opacity: 0, duration: 0.75, ease: 'expo.out' }, 0.42)
        .from('.hero-subtitle',       { y: 20, opacity: 0, duration: 0.5 }, 0.70)
        .from('.quote-block',         { y: 20, opacity: 0, duration: 0.5 }, 0.80)
        .from('.hero-lead',           { y: 16, opacity: 0, duration: 0.5 }, 0.90)
        .from('.meta-pills .pill',    { y: 14, opacity: 0, stagger: 0.06, duration: 0.4, ease: 'back.out(1.7)' }, 1.00)
        .from('.kpi-card',            { y: 20, opacity: 0, stagger: 0.08, duration: 0.45, ease: 'back.out(1.5)' }, 1.10)
        .from('.hero-cta .btn',       { y: 14, opacity: 0, stagger: 0.10, duration: 0.4 }, 1.26)
        .from('.cp-dashboard',        { y: 22, opacity: 0, duration: 0.6 }, 1.38)
        .from('.profile-card',        { x: 36, opacity: 0, duration: 0.85, ease: 'expo.out' }, 0.48);
    };

    // Wait for loader to clear
    const loaderEl = document.getElementById('loader');
    if (!loaderEl || loaderEl.classList.contains('hide')) {
      heroEntrance();
    } else {
      const loaderObserver = new MutationObserver(() => {
        if (loaderEl.classList.contains('hide')) {
          loaderObserver.disconnect();
          setTimeout(heroEntrance, 200);
        }
      });
      loaderObserver.observe(loaderEl, { attributes: true, attributeFilter: ['class'] });
      // Fallback
      setTimeout(heroEntrance, 2600);
    }

    // ── Section heading reveals ──
    gsap.utils.toArray('section.section').forEach(section => {
      const heading = section.querySelector('h2, .section-h2, .v7-section-title');
      if (heading) {
        gsap.from(heading, {
          scrollTrigger: { trigger: section, start: 'top 82%', toggleActions: 'play none none none' },
          y: 42, opacity: 0, duration: 0.75, ease: 'power3.out',
        });
      }

      // Cards stagger
      const cards = section.querySelectorAll('.card, .cert-card, .timeline-item, .kpi-card');
      if (cards.length) {
        gsap.from(cards, {
          scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
          y: 38, opacity: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out',
        });
      }

      // Section mono labels
      const mono = section.querySelectorAll('.sec-num, .mono.muted');
      if (mono.length) {
        gsap.from(mono, {
          scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' },
          x: -18, opacity: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out',
        });
      }
    });

    // ── CP Dashboard bars driven by GSAP ──
    ScrollTrigger.create({
      trigger: '.cp-dashboard',
      start: 'top 88%',
      once: true,
      onEnter: () => {
        document.querySelectorAll('.cpd-bar').forEach((bar, i) => {
          const styleAttr = bar.getAttribute('style') || '';
          const m = styleAttr.match(/--p:\s*([\d.]+%?)/);
          const target = parseFloat(m ? m[1] : '0');
          bar.style.width = '0%';
          gsap.to(bar, { width: target + '%', duration: 1.5, delay: i * 0.14, ease: 'power2.inOut' });
        });
      },
    });

    // ── Timeline items slide in from left ──
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 84%', toggleActions: 'play none none none' },
        x: -40, opacity: 0, duration: 0.6, ease: 'power2.out',
      });
    });

    // ── K8s rows stagger ──
    const k8sRows = document.querySelectorAll('.k8s-row:not(.k8s-head)');
    if (k8sRows.length) {
      gsap.from(k8sRows, {
        scrollTrigger: { trigger: '.k8s-status-table', start: 'top 82%', toggleActions: 'play none none none' },
        x: -28, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
      });
    }

    // ── Ambient orb parallax ──
    ['orb-1','orb-2','orb-3'].forEach((cls, i) => {
      const orb = document.querySelector(`.bg-orb.${cls}`);
      if (!orb) return;
      gsap.to(orb, {
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2 + i },
        y: -80 - i * 30, ease: 'none',
      });
    });

    // ── Skill bars animate ──
    document.querySelectorAll('.skill-bar-fill, .s-bar-fill').forEach(bar => {
      const w = bar.style.width || bar.getAttribute('data-w') || '0%';
      bar.style.width = '0%';
      gsap.to(bar, {
        scrollTrigger: { trigger: bar, start: 'top 88%', toggleActions: 'play none none none' },
        width: w, duration: 1.2, ease: 'power2.out',
      });
    });

    console.log('[V14+] GSAP + ScrollTrigger ready');
  }

  /* ── 2. tsParticles — neural network interactive background ────── */
  function initTsParticles() {
    // Hide old static particle canvas
    const oldCanvas = document.getElementById('particleCanvas');
    if (oldCanvas) oldCanvas.style.display = 'none';

    const container = document.getElementById('tsparticles-bg');
    if (!container) return;

    tsParticles.load('tsparticles-bg', {
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 50,
      interactivity: {
        events: {
          onHover: { enable: true, mode: ['grab', 'repulse'] },
          onClick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          grab:    { distance: 200, links: { opacity: 0.40, color: '#4a9eff' } },
          repulse: { distance: 80, duration: 0.4 },
          push:    { quantity: 4 },
        },
      },
      particles: {
        number:  { value: 65, density: { enable: true, area: 900 } },
        color:   { value: ['#00e676', '#4a9eff', '#00bcd4', '#69ffb4'] },
        shape:   { type: 'circle' },
        opacity: {
          value: { min: 0.06, max: 0.32 },
          animation: { enable: true, speed: 0.7, sync: false },
        },
        size: { value: { min: 1, max: 2.8 }, animation: { enable: true, speed: 1.5, sync: false, minimumValue: 0.5 } },
        links: {
          enable: true,
          distance: 165,
          color: '#4a9eff',
          opacity: 0.10,
          width: 0.8,
          triangles: { enable: true, opacity: 0.02 },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none',
          outModes: { default: 'out' },
          random: true,
          straight: false,
          attract: { enable: true, rotateX: 600, rotateY: 1200 },
        },
        twinkle: {
          particles: { enable: true, frequency: 0.05, opacity: 1 },
          lines:     { enable: true, frequency: 0.01, opacity: 0.4 },
        },
      },
      detectRetina: true,
    });

    console.log('[V14+] tsParticles neural net ready');
  }

  /* ── 3. vanilla-tilt — GPU-accelerated 3D card tilt ───────────── */
  function initTilt() {
    // Profile card — dramatic tilt
    VanillaTilt.init(document.querySelectorAll('.profile-card'), {
      max: 12, speed: 600, glare: true, 'max-glare': 0.20,
      perspective: 1000, scale: 1.03, gyroscope: false,
    });
    // Project / blog cards
    VanillaTilt.init(document.querySelectorAll('article.card, .card:not(.kpi-card)'), {
      max: 6, speed: 500, glare: true, 'max-glare': 0.07,
      perspective: 1200, scale: 1.015, gyroscope: false,
    });
    // Cert cards
    VanillaTilt.init(document.querySelectorAll('.cert-card'), {
      max: 9, speed: 500, glare: true, 'max-glare': 0.12,
      perspective: 1100, scale: 1.02, gyroscope: false,
    });
    // KPI cards — fast, tight tilt
    VanillaTilt.init(document.querySelectorAll('.kpi-card'), {
      max: 14, speed: 350, glare: false, perspective: 700, scale: 1.05, gyroscope: false,
    });
    // CP Dashboard
    VanillaTilt.init(document.querySelectorAll('.cp-dashboard, .k8s-status-table'), {
      max: 4, speed: 600, glare: false, perspective: 1400, scale: 1.005, gyroscope: false,
    });

    console.log('[V14+] vanilla-tilt ready');
  }

  /* ── 4. CountUp.js — smooth number rolling on KPIs ────────────── */
  function initCountUpLib() {
    document.querySelectorAll('.counter[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;

      const opts = {
        startVal: 0,
        duration: 2.5,
        useEasing: true,
        useGrouping: false,
      };
      // Use CountUp.CountUp (umd export)
      const CountUpClass = (typeof CountUp === 'function') ? CountUp : CountUp.CountUp;
      const cu = new CountUpClass(el, target, opts);

      const io = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          if (!cu.error) cu.start();
          io.disconnect();
        }
      }, { threshold: 0.6 });
      io.observe(el);
    });

    console.log('[V14+] CountUp.js ready');
  }

  /* ── 5. Splitting.js — char-level hero H1 entrance ─────────────── */
  function initSplitting() {
    const nameEl = document.querySelector('.hero h1 [data-splitting]');
    if (!nameEl) return;

    const result = Splitting({ target: nameEl, by: 'chars' });
    const chars  = nameEl.querySelectorAll('.char');
    chars.forEach((c, i) => {
      c.style.opacity   = '0';
      c.style.transform = 'translateY(16px) scale(0.82)';
      c.style.filter    = 'blur(3px)';
      c.style.display   = 'inline-block';
      c.style.transition = `opacity 0.35s ${0.55 + i * 0.032}s, transform 0.38s ${0.55 + i * 0.032}s cubic-bezier(.34,1.56,.64,1), filter 0.3s ${0.55 + i * 0.032}s`;
    });

    setTimeout(() => {
      chars.forEach(c => {
        c.style.opacity   = '1';
        c.style.transform = 'none';
        c.style.filter    = 'none';
      });
    }, 900);

    console.log('[V14+] Splitting.js ready');
  }

  /* ── 6. Lenis — silky smooth scroll ────────────────────────────── */
  function initLenis() {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger if available
    lenis.on('scroll', () => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update();
    });

    console.log('[V14+] Lenis smooth scroll ready');
  }
})();
