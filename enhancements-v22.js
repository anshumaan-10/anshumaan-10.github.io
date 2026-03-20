/**
 * ENHANCEMENTS V22 — Interactive Pipeline, Tool Ecosystem, Architecture
 * DevSecOps Portfolio — Anshumaan Singh
 */
'use strict';

/* ─── Pipeline Stage Data ─────────────────────────────── */
const PIPELINE_STAGES = [
  {
    id: 'commit',
    label: 'Code Commit',
    tool: 'GitHub',
    icon: 'https://cdn.simpleicons.org/github/6b7280',
    color: '#6b7280',
    checks: [
      { text: 'Branch protection enforced', pass: true },
      { text: 'Commit signing (verified badge)', pass: true },
      { text: 'PR review gate (2 approvals)', pass: true },
    ],
    desc: 'Developer pushes a signed commit to a protected branch. Branch protection rules enforce PR reviews and commit signing via GPG keys.',
    terminal: [
      { cls: 'dim',     text: '$ git push origin feature/add-vault-secret' },
      { cls: 'info',    text: '→ Branch protection check...' },
      { cls: 'success', text: '✓ Signed commit verified (GPG)' },
      { cls: 'success', text: '✓ PR review policy satisfied' },
      { cls: 'info',    text: '→ Triggering CI pipeline...' },
    ],
  },
  {
    id: 'sast',
    label: 'SAST Scan',
    tool: 'Semgrep',
    icon: 'https://cdn.simpleicons.org/semgrep/1B2D3E',
    iconFallback: '🔍',
    color: '#1B2D3E',
    checks: [
      { text: 'Static code analysis (Semgrep OSS)', pass: true },
      { text: 'Secret detection (Gitleaks)', pass: true },
      { text: 'OWASP Top 10 rule set', pass: true },
      { text: '0 high severity findings', pass: true },
    ],
    desc: 'Semgrep scans source code for security anti-patterns using OWASP and custom rule sets. Gitleaks detects hardcoded secrets before build.',
    terminal: [
      { cls: 'dim',     text: '$ semgrep scan --config=auto --severity=ERROR' },
      { cls: 'info',    text: '→ Running 847 rules...' },
      { cls: 'success', text: '✓ 0 high-severity findings' },
      { cls: 'warn',    text: '⚠ 2 informational findings (suppressed)' },
      { cls: 'dim',     text: '$ gitleaks detect --source=.' },
      { cls: 'success', text: '✓ No secrets detected' },
    ],
  },
  {
    id: 'sca',
    label: 'SCA / Deps',
    tool: 'Snyk',
    icon: 'https://cdn.simpleicons.org/snyk/4C4A73',
    color: '#4C4A73',
    checks: [
      { text: 'Dependency vulnerability scan', pass: true },
      { text: 'License compliance check', pass: true },
      { text: 'No critical CVEs in deps', pass: true },
    ],
    desc: 'Snyk scans all direct and transitive dependencies for known CVEs. Blocks pipeline if CVSS ≥ 9.0 vulnerabilities are found.',
    terminal: [
      { cls: 'dim',     text: '$ snyk test --severity-threshold=high' },
      { cls: 'info',    text: '→ Testing 142 dependencies...' },
      { cls: 'success', text: '✓ 0 critical vulnerabilities' },
      { cls: 'success', text: '✓ 1 high (CVE-2024-XXXX) — patched' },
      { cls: 'success', text: '✓ License policy: PASS' },
    ],
  },
  {
    id: 'build',
    label: 'Build Image',
    tool: 'Docker',
    icon: 'https://cdn.simpleicons.org/docker/2496ED',
    color: '#2496ED',
    checks: [
      { text: 'Multi-stage Dockerfile (minimal base)', pass: true },
      { text: 'Non-root USER instruction', pass: true },
      { text: 'No secrets in layers', pass: true },
      { text: 'Distroless base image', pass: true },
    ],
    desc: 'Docker multi-stage build produces a minimal distroless image. Non-root USER, dropped capabilities, and read-only root filesystem enforced at build time.',
    terminal: [
      { cls: 'dim',     text: '$ docker build -t app:sha-abc123 --no-cache .' },
      { cls: 'info',    text: '→ Stage 1/2: builder (golang:1.22-alpine)' },
      { cls: 'info',    text: '→ Stage 2/2: gcr.io/distroless/base:nonroot' },
      { cls: 'success', text: '✓ Image built: 28.4 MB (distroless)' },
      { cls: 'success', text: '✓ USER nonroot (UID 65532)' },
    ],
  },
  {
    id: 'scan',
    label: 'Container Scan',
    tool: 'Trivy',
    icon: '',
    iconFallback: '🔬',
    color: '#1904DA',
    checks: [
      { text: 'OS package vulnerabilities', pass: true },
      { text: 'Language library CVEs', pass: true },
      { text: 'Misconfig (Dockerfile / k8s)', pass: true },
      { text: 'CVSS ≥ 9.0: 0 found', pass: true },
    ],
    desc: 'Trivy scans the final container image for OS-level CVEs, language library vulnerabilities, and Dockerfile misconfigurations in a single pass.',
    terminal: [
      { cls: 'dim',     text: '$ trivy image --severity CRITICAL,HIGH app:sha-abc123' },
      { cls: 'info',    text: '→ Fetching vulnerability DB...' },
      { cls: 'success', text: '✓ CRITICAL: 0' },
      { cls: 'success', text: '✓ HIGH: 0' },
      { cls: 'warn',    text: '⚠ MEDIUM: 3 (accepted risk, tracked)' },
      { cls: 'success', text: '✓ Image scan: PASS' },
    ],
  },
  {
    id: 'sbom',
    label: 'SBOM Generate',
    tool: 'Syft + Grype',
    icon: '',
    iconFallback: '📋',
    color: '#10b981',
    checks: [
      { text: 'SBOM in CycloneDX + SPDX format', pass: true },
      { text: 'Attestation attached to image', pass: true },
      { text: 'Grype vulnerability match on SBOM', pass: true },
    ],
    desc: 'Syft generates a Software Bill of Materials (SBOM) in CycloneDX format. Grype cross-references the SBOM against the NVD vulnerability database.',
    terminal: [
      { cls: 'dim',     text: '$ syft app:sha-abc123 -o cyclonedx-json > sbom.json' },
      { cls: 'success', text: '✓ SBOM: 142 components catalogued' },
      { cls: 'dim',     text: '$ grype sbom:sbom.json --fail-on high' },
      { cls: 'success', text: '✓ Grype: 0 matches above threshold' },
      { cls: 'info',    text: '→ Attaching SBOM attestation...' },
    ],
  },
  {
    id: 'sign',
    label: 'Sign Image',
    tool: 'Cosign',
    icon: '',
    iconFallback: '🔏',
    color: '#7c3aed',
    checks: [
      { text: 'Keyless signing via Sigstore', pass: true },
      { text: 'SBOM attestation signed', pass: true },
      { text: 'Transparency log (Rekor) entry', pass: true },
    ],
    desc: 'Cosign signs the container image digest using keyless signing via Sigstore OIDC. The signature and SBOM attestation are both recorded in Rekor transparency log.',
    terminal: [
      { cls: 'dim',     text: '$ cosign sign --yes app:sha-abc123' },
      { cls: 'info',    text: '→ Authenticating with Sigstore OIDC...' },
      { cls: 'success', text: '✓ Image signed: sha256:abc123...' },
      { cls: 'dim',     text: '$ cosign attest --predicate sbom.json app:sha-abc123' },
      { cls: 'success', text: '✓ SBOM attestation recorded in Rekor' },
    ],
  },
  {
    id: 'kyverno',
    label: 'Kyverno Gate',
    tool: 'Kyverno',
    icon: '',
    iconFallback: '🛡️',
    color: '#2563eb',
    checks: [
      { text: 'Image signature verified', pass: true },
      { text: 'SBOM attestation present', pass: true },
      { text: 'No privileged containers', pass: true },
      { text: 'Resource limits enforced', pass: true },
    ],
    desc: 'Kyverno admission webhook validates every image against our policy library before it can run in the cluster. Unsigned or unattested images are auto-blocked.',
    terminal: [
      { cls: 'dim',     text: 'AdmissionReview: Deployment/app namespace=prod' },
      { cls: 'info',    text: '→ Verifying Cosign signature...' },
      { cls: 'success', text: '✓ Signature valid (Sigstore OIDC)' },
      { cls: 'success', text: '✓ SBOM attestation: verified' },
      { cls: 'success', text: '✓ Policy: require-resource-limits PASS' },
      { cls: 'success', text: '✓ Admission: ALLOWED' },
    ],
  },
  {
    id: 'deploy',
    label: 'GitOps Deploy',
    tool: 'Argo CD',
    icon: 'https://cdn.simpleicons.org/argo/EF7B4D',
    color: '#EF7B4D',
    checks: [
      { text: 'GitOps sync from Helm chart repo', pass: true },
      { text: 'Auto-sync with self-heal', pass: true },
      { text: 'Rollback on health check fail', pass: true },
    ],
    desc: 'Argo CD syncs the desired state from the Helm chart Git repository. Health checks gate the rollout, and automated rollback triggers if pods fail to become ready.',
    terminal: [
      { cls: 'dim',     text: '$ argocd app sync prod-app --prune' },
      { cls: 'info',    text: '→ Syncing to commit sha-abc123...' },
      { cls: 'success', text: '✓ Deployment: 3/3 replicas ready' },
      { cls: 'success', text: '✓ Health: Healthy' },
      { cls: 'success', text: '✓ Sync status: Synced' },
    ],
  },
  {
    id: 'runtime',
    label: 'Runtime Watch',
    tool: 'Falco',
    icon: '',
    iconFallback: '👁️',
    color: '#00aec7',
    checks: [
      { text: 'Syscall anomaly detection (Falco)', pass: true },
      { text: 'Network policy enforcement (Cilium)', pass: true },
      { text: 'Alerts → Slack + PagerDuty', pass: true },
    ],
    desc: 'Falco watches kernel syscall events and fires alerts on any policy violation (shell in container, privilege escalation attempt, unexpected outbound connection).',
    terminal: [
      { cls: 'dim',     text: 'falco[runtime]: watching syscalls...' },
      { cls: 'success', text: '✓ Cilium network policy: enforced' },
      { cls: 'success', text: '✓ No Falco alerts in last 5m' },
      { cls: 'info',    text: '→ SIEM: 0 high-priority events' },
      { cls: 'success', text: '✅ Pipeline complete — image serving ✓' },
    ],
  },
];

