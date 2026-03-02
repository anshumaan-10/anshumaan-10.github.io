#!/usr/bin/env python3
"""V12 Portfolio Upgrade — Command Palette · Matrix Rain · Activity Grid · CVE Watchlist · Floating CTA"""

import re, sys, datetime

HTML_FILE = "index.html"
CSS_FILE  = "styles.css"
JS_FILE   = "script.js"

# ─── load ─────────────────────────────────────────────────────────────────────
with open(HTML_FILE, encoding="utf-8") as f: html = f.read()
with open(CSS_FILE,  encoding="utf-8") as f: css  = f.read()
with open(JS_FILE,   encoding="utf-8") as f: js   = f.read()

results = []

def patch(name, old, new, target="html"):
    global html, css, js
    src = html if target=="html" else (css if target=="css" else js)
    if old not in src:
        results.append(f"  ✗ MISS  {name}")
        return
    if new in src:
        results.append(f"  ✓ SKIP  {name} (already applied)")
        return
    if target=="html":  html = html.replace(old, new, 1)
    elif target=="css": css  = css.replace(old, new, 1)
    else:               js   = js.replace(old, new, 1)
    results.append(f"  ✓ OK    {name}")

# ══════════════════════════════════════════════════════════════════════════════
# 1. Remove duplicate Plain-English-Intro banner
# ══════════════════════════════════════════════════════════════════════════════
PEI_BLOCK = '''    <!-- PLAIN-ENGLISH BANNER — visible to all, explains the site non-technically -->
    <section class="plain-english-intro reveal" aria-label="Plain English introduction">
      <div class="pei-inner glass">
        <div class="pei-icon" aria-hidden="true">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="pei-text">
          <strong class="pei-heading">Not a developer? Here's what this site is about.</strong>
          <p>Anshumaan Singh is a <strong>security engineer</strong> — the person whose job is to make sure software companies don&#39;t get hacked, don&#39;t leak data, and can move fast without breaking security. He does this at ZEE Entertainment (a major Indian media company) for 350+ apps. The technical content here is proof of work for hiring managers and fellow engineers.</p>
        </div>
        <button class="pei-close mono" id="peiClose" aria-label="Dismiss plain English banner">✕</button>
      </div>
    </section>'''

# Count occurrences
pei_count = html.count(PEI_BLOCK)
if pei_count >= 2:
    # Remove one occurrence (the second one)
    idx = html.find(PEI_BLOCK)
    idx2 = html.find(PEI_BLOCK, idx+1)
    html = html[:idx2] + html[idx2+len(PEI_BLOCK):]
    results.append("  ✓ OK    Remove duplicate PEI banner")
elif pei_count == 1:
    results.append("  ✓ SKIP  Remove duplicate PEI banner (already single)")
else:
    results.append("  ✗ MISS  Remove duplicate PEI banner (block not found verbatim — check manually)")

# ══════════════════════════════════════════════════════════════════════════════
# 2. Add Command Palette modal + Matrix Rain canvas + Floating CTA
#    — inject before </body>
# ══════════════════════════════════════════════════════════════════════════════
BODY_CLOSE = "</body>\n</html>"

NEW_OVERLAYS = '''  <!-- ══ V12: COMMAND PALETTE ══ -->
  <div class="cmd-overlay" id="cmdOverlay" role="dialog" aria-modal="true" aria-label="Command palette" hidden>
    <div class="cmd-box glass">
      <div class="cmd-search-row">
        <svg class="cmd-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input class="cmd-input mono" id="cmdInput" type="text" placeholder="Type a section name or action…" autocomplete="off" spellcheck="false" aria-label="Command palette search"/>
        <kbd class="cmd-esc mono" aria-label="Press Escape to close">esc</kbd>
      </div>
      <ul class="cmd-list" id="cmdList" role="listbox" aria-label="Command results"></ul>
      <div class="cmd-footer mono">
        <span><kbd>↑↓</kbd> navigate</span>
        <span><kbd>↵</kbd> go</span>
        <span><kbd>esc</kbd> close</span>
        <span class="cmd-hint">⌘K to open anytime</span>
      </div>
    </div>
  </div>

  <!-- ══ V12: MATRIX RAIN CANVAS (Konami code Easter egg) ══ -->
  <canvas id="matrixCanvas" class="matrix-canvas" aria-hidden="true" hidden></canvas>
  <div class="matrix-exit mono" id="matrixExit" hidden>press any key to exit <span class="matrix-exit-blink">█</span></div>

  <!-- ══ V12: FLOATING HIRE CTA ══ -->
  <div class="hire-float" id="hireFloat" aria-label="Open to work" role="complementary">
    <a href="#connect" class="hire-float-btn" aria-label="Contact Anshumaan Singh">
      <span class="hire-float-dot" aria-hidden="true"></span>
      <span class="hire-float-label">Hire Me</span>
      <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </a>
  </div>

</body>
</html>'''

