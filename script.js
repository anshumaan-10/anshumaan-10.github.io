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
  { icon:"👤", label:"About Me",          action:()=>scrollTo("about") },
  { icon:"🏗️", label:"Architecture",      action:()=>scrollTo("architecture") },
  { icon:"💼", label:"Experience",        action:()=>scrollTo("experience") },
  { icon:"📂", label:"Projects",          action:()=>scrollTo("projects") },
  { icon:"✍️", label:"Writing & Blog",     action:()=>scrollTo("writing") },
  { icon:"🗺️", label:"Explorer",          action:()=>scrollTo("explorer") },
  { icon:"🧠", label:"Skills",            action:()=>scrollTo("skills") },
  { icon:"🏅", label:"Certifications",    action:()=>scrollTo("certs") },
  { icon:"🔬", label:"Case Studies",      action:()=>scrollTo("case-studies") },
  { icon:"📊", label:"Threat Model",      action:()=>scrollTo("threat-model") },
  { icon:"📈", label:"Risk Engine",       action:()=>scrollTo("risk-engine") },
  { icon:"🎓", label:"Education",         action:()=>scrollTo("education") },
  { icon:"📬", label:"Connect",           action:()=>scrollTo("connect") },
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

function scrollTo(id) {
  const el = byId(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - TOPBAR_H - 8;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function showToast(msg) {
  const t = byId("toast") || $(".toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t.__tid);
  t.__tid = setTimeout(() => t.classList.remove("show"), 2800);
}

/* ── LOADER ── */
window.addEventListener("load", () => {
  const loader = byId("loader");
  if (loader) setTimeout(() => loader.classList.add("hide"), 600);
  const yr = byId("year");
  if (yr) yr.textContent = new Date().getFullYear();
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
      e.preventDefault(); scrollTo(id);
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

/* ── CUSTOM CURSOR ── */
const cursorDot  = byId("cursorDot");
const cursorRing = byId("cursorRing");
let mx = 0, my = 0, rx = 0, ry = 0;

if (cursorDot && cursorRing && window.matchMedia("(pointer:fine)").matches) {
  document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener("mousedown", () => { cursorDot.style.transform = "translate(-50%,-50%) scale(0.6)"; });
  document.addEventListener("mouseup",   () => { cursorDot.style.transform = "translate(-50%,-50%)"; });

  $$("a, button, [role=button], .card, .cert-card, .connect-card, .proj-card").forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("hovering"));
  });

  (function rafCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorDot.style.left  = mx + "px"; cursorDot.style.top  = my + "px";
    cursorRing.style.left = rx + "px"; cursorRing.style.top = ry + "px";
    requestAnimationFrame(rafCursor);
  })();
}

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
}, { threshold: 0.5 });

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
  localStorage.setItem("as-theme", next);
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

