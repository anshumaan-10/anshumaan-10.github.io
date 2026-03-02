#!/usr/bin/env python3
"""V14 — Cloud-Native Hacker UI
  • Deep navy background (GCP/K8s console feel), not pure black
  • Green hacker accent + cloud-blue secondary
  • Multi-layer surface elevation system
  • New GCP-style Security Control Plane Dashboard widget
  • New K8s Workload Status table
  • Redesigned typography & heading treatment
  • Denser section content throughout
"""
import datetime

HTML = "index.html"
CSS  = "styles.css"
JS   = "script.js"

with open(HTML, encoding="utf-8") as f: html = f.read()
with open(CSS,  encoding="utf-8") as f: css  = f.read()
with open(JS,   encoding="utf-8") as f: js   = f.read()

results = []
def patch(name, old, new, buf="html"):
    global html, css, js
    src = {"html":html,"css":css,"js":js}[buf]
    if old not in src:
        results.append(f"  ✗ MISS  {name}"); return
    if new in src:
        results.append(f"  ✓ SKIP  {name}"); return
    if buf=="html":  html = html.replace(old, new, 1)
    elif buf=="css": css  = css.replace(old, new, 1)
    else:            js   = js.replace(old, new, 1)
    results.append(f"  ✓ OK    {name}")

# ══════════════════════════════════════════════════════════════════
# 1. REPLACE root :root tokens — cloud-native navy + hacker green
# ══════════════════════════════════════════════════════════════════
OLD_ROOT = """/* ── DESIGN TOKENS ── */
:root {
  --accent-r: 139; --accent-g: 92; --accent-b: 246;
  --accent: rgb(var(--accent-r), var(--accent-g), var(--accent-b));
  --accent-glow: rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.35);
  --accent-soft: rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.12);

  --bg:  #060911;
  --bg2: #0d1117;
  --bg3: #161b24;
  --surface:  rgba(255,255,255,0.04);
  --surface2: rgba(255,255,255,0.08);
  --border:  rgba(255,255,255,0.08);
  --border2: rgba(255,255,255,0.14);

  --text:     #e8eaf0;
  --text-sub: #a0a8b8;
  --text-muted: #606880;"""

NEW_ROOT = """/* ── DESIGN TOKENS — V14 Cloud-Native Hacker ── */
:root {
  /* Primary: Hacker green */
  --r-green:   #00e676;
  --r-accent:  #69ffb4;
  --r-head:    #e8f5ec;

  /* Secondary: Cloud blue (GCP/K8s feel) */
  --cloud-blue:      #4a9eff;
  --cloud-blue-dim:  rgba(74,158,255,.18);
  --cloud-blue-glow: rgba(74,158,255,.30);
  --k8s-teal:        #00bcd4;
  --k8s-teal-dim:    rgba(0,188,212,.15);

  /* Accent system mapped to green for existing classes */
  --accent-r: 0; --accent-g: 230; --accent-b: 118;
  --accent:      #00e676;
  --accent-glow: rgba(0,230,118,.28);
  --accent-soft: rgba(0,230,118,.10);

  /* Backgrounds: navy layers (NOT pure black) */
  --bg:  #080e1a;
  --bg2: #0c1526;
  --bg3: #111e35;
  --bg4: #162540;

  /* Surfaces: elevated panels like cloud consoles */
  --surface:  rgba(255,255,255,.04);
  --surface2: rgba(255,255,255,.07);
  --surface3: rgba(74,158,255,.06);

  /* Borders: blue-tinted */
  --border:  rgba(74,158,255,.12);
  --border2: rgba(74,158,255,.22);
  --border-green: rgba(0,230,118,.18);

  /* Text: cool-white with slight blue tint */
  --text:       #e2eeff;
  --text-sub:   #8ba8cc;
  --text-muted: #4a6080;"""

patch("Root design tokens", OLD_ROOT, NEW_ROOT, "css")