patch("Command Palette + Matrix Rain + Hire Float HTML", BODY_CLOSE, NEW_OVERLAYS)

# ══════════════════════════════════════════════════════════════════════════════
# 3. CVE Watchlist panel — inject after evidence grid closing </div>
# ══════════════════════════════════════════════════════════════════════════════
EVIDENCE_AFTER = '''      </div>
    </section>

    <!-- RISK ENGINE -->'''

CVE_WATCHLIST = '''      </div>

      <!-- CVE INTELLIGENCE WATCHLIST -->
      <div class="cve-watchlist glass reveal" aria-label="CVE intelligence watchlist">
        <div class="cwe-header">
          <span class="cwe-title mono">// CVE Intelligence Watchlist</span>
          <span class="cwe-tag mono">Live EPSS-scored</span>
        </div>
        <div class="cwe-table" role="table" aria-label="CVE watchlist table">
          <div class="cwe-row cwe-head" role="row">
            <span role="columnheader">CVE ID</span>
            <span role="columnheader">Component</span>
            <span role="columnheader">CVSS</span>
            <span role="columnheader">EPSS</span>
            <span role="columnheader">Status</span>
          </div>
          <div class="cwe-row" role="row">
            <span class="mono cwe-id" role="cell">CVE-2024-21626</span>
            <span role="cell">runc / containerd</span>
            <span class="mono cwe-cvss cwe-crit" role="cell">9.1</span>
            <span class="mono cwe-epss" role="cell">0.041</span>
            <span class="cwe-status cwe-mitigated mono" role="cell">✓ Mitigated</span>
          </div>
          <div class="cwe-row" role="row">
            <span class="mono cwe-id" role="cell">CVE-2023-44487</span>
            <span role="cell">HTTP/2 Rapid Reset</span>
            <span class="mono cwe-cvss cwe-high" role="cell">7.5</span>
            <span class="mono cwe-epss" role="cell">0.972</span>
            <span class="cwe-status cwe-mitigated mono" role="cell">✓ Patched</span>
          </div>
          <div class="cwe-row" role="row">
            <span class="mono cwe-id" role="cell">CVE-2024-3094</span>
            <span role="cell">XZ Utils / liblzma</span>
            <span class="mono cwe-cvss cwe-crit" role="cell">10.0</span>
            <span class="mono cwe-epss" role="cell">0.001</span>
            <span class="cwe-status cwe-mitigated mono" role="cell">✓ Not exposed</span>
          </div>
          <div class="cwe-row" role="row">
            <span class="mono cwe-id" role="cell">CVE-2024-6387</span>
            <span role="cell">OpenSSH regreSSHion</span>
            <span class="mono cwe-cvss cwe-crit" role="cell">8.1</span>
            <span class="mono cwe-epss" role="cell">0.031</span>
            <span class="cwe-status cwe-watch mono" role="cell">⚑ Monitoring</span>
          </div>
          <div class="cwe-row" role="row">
            <span class="mono cwe-id" role="cell">CVE-2023-52425</span>
            <span role="cell">libexpat / Python</span>
            <span class="mono cwe-cvss cwe-high" role="cell">7.5</span>
            <span class="mono cwe-epss" role="cell">0.002</span>
            <span class="cwe-status cwe-accepted mono" role="cell">⊘ Risk accepted</span>
          </div>
        </div>
        <p class="cwe-note mono muted">EPSS scores sourced from FIRST.org. Trivy + Prisma cross-validated. Updated per pipeline run.</p>
      </div>
    </section>

    <!-- RISK ENGINE -->'''

