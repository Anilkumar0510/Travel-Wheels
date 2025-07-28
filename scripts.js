document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        observer.observe(section);
    });

    // Hide all main sections except home initially
    const sections = ['#home', '#buses', '#tours', '#about'];
    sections.forEach((selector, index) => {
        const section = document.querySelector(selector);
        if (section) {
            if (selector !== '#home') {
                section.classList.add('hidden');
            } else {
                section.classList.remove('hidden');
            }
        }
    });

    // Navigation links click handler to show/hide sections
    const navLinks = document.querySelectorAll('nav a.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId) return;

            // Hide all sections
            sections.forEach(selector => {
                const sec = document.querySelector(selector);
                if (sec) {
                    sec.classList.add('hidden');
                }
            });

            // Show the clicked section
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }

            // Update active class on nav links
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Set initial active nav link to Home
    navLinks.forEach(nav => {
        if (nav.getAttribute('href') === '#home') {
            nav.classList.add('active');
        }
    });

    // Simple CTA button handler (can be expanded for a modal or form)
    const bookingBtn = document.querySelector('.booking-btn');
    if (bookingBtn) {
        bookingBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const tourName = bookingBtn.dataset.tour || "a tour";
            alert(`You clicked to book for: ${tourName}! Please contact us via WhatsApp or phone for more details.`);
            // In a real application, you might open a modal here
        });
    }

    // Handle Explore Packages button click to show multiple sections
    const exploreBtn = document.querySelector('a.btn-primary[href="#tours"]');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionsToShow = ['#buses', '#about', '#whatsapp', '#tours'];
            const allSections = ['#home', '#buses', '#tours', '#about', '#whatsapp'];

            // Hide all sections first
            allSections.forEach(selector => {
                const sec = document.querySelector(selector);
                if (sec) {
                    sec.classList.add('hidden');
                }
            });

            // Show the specified sections
            sectionsToShow.forEach(selector => {
                const sec = document.querySelector(selector);
                if (sec) {
                    sec.classList.remove('hidden');
                }
            });

            // Remove active class from all nav links
            const navLinks = document.querySelectorAll('nav a.nav-link');
            navLinks.forEach(nav => nav.classList.remove('active'));
        });
    }
});

// Add search bar functionality to open URLs or search engines
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.querySelector('.fa-search');

    function isValidURL(str) {
        // Simple regex to check if string looks like a URL
        const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
        return pattern.test(str);
    }

    function openSearch() {
        const query = searchInput.value.trim();
        if (!query) return;

        let url = '';
        if (isValidURL(query)) {
            // If no protocol, add http://
            if (!/^https?:\/\//i.test(query)) {
                url = 'http://' + query;
            } else {
                url = query;
            }
        } else {
            // Use Google search for other queries
            url = 'https://www.google.com/search?q=' + encodeURIComponent(query);
        }
        window.open(url, '_blank');
    }

    if (searchIcon) {
        searchIcon.style.pointerEvents = 'auto'; // Enable click
        searchIcon.addEventListener('click', openSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                openSearch();
            }
        });
    }
});