/* ─── Ecosystem Tools Data ─────────────────────────────── */
const ECO_TOOLS = [
  /* CI/CD */
  { name:'GitHub Actions', cat:'cicd', logo:'https://cdn.simpleicons.org/githubactions/2088FF', level:'expert',   accent:'#2088FF', tip:'Primary CI/CD — 15+ workflow files' },
  { name:'Argo CD',        cat:'cicd', logo:'https://cdn.simpleicons.org/argo/EF7B4D',          level:'expert',   accent:'#EF7B4D', tip:'GitOps deploy for all K8s clusters' },
  { name:'Helm',           cat:'cicd', logo:'https://cdn.simpleicons.org/helm/0F1689',           level:'advanced', accent:'#0F1689', tip:'Templating K8s manifests' },
  { name:'GitHub',         cat:'cicd', logo:'https://cdn.simpleicons.org/github/181717',         level:'expert',   accent:'#181717', tip:'Source control + PRs + Actions' },
  /* Kubernetes */
  { name:'Kubernetes',     cat:'k8s',  logo:'https://cdn.simpleicons.org/kubernetes/326CE5',     level:'expert',   accent:'#326CE5', tip:'Running production workloads on GKE' },
  { name:'Kyverno',        cat:'k8s',  logo:'',                                                  level:'expert',   accent:'#2563eb', tip:'50+ ClusterPolicy rules in prod', logoFallback:'kyverno' },
  { name:'Falco',          cat:'k8s',  logo:'',                                                  level:'advanced', accent:'#00aec7', tip:'Runtime syscall anomaly detection', logoFallback:'falco' },
  { name:'Cilium',         cat:'k8s',  logo:'https://cdn.simpleicons.org/cilium/F8C517',         level:'advanced', accent:'#F8C517', tip:'eBPF-based network policy' },
  { name:'OPA / Rego',     cat:'k8s',  logo:'https://cdn.simpleicons.org/openpolicyagent/7D9899', level:'proficient', accent:'#7D9899', tip:'Policy-as-code for Gatekeeper' },
  /* Cloud */
  { name:'Google Cloud',   cat:'cloud', logo:'https://cdn.simpleicons.org/googlecloud/4285F4',   level:'advanced', accent:'#4285F4', tip:'GKE, Cloud Armor, VPC-SC, IAM' },
  { name:'Terraform',      cat:'cloud', logo:'https://cdn.simpleicons.org/terraform/7B42BC',     level:'advanced', accent:'#7B42BC', tip:'IaC for all GCP infra' },
  { name:'Vault',          cat:'cloud', logo:'https://cdn.simpleicons.org/vault/FFD814',         level:'advanced', accent:'#FFD814', tip:'Secrets management, PKI CA' },
  /* AppSec */
  { name:'Semgrep',        cat:'appsec', logo:'',                                                level:'advanced', accent:'#1B2D3E', tip:'SAST: custom + OWASP ruleset', logoFallback:'semgrep' },
  { name:'Snyk',           cat:'appsec', logo:'https://cdn.simpleicons.org/snyk/4C4A73',         level:'expert',   accent:'#4C4A73', tip:'SCA + Container + IaC scanning' },
  { name:'Trivy',          cat:'appsec', logo:'',                                                level:'expert',   accent:'#1904DA', tip:'CVE scanning in every pipeline', logoFallback:'trivy' },
  { name:'OWASP ZAP',      cat:'appsec', logo:'https://cdn.simpleicons.org/owasp/000000',        level:'proficient', accent:'#000000', tip:'DAST scans in staging' },
  { name:'Gitleaks',       cat:'appsec', logo:'',                                                level:'advanced', accent:'#e74c3c', tip:'Pre-commit secret detection', logoFallback:'gitleaks' },
  /* Supply Chain */
  { name:'Cosign',         cat:'supply', logo:'',                                                level:'expert',   accent:'#7c3aed', tip:'Keyless image signing via Sigstore', logoFallback:'cosign' },
  { name:'Syft',           cat:'supply', logo:'',                                                level:'expert',   accent:'#10b981', tip:'SBOM in CycloneDX + SPDX', logoFallback:'syft' },
  { name:'Grype',          cat:'supply', logo:'',                                                level:'expert',   accent:'#10b981', tip:'SBOM vulnerability matching', logoFallback:'grype' },
  { name:'Docker',         cat:'supply', logo:'https://cdn.simpleicons.org/docker/2496ED',       level:'expert',   accent:'#2496ED', tip:'Multi-stage distroless builds' },
  /* SIEM / Observability */
  { name:'Elasticsearch',  cat:'siem', logo:'https://cdn.simpleicons.org/elasticsearch/005571', level:'advanced', accent:'#005571', tip:'Log aggregation + correlation' },
  { name:'Kibana',         cat:'siem', logo:'https://cdn.simpleicons.org/kibana/005571',        level:'advanced', accent:'#005571', tip:'Security dashboards + visualizations' },
  { name:'Prometheus',     cat:'siem', logo:'https://cdn.simpleicons.org/prometheus/E6522C',    level:'advanced', accent:'#E6522C', tip:'K8s metrics + alerting rules' },
  { name:'Grafana',        cat:'siem', logo:'https://cdn.simpleicons.org/grafana/F46800',       level:'advanced', accent:'#F46800', tip:'Ops + security dashboards' },
  /* Identity */
  { name:'Sigstore',       cat:'identity', logo:'',                                             level:'expert',   accent:'#3b82f6', tip:'Transparency log, OIDC signing', logoFallback:'sigstore' },
  { name:'GCP IAM',        cat:'identity', logo:'https://cdn.simpleicons.org/googlecloud/4285F4', level:'advanced', accent:'#4285F4', tip:'Workload Identity, least-priv' },
  /* Languages */
  { name:'Python',         cat:'languages', logo:'https://cdn.simpleicons.org/python/3776AB',   level:'advanced', accent:'#3776AB', tip:'Automation, security scripts' },
  { name:'Go',             cat:'languages', logo:'https://cdn.simpleicons.org/go/00ADD8',       level:'proficient', accent:'#00ADD8', tip:'K8s operator & admission webhook' },
  { name:'Bash / Shell',   cat:'languages', logo:'https://cdn.simpleicons.org/gnubash/4EAA25',  level:'expert',   accent:'#4EAA25', tip:'Pipeline automation scripts' },
  { name:'Rego',           cat:'languages', logo:'https://cdn.simpleicons.org/openpolicyagent/7D9899', level:'proficient', accent:'#7D9899', tip:'OPA policy-as-code' },
];

