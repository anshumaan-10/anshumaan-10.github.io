#!/usr/bin/env python3
"""V13 Portfolio Upgrade:
  1. CVE Intel Ticker strip (Bloomberg-style)
  2. Interactive CI/CD Pipeline Flow Visualizer (SVG+JS)
  3. "Ask Anshumaan" mini chatbot in Connect section
  4. Section Exploration tracker (gamified badge)
  5. Custom security cursor (crosshair)
  6. Copy-to-clipboard contact chips
  7. Ambient particle background on hero
"""

import re, datetime

HTML = "index.html"
CSS  = "styles.css"
JS   = "script.js"

with open(HTML, encoding="utf-8") as f: html = f.read()
with open(CSS,  encoding="utf-8") as f: css  = f.read()
with open(JS,   encoding="utf-8") as f: js   = f.read()

results = []

def patch(name, old, new, buf="html"):
    global html, css, js
    src = html if buf=="html" else (css if buf=="css" else js)
    if old not in src:
        results.append(f"  ✗ MISS  {name}")
        return
    if new in src:
        results.append(f"  ✓ SKIP  {name}")
        return
    if buf=="html":  html = html.replace(old, new, 1)
    elif buf=="css": css  = css.replace(old, new, 1)
    else:            js   = js.replace(old, new, 1)
    results.append(f"  ✓ OK    {name}")

# ══════════════════════════════════════════════════════════════════════════════
# 1. CVE INTEL TICKER  — insert after OTW banner, before scroll-progress div
# ══════════════════════════════════════════════════════════════════════════════
TICKER_AFTER = '''  <!-- SCROLL PROGRESS -->
  <div class="scroll-progress v7-progress" id="scrollProgress"'''

TICKER_HTML = '''  <!-- SCROLL PROGRESS -->
  <!-- CVE INTEL TICKER -->
  <div class="cve-ticker" id="cveTicker" aria-label="Live CVE intelligence ticker" role="marquee">
    <span class="cve-ticker-label mono">CVE INTEL</span>
    <div class="cve-ticker-track" id="cveTrack">
      <span class="cve-tick cve-crit">CVE-2024-21626&nbsp;runc&nbsp;CVSS:9.1&nbsp;EPSS:4.1%&nbsp;✓ MITIGATED</span>
      <span class="cve-sep">|</span>
      <span class="cve-tick cve-high">CVE-2023-44487&nbsp;HTTP/2 Rapid Reset&nbsp;CVSS:7.5&nbsp;EPSS:97.2%&nbsp;✓ PATCHED</span>
      <span class="cve-sep">|</span>
      <span class="cve-tick cve-crit">CVE-2024-3094&nbsp;XZ Utils&nbsp;CVSS:10.0&nbsp;EPSS:0.1%&nbsp;✓ NOT EXPOSED</span>
      <span class="cve-sep">|</span>
      <span class="cve-tick cve-crit">CVE-2024-6387&nbsp;OpenSSH regreSSHion&nbsp;CVSS:8.1&nbsp;EPSS:3.1%&nbsp;⚑ MONITORING</span>
      <span class="cve-sep">|</span>
      <span class="cve-tick cve-high">CVE-2024-45337&nbsp;golang.org/x/crypto&nbsp;CVSS:9.1&nbsp;EPSS:0.3%&nbsp;✓ MITIGATED</span>
      <span class="cve-sep">|</span>
      <span class="cve-tick cve-high">CVE-2024-10241&nbsp;Trivy&nbsp;CVSS:7.4&nbsp;EPSS:0.5%&nbsp;✓ UPDATED</span>
      <span class="cve-sep">|</span>
      <span class="cve-tick cve-ok">SBOM PIPELINE&nbsp;NOMINAL&nbsp;·&nbsp;ALL GATES ACTIVE&nbsp;·&nbsp;LAST SCAN: 00:00:01 AGO</span>
      <span class="cve-sep">|</span>
      <span class="cve-tick cve-ok">K8s CLUSTER&nbsp;CIS 100%&nbsp;·&nbsp;OWASP 93%&nbsp;·&nbsp;INCIDENTS: 0</span>
    </div>
  </div>
  <div class="scroll-progress v7-progress" id="scrollProgress"'''

