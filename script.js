document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const sections = document.querySelectorAll(".fade-in");

  function revealSection(section) {
    if (section) {
      section.classList.add("visible");
    }
  }

  // Reveal sections while scrolling
  if (reducedMotion || !("IntersectionObserver" in window)) {
    sections.forEach(revealSection);
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealSection(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 80px 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  // Navigation click handling
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        event.preventDefault();

        // Prevent the selected section from remaining invisible
        revealSection(targetSection);

        targetSection.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });

        history.replaceState(null, "", targetId);
      }
    });
  });

  // Reveal a section opened through a URL such as #projects
  if (window.location.hash) {
    const initialSection = document.querySelector(window.location.hash);

    if (initialSection) {
      revealSection(initialSection);
    }
  }
});