/* ─── Radar Items ──────────────────────────────────────── */
const RADAR_ITEMS = [
  /* ADOPT */
  { name: 'Kyverno',         ring: 'adopt',   quad: 'Platform Security',  x: 90,  y: 40  },
  { name: 'Cosign',          ring: 'adopt',   quad: 'Supply Chain',       x: 70,  y: 60  },
  { name: 'Trivy',           ring: 'adopt',   quad: 'Vulnerability Mgmt', x: 60,  y: 30  },
  { name: 'Falco',           ring: 'adopt',   quad: 'Runtime Security',   x: 50,  y: 80  },
  { name: 'Semgrep',         ring: 'adopt',   quad: 'AppSec',             x: 40,  y: 50  },
  { name: 'Argo CD',         ring: 'adopt',   quad: 'Platform Security',  x: 110, y: 70  },
  /* TRIAL */
  { name: 'Cilium',          ring: 'trial',   quad: 'Platform Security',  x: 150, y: 50  },
  { name: 'Grype',           ring: 'trial',   quad: 'Supply Chain',       x: 130, y: 90  },
  { name: 'Syft',            ring: 'trial',   quad: 'Supply Chain',       x: 160, y: 70  },
  { name: 'Tetragon',        ring: 'trial',   quad: 'Runtime Security',   x: 140, y: 110 },
  /* ASSESS */
  { name: 'Kubescape',       ring: 'assess',  quad: 'Platform Security',  x: 210, y: 60  },
  { name: 'SLSA framework',  ring: 'assess',  quad: 'Supply Chain',       x: 200, y: 90  },
  { name: 'OpenFGA',         ring: 'assess',  quad: 'Identity',           x: 220, y: 120 },
  /* HOLD */
  { name: 'Jenkins',         ring: 'hold',    quad: 'CI/CD',              x: 260, y: 70  },
  { name: 'Legacy agents',   ring: 'hold',    quad: 'Vulnerability Mgmt', x: 280, y: 100 },
];

