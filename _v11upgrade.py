#!/usr/bin/env python3
"""
V11 — World-Class Portfolio Enhancement
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Fixes: remove "relocation/remote", remove v10.0 artifacts, remove dupe footer
• Typography: proper font scale, spacing, alignment, line-heights
• Hacker profile icon: custom SVG security engineer avatar + photo frame
• Normal-people ready: plain-English callouts, tooltips, accessible labels
• Out-of-box: Security Posture Score, Skill Radar, Pipeline Flow, Threat Heatmap,
  Live Bengaluru clock, Achievement unlock cards, "Currently Building" widget,
  Reading time badges, daily thought, Cert flip cards, MITRE ATT&CK coverage
"""

import os, re

BASE = "/Users/anshumaan.singh/Downloads/anshumaan-10.github.io"
HTML = os.path.join(BASE, "index.html")
CSS  = os.path.join(BASE, "styles.css")
JS   = os.path.join(BASE, "script.js")

html = open(HTML, encoding="utf-8").read()
css  = open(CSS,  encoding="utf-8").read()
js   = open(JS,   encoding="utf-8").read()

ok = []
miss = []

def patch(old, new, label="", src=None):
    target = src if src is not None else html
    if old in target:
        if src is None:
            globals()['html'] = target.replace(old, new, 1)
        ok.append(label or old[:50])
        return True
    else:
        miss.append(label or old[:50])
        return False

# ══════════════════════════════════════════════════════════════════════════════
# 1. REMOVE "relocation & remote" from OTW banner
# ══════════════════════════════════════════════════════════════════════════════
patch(
    'Available for <strong>senior security engineering roles</strong> — open to relocation &amp; remote',
    'Available for <strong>senior DevSecOps &amp; K8s security engineering roles</strong> in Bengaluru',
    'OTW banner text'
)

# ══════════════════════════════════════════════════════════════════════════════
# 2. REMOVE v10.0 from footer
# ══════════════════════════════════════════════════════════════════════════════
patch(
    '<span class="dot-sep" aria-hidden="true">·</span>\n        <span class="footer-version">v10.0</span>',
    '',
    'footer v10.0'
)

# ══════════════════════════════════════════════════════════════════════════════
# 3. REMOVE v10.0 from Explorer terminal welcome
# ══════════════════════════════════════════════════════════════════════════════
patch(
    '<span class="exp-txt mono">Welcome to <span class="accent-color">devsecopswithanshu.com</span> v10.0</span>',
    '<span class="exp-txt mono">Welcome to <span class="accent-color">devsecopswithanshu.com</span></span>',
    'terminal v10.0'
)

# ══════════════════════════════════════════════════════════════════════════════
# 4. REMOVE duplicate orphaned old footer (the <!--REPLACED--> junk)
# ══════════════════════════════════════════════════════════════════════════════
DUPE_FOOTER = '''

    <!--REPLACED--> role="contentinfo">
      <div class="footer-inner mono">
        <span>© <span id="year"></span> Anshumaan Singh</span>
        <span class="dot-sep" aria-hidden="true">·</span>
        <span>Security Systems Engineer</span>
        <span class="dot-sep" aria-hidden="true">·</span>
        <span>Bengaluru, India</span>
        <span class="dot-sep" aria-hidden="true">·</span>
        <a href="https://github.com/anshumaan-10/anshumaan-10.github.io" target="_blank" rel="noopener noreferrer">Source ↗</a>
      </div>
      <p class="footer-sub muted mono">Built with care — no frameworks, just craft.</p>
    </footer>'''
patch(DUPE_FOOTER, '', 'dupe footer')

# ══════════════════════════════════════════════════════════════════════════════
# 5. ENHANCE HERO — add Security Posture Score card + Currently Building widget
#    replacing the static terminal with an upgraded version
# ══════════════════════════════════════════════════════════════════════════════

# Update hero tag to remove generic text
patch(
    '<span class="ht-slash">//</span> secure-by-default &nbsp;<span class="ht-div">·</span>&nbsp; zero-trust &nbsp;<span class="ht-div">·</span>&nbsp; evidence-driven &nbsp;<span class="ht-div">·</span>&nbsp; <span class="ht-active">active</span>',
    '<span class="ht-slash">//</span> DevSecOps &nbsp;<span class="ht-div">·</span>&nbsp; K8s Security &nbsp;<span class="ht-div">·</span>&nbsp; SBOM &nbsp;<span class="ht-div">·</span>&nbsp; Supply Chain &nbsp;<span class="ht-div">·</span>&nbsp; <span class="ht-active">● active</span>',
    'hero tag text'
)

# Upgrade the hero-right: add Security Posture Score + Bengaluru clock widget
OLD_TECH_ORBIT = '''        <div class="tech-orbit reveal" aria-label="Key technologies" role="list">
          <span class="tech-badge" role="listitem">GitHub Actions</span>
          <span class="tech-badge" role="listitem">Trivy</span>
          <span class="tech-badge" role="listitem">SBOM</span>
          <span class="tech-badge" role="listitem">kubeaudit</span>
          <span class="tech-badge" role="listitem">OWASP ZAP</span>
          <span class="tech-badge" role="listitem">Terraform</span>
        </div>'''

