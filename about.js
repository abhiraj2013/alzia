const navbar = document.querySelector(".navbar");
const navbarToggle = document.querySelector(".navbar-toggle");
const mobileNavigation = document.querySelector(".mobile-navigation");
const mobileLinks = document.querySelectorAll(".mobile-navigation a");
const heroVideo = document.querySelector(".hero-video");

function handleNavbarScroll() {
  if (!navbar) return;

  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function openMobileNavigation() {
  if (!navbarToggle || !mobileNavigation) return;

  mobileNavigation.classList.add("active");
  navbarToggle.classList.add("active");

  navbarToggle.setAttribute("aria-label", "Close navigation");
  navbarToggle.setAttribute("aria-expanded", "true");

  document.body.classList.add("menu-open");
}

function closeMobileNavigation() {
  if (!navbarToggle || !mobileNavigation) return;

  mobileNavigation.classList.remove("active");
  navbarToggle.classList.remove("active");

  navbarToggle.setAttribute("aria-label", "Open navigation");
  navbarToggle.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
}

function toggleMobileNavigation() {
  if (!mobileNavigation) return;

  if (mobileNavigation.classList.contains("active")) {
    closeMobileNavigation();
  } else {
    openMobileNavigation();
  }
}

if (navbarToggle) {
  navbarToggle.setAttribute("aria-expanded", "false");

  navbarToggle.addEventListener("click", toggleMobileNavigation);
}

mobileLinks.forEach(link => {
  link.addEventListener("click", closeMobileNavigation);
});

document.addEventListener("click", event => {
  if (!mobileNavigation || !navbarToggle) return;

  const clickedInsideMenu = mobileNavigation.contains(event.target);
  const clickedToggle = navbarToggle.contains(event.target);

  if (
    mobileNavigation.classList.contains("active") &&
    !clickedInsideMenu &&
    !clickedToggle
  ) {
    closeMobileNavigation();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMobileNavigation();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    closeMobileNavigation();
  }
});

window.addEventListener("scroll", handleNavbarScroll, {
  passive: true
});

handleNavbarScroll();

const revealElements = document.querySelectorAll(
  ".about-section, .departments-preview, .company-section, .products-preview, .vision-section, .mission-section, .updates-preview, .footer"
);

revealElements.forEach(element => {
  element.classList.add("reveal-element");
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("is-visible");
  });
}

if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.playsInline = true;

  const playVideo = () => {
    const playPromise = heroVideo.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => { });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", playVideo, {
      once: true
    });
  } else {
    playVideo();
  }

  heroVideo.addEventListener("loadeddata", playVideo);
}

document.addEventListener("visibilitychange", () => {
  if (!heroVideo) return;

  if (document.hidden) {
    heroVideo.pause();
  } else {
    const playPromise = heroVideo.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => { });
    }
  }
});

const departmentItems = document.querySelectorAll(".department-preview");

departmentItems.forEach(item => {
  item.addEventListener("mouseenter", () => {
    item.classList.add("hovered");
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("hovered");
  });
});

const missionCards = document.querySelectorAll(".mission-card");

missionCards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("hovered");
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("hovered");
  });
});