/* ═══════════════════════════════════════════════════════════
   PIPELINE DEMO CONTROLLER
═══════════════════════════════════════════════════════════ */
class PipelineDemo {
  constructor() {
    this.running    = false;
    this.currentIdx = -1;
    this.elapsed    = 0;
    this.timer      = null;
    this.stages     = Array.from(document.querySelectorAll('.pi-stage'));
    this.runBtn     = document.getElementById('pdRunBtn');
    this.resetBtn   = document.getElementById('pdResetBtn');
    this.detailPane = document.getElementById('pdDetailPane');
    this.termBody   = document.getElementById('pdTermBody');
    this.elapsedEl  = document.getElementById('pdElapsed');
    this.stageEl    = document.getElementById('pdCurrentStage');
    this.passEl     = document.getElementById('pdPassCount');

    if (!this.stages.length) return;
    this.runBtn?.addEventListener('click', () => this.run());
    this.resetBtn?.addEventListener('click', () => this.reset());

    // Click-to-preview on individual stages
    this.stages.forEach((el, i) => {
      el.addEventListener('click', () => {
        if (!this.running) this.showDetail(i, 'passed');
      });
    });
  }

  run() {
    if (this.running) return;
    this.reset();
    this.running = true;
    if (this.runBtn) {
      this.runBtn.disabled = true;
      this.runBtn.textContent = '⏳ Running…';
    }
    this.elapsed = 0;
    this.timer = setInterval(() => {
      this.elapsed += 0.1;
      if (this.elapsedEl) this.elapsedEl.textContent = this.elapsed.toFixed(1) + 's';
    }, 100);
    this.advance(0);
  }

  advance(idx) {
    if (idx >= PIPELINE_STAGES.length) {
      this.complete();
      return;
    }
    this.currentIdx = idx;
    if (this.stageEl) this.stageEl.textContent = PIPELINE_STAGES[idx].label;
    if (this.passEl)  this.passEl.textContent  = idx;

    // Mark previous as passed
    if (idx > 0) {
      this.stages[idx - 1]?.classList.remove('active');
      this.stages[idx - 1]?.classList.add('passed');
    }
    // Mark current as active
    this.stages[idx]?.classList.add('active');

    this.showDetail(idx, 'active');
    this.typeTerminal(PIPELINE_STAGES[idx].terminal, () => {
      setTimeout(() => this.advance(idx + 1), 600);
    });
  }

