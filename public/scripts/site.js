(() => {
  "use strict";

  const header = document.querySelector("#siteHeader");
  const nav = document.querySelector("#mainNav");
  const menuButton = document.querySelector("#menuBtn");

  const closeMenu = () => {
    nav?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  };

  menuButton?.addEventListener("click", () => {
    const open = nav?.classList.toggle("open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav?.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav?.classList.contains("open")) {
      closeMenu();
      menuButton?.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Node)) return;
    if (nav?.classList.contains("open") && !header?.contains(event.target)) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1040) closeMenu();
  });

  const filterGroup = document.querySelector("#publicationFilters");
  const yearBlocks = [...document.querySelectorAll("[data-publication-year]")];

  filterGroup?.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest("[data-filter-year]");
    if (!(button instanceof HTMLButtonElement)) return;

    const selectedYear = button.dataset.filterYear;
    filterGroup.querySelectorAll("[data-filter-year]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    yearBlocks.forEach((block) => {
      block.hidden = selectedYear !== "all" && block.dataset.publicationYear !== selectedYear;
    });
  });

  const navLinks = [...document.querySelectorAll("#mainNav [data-section]")];
  const sections = navLinks
    .map((link) => document.getElementById(link.dataset.section ?? ""))
    .filter((section) => section !== null);

  const setActiveSection = (sectionId) => {
    navLinks.forEach((link) => {
      const active = link.dataset.section === sectionId;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  let framePending = false;
  const updateActiveSection = () => {
    framePending = false;
    if (sections.length === 0) return;

    const marker = (header?.offsetHeight ?? 0) + 28;
    let activeSection = sections[0];

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) activeSection = section;
      else break;
    }

    const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atPageEnd) activeSection = sections[sections.length - 1];
    setActiveSection(activeSection.id);
  };

  const requestUpdate = () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateActiveSection);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("hashchange", requestUpdate);
  requestUpdate();

  document.querySelectorAll(".avatar img").forEach((image) => {
    image.addEventListener("error", () => {
      image.closest(".avatar")?.classList.remove("has-photo");
      image.remove();
    });
  });
})();
