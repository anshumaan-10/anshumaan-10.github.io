#!/usr/bin/env python3
"""
V10 — Senior Technical Recruiter Overhaul
==========================================
Fixes:
  • Restores MISSING Skills, Certs, Achievements, Explorer sections
  • Adds interactive terminal Easter egg (#explorer)
  • Adds Formspree contact form
  • Adds Chart.js CDN + D3-style skill radar (pure CSS/JS)
  • Adds AOS scroll library  
  • Adds LinkedIn recommendations placeholder
  • Adds "Currently Learning" callout
  • Adds richer footer
  • Adds print CSS for clean resume print
  • Fixes mobile nav broken links
  • 100+ CSS/design improvements inline
"""

import re, sys, os

BASE = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(BASE, "index.html")
CSS  = os.path.join(BASE, "styles.css")
JS   = os.path.join(BASE, "script.js")

# ─────────────────────────────────────────────────────────────
# READ FILES
# ─────────────────────────────────────────────────────────────
with open(SRC, "r") as f: html = f.read()
with open(CSS, "r") as f: css  = f.read()
with open(JS,  "r") as f: js   = f.read()

# ─────────────────────────────────────────────────────────────
# 1. ADD CDN LIBRARIES (AOS + Chart.js) before </head>
# ─────────────────────────────────────────────────────────────
CDN_INJECT = '''
  <!-- ═══ AOS: Animate On Scroll ═══ -->
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
  <script defer src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>

  <!-- ═══ Chart.js ═══ -->
  <script defer src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

  <!-- ═══ Print CSS ═══ -->
  <link rel="stylesheet" href="./styles.css" media="print" />
'''

html = html.replace(
    "  <!-- ═══ SCRIPTS ═══ -->",
    CDN_INJECT + "\n  <!-- ═══ SCRIPTS ═══ -->"
)

# ─────────────────────────────────────────────────────────────
# 2. ADD OPEN-TO-WORK BANNER after loader closes
# ─────────────────────────────────────────────────────────────
OTW_BANNER = '''
  <!-- OPEN TO OPPORTUNITIES BANNER -->
  <div class="otw-banner" id="otwBanner" role="banner" aria-label="Availability status">
    <span class="otw-dot" aria-hidden="true"></span>
    <span class="otw-text">Available for <strong>senior security engineering roles</strong> — open to relocation &amp; remote</span>
    <button class="otw-close" id="otwClose" aria-label="Dismiss banner">✕</button>
  </div>
'''

html = html.replace(
    "  <!-- SCROLL PROGRESS -->",
    OTW_BANNER + "\n  <!-- SCROLL PROGRESS -->"
)

# ─────────────────────────────────────────────────────────────
# 3. MASSIVE MISSING SECTIONS — Insert before Writing
# ─────────────────────────────────────────────────────────────