  showDetail(idx, state) {
    if (!this.detailPane) return;
    const stage = PIPELINE_STAGES[idx];
    if (!stage) return;

    const checksHtml = stage.checks.map(c => `
      <li>
        <span class="pd-check-icon ${state === 'active' ? 'run' : c.pass ? 'pass' : 'fail'}">${state === 'active' ? '●' : c.pass ? '✓' : '✗'}</span>
        ${c.text}
      </li>`).join('');

    const logoHtml = stage.icon
      ? `<img src="${stage.icon}" alt="${stage.tool}" style="width:28px;height:28px;object-fit:contain;" loading="lazy">`
      : `<span style="font-size:1.4rem">${stage.iconFallback || '⚙️'}</span>`;

    this.detailPane.innerHTML = `
      <div class="pd-stage-detail visible">
        <div class="pd-detail-left">
          <div class="pd-detail-stage-tag">${logoHtml} ${stage.tool}</div>
          <div class="pd-detail-title">${stage.label}</div>
          <div class="pd-detail-desc">${stage.desc}</div>
          <ul class="pd-detail-checks">${checksHtml}</ul>
        </div>
        <div class="pd-detail-right">
          <div class="pd-terminal">
            <div class="pd-terminal-bar">
              <span class="pd-term-dot r"></span>
              <span class="pd-term-dot y"></span>
              <span class="pd-term-dot g"></span>
              <span class="pd-term-title">pipeline — ${stage.tool.toLowerCase()}</span>
            </div>
            <div class="pd-term-body" id="pdTermBody"></div>
          </div>
        </div>
      </div>`;
    this.termBody = document.getElementById('pdTermBody');
  }

  typeTerminal(lines, onDone) {
    if (!lines || !lines.length) { onDone?.(); return; }
    let i = 0;
    const write = () => {
      if (i >= lines.length) { onDone?.(); return; }
      const el = document.createElement('span');
      el.className = `pd-term-line ${lines[i].cls}`;
      el.textContent = lines[i].text;
      this.termBody?.appendChild(el);
      this.termBody?.scrollTo(0, 9999);
      i++;
      setTimeout(write, 320);
    };
    write();
  }

  complete() {
    clearInterval(this.timer);
    this.running = false;
    // Mark last stage passed
    this.stages[PIPELINE_STAGES.length - 1]?.classList.remove('active');
    this.stages[PIPELINE_STAGES.length - 1]?.classList.add('passed');
    if (this.passEl) this.passEl.textContent = PIPELINE_STAGES.length;
    if (this.stageEl) this.stageEl.textContent = 'Complete ✓';
    if (this.runBtn) {
      this.runBtn.disabled = false;
      this.runBtn.textContent = '▶ Run Again';
    }
    // Append final success to terminal
    const line = document.createElement('span');
    line.className = 'pd-term-line success';
    line.textContent = '✅ Pipeline PASSED — all 10 gates cleared';
    this.termBody?.appendChild(line);
    this.termBody?.scrollTo(0, 9999);
  }

  reset() {
    clearInterval(this.timer);
    this.running    = false;
    this.currentIdx = -1;
    this.elapsed    = 0;
    this.stages.forEach(el => el.classList.remove('active', 'passed', 'failed'));
    if (this.detailPane) {
      this.detailPane.innerHTML = `<div class="pd-detail-idle">Click <strong>▶ Run Secure Pipeline</strong> to start the interactive demo</div>`;
    }
    if (this.elapsedEl)  this.elapsedEl.textContent  = '0.0s';
    if (this.stageEl)    this.stageEl.textContent     = '—';
    if (this.passEl)     this.passEl.textContent      = '0';
    if (this.runBtn) {
      this.runBtn.disabled = false;
      this.runBtn.textContent = '▶ Run Secure Pipeline';
    }
  }
}

/* ═══════════════════════════════════════════════════════════
   TOOL ECOSYSTEM RENDERER
═══════════════════════════════════════════════════════════ */
class EcosystemRenderer {
  constructor() {
    this.container = document.getElementById('ecoGrid');
    if (!this.container) return;
    this.renderAll();
  }

  renderAll() {
    // Group by category
    const cats = [
      { id: 'cicd',      label: 'CI/CD & GitOps',        icon: '⚙️' },
      { id: 'k8s',       label: 'Kubernetes & Runtime',   icon: '☸️' },
      { id: 'appsec',    label: 'Application Security',   icon: '🛡️' },
      { id: 'supply',    label: 'Supply Chain Security',  icon: '🔏' },
      { id: 'siem',      label: 'Observability & SIEM',   icon: '📊' },
      { id: 'cloud',     label: 'Cloud & Infrastructure', icon: '☁️' },
      { id: 'identity',  label: 'Identity & Access',      icon: '🔑' },
      { id: 'languages', label: 'Languages & Scripting',  icon: '💻' },
    ];

    this.container.innerHTML = cats.map(cat => {
      const tools = ECO_TOOLS.filter(t => t.cat === cat.id);
      if (!tools.length) return '';
      return `
        <div class="eco-category">
          <div class="eco-cat-header">
            <div class="eco-cat-icon ${cat.id}">${cat.icon}</div>
            <span class="eco-cat-name">${cat.label}</span>
            <span class="eco-cat-count">${tools.length} tools</span>
            <div class="eco-cat-line"></div>
          </div>
          <div class="eco-tools-grid">
            ${tools.map(t => this.toolCard(t)).join('')}
          </div>
        </div>`;
    }).join('');
  }