# ══════════════════════════════════════════════════════════════════
# 2. REPLACE dark-theme override to match new tokens
# ══════════════════════════════════════════════════════════════════
OLD_DARK = """[data-theme='dark'] {
  --bg:#060911; --bg2:#0d1117; --bg3:#161b24;
  --text:#e8eaf0; --text-sub:#a0a8b8; --text-muted:#606880;
  --surface:rgba(255,255,255,.04); --border:rgba(255,255,255,.08);
}"""
NEW_DARK = """[data-theme='dark'] {
  --bg:#080e1a; --bg2:#0c1526; --bg3:#111e35;
  --text:#e2eeff; --text-sub:#8ba8cc; --text-muted:#4a6080;
  --surface:rgba(255,255,255,.04); --border:rgba(74,158,255,.12);
}"""
patch("Dark theme tokens", OLD_DARK, NEW_DARK, "css")

# ══════════════════════════════════════════════════════════════════
# 3. REPLACE the V13.1 Hacker Mode block — full new design system
# ══════════════════════════════════════════════════════════════════
OLD_HACKER = "/* ══ HACKER MODE — V13.1 Full Terminal Aesthetic ══ */"
# We'll keep up to this marker and append the replacement after it
if OLD_HACKER in css:
    idx = css.index(OLD_HACKER)
    css = css[:idx]
    results.append("  ✓ OK    Stripped old V13.1 hacker block")
else:
    results.append("  ✗ MISS  V13.1 hacker block not found — appending anyway")

# ══════════════════════════════════════════════════════════════════
# 4. GCP-Style Control Plane Dashboard widget — after kpi-grid
# ══════════════════════════════════════════════════════════════════
DASH_AFTER = """        </div>

        <div class="hero-cta reveal">"""
DASH_HTML = """        </div>

        <!-- GCP-STYLE SECURITY CONTROL PLANE DASHBOARD -->
        <div class="cp-dashboard reveal" aria-label="Security control plane live status">
          <div class="cpd-header">
            <span class="cpd-status-dot cpd-ok" aria-hidden="true"></span>
            <span class="cpd-title mono">Security Control Plane — All Systems Nominal</span>
            <span class="cpd-updated mono muted">Updated: just now</span>
          </div>
          <div class="cpd-rows">
            <div class="cpd-row">
              <span class="cpd-icon" aria-hidden="true">🔒</span>
              <span class="cpd-name">CI/CD Gates</span>
              <div class="cpd-bar-wrap"><div class="cpd-bar" style="--p:100%"></div></div>
              <span class="cpd-val mono">350+ active</span>
              <span class="cpd-chip cpd-chip-ok">PASS</span>
            </div>
            <div class="cpd-row">
              <span class="cpd-icon" aria-hidden="true">📦</span>
              <span class="cpd-name">SBOM Coverage</span>
              <div class="cpd-bar-wrap"><div class="cpd-bar" style="--p:100%"></div></div>
              <span class="cpd-val mono">100%</span>
              <span class="cpd-chip cpd-chip-ok">PASS</span>
            </div>
            <div class="cpd-row">
              <span class="cpd-icon" aria-hidden="true">☸</span>
              <span class="cpd-name">K8s CIS Benchmark</span>
              <div class="cpd-bar-wrap"><div class="cpd-bar" style="--p:100%"></div></div>
              <span class="cpd-val mono">100%</span>
              <span class="cpd-chip cpd-chip-ok">PASS</span>
            </div>
            <div class="cpd-row">
              <span class="cpd-icon" aria-hidden="true">🛡</span>
              <span class="cpd-name">OWASP Top 10</span>
              <div class="cpd-bar-wrap"><div class="cpd-bar" style="--p:93%"></div></div>
              <span class="cpd-val mono">93%</span>
              <span class="cpd-chip cpd-chip-blue">REVIEW</span>
            </div>
            <div class="cpd-row">
              <span class="cpd-icon" aria-hidden="true">🔍</span>
              <span class="cpd-name">Production Incidents</span>
              <div class="cpd-bar-wrap"><div class="cpd-bar cpd-bar-zero" style="--p:2%"></div></div>
              <span class="cpd-val mono">0</span>
              <span class="cpd-chip cpd-chip-ok">CLEAR</span>
            </div>
          </div>
        </div>

        <div class="hero-cta reveal">"""