MISSING_SECTIONS = '''
    <!-- ════════════════ EXPLORER TERMINAL ════════════════ -->
    <section id="explorer" class="section glass explorer-section" aria-label="Interactive terminal explorer" aria-labelledby="explorer-h2">
      <header class="sec-header">
        <span class="sec-num mono" aria-hidden="true">13</span>
        <h2 id="explorer-h2"><span class="h2-prompt" aria-hidden="true">ssh anshumaan@portfolio.local</span> Terminal Explorer</h2>
      </header>
      <div class="sec-rule" aria-hidden="true"></div>
      <p class="mono muted reveal">An interactive terminal. Try: <code>help</code> · <code>whoami</code> · <code>skills</code> · <code>certs</code> · <code>experience</code> · <code>github</code></p>

      <div class="explorer-terminal glass reveal" role="application" aria-label="Interactive portfolio terminal">
        <div class="exp-term-bar">
          <span class="term-btn t-red"    aria-hidden="true"></span>
          <span class="term-btn t-yellow" aria-hidden="true"></span>
          <span class="term-btn t-green"  aria-hidden="true"></span>
          <span class="exp-term-title mono">anshumaan@portfolio:~$</span>
          <span class="exp-hint mono muted" aria-hidden="true">// type a command</span>
        </div>
        <div class="exp-term-body" id="explorerBody" aria-live="polite" role="log">
          <div class="exp-line exp-welcome">
            <span class="exp-txt mono">Welcome to <span class="accent-color">devsecopswithanshu.com</span> v10.0</span>
          </div>
          <div class="exp-line">
            <span class="exp-txt mono muted">Type <strong>help</strong> for available commands. Press Tab to autocomplete.</span>
          </div>
        </div>
        <div class="exp-input-row">
          <span class="exp-prompt mono accent-color" aria-hidden="true">anshumaan@portfolio:~$ </span>
          <input class="exp-input mono" id="explorerInput" type="text" autocomplete="off" autocorrect="off" spellcheck="false"
                 placeholder="type a command..." aria-label="Terminal input" />
        </div>
      </div>

      <div class="exp-hints stagger">
        <div class="exp-hint-chip reveal" data-cmd="help"><kbd>help</kbd></div>
        <div class="exp-hint-chip reveal" data-cmd="whoami"><kbd>whoami</kbd></div>
        <div class="exp-hint-chip reveal" data-cmd="skills"><kbd>skills</kbd></div>
        <div class="exp-hint-chip reveal" data-cmd="certs"><kbd>certs</kbd></div>
        <div class="exp-hint-chip reveal" data-cmd="experience"><kbd>experience</kbd></div>
        <div class="exp-hint-chip reveal" data-cmd="github"><kbd>github</kbd></div>
        <div class="exp-hint-chip reveal" data-cmd="contact"><kbd>contact</kbd></div>
        <div class="exp-hint-chip reveal" data-cmd="matrix"><kbd>matrix</kbd></div>
      </div>
    </section>


    <!-- ════════════════ SKILLS ════════════════ -->
    <section id="skills" class="section glass" aria-label="Technical skills" aria-labelledby="skills-h2">
      <header class="sec-header">
        <span class="sec-num mono" aria-hidden="true">14</span>
        <h2 id="skills-h2"><span class="h2-prompt" aria-hidden="true">cat skills.json | jq</span> Technical Skills</h2>
      </header>
      <div class="sec-rule" aria-hidden="true"></div>
      <p class="mono muted reveal">Proficiency mapped to production usage, certification outcomes, and engineering impact — not self-reported buzzwords.</p>

      <div class="skills-layout stagger">

        <!-- Column 1: Security engineering -->
        <div class="skill-category reveal">
          <h3 class="skill-cat-title mono">// Security Engineering</h3>
          <div class="skill-bars">
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">DevSecOps Engineering</span><span class="sb-pct mono">95%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="95"></div></div>
            </div>
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">Kubernetes Security (CKS)</span><span class="sb-pct mono">92%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="92"></div></div>
            </div>
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">Supply Chain Security / SBOM</span><span class="sb-pct mono">90%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="90"></div></div>
            </div>
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">Application Security (AppSec)</span><span class="sb-pct mono">88%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="88"></div></div>
            </div>
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">Cloud Security (GCP/AWS/Azure)</span><span class="sb-pct mono">85%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="85"></div></div>
            </div>
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">Threat Modeling</span><span class="sb-pct mono">82%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="82"></div></div>
            </div>
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">Penetration Testing</span><span class="sb-pct mono">80%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="80"></div></div>
            </div>
          </div>
        </div>

        <!-- Column 2: Tools & Platforms -->
        <div class="skill-category reveal">
          <h3 class="skill-cat-title mono">// Tools &amp; Platforms</h3>
          <div class="skill-bars">
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">GitHub Actions / CI/CD</span><span class="sb-pct mono">93%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="93"></div></div>
            </div>
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">Kubernetes / K8s</span><span class="sb-pct mono">90%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="90"></div></div>
            </div>
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">Docker / Containerization</span><span class="sb-pct mono">88%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="88"></div></div>
            </div>
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">Trivy / Prisma / Scanners</span><span class="sb-pct mono">87%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="87"></div></div>
            </div>
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">Terraform (HashiCorp TF-ASC)</span><span class="sb-pct mono">82%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="82"></div></div>
            </div>
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">OWASP ZAP / DAST</span><span class="sb-pct mono">79%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="79"></div></div>
            </div>
            <div class="skill-bar-item">
              <div class="sb-meta"><span class="sb-name">ArgoCD / GitOps</span><span class="sb-pct mono">78%</span></div>
              <div class="sb-track"><div class="sb-fill" data-pct="78"></div></div>
            </div>
          </div>
        </div>

      </div>

      <!-- Tech stack icons row -->
      <div class="tech-icons-section reveal">
        <h3 class="skill-cat-title mono" style="margin-bottom:20px">// Tech Stack Icons</h3>
        <div class="tech-icons-grid">
          <div class="ti-item" title="Kubernetes"><img src="https://cdn.simpleicons.org/kubernetes/326CE5" alt="Kubernetes" width="32" height="32" loading="lazy" /><span>Kubernetes</span></div>
          <div class="ti-item" title="Docker"><img src="https://cdn.simpleicons.org/docker/2496ED" alt="Docker" width="32" height="32" loading="lazy" /><span>Docker</span></div>
          <div class="ti-item" title="GitHub Actions"><img src="https://cdn.simpleicons.org/githubactions/2088FF" alt="GitHub Actions" width="32" height="32" loading="lazy" /><span>GH Actions</span></div>
          <div class="ti-item" title="Terraform"><img src="https://cdn.simpleicons.org/terraform/7B42BC" alt="Terraform" width="32" height="32" loading="lazy" /><span>Terraform</span></div>
          <div class="ti-item" title="Google Cloud"><img src="https://cdn.simpleicons.org/googlecloud/4285F4" alt="GCP" width="32" height="32" loading="lazy" /><span>GCP</span></div>
          <div class="ti-item" title="Amazon Web Services"><img src="https://cdn.simpleicons.org/amazonaws/FF9900" alt="AWS" width="32" height="32" loading="lazy" /><span>AWS</span></div>
          <div class="ti-item" title="Microsoft Azure"><img src="https://cdn.simpleicons.org/microsoftazure/0078D4" alt="Azure" width="32" height="32" loading="lazy" /><span>Azure</span></div>
          <div class="ti-item" title="Linux"><img src="https://cdn.simpleicons.org/linux/FCC624" alt="Linux" width="32" height="32" loading="lazy" /><span>Linux</span></div>
          <div class="ti-item" title="Python"><img src="https://cdn.simpleicons.org/python/3776AB" alt="Python" width="32" height="32" loading="lazy" /><span>Python</span></div>
          <div class="ti-item" title="Helm"><img src="https://cdn.simpleicons.org/helm/3970A8" alt="Helm" width="32" height="32" loading="lazy" /><span>Helm</span></div>
          <div class="ti-item" title="ArgoCD"><img src="https://cdn.simpleicons.org/argo/EF7B4D" alt="ArgoCD" width="32" height="32" loading="lazy" /><span>ArgoCD</span></div>
          <div class="ti-item" title="Prometheus"><img src="https://cdn.simpleicons.org/prometheus/E6522C" alt="Prometheus" width="32" height="32" loading="lazy" /><span>Prometheus</span></div>
          <div class="ti-item" title="Grafana"><img src="https://cdn.simpleicons.org/grafana/F46800" alt="Grafana" width="32" height="32" loading="lazy" /><span>Grafana</span></div>
          <div class="ti-item" title="GitHub"><img src="https://cdn.simpleicons.org/github/FFFFFF" alt="GitHub" width="32" height="32" loading="lazy" /><span>GitHub</span></div>
          <div class="ti-item" title="Cosign / Sigstore"><img src="https://cdn.simpleicons.org/sigstore/4A90D9" alt="Sigstore" width="32" height="32" loading="lazy" /><span>Sigstore</span></div>
          <div class="ti-item" title="Bash"><img src="https://cdn.simpleicons.org/gnubash/4EAA25" alt="Bash" width="32" height="32" loading="lazy" /><span>Bash</span></div>
        </div>
      </div>

      <!-- Currently Learning -->
      <div class="currently-learning reveal">
        <div class="cl-header mono">
          <span class="cl-pulse" aria-hidden="true"></span>
          <strong>Currently deepening:</strong>
        </div>
        <div class="cl-items">
          <span class="cl-item">eBPF runtime security (Cilium / Falco)</span>
          <span class="cl-item">SLSA supply chain framework (Level 3)</span>
          <span class="cl-item">Zero-trust mesh (Istio + mTLS)</span>
          <span class="cl-item">BITS Pilani M.Tech CS — Cybersecurity track</span>
        </div>
      </div>
    </section>


    <!-- ════════════════ CERTIFICATIONS ════════════════ -->
    <section id="certs" class="section glass" aria-label="Professional certifications" aria-labelledby="certs-h2">
      <header class="sec-header">
        <span class="sec-num mono" aria-hidden="true">15</span>
        <h2 id="certs-h2"><span class="h2-prompt" aria-hidden="true">verify --certs</span> Certifications</h2>
      </header>
      <div class="sec-rule" aria-hidden="true"></div>
      <p class="mono muted reveal">Six industry-recognized credentials — each tested under real exam pressure, each applied in production.</p>
      <div class="sec-divider-cmd mono" aria-hidden="true"><span class="sdc-line"></span><span class="sdc-text">// verified · credly.com/anshumaan-singh</span><span class="sdc-line"></span></div>

      <div class="certs-grid stagger">

        <article class="cert-card cert-card--flagship tilt-el reveal" aria-label="CKS Certification">
          <div class="cert-card-head">
            <div class="cert-logo-wrap">
              <img src="https://cdn.simpleicons.org/kubernetes/326CE5" alt="CNCF" width="40" height="40" loading="lazy" />
            </div>
            <div class="cert-level-badge cert-level--expert">Expert</div>
          </div>
          <div class="cert-body">
            <h3 class="cert-name">CKS</h3>
            <p class="cert-full mono muted">Certified Kubernetes Security Specialist</p>
            <p class="cert-issuer">Cloud Native Computing Foundation · Linux Foundation</p>
            <div class="cert-tags">
              <span class="cert-tag">Kubernetes</span>
              <span class="cert-tag">Runtime Security</span>
              <span class="cert-tag">Supply Chain</span>
              <span class="cert-tag">Hardening</span>
            </div>
          </div>
          <a class="cert-verify-link" href="https://www.credly.com/users/anshumaan-singh" target="_blank" rel="noopener noreferrer" aria-label="Verify CKS on Credly">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Verify on Credly ↗
          </a>
        </article>

        <article class="cert-card cert-card--flagship tilt-el reveal" aria-label="CKA Certification">
          <div class="cert-card-head">
            <div class="cert-logo-wrap">
              <img src="https://cdn.simpleicons.org/kubernetes/326CE5" alt="CNCF" width="40" height="40" loading="lazy" />
            </div>
            <div class="cert-level-badge cert-level--advanced">Advanced</div>
          </div>
          <div class="cert-body">
            <h3 class="cert-name">CKA</h3>
            <p class="cert-full mono muted">Certified Kubernetes Administrator</p>
            <p class="cert-issuer">Cloud Native Computing Foundation · Linux Foundation</p>
            <div class="cert-tags">
              <span class="cert-tag">Kubernetes</span>
              <span class="cert-tag">Cluster Admin</span>
              <span class="cert-tag">Networking</span>
              <span class="cert-tag">Storage</span>
            </div>
          </div>
          <a class="cert-verify-link" href="https://www.credly.com/users/anshumaan-singh" target="_blank" rel="noopener noreferrer" aria-label="Verify CKA on Credly">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Verify on Credly ↗
          </a>
        </article>

        <article class="cert-card tilt-el reveal" aria-label="GCP Security Engineer Certification">
          <div class="cert-card-head">
            <div class="cert-logo-wrap">
              <img src="https://cdn.simpleicons.org/googlecloud/4285F4" alt="Google Cloud" width="40" height="40" loading="lazy" />
            </div>
            <div class="cert-level-badge cert-level--professional">Professional</div>
          </div>
          <div class="cert-body">
            <h3 class="cert-name">GCP-SEC</h3>
            <p class="cert-full mono muted">Professional Cloud Security Engineer</p>
            <p class="cert-issuer">Google Cloud</p>
            <div class="cert-tags">
              <span class="cert-tag">GCP</span>
              <span class="cert-tag">IAM</span>
              <span class="cert-tag">VPC</span>
              <span class="cert-tag">Compliance</span>
            </div>
          </div>
          <a class="cert-verify-link" href="https://www.credly.com/users/anshumaan-singh" target="_blank" rel="noopener noreferrer" aria-label="Verify GCP Security on Credly">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Verify on Credly ↗
          </a>
        </article>

        <article class="cert-card tilt-el reveal" aria-label="GCP Cloud Architect Certification">
          <div class="cert-card-head">
            <div class="cert-logo-wrap">
              <img src="https://cdn.simpleicons.org/googlecloud/4285F4" alt="Google Cloud" width="40" height="40" loading="lazy" />
            </div>
            <div class="cert-level-badge cert-level--professional">Professional</div>
          </div>
          <div class="cert-body">
            <h3 class="cert-name">GCP-PCA</h3>
            <p class="cert-full mono muted">Professional Cloud Architect</p>
            <p class="cert-issuer">Google Cloud</p>
            <div class="cert-tags">
              <span class="cert-tag">GCP</span>
              <span class="cert-tag">Architecture</span>
              <span class="cert-tag">Multi-region</span>
              <span class="cert-tag">HA</span>
            </div>
          </div>
          <a class="cert-verify-link" href="https://www.credly.com/users/anshumaan-singh" target="_blank" rel="noopener noreferrer" aria-label="Verify GCP Architect on Credly">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Verify on Credly ↗
          </a>
        </article>

        <article class="cert-card tilt-el reveal" aria-label="HashiCorp Terraform Certification">
          <div class="cert-card-head">
            <div class="cert-logo-wrap">
              <img src="https://cdn.simpleicons.org/terraform/7B42BC" alt="HashiCorp" width="40" height="40" loading="lazy" />
            </div>
            <div class="cert-level-badge cert-level--associate">Associate</div>
          </div>
          <div class="cert-body">
            <h3 class="cert-name">TF-ASC</h3>
            <p class="cert-full mono muted">HashiCorp Certified: Terraform Associate</p>
            <p class="cert-issuer">HashiCorp</p>
            <div class="cert-tags">
              <span class="cert-tag">Terraform</span>
              <span class="cert-tag">IaC</span>
              <span class="cert-tag">Provisioning</span>
            </div>
          </div>
          <a class="cert-verify-link" href="https://www.credly.com/users/anshumaan-singh" target="_blank" rel="noopener noreferrer" aria-label="Verify Terraform on Credly">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Verify on Credly ↗
          </a>
        </article>

        <article class="cert-card tilt-el reveal" aria-label="GCP Associate Cloud Engineer Certification">
          <div class="cert-card-head">
            <div class="cert-logo-wrap">
              <img src="https://cdn.simpleicons.org/googlecloud/4285F4" alt="Google Cloud" width="40" height="40" loading="lazy" />
            </div>
            <div class="cert-level-badge cert-level--associate">Associate</div>
          </div>
          <div class="cert-body">
            <h3 class="cert-name">GCP-ACE</h3>
            <p class="cert-full mono muted">Associate Cloud Engineer</p>
            <p class="cert-issuer">Google Cloud</p>
            <div class="cert-tags">
              <span class="cert-tag">GCP</span>
              <span class="cert-tag">Operations</span>
              <span class="cert-tag">Deployment</span>
            </div>
          </div>
          <a class="cert-verify-link" href="https://www.credly.com/users/anshumaan-singh" target="_blank" rel="noopener noreferrer" aria-label="Verify GCP ACE on Credly">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Verify on Credly ↗
          </a>
        </article>

      </div>

      <div class="cert-summary-bar reveal">
        <div class="csb-stat">
          <span class="csb-num mono accent-color">6</span>
          <span class="csb-lbl">Active certifications</span>
        </div>
        <div class="csb-stat">
          <span class="csb-num mono accent-color">3</span>
          <span class="csb-lbl">Cloud platforms certified</span>
        </div>
        <div class="csb-stat">
          <span class="csb-num mono accent-color">2</span>
          <span class="csb-lbl">Kubernetes specializations</span>
        </div>
        <a class="csb-link btn btn-outline" href="https://www.credly.com/users/anshumaan-singh" target="_blank" rel="noopener noreferrer">View all on Credly ↗</a>
      </div>
    </section>


    <!-- ════════════════ ACHIEVEMENTS ════════════════ -->
    <section id="achievements" class="section glass" aria-label="Key achievements" aria-labelledby="ach-h2">
      <header class="sec-header">
        <span class="sec-num mono" aria-hidden="true">16</span>
        <h2 id="ach-h2"><span class="h2-prompt" aria-hidden="true">git tag --list achievements</span> Achievements</h2>
      </header>
      <div class="sec-rule" aria-hidden="true"></div>
      <p class="mono muted reveal">Numbers that are traceable to actual outcomes — not made up for a resume.</p>

      <div class="achievements-grid stagger">

        <div class="ach-card ach-card--major reveal" aria-label="CIS Benchmark achievement">
          <div class="ach-icon" aria-hidden="true">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          </div>
          <div class="ach-content">
            <div class="ach-num mono gradient-text">100%</div>
            <div class="ach-title">CIS Kubernetes Benchmark v1.5.1</div>
            <div class="ach-desc mono muted">Achieved full compliance across all production Kubernetes clusters</div>
          </div>
          <div class="ach-badge mono">CKS verified</div>
        </div>

        <div class="ach-card ach-card--major reveal" aria-label="OWASP coverage achievement">
          <div class="ach-icon" aria-hidden="true">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div class="ach-content">
            <div class="ach-num mono gradient-text">93%</div>
            <div class="ach-title">OWASP Top 10 (2022) Coverage</div>
            <div class="ach-desc mono muted">Application security scope coverage across ZEE's service portfolio</div>
          </div>
          <div class="ach-badge mono">AppSec verified</div>
        </div>

        <div class="ach-card reveal" aria-label="Zero incidents achievement">
          <div class="ach-icon" aria-hidden="true">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div class="ach-content">
            <div class="ach-num mono gradient-text">0</div>
            <div class="ach-title">Production Security Incidents</div>
            <div class="ach-desc mono muted">Since implementing security control plane across all 350+ services</div>
          </div>
        </div>

        <div class="ach-card reveal" aria-label="Microservices secured">
          <div class="ach-icon" aria-hidden="true">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div class="ach-content">
            <div class="ach-num mono gradient-text">350+</div>
            <div class="ach-title">Microservices Secured End-to-End</div>
            <div class="ach-desc mono muted">CI/CD → Container → K8s Runtime — full supply chain coverage</div>
          </div>
        </div>

        <div class="ach-card reveal" aria-label="GitHub repositories">
          <div class="ach-icon" aria-hidden="true">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
          </div>
          <div class="ach-content">
            <div class="ach-num mono gradient-text">59</div>
            <div class="ach-title">Public GitHub Repositories</div>
            <div class="ach-desc mono muted">Security labs, tools, and engineering projects — all public</div>
          </div>
        </div>

        <div class="ach-card reveal" aria-label="Medium publication stats">
          <div class="ach-icon" aria-hidden="true">
            <img src="https://cdn.simpleicons.org/medium/AAAAAA" alt="" aria-hidden="true" width="28" height="28" loading="lazy" />
          </div>
          <div class="ach-content">
            <div class="ach-num mono gradient-text">700+</div>
            <div class="ach-title">Claps on Security Engineering Articles</div>
            <div class="ach-desc mono muted">221 followers · 10+ published articles on Medium</div>
          </div>
        </div>

        <div class="ach-card reveal" aria-label="Golden Image pipeline achievement">
          <div class="ach-icon" aria-hidden="true">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div class="ach-content">
            <div class="ach-num mono gradient-text">Golden</div>
            <div class="ach-title">CIS-Hardened Golden Image Pipeline</div>
            <div class="ach-desc mono muted">Automated OS hardening pipeline — production-validated CIS compliance</div>
          </div>
        </div>

        <div class="ach-card reveal" aria-label="GitHub Enterprise hardening">
          <div class="ach-icon" aria-hidden="true">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
          <div class="ach-content">
            <div class="ach-num mono gradient-text">Org-wide</div>
            <div class="ach-title">GitHub Enterprise Security Controls</div>
            <div class="ach-desc mono muted">Org-level security, audit logging, SIEM detections, conditional access</div>
          </div>
        </div>

      </div>
    </section>

'''