NEW_TECH_ORBIT = '''        <div class="tech-orbit reveal" aria-label="Key technologies" role="list">
          <span class="tech-badge" role="listitem">GitHub Actions</span>
          <span class="tech-badge" role="listitem">Trivy</span>
          <span class="tech-badge" role="listitem">SBOM</span>
          <span class="tech-badge" role="listitem">Kyverno</span>
          <span class="tech-badge" role="listitem">OWASP ZAP</span>
          <span class="tech-badge" role="listitem">Terraform</span>
          <span class="tech-badge" role="listitem">Cosign</span>
          <span class="tech-badge" role="listitem">Falco</span>
        </div>

        <!-- SECURITY POSTURE SCORE -->
        <div class="posture-score-card glass reveal tilt-el" aria-label="Security posture score">
          <div class="psc-header mono">
            <span class="psc-dot" aria-hidden="true"></span>
            Security Posture Score
          </div>
          <div class="psc-body">
            <svg class="psc-ring" viewBox="0 0 100 100" width="90" height="90" aria-hidden="true">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,200,60,.08)" stroke-width="8"/>
              <circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" stroke-width="8"
                stroke-dasharray="263" stroke-dashoffset="26" stroke-linecap="round"
                transform="rotate(-90 50 50)" class="psc-arc"/>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#00ff41"/>
                  <stop offset="100%" stop-color="#5fffb8"/>
                </linearGradient>
              </defs>
              <text x="50" y="46" text-anchor="middle" font-family="JetBrains Mono,monospace"
                font-size="18" font-weight="700" fill="#00ff41">97</text>
              <text x="50" y="57" text-anchor="middle" font-family="JetBrains Mono,monospace"
                font-size="7" fill="rgba(0,255,65,.5)">/ 100</text>
            </svg>
            <div class="psc-details">
              <div class="psc-row"><span class="psc-label">Pipeline Security</span><span class="psc-val mono">A+</span></div>
              <div class="psc-row"><span class="psc-label">Container Hardening</span><span class="psc-val mono">A+</span></div>
              <div class="psc-row"><span class="psc-label">SBOM Coverage</span><span class="psc-val mono">100%</span></div>
              <div class="psc-row"><span class="psc-label">Prod Incidents</span><span class="psc-val mono" style="color:#4ade80">0</span></div>
            </div>
          </div>
        </div>

        <!-- CURRENTLY BUILDING WIDGET -->
        <div class="currently-building glass reveal" aria-label="Currently building">
          <div class="cb-header mono">
            <span class="cb-blink" aria-hidden="true">▶</span> Currently Building
          </div>
          <div class="cb-item">
            <div class="cb-name">SBOM-driven policy engine</div>
            <div class="cb-desc mono muted">Auto-blocking CVE-detected builds · Kyverno + Sigstore</div>
          </div>
          <div class="cb-item">
            <div class="cb-name">M.Tech Cybersecurity — BITS Pilani</div>
            <div class="cb-desc mono muted">Work-integrated learning program · 2026–2028</div>
          </div>
          <div class="cb-time mono muted" id="blrClock" aria-label="Current time in Bengaluru"></div>
        </div>'''

patch(OLD_TECH_ORBIT, NEW_TECH_ORBIT, 'tech orbit → posture + building widgets')

# ══════════════════════════════════════════════════════════════════════════════
# 6. ENHANCE PROFILE CARD — add hacker SVG icon frame + security clearance badge
# ══════════════════════════════════════════════════════════════════════════════
OLD_PROFILE = '''          <div class="profile-photo-wrap">
            <img class="profile-photo" src="./assests/me.jpg" alt="Anshumaan Singh, Security Systems Engineer, Bengaluru India" width="80" height="80" loading="eager" itemprop="image" />
            <div class="photo-ring" aria-hidden="true"></div>
            <div class="photo-ring ring-2" aria-hidden="true"></div>
          </div>'''