patch("CP Dashboard widget", DASH_AFTER, DASH_HTML)

# ══════════════════════════════════════════════════════════════════
# 5. K8s Workload Status table — after experience timeline
# ══════════════════════════════════════════════════════════════════
K8S_AFTER = """      <p class="mono muted reveal">Two years. One team. One mission: make insecure releases structurally impossible across 350+ microservices.</p>

      <div class="timeline">"""
K8S_HTML = """      <p class="mono muted reveal">Two years. One team. One mission: make insecure releases structurally impossible across 350+ microservices.</p>

      <!-- K8S WORKLOAD STATUS TABLE -->
      <div class="k8s-status-table glass reveal" aria-label="Kubernetes workload security status">
        <div class="k8s-table-header">
          <div class="k8s-th-left">
            <span class="k8s-logo" aria-hidden="true">☸</span>
            <span class="k8s-title mono">Cluster Security Status — Production</span>
          </div>
          <span class="k8s-ns mono muted">namespace: zee-prod-*</span>
        </div>
        <div class="k8s-table-body" role="table">
          <div class="k8s-row k8s-head" role="row">
            <span role="columnheader">Workload</span>
            <span role="columnheader">Type</span>
            <span role="columnheader">Replicas</span>
            <span role="columnheader">Image Policy</span>
            <span role="columnheader">Last Scan</span>
            <span role="columnheader">Status</span>
          </div>
          <div class="k8s-row" role="row">
            <span class="mono k8s-name" role="cell">api-gateway</span>
            <span class="mono muted" role="cell">Deployment</span>
            <span class="mono" role="cell">3/3</span>
            <span class="mono k8s-policy-ok" role="cell">✓ signed</span>
            <span class="mono muted" role="cell">00:01 ago</span>
            <span class="k8s-badge k8s-running" role="cell">Running</span>
          </div>
          <div class="k8s-row" role="row">
            <span class="mono k8s-name" role="cell">auth-service</span>
            <span class="mono muted" role="cell">Deployment</span>
            <span class="mono" role="cell">5/5</span>
            <span class="mono k8s-policy-ok" role="cell">✓ signed</span>
            <span class="mono muted" role="cell">00:02 ago</span>
            <span class="k8s-badge k8s-running" role="cell">Running</span>
          </div>
          <div class="k8s-row" role="row">
            <span class="mono k8s-name" role="cell">sbom-validator</span>
            <span class="mono muted" role="cell">CronJob</span>
            <span class="mono" role="cell">1/1</span>
            <span class="mono k8s-policy-ok" role="cell">✓ attested</span>
            <span class="mono muted" role="cell">00:00 ago</span>
            <span class="k8s-badge k8s-running" role="cell">Running</span>
          </div>
          <div class="k8s-row" role="row">
            <span class="mono k8s-name" role="cell">falco-daemonset</span>
            <span class="mono muted" role="cell">DaemonSet</span>
            <span class="mono" role="cell">12/12</span>
            <span class="mono k8s-policy-ok" role="cell">✓ signed</span>
            <span class="mono muted" role="cell">00:01 ago</span>
            <span class="k8s-badge k8s-running" role="cell">Running</span>
          </div>
          <div class="k8s-row" role="row">
            <span class="mono k8s-name" role="cell">kyverno-admission</span>
            <span class="mono muted" role="cell">Deployment</span>
            <span class="mono" role="cell">2/2</span>
            <span class="mono k8s-policy-ok" role="cell">✓ policy</span>
            <span class="mono muted" role="cell">00:00 ago</span>
            <span class="k8s-badge k8s-running" role="cell">Running</span>
          </div>
        </div>
        <div class="k8s-table-foot mono muted">
          All workloads enforce: no-root · read-only-fs · resource limits · digest-pinned images
        </div>
      </div>

      <div class="timeline">"""