patch("CVE Intel Ticker", TICKER_AFTER, TICKER_HTML)

# ══════════════════════════════════════════════════════════════════════════════
# 2. INTERACTIVE PIPELINE FLOW VISUALIZER — new section after #build
# ══════════════════════════════════════════════════════════════════════════════
PIPE_AFTER = '''    <section id="system" class="section glass"'''

PIPE_HTML = '''    <!-- PIPELINE FLOW VISUALIZER -->
    <section id="pipeline-flow" class="section glass" aria-label="Interactive CI/CD security pipeline visualizer" aria-labelledby="pf-h2">
      <header class="sec-header">
        <span class="sec-num mono" aria-hidden="true">★</span>
        <h2 id="pf-h2"><span class="h2-prompt" aria-hidden="true">./run-pipeline.sh</span> Live Pipeline Simulation</h2>
      </header>
      <div class="sec-rule" aria-hidden="true"></div>
      <p class="mono muted reveal">Click <strong>git push</strong> to watch a commit travel through the full security control plane — 7 gates, 0 bypass paths.</p>

      <div class="pipeline-viz reveal" aria-label="CI/CD pipeline visualization">
        <div class="pv-stages" id="pvStages">
          <div class="pv-stage" data-stage="0" data-label="git push" data-icon="⬆" data-detail="Commit triggers pipeline · Branch: feature/patch-131 · Actor: anshumaan">
            <div class="pv-node"></div>
            <div class="pv-stage-name mono">git push</div>
          </div>
          <div class="pv-arrow" aria-hidden="true"><div class="pv-packet" id="pkt0"></div></div>
          <div class="pv-stage" data-stage="1" data-label="SAST/SCA" data-icon="🔍" data-detail="Semgrep + Snyk · 0 high findings · 2 low accepted">
            <div class="pv-node"></div>
            <div class="pv-stage-name mono">SAST / SCA</div>
          </div>
          <div class="pv-arrow" aria-hidden="true"><div class="pv-packet" id="pkt1"></div></div>
          <div class="pv-stage" data-stage="2" data-label="Build" data-icon="🔨" data-detail="Docker build · Multi-stage · Distroless base · SHA256 generated">
            <div class="pv-node"></div>
            <div class="pv-stage-name mono">Build</div>
          </div>
          <div class="pv-arrow" aria-hidden="true"><div class="pv-packet" id="pkt2"></div></div>
          <div class="pv-stage" data-stage="3" data-label="Scan" data-icon="🛡" data-detail="Trivy + Prisma Cloud · Image: sha256:3a8f… · Criticals: 0 · SBOM attached">
            <div class="pv-node"></div>
            <div class="pv-stage-name mono">Image Scan</div>
          </div>
          <div class="pv-arrow" aria-hidden="true"><div class="pv-packet" id="pkt3"></div></div>
          <div class="pv-stage" data-stage="4" data-label="Sign" data-icon="🔏" data-detail="Cosign keyless signing · OIDC token · Rekor transparency log entry created">
            <div class="pv-node"></div>
            <div class="pv-stage-name mono">Sign</div>
          </div>
          <div class="pv-arrow" aria-hidden="true"><div class="pv-packet" id="pkt4"></div></div>
          <div class="pv-stage" data-stage="5" data-label="Promote" data-icon="📦" data-detail="Digest promoted to UAT registry · Kyverno policy verified · Approval logged">
            <div class="pv-node"></div>
            <div class="pv-stage-name mono">Promote</div>
          </div>
          <div class="pv-arrow" aria-hidden="true"><div class="pv-packet" id="pkt5"></div></div>
          <div class="pv-stage" data-stage="6" data-label="Deploy" data-icon="🚀" data-detail="kubectl rollout · Rollout strategy: RollingUpdate · Health probes passing · DAST triggered">
            <div class="pv-node"></div>
            <div class="pv-stage-name mono">K8s Deploy</div>
          </div>
        </div>

        <div class="pv-log glass" id="pvLog" aria-live="polite" aria-label="Pipeline log output">
          <div class="pv-log-header mono"><span class="pv-log-blink" aria-hidden="true">●</span> pipeline.log — click a stage or press Run</div>
          <div class="pv-log-body mono" id="pvLogBody">
            <div class="pv-log-line pv-idle">$ awaiting trigger… press Run Pipeline below</div>
          </div>
        </div>

        <div class="pv-controls">
          <button class="pv-run-btn btn btn-primary magnetic" id="pvRunBtn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Run Pipeline
          </button>
          <button class="pv-reset-btn btn btn-ghost" id="pvResetBtn" disabled>↺ Reset</button>
          <span class="pv-status mono" id="pvStatus"></span>
        </div>
      </div>
    </section>

    <section id="system" class="section glass"'''