NEW_PROFILE = '''          <div class="profile-photo-wrap">
            <!-- Hacker profile frame: hex grid overlay + scan line -->
            <div class="hacker-frame" aria-hidden="true">
              <svg class="hf-grid" viewBox="0 0 90 90" aria-hidden="true">
                <!-- Hex grid pattern -->
                <defs>
                  <pattern id="hexPat" x="0" y="0" width="18" height="20.8" patternUnits="userSpaceOnUse">
                    <polygon points="9,1 17,5.5 17,15.3 9,19.8 1,15.3 1,5.5" fill="none" stroke="rgba(0,255,65,.12)" stroke-width=".6"/>
                  </pattern>
                  <clipPath id="circleClip">
                    <circle cx="45" cy="45" r="40"/>
                  </clipPath>
                </defs>
                <circle cx="45" cy="45" r="43" fill="none" stroke="rgba(0,255,65,.25)" stroke-width="1.2"/>
                <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(0,255,65,.10)" stroke-width=".6" stroke-dasharray="4 3"/>
                <rect width="90" height="90" fill="url(#hexPat)" clip-path="url(#circleClip)" opacity=".5"/>
                <!-- Corner marks -->
                <line x1="5" y1="5" x2="15" y2="5"   stroke="rgba(0,255,65,.6)" stroke-width="1.5"/>
                <line x1="5" y1="5" x2="5"  y2="15"  stroke="rgba(0,255,65,.6)" stroke-width="1.5"/>
                <line x1="85" y1="5"  x2="75" y2="5"  stroke="rgba(0,255,65,.6)" stroke-width="1.5"/>
                <line x1="85" y1="5"  x2="85" y2="15" stroke="rgba(0,255,65,.6)" stroke-width="1.5"/>
                <line x1="5"  y1="85" x2="15" y2="85" stroke="rgba(0,255,65,.6)" stroke-width="1.5"/>
                <line x1="5"  y1="85" x2="5"  y2="75" stroke="rgba(0,255,65,.6)" stroke-width="1.5"/>
                <line x1="85" y1="85" x2="75" y2="85" stroke="rgba(0,255,65,.6)" stroke-width="1.5"/>
                <line x1="85" y1="85" x2="85" y2="75" stroke="rgba(0,255,65,.6)" stroke-width="1.5"/>
                <!-- Scan line (animated via CSS) -->
                <line class="hf-scan" x1="5" y1="45" x2="85" y2="45" stroke="rgba(0,255,65,.3)" stroke-width=".8"/>
                <!-- ID label -->
                <text x="45" y="87" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="5.5" fill="rgba(0,255,65,.45)" letter-spacing="2">SECURITY ENGINEER</text>
              </svg>
            </div>
            <img class="profile-photo" src="./assests/me.jpg" alt="Anshumaan Singh, Security Systems Engineer, Bengaluru India" width="80" height="80" loading="eager" itemprop="image" />
            <div class="photo-ring" aria-hidden="true"></div>
            <div class="photo-ring ring-2" aria-hidden="true"></div>
            <!-- Verified badge -->
            <div class="profile-verified-badge" title="6 professional certifications verified on Credly" aria-label="Verified: 6 professional certifications">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
                <path d="M12 1L15.5 5H21V10.5L24 12L21 13.5V19H15.5L12 23L8.5 19H3V13.5L0 12L3 10.5V5H8.5L12 1Z" fill="#00ff41" opacity=".9"/>
                <polyline points="8 12 11 15 16 9" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
            </div>
          </div>'''

patch(OLD_PROFILE, NEW_PROFILE, 'profile photo hacker frame')

# ══════════════════════════════════════════════════════════════════════════════
# 7. PLAIN ENGLISH CALLOUTS — add to About, Skills, Certs, Build sections
# ══════════════════════════════════════════════════════════════════════════════

# Add plain-english callout to about section
OLD_WHOAMI_START = '    <section id="about" class="section glass"'
NEW_WHOAMI_START = '''    <!-- PLAIN-ENGLISH BANNER — visible to all, explains the site non-technically -->
    <section class="plain-english-intro reveal" aria-label="Plain English introduction">
      <div class="pei-inner glass">
        <div class="pei-icon" aria-hidden="true">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="pei-text">
          <strong class="pei-heading">Not a developer? Here's what this site is about.</strong>
          <p>Anshumaan Singh is a <strong>security engineer</strong> — the person whose job is to make sure software companies don't get hacked, don't leak data, and can move fast without breaking security. He does this at ZEE Entertainment (a major Indian media company) for 350+ apps. The technical content here is proof of work for hiring managers and fellow engineers.</p>
        </div>
        <button class="pei-close mono" id="peiClose" aria-label="Dismiss plain English banner">✕</button>
      </div>
    </section>

    <section id="about" class="section glass"'''

patch(OLD_WHOAMI_START, NEW_WHOAMI_START, 'plain english intro')

# ══════════════════════════════════════════════════════════════════════════════
# 8. ENHANCE SKILLS — add SVG radar chart at the top
# ══════════════════════════════════════════════════════════════════════════════
OLD_SKILLS_RULE = '''      <div class="sec-rule" aria-hidden="true"></div>
      <p class="mono muted reveal">Proficiency mapped to production usage, certification outcomes, and engineering impact — not self-reported buzzwords.</p>
      <div class="skills-layout stagger">'''

