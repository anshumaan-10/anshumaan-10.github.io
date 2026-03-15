/* ============================================================
   Anshumaan Singh Portfolio — Security-Focused Utilities
   DevSecOps and Security-themed components
   Author: Anshumaan Singh | www.devsecopswithanshu.com
   ============================================================ */

"use strict";

/* ═══════════════════════════════════════════════════════════
   SECTION 1: SECURITY DASHBOARD COMPONENTS
   ═══════════════════════════════════════════════════════════ */

class SecurityMetricsDashboard {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      refreshInterval: options.refreshInterval || 5000,
      showAlerts: options.showAlerts !== false,
      showMetrics: options.showMetrics !== false,
      theme: options.theme || 'dark',
      ...options
    };

    this.metrics = {
      vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
      compliance: 0,
      incidents: 0,
      uptime: 99.9,
      scanStatus: 'active'
    };

    this.init();
  }

  init() {
    this.render();
    if (this.options.refreshInterval > 0) {
      this.startAutoRefresh();
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="security-dashboard">
        <div class="security-metrics-grid">
          ${this.renderMetricCard('Vulnerabilities', this.getVulnCount(), 'shield', this.getVulnSeverity())}
          ${this.renderMetricCard('Compliance', `${this.metrics.compliance}%`, 'check-circle', this.getComplianceStatus())}
          ${this.renderMetricCard('Incidents', this.metrics.incidents, 'alert', this.metrics.incidents === 0 ? 'success' : 'critical')}
          ${this.renderMetricCard('Uptime', `${this.metrics.uptime}%`, 'activity', 'success')}
        </div>
        ${this.options.showAlerts ? this.renderAlerts() : ''}
        ${this.options.showMetrics ? this.renderDetailedMetrics() : ''}
      </div>
    `;

    this.applyStyles();
  }

  renderMetricCard(title, value, icon, status) {
    const statusColors = {
      success: '#10b981',
      warning: '#f59e0b',
      critical: '#ef4444',
      info: '#4a9eff'
    };

    return `
      <div class="metric-card" data-status="${status}">
        <div class="metric-icon ${icon}"></div>
        <div class="metric-content">
          <div class="metric-title">${title}</div>
          <div class="metric-value" style="color: ${statusColors[status]}">${value}</div>
        </div>
        <div class="metric-status-indicator" style="background: ${statusColors[status]}"></div>
      </div>
    `;
  }

  renderAlerts() {
    return `
      <div class="security-alerts">
        <h3>Recent Security Alerts</h3>
        <div class="alerts-list">
          <div class="alert-item alert-success">
            <span class="alert-icon">✓</span>
            <span class="alert-message">All security gates active</span>
            <span class="alert-time">2m ago</span>
          </div>
          <div class="alert-item alert-info">
            <span class="alert-icon">ℹ</span>
            <span class="alert-message">SBOM pipeline completed successfully</span>
            <span class="alert-time">15m ago</span>
          </div>
        </div>
      </div>
    `;
  }

  renderDetailedMetrics() {
    return `
      <div class="detailed-metrics">
        <h3>Vulnerability Breakdown</h3>
        <div class="vuln-breakdown">
          ${this.renderVulnBar('Critical', this.metrics.vulnerabilities.critical, '#ef4444')}
          ${this.renderVulnBar('High', this.metrics.vulnerabilities.high, '#f59e0b')}
          ${this.renderVulnBar('Medium', this.metrics.vulnerabilities.medium, '#eab308')}
          ${this.renderVulnBar('Low', this.metrics.vulnerabilities.low, '#10b981')}
        </div>
      </div>
    `;
  }

  renderVulnBar(severity, count, color) {
    const maxCount = Math.max(...Object.values(this.metrics.vulnerabilities), 1);
    const percentage = (count / maxCount) * 100;

    return `
      <div class="vuln-bar-container">
        <div class="vuln-bar-label">${severity}</div>
        <div class="vuln-bar-track">
          <div class="vuln-bar-fill" style="width: ${percentage}%; background: ${color}"></div>
        </div>
        <div class="vuln-bar-count">${count}</div>
      </div>
    `;
  }

  getVulnCount() {
    const total = Object.values(this.metrics.vulnerabilities).reduce((a, b) => a + b, 0);
    return total;
  }

  getVulnSeverity() {
    if (this.metrics.vulnerabilities.critical > 0) return 'critical';
    if (this.metrics.vulnerabilities.high > 0) return 'warning';
    return 'success';
  }

  getComplianceStatus() {
    if (this.metrics.compliance >= 90) return 'success';
    if (this.metrics.compliance >= 70) return 'warning';
    return 'critical';
  }

  updateMetrics(newMetrics) {
    this.metrics = { ...this.metrics, ...newMetrics };
    this.render();
  }

  applyStyles() {
    if (!document.querySelector('#security-dashboard-styles')) {
      const style = document.createElement('style');
      style.id = 'security-dashboard-styles';
      style.textContent = `
        .security-dashboard {
          padding: 20px;
          background: rgba(15, 20, 51, 0.5);
          border-radius: 12px;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        .security-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .metric-card {
          position: relative;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }
        .metric-status-indicator {
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
        }
        .metric-content {
          margin-left: 12px;
        }
        .metric-title {
          font-size: 14px;
          color: #8ba8cc;
          margin-bottom: 8px;
        }
        .metric-value {
          font-size: 32px;
          font-weight: 700;
        }
        .security-alerts {
          margin-top: 24px;
        }
        .alerts-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .alert-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.03);
        }
        .detailed-metrics {
          margin-top: 24px;
        }
        .vuln-breakdown {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .vuln-bar-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .vuln-bar-label {
          width: 80px;
          font-size: 14px;
        }
        .vuln-bar-track {
          flex: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        .vuln-bar-fill {
          height: 100%;
          transition: width 0.3s ease;
        }
        .vuln-bar-count {
          width: 40px;
          text-align: right;
          font-weight: 600;
        }
      `;
      document.head.appendChild(style);
    }
  }

  startAutoRefresh() {
    this.refreshInterval = setInterval(() => {
      // Simulate metric updates
      this.updateMetrics({
        vulnerabilities: {
          critical: Math.floor(Math.random() * 3),
          high: Math.floor(Math.random() * 5),
          medium: Math.floor(Math.random() * 10),
          low: Math.floor(Math.random() * 20)
        },
        compliance: 85 + Math.floor(Math.random() * 15),
        incidents: Math.floor(Math.random() * 2),
        uptime: 99.5 + Math.random() * 0.5
      });
    }, this.options.refreshInterval);
  }

  stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2: CVE TRACKER
   ═══════════════════════════════════════════════════════════ */

class CVETracker {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      autoUpdate: options.autoUpdate !== false,
      updateInterval: options.updateInterval || 30000,
      maxCVEs: options.maxCVEs || 10,
      severityFilter: options.severityFilter || 'all',
      ...options
    };

    this.cves = [];
    this.init();
  }

  init() {
    this.loadCVEs();
    this.render();

    if (this.options.autoUpdate) {
      this.startAutoUpdate();
    }
  }

  loadCVEs() {
    // Sample CVE data
    this.cves = [
      {
        id: 'CVE-2025-30065',
        description: 'Apache Parquet RCE vulnerability',
        severity: 'CRITICAL',
        cvss: 10.0,
        epss: 2.1,
        status: 'NOT_EXPOSED',
        published: '2025-02-15',
        affected: 'Apache Parquet < 1.14.0'
      },
      {
        id: 'CVE-2025-23006',
        description: 'SonicWall SMA1000 Authentication Bypass',
        severity: 'CRITICAL',
        cvss: 9.8,
        epss: 8.4,
        status: 'MONITORING',
        published: '2025-02-10',
        affected: 'SonicWall SMA1000 series'
      },
      {
        id: 'CVE-2024-21626',
        description: 'runc process.cwd container breakout',
        severity: 'CRITICAL',
        cvss: 9.1,
        epss: 4.1,
        status: 'MITIGATED',
        published: '2024-01-31',
        affected: 'runc <= 1.1.11'
      },
      {
        id: 'CVE-2024-6387',
        description: 'OpenSSH regreSSHion RCE',
        severity: 'HIGH',
        cvss: 8.1,
        epss: 3.1,
        status: 'MONITORING',
        published: '2024-07-01',
        affected: 'OpenSSH < 9.8p1'
      },
      {
        id: 'CVE-2023-44487',
        description: 'HTTP/2 Rapid Reset DoS',
        severity: 'HIGH',
        cvss: 7.5,
        epss: 97.2,
        status: 'PATCHED',
        published: '2023-10-10',
        affected: 'Multiple HTTP/2 implementations'
      }
    ];
  }

  render() {
    const filteredCVEs = this.filterCVEs();

    this.container.innerHTML = `
      <div class="cve-tracker">
        <div class="cve-header">
          <h3>CVE Intelligence Feed</h3>
          <div class="cve-filters">
            <button class="cve-filter-btn ${this.options.severityFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>
            <button class="cve-filter-btn ${this.options.severityFilter === 'CRITICAL' ? 'active' : ''}" data-filter="CRITICAL">Critical</button>
            <button class="cve-filter-btn ${this.options.severityFilter === 'HIGH' ? 'active' : ''}" data-filter="HIGH">High</button>
          </div>
        </div>
        <div class="cve-list">
          ${filteredCVEs.map(cve => this.renderCVECard(cve)).join('')}
        </div>
      </div>
    `;

    this.attachEventListeners();
    this.applyStyles();
  }

  filterCVEs() {
    let filtered = this.cves;

    if (this.options.severityFilter !== 'all') {
      filtered = filtered.filter(cve => cve.severity === this.options.severityFilter);
    }

    return filtered.slice(0, this.options.maxCVEs);
  }

  renderCVECard(cve) {
    const statusColors = {
      'MITIGATED': '#10b981',
      'PATCHED': '#10b981',
      'NOT_EXPOSED': '#10b981',
      'MONITORING': '#f59e0b',
      'VULNERABLE': '#ef4444'
    };

    const severityColors = {
      'CRITICAL': '#ef4444',
      'HIGH': '#f59e0b',
      'MEDIUM': '#eab308',
      'LOW': '#10b981'
    };

    return `
      <div class="cve-card" data-severity="${cve.severity}">
        <div class="cve-card-header">
          <div class="cve-id">${cve.id}</div>
          <div class="cve-severity" style="background: ${severityColors[cve.severity]}">${cve.severity}</div>
        </div>
        <div class="cve-description">${cve.description}</div>
        <div class="cve-metrics">
          <div class="cve-metric">
            <span class="metric-label">CVSS</span>
            <span class="metric-value">${cve.cvss}</span>
          </div>
          <div class="cve-metric">
            <span class="metric-label">EPSS</span>
            <span class="metric-value">${cve.epss}%</span>
          </div>
          <div class="cve-metric">
            <span class="metric-label">Status</span>
            <span class="metric-value" style="color: ${statusColors[cve.status]}">${cve.status}</span>
          </div>
        </div>
        <div class="cve-affected">${cve.affected}</div>
      </div>
    `;
  }

  attachEventListeners() {
    this.container.querySelectorAll('.cve-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.options.severityFilter = e.target.dataset.filter;
        this.render();
      });
    });
  }

  applyStyles() {
    if (!document.querySelector('#cve-tracker-styles')) {
      const style = document.createElement('style');
      style.id = 'cve-tracker-styles';
      style.textContent = `
        .cve-tracker {
          padding: 20px;
          background: rgba(15, 20, 51, 0.5);
          border-radius: 12px;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        .cve-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .cve-filters {
          display: flex;
          gap: 8px;
        }
        .cve-filter-btn {
          padding: 6px 12px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          background: transparent;
          color: #e2eeff;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cve-filter-btn.active,
        .cve-filter-btn:hover {
          background: rgba(139, 92, 246, 0.2);
        }
        .cve-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cve-card {
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
        }
        .cve-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
        }
        .cve-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .cve-id {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          color: #e2eeff;
        }
        .cve-severity {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
        }
        .cve-description {
          color: #8ba8cc;
          margin-bottom: 12px;
        }
        .cve-metrics {
          display: flex;
          gap: 16px;
          margin-bottom: 8px;
        }
        .cve-metric {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .metric-label {
          font-size: 11px;
          color: #4a6080;
          text-transform: uppercase;
        }
        .metric-value {
          font-weight: 600;
        }
        .cve-affected {
          font-size: 12px;
          color: #4a6080;
          font-family: 'JetBrains Mono', monospace;
        }
      `;
      document.head.appendChild(style);
    }
  }

  startAutoUpdate() {
    this.updateInterval = setInterval(() => {
      this.loadCVEs();
      this.render();
    }, this.options.updateInterval);
  }

  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3: THREAT INTELLIGENCE FEED
   ═══════════════════════════════════════════════════════════ */

class ThreatIntelligenceFeed {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      feedType: options.feedType || 'all',
      maxItems: options.maxItems || 20,
      autoScroll: options.autoScroll !== false,
      scrollSpeed: options.scrollSpeed || 50,
      ...options
    };

    this.threats = [];
    this.init();
  }

  init() {
    this.loadThreats();
    this.render();

    if (this.options.autoScroll) {
      this.startAutoScroll();
    }
  }

  loadThreats() {
    this.threats = [
      { type: 'malware', name: 'APT42 Campaign', severity: 'critical', timestamp: Date.now() - 300000 },
      { type: 'phishing', name: 'LinkedIn Credential Harvest', severity: 'high', timestamp: Date.now() - 600000 },
      { type: 'ransomware', name: 'LockBit 4.0 Variant', severity: 'critical', timestamp: Date.now() - 900000 },
      { type: 'ddos', name: 'Mirai Botnet Activity', severity: 'medium', timestamp: Date.now() - 1200000 },
      { type: 'exploit', name: 'Zero-Day in Popular CMS', severity: 'critical', timestamp: Date.now() - 1500000 },
      { type: 'malware', name: 'Emotet Resurgence', severity: 'high', timestamp: Date.now() - 1800000 },
      { type: 'phishing', name: 'Tax Season Scam Wave', severity: 'medium', timestamp: Date.now() - 2100000 },
      { type: 'data_breach', name: 'Healthcare Data Exposure', severity: 'critical', timestamp: Date.now() - 2400000 }
    ];
  }

  render() {
    this.container.innerHTML = `
      <div class="threat-feed">
        <div class="threat-feed-header">
          <span class="threat-feed-label">THREAT INTEL</span>
          <span class="threat-feed-status">LIVE</span>
        </div>
        <div class="threat-feed-track" id="threat-feed-track">
          ${this.renderThreats()}
          ${this.renderThreats()} <!-- Duplicate for seamless scroll -->
        </div>
      </div>
    `;

    this.applyStyles();
  }

  renderThreats() {
    return this.threats.map(threat => this.renderThreatItem(threat)).join('');
  }

  renderThreatItem(threat) {
    const typeIcons = {
      malware: '🦠',
      phishing: '🎣',
      ransomware: '🔒',
      ddos: '🌊',
      exploit: '💥',
      data_breach: '🔓'
    };

    const severityColors = {
      critical: '#ef4444',
      high: '#f59e0b',
      medium: '#eab308',
      low: '#10b981'
    };

    const timeAgo = this.formatTimeAgo(threat.timestamp);

    return `
      <span class="threat-item">
        <span class="threat-icon">${typeIcons[threat.type] || '⚠️'}</span>
        <span class="threat-name">${threat.name}</span>
        <span class="threat-severity" style="color: ${severityColors[threat.severity]}">${threat.severity.toUpperCase()}</span>
        <span class="threat-time">${timeAgo}</span>
      </span>
      <span class="threat-sep">|</span>
    `;
  }

  formatTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  }

  applyStyles() {
    if (!document.querySelector('#threat-feed-styles')) {
      const style = document.createElement('style');
      style.id = 'threat-feed-styles';
      style.textContent = `
        .threat-feed {
          background: rgba(15, 20, 51, 0.9);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 8px;
          padding: 12px;
          overflow: hidden;
        }
        .threat-feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .threat-feed-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          color: #8b5cf6;
        }
        .threat-feed-status {
          font-size: 11px;
          color: #10b981;
          animation: pulse 2s ease-in-out infinite;
        }
        .threat-feed-track {
          display: flex;
          gap: 16px;
          animation: scroll-threats ${this.options.scrollSpeed}s linear infinite;
          white-space: nowrap;
        }
        .threat-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          font-size: 13px;
        }
        .threat-name {
          color: #e2eeff;
        }
        .threat-severity {
          font-weight: 700;
          text-transform: uppercase;
          font-size: 11px;
        }
        .threat-time {
          color: #4a6080;
          font-size: 11px;
        }
        .threat-sep {
          color: #4a6080;
        }
        @keyframes scroll-threats {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  startAutoScroll() {
    // Animation is handled by CSS
  }

  stopAutoScroll() {
    const track = this.container.querySelector('.threat-feed-track');
    if (track) {
      track.style.animationPlayState = 'paused';
    }
  }

  resumeAutoScroll() {
    const track = this.container.querySelector('.threat-feed-track');
    if (track) {
      track.style.animationPlayState = 'running';
    }
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4: COMPLIANCE CHECKER
   ═══════════════════════════════════════════════════════════ */

class ComplianceChecker {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      frameworks: options.frameworks || ['CIS', 'OWASP', 'PCI-DSS', 'SOC2', 'ISO27001'],
      showDetails: options.showDetails !== false,
      ...options
    };

    this.scores = {};
    this.init();
  }

  init() {
    this.loadComplianceScores();
    this.render();
  }

  loadComplianceScores() {
    this.scores = {
      'CIS': { score: 95, total: 100, passed: 95, failed: 5 },
      'OWASP': { score: 88, total: 100, passed: 88, failed: 12 },
      'PCI-DSS': { score: 92, total: 100, passed: 92, failed: 8 },
      'SOC2': { score: 97, total: 100, passed: 97, failed: 3 },
      'ISO27001': { score: 91, total: 100, passed: 91, failed: 9 }
    };
  }

  render() {
    this.container.innerHTML = `
      <div class="compliance-checker">
        <h3>Compliance Status</h3>
        <div class="compliance-grid">
          ${this.options.frameworks.map(fw => this.renderComplianceCard(fw)).join('')}
        </div>
        ${this.options.showDetails ? this.renderComplianceDetails() : ''}
      </div>
    `;

    this.applyStyles();
  }

  renderComplianceCard(framework) {
    const data = this.scores[framework] || { score: 0, total: 100, passed: 0, failed: 0 };
    const percentage = (data.score / data.total) * 100;
    const status = this.getComplianceStatus(percentage);

    return `
      <div class="compliance-card" data-status="${status}">
        <div class="compliance-framework">${framework}</div>
        <div class="compliance-score-ring">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" class="ring-bg"></circle>
            <circle cx="50" cy="50" r="45" class="ring-fill"
                    style="stroke-dasharray: ${percentage * 2.827}, 282.7"></circle>
          </svg>
          <div class="compliance-score-text">${percentage.toFixed(0)}%</div>
        </div>
        <div class="compliance-stats">
          <span class="stat-passed">${data.passed} passed</span>
          <span class="stat-failed">${data.failed} failed</span>
        </div>
      </div>
    `;
  }

  renderComplianceDetails() {
    return `
      <div class="compliance-details">
        <h4>Latest Compliance Checks</h4>
        <div class="compliance-checks-list">
          ${this.renderCheckItem('Authentication controls', 'passed', 'SOC2')}
          ${this.renderCheckItem('Data encryption at rest', 'passed', 'PCI-DSS')}
          ${this.renderCheckItem('Network segmentation', 'failed', 'CIS')}
          ${this.renderCheckItem('Access logging enabled', 'passed', 'ISO27001')}
          ${this.renderCheckItem('Secure password policy', 'passed', 'OWASP')}
        </div>
      </div>
    `;
  }

  renderCheckItem(name, status, framework) {
    const statusIcons = {
      passed: '✓',
      failed: '✕',
      warning: '⚠'
    };

    const statusColors = {
      passed: '#10b981',
      failed: '#ef4444',
      warning: '#f59e0b'
    };

    return `
      <div class="check-item">
        <span class="check-icon" style="color: ${statusColors[status]}">${statusIcons[status]}</span>
        <span class="check-name">${name}</span>
        <span class="check-framework">${framework}</span>
      </div>
    `;
  }

  getComplianceStatus(percentage) {
    if (percentage >= 90) return 'success';
    if (percentage >= 70) return 'warning';
    return 'critical';
  }

  applyStyles() {
    if (!document.querySelector('#compliance-checker-styles')) {
      const style = document.createElement('style');
      style.id = 'compliance-checker-styles';
      style.textContent = `
        .compliance-checker {
          padding: 20px;
          background: rgba(15, 20, 51, 0.5);
          border-radius: 12px;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        .compliance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin: 20px 0;
        }
        .compliance-card {
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          text-align: center;
        }
        .compliance-framework {
          font-weight: 700;
          margin-bottom: 16px;
          color: #e2eeff;
        }
        .compliance-score-ring {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 16px;
        }
        .compliance-score-ring svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .ring-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.1);
          stroke-width: 8;
        }
        .ring-fill {
          fill: none;
          stroke: #8b5cf6;
          stroke-width: 8;
          stroke-linecap: round;
          transition: stroke-dasharray 0.6s ease;
        }
        .compliance-score-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 28px;
          font-weight: 700;
          color: #e2eeff;
        }
        .compliance-stats {
          display: flex;
          justify-content: space-around;
          font-size: 12px;
        }
        .stat-passed {
          color: #10b981;
        }
        .stat-failed {
          color: #ef4444;
        }
        .compliance-details {
          margin-top: 24px;
        }
        .compliance-checks-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .check-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 6px;
        }
        .check-icon {
          font-weight: 700;
        }
        .check-name {
          flex: 1;
          color: #e2eeff;
        }
        .check-framework {
          font-size: 11px;
          color: #4a6080;
          font-family: 'JetBrains Mono', monospace;
        }
      `;
      document.head.appendChild(style);
    }
  }

  updateScore(framework, newScore) {
    if (this.scores[framework]) {
      this.scores[framework] = { ...this.scores[framework], ...newScore };
      this.render();
    }
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 5: SECURITY TIMELINE
   ═══════════════════════════════════════════════════════════ */

class SecurityTimeline {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      maxEvents: options.maxEvents || 10,
      showTime: options.showTime !== false,
      groupByDate: options.groupByDate || false,
      ...options
    };

    this.events = [];
    this.init();
  }

  init() {
    this.loadEvents();
    this.render();
  }

  loadEvents() {
    const now = Date.now();
    this.events = [
      {
        type: 'scan',
        title: 'Container Security Scan Completed',
        description: 'Scanned 127 images, 0 critical vulnerabilities found',
        timestamp: now - 180000,
        status: 'success'
      },
      {
        type: 'alert',
        title: 'Failed Login Attempt Detected',
        description: 'Multiple failed login attempts from IP 192.168.1.100',
        timestamp: now - 900000,
        status: 'warning'
      },
      {
        type: 'deployment',
        title: 'Security Patch Deployed',
        description: 'CVE-2024-12345 mitigation deployed to production',
        timestamp: now - 1800000,
        status: 'success'
      },
      {
        type: 'incident',
        title: 'Security Incident Resolved',
        description: 'Suspicious activity investigated and resolved',
        timestamp: now - 3600000,
        status: 'resolved'
      },
      {
        type: 'compliance',
        title: 'Compliance Audit Passed',
        description: 'SOC2 Type II audit completed successfully',
        timestamp: now - 7200000,
        status: 'success'
      }
    ];
  }

  render() {
    this.container.innerHTML = `
      <div class="security-timeline">
        <h3>Security Event Timeline</h3>
        <div class="timeline-container">
          ${this.events.map((event, index) => this.renderTimelineEvent(event, index)).join('')}
        </div>
      </div>
    `;

    this.applyStyles();
  }

  renderTimelineEvent(event, index) {
    const typeIcons = {
      scan: '🔍',
      alert: '⚠️',
      deployment: '🚀',
      incident: '🔥',
      compliance: '✓'
    };

    const statusColors = {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      resolved: '#8b5cf6'
    };

    const timeString = this.options.showTime ? this.formatTime(event.timestamp) : '';

    return `
      <div class="timeline-event" data-type="${event.type}">
        <div class="timeline-marker" style="background: ${statusColors[event.status]}">
          ${typeIcons[event.type] || '•'}
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <div class="timeline-title">${event.title}</div>
            ${timeString ? `<div class="timeline-time">${timeString}</div>` : ''}
          </div>
          <div class="timeline-description">${event.description}</div>
        </div>
      </div>
    `;
  }

  formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes}m ago`;
    } else if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  }

  applyStyles() {
    if (!document.querySelector('#security-timeline-styles')) {
      const style = document.createElement('style');
      style.id = 'security-timeline-styles';
      style.textContent = `
        .security-timeline {
          padding: 20px;
          background: rgba(15, 20, 51, 0.5);
          border-radius: 12px;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        .timeline-container {
          position: relative;
          padding-left: 40px;
        }
        .timeline-container::before {
          content: '';
          position: absolute;
          left: 16px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(139, 92, 246, 0.3);
        }
        .timeline-event {
          position: relative;
          margin-bottom: 24px;
        }
        .timeline-marker {
          position: absolute;
          left: -40px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          border: 3px solid #0a0e27;
        }
        .timeline-content {
          background: rgba(255, 255, 255, 0.05);
          padding: 16px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 8px;
        }
        .timeline-title {
          font-weight: 600;
          color: #e2eeff;
        }
        .timeline-time {
          font-size: 12px;
          color: #4a6080;
        }
        .timeline-description {
          color: #8ba8cc;
          font-size: 14px;
        }
      `;
      document.head.appendChild(style);
    }
  }

  addEvent(event) {
    this.events.unshift(event);
    if (this.events.length > this.options.maxEvents) {
      this.events.pop();
    }
    this.render();
  }
}

/* ═══════════════════════════════════════════════════════════
   EXPORT ALL SECURITY COMPONENTS
   ═══════════════════════════════════════════════════════════ */

if (typeof window !== 'undefined') {
  window.SecurityMetricsDashboard = SecurityMetricsDashboard;
  window.CVETracker = CVETracker;
  window.ThreatIntelligenceFeed = ThreatIntelligenceFeed;
  window.ComplianceChecker = ComplianceChecker;
  window.SecurityTimeline = SecurityTimeline;
}

console.log('✓ Security-focused utilities loaded successfully');