patch("Pipeline Flow Visualizer", PIPE_AFTER, PIPE_HTML)

# ══════════════════════════════════════════════════════════════════════════════
# 3. "Ask Anshumaan" CHATBOT — insert inside #connect before contact form
# ══════════════════════════════════════════════════════════════════════════════
CHAT_AFTER = '''      <!-- Contact Form -->
      <div class="contact-form-wrap reveal">'''

CHATBOT_HTML = '''      <!-- ASK ANSHUMAAN CHATBOT -->
      <div class="chatbot-wrap reveal" aria-label="Ask Anshumaan chatbot">
        <div class="chatbot-box glass">
          <div class="chatbot-header mono">
            <span class="chatbot-dot" aria-hidden="true"></span>
            Ask Anshumaan — simulated Q&amp;A
            <span class="chatbot-hint mono muted">Try: "certs", "skills", "experience", "projects", "sbom", "k8s"</span>
          </div>
          <div class="chatbot-messages" id="chatMessages" aria-live="polite" aria-label="Chat messages">
            <div class="chat-msg bot-msg">
              <span class="chat-avatar" aria-hidden="true">A</span>
              <div class="chat-bubble">Hey! Ask me anything about my security engineering background — certs, skills, what I build at ZEE, SBOM, K8s, open source. I'll answer in character. 🔐</div>
            </div>
          </div>
          <form class="chatbot-form" id="chatForm" autocomplete="off" aria-label="Chat input form">
            <input class="chatbot-input mono" id="chatInput" type="text" placeholder="Type a question…" maxlength="120" aria-label="Type your question"/>
            <button type="submit" class="chatbot-send btn btn-primary" aria-label="Send message">→</button>
          </form>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="contact-form-wrap reveal">'''

patch("Ask Anshumaan Chatbot", CHAT_AFTER, CHATBOT_HTML)

# ══════════════════════════════════════════════════════════════════════════════
# 4. CONTACT CHIPS with 1-click copy — inject below connect section lead para
# ══════════════════════════════════════════════════════════════════════════════
CHIP_AFTER = '''      <div class="sec-divider-cmd mono" aria-hidden="true"><span class="sdc-line"></span><span class="sdc-text">// open channels</span><span class="sdc-line"></span></div>'''