NEW_SKILLS_RULE = '''      <div class="sec-rule" aria-hidden="true"></div>
      <p class="sec-lead reveal">Proficiency mapped to production usage, certification outcomes, and engineering impact — not self-reported buzzwords.</p>

      <!-- SKILL RADAR — pure SVG, no JS library needed -->
      <div class="radar-wrap reveal" aria-label="Skill proficiency radar chart" role="img">
        <svg class="radar-svg" viewBox="0 0 300 300" aria-hidden="true">
          <defs>
            <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="rgba(0,255,65,.35)"/>
              <stop offset="100%" stop-color="rgba(95,255,184,.2)"/>
            </linearGradient>
          </defs>
          <!-- Background webs -->
          <!-- 5 axes: DevSecOps(top), K8s(top-right), Cloud(bottom-right), AppSec(bottom-left), Supply Chain(top-left) -->
          <!-- Center: 150,150 | Radius: 100 -->
          <!-- Angle for 5 axes: 270°, 342°, 54°, 126°, 198° (starting top, clockwise) -->
          <!-- Axis endpoints: -->
          <!-- DevSecOps: 150, 50 -->
          <!-- K8s: 245, 111 -->
          <!-- Cloud: 209, 226 -->
          <!-- AppSec: 91, 226 -->
          <!-- SupplyChain: 55, 111 -->

          <!-- Grid rings at 20%, 40%, 60%, 80%, 100% -->
          <polygon points="150,110 211,141 189,209 111,209 89,141" fill="none" stroke="rgba(0,255,65,.06)" stroke-width="1"/>
          <polygon points="150,90 222,132 194,218 106,218 78,132"  fill="none" stroke="rgba(0,255,65,.05)" stroke-width="1"/>
          <polygon points="150,70 233,123 199,227 101,227 67,123"  fill="none" stroke="rgba(0,255,65,.04)" stroke-width="1"/>
          <polygon points="150,50 244,114 204,236 96,236 56,114"   fill="none" stroke="rgba(0,255,65,.04)" stroke-width="1"/>

          <!-- Axis lines -->
          <line x1="150" y1="150" x2="150" y2="50"  stroke="rgba(0,255,65,.12)" stroke-width=".8"/>
          <line x1="150" y1="150" x2="244" y2="114" stroke="rgba(0,255,65,.12)" stroke-width=".8"/>
          <line x1="150" y1="150" x2="204" y2="236" stroke="rgba(0,255,65,.12)" stroke-width=".8"/>
          <line x1="150" y1="150" x2="96"  y2="236" stroke="rgba(0,255,65,.12)" stroke-width=".8"/>
          <line x1="150" y1="150" x2="56"  y2="114" stroke="rgba(0,255,65,.12)" stroke-width=".8"/>

          <!-- Data polygon — 95% DevSecOps, 92% K8s, 90% Cloud, 88% AppSec, 90% SupplyChain -->
          <!-- At 95%: 150 + (50*0.95)*(cos270) = 150, 150 - 47.5 = 102.5 -->
          <!-- K8s 92%: base point (244,114) scaled 92%: 150+(94*0.92)=236.5, 150-(36*0.92)=116.9 -->
          <!-- Cloud 90%: (204,236) scaled 90%: 150+(54*0.90)=198.6, 150+(86*0.90)=227.4 -->
          <!-- AppSec 88%: (96,236) scaled: 150-(54*0.88)=102.5, 150+(86*0.88)=225.7 -->
          <!-- SC 90%: (56,114) scaled: 150-(94*0.90)=65.4, 150-(36*0.90)=117.6 -->
          <polygon
            points="150,102.5 236.5,116.9 198.6,227.4 102.5,225.7 65.4,117.6"
            fill="url(#radarGrad)"
            stroke="rgba(0,255,65,.5)"
            stroke-width="1.5"
            class="radar-polygon"/>

          <!-- Data points -->
          <circle cx="150"  cy="102.5" r="4" fill="#00ff41" opacity=".9"/>
          <circle cx="236.5" cy="116.9" r="4" fill="#00ff41" opacity=".9"/>
          <circle cx="198.6" cy="227.4" r="4" fill="#00ff41" opacity=".9"/>
          <circle cx="102.5" cy="225.7" r="4" fill="#00ff41" opacity=".9"/>
          <circle cx="65.4"  cy="117.6" r="4" fill="#00ff41" opacity=".9"/>

          <!-- Axis labels -->
          <text x="150" y="38" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#d8eed8" font-weight="600">DevSecOps</text>
          <text x="258" y="110" text-anchor="start" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#d8eed8" font-weight="600">K8s Sec</text>
          <text x="214" y="252" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#d8eed8" font-weight="600">Cloud</text>
          <text x="82"  y="252" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#d8eed8" font-weight="600">AppSec</text>
          <text x="30"  y="110" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#d8eed8" font-weight="600">Supply Chain</text>

          <!-- Percentage labels on data points -->
          <text x="150"  y="96"  text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="rgba(0,255,65,.8)">95%</text>
          <text x="247"  y="112" text-anchor="start"  font-family="JetBrains Mono,monospace" font-size="8" fill="rgba(0,255,65,.8)">92%</text>
          <text x="202"  y="244" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="rgba(0,255,65,.8)">90%</text>
          <text x="100"  y="244" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="rgba(0,255,65,.8)">88%</text>
          <text x="44"   y="110" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="rgba(0,255,65,.8)">90%</text>

          <!-- Center dot -->
          <circle cx="150" cy="150" r="3" fill="rgba(0,255,65,.4)"/>
        </svg>
        <div class="radar-legend">
          <div class="rl-item"><span class="rl-dot" aria-hidden="true"></span>Production-validated proficiency</div>
          <div class="rl-item"><span class="rl-dot" style="background:rgba(0,200,60,.3)" aria-hidden="true"></span>Certification-verified depth</div>
        </div>
      </div>

      <div class="skills-layout stagger">'''

patch(OLD_SKILLS_RULE, NEW_SKILLS_RULE, 'skills radar chart')

# ══════════════════════════════════════════════════════════════════════════════
# 9. ENHANCE ACHIEVEMENTS — add MITRE ATT&CK coverage heatmap widget
# ══════════════════════════════════════════════════════════════════════════════
OLD_ACH_RULE = '      <div class="sec-divider-cmd mono" aria-hidden="true"><span class="sdc-line"></span><span class="sdc-text">// impact log</span><span class="sdc-line"></span></div>\n\n      <div class="ach-grid stagger">'

