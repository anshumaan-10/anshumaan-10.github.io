document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Topbar shadow on scroll
  const topbar = document.querySelector(".topbar");
  const onScroll = () => {
    if (!topbar) return;
    if (window.scrollY > 10) topbar.classList.add("scrolled");
    else topbar.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Smooth scroll offset for sticky header
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const el = document.querySelector(targetId);
      if (!el) return;

      e.preventDefault();
      const headerHeight = topbar ? topbar.offsetHeight + 22 : 0;
      const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Hamburger menu
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");

  const openDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add("open");
    if (hamburgerBtn) hamburgerBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
  };

  const closeDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove("open");
    if (hamburgerBtn) hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener("click", openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);

  if (mobileDrawer) {
    mobileDrawer.addEventListener("click", (e) => {
      if (e.target === mobileDrawer) closeDrawer();
    });
  }

  document.querySelectorAll(".mnav").forEach((a) => {
    a.addEventListener("click", () => closeDrawer());
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // KPI Counters animation
  const counters = document.querySelectorAll(".counter");
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 900;
    const stepTime = 18;
    const steps = Math.ceil(duration / stepTime);
    const increment = Math.max(1, Math.floor(target / steps));

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (!el.dataset.animated) {
          el.dataset.animated = "true";
          animateCounter(el);
        }
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((c) => observer.observe(c));

  // Toast helper
  const toast = document.getElementById("toast");
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1200);
  };

  // Copy Email
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("anshumaansingh10jan@gmail.com");
        showToast("Email copied");
      } catch {
        showToast("Copy failed");
      }
    });
  }

  // PDF Auto-Generate (client-side print)
  const triggerPDF = () => {
    showToast("Preparing PDF…");
    setTimeout(() => {
      window.print();
    }, 350);
  };

  const downloadPDFBtn = document.getElementById("downloadPDFBtn");
  const downloadPDFBtnHero = document.getElementById("downloadPDFBtnHero");
  const downloadPDFBtnMobile = document.getElementById("downloadPDFBtnMobile");

  if (downloadPDFBtn) downloadPDFBtn.addEventListener("click", triggerPDF);
  if (downloadPDFBtnHero) downloadPDFBtnHero.addEventListener("click", triggerPDF);
  if (downloadPDFBtnMobile) downloadPDFBtnMobile.addEventListener("click", triggerPDF);

  // Explorer Data
  const layers = [
    {
      id: "l1",
      title: "Layer 1 — Source Governance",
      tags: ["cicd", "governance"],
      guarantee: "Only reviewed code becomes mergeable.",
      enforcement: [
        "PR-only delivery (no direct pushes)",
        "CODEOWNERS approvals + branch protections",
        "Required checks as merge invariants",
        "Signed commits / provenance alignment"
      ],
      failureModes: [
        "Direct push bypass",
        "Unreviewed changes reaching main",
        "Missing required checks"
      ]
    },
    {
      id: "l2",
      title: "Layer 2 — Identity & Access Plane",
      tags: ["identity", "governance"],
      guarantee: "Identity is ephemeral, scoped, and verifiable.",
      enforcement: [
        "OIDC federation for keyless auth",
        "Short-lived tokens for CI workloads",
        "Least privilege IAM boundaries",
        "Remove long-lived secrets from pipelines"
      ],
      failureModes: [
        "Credential leakage in CI",
        "Over-privileged service accounts",
        "Static keys reused across systems"
      ]
    },
    {
      id: "l3",
      title: "Layer 3 — CI Boundary & Verification",
      tags: ["cicd"],
      guarantee: "Passed means promotable (deterministic semantics).",
      enforcement: [
        "Ephemeral runners reduce persistence risk",
        "SAST + SCA + Secrets + IaC scanning",
        "DAST validation before promotion",
        "Quality gates with strict fail behavior"
      ],
      failureModes: [
        "Scan results ignored",
        "Non-deterministic gates",
        "Builds without evidence"
      ]
    },
    {
      id: "l4",
      title: "Layer 4 — Supply Chain Integrity & Evidence",
      tags: ["supplychain", "cicd"],
      guarantee: "Artifacts are traceable + tamper-resistant.",
      enforcement: [
        "SBOM generation + packaging",
        "Provenance metadata for builds",
        "Artifact signing + attestations",
        "Immutable versioning (no latest)"
      ],
      failureModes: [
        "Tag mutation / overwritten images",
        "Unknown artifact origin",
        "No evidence for audit"
      ]
    },
    {
      id: "l5",
      title: "Layer 5 — Release Governance & Risk Engine",
      tags: ["governance", "supplychain"],
      guarantee: "Release decisions are policy-driven, not manual trust.",
      enforcement: [
        "Risk scoring: CVSS + exploit signals",
        "Policy thresholds for promotion",
        "Registry controls + immutable tags",
        "Approval boundaries (non-bypassable)"
      ],
      failureModes: [
        "High-risk artifact promoted",
        "Manual exception drift",
        "Policy gaps"
      ]
    },
    {
      id: "l6",
      title: "Layer 6 — Environment Separation",
      tags: ["governance"],
      guarantee: "Prod reachable only through controlled promotion.",
      enforcement: [
        "Dev/UAT/Prod separation by boundary",
        "Evidence moves with artifacts",
        "Promotion sequencing enforced"
      ],
      failureModes: [
        "Out-of-band prod deploys",
        "Missing evidence in UAT/Prod"
      ]
    },
    {
      id: "l7",
      title: "Layer 7 — Kubernetes Admission Enforcement",
      tags: ["kubernetes"],
      guarantee: "Unsafe workloads never start.",
      enforcement: [
        "Admission policies (OPA/Kyverno patterns)",
        "RBAC + namespace isolation",
        "Ingress boundary controls",
        "mTLS identity patterns (service mesh ready)"
      ],
      failureModes: [
        "Privileged pods",
        "HostPath mounts",
        "Default service account abuse"
      ]
    },
    {
      id: "l8",
      title: "Layer 8 — Runtime Plane Controls",
      tags: ["kubernetes", "supplychain"],
      guarantee: "Runtime stays constrained + observable.",
      enforcement: [
        "Security context hardening",
        "Drift detection & runtime detection",
        "Secrets manager + KMS encryption",
        "Egress control & data boundary patterns"
      ],
      failureModes: [
        "Privilege escalation at runtime",
        "Silent drift",
        "Unbounded egress"
      ]
    },
    {
      id: "l9",
      title: "Layer 9 — Observability & Security Operations",
      tags: ["observability"],
      guarantee: "Incidents are detectable, actionable, containable.",
      enforcement: [
        "Audit logs + metrics + traces",
        "SIEM ingestion patterns",
        "Response playbooks mapped to alerts"
      ],
      failureModes: [
        "Noisy alerts",
        "No response path",
        "Missing audit telemetry"
      ]
    }
  ];

  const explorerPanels = document.getElementById("explorerPanels");
  const layerSearch = document.getElementById("layerSearch");
  const chips = document.querySelectorAll(".chip");
  const expandAllBtn = document.getElementById("expandAllBtn");
  const collapseAllBtn = document.getElementById("collapseAllBtn");

  let activeFilter = "all";
  let searchQuery = "";

  const renderExplorer = () => {
    if (!explorerPanels) return;

    const filtered = layers.filter((l) => {
      const matchesFilter = activeFilter === "all" ? true : l.tags.includes(activeFilter);
      const haystack = `${l.title} ${l.guarantee} ${l.enforcement.join(" ")} ${l.failureModes.join(" ")}`.toLowerCase();
      const matchesSearch = searchQuery ? haystack.includes(searchQuery.toLowerCase()) : true;
      return matchesFilter && matchesSearch;
    });

    explorerPanels.innerHTML = filtered.map((l) => {
      return `
        <div class="xpanel glass" data-layer="${l.id}">
          <button class="xpanel-head" aria-expanded="false">
            <div class="xpanel-title">
              <span class="mono xpanel-layer">${l.id.toUpperCase()}</span>
              <span>${l.title}</span>
            </div>
            <span class="xpanel-toggle mono">expand</span>
          </button>

          <div class="xpanel-body">
            <div class="xblock">
              <div class="xlabel mono">guarantee</div>
              <div class="xvalue">${l.guarantee}</div>
            </div>

            <div class="xgrid">
              <div class="xblock">
                <div class="xlabel mono">enforcement points</div>
                <ul class="xlist">
                  ${l.enforcement.map((e) => `<li>${e}</li>`).join("")}
                </ul>
              </div>

              <div class="xblock">
                <div class="xlabel mono">failure modes prevented</div>
                <ul class="xlist">
                  ${l.failureModes.map((f) => `<li>${f}</li>`).join("")}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    document.querySelectorAll(".xpanel-head").forEach((btn) => {
      btn.addEventListener("click", () => {
        const panel = btn.closest(".xpanel");
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        panel.classList.toggle("open");
        const toggle = btn.querySelector(".xpanel-toggle");
        if (toggle) toggle.textContent = expanded ? "expand" : "collapse";
      });
    });
  };

  if (layerSearch) {
    layerSearch.addEventListener("input", (e) => {
      searchQuery = e.target.value || "";
      renderExplorer();
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      activeFilter = chip.dataset.filter || "all";
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      if (activeFilter === "all") chips.forEach((c) => c.classList.remove("active"));
      renderExplorer();
    });
  });

  if (expandAllBtn) {
    expandAllBtn.addEventListener("click", () => {
      document.querySelectorAll(".xpanel").forEach((p) => {
        p.classList.add("open");
        const head = p.querySelector(".xpanel-head");
        const toggle = p.querySelector(".xpanel-toggle");
        if (head) head.setAttribute("aria-expanded", "true");
        if (toggle) toggle.textContent = "collapse";
      });
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener("click", () => {
      document.querySelectorAll(".xpanel").forEach((p) => {
        p.classList.remove("open");
        const head = p.querySelector(".xpanel-head");
        const toggle = p.querySelector(".xpanel-toggle");
        if (head) head.setAttribute("aria-expanded", "false");
        if (toggle) toggle.textContent = "expand";
      });
    });
  }

  renderExplorer();

  // Threat Model Board
  const threatPanel = document.getElementById("threatPanel");
  const threatBtns = document.querySelectorAll(".threat-btn");

  const threatData = {
    secrets: {
      title: "Scenario: Secrets leaked in repo",
      attackPath: [
        "Attacker discovers token in commit history",
        "Token used to access CI/CD or cloud resources",
        "Privilege escalation via over-scoped IAM"
      ],
      controls: [
        "Secrets scanning + PR blocking",
        "OIDC federation (remove static secrets)",
        "Least privilege IAM boundaries",
        "Audit telemetry + detection mapping"
      ],
      guarantee: "Secrets are prevented from becoming persistent access paths."
    },
    supplychain: {
      title: "Scenario: Artifact tampering / tag mutation",
      attackPath: [
        "Image tag overwritten (mutable tag)",
        "Artifact promoted without evidence",
        "Prod runs unverified image"
      ],
      controls: [
        "Immutable versioning (no latest)",
        "Signing + attestations",
        "Promotion chain enforcement",
        "Registry controls + policy gates"
      ],
      guarantee: "Only verified, traceable artifacts can be promoted and deployed."
    },
    k8s: {
      title: "Scenario: Privileged pod attempt",
      attackPath: [
        "Developer attempts privileged container",
        "HostPath mounts enable node escape",
        "Lateral movement across namespaces"
      ],
      controls: [
        "Admission control policies (deny privileged)",
        "RBAC boundaries + namespace isolation",
        "Security context enforcement",
        "Runtime detection + drift monitoring"
      ],
      guarantee: "Unsafe workloads are denied before execution."
    },
    authz: {
      title: "Scenario: Broken authorization (IDOR)",
      attackPath: [
        "Attacker enumerates resource IDs",
        "Accesses unauthorized objects",
        "Escalates by abusing missing checks"
      ],
      controls: [
        "Authorization enforcement points defined",
        "Threat modeling of trust boundaries",
        "API abuse testing and validation",
        "Telemetry mapped to response actions"
      ],
      guarantee: "Authorization failures are addressed as system boundaries, not patchwork fixes."
    }
  };

  const renderThreat = (key) => {
    if (!threatPanel) return;
    const t = threatData[key];
    if (!t) return;

    threatPanel.innerHTML = `
      <div class="threat-render">
        <div class="threat-render-title mono">${t.title}</div>

        <div class="threat-cols">
          <div class="threat-col">
            <div class="xlabel mono">attacker path</div>
            <ul class="xlist">
              ${t.attackPath.map((a) => `<li>${a}</li>`).join("")}
            </ul>
          </div>

          <div class="threat-col">
            <div class="xlabel mono">control plane defenses</div>
            <ul class="xlist">
              ${t.controls.map((c) => `<li>${c}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div class="xblock" style="margin-top:12px;">
          <div class="xlabel mono">guarantee</div>
          <div class="xvalue">${t.guarantee}</div>
        </div>
      </div>
    `;
  };

  threatBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      threatBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderThreat(btn.dataset.scenario);
    });
  });

  // Evidence Drawers
  document.querySelectorAll(".drawer-head").forEach((head) => {
    head.addEventListener("click", () => {
      const drawer = head.closest(".drawer");
      const toggle = head.querySelector(".drawer-toggle");
      const open = drawer.classList.toggle("open");
      if (toggle) toggle.textContent = open ? "collapse" : "expand";
    });
  });
});
