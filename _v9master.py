# -*- coding: utf-8 -*-
"""
V9 MASTER — World-class portfolio overhaul
Fixes: cursor conflict, bigger layout, real GitHub projects,
       interactive SBOM flow, Lucide icons, SEO boost, section focus.
"""
import re, os, subprocess

BASE = "/Users/anshumaan.singh/Downloads/anshumaan-10.github.io"
JS   = os.path.join(BASE, "script.js")
HTML = os.path.join(BASE, "index.html")
CSS  = os.path.join(BASE, "styles.css")

# ══════════════════════════════════════════════════════════════
# 1. FIX CURSOR — remove old left/top impl, keep V7 transform
# ══════════════════════════════════════════════════════════════
js_src = open(JS, encoding="utf-8").read()

OLD_CURSOR = """/* ── CUSTOM CURSOR ── */
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
}"""

NEW_CURSOR = """/* ── CUSTOM CURSOR — single unified implementation below (V9) ── */
/* old left/top cursor removed — V9 uses transform exclusively */"""

if OLD_CURSOR in js_src:
    js_src = js_src.replace(OLD_CURSOR, NEW_CURSOR)
    print("✓ Removed old cursor (left/top) implementation")
else:
    print("⚠  Old cursor block not found verbatim — skipping cursor patch")

# Also enhance V7 cursor: add hover expand + mousedown shrink + hovering class
OLD_V7_CURSOR = """/* ── 1. CURSOR V7: bigger glow on hover ── */
(function initCursorV7() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function tick() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    dot.style.transform  = `translate(${mx - 2.5}px,${my - 2.5}px)`;
    ring.style.transform = `translate(${rx - 13}px,${ry - 13}px)`;
    requestAnimationFrame(tick);
  }
  tick();

  document.querySelectorAll('a,button,details').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'rgba(0,255,65,.5)';
      ring.style.margin = '-7px';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '';
      ring.style.height = '';
      ring.style.borderColor = '';
      ring.style.margin = '';
    });
  });
})();"""

NEW_V9_CURSOR = """/* ── CURSOR V9: single RAF loop, transform-only, no left/top conflict ── */
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
})();"""

if OLD_V7_CURSOR in js_src:
    js_src = js_src.replace(OLD_V7_CURSOR, NEW_V9_CURSOR)
    print("✓ Replaced V7 cursor with V9 unified cursor")
else:
    print("⚠  V7 cursor block not found verbatim — trying partial match")
    # Try to find and replace just the function definition
    m = re.search(r"/\* ── 1\. CURSOR V7.*?\}\)\(\);", js_src, re.DOTALL)
    if m:
        js_src = js_src[:m.start()] + NEW_V9_CURSOR + js_src[m.end():]
        print("✓ Replaced V7 cursor via regex")

open(JS, "w", encoding="utf-8").write(js_src)
print(f"  script.js → {len(js_src.splitlines())} lines")


# ══════════════════════════════════════════════════════════════
# 2. HTML — Real GitHub projects + SBOM flow + Lucide icons
# ══════════════════════════════════════════════════════════════
html_src = open(HTML, encoding="utf-8").read()

# 2a. Add Lucide CDN before </head>
LUCIDE_CDN = '''  <!-- ═══ LUCIDE ICONS ═══ -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js" defer></script>'''

if "lucide" not in html_src:
    html_src = html_src.replace("  <!-- ═══ SCRIPTS ═══ -->", LUCIDE_CDN + "\n\n  <!-- ═══ SCRIPTS ═══ -->")
    print("✓ Added Lucide CDN")

# 2b. Add extra structured data for projects (for SEO)
EXTRA_SCHEMA = '''  <!-- ═══ JSON-LD: SoftwareSourceCode (GitHub Projects) ═══ -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Anshumaan Singh — Open Source Security Engineering Projects",
    "description": "Kubernetes security labs, supply chain security, DevSecOps pipelines by Anshumaan Singh",
    "url": "https://www.devsecopswithanshu.com/#projects",
    "itemListElement": [
      {"@type":"ListItem","position":1,"item":{"@type":"SoftwareSourceCode","name":"k8s-security-lab","codeRepository":"https://github.com/anshumaan-10/k8s-security-lab","programmingLanguage":"Shell","description":"10 real Kubernetes misconfigurations — exploited and documented (Hardening Kubernetes workshop)","author":{"@id":"https://www.devsecopswithanshu.com/#person"}}},
      {"@type":"ListItem","position":2,"item":{"@type":"SoftwareSourceCode","name":"phoenix","codeRepository":"https://github.com/anshumaan-10/phoenix","programmingLanguage":"Python","description":"Intentionally vulnerable Flask app for Kubernetes security lab (RCE + host escape)","author":{"@id":"https://www.devsecopswithanshu.com/#person"}}},
      {"@type":"ListItem","position":3,"item":{"@type":"SoftwareSourceCode","name":"k8s-lab-deployments","codeRepository":"https://github.com/anshumaan-10/k8s-lab-deployments","programmingLanguage":"Shell","description":"Kubernetes manifests + ArgoCD apps + cluster setup scripts for k8s-security-lab","author":{"@id":"https://www.devsecopswithanshu.com/#person"}}},
      {"@type":"ListItem","position":4,"item":{"@type":"SoftwareSourceCode","name":"image-attestation-cosign","codeRepository":"https://github.com/anshumaan-10/image-attestation-cosign","programmingLanguage":"Dockerfile","description":"Image signing and attestation with Sigstore Cosign — supply chain integrity","author":{"@id":"https://www.devsecopswithanshu.com/#person"}}},
      {"@type":"ListItem","position":5,"item":{"@type":"SoftwareSourceCode","name":"kyverno-policy-demo","codeRepository":"https://github.com/anshumaan-10/kyverno-policy-demo","description":"Policy-as-code with Kyverno — Kubernetes admission control and governance","author":{"@id":"https://www.devsecopswithanshu.com/#person"}}},
      {"@type":"ListItem","position":6,"item":{"@type":"SoftwareSourceCode","name":"custom-secret-regex","codeRepository":"https://github.com/anshumaan-10/custom-secret-regex","description":"Custom secret detection regex patterns for security scanning pipelines","author":{"@id":"https://www.devsecopswithanshu.com/#person"}}}
    ]
  }
  </script>
</head>'''