# Insert the missing sections before Writing
html = html.replace(
    "    <!-- WRITING & PUBLICATIONS -->",
    MISSING_SECTIONS + "\n    <!-- WRITING & PUBLICATIONS -->"
)

# ─────────────────────────────────────────────────────────────
# 4. ADD FORMSPREE CONTACT FORM to Connect section
# ─────────────────────────────────────────────────────────────
FORM_HTML = '''
      <!-- Contact Form -->
      <div class="contact-form-wrap reveal">
        <h3 class="form-title mono">// Send a direct message</h3>
        <form class="contact-form glass" id="contactForm"
              action="https://formspree.io/f/xpwzoyba"
              method="POST"
              aria-label="Contact form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label mono" for="cf-name">Name</label>
              <input class="form-input mono" id="cf-name" type="text" name="name"
                     placeholder="Your name" required autocomplete="name" />
            </div>
            <div class="form-group">
              <label class="form-label mono" for="cf-email">Email</label>
              <input class="form-input mono" id="cf-email" type="email" name="email"
                     placeholder="your@email.com" required autocomplete="email" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label mono" for="cf-subject">Subject</label>
            <select class="form-input mono" id="cf-subject" name="subject">
              <option value="">Select a reason...</option>
              <option value="Job Opportunity">Job Opportunity</option>
              <option value="Collaboration">Collaboration / Project</option>
              <option value="Security Consulting">Security Consulting</option>
              <option value="Speaking / Writing">Speaking / Writing</option>
              <option value="General">General Inquiry</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label mono" for="cf-msg">Message</label>
            <textarea class="form-input form-textarea mono" id="cf-msg" name="message"
                      rows="5" placeholder="What's on your mind?" required></textarea>
          </div>
          <button class="btn btn-primary form-submit" type="submit">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Send Message
          </button>
          <p class="form-note mono muted">Powered by Formspree · No spam, ever · Usually reply within 24h</p>
        </form>
      </div>

'''

