document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector(".navbar");
  const navbarToggle = document.querySelector(".navbar-toggle");
  const mobileNavigation = document.querySelector(".mobile-navigation");

  const knowMoreButton = document.querySelector(".know-more-button");
  const moreInformation = document.querySelector(".product-more-information");

  let lastScrollY = window.scrollY;


  const updateNavbar = () => {

    if (!navbar) return;

    if (window.scrollY > 35) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScrollY = window.scrollY;
  };


  const closeMobileNavigation = () => {

    if (!navbarToggle || !mobileNavigation) return;

    mobileNavigation.classList.remove("active");

    navbarToggle.classList.remove("active");

    navbarToggle.setAttribute("aria-expanded", "false");

    document.body.classList.remove("navigation-open");
  };


  const openMobileNavigation = () => {

    if (!navbarToggle || !mobileNavigation) return;

    mobileNavigation.classList.add("active");

    navbarToggle.classList.add("active");

    navbarToggle.setAttribute("aria-expanded", "true");

    document.body.classList.add("navigation-open");
  };


  if (navbarToggle && mobileNavigation) {

    navbarToggle.setAttribute("aria-expanded", "false");

    navbarToggle.addEventListener("click", () => {

      const isOpen =
        mobileNavigation.classList.contains("active");

      if (isOpen) {
        closeMobileNavigation();
      } else {
        openMobileNavigation();
      }

    });


    mobileNavigation
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {
          closeMobileNavigation();
        });

      });

  }


  document.addEventListener("click", event => {

    if (
      !mobileNavigation ||
      !navbarToggle
    ) {
      return;
    }

    const clickedInsideNavigation =
      mobileNavigation.contains(event.target);

    const clickedToggle =
      navbarToggle.contains(event.target);

    if (
      !clickedInsideNavigation &&
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


  if (knowMoreButton && moreInformation) {

    knowMoreButton.setAttribute(
      "aria-expanded",
      "false"
    );

    knowMoreButton.setAttribute(
      "aria-controls",
      "civa-more-information"
    );

    moreInformation.id =
      "civa-more-information";


    knowMoreButton.addEventListener("click", () => {

      const isOpen =
        moreInformation.classList.contains("active");

      if (isOpen) {

        moreInformation.classList.remove("active");

        knowMoreButton.classList.remove("active");

        knowMoreButton.setAttribute(
          "aria-expanded",
          "false"
        );

        const buttonText =
          knowMoreButton.querySelector("span");

        if (buttonText) {
          buttonText.textContent = "Know more about CIVA";
        }

      } else {

        moreInformation.classList.add("active");

        knowMoreButton.classList.add("active");

        knowMoreButton.setAttribute(
          "aria-expanded",
          "true"
        );

        const buttonText =
          knowMoreButton.querySelector("span");

        if (buttonText) {
          buttonText.textContent = "Hide CIVA information";
        }

      }

    });

  }


  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(() => {

          updateNavbar();

          ticking = false;

        });

        ticking = true;
      }

    },
    { passive: true }
  );


  window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {
      closeMobileNavigation();
    }

  });


  updateNavbar();

});
const revealElements = document.querySelectorAll(
  ".section-intro, .product-card, .products-future-inner, .footer-main"
);

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");

        revealObserver.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
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


const internalLinks = document.querySelectorAll(
  'a[href^="#"]'
);

internalLinks.forEach(link => {

  link.addEventListener("click", event => {

    const targetId =
      link.getAttribute("href");

    if (
      !targetId ||
      targetId === "#"
    ) {
      return;
    }

    const target =
      document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


const productVisual =
  document.querySelector(".product-visual");

if (productVisual) {

  productVisual.addEventListener(
    "mousemove",
    event => {

      if (window.innerWidth <= 900) {
        return;
      }

      const rect =
        productVisual.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -2;

      const rotateY =
        ((x - centerX) / centerX) * 2;

      productVisual.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    }
  );


  productVisual.addEventListener(
    "mouseleave",
    () => {

      productVisual.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg)";

    }
  );

}


const productImage =
  document.querySelector(".product-visual img");

if (productImage) {

  productImage.addEventListener(
    "error",
    () => {

      productImage.style.display = "none";

      if (productVisual) {

        productVisual.classList.add(
          "image-unavailable"
        );

      }

    }
  );

}


const yearElements =
  document.querySelectorAll("[data-current-year]");

if (yearElements.length) {

  const currentYear =
    new Date().getFullYear();

  yearElements.forEach(element => {
    element.textContent = currentYear;
  });

}


document.documentElement.classList.add(
  "products-js-ready"
);