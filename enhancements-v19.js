(function () {
  'use strict';

  var data = window.__V19_DATA;
  if (!data) return;

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function list(items, className, itemTag) {
    var tag = itemTag || 'li';
    return '<' + (className ? 'ul class="' + className + '"' : 'ul') + '>' +
      items.map(function (item) {
        return '<' + tag + '>' + esc(item) + '</' + tag + '>';
      }).join('') +
      '</ul>';
  }

  function pills(items, className) {
    return '<div class="' + className + '">' + items.map(function (item) {
      return '<span>' + esc(item) + '</span>';
    }).join('') + '</div>';
  }

  function activateTab(buttons, panels, id, activeClass) {
    var active = activeClass || 'active';
    buttons.forEach(function (btn) {
      var match = btn.getAttribute('data-view') === id || btn.getAttribute('data-filter') === id || btn.getAttribute('data-lane') === id;
      btn.classList.toggle(active, match);
      btn.setAttribute('aria-pressed', match ? 'true' : 'false');
    });
    panels.forEach(function (panel) {
      var match = panel.getAttribute('data-view-panel') === id || panel.getAttribute('data-filter-panel') === id || panel.getAttribute('data-lane-panel') === id;
      panel.hidden = !match;
      panel.classList.toggle(active, match);
    });
  }

  function buildRecruiterCommandCenter() {
    var host = qs('#recruiterCommandMount');
    if (!host) return;

    var viewButtons = data.recruiterViews.map(function (view, index) {
      return '<button class="rc-view-btn' + (index === 0 ? ' active' : '') + '" data-view="' + esc(view.id) + '" aria-pressed="' + (index === 0 ? 'true' : 'false') + '">' + esc(view.label) + '</button>';
    }).join('');

    var viewPanels = data.recruiterViews.map(function (view, index) {
      return [
        '<article class="rc-view-panel' + (index === 0 ? ' active' : '') + '" data-view-panel="' + esc(view.id) + '"' + (index === 0 ? '' : ' hidden') + '>',
        '  <div class="rc-view-copy">',
        '    <span class="rc-panel-eyebrow">' + esc(view.eyebrow) + '</span>',
        '    <h3 class="rc-panel-headline">' + esc(view.headline) + '</h3>',
        '    <p class="rc-panel-summary">' + esc(view.summary) + '</p>',
        '    ' + list(view.bullets, 'rc-bullet-list'),
        '  </div>',
        '  <div class="rc-view-highlights">',
        '    <div class="rc-highlight-card">',
        '      <p class="rc-highlight-label">' + esc(view.highlightLabel) + '</p>',
        '      ' + list(view.highlights, 'rc-highlight-list'),
        '    </div>',
        '    <div class="rc-highlight-card rc-highlight-card-accent">',
        '      <p class="rc-highlight-label">Bottom line</p>',
        '      <p class="rc-closing">' + esc(view.closing) + '</p>',
        '    </div>',
        '  </div>',
        '</article>'
      ].join('');
    }).join('');

    var scorecards = data.recruiterScorecards.map(function (card) {
      return [
        '<article class="rc-score-card">',
        '  <div class="rc-score-head">',
        '    <div>',
        '      <h4>' + esc(card.role) + '</h4>',
        '      <p>' + esc(card.focus) + '</p>',
        '    </div>',
        '    <div class="rc-score-circle">' + esc(card.score) + '<span>/100</span></div>',
        '  </div>',
        '  ' + list(card.strengths, 'rc-score-list'),
        '  ' + pills(card.signals, 'rc-score-pills'),
        '</article>'
      ].join('');
    }).join('');

    var signals = data.hireSignals.map(function (signal) {
      return [
        '<article class="rc-signal-card">',
        '  <h4>' + esc(signal.title) + '</h4>',
        '  <p>' + esc(signal.body) + '</p>',
        '</article>'
      ].join('');
    }).join('');

    var prompts = data.interviewPrompts.map(function (prompt, index) {
      return [
        '<article class="rc-prompt-card">',
        '  <span class="rc-prompt-num">0' + (index + 1) + '</span>',
        '  <p>' + esc(prompt) + '</p>',
        '</article>'
      ].join('');
    }).join('');

    host.innerHTML = [
      '<div class="rc-command-shell">',
      '  <div class="rc-command-header">',
      '    <div>',
      '      <span class="rc-shell-label">Adaptive briefing</span>',
      '      <h3 class="rc-shell-title">Recruiter Command Center</h3>',
      '      <p class="rc-shell-sub">Switch perspectives to see the same profile through executive, technical, hiring-manager, and platform-operator lenses.</p>',
      '    </div>',
      '    <div class="rc-view-switch" role="toolbar" aria-label="Profile perspective">' + viewButtons + '</div>',
      '  </div>',
      '  <div class="rc-view-panels">' + viewPanels + '</div>',
      '  <div class="rc-grid-two">',
      '    <section class="rc-panel-block">',
      '      <div class="rc-block-head">',
      '        <span class="rc-block-tag">Role fit</span>',
      '        <h3>High-confidence role alignment</h3>',
      '        <p>These cards summarize where the current evidence is strongest, what the day-to-day focus would look like, and what signals back that up.</p>',
      '      </div>',
      '      <div class="rc-score-grid">' + scorecards + '</div>',
      '    </section>',
      '    <section class="rc-panel-block">',
      '      <div class="rc-block-head">',
      '        <span class="rc-block-tag">Hiring signals</span>',
      '        <h3>Why teams usually remember the work</h3>',
      '        <p>The repeated pattern across peer feedback is less about tool names and more about delivery: issues get clarified quickly, fixes become easier, and engineers feel supported rather than blocked.</p>',
      '      </div>',
      '      <div class="rc-signal-grid">' + signals + '</div>',
      '    </section>',
      '  </div>',
      '  <section class="rc-panel-block rc-panel-block-wide">',
      '    <div class="rc-block-head">',
      '      <span class="rc-block-tag">Interview guide</span>',
      '      <h3>Six prompts that pull out the real engineering story</h3>',
      '      <p>If someone wants to test depth instead of reading generic praise, these are the conversations most likely to surface the strongest parts of the profile.</p>',
      '    </div>',
      '    <div class="rc-prompt-grid">' + prompts + '</div>',
      '  </section>',
      '</div>'
    ].join('');

    var buttons = qsa('.rc-view-btn', host);
    var panels = qsa('.rc-view-panel', host);
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        activateTab(buttons, panels, button.getAttribute('data-view'));
      });
    });
  }

  function buildProofEngine() {
    var filterHost = qs('#proofFilterMount');
    var metricsHost = qs('#proofMetricsMount');
    var artifactHost = qs('#proofArtifactMount');
    var matrixHost = qs('#proofMatrixMount');
    if (!filterHost || !metricsHost || !artifactHost || !matrixHost) return;

    filterHost.innerHTML = data.proofCategories.map(function (category, index) {
      return '<button class="pe-filter-btn' + (index === 0 ? ' active' : '') + '" data-filter="' + esc(category.id) + '" aria-pressed="' + (index === 0 ? 'true' : 'false') + '">' + esc(category.label) + '</button>';
    }).join('');

    metricsHost.innerHTML = data.proofMetrics.map(function (metric) {
      return [
        '<article class="pe-metric-card">',
        '  <p class="pe-metric-label">' + esc(metric.label) + '</p>',
        '  <div class="pe-metric-value">' + esc(metric.value) + '</div>',
        '  <p class="pe-metric-note">' + esc(metric.note) + '</p>',
        '</article>'
      ].join('');
    }).join('');

    function renderArtifacts(filterId) {
      var items = data.proofArtifacts.filter(function (item) {
        return filterId === 'all' || item.category === filterId;
      });
      artifactHost.innerHTML = items.map(function (item) {
        return [
          '<article class="pe-artifact-card" data-filter-panel="' + esc(filterId) + '">',
          '  <div class="pe-artifact-top">',
          '    <span class="pe-artifact-cat">' + esc(item.category.replace('-', ' ')) + '</span>',
          '    <h3>' + esc(item.title) + '</h3>',
          '  </div>',
          '  <div class="pe-artifact-body">',
          '    <div><span class="pe-inline-label">Problem</span><p>' + esc(item.problem) + '</p></div>',
          '    <div><span class="pe-inline-label">Implementation</span><p>' + esc(item.implementation) + '</p></div>',
          '    <div><span class="pe-inline-label">Proof</span><p>' + esc(item.proof) + '</p></div>',
          '    <div><span class="pe-inline-label">Outcome</span><p>' + esc(item.outcome) + '</p></div>',
          '  </div>',
          '  ' + pills(item.tags, 'pe-artifact-tags'),
          '</article>'
        ].join('');
      }).join('');
      initProofHoverStates();
    }

    matrixHost.innerHTML = [
      '<div class="pe-matrix-shell">',
      '  <table class="pe-matrix-table">',
      '    <thead>',
      '      <tr>',
      '        <th>Control</th>',
      '        <th>Business value</th>',
      '        <th>OWASP</th>',
      '        <th>CIS</th>',
      '        <th>SLSA</th>',
      '        <th>NIST</th>',
      '        <th>Evidence</th>',
      '      </tr>',
      '    </thead>',
      '    <tbody>',
      data.controlMatrix.map(function (row) {
        return [
          '      <tr>',
          '        <td>' + esc(row.control) + '</td>',
          '        <td>' + esc(row.businessValue) + '</td>',
          '        <td>' + esc(row.owasp) + '</td>',
          '        <td>' + esc(row.cis) + '</td>',
          '        <td>' + esc(row.slsa) + '</td>',
          '        <td>' + esc(row.nist) + '</td>',
          '        <td>' + esc(row.evidence) + '</td>',
          '      </tr>'
        ].join('');
      }).join(''),
      '    </tbody>',
      '  </table>',
      '</div>'
    ].join('');

    renderArtifacts('all');

    var buttons = qsa('.pe-filter-btn', filterHost);
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var id = button.getAttribute('data-filter');
        buttons.forEach(function (btn) {
          var active = btn === button;
          btn.classList.toggle('active', active);
          btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        renderArtifacts(id);
      });
    });
  }

  function buildDeliveryLab() {
    var host = qs('#deliveryLabMount');
    if (!host) return;

    var tabButtons = data.deliveryLanes.map(function (lane, index) {
      return '<button class="dl-tab-btn' + (index === 0 ? ' active' : '') + '" data-lane="' + esc(lane.id) + '" aria-pressed="' + (index === 0 ? 'true' : 'false') + '">' + esc(lane.label) + '</button>';
    }).join('');

    var panels = data.deliveryLanes.map(function (lane, index) {
      return [
        '<article class="dl-panel' + (index === 0 ? ' active' : '') + '" data-lane-panel="' + esc(lane.id) + '"' + (index === 0 ? '' : ' hidden') + '>',
        '  <div class="dl-panel-main">',
        '    <div class="dl-head-copy">',
        '      <span class="dl-eyebrow">Operational lane</span>',
        '      <h3>' + esc(lane.headline) + '</h3>',
        '      <p>' + esc(lane.overview) + '</p>',
        '    </div>',
        '    <div class="dl-metric-grid">',
        lane.metrics.map(function (metric) {
          return [
            '      <div class="dl-metric-card">',
            '        <p class="dl-metric-label">' + esc(metric.label) + '</p>',
            '        <div class="dl-metric-value">' + esc(metric.value) + '</div>',
            '        <p class="dl-metric-note">' + esc(metric.note) + '</p>',
            '      </div>'
          ].join('');
        }).join(''),
        '    </div>',
        '  </div>',
        '  <div class="dl-grid">',
        '    <section class="dl-card">',
        '      <span class="dl-card-tag">Primary goals</span>',
        '      ' + list(lane.goals, 'dl-list'),
        '    </section>',
        '    <section class="dl-card">',
        '      <span class="dl-card-tag">Operating notes</span>',
        '      ' + list(lane.operatingNotes, 'dl-list'),
        '    </section>',
        '    <section class="dl-card">',
        '      <span class="dl-card-tag">Command language</span>',
        '      ' + list(lane.commands, 'dl-command-list'),
        '    </section>',
        '    <section class="dl-card">',
        '      <span class="dl-card-tag">Anti-patterns</span>',
        '      ' + list(lane.antiPatterns, 'dl-list'),
        '    </section>',
        '  </div>',
        '</article>'
      ].join('');
    }).join('');

    host.innerHTML = [
      '<div class="dl-shell">',
      '  <div class="dl-shell-head">',
      '    <div>',
      '      <span class="dl-shell-label">Execution modes</span>',
      '      <h3>Engineering Delivery Lab</h3>',
      '      <p>Choose the operating lane to see how the same delivery style translates across DevSecOps, platform, AppSec, cloud, and incident work.</p>',
      '    </div>',
      '    <div class="dl-tab-row" role="toolbar" aria-label="Delivery lane selector">' + tabButtons + '</div>',
      '  </div>',
      '  <div class="dl-panel-wrap">' + panels + '</div>',
      '</div>'
    ].join('');

    var buttons = qsa('.dl-tab-btn', host);
    var panelNodes = qsa('.dl-panel', host);
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        activateTab(buttons, panelNodes, button.getAttribute('data-lane'));
      });
    });
  }

  function buildFirst90() {
    var roadmapHost = qs('#first90RoadmapMount');
    var principleHost = qs('#first90PrinciplesMount');
    var laneHost = qs('#first90IssueMount');
    if (!roadmapHost || !principleHost || !laneHost) return;

    roadmapHost.innerHTML = data.first90.map(function (phase) {
      return [
        '<article class="n90-phase-card">',
        '  <div class="n90-phase-head">',
        '    <span class="n90-phase-tag">' + esc(phase.phase) + '</span>',
        '    <p>' + esc(phase.focus) + '</p>',
        '  </div>',
        '  <div class="n90-phase-grid">',
        '    <section>',
        '      <h4>Objectives</h4>',
        '      ' + list(phase.objectives, 'n90-list'),
        '    </section>',
        '    <section>',
        '      <h4>Deliverables</h4>',
        '      ' + list(phase.deliverables, 'n90-list'),
        '    </section>',
        '    <section>',
        '      <h4>Success looks like</h4>',
        '      ' + list(phase.success, 'n90-list'),
        '    </section>',
        '  </div>',
        '</article>'
      ].join('');
    }).join('');

    principleHost.innerHTML = [
      '<div class="n90-principles-shell">',
      '  <div class="n90-principles-copy">',
      '    <span class="n90-mini-tag">Collaboration charter</span>',
      '    <h3>How the work usually lands well with teams</h3>',
      '    <p>The goal is not just stronger controls. The goal is stronger controls that engineers can understand, operators can support, and leadership can trust.</p>',
      '  </div>',
      '  <div class="n90-principle-grid">',
      data.collaborationPrinciples.map(function (item, index) {
        return [
          '    <article class="n90-principle-card">',
          '      <span class="n90-principle-num">0' + (index + 1) + '</span>',
          '      <p>' + esc(item) + '</p>',
          '    </article>'
        ].join('');
      }).join(''),
      '  </div>',
      '</div>'
    ].join('');

    laneHost.innerHTML = data.issueLanes.map(function (lane) {
      return [
        '<article class="n90-issue-card">',
        '  <h4>' + esc(lane.title) + '</h4>',
        '  <p>' + esc(lane.body) + '</p>',
        '</article>'
      ].join('');
    }).join('');
  }

  function hardenImpactVisibility() {
    var section = qs('#impact-metrics');
    if (!section) return;

    function reveal() {
      qsa('[data-aos]', section).forEach(function (el) {
        el.classList.add('aos-animate');
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
        el.style.pointerEvents = 'auto';
      });
      section.classList.add('dm-force-visible');
    }

    window.addEventListener('load', function () {
      window.setTimeout(function () {
        var faded = qsa('.dm-card, .dm-hd', section).some(function (node) {
          var styles = window.getComputedStyle(node);
          return parseFloat(styles.opacity || '1') < 0.8;
        });
        if (faded) reveal();
      }, 400);
    }, { once: true });

    reveal();
  }

  function initSectionAnchors() {
    qsa('.v19-anchor-link').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var selector = link.getAttribute('href');
        var target = selector ? qs(selector) : null;
        if (!target) return;
        event.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  function initSectionRevealV19() {
    var targets = qsa('.v19-reveal');
    if (!targets.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  function initProofHoverStates() {
    qsa('.pe-artifact-card').forEach(function (card) {
      card.addEventListener('mousemove', function (event) {
        var rect = card.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width) * 100;
        var y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', x.toFixed(2) + '%');
        card.style.setProperty('--my', y.toFixed(2) + '%');
      });
    });
  }

  function initDeliveryKeyboard() {
    var shell = qs('.dl-shell');
    if (!shell) return;
    shell.setAttribute('tabindex', '0');
    shell.addEventListener('keydown', function (event) {
      var buttons = qsa('.dl-tab-btn', shell);
      if (!buttons.length) return;
      var currentIndex = buttons.findIndex(function (btn) {
        return btn.classList.contains('active');
      });
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      var delta = event.key === 'ArrowRight' ? 1 : -1;
      var next = currentIndex + delta;
      if (next < 0) next = buttons.length - 1;
      if (next >= buttons.length) next = 0;
      buttons[next].click();
      buttons[next].focus();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildRecruiterCommandCenter();
    buildProofEngine();
    buildDeliveryLab();
    buildFirst90();
    hardenImpactVisibility();
    initSectionAnchors();
    initSectionRevealV19();
    initProofHoverStates();
    initDeliveryKeyboard();
  });
})();