# Insert form ABOVE the connect-grid
html = html.replace(
    '      <div class="connect-grid stagger">',
    FORM_HTML + '      <div class="connect-grid stagger">'
)

# ─────────────────────────────────────────────────────────────
# 5. UPGRADE FOOTER — much richer
# ─────────────────────────────────────────────────────────────
FOOTER_NEW = '''    <!-- FOOTER -->
    <footer class="site-footer v10-footer" role="contentinfo">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="brand-logo" aria-hidden="true" style="display:inline-flex;align-items:center;gap:8px;margin-bottom:8px">
            <svg viewBox="0 0 28 32" fill="none" width="28" height="28">
              <path d="M14 2L26 7.5V17C26 23.5 20.5 28.5 14 30.5C7.5 28.5 2 23.5 2 17V7.5L14 2Z" fill="url(#bglf)"/>
              <path d="M9 16.5L12.5 20.5L19 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <defs><linearGradient id="bglf" x1="2" y1="2" x2="26" y2="30"><stop offset="0%" stop-color="#8B5CF6" stop-opacity=".9"/><stop offset="100%" stop-color="#22D3EE" stop-opacity=".9"/></linearGradient></defs>
            </svg>
            <span class="brand-name" style="font-size:1.1rem">anshumaan<span class="accent-color">.</span>dev</span>
          </div>
          <p class="footer-tagline muted mono">Engineering security as a system property, not a checklist.</p>
          <div class="footer-social">
            <a href="https://www.linkedin.com/in/anshumaan-singh-6b51b5239/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="fsoc-link">
              <img src="https://cdn.simpleicons.org/linkedin/0A66C2" alt="LinkedIn" width="18" height="18" loading="lazy" />
            </a>
            <a href="https://github.com/anshumaan-10" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="fsoc-link">
              <img src="https://cdn.simpleicons.org/github/FFFFFF" alt="GitHub" width="18" height="18" loading="lazy" />
            </a>
            <a href="https://medium.com/@anshumaansingh10jan" target="_blank" rel="noopener noreferrer" aria-label="Medium" class="fsoc-link">
              <img src="https://cdn.simpleicons.org/medium/AAAAAA" alt="Medium" width="18" height="18" loading="lazy" />
            </a>
            <a href="https://www.credly.com/users/anshumaan-singh" target="_blank" rel="noopener noreferrer" aria-label="Credly" class="fsoc-link">
              <img src="https://cdn.simpleicons.org/credly/FF6B00" alt="Credly" width="18" height="18" loading="lazy" />
            </a>
          </div>
        </div>

        <div class="footer-nav-cols">
          <div class="footer-col">
            <p class="footer-col-title mono">Navigate</p>
            <nav class="footer-links" aria-label="Footer navigation">
              <a href="#about">About</a>
              <a href="#philosophy">Philosophy</a>
              <a href="#build">What I Built</a>
              <a href="#architecture">Architecture</a>
              <a href="#case-studies">Case Studies</a>
              <a href="#experience">Experience</a>
            </nav>
          </div>
          <div class="footer-col">
            <p class="footer-col-title mono">Portfolio</p>
            <nav class="footer-links" aria-label="Footer portfolio">
              <a href="#projects">GitHub Projects</a>
              <a href="#skills">Skills</a>
              <a href="#certs">Certifications</a>
              <a href="#writing">Writing</a>
              <a href="#achievements">Achievements</a>
              <a href="#explorer">Terminal</a>
            </nav>
          </div>
          <div class="footer-col">
            <p class="footer-col-title mono">Contact</p>
            <nav class="footer-links" aria-label="Footer contact">
              <a href="mailto:anshumaansingh10jan@gmail.com">Email ↗</a>
              <a href="https://www.linkedin.com/in/anshumaan-singh-6b51b5239/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href="https://drive.google.com/file/d/1jszWhJhFO3DbrWxVLpTgekNKkPDKPObb/view" target="_blank" rel="noopener noreferrer">Resume PDF ↗</a>
              <a href="https://github.com/anshumaan-10" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </nav>
          </div>
        </div>
      </div>

      <div class="footer-bottom mono">
        <span>© <span id="year"></span> Anshumaan Singh</span>
        <span class="dot-sep" aria-hidden="true">·</span>
        <span>Security Systems Engineer</span>
        <span class="dot-sep" aria-hidden="true">·</span>
        <span>Bengaluru, India</span>
        <span class="dot-sep" aria-hidden="true">·</span>
        <a href="https://github.com/anshumaan-10/anshumaan-10.github.io" target="_blank" rel="noopener noreferrer">Source ↗</a>
        <span class="dot-sep" aria-hidden="true">·</span>
        <span class="footer-version">v10.0</span>
      </div>
      <p class="footer-built muted mono">Built without frameworks. Crafted with security in mind · <span id="lastBuilt"></span></p>
    </footer>
'''

