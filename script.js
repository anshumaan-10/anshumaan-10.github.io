document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Toast
  const toast = document.getElementById("toast");
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1200);
  };

  // Topbar shadow on scroll
  const topbar = document.querySelector(".topbar");
  const onScroll = () => {
    if (!topbar) return;
    if (window.scrollY > 10) topbar.classList.add("scrolled");
    else topbar.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Smooth scroll offset
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
    if (e.key === "Escape") {
      closeDrawer();
      closeCmdk();
    }
  });

  // KPI Counters
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

  // THEME TOGGLE (Dark/Light)
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeToggleBtnMobile = document.getElementById("themeToggleBtnMobile");
  const root = document.documentElement;

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    showToast(theme === "light" ? "Light mode" : "Dark mode");
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) setTheme(savedTheme);

  const toggleTheme = () => {
    const current = root.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener("click", toggleTheme);
  if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener("click", toggleTheme);

  // ACCENT SWITCHER
  document.querySelectorAll("[data-accent]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const accent = btn.getAttribute("data-accent");
      root.setAttribute("data-accent", accent);
      localStorage.setItem("accent", accent);
      showToast(`Accent: ${accent}`);
    });
  });

  const savedAccent = localStorage.getItem("accent");
  if (savedAccent) root.setAttribute("data-accent", savedAccent);

  // Evidence Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });

  // Risk Engine Simulator
  const cvssInput = document.getElementById("cvssInput");
  const epssInput = document.getElementById("epssInput");
  const evaluateRiskBtn = document.getElementById("evaluateRiskBtn");
  const resetRiskBtn = document.getElementById("resetRiskBtn");

  const riskBadge = document.getElementById("riskBadge");
  const riskTitle = document.getElementById("riskTitle");
  const riskDesc = document.getElementById("riskDesc");

  const evaluateRisk = () => {
    const cvss = parseFloat(cvssInput.value);
    const epss = parseFloat(epssInput.value);

    if (isNaN(cvss) || isNaN(epss)) {
      riskBadge.textContent = "INVALID";
      riskTitle.textContent = "Invalid inputs";
      riskDesc.textContent = "Please enter numeric CVSS and EPSS values.";
      return;
    }

    // Simple policy thresholds (you can tune these)
    const blocks = (cvss >= 7.0 && epss >= 0.50) || (cvss >= 9.0);

    if (blocks) {
      riskBadge.textContent = "BLOCKED";
      riskTitle.textContent = "Not promotable";
      riskDesc.textContent = `Blocked by policy: high risk (CVSS ${cvss.toFixed(1)}, EPSS ${epss.toFixed(2)}).`;
      showToast("Policy: BLOCKED");
    } else {
      riskBadge.textContent = "PROMOTABLE";
      riskTitle.textContent = "Eligible for promotion";
      riskDesc.textContent = `Passed policy thresholds (CVSS ${cvss.toFixed(1)}, EPSS ${epss.toFixed(2)}).`;
      showToast("Policy: PROMOTABLE");
    }
  };

  if (evaluateRiskBtn) evaluateRiskBtn.addEventListener("click", evaluateRisk);

  if (resetRiskBtn) {
    resetRiskBtn.addEventListener("click", () => {
      cvssInput.value = "7.5";
      epssInput.value = "0.35";
      riskBadge.textContent = "—";
      riskTitle.textContent = "Awaiting evaluation";
      riskDesc.textContent = "Enter CVSS and EPSS to simulate policy decision.";
      showToast("Reset");
    });
  }

  // REAL PDF GENERATOR (jsPDF)
  const downloadPdfBtn = document.getElementById("downloadPdfBtn");
  const downloadPdfBtnHero = document.getElementById("downloadPdfBtnHero");
  const downloadPdfBtnMobile = document.getElementById("downloadPdfBtnMobile");

  const downloadPdf = () => {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Anshumaan Singh — Security Systems Engineer", 14, 18);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text("Email: anshumaansingh10jan@gmail.com", 14, 30);
      doc.text("LinkedIn: linkedin.com/in/anshumaan-singh-6b51b5239", 14, 37);
      doc.text("GitHub: github.com/anshumaan-10", 14, 44);

      doc.setFont("helvetica", "bold");
      doc.text("Positioning", 14, 58);
      doc.setFont("helvetica", "normal");
      doc.text(
        "I engineer security like reliability — as a system property enforced through architecture, policy boundaries, and continuous verification.",
        14,
        66,
        { maxWidth: 180 }
      );

      doc.setFont("helvetica", "bold");
      doc.text("Core Impact", 14, 88);
      doc.setFont("helvetica", "normal");
      const bullets = [
        "Security engineering across 350+ microservices",
        "CI/CD control plane with deterministic verification gates",
        "Supply chain integrity: SBOM + attestations + immutability",
        "Kubernetes runtime guardrails: admission controls + least privilege",
        "Cloud governance: policy guardrails + drift resistance"
      ];
      let y = 96;
      bullets.forEach((b) => {
        doc.text(`• ${b}`, 14, y);
        y += 7;
      });

      doc.setFont("helvetica", "bold");
      doc.text("Certifications", 14, y + 6);
      doc.setFont("helvetica", "normal");
      doc.text("CKS, CKA, GCP Security, GCP PCA, Terraform Associate", 14, y + 14);

      doc.save("Anshumaan_Singh_OnePager.pdf");
      showToast("PDF downloaded");
    } catch (e) {
      console.error(e);
      showToast("PDF failed");
    }
  };

  if (downloadPdfBtn) downloadPdfBtn.addEventListener("click", downloadPdf);
  if (downloadPdfBtnHero) downloadPdfBtnHero.addEventListener("click", downloadPdf);
  if (downloadPdfBtnMobile) downloadPdfBtnMobile.addEventListener("click", downloadPdf);

  // CMDK (Command Palette) - FIXED OVERLAP + FULL MODAL
  const cmdkOverlay = document.getElementById("cmdkOverlay");
  const cmdkBtn = document.getElementById("cmdkBtn");
  const cmdkBtnMobile = document.getElementById("cmdkBtnMobile");
  const cmdkCloseBtn = document.getElementById("cmdkCloseBtn");
  const cmdkInput = document.getElementById("cmdkInput");
  const cmdkResults = document.getElementById("cmdkResults");

  const actions = [
    { label: "Go: About", type: "scroll", target: "#about" },
    { label: "Go: Ethical Principles", type: "scroll", target: "#philosophy" },
    { label: "Go: Implementation Depth", type: "scroll", target: "#implementation" },
    { label: "Go: Evidence", type: "scroll", target: "#evidence" },
    { label: "Go: Risk Engine", type: "scroll", target: "#risk-engine" },
    { label: "Go: Education", type: "scroll", target: "#education" },
    { label: "Go: Certifications", type: "scroll", target: "#certs" },
    { label: "Action: Copy Email", type: "copyEmail" },
    { label: "Action: Download PDF", type: "downloadPdf" },
    { label: "Action: Toggle Theme", type: "toggleTheme" }
  ];

  const openCmdk = () => {
    if (!cmdkOverlay) return;
    cmdkOverlay.classList.add("open");
    cmdkOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    renderCmdkResults(actions);
    setTimeout(() => cmdkInput && cmdkInput.focus(), 20);
  };

  const closeCmdk = () => {
    if (!cmdkOverlay) return;
    cmdkOverlay.classList.remove("open");
    cmdkOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (cmdkInput) cmdkInput.value = "";
  };

  window.closeCmdk = closeCmdk;

  const runAction = (action) => {
    if (!action) return;

    if (action.type === "scroll") {
      const el = document.querySelector(action.target);
      if (el) {
        const headerHeight = topbar ? topbar.offsetHeight + 22 : 0;
        const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }

    if (action.type === "copyEmail") {
      navigator.clipboard.writeText("anshumaansingh10jan@gmail.com");
      showToast("Email copied");
    }

    if (action.type === "downloadPdf") downloadPdf();
    if (action.type === "toggleTheme") toggleTheme();

    closeCmdk();
  };

  const renderCmdkResults = (items) => {
    if (!cmdkResults) return;
    cmdkResults.innerHTML = items.map((a, idx) => `
      <button class="cmdk-item" data-idx="${idx}">
        <span class="mono">${a.label}</span>
        <span class="cmdk-hint mono subtle">Enter</span>
      </button>
    `).join("");

    cmdkResults.querySelectorAll(".cmdk-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        runAction(items[idx]);
      });
    });
  };

  if (cmdkBtn) cmdkBtn.addEventListener("click", openCmdk);
  if (cmdkBtnMobile) cmdkBtnMobile.addEventListener("click", openCmdk);

  if (cmdkCloseBtn) cmdkCloseBtn.addEventListener("click", closeCmdk);

  if (cmdkOverlay) {
    cmdkOverlay.addEventListener("click", (e) => {
      if (e.target === cmdkOverlay) closeCmdk();
    });
  }

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openCmdk();
    }
  });

  if (cmdkInput) {
    cmdkInput.addEventListener("input", (e) => {
      const q = (e.target.value || "").toLowerCase().trim();
      const filtered = actions.filter((a) => a.label.toLowerCase().includes(q));
      renderCmdkResults(filtered.length ? filtered : actions);
    });

    cmdkInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const first = cmdkResults?.querySelector(".cmdk-item");
        if (first) first.click();
      }
      if (e.key === "Escape") closeCmdk();
    });
  }
});