CHIP_HTML = '''      <div class="sec-divider-cmd mono" aria-hidden="true"><span class="sdc-line"></span><span class="sdc-text">// open channels</span><span class="sdc-line"></span></div>
      <div class="contact-chips reveal" role="list" aria-label="Contact channels">
        <button class="contact-chip magnetic" data-copy="anshumaansingh10jan@gmail.com" aria-label="Copy email address" role="listitem">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2 4 12 13 22 4"/></svg>
          anshumaansingh10jan@gmail.com
          <span class="chip-copy-hint mono">click to copy</span>
        </button>
        <a class="contact-chip magnetic" href="https://www.linkedin.com/in/anshumaan-singh-6b51b5239/" target="_blank" rel="noopener noreferrer" role="listitem">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          LinkedIn ↗
        </a>
        <a class="contact-chip magnetic" href="https://github.com/anshumaan-10" target="_blank" rel="noopener noreferrer" role="listitem">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          GitHub ↗
        </a>
        <a class="contact-chip magnetic" href="https://drive.google.com/file/d/1jszWhJhFO3DbrWxVLpTgekNKkPDKPObb/view" target="_blank" rel="noopener noreferrer" role="listitem">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Resume PDF ↗
        </a>
      </div>'''

patch("Contact Chips", CHIP_AFTER, CHIP_HTML)

# ══════════════════════════════════════════════════════════════════════════════
# 5. SECTION EXPLORER BADGE — sticky counter, inject before </body>
# ══════════════════════════════════════════════════════════════════════════════
EXPLORER_AFTER = '''  <!-- ══ V12: MATRIX RAIN CANVAS (Konami code Easter egg) ══ -->'''

EXPLORER_HTML = '''  <!-- ══ V13: SECTION EXPLORER BADGE ══ -->
  <div class="explorer-badge" id="explorerBadge" aria-label="Sections explored" title="Sections explored" hidden>
    <div class="eb-ring">
      <svg viewBox="0 0 36 36" class="eb-svg" aria-hidden="true">
        <circle class="eb-track" cx="18" cy="18" r="15.9" fill="none" stroke="rgba(0,255,65,.12)" stroke-width="3"/>
        <circle class="eb-arc" cx="18" cy="18" r="15.9" fill="none" stroke="var(--r-green)" stroke-width="3"
          stroke-dasharray="100 100" stroke-dashoffset="100" stroke-linecap="round"
          transform="rotate(-90 18 18)" id="ebArc"/>
      </svg>
      <span class="eb-count mono" id="ebCount">0</span>
    </div>
    <span class="eb-label mono">explored</span>
  </div>

  <!-- ══ V12: MATRIX RAIN CANVAS (Konami code Easter egg) ══ -->'''

patch("Explorer Badge", EXPLORER_AFTER, EXPLORER_HTML)

# ══════════════════════════════════════════════════════════════════════════════
# 6. CUSTOM CURSOR  — inject before </body>
# ══════════════════════════════════════════════════════════════════════════════
CURSOR_AFTER = '''  <!-- BACK TO TOP -->'''

CURSOR_HTML = '''  <!-- ══ V13: CUSTOM CURSOR ══ -->
  <div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>
  <div class="cursor-dot"  id="cursorDot"  aria-hidden="true"></div>

  <!-- BACK TO TOP -->'''

patch("Custom Cursor", CURSOR_AFTER, CURSOR_HTML)