patch("K8s workload status table", K8S_AFTER, K8S_HTML)

# ══════════════════════════════════════════════════════════════════
# 6. APPEND the full V14 design-system CSS
# ══════════════════════════════════════════════════════════════════
css += r"""

/* ══ V14 — Cloud-Native Hacker Design System ══ */

/* ── 1. Base: deep navy surfaces, not pure black ─────── */
body {
  background: var(--bg) !important;
  background-image:
    radial-gradient(ellipse 80% 50% at 20% -10%, rgba(74,158,255,.07) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 110%, rgba(0,230,118,.05) 0%, transparent 55%);
  background-attachment: fixed;
}

/* Scanlines — subtler, navy-tuned */
body::before {
  content: '';
  position: fixed; inset: 0; z-index: 9990; pointer-events: none;
  background: repeating-linear-gradient(
    0deg, transparent, transparent 3px,
    rgba(0,0,0,.04) 3px, rgba(0,0,0,.04) 4px
  );
}

/* Noise texture */
body::after {
  content: '';
  position: fixed; inset: 0; z-index: 9989; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  opacity: .4;
}

/* ── 2. Glass panels — layered elevation ─────────────── */
.glass {
  background: rgba(11,20,40,.72) !important;
  backdrop-filter: blur(16px) saturate(1.4) !important;
  border-color: var(--border) !important;
}

.section.glass {
  background: rgba(10,18,36,.68) !important;
  border: 1px solid var(--border) !important;
  border-top: 1px solid rgba(74,158,255,.16) !important;
  box-shadow:
    0 1px 0 rgba(74,158,255,.08) inset,
    0 24px 64px rgba(0,0,0,.35) !important;
  position: relative;
}

/* Top edge highlight like GCP card header */
.section.glass::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(74,158,255,.35) 30%,
    rgba(0,230,118,.25) 70%,
    transparent 100%
  );
  border-radius: inherit;
}

/* ── 3. Typography — cloud-console quality ───────────── */
:root {
  --font-sans: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

body {
  font-family: var(--font-body) !important;
  font-size: 15.5px;
  line-height: 1.72;
  color: var(--text) !important;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5 {
  font-family: var(--font-sans) !important;
  font-weight: 700;
  color: #d8eeff !important;
  letter-spacing: -.02em;
  line-height: 1.2;
}

h1 { font-size: clamp(2.6rem,5.5vw,4.2rem) !important; color: #e8f4ff !important; }
h2 { font-size: clamp(1.55rem,3.2vw,2.1rem) !important; color: #c8deee !important; }
h3 { font-size: clamp(1.05rem,1.8vw,1.3rem) !important; color: #a8c4d8 !important; }

/* Section number prefix */
.h2-prompt {
  font-family: 'JetBrains Mono', monospace !important;
  font-size: .5em !important;
  color: rgba(0,230,118,.45) !important;
  font-weight: 400 !important;
  letter-spacing: .06em !important;
  margin-right: .5em;
  vertical-align: middle;
}
h2::before { display: none !important; }

/* Body text */
p, li, dd {
  font-family: 'Inter', system-ui, sans-serif !important;
  color: var(--text-sub) !important;
  font-size: .95rem;
  line-height: 1.76;
}
strong { color: #d8eeff !important; font-weight: 600 !important; }
a { color: var(--cloud-blue) !important; transition: color .15s; }
a:hover { color: #7dbfff !important; }

.mono {
  font-family: 'JetBrains Mono', monospace !important;
  font-size: .84rem !important;
  letter-spacing: .01em;
}

/* ── 4. Navigation — cloud-console topbar ───────────── */
#topbar {
  background: rgba(6,12,24,.92) !important;
  border-bottom: 1px solid rgba(74,158,255,.14) !important;
  backdrop-filter: blur(20px) !important;
}
.nav-link { color: #8ba8cc !important; font-size: .82rem; }
.nav-link:hover { color: #00e676 !important; }
.brand-name { color: #e2eeff !important; }

/* ── 5. Buttons ──────────────────────────────────────── */
.btn-primary {
  background: var(--r-green, #00e676) !important;
  color: #020d08 !important;
  box-shadow: 0 0 20px rgba(0,230,118,.28) !important;
  font-weight: 700 !important;
}
.btn-primary:hover {
  box-shadow: 0 0 38px rgba(0,230,118,.5) !important;
  transform: translateY(-1px);
}
.btn-outline {
  border-color: rgba(74,158,255,.4) !important;
  color: var(--cloud-blue) !important;
}
.btn-outline:hover {
  background: rgba(74,158,255,.08) !important;
  border-color: rgba(74,158,255,.7) !important;
  color: #7dbfff !important;
}
.btn-ghost { color: #8ba8cc !important; }

/* ── 6. Cards ────────────────────────────────────────── */
.card, article.card {
  background: rgba(10,18,38,.8) !important;
  border-color: rgba(74,158,255,.10) !important;
  transition: border-color .2s, box-shadow .2s, transform .2s !important;
}
.card:hover {
  border-color: rgba(74,158,255,.28) !important;
  box-shadow: 0 8px 32px rgba(0,0,0,.4), 0 0 0 1px rgba(74,158,255,.12) !important;
  transform: translateY(-2px) !important;
}

/* ── 7. KPI cards — GCP metric card feel ────────────── */
.kpi-card {
  background: rgba(8,20,48,.8) !important;
  border: 1px solid rgba(74,158,255,.12) !important;
  border-top: 2px solid rgba(0,230,118,.4) !important;
  border-radius: 10px !important;
}
.kpi-val, .v7-val { color: #00e676 !important; }

/* ── 8. Accent & gradient ────────────────────────────── */
.gradient-text {
  background: linear-gradient(135deg, #00e676, #4a9eff) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}
.text-green { color: #00e676 !important; }

/* ── 9. Sec-num (section IDs) ──────────────────────────*/
.sec-num { color: rgba(74,158,255,.55) !important; letter-spacing: .12em !important; }

/* ── 10. Pills ───────────────────────────────────────── */
.pill {
  background: rgba(74,158,255,.07) !important;
  border-color: rgba(74,158,255,.18) !important;
  color: #8ba8cc !important;
}
.green-pill {
  background: rgba(0,230,118,.10) !important;
  border-color: rgba(0,230,118,.32) !important;
  color: #00e676 !important;
}

/* ── 11. Badges / chips ──────────────────────────────── */
.badge, .cert-pip {
  background: rgba(74,158,255,.10) !important;
  border-color: rgba(74,158,255,.22) !important;
  color: #7dbfff !important;
}

/* ── 12. Tech orbit & skill bars ─────────────────────── */
.tech-badge {
  background: rgba(74,158,255,.08) !important;
  border-color: rgba(74,158,255,.20) !important;
  color: #8ba8cc !important;
}
.tech-badge:hover {
  background: rgba(0,230,118,.10) !important;
  border-color: rgba(0,230,118,.35) !important;
  color: #00e676 !important;
}

/* ── 13. Scrollbar ───────────────────────────────────── */
::-webkit-scrollbar { width: 6px; background: #080e1a; }
::-webkit-scrollbar-thumb { background: rgba(74,158,255,.22); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(74,158,255,.4); }

/* ── 14. Text selection ──────────────────────────────── */
::selection { background: rgba(0,230,118,.22); color: #e2eeff; }

/* ── 15. Inputs ──────────────────────────────────────── */
.form-input, .chatbot-input, .cmd-input, .explorer-input {
  background: rgba(6,14,30,.9) !important;
  border-color: rgba(74,158,255,.2) !important;
  color: #e2eeff !important;
}
.form-input:focus, .chatbot-input:focus {
  border-color: rgba(0,230,118,.5) !important;
  box-shadow: 0 0 0 3px rgba(0,230,118,.08) !important;
  outline: none;
}
.form-input::placeholder, .chatbot-input::placeholder { color: rgba(74,158,255,.3) !important; }

/* ── 16. Hero H1 glitch ──────────────────────────────── */
h1 { animation: glitchIdle 10s ease-in-out infinite; }
@keyframes glitchIdle {
  0%,93%,100% { text-shadow: 0 0 40px rgba(0,230,118,.18), 0 0 80px rgba(74,158,255,.08); clip-path: none; transform: none; }
  94% { clip-path: inset(25% 0 55% 0); transform: translate(-3px,0); text-shadow: 3px 0 #00e676, -3px 0 rgba(74,158,255,.8); }
  95% { clip-path: inset(10% 0 75% 0); transform: translate(2px,0); }
  96% { clip-path: none; transform: none; }
  97% { clip-path: inset(55% 0 25% 0); transform: translate(-2px,0); text-shadow: -3px 0 #00e676, 3px 0 rgba(255,90,90,.5); }
  98% { clip-path: none; transform: none; }
}

/* ── 17. OTW banner ──────────────────────────────────── */
.otw-banner {
  background: linear-gradient(90deg, rgba(6,14,30,.95), rgba(8,20,48,.95)) !important;
  border-bottom: 1px solid rgba(0,230,118,.18) !important;
}

/* ── 18. CVE ticker ──────────────────────────────────── */
.cve-ticker {
  background: rgba(4,10,22,.92) !important;
  border-bottom: 1px solid rgba(74,158,255,.12) !important;
}

/* ── 19. Timeline ────────────────────────────────────── */
.timeline-item, .tl-head {
  border-color: rgba(74,158,255,.12) !important;
}
.timeline-item::before {
  border-color: rgba(0,230,118,.5) !important;
  background: rgba(0,230,118,.15) !important;
}

/* ── 20. GCP Security Control Plane Dashboard ───────── */
.cp-dashboard {
  background: rgba(6,14,32,.82);
  border: 1px solid rgba(74,158,255,.14);
  border-top: 2px solid rgba(0,230,118,.35);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1.5rem;
  box-shadow: 0 4px 24px rgba(0,0,0,.3), 0 0 0 1px rgba(74,158,255,.06) inset;
}
.cpd-header {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 16px;
  background: rgba(74,158,255,.05);
  border-bottom: 1px solid rgba(74,158,255,.10);
  flex-wrap: wrap;
}
.cpd-status-dot {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
}
.cpd-ok     { background: #00e676; box-shadow: 0 0 8px rgba(0,230,118,.7); animation: pulse 2s ease infinite; }
.cpd-warn   { background: #ffbd2e; box-shadow: 0 0 8px rgba(255,189,46,.5); }
.cpd-error  { background: #ff5f5f; box-shadow: 0 0 8px rgba(255,95,95,.5); }
.cpd-title  { font-family: 'JetBrains Mono', monospace; font-size: .76rem; color: rgba(0,230,118,.85); }
.cpd-updated { font-size: .68rem; margin-left: auto; color: rgba(139,168,204,.45); font-family: 'JetBrains Mono', monospace; }
.cpd-rows   { padding: 10px 16px; display: flex; flex-direction: column; gap: 6px; }
.cpd-row {
  display: grid;
  grid-template-columns: 22px 1fr 120px 72px 62px;
  align-items: center; gap: 10px;
  padding: 6px 8px; border-radius: 6px;
  transition: background .15s;
  font-size: .82rem;
}
.cpd-row:hover { background: rgba(74,158,255,.05); }
.cpd-icon   { text-align: center; font-size: .9rem; }
.cpd-name   { color: var(--text-sub); }
.cpd-bar-wrap {
  height: 4px; background: rgba(255,255,255,.06);
  border-radius: 2px; overflow: hidden;
}
.cpd-bar {
  height: 100%; width: var(--p, 0%);
  background: linear-gradient(90deg, #00e676, #4a9eff);
  border-radius: 2px;
  transition: width 1.2s cubic-bezier(.4,0,.2,1);
}
.cpd-bar-zero { background: linear-gradient(90deg, #4ade80, #00e676) !important; }
.cpd-val    { font-family: 'JetBrains Mono', monospace; font-size: .76rem; color: #00e676; text-align: right; }
.cpd-chip   { font-family: 'JetBrains Mono', monospace; font-size: .65rem; font-weight: 700;
  padding: 2px 8px; border-radius: 100px; text-align: center; letter-spacing: .06em; }
.cpd-chip-ok   { background: rgba(0,230,118,.12); border: 1px solid rgba(0,230,118,.28); color: #00e676; }
.cpd-chip-blue { background: rgba(74,158,255,.12); border: 1px solid rgba(74,158,255,.28); color: #4a9eff; }
.cpd-chip-warn { background: rgba(255,189,46,.12); border: 1px solid rgba(255,189,46,.28); color: #ffbd2e; }

/* ── 21. K8s Workload Status Table ───────────────────── */
.k8s-status-table {
  border-radius: 12px;
  border: 1px solid rgba(0,188,212,.15) !important;
  border-top: 2px solid rgba(0,188,212,.4) !important;
  overflow: hidden;
  margin-bottom: 2rem;
}
.k8s-table-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 18px;
  background: rgba(0,188,212,.06);
  border-bottom: 1px solid rgba(0,188,212,.10);
  flex-wrap: wrap; gap: 8px;
}
.k8s-logo { font-size: 1.1rem; margin-right: 6px; }
.k8s-title { font-size: .78rem; color: rgba(0,188,212,.85); }
.k8s-ns    { font-size: .7rem; }
.k8s-table-body { padding: 6px 0; }
.k8s-row {
  display: grid;
  grid-template-columns: 1.6fr .8fr .7fr 1fr .8fr .8fr;
  gap: 8px; padding: 7px 18px;
  border-bottom: 1px solid rgba(255,255,255,.03);
  align-items: center;
  transition: background .15s;
}
.k8s-row:hover { background: rgba(0,188,212,.04); }
.k8s-row:last-of-type { border-bottom: none; }
.k8s-head {
  font-family: 'JetBrains Mono', monospace;
  font-size: .68rem; letter-spacing: .08em;
  color: rgba(139,168,204,.4) !important;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(0,188,212,.12) !important;
  padding-bottom: 8px !important;
}
.k8s-name { color: #e2eeff !important; }
.k8s-policy-ok { color: #00e676 !important; }
.k8s-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: .65rem; font-weight: 700; letter-spacing: .06em;
  padding: 2px 8px; border-radius: 100px;
}
.k8s-running { background: rgba(0,230,118,.12); border: 1px solid rgba(0,230,118,.28); color: #00e676; }
.k8s-pending { background: rgba(255,189,46,.12); border: 1px solid rgba(255,189,46,.28); color: #ffbd2e; }
.k8s-error   { background: rgba(255,95,95,.12);  border: 1px solid rgba(255,95,95,.28);  color: #ff5f5f; }
.k8s-table-foot {
  padding: 8px 18px; font-size: .7rem;
  border-top: 1px solid rgba(0,188,212,.08);
  background: rgba(0,188,212,.03);
}

/* ── 22. Impact banner upgrade ───────────────────────── */
.v7-impact, .impact-banner {
  background: linear-gradient(90deg, rgba(6,14,30,.97) 0%, rgba(8,20,48,.97) 100%) !important;
  border-top: 1px solid rgba(74,158,255,.10) !important;
  border-bottom: 1px solid rgba(74,158,255,.10) !important;
}
.impact-num { color: #00e676 !important; }
.impact-hex { color: rgba(74,158,255,.5) !important; }

/* ── 23. Cert cards ───────────────────────────────────── */
.cert-card {
  border-color: rgba(74,158,255,.10) !important;
  background: rgba(8,18,38,.85) !important;
}
.cert-card:hover { border-color: rgba(0,230,118,.25) !important; }

/* ── 24. Footer ───────────────────────────────────────── */
footer {
  background: rgba(4,10,22,.95) !important;
  border-top: 1px solid rgba(74,158,255,.12) !important;
}

/* ── 25. Quick connect terminal ──────────────────────── */
.qc-terminal {
  background: rgba(6,14,32,.9) !important;
  border-color: rgba(0,230,118,.22) !important;
}
.qc-bar {
  background: rgba(0,230,118,.05) !important;
  border-bottom-color: rgba(0,230,118,.12) !important;
}

/* ── 26. Explorer badge ───────────────────────────────── */
.explorer-badge {
  background: rgba(6,14,30,.88) !important;
  border-color: rgba(74,158,255,.20) !important;
}

/* ── 27. OTW resume CTA button ───────────────────────── */
.otw-resume-cta {
  background: rgba(0,230,118,.12) !important;
  border-color: rgba(0,230,118,.3) !important;
  color: #00e676 !important;
}

/* ── 28. Hire-float button ───────────────────────────── */
.hire-float-btn {
  background: #00e676 !important;
  color: #020d08 !important;
  box-shadow: 0 4px 24px rgba(0,230,118,.35) !important;
}

/* ── 29. Posture score card accent ───────────────────── */
.posture-score-card {
  border-top: 2px solid rgba(0,230,118,.35) !important;
}

/* ── 30. Currently-building widget ───────────────────── */
.currently-building {
  border: 1px solid rgba(74,158,255,.14) !important;
  border-top: 2px solid rgba(74,158,255,.4) !important;
}

/* ── 31. Responsive ───────────────────────────────────── */
@media (max-width: 768px) {
  .cpd-row { grid-template-columns: 22px 1fr 60px; }
  .cpd-bar-wrap, .cpd-val { display: none; }
  .k8s-row { grid-template-columns: 1.4fr .8fr .8fr; }
  .k8s-row > span:nth-child(n+4) { display: none; }
}
"""
results.append("  ✓ OK    V14 CSS appended")