if "SoftwareSourceCode" not in html_src:
    html_src = html_src.replace("</head>", EXTRA_SCHEMA)
    print("✓ Added SoftwareSourceCode schema for projects")

# 2c. Replace the projects section entirely
OLD_PROJECTS_START = '    <!-- PROJECTS -->'
OLD_PROJECTS_END   = '</section>\n\n    <!-- WRITING'

# Find and replace projects section
p_start = html_src.find(OLD_PROJECTS_START)
p_end   = html_src.find(OLD_PROJECTS_END, p_start)

if p_start != -1 and p_end != -1:
    NEW_PROJECTS_HTML = '''    <!-- PROJECTS — Real GitHub Repos from anshumaan-10 -->
    <section id="projects" class="section glass" aria-label="Engineering projects" aria-labelledby="projects-h2">
      <header class="sec-header">
        <span class="sec-num mono" aria-hidden="true">12</span>
        <h2 id="projects-h2"><span class="h2-prompt" aria-hidden="true">ls -la ~/repos</span> Open Source Projects</h2>
      </header>
      <div class="sec-rule" aria-hidden="true"></div>
      <p class="mono muted reveal">Real repositories. Real security engineering. Every repo has commits. Every problem is documented.</p>
      <div class="sec-divider-cmd mono" aria-hidden="true"><span class="sdc-line"></span><span class="sdc-text">// github.com/anshumaan-10</span><span class="sdc-line"></span></div>

      <!-- Featured projects grid -->
      <div class="gh-projects-grid stagger">

        <!-- k8s-security-lab -->
        <article class="gh-card tilt-el reveal" data-lang="Shell" data-stars="0">
          <div class="gh-card-head">
            <div class="gh-icon-wrap" aria-hidden="true">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <div>
              <h3 class="gh-repo-name">k8s-security-lab</h3>
              <span class="gh-lang-badge">Shell</span>
            </div>
            <a class="gh-ext-link" href="https://github.com/anshumaan-10/k8s-security-lab" target="_blank" rel="noopener noreferrer" aria-label="View k8s-security-lab on GitHub">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
          <p class="gh-desc">10 real Kubernetes misconfigurations — each exploited end-to-end and documented with a hardening guide. A hands-on security workshop covering RBAC escapes, privileged pod exploits, host namespace attacks, and more.</p>
          <div class="gh-topics">
            <span class="gh-topic">kubernetes-security</span>
            <span class="gh-topic">misconfigurations</span>
            <span class="gh-topic">hardening</span>
            <span class="gh-topic">workshop</span>
            <span class="gh-topic">CKS</span>
          </div>
          <div class="gh-meta">
            <span class="gh-meta-item">
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M3 12s3-8 9-8 9 8 9 8-3 8-9 8-9-8-9-8z"/></svg>
              Exploit + Harden
            </span>
            <span class="gh-meta-item gh-featured">★ Featured</span>
          </div>
        </article>

        <!-- phoenix -->
        <article class="gh-card tilt-el reveal" data-lang="Python">
          <div class="gh-card-head">
            <div class="gh-icon-wrap" aria-hidden="true">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <div>
              <h3 class="gh-repo-name">phoenix</h3>
              <span class="gh-lang-badge">Python</span>
            </div>
            <a class="gh-ext-link" href="https://github.com/anshumaan-10/phoenix" target="_blank" rel="noopener noreferrer" aria-label="View phoenix on GitHub">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
          <p class="gh-desc">Intentionally vulnerable Flask application built for the Kubernetes security lab. Demonstrates RCE chains, container escape paths, and host namespace attacks — purpose-built to be exploited and studied.</p>
          <div class="gh-topics">
            <span class="gh-topic">flask</span>
            <span class="gh-topic">vulnerable-app</span>
            <span class="gh-topic">RCE</span>
            <span class="gh-topic">container-escape</span>
            <span class="gh-topic">host-escape</span>
          </div>
          <div class="gh-meta">
            <span class="gh-meta-item">
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M3 12s3-8 9-8 9 8 9 8-3 8-9 8-9-8-9-8z"/></svg>
              Vulnerability Lab
            </span>
            <span class="gh-meta-item gh-featured">★ Featured</span>
          </div>
        </article>

        <!-- k8s-lab-deployments -->
        <article class="gh-card tilt-el reveal" data-lang="Shell">
          <div class="gh-card-head">
            <div class="gh-icon-wrap" aria-hidden="true">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <div>
              <h3 class="gh-repo-name">k8s-lab-deployments</h3>
              <span class="gh-lang-badge">Shell</span>
            </div>
            <a class="gh-ext-link" href="https://github.com/anshumaan-10/k8s-lab-deployments" target="_blank" rel="noopener noreferrer" aria-label="View k8s-lab-deployments on GitHub">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
          <p class="gh-desc">Production-pattern Kubernetes manifests, ArgoCD GitOps app definitions, and cluster setup scripts powering the k8s-security-lab. Demonstrates real-world deployment patterns and GitOps workflows.</p>
          <div class="gh-topics">
            <span class="gh-topic">kubernetes</span>
            <span class="gh-topic">argocd</span>
            <span class="gh-topic">gitops</span>
            <span class="gh-topic">manifests</span>
          </div>
          <div class="gh-meta">
            <span class="gh-meta-item">
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              GitOps + K8s
            </span>
          </div>
        </article>

        <!-- image-attestation-cosign -->
        <article class="gh-card tilt-el reveal" data-lang="Dockerfile">
          <div class="gh-card-head">
            <div class="gh-icon-wrap" aria-hidden="true">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            </div>
            <div>
              <h3 class="gh-repo-name">image-attestation-cosign</h3>
              <span class="gh-lang-badge">Dockerfile</span>
            </div>
            <a class="gh-ext-link" href="https://github.com/anshumaan-10/image-attestation-cosign" target="_blank" rel="noopener noreferrer" aria-label="View image-attestation-cosign on GitHub">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
          <p class="gh-desc">Container image signing and attestation using Sigstore Cosign. Demonstrates the full supply chain integrity flow — sign the image, attach SBOM, verify before deploy. No trusted image without a verified signature.</p>
          <div class="gh-topics">
            <span class="gh-topic">cosign</span>
            <span class="gh-topic">sigstore</span>
            <span class="gh-topic">supply-chain</span>
            <span class="gh-topic">SBOM</span>
          </div>
          <div class="gh-meta">
            <span class="gh-meta-item">
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              Supply Chain Security
            </span>
            <span class="gh-meta-item gh-featured">★ Featured</span>
          </div>
        </article>

        <!-- kyverno-policy-demo -->
        <article class="gh-card tilt-el reveal" data-lang="YAML">
          <div class="gh-card-head">
            <div class="gh-icon-wrap" aria-hidden="true">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <div>
              <h3 class="gh-repo-name">kyverno-policy-demo</h3>
              <span class="gh-lang-badge">YAML</span>
            </div>
            <a class="gh-ext-link" href="https://github.com/anshumaan-10/kyverno-policy-demo" target="_blank" rel="noopener noreferrer" aria-label="View kyverno-policy-demo on GitHub">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
          <p class="gh-desc">Policy-as-code with Kyverno for Kubernetes admission control. Demonstrates how to block privileged pods, enforce image registries, require labels, and auto-mutate workloads — governance without manual review.</p>
          <div class="gh-topics">
            <span class="gh-topic">kyverno</span>
            <span class="gh-topic">policy-as-code</span>
            <span class="gh-topic">admission-control</span>
            <span class="gh-topic">OPA</span>
          </div>
          <div class="gh-meta">
            <span class="gh-meta-item">
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Policy as Code
            </span>
          </div>
        </article>

        <!-- custom-secret-regex -->
        <article class="gh-card tilt-el reveal" data-lang="Regex">
          <div class="gh-card-head">
            <div class="gh-icon-wrap" aria-hidden="true">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </div>
            <div>
              <h3 class="gh-repo-name">custom-secret-regex</h3>
              <span class="gh-lang-badge">Regex</span>
            </div>
            <a class="gh-ext-link" href="https://github.com/anshumaan-10/custom-secret-regex" target="_blank" rel="noopener noreferrer" aria-label="View custom-secret-regex on GitHub">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
          <p class="gh-desc">Custom regex patterns for detecting org-specific secrets in CI/CD scanning pipelines. Handles Azure storage keys, internal API tokens, custom service credentials — beyond what default scanners catch.</p>
          <div class="gh-topics">
            <span class="gh-topic">secret-scanning</span>
            <span class="gh-topic">regex</span>
            <span class="gh-topic">CI/CD</span>
            <span class="gh-topic">supply-chain</span>
          </div>
          <div class="gh-meta">
            <span class="gh-meta-item">
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              Secret Detection
            </span>
          </div>
        </article>

      </div>

      <div class="gh-cta reveal">
        <a class="btn btn-outline" href="https://github.com/anshumaan-10?tab=repositories" target="_blank" rel="noopener noreferrer">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
          View all 59 repositories on GitHub →
        </a>
      </div>
    </section>

'''
    html_src = html_src[:p_start] + NEW_PROJECTS_HTML + html_src[p_end + len(OLD_PROJECTS_END):]
    # Re-add the section closing and separator
    html_src = html_src[:p_start + len(NEW_PROJECTS_HTML)] + '</section>\n\n    <!-- WRITING' + html_src[p_start + len(NEW_PROJECTS_HTML):]
    print("✓ Replaced projects section with 6 real GitHub repos")