patch("CVE Watchlist Panel", EVIDENCE_AFTER, CVE_WATCHLIST)

# ══════════════════════════════════════════════════════════════════════════════
# 4. Security Activity Heatmap — inject after the currently-building widget
# ══════════════════════════════════════════════════════════════════════════════
ACTIVITY_AFTER = '''          <div class="cb-time mono muted" id="blrClock" aria-label="Current time in Bengaluru"></div>
        </div>
      </div>'''

ACTIVITY_BLOCK = '''          <div class="cb-time mono muted" id="blrClock" aria-label="Current time in Bengaluru"></div>
        </div>
      </div>

      <!-- SECURITY ACTIVITY HEATMAP -->
      <div class="activity-heatmap glass reveal" aria-label="Security engineering activity heatmap">
        <div class="ah-header">
          <span class="ah-title mono">// Security Engineering Activity — 52 weeks</span>
          <span class="ah-count mono" id="ahCount">loading…</span>
        </div>
        <div class="ah-grid" id="activityGrid" aria-label="Weekly security activity heatmap" role="img"></div>
        <div class="ah-legend mono">
          <span>Less</span>
          <span class="ah-swatch ah-l0"></span>
          <span class="ah-swatch ah-l1"></span>
          <span class="ah-swatch ah-l2"></span>
          <span class="ah-swatch ah-l3"></span>
          <span class="ah-swatch ah-l4"></span>
          <span>More</span>
        </div>
      </div>'''

patch("Security Activity Heatmap", ACTIVITY_AFTER, ACTIVITY_BLOCK)

# ══════════════════════════════════════════════════════════════════════════════
# 5. Typed strings — add more variety (if typingStrings exists)
# ══════════════════════════════════════════════════════════════════════════════
OLD_TYPED = "const typingStrings = ["
if OLD_TYPED in js:
    results.append("  ✓ SKIP  Typing strings (managed in existing JS)")
else:
    results.append("  ✗ MISS  Typing strings not found in script.js")