# ══════════════════════════════════════════════════════════════════
# 7. APPEND JS — animate CP dashboard bars on scroll
# ══════════════════════════════════════════════════════════════════
V14_JS = "/* ══ V14 JS ══ */"
if V14_JS not in js:
    js += r"""

/* ══ V14 JS ══ */
(function initCPDashboard() {
  const dashboard = document.querySelector('.cp-dashboard');
  if (!dashboard) return;
  // Bars already set via CSS --p variable; animate on intersection
  const bars = dashboard.querySelectorAll('.cpd-bar');
  bars.forEach(b => { b.style.width = '0'; });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        bars.forEach(b => { b.style.width = b.style.getPropertyValue('--p') || b.parentElement?.nextElementSibling?.textContent; });
        // Use the CSS var
        bars.forEach(b => {
          const p = b.getAttribute('style').match(/--p:\s*([^;]+)/)?.[1] || '0%';
          b.style.width = '0';
          requestAnimationFrame(() => {
            setTimeout(() => { b.style.width = p; }, 100);
          });
        });
        io.disconnect();
      }
    });
  }, { threshold: 0.4 });
  io.observe(dashboard);
})();
"""
    results.append("  ✓ OK    V14 JS appended")
else:
    results.append("  ✓ SKIP  V14 JS")

# ── write ──────────────────────────────────────────────────────────
with open(HTML, "w", encoding="utf-8") as f: f.write(html)
with open(CSS,  "w", encoding="utf-8") as f: f.write(css)
with open(JS,   "w", encoding="utf-8") as f: f.write(js)

print(f"\nV14 Report — {datetime.datetime.now():%Y-%m-%d %H:%M}")
print(f"  index.html : {html.count(chr(10))+1} lines")
print(f"  styles.css : {css.count(chr(10))+1} lines")
print(f"  script.js  : {js.count(chr(10))+1} lines\n")
for r in results: print(r)
print("\nDone.\n")
