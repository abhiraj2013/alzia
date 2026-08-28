document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navbarToggle = document.querySelector(".navbar-toggle");
  const mobileNavigation = document.querySelector(".mobile-navigation");

  const closeMobileNavigation = () => {
    if (!navbarToggle || !mobileNavigation) return;

    mobileNavigation.classList.remove("active");
    navbarToggle.classList.remove("active");
    navbarToggle.setAttribute("aria-expanded", "false");
    navbarToggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("navigation-open");
  };

  const openMobileNavigation = () => {
    if (!navbarToggle || !mobileNavigation) return;

    mobileNavigation.classList.add("active");
    navbarToggle.classList.add("active");
    navbarToggle.setAttribute("aria-expanded", "true");
    navbarToggle.setAttribute("aria-label", "Close navigation");
    document.body.classList.add("navigation-open");
  };

  if (navbarToggle && mobileNavigation) {
    navbarToggle.setAttribute("aria-expanded", "false");

    navbarToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      if (mobileNavigation.classList.contains("active")) {
        closeMobileNavigation();
      } else {
        openMobileNavigation();
      }
    });

    mobileNavigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileNavigation();
      });
    });

    document.addEventListener("click", (event) => {
      if (
        mobileNavigation.classList.contains("active") &&
        !mobileNavigation.contains(event.target) &&
        !navbarToggle.contains(event.target)
      ) {
        closeMobileNavigation();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileNavigation();
      }
    });
  }

  const updateNavbar = () => {
    if (!navbar) return;

    if (window.scrollY > 35) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  updateNavbar();

  let scrollTicking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;

      window.requestAnimationFrame(() => {
        updateNavbar();
        scrollTicking = false;
      });

      scrollTicking = true;
    },
    {
      passive: true
    }
  );

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileNavigation();
    }
  });

  const currentPage =
    window.location.pathname.split("/").pop() || "updates.html";

  document
    .querySelectorAll(".navbar-navigation a, .mobile-navigation a")
    .forEach((link) => {
      const linkPage = link.getAttribute("href");

      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });

  const revealElements = document.querySelectorAll(
    ".section-intro, .update-card, .connected-inner, .coming-updates-inner, .updates-closing-inner, .footer-main"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  const updateButton = document.querySelector(".update-button");

  if (updateButton) {
    updateButton.addEventListener("click", (event) => {
      const target = updateButton.getAttribute("href");

      if (
        !target ||
        target === "#" ||
        target === "YOUR-CIVA-LINK-HERE"
      ) {
        event.preventDefault();

        const buttonText =
          updateButton.querySelector("span");

        if (buttonText) {
          buttonText.textContent = "CIVA LINK COMING SOON";
        }

        setTimeout(() => {
          if (buttonText) {
            buttonText.textContent = "Check CIVA";
          }
        }, 2200);
      }
    });
  }

  const yearElements =
    document.querySelectorAll("[data-current-year]");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  document.documentElement.classList.add("updates-js-ready");

  window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
  });
});