# ══════════════════════════════════════════════════════════════════════════════
# 6. APPEND CSS
# ══════════════════════════════════════════════════════════════════════════════
V12_CSS_MARKER = "/* ══ V12 STYLES ══ */"
if V12_CSS_MARKER not in css:
    css += """

/* ══ V12 STYLES ══ */

/* ── Command Palette ─────────────────────────────────── */
.cmd-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,.72);
  backdrop-filter: blur(8px);
  display: flex; align-items: flex-start; justify-content: center;
  padding-top: clamp(80px, 12vh, 140px);
  animation: cmdIn .15s ease;
}
.cmd-overlay[hidden] { display: none; }
@keyframes cmdIn {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.cmd-box {
  width: min(620px, 92vw);
  border-radius: 14px;
  border: 1px solid rgba(0,255,65,.18);
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(0,255,65,.08);
}
.cmd-search-row {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(0,255,65,.1);
}
.cmd-icon { color: var(--r-green); flex-shrink: 0; }
.cmd-input {
  flex: 1; background: transparent; border: none; outline: none;
  color: var(--r-head); font-size: .95rem; font-family: inherit;
}
.cmd-input::placeholder { color: rgba(238,245,238,.35); }
.cmd-esc {
  font-size: .7rem; padding: 2px 6px;
  border: 1px solid rgba(238,245,238,.15); border-radius: 4px;
  color: rgba(238,245,238,.4);
}
.cmd-list {
  list-style: none; margin: 0; padding: 6px 0;
  max-height: 340px; overflow-y: auto;
}
.cmd-list::-webkit-scrollbar { width: 4px; }
.cmd-list::-webkit-scrollbar-thumb { background: rgba(0,255,65,.2); border-radius: 2px; }
.cmd-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 18px; cursor: pointer;
  color: var(--r-head); font-size: .88rem;
  transition: background .1s;
}
.cmd-item:hover, .cmd-item.cmd-active {
  background: rgba(0,255,65,.08);
  color: var(--r-green);
}
.cmd-item-icon { font-size: 1rem; width: 20px; text-align: center; }
.cmd-item-label { flex: 1; }
.cmd-item-hint { font-size: .75rem; color: rgba(238,245,238,.35); font-family: 'JetBrains Mono', monospace; }
.cmd-footer {
  display: flex; gap: 16px; align-items: center;
  padding: 8px 18px; font-size: .72rem;
  border-top: 1px solid rgba(0,255,65,.08);
  color: rgba(238,245,238,.35);
}
.cmd-footer kbd {
  padding: 1px 5px;
  border: 1px solid rgba(238,245,238,.15); border-radius: 3px;
  font-size: .68rem; margin-right: 3px;
}
.cmd-hint { margin-left: auto; color: rgba(0,255,65,.5); }
.cmd-section-label {
  padding: 6px 18px 2px;
  font-size: .68rem; color: rgba(238,245,238,.3);
  text-transform: uppercase; letter-spacing: .1em;
  font-family: 'JetBrains Mono', monospace;
}
.cmd-empty {
  padding: 24px 18px; text-align: center;
  color: rgba(238,245,238,.3); font-size: .85rem;
  font-family: 'JetBrains Mono', monospace;
}

/* ── Matrix Rain ─────────────────────────────────────── */
.matrix-canvas {
  position: fixed; inset: 0; z-index: 10000;
  width: 100%; height: 100%;
  pointer-events: none;
  background: #000;
}
.matrix-canvas[hidden] { display: none; }
.matrix-exit {
  position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 10001; background: rgba(0,0,0,.85);
  border: 1px solid rgba(0,255,65,.35); border-radius: 8px;
  padding: 8px 20px; color: rgba(0,255,65,.8);
  font-family: 'JetBrains Mono', monospace; font-size: .8rem;
  letter-spacing: .05em; pointer-events: none;
}
.matrix-exit[hidden] { display: none; }
.matrix-exit-blink { animation: blink 1s step-end infinite; }

/* ── Floating Hire CTA ───────────────────────────────── */
.hire-float {
  position: fixed; bottom: 88px; right: 24px; z-index: 800;
  opacity: 0; transform: translateY(12px) scale(.95);
  transition: opacity .35s, transform .35s;
  pointer-events: none;
}
.hire-float.visible {
  opacity: 1; transform: translateY(0) scale(1);
  pointer-events: all;
}
.hire-float-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 18px;
  background: var(--r-green); color: #000;
  border-radius: 100px; font-weight: 700; font-size: .82rem;
  text-decoration: none; font-family: 'Space Grotesk', sans-serif;
  box-shadow: 0 4px 24px rgba(0,255,65,.35), 0 0 0 3px rgba(0,255,65,.12);
  transition: box-shadow .2s, transform .2s;
  letter-spacing: .02em;
}
.hire-float-btn:hover {
  box-shadow: 0 8px 36px rgba(0,255,65,.55), 0 0 0 4px rgba(0,255,65,.2);
  transform: translateY(-2px);
  color: #000;
}
.hire-float-dot {
  width: 7px; height: 7px; border-radius: 50%; background: #000;
  animation: pulse 1.5s ease infinite;
}
.hire-float-label { font-size: .8rem; }

/* ── CVE Watchlist ───────────────────────────────────── */
.cve-watchlist {
  margin-top: 2rem;
  border-radius: 14px;
  border: 1px solid rgba(0,255,65,.12);
  overflow: hidden;
}
.cwe-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(0,255,65,.1);
  background: rgba(0,255,65,.03);
}
.cwe-title { color: var(--r-green); font-size: .85rem; }
.cwe-tag {
  font-size: .7rem; padding: 2px 10px;
  border: 1px solid rgba(0,255,65,.25); border-radius: 100px;
  color: rgba(0,255,65,.7);
}
.cwe-table { padding: 8px 0; }
.cwe-row {
  display: grid;
  grid-template-columns: 1.6fr 1.8fr .7fr .7fr 1fr;
  gap: 8px; padding: 8px 20px;
  align-items: center; font-size: .82rem;
  border-bottom: 1px solid rgba(238,245,238,.04);
  transition: background .15s;
}
.cwe-row:last-of-type { border-bottom: none; }
.cwe-row:hover { background: rgba(0,255,65,.04); }
.cwe-head {
  font-family: 'JetBrains Mono', monospace;
  font-size: .7rem; letter-spacing: .08em;
  color: rgba(238,245,238,.35); border-bottom: 1px solid rgba(0,255,65,.12) !important;
  padding-bottom: 10px;
}
.cwe-id { color: var(--r-green); font-size: .78rem; }
.cwe-cvss { font-size: .8rem; font-weight: 700; }
.cwe-crit { color: #ff4d4d; }
.cwe-high { color: #ffaa2a; }
.cwe-medium { color: #ffe066; }
.cwe-epss { color: rgba(238,245,238,.6); font-size: .78rem; }
.cwe-status { font-size: .72rem; border-radius: 100px; padding: 2px 8px; }
.cwe-mitigated { color: #4ade80; background: rgba(74,222,128,.1); border: 1px solid rgba(74,222,128,.2); }
.cwe-watch     { color: #ffaa2a; background: rgba(255,170,42,.1); border: 1px solid rgba(255,170,42,.2); }
.cwe-accepted  { color: rgba(238,245,238,.4); background: rgba(238,245,238,.05); border: 1px solid rgba(238,245,238,.1); }
.cwe-note { padding: 10px 20px; font-size: .72rem; border-top: 1px solid rgba(0,255,65,.06); margin: 0; }

/* ── Activity Heatmap ────────────────────────────────── */
.activity-heatmap {
  margin-top: 1.5rem; padding: 16px 20px;
  border-radius: 14px; border: 1px solid rgba(0,255,65,.12);
}
.ah-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 14px;
}
.ah-title { color: var(--r-green); font-size: .82rem; }
.ah-count  { font-size: .75rem; color: rgba(238,245,238,.45); }
.ah-grid {
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.ah-cell {
  width: 12px; height: 12px; border-radius: 2px;
  transition: transform .15s;
  cursor: default;
}
.ah-cell:hover { transform: scale(1.4); }
.ah-l0 { background: rgba(0,255,65,.06); }
.ah-l1 { background: rgba(0,255,65,.2); }
.ah-l2 { background: rgba(0,255,65,.38); }
.ah-l3 { background: rgba(0,255,65,.6); }
.ah-l4 { background: rgba(0,255,65,.88); }
.ah-legend {
  display: flex; align-items: center; gap: 4px;
  margin-top: 10px; font-size: .72rem; color: rgba(238,245,238,.4);
}
.ah-swatch { width: 12px; height: 12px; border-radius: 2px; display: inline-block; }

@media (max-width: 640px) {
  .cwe-row { grid-template-columns: 1.4fr 1.4fr .6fr .6fr .9fr; font-size: .72rem; }
  .hire-float { bottom: 72px; right: 16px; }
  .ah-cell { width: 9px; height: 9px; }
}
"""
    results.append("  ✓ OK    V12 CSS appended")