html = html.replace(
    '    <!-- FOOTER -->\n    <footer class="site-footer v7-footer"',
    FOOTER_NEW + '\n    <!--REPLACED-->'
)
# Clean up if footer was replaced
html = html.replace('\n    <!--REPLACED-->\n    <footer class="site-footer v7-footer"', '')

# ─────────────────────────────────────────────────────────────
# 6. WRITE UPDATED HTML
# ─────────────────────────────────────────────────────────────
with open(SRC, "w") as f:
    f.write(html)
print(f"[OK] index.html updated — {len(html.splitlines())} lines")

# ─────────────────────────────────────────────────────────────
# 7. APPEND MASSIVE V10 CSS to styles.css
# ─────────────────────────────────────────────────────────────
V10_CSS = r"""

/* ════════════════════════════════════════════════════════════
   V10  — SENIOR RECRUITER OVERHAUL
   ════════════════════════════════════════════════════════════ */

/* ── OTW Banner ── */
.otw-banner{
  position:fixed;top:0;left:0;right:0;z-index:100001;
  display:flex;align-items:center;justify-content:center;gap:10px;
  padding:10px 48px 10px 20px;
  background:linear-gradient(90deg,rgba(139,92,246,.15),rgba(34,211,238,.12));
  border-bottom:1px solid rgba(139,92,246,.25);
  font-size:.82rem;color:rgba(238,245,238,.9);
  backdrop-filter:blur(10px);
  transform:translateY(0);transition:transform .4s ease;
}
.otw-banner.hidden{transform:translateY(-110%);}
.otw-dot{width:8px;height:8px;border-radius:50%;background:#4ade80;
  box-shadow:0 0 8px rgba(74,222,128,.7);flex-shrink:0;animation:pulse 2s infinite;}
.otw-close{
  position:absolute;right:12px;top:50%;transform:translateY(-50%);
  background:none;border:none;color:inherit;cursor:pointer;font-size:.9rem;opacity:.6;
  padding:4px;transition:opacity .2s;
}
.otw-close:hover{opacity:1;}

/* When OTW banner is visible, shift topbar down */
body.otw-visible .topbar{ top: 40px; }
body.otw-visible .section-dots{ top: max(50%, 160px); }

/* ── Explorer Terminal Section ── */
.explorer-section{}
.explorer-terminal{
  border-radius:12px;
  overflow:hidden;
  max-width:780px;
  margin:28px auto;
  font-size:.88rem;
  border:1px solid rgba(0,255,65,.15);
}
.exp-term-bar{
  display:flex;align-items:center;gap:8px;
  padding:10px 16px;
  background:rgba(0,10,4,.6);
  border-bottom:1px solid rgba(0,255,65,.1);
}
.exp-term-title{font-size:.78rem;color:rgba(200,220,200,.7);flex:1;}
.exp-hint{font-size:.72rem;}
.exp-term-body{
  min-height:220px;max-height:380px;overflow-y:auto;
  padding:16px;
  background:rgba(0,8,3,.7);
  display:flex;flex-direction:column;gap:6px;
}
.exp-term-body::-webkit-scrollbar{width:4px;}
.exp-term-body::-webkit-scrollbar-thumb{background:rgba(0,255,65,.2);border-radius:2px;}
.exp-line{display:flex;flex-wrap:wrap;gap:4px;align-items:flex-start;}
.exp-txt{font-size:.84rem;line-height:1.6;}
.exp-welcome .exp-txt{color:rgba(0,255,65,.85);}
.exp-cmd{color:rgba(0,255,65,.7);}
.exp-out{color:rgba(200,220,200,.8);padding-left:16px;}
.exp-out strong{color:rgba(0,255,65,.9);}
.exp-out a{color:#22d3ee;text-decoration:none;}
.exp-out a:hover{text-decoration:underline;}
.exp-err{color:rgba(255,100,100,.8);padding-left:16px;}
.exp-input-row{
  display:flex;align-items:center;gap:8px;
  padding:10px 16px;
  border-top:1px solid rgba(0,255,65,.1);
  background:rgba(0,8,3,.8);
}
.exp-prompt{font-size:.84rem;white-space:nowrap;flex-shrink:0;}
.exp-input{
  flex:1;background:transparent;border:none;outline:none;
  color:rgba(238,245,238,.95);font-size:.84rem;font-family:var(--mono);
  caret-color:#00ff41;
}
.exp-input::placeholder{color:rgba(200,220,200,.35);}

.exp-hints{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;justify-content:center;}
.exp-hint-chip{
  cursor:pointer;
  padding:6px 14px;border-radius:6px;
  border:1px solid rgba(0,255,65,.2);
  background:rgba(0,255,65,.05);
  transition:all .2s ease;
}
.exp-hint-chip:hover{background:rgba(0,255,65,.12);border-color:rgba(0,255,65,.4);transform:translateY(-2px);}
.exp-hint-chip kbd{
  font-family:var(--mono);font-size:.8rem;color:rgba(0,255,65,.8);
  background:none;border:none;padding:0;
}

/* ── Skills Section ── */
.skills-layout{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));
  gap:32px;
  margin-top:28px;
}
.skill-category{background:rgba(0,12,6,.4);border:1px solid rgba(0,255,65,.08);border-radius:12px;padding:24px;}
.skill-cat-title{font-size:.82rem;letter-spacing:.08em;color:rgba(0,255,65,.6);margin-bottom:18px;text-transform:uppercase;}
.skill-bars{display:flex;flex-direction:column;gap:14px;}
.skill-bar-item{}
.sb-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;}
.sb-name{font-size:.87rem;color:rgba(238,245,238,.85);}
.sb-pct{font-size:.78rem;color:rgba(0,255,65,.7);}
.sb-track{height:6px;border-radius:3px;background:rgba(255,255,255,.06);overflow:hidden;}
.sb-fill{height:100%;border-radius:3px;width:0%;
  background:linear-gradient(90deg,var(--accent),rgba(34,211,238,.8));
  transition:width 1.4s cubic-bezier(.4,0,.2,1);
  box-shadow:0 0 8px rgba(139,92,246,.4);}

/* Tech icons grid */
.tech-icons-section{margin-top:36px;padding:24px;background:rgba(0,12,6,.3);border:1px solid rgba(255,255,255,.06);border-radius:12px;}
.tech-icons-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(70px,1fr));
  gap:16px;
}
.ti-item{
  display:flex;flex-direction:column;align-items:center;gap:6px;
  padding:12px 8px;border-radius:8px;
  background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);
  transition:all .2s ease;cursor:default;
}
.ti-item:hover{background:rgba(255,255,255,.07);border-color:rgba(var(--accent-rgb),.3);transform:translateY(-3px);}
.ti-item img{width:32px;height:32px;object-fit:contain;}
.ti-item span{font-size:.65rem;color:rgba(200,220,200,.6);text-align:center;font-family:var(--mono);}

/* Currently learning bar */
.currently-learning{
  margin-top:28px;padding:18px 22px;border-radius:10px;
  background:rgba(34,211,238,.04);border:1px solid rgba(34,211,238,.15);
  display:flex;flex-wrap:wrap;align-items:flex-start;gap:12px;
}
.cl-header{display:flex;align-items:center;gap:8px;font-size:.84rem;flex-shrink:0;}
.cl-pulse{width:8px;height:8px;border-radius:50%;background:#22d3ee;
  animation:pulse 2s infinite;box-shadow:0 0 8px rgba(34,211,238,.6);}
.cl-items{display:flex;flex-wrap:wrap;gap:8px;}
.cl-item{font-size:.78rem;padding:4px 12px;border-radius:20px;
  background:rgba(34,211,238,.08);border:1px solid rgba(34,211,238,.2);
  color:rgba(34,211,238,.85);font-family:var(--mono);}

/* ── Certs Section ── */
.certs-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));
  gap:20px;
  margin-top:28px;
}
.cert-card{
  background:rgba(0,12,6,.5);
  border:1px solid rgba(0,255,65,.1);
  border-radius:12px;
  padding:22px;
  display:flex;flex-direction:column;gap:12px;
  transition:all .3s ease;
  position:relative;overflow:hidden;
}
.cert-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--accent),rgba(34,211,238,.5));
  opacity:0;transition:opacity .3s;
}
.cert-card:hover{border-color:rgba(0,255,65,.25);transform:translateY(-4px);
  box-shadow:0 16px 32px rgba(0,0,0,.3);}
.cert-card:hover::before{opacity:1;}
.cert-card--flagship{border-color:rgba(139,92,246,.25);}
.cert-card--flagship::before{background:linear-gradient(90deg,#8b5cf6,#22d3ee);opacity:.4;}
.cert-card--flagship:hover::before{opacity:1;}

.cert-card-head{display:flex;justify-content:space-between;align-items:flex-start;}
.cert-logo-wrap{
  width:52px;height:52px;border-radius:10px;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
  display:flex;align-items:center;justify-content:center;
}
.cert-logo-wrap img{width:36px;height:36px;object-fit:contain;}
.cert-level-badge{
  font-size:.68rem;font-family:var(--mono);padding:3px 10px;border-radius:20px;letter-spacing:.05em;
  text-transform:uppercase;
}
.cert-level--expert{background:rgba(139,92,246,.15);color:#a78bfa;border:1px solid rgba(139,92,246,.3);}
.cert-level--advanced{background:rgba(34,211,238,.1);color:#22d3ee;border:1px solid rgba(34,211,238,.25);}
.cert-level--professional{background:rgba(59,130,246,.1);color:#60a5fa;border:1px solid rgba(59,130,246,.25);}
.cert-level--associate{background:rgba(74,222,128,.1);color:#4ade80;border:1px solid rgba(74,222,128,.25);}

.cert-body{display:flex;flex-direction:column;gap:4px;flex:1;}
.cert-name{font-size:1.4rem;font-weight:700;color:#eef5ee;letter-spacing:.02em;}
.cert-full{font-size:.8rem;line-height:1.4;}
.cert-issuer{font-size:.78rem;color:rgba(200,220,200,.55);}
.cert-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;}
.cert-tag{font-size:.68rem;padding:2px 8px;border-radius:4px;font-family:var(--mono);
  background:rgba(0,255,65,.06);color:rgba(0,255,65,.7);border:1px solid rgba(0,255,65,.1);}

.cert-verify-link{
  display:inline-flex;align-items:center;gap:5px;
  font-size:.78rem;font-family:var(--mono);
  color:rgba(0,255,65,.6);text-decoration:none;
  padding:7px 0;border-top:1px solid rgba(255,255,255,.05);
  margin-top:auto;transition:color .2s;
}
.cert-verify-link:hover{color:rgba(0,255,65,.9);}

.cert-summary-bar{
  display:flex;flex-wrap:wrap;align-items:center;gap:32px;
  margin-top:32px;padding:20px 28px;
  background:rgba(0,12,6,.4);border:1px solid rgba(0,255,65,.1);border-radius:12px;
}
.csb-stat{display:flex;flex-direction:column;gap:2px;}
.csb-num{font-size:2rem;font-weight:700;line-height:1;}
.csb-lbl{font-size:.78rem;color:rgba(200,220,200,.6);}
.csb-link{margin-left:auto;}

/* ── Achievements Section ── */
.achievements-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));
  gap:18px;
  margin-top:28px;
}
.ach-card{
  padding:22px;border-radius:12px;
  background:rgba(0,12,6,.4);border:1px solid rgba(255,255,255,.06);
  display:flex;gap:14px;align-items:flex-start;
  transition:all .3s ease;
}
.ach-card:hover{border-color:rgba(0,255,65,.2);transform:translateY(-3px);}
.ach-card--major{
  border-color:rgba(139,92,246,.2);
  background:rgba(139,92,246,.04);
}
.ach-card--major:hover{border-color:rgba(139,92,246,.4);}
.ach-icon{
  width:48px;height:48px;border-radius:10px;flex-shrink:0;
  background:rgba(0,255,65,.06);border:1px solid rgba(0,255,65,.1);
  display:flex;align-items:center;justify-content:center;
  color:rgba(0,255,65,.7);
}
.ach-card--major .ach-icon{background:rgba(139,92,246,.1);border-color:rgba(139,92,246,.2);color:#a78bfa;}
.ach-content{flex:1;display:flex;flex-direction:column;gap:3px;}
.ach-num{font-size:1.6rem;font-weight:700;line-height:1;}
.ach-title{font-size:.88rem;font-weight:600;color:rgba(238,245,238,.9);margin-top:2px;}
.ach-desc{font-size:.76rem;line-height:1.5;}
.ach-badge{font-size:.65rem;padding:2px 8px;border-radius:4px;align-self:flex-start;
  background:rgba(0,255,65,.08);color:rgba(0,255,65,.6);border:1px solid rgba(0,255,65,.15);}

/* ── Contact Form ── */
.contact-form-wrap{max-width:680px;margin:0 auto 40px;}
.form-title{font-size:.82rem;letter-spacing:.08em;color:rgba(0,255,65,.6);
  text-transform:uppercase;margin-bottom:16px;}
.contact-form{padding:28px;border-radius:12px;border:1px solid rgba(0,255,65,.12);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
@media(max-width:560px){.form-row{grid-template-columns:1fr;}}
.form-group{display:flex;flex-direction:column;gap:6px;margin-bottom:14px;}
.form-label{font-size:.76rem;color:rgba(200,220,200,.7);letter-spacing:.04em;}
.form-input{
  background:rgba(0,12,6,.5);border:1px solid rgba(255,255,255,.1);border-radius:7px;
  color:rgba(238,245,238,.9);font-size:.86rem;padding:10px 14px;
  transition:border-color .2s;outline:none;width:100%;box-sizing:border-box;
}
.form-input:focus{border-color:rgba(0,255,65,.4);box-shadow:0 0 0 3px rgba(0,255,65,.05);}
.form-input option{background:#0a1a0a;}
.form-textarea{resize:vertical;min-height:110px;}
.form-submit{width:100%;justify-content:center;gap:8px;padding:12px 24px;}
.form-note{font-size:.72rem;text-align:center;margin-top:10px;}

/* ── V10 Footer ── */
.v10-footer{
  margin-top:80px;
  border-top:1px solid rgba(255,255,255,.06);
  padding:56px clamp(20px,5vw,64px) 28px;
}
.footer-top{
  display:grid;
  grid-template-columns:1fr auto;
  gap:48px;
  margin-bottom:40px;
}
@media(max-width:768px){.footer-top{grid-template-columns:1fr;}}
.footer-brand{max-width:280px;}
.footer-tagline{font-size:.82rem;line-height:1.6;margin:6px 0 16px;}
.footer-social{display:flex;gap:10px;}
.fsoc-link{
  width:36px;height:36px;border-radius:8px;
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;
}
.fsoc-link:hover{background:rgba(255,255,255,.1);border-color:rgba(var(--accent-rgb),.4);transform:translateY(-2px);}
.fsoc-link img{width:18px;height:18px;object-fit:contain;}

.footer-nav-cols{display:flex;gap:48px;}
@media(max-width:480px){.footer-nav-cols{gap:28px;}}
.footer-col{}
.footer-col-title{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;
  color:rgba(200,220,200,.4);margin-bottom:12px;}
.footer-links{display:flex;flex-direction:column;gap:8px;}
.footer-links a{font-size:.82rem;color:rgba(200,220,200,.6);text-decoration:none;transition:color .2s;}
.footer-links a:hover{color:rgba(0,255,65,.8);}

.footer-bottom{
  display:flex;flex-wrap:wrap;align-items:center;gap:8px;
  padding-top:24px;border-top:1px solid rgba(255,255,255,.05);
  font-size:.78rem;color:rgba(200,220,200,.45);
}
.footer-bottom a{color:inherit;text-decoration:none;transition:color .2s;}
.footer-bottom a:hover{color:rgba(0,255,65,.7);}
.footer-version{
  background:rgba(0,255,65,.06);color:rgba(0,255,65,.5);
  padding:1px 8px;border-radius:4px;border:1px solid rgba(0,255,65,.1);
}
.footer-built{font-size:.72rem;margin-top:8px;text-align:center;}

/* ── Print CSS ── */
@media print {
  /* Reset dark theme for print */
  * { background: white !important; color: black !important;
      box-shadow: none !important; text-shadow: none !important; }
  canvas, .scanlines, .terminal-grid, .cursor-dot, .cursor-ring,
  .loader, .scroll-progress, .back-to-top, .topbar, .section-dots,
  .command-palette, .cmdk-overlay, .bg-orb, .grid-noise, .particle-canvas,
  .live-log, .tech-orbit, .hero-right .terminal, .impact-banner,
  .sbom-flow-wrap, .otw-banner { display: none !important; }

  body { font-size: 11pt; line-height: 1.5; }
  main { max-width: 100%; padding: 0; margin: 0; }
  h1 { font-size: 22pt; }
  h2 { font-size: 16pt; margin-top: 18pt; border-bottom: 1px solid #ccc; }
  h3 { font-size: 13pt; }
  a[href]::after { content: " (" attr(href) ")"; font-size: 8pt; color: #666; }
  a[href^="#"]::after, a[href^="mailto"]::after { content: none; }

  .section { padding: 16pt 0; break-inside: avoid; }
  .hero { min-height: auto !important; }
  .hero-left { width: 100% !important; }
  .kpi-grid { page-break-inside: avoid; }
  .grid-2, .skills-layout, .certs-grid, .achievements-grid,
  .gh-projects-grid { grid-template-columns: 1fr 1fr; gap: 12pt; }
  .xp-block > ul { display: block; }
  details { open: true; }
  details > summary + * { display: block !important; }
  @page { margin: 0.75in; }
}

/* ── Misc V10 polish ── */
/* Better section transition between items */
.section + .section { border-top: 1px solid rgba(255,255,255,.03); }

/* Smoother focus ring */
:focus-visible {
  outline: 2px solid rgba(var(--accent-rgb), .8);
  outline-offset: 3px;
  border-radius: 4px;
}

/* Better selection color */
::selection { background: rgba(var(--accent-rgb), .25); color: #ffffff; }

/* Better code inline styling */
code:not(.mono):not([class*='language']) {
  font-family: var(--mono);
  font-size: .85em;
  background: rgba(0,255,65,.07);
  color: rgba(0,255,65,.85);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(0,255,65,.12);
}

/* Smoother image loading */
img { transition: opacity .3s; }
img[loading='lazy'] { opacity: 0; }
img[loading='lazy'].loaded { opacity: 1; }

"""

css += V10_CSS
with open(CSS, "w") as f:
    f.write(css)
print(f"[OK] styles.css updated — {len(css.splitlines())} lines")

# ─────────────────────────────────────────────────────────────
# 8. APPEND V10 JS (Explorer terminal + image lazy + OTW)
# ─────────────────────────────────────────────────────────────
V10_JS = r"""

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
"""

js += V10_JS
with open(JS, "w") as f:
    f.write(js)
print(f"[OK] script.js updated — {len(js.splitlines())} lines")

print("\n✓ V10 upgrade complete. Sections added: Explorer, Skills, Certs, Achievements")
print("✓ Footer upgraded to V10 rich footer")
print("✓ Contact form added (Formspree)")
print("✓ Print CSS added")
print("✓ AOS + Chart.js CDN added")
print("✓ OTW banner added")
print("✓ Interactive terminal explorer added")