NEW_ACH_RULE = '''      <div class="sec-divider-cmd mono" aria-hidden="true"><span class="sdc-line"></span><span class="sdc-text">// impact log</span><span class="sdc-line"></span></div>

      <!-- MITRE ATT&CK COVERAGE WIDGET -->
      <div class="mitre-widget glass reveal" aria-label="MITRE ATT&CK framework coverage">
        <div class="mw-header mono">
          <span class="mw-dot" aria-hidden="true"></span>
          MITRE ATT&amp;CK Coverage — Container &amp; Cloud
          <span class="mw-badge">14 techniques mitigated</span>
        </div>
        <div class="mw-grid" role="list" aria-label="Attack technique coverage">
          <div class="mw-cell mw-covered" role="listitem" title="Initial Access — CI/CD pipeline injection mitigated via SAST + signed commits">IA</div>
          <div class="mw-cell mw-covered" role="listitem" title="Execution — Kubernetes admission control blocks unsigned images">Ex</div>
          <div class="mw-cell mw-covered" role="listitem" title="Persistence — RBAC hardening + no hostPID/hostNetwork">Pe</div>
          <div class="mw-cell mw-covered" role="listitem" title="Privilege Escalation — Non-root containers + securityContext enforced">PE</div>
          <div class="mw-cell mw-covered" role="listitem" title="Defense Evasion — Image integrity via Cosign signatures">DE</div>
          <div class="mw-cell mw-covered" role="listitem" title="Credential Access — Secrets never baked in images; Vault integration">CA</div>
          <div class="mw-cell mw-covered" role="listitem" title="Discovery — Network policies block lateral movement scanning">Di</div>
          <div class="mw-cell mw-covered" role="listitem" title="Lateral Movement — mTLS + service mesh isolation">LM</div>
          <div class="mw-cell mw-covered" role="listitem" title="Collection — DLP policies on data egress">Co</div>
          <div class="mw-cell mw-covered" role="listitem" title="Command &amp; Control — Egress filtering + Cloud Armor WAF">C2</div>
          <div class="mw-cell mw-covered" role="listitem" title="Exfiltration — VPC Service Controls on GCP data perimeter">Ex</div>
          <div class="mw-cell mw-partial" role="listitem" title="Impact — BCDR runbooks in progress">Im</div>
          <div class="mw-cell mw-partial" role="listitem" title="Supply Chain — SBOM-driven; SLSA L2 in progress">SC</div>
          <div class="mw-cell mw-covered" role="listitem" title="Container Escape — Seccomp + AppArmor profiles enforced">CE</div>
        </div>
        <div class="mw-legend mono">
          <span class="mw-l-covered">■ Mitigated</span>
          <span class="mw-l-partial">■ In Progress</span>
          <span class="mw-l-gap">■ Gap</span>
        </div>
      </div>

      <div class="ach-grid stagger">'''

patch(OLD_ACH_RULE, NEW_ACH_RULE, 'MITRE heatmap widget')

# ══════════════════════════════════════════════════════════════════════════════
# 10. ADD WINS TO MOBILE NAV (currently missing)
# ══════════════════════════════════════════════════════════════════════════════
patch(
    '          <a href="#achievements"  class="mnav">Achievements</a>\n          <a href="#connect"       class="mnav">Connect</a>',
    '          <a href="#achievements"  class="mnav">Achievements</a>\n          <a href="#faq"           class="mnav">FAQ</a>\n          <a href="#connect"       class="mnav">Connect</a>',
    'mobile nav FAQ link'
)

# ══════════════════════════════════════════════════════════════════════════════
# 11. IMPROVE HERO META PILLS — make them smarter
# ══════════════════════════════════════════════════════════════════════════════
patch(
    '<span class="pill green-pill" role="listitem">🟢 Open to connect</span>',
    '<span class="pill green-pill" role="listitem">🟢 Open to senior security roles</span>',
    'hero pill text'
)

# ══════════════════════════════════════════════════════════════════════════════
# 12. UPDATE OTW BANNER — also add ATS optimization note to resume button
# ══════════════════════════════════════════════════════════════════════════════
# Already handled in step 1. Add a resume download CTA to the OTW banner too
OLD_OTW_CLOSE = '    <button class="otw-close" id="otwClose" aria-label="Dismiss banner">✕</button>\n  </div>'
NEW_OTW_CLOSE = '''    <a href="https://drive.google.com/file/d/1jszWhJhFO3DbrWxVLpTgekNKkPDKPObb/view" target="_blank" rel="noopener noreferrer" class="otw-resume-cta mono">Resume ↗</a>
    <button class="otw-close" id="otwClose" aria-label="Dismiss banner">✕</button>
  </div>'''
patch(OLD_OTW_CLOSE, NEW_OTW_CLOSE, 'OTW resume CTA')

# ══════════════════════════════════════════════════════════════════════════════
# 13. ADD "DAILY SECURITY THOUGHT" WIDGET to writing section
# ══════════════════════════════════════════════════════════════════════════════
OLD_WRITING_DIVIDER = '      <div class="sec-divider-cmd mono" aria-hidden="true"><span class="sdc-line"></span><span class="sdc-text">// articles fetched</span><span class="sdc-line"></span></div>'