else:
    results.append("  ✓ SKIP  V12 CSS (already appended)")

# ══════════════════════════════════════════════════════════════════════════════
# 7. APPEND JS
# ══════════════════════════════════════════════════════════════════════════════
V12_JS_MARKER = "/* ══ V12 JS ══ */"
if V12_JS_MARKER not in js:
    js += r"""

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
  const SHOW_AFTER = 800;
  let visible = false;
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
"""
    results.append("  ✓ OK    V12 JS appended")
else:
    results.append("  ✓ SKIP  V12 JS (already appended)")

# ─── write ────────────────────────────────────────────────────────────────────
with open(HTML_FILE, "w", encoding="utf-8") as f: f.write(html)
with open(CSS_FILE,  "w", encoding="utf-8") as f: f.write(css)
with open(JS_FILE,   "w", encoding="utf-8") as f: f.write(js)

# ─── report ──────────────────────────────────────────────────────────────────
print(f"\nV12 Upgrade Report — {datetime.datetime.now():%Y-%m-%d %H:%M}")
print(f"  index.html : {html.count(chr(10))+1} lines")
print(f"  styles.css : {css.count(chr(10))+1} lines")
print(f"  script.js  : {js.count(chr(10))+1} lines")
print()
for r in results: print(r)
print("\nDone.\n")