  toolCard(t) {
    const logoEl = t.logo
      ? `<img class="eco-tool-logo" src="${t.logo}" alt="${t.name}" loading="lazy">`
      : `<span style="font-size:1.75rem">${this.fallbackEmoji(t.logoFallback)}</span>`;
    return `
      <div class="eco-tool-card" style="--tool-accent:${t.accent}">
        ${logoEl}
        <div class="eco-tool-name">${t.name}</div>
        <div class="eco-tool-level ${t.level}">${t.level}</div>
        <div class="eco-tool-tip">${t.tip}</div>
      </div>`;
  }

  fallbackEmoji(name) {
    const map = {
      kyverno:'🛡️', falco:'👁️', semgrep:'🔍', trivy:'🔬',
      cosign:'🔏', syft:'📋', grype:'🦠', gitleaks:'🔐',
      sigstore:'🌐', default:'⚙️',
    };
    return map[name] || map.default;
  }
}

/* ═══════════════════════════════════════════════════════════
   RADAR CANVAS RENDERER
═══════════════════════════════════════════════════════════ */
class TechRadarRenderer {
  constructor() {
    this.canvas = document.getElementById('techRadarCanvas');
    if (!this.canvas) return;
    this.draw();
    window.addEventListener('resize', () => this.draw());
  }

  draw() {
    const size = this.canvas.offsetWidth || 380;
    this.canvas.setAttribute('viewBox', `0 0 ${size} ${size}`);
    const cx = size / 2, cy = size / 2;
    const rings = [
      { r: size * .12, color: '#10b981', label: 'ADOPT',  opacity: .15 },
      { r: size * .25, color: '#3b82f6', label: 'TRIAL',  opacity: .12 },
      { r: size * .38, color: '#f59e0b', label: 'ASSESS', opacity: .10 },
      { r: size * .48, color: '#6b7280', label: 'HOLD',   opacity: .08 },
    ];
    const colors = { adopt:'#10b981', trial:'#3b82f6', assess:'#f59e0b', hold:'#6b7280' };

    let svg = `<circle cx="${cx}" cy="${cy}" r="${size*.49}" fill="rgba(15,23,42,.6)" stroke="rgba(255,255,255,.05)"/>`;

    // Rings
    [...rings].reverse().forEach(ring => {
      svg += `<circle cx="${cx}" cy="${cy}" r="${ring.r}" fill="${ring.color}" fill-opacity="${ring.opacity}" stroke="${ring.color}" stroke-opacity=".3" stroke-width="1"/>`;
    });

    // Axes
    svg += `<line x1="${cx}" y1="${size*.02}" x2="${cx}" y2="${size*.98}" stroke="rgba(255,255,255,.05)" stroke-width="1"/>`;
    svg += `<line x1="${size*.02}" y1="${cy}" x2="${size*.98}" y2="${cy}" stroke="rgba(255,255,255,.05)" stroke-width="1"/>`;

    // Ring labels
    rings.forEach(ring => {
      svg += `<text x="${cx + ring.r - 4}" y="${cy - 4}" fill="${ring.color}" font-size="9" font-weight="700" text-anchor="end" opacity=".7">${ring.label}</text>`;
    });

    // Items — simple spread with some seeding
    const ringRadii = { adopt: size*.08, trial: size*.19, assess: size*.32, hold: size*.43 };
    const placed = RADAR_ITEMS.map((item, i) => {
      const base = ringRadii[item.ring] || size*.08;
      const angle = (i / RADAR_ITEMS.length) * Math.PI * 2 - Math.PI / 2;
      const rOff  = base * (.6 + (i % 3) * .2);
      const ix  = cx + rOff * Math.cos(angle);
      const iy  = cy + rOff * Math.sin(angle);
      const col = colors[item.ring];
      svg += `<circle cx="${ix}" cy="${iy}" r="5" fill="${col}" opacity=".9"/>`;
      svg += `<text x="${ix + 7}" y="${iy + 4}" fill="#94a3b8" font-size="8.5" font-family="sans-serif">${item.name}</text>`;
      return { ...item, ix, iy };
    });

    this.canvas.innerHTML = svg;
    this._placed = placed;
  }
}