else:
    print(f"⚠  Projects section boundaries not found (p_start={p_start}, p_end={p_end})")

# 2d. Add interactive SBOM pipeline flow after architecture section
# Find where the architecture section ends and the next section starts
SBOM_FLOW_SECTION = '''
    <!-- ════ SBOM INTERACTIVE PIPELINE FLOW ════ -->
    <section id="sbom-flow" class="section glass sbom-section" aria-label="SBOM and supply chain security pipeline" aria-labelledby="sbom-h2">
      <header class="sec-header">
        <span class="sec-num mono" aria-hidden="true">05b</span>
        <h2 id="sbom-h2"><span class="h2-prompt" aria-hidden="true">cat sbom-pipeline.yaml</span> Supply Chain Pipeline</h2>
      </header>
      <div class="sec-rule" aria-hidden="true"></div>
      <p class="mono muted reveal">How every artifact goes from <code>git push</code> to production. Every transition has a gate. Every gate leaves evidence.</p>

      <!-- Interactive SVG Pipeline Flow -->
      <div class="sbom-flow-wrap reveal" role="img" aria-label="SBOM supply chain security pipeline from commit to production">
        <svg class="sbom-svg" viewBox="0 0 1080 320" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true">
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="rgba(0,255,65,.45)"/>
            </marker>
            <marker id="arr-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="rgba(255,100,100,.6)"/>
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stop-color="rgba(0,255,65,.08)"/>
              <stop offset="50%"  stop-color="rgba(0,255,65,.14)"/>
              <stop offset="100%" stop-color="rgba(0,255,65,.06)"/>
            </linearGradient>
          </defs>

          <!-- Pipeline backbone -->
          <rect x="20" y="130" width="1040" height="60" rx="4" fill="url(#pipeGrad)" stroke="rgba(0,255,65,.12)" stroke-width="1"/>

          <!-- Flow arrows between stages -->
          <line x1="111" y1="160" x2="161" y2="160" stroke="rgba(0,255,65,.4)" stroke-width="1.5" marker-end="url(#arr)"/>
          <line x1="237" y1="160" x2="287" y2="160" stroke="rgba(0,255,65,.4)" stroke-width="1.5" marker-end="url(#arr)"/>
          <line x1="363" y1="160" x2="413" y2="160" stroke="rgba(0,255,65,.4)" stroke-width="1.5" marker-end="url(#arr)"/>
          <line x1="489" y1="160" x2="539" y2="160" stroke="rgba(0,255,65,.4)" stroke-width="1.5" marker-end="url(#arr)"/>
          <line x1="615" y1="160" x2="665" y2="160" stroke="rgba(0,255,65,.4)" stroke-width="1.5" marker-end="url(#arr)"/>
          <line x1="741" y1="160" x2="791" y2="160" stroke="rgba(0,255,65,.4)" stroke-width="1.5" marker-end="url(#arr)"/>
          <line x1="867" y1="160" x2="917" y2="160" stroke="rgba(0,255,65,.4)" stroke-width="1.5" marker-end="url(#arr)"/>
          <line x1="993" y1="160" x2="1040" y2="160" stroke="rgba(0,255,65,.4)" stroke-width="1.5"/>

          <!-- STAGE 1: CODE -->
          <g class="sbom-stage" data-tip="Developer writes code. Pre-commit hooks run secret scanning and lint.">
            <rect x="22" y="135" width="88" height="50" rx="4" fill="rgba(0,12,6,.8)" stroke="rgba(0,255,65,.28)" stroke-width="1.2"/>
            <text x="66" y="155" text-anchor="middle" fill="#eef5ee" font-size="8.5" font-family="JetBrains Mono,monospace" font-weight="600">CODE</text>
            <text x="66" y="168" text-anchor="middle" fill="rgba(0,255,65,.5)" font-size="7" font-family="JetBrains Mono,monospace">pre-commit</text>
            <text x="66" y="178" text-anchor="middle" fill="rgba(200,220,200,.55)" font-size="6.5" font-family="JetBrains Mono,monospace">secret scan</text>
          </g>

          <!-- STAGE 2: COMMIT -->
          <g class="sbom-stage" data-tip="Signed commit pushed. Branch protection + CODEOWNERS enforce PR-only merges.">
            <rect x="163" y="135" width="73" height="50" rx="4" fill="rgba(0,12,6,.8)" stroke="rgba(0,255,65,.28)" stroke-width="1.2"/>
            <text x="200" y="155" text-anchor="middle" fill="#eef5ee" font-size="8.5" font-family="JetBrains Mono,monospace" font-weight="600">COMMIT</text>
            <text x="200" y="168" text-anchor="middle" fill="rgba(0,255,65,.5)" font-size="7" font-family="JetBrains Mono,monospace">signed</text>
            <text x="200" y="178" text-anchor="middle" fill="rgba(200,220,200,.55)" font-size="6.5" font-family="JetBrains Mono,monospace">PR only</text>
          </g>

          <!-- STAGE 3: CI SCAN ← security gate -->
          <g class="sbom-stage sbom-gate" data-tip="CI security gate: SAST, SCA, secrets scan, IaC scan. Fails block merge. Evidence retained.">
            <rect x="289" y="128" width="73" height="64" rx="4" fill="rgba(0,20,8,.88)" stroke="rgba(0,255,65,.5)" stroke-width="1.8"/>
            <rect x="289" y="128" width="73" height="12" rx="4" fill="rgba(0,255,65,.12)"/>
            <text x="325" y="137.5" text-anchor="middle" fill="rgba(0,255,65,.8)" font-size="6" font-family="JetBrains Mono,monospace">⬡ GATE 1</text>
            <text x="325" y="154" text-anchor="middle" fill="#eef5ee" font-size="8.5" font-family="JetBrains Mono,monospace" font-weight="600">CI SCAN</text>
            <text x="325" y="166" text-anchor="middle" fill="rgba(0,255,65,.5)" font-size="6.5" font-family="JetBrains Mono,monospace">SAST / SCA</text>
            <text x="325" y="176" text-anchor="middle" fill="rgba(0,255,65,.5)" font-size="6.5" font-family="JetBrains Mono,monospace">Secrets / IaC</text>
            <text x="325" y="185" text-anchor="middle" fill="rgba(200,220,200,.55)" font-size="6" font-family="JetBrains Mono,monospace">evidence</text>
          </g>

          <!-- STAGE 4: BUILD -->
          <g class="sbom-stage" data-tip="Deterministic build. Ephemeral runner. Output is a tagged container image.">
            <rect x="415" y="135" width="73" height="50" rx="4" fill="rgba(0,12,6,.8)" stroke="rgba(0,255,65,.28)" stroke-width="1.2"/>
            <text x="451" y="155" text-anchor="middle" fill="#eef5ee" font-size="8.5" font-family="JetBrains Mono,monospace" font-weight="600">BUILD</text>
            <text x="451" y="168" text-anchor="middle" fill="rgba(0,255,65,.5)" font-size="7" font-family="JetBrains Mono,monospace">immutable</text>
            <text x="451" y="178" text-anchor="middle" fill="rgba(200,220,200,.55)" font-size="6.5" font-family="JetBrains Mono,monospace">v1.0 tag</text>
          </g>

          <!-- STAGE 5: SBOM+SIGN ← security gate -->
          <g class="sbom-stage sbom-gate" data-tip="SBOM generated with Syft. Image signed with Cosign/Sigstore. Digest recorded. Supply chain provenance attached.">
            <rect x="541" y="128" width="73" height="64" rx="4" fill="rgba(0,20,8,.88)" stroke="rgba(0,255,65,.5)" stroke-width="1.8"/>
            <rect x="541" y="128" width="73" height="12" rx="4" fill="rgba(0,255,65,.12)"/>
            <text x="578" y="137.5" text-anchor="middle" fill="rgba(0,255,65,.8)" font-size="6" font-family="JetBrains Mono,monospace">⬡ GATE 2</text>
            <text x="578" y="154" text-anchor="middle" fill="#eef5ee" font-size="8.5" font-family="JetBrains Mono,monospace" font-weight="600">SBOM</text>
            <text x="578" y="166" text-anchor="middle" fill="rgba(0,255,65,.5)" font-size="6.5" font-family="JetBrains Mono,monospace">Syft generate</text>
            <text x="578" y="176" text-anchor="middle" fill="rgba(0,255,65,.5)" font-size="6.5" font-family="JetBrains Mono,monospace">Cosign sign</text>
            <text x="578" y="185" text-anchor="middle" fill="rgba(200,220,200,.55)" font-size="6" font-family="JetBrains Mono,monospace">digest lock</text>
          </g>

          <!-- STAGE 6: IMAGE SCAN ← security gate -->
          <g class="sbom-stage sbom-gate" data-tip="Container image scanned: Trivy + Prisma Cloud cross-validation. Policy threshold blocks on criticals.">
            <rect x="667" y="128" width="73" height="64" rx="4" fill="rgba(0,20,8,.88)" stroke="rgba(0,255,65,.5)" stroke-width="1.8"/>
            <rect x="667" y="128" width="73" height="12" rx="4" fill="rgba(0,255,65,.12)"/>
            <text x="704" y="137.5" text-anchor="middle" fill="rgba(0,255,65,.8)" font-size="6" font-family="JetBrains Mono,monospace">⬡ GATE 3</text>
            <text x="704" y="154" text-anchor="middle" fill="#eef5ee" font-size="8.5" font-family="JetBrains Mono,monospace" font-weight="600">IMG SCAN</text>
            <text x="704" y="166" text-anchor="middle" fill="rgba(0,255,65,.5)" font-size="6.5" font-family="JetBrains Mono,monospace">Trivy</text>
            <text x="704" y="176" text-anchor="middle" fill="rgba(0,255,65,.5)" font-size="6.5" font-family="JetBrains Mono,monospace">Prisma Cloud</text>
            <text x="704" y="185" text-anchor="middle" fill="rgba(200,220,200,.55)" font-size="6" font-family="JetBrains Mono,monospace">CVE gate</text>
          </g>

          <!-- STAGE 7: PROMOTE/DEPLOY ← security gate -->
          <g class="sbom-stage sbom-gate" data-tip="Controlled promotion: Dev → UAT → Prod. QA approves. Only digest-verified images eligible. No rebuilds in prod.">
            <rect x="793" y="128" width="73" height="64" rx="4" fill="rgba(0,20,8,.88)" stroke="rgba(0,255,65,.5)" stroke-width="1.8"/>
            <rect x="793" y="128" width="73" height="12" rx="4" fill="rgba(0,255,65,.12)"/>
            <text x="829" y="137.5" text-anchor="middle" fill="rgba(0,255,65,.8)" font-size="6" font-family="JetBrains Mono,monospace">⬡ GATE 4</text>
            <text x="829" y="154" text-anchor="middle" fill="#eef5ee" font-size="8.5" font-family="JetBrains Mono,monospace" font-weight="600">PROMOTE</text>
            <text x="829" y="166" text-anchor="middle" fill="rgba(0,255,65,.5)" font-size="6.5" font-family="JetBrains Mono,monospace">Dev→UAT→Prod</text>
            <text x="829" y="176" text-anchor="middle" fill="rgba(0,255,65,.5)" font-size="6.5" font-family="JetBrains Mono,monospace">QA approval</text>
            <text x="829" y="185" text-anchor="middle" fill="rgba(200,220,200,.55)" font-size="6" font-family="JetBrains Mono,monospace">digest verify</text>
          </g>

          <!-- STAGE 8: RUNTIME -->
          <g class="sbom-stage" data-tip="Kubernetes runtime: admission control, RBAC, securityContext, network policies. DAST post-deploy. SIEM monitoring.">
            <rect x="919" y="135" width="73" height="50" rx="4" fill="rgba(0,12,6,.8)" stroke="rgba(0,230,100,.35)" stroke-width="1.5" filter="url(#glow)"/>
            <text x="955" y="155" text-anchor="middle" fill="#eef5ee" font-size="8.5" font-family="JetBrains Mono,monospace" font-weight="600">RUNTIME</text>
            <text x="955" y="168" text-anchor="middle" fill="rgba(0,255,65,.6)" font-size="7" font-family="JetBrains Mono,monospace">K8s ✓ DAST</text>
            <text x="955" y="178" text-anchor="middle" fill="rgba(200,220,200,.55)" font-size="6.5" font-family="JetBrains Mono,monospace">SIEM + RBAC</text>
          </g>

          <!-- Reject path: SCAN blocks → drops to bottom -->
          <g opacity="0.65">
            <line x1="325" y1="192" x2="325" y2="255" stroke="rgba(255,100,100,.5)" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#arr-red)"/>
            <rect x="282" y="256" width="86" height="26" rx="3" fill="rgba(40,0,0,.7)" stroke="rgba(255,100,100,.35)" stroke-width="1"/>
            <text x="325" y="268" text-anchor="middle" fill="rgba(255,130,130,.8)" font-size="7.5" font-family="JetBrains Mono,monospace">✕ BLOCKED</text>
            <text x="325" y="277" text-anchor="middle" fill="rgba(255,130,130,.5)" font-size="6.5" font-family="JetBrains Mono,monospace">evidence retained</text>

            <!-- also from gate 2 -->
            <line x1="578" y1="192" x2="578" y2="255" stroke="rgba(255,100,100,.5)" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#arr-red)"/>
            <rect x="536" y="256" width="84" height="26" rx="3" fill="rgba(40,0,0,.7)" stroke="rgba(255,100,100,.35)" stroke-width="1"/>
            <text x="578" y="268" text-anchor="middle" fill="rgba(255,130,130,.8)" font-size="7.5" font-family="JetBrains Mono,monospace">✕ BLOCKED</text>
            <text x="578" y="277" text-anchor="middle" fill="rgba(255,130,130,.5)" font-size="6.5" font-family="JetBrains Mono,monospace">CVE &gt; threshold</text>
          </g>

          <!-- Top labels -->
          <text x="540" y="25" text-anchor="middle" fill="rgba(0,255,65,.35)" font-size="8" font-family="JetBrains Mono,monospace" letter-spacing="3">SUPPLY CHAIN INTEGRITY PIPELINE — ANSHUMAAN SINGH</text>
          <text x="540" y="38" text-anchor="middle" fill="rgba(200,220,200,.3)" font-size="7" font-family="JetBrains Mono,monospace">⬡ = Security Gate · Every gate leaves evidence · No untrusted artifact reaches runtime</text>

          <!-- Status bar: bottom -->
          <text x="20" y="308" fill="rgba(0,255,65,.4)" font-size="7" font-family="JetBrains Mono,monospace">[STATUS: ACTIVE]</text>
          <text x="180" y="308" fill="rgba(200,220,200,.3)" font-size="7" font-family="JetBrains Mono,monospace">4 Security Gates · SBOM enabled · Digest-locked promotions</text>
          <text x="900" y="308" fill="rgba(0,255,65,.4)" font-size="7" font-family="JetBrains Mono,monospace">0 prod incidents</text>
        </svg>
      </div>

      <!-- Stage details below SVG -->
      <div class="sbom-stages-detail stagger">
        <div class="sbom-detail-card reveal">
          <div class="sdc-icon" aria-hidden="true">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          </div>
          <h4>Source Governance</h4>
          <p>Pre-commit hooks · Signed commits · PR-only merges · CODEOWNERS · Branch protection rules</p>
        </div>
        <div class="sbom-detail-card reveal">
          <div class="sdc-icon" aria-hidden="true">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          </div>
          <h4>CI Security Gates</h4>
          <p>SAST · SCA · Secret scanning · IaC scan · Evidence retained per build · Deterministic pass/fail</p>
        </div>
        <div class="sbom-detail-card reveal">
          <div class="sdc-icon" aria-hidden="true">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
          <h4>SBOM + Signing</h4>
          <p>Syft generates SBOM · Cosign signs image · Digest locked · Supply chain provenance · Attestation attached</p>
        </div>
        <div class="sbom-detail-card reveal">
          <div class="sdc-icon" aria-hidden="true">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h4>Controlled Promotions</h4>
          <p>Build once → Dev → UAT → Prod · QA approval gates · Digest-only deployments · No rebuilds in production</p>
        </div>
        <div class="sbom-detail-card reveal">
          <div class="sdc-icon" aria-hidden="true">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <h4>Runtime Enforcement</h4>
          <p>Kubernetes admission control · RBAC · securityContext · Network policies · DAST post-deploy · SIEM monitoring</p>
        </div>
      </div>
    </section>

'''

