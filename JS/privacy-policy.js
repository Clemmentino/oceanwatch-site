const navbar = document.getElementById("navbar");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const scrollThreshold = 50;

const handleScroll = () => {
  if (navbar) {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
};

const toggleMobileMenu = () => {
  if (!mobileMenu || !mobileMenuButton) return;

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
  if (!mobileMenu || !mobileMenuButton) return;
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

document.body.style.overflowY = "auto";