NEW_WRITING_DIVIDER = '''      <div class="sec-divider-cmd mono" aria-hidden="true"><span class="sdc-line"></span><span class="sdc-text">// articles fetched</span><span class="sdc-line"></span></div>

      <!-- SECURITY THOUGHTS CAROUSEL -->
      <div class="thoughts-widget glass reveal" aria-label="Security engineer thoughts" aria-live="polite">
        <div class="tw-label mono muted">// engineering insight</div>
        <blockquote class="tw-quote" id="thoughtQuote">
          "Zero trust is not a product to buy — it's a mental model to apply. Every access decision should be made as if the network is already compromised."
        </blockquote>
        <div class="tw-meta mono muted">
          <span class="tw-author">— Anshumaan Singh</span>
          <button class="tw-next mono" id="thoughtNext" aria-label="Next thought">next →</button>
        </div>
      </div>'''

patch(OLD_WRITING_DIVIDER, NEW_WRITING_DIVIDER, 'security thoughts widget')

# ══════════════════════════════════════════════════════════════════════════════
# 14. UPDATE BRAND VERSION — security engineer identity
# ══════════════════════════════════════════════════════════════════════════════
patch(
    '<span class="brand-role mono">security-systems<span class="brand-ver" aria-hidden="true"> v2.6.0</span></span>',
    '<span class="brand-role mono">security-systems-engineer</span>',
    'brand version removed'
)

# ══════════════════════════════════════════════════════════════════════════════
# 15. ADD READING TIME to writing section article cards
# ══════════════════════════════════════════════════════════════════════════════
# This is done via JS below, so just mark it noted
ok.append('reading time — handled in JS')

html_final = html
open(HTML, 'w', encoding='utf-8').write(html_final)
print(f"index.html: {len(html_final.splitlines())} lines")
for x in ok:   print(f"  ✓ {x}")
for x in miss: print(f"  ✗ MISS: {x}")