# Insert after architecture section closes
arch_end_marker = '    <!-- CASE STUDIES -->'
if SBOM_FLOW_SECTION.strip()[:30] not in html_src and arch_end_marker in html_src:
    html_src = html_src.replace(arch_end_marker, SBOM_FLOW_SECTION + arch_end_marker)
    print("✓ Added interactive SBOM pipeline flow section")
else:
    print("⚠  SBOM flow section already exists or marker not found")

open(HTML, "w", encoding="utf-8").write(html_src)
print(f"  index.html → {len(html_src.splitlines())} lines")


# ══════════════════════════════════════════════════════════════
# 3. CSS — Bigger layout, GitHub project cards, SBOM diagram,
#          cursor fix (left/top reset), icon styles
# ══════════════════════════════════════════════════════════════
css_append = r"""

/* ═══════════════════════════════════════════════════════════
   V9 SYSTEM — World-class layout: cursor, bigger container,
   GitHub project cards, SBOM flow diagram, icon system
   ══════════════════════════════════════════════════════════ */

/* ── CURSOR V9: transform-only, no left/top ── */
.cursor-dot,
.cursor-ring {
  position: fixed !important;
  top:  0 !important;
  left: 0 !important;
  pointer-events: none !important;
  z-index: 99999 !important;
  border-radius: 50% !important;
  will-change: transform !important;
  transition: width .15s ease, height .15s ease,
              border-color .15s ease, background .15s ease !important;
}
.cursor-dot {
  width:  5px !important;
  height: 5px !important;
  background: #00ff41 !important;
  box-shadow: 0 0 6px #00ff41, 0 0 12px rgba(0,255,65,.4) !important;
}
.cursor-ring {
  width:  26px !important;
  height: 26px !important;
  border: 1.5px solid rgba(0,255,65,.35) !important;
  background: transparent !important;
}
body.hovering .cursor-ring {
  border-color: rgba(0,255,65,.6) !important;
}

/* ── BIGGER CONTAINER: max 1440px ── */
[data-theme='dark'] .container {
  max-width: 1400px !important;
  padding-left: clamp(20px, 5vw, 72px) !important;
  padding-right: clamp(20px, 5vw, 72px) !important;
}

/* ── BIGGER SECTIONS: more breathing room ── */
[data-theme='dark'] .section {
  padding: clamp(56px, 8vw, 96px) clamp(28px, 5vw, 64px) !important;
  margin-bottom: 28px !important;
}

/* ── BIGGER HEADINGS ── */
[data-theme='dark'] h1 {
  font-size: clamp(2.8rem, 7vw, 6rem) !important;
  line-height: 1.06 !important;
  letter-spacing: -.03em !important;
}
[data-theme='dark'] h2 {
  font-size: clamp(1.7rem, 3.5vw, 2.6rem) !important;
  font-weight: 700 !important;
  letter-spacing: -.025em !important;
}
[data-theme='dark'] h3 {
  font-size: clamp(1.05rem, 2vw, 1.4rem) !important;
  font-weight: 600 !important;
}
[data-theme='dark'] h4 {
  font-size: clamp(.92rem, 1.5vw, 1.1rem) !important;
  font-weight: 600 !important;
}

/* ── HERO: taller, more impact ── */
[data-theme='dark'] .hero {
  min-height: 100dvh !important;
  padding-top: clamp(96px, 14vw, 140px) !important;
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: clamp(40px, 6vw, 96px) !important;
  align-items: center !important;
}
@media (max-width: 900px) {
  [data-theme='dark'] .hero {
    grid-template-columns: 1fr !important;
    padding-top: 100px !important;
    min-height: auto !important;
  }
}

/* ── CARD GRID: 3-column then 2 ── */
[data-theme='dark'] .grid-2 {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 440px), 1fr)) !important;
  gap: clamp(16px, 3vw, 28px) !important;
}

/* ── CARDS: bigger padding, bigger corner radius ── */
[data-theme='dark'] .card,
[data-theme='dark'] .phil-card,
[data-theme='dark'] .case-card,
[data-theme='dark'] .edu-card {
  padding: clamp(24px, 4vw, 36px) !important;
  border-radius: 8px !important;
}

/* ── SEC-HEADER: bigger ── */
[data-theme='dark'] .sec-header h2 {
  margin-bottom: .35em !important;
}
[data-theme='dark'] .sec-num {
  font-size: .68rem !important;
  letter-spacing: .12em !important;
}

/* ════════════════════════════════════════════════
   GITHUB PROJECT CARDS (gh-card)
   ════════════════════════════════════════════════ */
[data-theme='dark'] .gh-projects-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr)) !important;
  gap: 20px !important;
  margin-top: 32px !important;
}

[data-theme='dark'] .gh-card {
  background: rgba(8,18,10,.82) !important;
  border: 1px solid rgba(0,200,60,.1) !important;
  border-radius: 8px !important;
  padding: 22px 22px 18px !important;
  transition: border-color .2s, box-shadow .2s, transform .25s ease !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
  position: relative !important;
  overflow: hidden !important;
}
[data-theme='dark'] .gh-card::before {
  content: '' !important;
  position: absolute !important;
  top: 0; left: 0; right: 0 !important;
  height: 2px !important;
  background: linear-gradient(90deg, transparent, rgba(0,255,65,.3), transparent) !important;
  opacity: 0 !important;
  transition: opacity .2s !important;
}
[data-theme='dark'] .gh-card:hover {
  border-color: rgba(0,255,65,.25) !important;
  box-shadow: 0 8px 32px rgba(0,0,0,.4), 0 0 0 1px rgba(0,255,65,.08) !important;
}
[data-theme='dark'] .gh-card:hover::before {
  opacity: 1 !important;
}

/* Card header */
[data-theme='dark'] .gh-card-head {
  display: flex !important;
  align-items: flex-start !important;
  gap: 12px !important;
}
[data-theme='dark'] .gh-icon-wrap {
  flex-shrink: 0 !important;
  width: 40px !important;
  height: 40px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: rgba(0,255,65,.06) !important;
  border: 1px solid rgba(0,255,65,.12) !important;
  border-radius: 6px !important;
  color: rgba(0,255,65,.6) !important;
}
[data-theme='dark'] .gh-card-head > div:nth-child(2) {
  flex: 1 !important;
  min-width: 0 !important;
}
[data-theme='dark'] .gh-repo-name {
  font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
  font-size: .88rem !important;
  font-weight: 600 !important;
  color: #eef5ee !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  margin: 0 0 4px !important;
}
[data-theme='dark'] .gh-lang-badge {
  font-family: 'JetBrains Mono', monospace !important;
  font-size: .62rem !important;
  color: rgba(0,255,65,.5) !important;
  background: rgba(0,255,65,.06) !important;
  border: 1px solid rgba(0,255,65,.12) !important;
  border-radius: 3px !important;
  padding: 1px 6px !important;
}
[data-theme='dark'] .gh-ext-link {
  flex-shrink: 0 !important;
  color: rgba(0,255,65,.35) !important;
  transition: color .15s !important;
  margin-top: 2px !important;
}
[data-theme='dark'] .gh-ext-link:hover { color: #00ff41 !important; }

/* Description */
[data-theme='dark'] .gh-desc {
  font-size: .845rem !important;
  color: #b8ccb8 !important;
  line-height: 1.65 !important;
  flex: 1 !important;
  margin: 0 !important;
}

/* Topics row */
[data-theme='dark'] .gh-topics {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 6px !important;
}
[data-theme='dark'] .gh-topic {
  font-family: 'JetBrains Mono', monospace !important;
  font-size: .61rem !important;
  color: rgba(0,200,80,.65) !important;
  background: rgba(0,200,80,.05) !important;
  border: 1px solid rgba(0,200,80,.12) !important;
  border-radius: 20px !important;
  padding: 2px 8px !important;
}

/* Meta footer */
[data-theme='dark'] .gh-meta {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  padding-top: 10px !important;
  border-top: 1px solid rgba(0,200,60,.08) !important;
}
[data-theme='dark'] .gh-meta-item {
  display: flex !important;
  align-items: center !important;
  gap: 5px !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-size: .67rem !important;
  color: rgba(180,200,180,.55) !important;
}
[data-theme='dark'] .gh-meta-item svg { flex-shrink: 0 !important; color: rgba(0,255,65,.35) !important; }
[data-theme='dark'] .gh-meta-item.gh-featured {
  color: rgba(0,255,65,.55) !important;
  margin-left: auto !important;
}

/* CTA */
[data-theme='dark'] .gh-cta {
  margin-top: 32px !important;
  text-align: center !important;
}

/* ════════════════════════════════════════════════
   SBOM INTERACTIVE PIPELINE SECTION
   ════════════════════════════════════════════════ */
[data-theme='dark'] .sbom-section {
  overflow: hidden !important;
}

[data-theme='dark'] .sbom-flow-wrap {
  margin: 32px 0 !important;
  border: 1px solid rgba(0,200,60,.1) !important;
  border-radius: 8px !important;
  background: rgba(4,12,6,.7) !important;
  overflow-x: auto !important;
  padding: 24px 16px !important;
  cursor: default !important;
}

[data-theme='dark'] .sbom-svg {
  width: 100% !important;
  min-width: 680px !important;
  height: auto !important;
  display: block !important;
}

/* Stage hover: glow effect */
[data-theme='dark'] .sbom-stage rect {
  transition: stroke .2s, filter .2s !important;
}
[data-theme='dark'] .sbom-stage:hover rect {
  stroke: rgba(0,255,65,.7) !important;
  filter: drop-shadow(0 0 6px rgba(0,255,65,.25)) !important;
}

/* Gates: pulsing top accent */
@keyframes gate-pulse {
  0%, 100% { opacity: .5 }
  50% { opacity: 1 }
}
[data-theme='dark'] .sbom-gate rect:first-child {
  animation: gate-pulse 2.5s ease-in-out infinite !important;
}

/* Tooltip on hover (via JS title) */
[data-theme='dark'] .sbom-stage { cursor: help !important; }

/* Detail cards below SVG */
[data-theme='dark'] .sbom-stages-detail {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)) !important;
  gap: 14px !important;
  margin-top: 24px !important;
}

[data-theme='dark'] .sbom-detail-card {
  background: rgba(8,18,10,.78) !important;
  border: 1px solid rgba(0,200,60,.1) !important;
  border-radius: 6px !important;
  padding: 18px 16px !important;
  transition: border-color .2s !important;
}
[data-theme='dark'] .sbom-detail-card:hover {
  border-color: rgba(0,255,65,.22) !important;
}
[data-theme='dark'] .sbom-detail-card .sdc-icon {
  color: rgba(0,255,65,.55) !important;
  margin-bottom: 10px !important;
}
[data-theme='dark'] .sbom-detail-card h4 {
  font-size: .82rem !important;
  font-weight: 600 !important;
  color: #d8ecd8 !important;
  margin: 0 0 6px !important;
}
[data-theme='dark'] .sbom-detail-card p {
  font-size: .78rem !important;
  color: #9ab29a !important;
  line-height: 1.6 !important;
  margin: 0 !important;
  letter-spacing: 0 !important;
}

/* ── SECTION FOCUS CALLOUT: what each section is about ── */
[data-theme='dark'] .sec-focus-bar {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  background: rgba(0,255,65,.04) !important;
  border: 1px solid rgba(0,255,65,.1) !important;
  border-left: 3px solid rgba(0,255,65,.5) !important;
  border-radius: 0 6px 6px 0 !important;
  padding: 10px 16px !important;
  margin-bottom: 28px !important;
  font-size: .78rem !important;
  color: #9ab89a !important;
  font-family: 'JetBrains Mono', monospace !important;
}
[data-theme='dark'] .sec-focus-bar strong {
  color: rgba(0,255,65,.7) !important;
}

/* ── MOBILE RESPONSIVE: keep readable on phones ── */
@media (max-width: 768px) {
  [data-theme='dark'] .gh-projects-grid {
    grid-template-columns: 1fr !important;
  }
  [data-theme='dark'] .sbom-stages-detail {
    grid-template-columns: 1fr 1fr !important;
  }
  [data-theme='dark'] .sbom-flow-wrap {
    padding: 12px 8px !important;
  }
}
@media (max-width: 480px) {
  [data-theme='dark'] .sbom-stages-detail {
    grid-template-columns: 1fr !important;
  }
}

/* ── TOPBAR: slightly taller for bigger feel ── */
[data-theme='dark'] .topbar {
  min-height: 66px !important;
}

/* ── NAV-LINK: bigger hit area ── */
[data-theme='dark'] .nav-link {
  padding: 6px 10px !important;
  font-size: .82rem !important;
}

/* ── KPI GRID: bigger numbers ── */
[data-theme='dark'] .v7-val {
  font-size: clamp(1.8rem, 4vw, 2.8rem) !important;
}
[data-theme='dark'] .kpi-lbl {
  font-size: .68rem !important;
  letter-spacing: .06em !important;
}

/* ── IMPACT BANNER: more prominent ── */
[data-theme='dark'] .impact-num {
  font-size: clamp(2.2rem, 5vw, 3.8rem) !important;
}

/* ── PHILOSOPHY GRID: 3-col on wide ── */
[data-theme='dark'] .philosophy-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)) !important;
  gap: 20px !important;
}

/* ── TIMELINE: wider content area ── */
[data-theme='dark'] .timeline-item {
  border-radius: 8px !important;
  padding: clamp(24px,5vw,40px) !important;
}

/* ── SECTION NUMBERS: slightly bigger ── */
[data-theme='dark'] .sec-num {
  font-size: .7rem !important;
}

/* ── CODE / MONO: readable size ── */
[data-theme='dark'] code { font-size: .83em !important; }

/* ── ANCHOR DEEP-LINK OFFSET (so topbar doesn't cover) ── */
[data-theme='dark'] section[id] {
  scroll-margin-top: 80px !important;
}

/* ── reduce browser cursor fighting on elements ── */
[data-theme='dark'] a, [data-theme='dark'] button, [data-theme='dark'] [role=button] {
  cursor: none !important;
}

/* ── SBOM section in nav dots ── */
[data-theme='dark'] .sdot[data-s="sbom-flow"] { display: block !important; }
"""

with open(CSS, "a", encoding="utf-8") as f:
    f.write(css_append)

# Update sitemap to add sbom-flow
sitemap_path = os.path.join(BASE, "sitemap.xml")
try:
    s = open(sitemap_path, encoding="utf-8").read()
    if "sbom-flow" not in s:
        s = s.replace("</urlset>", """  <url>
    <loc>https://www.devsecopswithanshu.com/#sbom-flow</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>""")
        open(sitemap_path, "w", encoding="utf-8").write(s)
        print("✓ Updated sitemap.xml with sbom-flow")
except:
    print("⚠  Could not update sitemap")

lines_js  = int(subprocess.check_output(["wc","-l",JS]).split()[0])
lines_html = int(subprocess.check_output(["wc","-l",HTML]).split()[0])
lines_css  = int(subprocess.check_output(["wc","-l",CSS]).split()[0])
print(f"\n  script.js   → {lines_js} lines")
print(f"  index.html  → {lines_html} lines")
print(f"  styles.css  → {lines_css} lines")
print("\n✅ V9 master overhaul complete!")