/* ═══════════════════════════════════════════════════════════
   INTERSECTION OBSERVER — auto-trigger pipeline on scroll
═══════════════════════════════════════════════════════════ */
function initScrollTriggers() {
  const targets = document.querySelectorAll('[data-animate-in]');
  if (!targets.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('anim-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .15 });
  targets.forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════════════════════ */
function animateCounters() {
  const els = document.querySelectorAll('[data-count-to]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el    = e.target;
      const end   = parseInt(el.dataset.countTo, 10);
      const dur   = parseInt(el.dataset.countDur || '1500', 10);
      const start = Date.now();
      const tick  = () => {
        const t   = Math.min((Date.now() - start) / dur, 1);
        const val = Math.round(end * (1 - Math.pow(1 - t, 3)));
        el.textContent = val + (el.dataset.countSuffix || '');
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: .5 });
  els.forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   ARCHITECTURE NODE TOOLTIPS
═══════════════════════════════════════════════════════════ */
function initArchTooltips() {
  const nodes = document.querySelectorAll('.arch-node[data-tip]');
  nodes.forEach(node => {
    const tip = document.createElement('div');
    tip.className = 'eco-tool-tip';
    tip.textContent = node.dataset.tip;
    node.style.position = 'relative';
    node.appendChild(tip);
  });
}

/* ═══════════════════════════════════════════════════════════
   VM FLOW SLA BAR — animated progress fill
═══════════════════════════════════════════════════════════ */
function initSLABars() {
  const bars = document.querySelectorAll('[data-sla-fill]');
  if (!bars.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const pct = el.dataset.slaFill || '0';
      el.style.transition = 'width 1.4s cubic-bezier(.25,.8,.25,1)';
      el.style.width = pct + '%';
      obs.unobserve(el);
    });
  }, { threshold: .3 });
  bars.forEach(el => { el.style.width = '0%'; obs.observe(el); });
}

/* ═══════════════════════════════════════════════════════════
   PIPELINE AUTO-DEMO ON SCROLL (one-time)
═══════════════════════════════════════════════════════════ */
function initPipelineAutoStart(pipelineDemo) {
  const section = document.getElementById('pipeline-demo');
  if (!section || !pipelineDemo) return;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // slight delay so user sees the section first
      setTimeout(() => {
        if (!pipelineDemo.running && pipelineDemo.currentIdx === -1) {
          pipelineDemo.run();
        }
      }, 1200);
      obs.disconnect();
    }
  }, { threshold: .3 });
  obs.observe(section);
}

/* ═══════════════════════════════════════════════════════════
   BOOTSTRAP
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const pipelineDemo = new PipelineDemo();
  new EcosystemRenderer();
  new TechRadarRenderer();
  initScrollTriggers();
  animateCounters();
  initArchTooltips();
  initSLABars();
  initPipelineAutoStart(pipelineDemo);
});


/* ═══════════════════════════════════════════════════════════
   SKILLS DEEP-DIVE BARS
═══════════════════════════════════════════════════════════ */
const SKILLS_DATA = [
  {
    cat: 'Kubernetes Security',
    icon: '☸️',
    skills: [
      { name: 'Kyverno Policy Authoring',      pct: 95 },
      { name: 'Cluster Hardening (CIS/NSA)',    pct: 90 },
      { name: 'RBAC Design',                    pct: 88 },
      { name: 'Falco Runtime Rules',            pct: 82 },
      { name: 'Cilium Network Policy',          pct: 80 },
      { name: 'OPA / Rego',                     pct: 72 },
    ],
  },
  {
    cat: 'Supply Chain Security',
    icon: '🔏',
    skills: [
      { name: 'Cosign Keyless Signing',         pct: 92 },
      { name: 'Syft / SBOM Generation',         pct: 90 },
      { name: 'Trivy Container Scanning',       pct: 95 },
      { name: 'Grype SBOM Vulnerability',       pct: 85 },
      { name: 'SLSA Framework',                 pct: 78 },
      { name: 'Binary Authorization',           pct: 75 },
    ],
  },
  {
    cat: 'CI/CD Security',
    icon: '🔄',
    skills: [
      { name: 'GitHub Actions Hardening',       pct: 93 },
      { name: 'Semgrep SAST',                   pct: 85 },
      { name: 'Snyk SCA',                       pct: 90 },
      { name: 'Gitleaks Secret Detection',      pct: 87 },
      { name: 'Pipeline Gate Enforcement',      pct: 88 },
      { name: 'Argo CD GitOps',                 pct: 85 },
    ],
  },
  {
    cat: 'Cloud Security (GCP)',
    icon: '☁️',
    skills: [
      { name: 'IAM Least Privilege',            pct: 88 },
      { name: 'VPC Service Controls',           pct: 80 },
      { name: 'Cloud Armor WAF',                pct: 75 },
      { name: 'Workload Identity',              pct: 87 },
      { name: 'GKE Security Posture',           pct: 85 },
      { name: 'Chronicle SIEM',                 pct: 78 },
    ],
  },
];

class SkillBarsRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="skills-deepdive">
        ${SKILLS_DATA.map(cat => `
          <div class="sdiv-category">
            <div class="sdiv-cat-header">
              <span class="sdiv-cat-icon">${cat.icon}</span>
              <span class="sdiv-cat-name">${cat.cat}</span>
            </div>
            ${cat.skills.map(s => `
              <div class="sdiv-skill">
                <div class="sdiv-skill-meta">
                  <span class="sdiv-skill-name">${s.name}</span>
                  <span class="sdiv-skill-pct">${s.pct}%</span>
                </div>
                <div class="sdiv-bar">
                  <div class="sdiv-bar-fill" data-pct="${s.pct}" style="width:0%"></div>
                </div>
              </div>`).join('')}
          </div>`).join('')}
      </div>`;
    this.initAnimations();
  }

  initAnimations() {
    const fills = this.container.querySelectorAll('.sdiv-bar-fill');
    fills.forEach(el => { el.style.width = '0%'; });
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      fills.forEach(el => {
        const pct = el.dataset.pct || '0';
        el.style.transition = 'width .8s cubic-bezier(.22,1,.36,1)';
        el.style.width = pct + '%';
      });
      obs.disconnect();
    }, { threshold: 0.2 });
    if (this.container) obs.observe(this.container);
  }
}

/* ═══════════════════════════════════════════════════════════
   MINI SECURITY TIMELINE
═══════════════════════════════════════════════════════════ */
const TIMELINE_DATA = [
  {
    date: 'Jan 2023',
    icon: '🔭',
    color: '#7c3aed',
    title: 'Phase 1 — Discovery & Gap Analysis',
    desc: 'Inherited a Kubernetes fleet with no admission control, no image signing, no runtime monitoring. Documented the full security posture.',
    impact: 'Gap analysis: 0 security controls across 350+ microservices',
  },
  {
    date: 'Feb – Apr 2023',
    icon: '🛡️',
    color: '#2563eb',
    title: 'Phase 2 — Admission Control (Kyverno)',
    desc: 'Deployed Kyverno across all clusters. Wrote 40+ policies covering image pull rules, non-root enforcement, resource limits, and network policies.',
    impact: '100% policy coverage — 0 non-compliant workloads in prod',
  },
  {
    date: 'May – Jun 2023',
    icon: '🔑',
    color: '#0891b2',
    title: 'Phase 2b — Secrets Rotation (HashiCorp Vault)',
    desc: 'Migrated 120+ static credentials to HashiCorp Vault dynamic secrets with automated rotation. Integrated Vault Agent injector into all Pod specs.',
    impact: '0 static credentials remaining in production cluster',
  },
  {
    date: 'Jul – Sep 2023',
    icon: '🔏',
    color: '#10b981',
    title: 'Phase 3 — Supply Chain Security (Cosign + SBOM)',
    desc: 'Implemented Cosign keyless signing for all images. Syft + Grype for SBOM generation. Kyverno policy blocks unsigned images cluster-wide.',
    impact: '100% of container images signed and SBOM-verified before deploy',
  },
  {
    date: 'Oct – Dec 2023',
    icon: '👁️',
    color: '#f59e0b',
    title: 'Phase 4 — Runtime Security (Falco)',
    desc: 'Deployed Falco with 80+ custom rules. Integrated with PagerDuty for P1 alerts and Chronicle SIEM for correlation. 0 false-positive rate after tuning.',
    impact: 'Runtime threat detection + automated container isolation on P1',
  },
  {
    date: '2024',
    icon: '📊',
    color: '#a78bfa',
    title: 'Phase 5 — Continuous Improvement (1200+ Vulns Closed)',
    desc: 'Systematic vulnerability management. Trivy full-fleet nightly scans. 1200+ CVEs triaged and closed with documented evidence. 94% Critical SLA hit rate.',
    impact: '18 months, 0 security incidents in production',
  },
];

class MiniTimelineRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="mini-timeline">
        ${TIMELINE_DATA.map(item => `
          <div class="mt-item" data-animate-in>
            <div class="mt-dot" style="background:linear-gradient(135deg,${item.color},${item.color}99)">
              ${item.icon}
            </div>
            <div class="mt-content">
              <div class="mt-date">${item.date}</div>
              <div class="mt-title">${item.title}</div>
              <div class="mt-desc">${item.desc}</div>
              <div class="mt-impact">${item.impact}</div>
            </div>
          </div>`).join('')}
      </div>`;
  }
}

/* ═══════════════════════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════════════════════ */
function initCounters() {
  const nodes = document.querySelectorAll('[data-count-to]');
  if (!nodes.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = parseInt(el.dataset.countTo, 10);
      const dur = parseInt(el.dataset.countDur || '1800', 10);
      const suffix = el.dataset.countSuffix || '';
      const start = Date.now();
      const tick = () => {
        const t = Math.min((Date.now() - start) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3))) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  nodes.forEach(n => obs.observe(n));
}

/* ═══════════════════════════════════════════════════════════
   SCROLL ANIMATION OBSERVER
═══════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  const nodes = document.querySelectorAll('[data-animate-in]');
  if (!nodes.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  nodes.forEach(n => obs.observe(n));
}

/* ═══════════════════════════════════════════════════════════
   ARCH DIAGRAM ANIMATION
═══════════════════════════════════════════════════════════ */
function initArchAnimation() {
  const nodes = document.querySelectorAll('.arch-node');
  if (!nodes.length) return;
  nodes.forEach((node, i) => {
    node.style.opacity = '0';
    node.style.transform = 'translateX(-20px)';
    node.style.transition = `opacity .4s ease ${i * 0.08}s, transform .4s ease ${i * 0.08}s`;
  });
  const obs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    nodes.forEach(node => {
      node.style.opacity = '1';
      node.style.transform = 'translateX(0)';
    });
    obs.disconnect();
  }, { threshold: 0.2 });
  const wrap = document.querySelector('.arch-diagram-wrap');
  if (wrap) obs.observe(wrap);
}

/* ═══════════════════════════════════════════════════════════
   INIT ALL V22 ENHANCEMENTS
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Render dynamic sections
  const skillBars = new SkillBarsRenderer('skillsDeepDive');
  skillBars.render();

  const timeline = new MiniTimelineRenderer('securityTimeline');
  timeline.render();

  // Kick off utilities
  initCounters();
  initScrollAnimations();
  initArchAnimation();
});
