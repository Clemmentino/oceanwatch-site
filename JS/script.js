const loadingBar = document.getElementById("loading-bar");
const blocks = document.querySelectorAll(".block");
const logo = document.getElementById("preloader-logo");
const barContainer = document.getElementById("loading-bar-container");
const preloader = document.getElementById("preloader");
const mainContent = document.getElementById("main-content");

const navbar = document.getElementById("navbar");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const scrollThreshold = 50;

function initPreloader() {
  const preloaderShown = sessionStorage.getItem("preloaderShown");

  document.body.style.overflow = "hidden";

  if (!preloaderShown) {
    loadingBar.style.width = "100%";

    setTimeout(() => {
      logo.style.opacity = "0";
      barContainer.style.opacity = "0";
    }, 2600);

    setTimeout(() => {
      blocks.forEach((block, i) => {
        setTimeout(() => {
          block.classList.add("animate");
        }, i * 200);
      });

      setTimeout(() => {
        preloader.style.visibility = "hidden";
        preloader.style.display = "none";
        document.body.classList.add("revealed");

        requestAnimationFrame(() => {
          document.body.style.overflow = "auto";
          window.scrollTo(0, 0);
        });

        sessionStorage.setItem("preloaderShown", "true");
      }, 200 * blocks.length + 1000);
    }, 3400);
  } else {
    preloader.style.display = "none";
    document.body.classList.add("revealed");

    requestAnimationFrame(() => {
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0);
    });
  }
}

const handleScroll = () => {
  if (window.scrollY > scrollThreshold) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

const toggleMobileMenu = () => {
  const isOpen = mobileMenu.classList.contains("is-open");

  if (isOpen) {
    mobileMenu.classList.remove("is-open");
    if (mobileMenuButton.querySelector("svg")) {
      mobileMenuButton.querySelector("svg").innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"></path>`;
    }
  } else {
    mobileMenu.classList.add("is-open");
    if (mobileMenuButton.querySelector("svg")) {
      mobileMenuButton.querySelector("svg").innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"></path>`;
    }
  }
};

const closeMobileMenu = () => {
  mobileMenu.classList.remove("is-open");
  if (mobileMenuButton.querySelector("svg")) {
    mobileMenuButton.querySelector("svg").innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"></path>`;
  }
};

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedHandleScroll = debounce(handleScroll, 10);

window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

if (mobileMenuButton) {
  mobileMenuButton.addEventListener("click", toggleMobileMenu);
}

if (mobileMenu) {
  mobileMenu.querySelectorAll("a, button").forEach((item) => {
    item.addEventListener("click", closeMobileMenu);
  });
}

handleScroll();

window.addEventListener("load", initPreloader);

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (
      document.body.style.overflow === "hidden" &&
      preloader.style.display !== "flex" &&
      preloader.style.visibility !== "visible"
    ) {
      document.body.style.overflow = "auto";
      console.warn("Failsafe triggered: Re-enabled body scrolling.");
    }
  }, 10000);
});
