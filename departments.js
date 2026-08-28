const body = document.body;
const navbar = document.querySelector(".navbar");
const menuButton = document.querySelector(".navbar-toggle");
const mobileNavigation = document.querySelector(".mobile-navigation");

const revealElements = document.querySelectorAll(
  ".departments-introduction, .department-block, .departments-closing, .footer"
);

const mobileLinks = document.querySelectorAll(
  ".mobile-navigation a"
);

function openMenu() {
  mobileNavigation.classList.add("active");

  menuButton.classList.add("active");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close navigation");
}

function closeMenu() {
  mobileNavigation.classList.remove("active");

  menuButton.classList.remove("active");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}

menuButton.addEventListener("click", () => {
  if (mobileNavigation.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("click", (event) => {
  const clickedInsideMenu =
    mobileNavigation.contains(event.target);

  const clickedButton =
    menuButton.contains(event.target);

  if (
    mobileNavigation.classList.contains("active") &&
    !clickedInsideMenu &&
    !clickedButton
  ) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

let lastScrollY = window.scrollY;

window.addEventListener(
  "scroll",
  () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScrollY = currentScrollY;
  },
  { passive: true }
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px"
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

window.addEventListener("load", () => {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.9) {
      element.classList.add("is-visible");
    }
  });
});