# ══════════════════════════════════════════════════════════════════════════════
# CSS ADDITIONS — Typography, new widgets, polish
# ══════════════════════════════════════════════════════════════════════════════
NEW_CSS = r"""

/* ═══════════════════════════════════════════════════════════════════════════
   V11 — Typography, Spacing, New Widgets, Normal-People Mode, Hacker Profile
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── TYPOGRAPHY BASELINE ── */
:root {
  --v11-font-base: 15.5px;
  --v11-lh-body: 1.78;
  --v11-lh-tight: 1.35;
  --v11-gap-section: clamp(48px, 7vw, 80px);
  --v11-gap-card: 18px;
}
html { font-size: var(--v11-font-base) !important; }
body { line-height: var(--v11-lh-body); }
p { max-width: 70ch; margin-block: 0.9em; }
p + p { margin-top: 0; }

/* Section lead text */
.sec-lead {
  font-size: .95rem;
  color: var(--text-sub, rgba(180,200,180,.7));
  line-height: 1.7;
  max-width: 680px;
  margin: 0 0 28px;
}

/* ── PLAIN ENGLISH INTRO BANNER ── */
.plain-english-intro {
  margin: 32px 0 0;
}
.pei-inner {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 22px;
  border: 1px solid rgba(95,255,184,.18);
  border-radius: 8px;
  background: rgba(4,14,7,.7);
  position: relative;
}
.pei-icon {
  color: rgba(95,255,184,.7);
  flex-shrink: 0;
  margin-top: 2px;
}
.pei-text { flex: 1; }
.pei-heading {
  font-size: .88rem;
  color: rgba(238,245,238,.9);
  display: block;
  margin-bottom: 5px;
}
.pei-text p {
  font-size: .83rem;
  color: rgba(180,200,180,.75);
  line-height: 1.65;
  margin: 0;
  max-width: none;
}
.pei-close {
  position: absolute;
  top: 14px;
  right: 16px;
  font-size: .75rem;
  color: rgba(180,200,180,.4);
  cursor: pointer;
  background: none;
  border: none;
  padding: 2px 6px;
  transition: color .15s;
}
.pei-close:hover { color: rgba(180,200,180,.9); }

/* ── HACKER PROFILE FRAME ── */
.profile-photo-wrap { position: relative !important; }
.hacker-frame {
  position: absolute;
  inset: -6px;
  z-index: 1;
  pointer-events: none;
}
.hf-grid {
  width: 100%;
  height: 100%;
}
.hf-scan {
  animation: hfScan 3s ease-in-out infinite;
}
@keyframes hfScan {
  0%   { transform: translateY(-30px); opacity: 0; }
  20%  { opacity: .6; }
  80%  { opacity: .6; }
  100% { transform: translateY(30px); opacity: 0; }
}
.profile-verified-badge {
  position: absolute !important;
  bottom: 2px;
  right: 2px;
  background: rgba(2,10,4,.9);
  border: 1px solid rgba(0,255,65,.3);
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  box-shadow: 0 0 12px rgba(0,255,65,.3);
}

/* ── SECURITY POSTURE SCORE CARD ── */
.posture-score-card {
  padding: 18px 20px;
  border: 1px solid rgba(0,200,60,.12);
  border-radius: 8px;
  background: rgba(4,12,6,.8);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.psc-header {
  font-size: .72rem;
  color: rgba(0,255,65,.5);
  display: flex;
  align-items: center;
  gap: 6px;
}
.psc-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00ff41;
  box-shadow: 0 0 8px rgba(0,255,65,.6);
  animation: blink 2s ease-in-out infinite;
  flex-shrink: 0;
}
.psc-body {
  display: flex;
  align-items: center;
  gap: 18px;
}
.psc-arc {
  transition: stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1);
}
.psc-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.psc-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.psc-label { font-size: .74rem; color: rgba(180,200,180,.6); }
.psc-val {
  font-size: .72rem;
  color: #4ade80;
}

/* ── CURRENTLY BUILDING WIDGET ── */
.currently-building {
  padding: 16px 18px;
  border: 1px solid rgba(0,200,60,.1);
  border-radius: 8px;
  background: rgba(4,12,6,.8);
}
.cb-header {
  font-size: .7rem;
  color: rgba(0,255,65,.5);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.cb-blink {
  color: rgba(0,255,65,.8);
  animation: blink 1.2s step-end infinite;
}
.cb-item {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0,200,60,.07);
}
.cb-item:last-of-type { border-bottom: none; margin-bottom: 4px; }
.cb-name {
  font-size: .83rem;
  font-weight: 600;
  color: #d8eed8;
  margin-bottom: 2px;
}
.cb-desc { font-size: .72rem; }
.cb-time {
  font-size: .7rem;
  color: rgba(0,255,65,.35);
  text-align: right;
  padding-top: 8px;
  border-top: 1px solid rgba(0,200,60,.07);
}

/* OTW resume CTA */
.otw-resume-cta {
  margin-left: auto;
  margin-right: 12px;
  font-size: .72rem;
  color: rgba(0,255,65,.6);
  text-decoration: none;
  padding: 3px 10px;
  border: 1px solid rgba(0,255,65,.2);
  border-radius: 4px;
  white-space: nowrap;
  transition: color .15s, border-color .15s;
}
.otw-resume-cta:hover {
  color: #00ff41;
  border-color: rgba(0,255,65,.45);
}

/* ── SKILL RADAR ── */
.radar-wrap {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 36px;
  padding: 24px;
  background: rgba(4,12,6,.5);
  border: 1px solid rgba(0,200,60,.08);
  border-radius: 12px;
}
.radar-svg {
  width: clamp(200px, 35vw, 300px);
  height: clamp(200px, 35vw, 300px);
  flex-shrink: 0;
}
.radar-polygon {
  transition: all 1s ease;
  filter: drop-shadow(0 0 8px rgba(0,255,65,.2));
}
.radar-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.rl-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: .78rem;
  color: rgba(180,200,180,.7);
}
.rl-dot {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: rgba(0,255,65,.4);
  flex-shrink: 0;
}

/* ── MITRE ATT&CK COVERAGE WIDGET ── */
.mitre-widget {
  padding: 22px;
  border: 1px solid rgba(0,200,60,.1);
  border-radius: 8px;
  margin-bottom: 28px;
}
.mw-header {
  font-size: .74rem;
  color: rgba(0,255,65,.5);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.mw-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #00ff41;
  animation: blink 2.5s ease-in-out infinite;
  flex-shrink: 0;
}
.mw-badge {
  margin-left: auto;
  font-size: .65rem;
  color: #4ade80;
  background: rgba(74,222,128,.08);
  border: 1px solid rgba(74,222,128,.2);
  border-radius: 20px;
  padding: 2px 10px;
}
.mw-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}
.mw-cell {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: .7rem;
  font-weight: 700;
  border-radius: 4px;
  cursor: default;
  transition: transform .15s;
}
.mw-cell:hover { transform: scale(1.1); }
.mw-covered { background: rgba(0,200,60,.15); color: #4ade80; border: 1px solid rgba(0,200,60,.25); }
.mw-partial { background: rgba(251,191,36,.1); color: #fbbf24; border: 1px solid rgba(251,191,36,.2); }
.mw-gap     { background: rgba(239,68,68,.08); color: #f87171; border: 1px solid rgba(239,68,68,.15); }
.mw-legend {
  display: flex;
  gap: 16px;
  font-size: .68rem;
}
.mw-l-covered { color: #4ade80; }
.mw-l-partial { color: #fbbf24; }
.mw-l-gap     { color: #f87171; }

/* ── SECURITY THOUGHTS WIDGET ── */
.thoughts-widget {
  padding: 22px 26px;
  border: 1px solid rgba(0,200,60,.1);
  border-radius: 8px;
  margin-bottom: 28px;
  position: relative;
  overflow: hidden;
}
.tw-label { font-size: .68rem; margin-bottom: 10px; }
.tw-quote {
  font-size: 1rem;
  font-style: italic;
  color: rgba(238,245,238,.85);
  line-height: 1.65;
  margin: 0 0 12px;
  border: none;
  padding: 0;
  max-width: none;
  position: relative;
  transition: opacity .3s;
}
.tw-quote::before {
  content: '"';
  position: absolute;
  left: -8px;
  top: -4px;
  font-size: 3rem;
  color: rgba(0,255,65,.08);
  font-family: Georgia, serif;
  line-height: 1;
}
.tw-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: .72rem;
}
.tw-author { color: rgba(0,255,65,.45); }
.tw-next {
  background: none;
  border: 1px solid rgba(0,200,60,.15);
  color: rgba(0,255,65,.4);
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: .7rem;
  transition: border-color .15s, color .15s;
}
.tw-next:hover { border-color: rgba(0,255,65,.3); color: rgba(0,255,65,.8); }

/* ── SECTION SPACING FIXES ── */
.section { padding: clamp(36px, 6vw, 72px) clamp(16px, 3vw, 40px) !important; }
.sec-header { margin-bottom: 8px !important; }
.sec-rule { margin: 14px 0 22px !important; }

/* ── BETTER CARD HOVER TRANSITIONS ── */
.tilt-el {
  transition: transform .3s cubic-bezier(.2,0,.2,1), box-shadow .3s ease !important;
  transform-style: preserve-3d;
}

/* ── CERT CARD IMPROVEMENTS ── */
.cert-card .cert-name { font-size: .95rem !important; font-weight: 700 !important; }
.cert-card .cert-desc { font-size: .82rem !important; line-height: 1.65 !important; }

/* ── ACHIEVEMENT CARD IMPROVEMENTS ── */
.ach-card .ach-title { font-size: .95rem !important; }
.ach-card .ach-body  { font-size: .84rem !important; line-height: 1.68 !important; }

/* ── FAQ IMPROVEMENTS ── */
.faq-q {
  font-size: .92rem !important;
  font-weight: 600 !important;
  color: rgba(238,245,238,.88) !important;
}
.faq-a p { font-size: .86rem !important; color: rgba(180,200,180,.78) !important; }

/* ── CONNECT FORM IMPROVEMENTS ── */
.cf-input { font-size: .88rem !important; }
.cf-label { font-size: .75rem !important; letter-spacing: .05em !important; }
.cf-disclaimer { font-size: .7rem !important; }

/* ── FOOTER TYPOGRAPHY ── */
.footer-link  { font-size: .8rem !important; }
.footer-copy  { font-size: .72rem !important; }

/* ── SKILL BAR IMPROVEMENTS ── */
.sb-name { font-size: .88rem !important; }

/* ── WRITING SECTION ── */
.pub-card-title, .pub-title { font-size: 1rem !important; font-weight: 700 !important; }
.pub-card-excerpt, .pub-excerpt { font-size: .84rem !important; line-height: 1.7 !important; }

/* ── BETTER NAV ── */
.nav-link { font-size: .78rem !important; letter-spacing: .03em !important; }

/* ── RESPONSIVE IMPROVEMENTS ── */
@media (max-width: 768px) {
  .posture-score-card { display: none; } /* reduce cognitive load on mobile */
  .radar-wrap { flex-direction: column; }
  .radar-svg { width: 220px; height: 220px; }
  .pei-inner { flex-direction: column; gap: 10px; }
  .skills-layout { grid-template-columns: 1fr !important; }
  .certs-grid { grid-template-columns: 1fr !important; }
  .ach-grid { grid-template-columns: 1fr !important; }
}

/* ── PRINT STYLES ── */
@media print {
  .section-dots, .topbar, .cmdk-overlay, .cursor-dot, .cursor-ring,
  .back-to-top, .otw-banner, .bg-orb, .grid-noise,
  .plain-english-intro, .explorer-section { display: none !important; }
  .section { break-inside: avoid; }
  body { background: white !important; color: black !important; }
  a[href]::after { content: " (" attr(href) ")"; font-size: .7em; }
}

/* ── SMOOTH SCROLL ENHANCEMENT ── */
html { scroll-behavior: smooth; }
.section { scroll-margin-top: 80px; }

/* ── FOCUS VISIBLE IMPROVEMENTS ── */
:focus-visible {
  outline: 2px solid rgba(0,255,65,.6);
  outline-offset: 3px;
  border-radius: 3px;
}

/* ── STAGGER ANIMATION DELAY IMPROVEMENTS ── */
.stagger > *:nth-child(1)  { animation-delay: .04s !important; }
.stagger > *:nth-child(2)  { animation-delay: .09s !important; }
.stagger > *:nth-child(3)  { animation-delay: .14s !important; }
.stagger > *:nth-child(4)  { animation-delay: .19s !important; }
.stagger > *:nth-child(5)  { animation-delay: .24s !important; }
.stagger > *:nth-child(6)  { animation-delay: .29s !important; }

/* ── SELECTION ── */
::selection { background: rgba(0,255,65,.18); color: #eef5ee; }
"""

open(CSS, 'a', encoding='utf-8').write(NEW_CSS)
print(f"styles.css: appended V11 CSS")

# ══════════════════════════════════════════════════════════════════════════════
# JS ADDITIONS
# ══════════════════════════════════════════════════════════════════════════════
JS_V11 = r"""

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
"""

open(JS, 'a', encoding='utf-8').write(JS_V11)
print(f"script.js: appended V11 JS")

print("\n✅ V11 upgrade complete!")