# ══════════════════════════════════════════════════════════════════════════════
# 7. APPEND CSS
# ══════════════════════════════════════════════════════════════════════════════
V13_MARKER = "/* ══ V13 STYLES ══ */"
if V13_MARKER not in css:
    css += r"""

/* ══ V13 STYLES ══ */

/* ── CVE Intel Ticker ───────────────────────────────── */
.cve-ticker {
  position: relative; z-index: 200;
  display: flex; align-items: center;
  background: rgba(0,0,0,.85);
  border-bottom: 1px solid rgba(0,255,65,.18);
  height: 34px; overflow: hidden;
  animation: none;
}
.cve-ticker-label {
  flex-shrink: 0;
  padding: 0 12px;
  font-size: .65rem; font-weight: 700; letter-spacing: .12em;
  color: #000; background: var(--r-green);
  height: 100%; display: flex; align-items: center;
  text-transform: uppercase;
}
.cve-ticker-track {
  display: flex; align-items: center; gap: 18px;
  white-space: nowrap;
  animation: tickerScroll 38s linear infinite;
  padding-left: 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: .68rem;
}
.cve-ticker:hover .cve-ticker-track { animation-play-state: paused; }
@keyframes tickerScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.cve-tick  { color: rgba(238,245,238,.7); }
.cve-crit  { color: #ff6b6b; }
.cve-high  { color: #ffa94d; }
.cve-ok    { color: #69db7c; }
.cve-sep   { color: rgba(0,255,65,.3); font-size: .8rem; }

/* ── Pipeline Flow ──────────────────────────────────── */
.pipeline-viz {
  display: flex; flex-direction: column; gap: 20px;
}
.pv-stages {
  display: flex; align-items: center; gap: 0;
  flex-wrap: nowrap; overflow-x: auto; padding: 24px 0 12px;
}
.pv-stages::-webkit-scrollbar { height: 4px; }
.pv-stages::-webkit-scrollbar-thumb { background: rgba(0,255,65,.2); border-radius: 2px; }
.pv-stage {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  cursor: pointer; flex-shrink: 0; min-width: 80px;
}
.pv-node {
  width: 44px; height: 44px; border-radius: 50%;
  border: 2px solid rgba(0,255,65,.3);
  background: rgba(0,255,65,.06);
  display: flex; align-items: center; justify-content: center;
  transition: border-color .3s, background .3s, box-shadow .3s;
  position: relative;
  font-size: 1.1rem;
}
.pv-stage:hover .pv-node,
.pv-stage.pv-active .pv-node {
  border-color: var(--r-green);
  background: rgba(0,255,65,.15);
  box-shadow: 0 0 18px rgba(0,255,65,.35);
}
.pv-stage.pv-done .pv-node {
  border-color: #4ade80;
  background: rgba(74,222,128,.12);
}
.pv-stage.pv-done .pv-node::after {
  content: '✓'; position: absolute;
  color: #4ade80; font-size: .85rem; font-weight: 700;
}
.pv-stage.pv-active .pv-node::after {
  content: ''; width: 10px; height: 10px; border-radius: 50%;
  background: var(--r-green); position: absolute;
  animation: pvPulse 1s ease infinite;
}
@keyframes pvPulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50%      { opacity: .4; transform: scale(1.6); }
}
.pv-stage-name { font-size: .68rem; color: rgba(238,245,238,.6); text-align: center; }
.pv-stage.pv-done .pv-stage-name { color: #4ade80; }
.pv-stage.pv-active .pv-stage-name { color: var(--r-green); font-weight: 700; }

.pv-arrow {
  flex: 1; min-width: 24px; height: 2px;
  background: rgba(0,255,65,.15); position: relative; flex-shrink: 1;
}
.pv-arrow.pv-arrow-done { background: rgba(74,222,128,.4); }
.pv-packet {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--r-green);
  box-shadow: 0 0 8px rgba(0,255,65,.8);
  opacity: 0; left: 0;
}
.pv-packet.pv-pkt-go {
  animation: pktTravel 0.9s ease-in-out forwards;
}
@keyframes pktTravel {
  0%   { left: 0;    opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

.pv-log {
  border-radius: 10px; border: 1px solid rgba(0,255,65,.12);
  overflow: hidden; min-height: 100px;
}
.pv-log-header {
  padding: 8px 14px; font-size: .72rem;
  background: rgba(0,255,65,.05);
  border-bottom: 1px solid rgba(0,255,65,.1);
  color: rgba(0,255,65,.7); display: flex; align-items: center; gap: 8px;
}
.pv-log-blink { color: var(--r-green); animation: blink 1s step-end infinite; }
.pv-log-body {
  padding: 10px 14px; font-size: .75rem;
  max-height: 130px; overflow-y: auto;
  display: flex; flex-direction: column; gap: 3px;
}
.pv-log-body::-webkit-scrollbar { width: 4px; }
.pv-log-body::-webkit-scrollbar-thumb { background: rgba(0,255,65,.2); border-radius: 2px; }
.pv-log-line { color: rgba(238,245,238,.7); }
.pv-log-line.pv-ok   { color: #69db7c; }
.pv-log-line.pv-warn { color: #ffa94d; }
.pv-log-line.pv-err  { color: #ff6b6b; }
.pv-log-line.pv-idle { color: rgba(238,245,238,.35); font-style: italic; }

.pv-controls {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
}
.pv-run-btn { font-size: .82rem; gap: 8px; }
.pv-reset-btn { font-size: .82rem; }
.pv-status { font-size: .76rem; color: rgba(0,255,65,.7); }

/* ── Chatbot ────────────────────────────────────────── */
.chatbot-wrap { margin-bottom: 2.5rem; }
.chatbot-box {
  border-radius: 14px; border: 1px solid rgba(0,255,65,.14);
  overflow: hidden; max-width: 640px;
}
.chatbot-header {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 16px; font-size: .78rem;
  background: rgba(0,255,65,.05);
  border-bottom: 1px solid rgba(0,255,65,.1);
  color: rgba(0,255,65,.85);
  flex-wrap: wrap;
}
.chatbot-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--r-green);
  animation: pulse 1.5s ease infinite;
  flex-shrink: 0;
}
.chatbot-hint { font-size: .67rem; color: rgba(238,245,238,.35); margin-left: auto; }
.chatbot-messages {
  padding: 14px 16px; display: flex; flex-direction: column; gap: 12px;
  max-height: 280px; overflow-y: auto;
}
.chatbot-messages::-webkit-scrollbar { width: 4px; }
.chatbot-messages::-webkit-scrollbar-thumb { background: rgba(0,255,65,.2); border-radius: 2px; }
.chat-msg { display: flex; gap: 10px; align-items: flex-end; }
.chat-msg.user-msg { flex-direction: row-reverse; }
.chat-avatar {
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(0,255,65,.15); border: 1px solid rgba(0,255,65,.3);
  display: flex; align-items: center; justify-content: center;
  font-size: .75rem; font-weight: 700; color: var(--r-green);
  flex-shrink: 0; font-family: 'JetBrains Mono', monospace;
}
.chat-msg.user-msg .chat-avatar {
  background: rgba(95,255,184,.12); border-color: rgba(95,255,184,.3); color: var(--r-accent);
}
.chat-bubble {
  background: rgba(0,255,65,.07); border: 1px solid rgba(0,255,65,.12);
  border-radius: 12px 12px 12px 2px;
  padding: 9px 13px; font-size: .83rem; line-height: 1.55;
  max-width: 480px; color: var(--r-head);
}
.chat-msg.user-msg .chat-bubble {
  background: rgba(95,255,184,.07); border-color: rgba(95,255,184,.15);
  border-radius: 12px 12px 2px 12px;
}
.chat-typing .chat-bubble { color: rgba(238,245,238,.4); font-style: italic; }
.chatbot-form {
  display: flex; gap: 8px; padding: 10px 14px;
  border-top: 1px solid rgba(0,255,65,.1);
}
.chatbot-input {
  flex: 1; background: rgba(0,255,65,.05); border: 1px solid rgba(0,255,65,.15);
  border-radius: 8px; padding: 8px 12px; color: var(--r-head); font-size: .83rem;
  outline: none; transition: border-color .2s;
}
.chatbot-input:focus { border-color: rgba(0,255,65,.4); }
.chatbot-input::placeholder { color: rgba(238,245,238,.3); }
.chatbot-send {
  padding: 8px 16px; font-size: .9rem; border-radius: 8px; flex-shrink: 0;
}

/* ── Contact Chips ──────────────────────────────────── */
.contact-chips {
  display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 2rem;
}
.contact-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 16px; border-radius: 100px;
  background: rgba(0,255,65,.06); border: 1px solid rgba(0,255,65,.18);
  color: var(--r-head); font-size: .8rem; font-family: 'JetBrains Mono', monospace;
  cursor: pointer; text-decoration: none;
  transition: background .2s, border-color .2s, transform .15s;
  position: relative;
}
.contact-chip:hover {
  background: rgba(0,255,65,.13); border-color: rgba(0,255,65,.4);
  transform: translateY(-2px); color: var(--r-head);
}
.contact-chip svg { flex-shrink: 0; }
.chip-copy-hint {
  font-size: .65rem; color: rgba(238,245,238,.35);
  margin-left: 4px;
}

/* ── Explorer Badge ─────────────────────────────────── */
.explorer-badge {
  position: fixed; bottom: 88px; left: 24px; z-index: 800;
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  background: rgba(0,0,0,.75); border: 1px solid rgba(0,255,65,.2);
  border-radius: 12px; padding: 8px 10px;
  backdrop-filter: blur(10px);
  transition: opacity .3s, transform .3s;
  opacity: 0; transform: translateY(8px);
}
.explorer-badge.visible {
  opacity: 1; transform: translateY(0);
}
.eb-ring { position: relative; width: 42px; height: 42px; }
.eb-svg  { width: 42px; height: 42px; }
.eb-arc  { transition: stroke-dashoffset 0.5s ease; }
.eb-count {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  font-size: .75rem; color: var(--r-green); font-weight: 700;
}
.eb-label { font-size: .6rem; color: rgba(238,245,238,.4); letter-spacing: .05em; }

/* ── Custom Cursor ──────────────────────────────────── */
@media (hover: hover) and (pointer: fine) {
  *, *::before, *::after { cursor: none !important; }
}
.cursor-dot {
  position: fixed; width: 5px; height: 5px; border-radius: 50%;
  background: var(--r-green); pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
  transition: transform .08s ease, opacity .2s;
}
.cursor-ring {
  position: fixed; width: 28px; height: 28px; border-radius: 50%;
  border: 1.5px solid rgba(0,255,65,.55); pointer-events: none; z-index: 99998;
  transform: translate(-50%, -50%);
  transition: width .15s ease, height .15s ease, border-color .15s, transform .08s ease;
}
.cursor-ring.expand {
  width: 46px; height: 46px;
  border-color: rgba(0,255,65,.85);
  background: rgba(0,255,65,.04);
}
.cursor-ring.click {
  width: 18px; height: 18px;
  background: rgba(0,255,65,.2);
}

@media (max-width: 768px) {
  .cursor-dot, .cursor-ring { display: none; }
  *, *::before, *::after { cursor: auto !important; }
  .cve-ticker-track { animation-duration: 28s; }
  .pv-stages { gap: 0; }
  .chatbot-hint { display: none; }
  .explorer-badge { bottom: 72px; left: 12px; }
}
"""
    results.append("  ✓ OK    V13 CSS appended")
else:
    results.append("  ✓ SKIP  V13 CSS")

# ══════════════════════════════════════════════════════════════════════════════
# 8. APPEND JS
# ══════════════════════════════════════════════════════════════════════════════
V13_MARKER = "/* ══ V13 JS ══ */"
if V13_MARKER not in js:
    js += r"""

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
"""
    results.append("  ✓ OK    V13 JS appended")
else:
    results.append("  ✓ SKIP  V13 JS")

# ── write ──────────────────────────────────────────────────────────────────
with open(HTML, "w", encoding="utf-8") as f: f.write(html)
with open(CSS,  "w", encoding="utf-8") as f: f.write(css)
with open(JS,   "w", encoding="utf-8") as f: f.write(js)

print(f"\nV13 Upgrade Report — {datetime.datetime.now():%Y-%m-%d %H:%M}")
print(f"  index.html : {html.count(chr(10))+1} lines")
print(f"  styles.css : {css.count(chr(10))+1} lines")
print(f"  script.js  : {js.count(chr(10))+1} lines\n")
for r in results: print(r)
print("\nDone.\n")
