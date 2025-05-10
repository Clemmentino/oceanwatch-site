document.addEventListener('DOMContentLoaded', function () {
    // --- Fade in main content ---
    // The #main-content div has opacity 0 initially and transition in CSS.
    // Adding 'revealed' class to body triggers the opacity to 1.
    document.body.classList.add('revealed');

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu'); // Get mobile menu to check if it's open

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            // Only remove 'scrolled' if mobile menu is not open
            // This prevents the navbar from becoming transparent while the menu is open and user scrolls a bit
            if (!mobileMenu.classList.contains('is-open')) {
                 navbar.classList.remove('scrolled');
            }
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-toggle-button');
    // const mobileMenu = document.getElementById('mobile-menu'); // Already defined above

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
            // If mobile menu is opened, ensure navbar has a background
            if (mobileMenu.classList.contains('is-open')) {
                navbar.classList.add('scrolled'); // Or a specific class like 'nav-open'
                navbar.querySelector('nav').classList.add('open'); // If you have specific styles for nav.open
            } else {
                // If menu is closed, remove 'scrolled' only if not actually scrolled down
                if (window.scrollY <= 50) {
                    navbar.classList.remove('scrolled');
                    navbar.querySelector('nav').classList.remove('open');
                }
            }
        });
    }

    // Close mobile menu when a link is clicked (optional but good UX)
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('is-open')) {
                mobileMenu.classList.remove('is-open');
                if (window.scrollY <= 50) {
                    navbar.classList.remove('scrolled');
                     navbar.querySelector('nav').classList.remove('open');
                }
            }
        });
    });


    // --- SDG 14 Info Tabs Functionality ---
    const tabLinks = document.querySelectorAll('.info-tab-link');
    const tabContents = document.querySelectorAll('.info-tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');

            // Deactivate all links and contents
            tabLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate clicked link and corresponding content
            link.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Optional: Activate the first tab by default if no JS interaction has happened
    // This is already handled by adding 'active' class in HTML, but good for robustness
    if (!document.querySelector('.info-tab-link.active') && tabLinks.length > 0) {
        tabLinks[0].classList.add('active');
        const firstTabId = tabLinks[0].getAttribute('data-tab');
        if (firstTabId) {
            const firstTabContent = document.getElementById(firstTabId);
            if (firstTabContent) {
                 firstTabContent.classList.add('active');
            }
        }
    }
});