/* Sync persisted preferences */
(function syncUI() {
  const accent = localStorage.getItem("as-accent") || document.documentElement.dataset.accent || "violet";
  const theme  = localStorage.getItem("as-theme")  || document.documentElement.dataset.theme  || "dark";
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

/* ── PDF GENERATOR ── */
async function generatePDF() {
  showToast("⏳ Generating PDF resume…");
  try {
    if (typeof window.jspdf === "undefined") {
      // Wait for jsPDF to load
      await new Promise((res, rej) => { let t = 0; const iv = setInterval(() => { t += 200; if (window.jspdf) { clearInterval(iv); res(); } else if (t > 5000) { clearInterval(iv); rej(new Error("jsPDF not loaded")); } }, 200); });
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation:"portrait", unit:"mm", format:"a4" });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();

    // Header band
    doc.setFillColor(139, 92, 246);
    doc.rect(0, 0, W, 42, "F");

    // Name & title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22); doc.setTextColor(255, 255, 255);
    doc.text("Anshumaan Singh", 16, 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Security Systems Engineer · Information Security Analyst (IC-2)", 16, 26);
    doc.setFontSize(8);
    doc.text("ZEE Entertainment Enterprises Ltd · Bengaluru, India", 16, 33);
    doc.text("anshumaansingh10jan@gmail.com · www.devsecopswithanshu.com", 16, 39);

    let y = 52;

    function heading(title) {
      doc.setFont("helvetica", "bold"); doc.setFontSize(11);
      doc.setTextColor(139, 92, 246);
      doc.text(title, 16, y);
      doc.setDrawColor(139, 92, 246);
      doc.line(16, y + 2, W - 16, y + 2);
      y += 9;
    }

    function body(lines, indent = 16) {
      doc.setFont("helvetica", "normal"); doc.setFontSize(9);
      doc.setTextColor(30, 30, 30);
      lines.forEach(l => {
        if (y > H - 18) { doc.addPage(); y = 18; }
        doc.text(l, indent, y); y += 5.5;
      });
      y += 3;
    }

    heading("EXPERIENCE");
    body([
      "Security Systems Engineer · ZEE Entertainment Enterprises Ltd (2023 – Present)",
      "  • Designed & deployed 200+ Kubernetes NetworkPolicy rules across 3 production clusters",
      "  • Built SBOM pipeline (Syft + Grype) cutting SLA for critical CVE response by 40%",
      "  • CIS Kubernetes Benchmark compliance — scored 97% across multi-AZ GKE clusters",
      "  • OPA Gatekeeper policy engine enforcing RBAC, image signing, namespace isolation",
      "  • Automated GCP IAM drift detection with Cloud Asset Inventory + Pub/Sub alerts",
      "  • Set up Falco runtime threat detection with custom rules for 8 high-severity event classes",
      "",
      "Information Security Analyst · ZEE Entertainment Enterprises Ltd (2022 – 2023)",
      "  • Conducted 30+ quarterly risk assessments & vendor security evaluations",
      "  • Coordinated SOC Tier-1/2 escalations; reduced MTTR by 35% via runbook standardization",
      "  • Automated cloud misconfiguration detection using Cloud Security Command Center",
    ]);

    heading("CERTIFICATIONS");
    body([
      "• Certified Kubernetes Security Specialist (CKS)",
      "• Certified Kubernetes Administrator (CKA)",
      "• Google Cloud Professional Cloud Security Engineer",
      "• Google Cloud Professional Cloud Architect",
      "• HashiCorp Certified: Terraform Associate",
      "• Google Cloud Associate Cloud Engineer",
    ]);

    heading("SKILLS");
    body([
      "Cloud:      GCP (GKE, IAM, Cloud Armor, SCC, Asset Inventory, Pub/Sub, Cloud Run)",
      "Kubernetes: NetworkPolicy, OPA Gatekeeper, Falco, Trivy, Syft, Grype, Kyverno",
      "Security:   SIEM, SOAR, Threat Modeling (STRIDE/PASTA), IAM, Zero‑Trust, SBOM",
      "DevSecOps:  GitHub Actions CI/CD, ArgoCD, Terraform, Helm, Docker",
      "Compliance: CIS Benchmarks, NIST CSF, ISO 27001, SOC 2, GDPR awareness",
    ]);

    heading("EDUCATION");
    body([
      "B.Tech Computer Science & Engineering — Lovely Professional University (2020 – 2024)",
      "  CGPA: 7.68 · Relevant: OS, Networks, Cryptography, Distributed Systems",
    ]);

    heading("CONTACT");
    body([
      "Email:    anshumaansingh10jan@gmail.com",
      "LinkedIn: https://linkedin.com/in/anshumaan-singh-6b51b5239/",
      "GitHub:   https://github.com/anshumaan-10",
      "Blog:     https://medium.com/@anshumaansingh10jan",
      "Resume:   https://drive.google.com/file/d/1jszWhJhFO3DbrWxVLpTgekNKkPDKPObb/view",
    ]);

    doc.save("Anshumaan_Singh_Resume.pdf");
    showToast("✅ PDF downloaded!");
  } catch (err) {
    console.error(err);
    showToast("❌ PDF failed – opening Drive link…");
    window.open("https://drive.google.com/file/d/1jszWhJhFO3DbrWxVLpTgekNKkPDKPObb/view", "_blank");
  }
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

/* ── INITIAL CALL ── */
onScroll();
