// set footer year
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // smooth scroll offset for sticky header
  const header = document.querySelector(".topbar");
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const el = document.querySelector(targetId);
      if (!el) return;

      e.preventDefault();
      const headerHeight = header ? header.offsetHeight + 18 : 0;
      const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
});
