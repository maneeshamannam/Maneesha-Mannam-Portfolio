// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false, // Make animations trigger every time
        mirror: true  // Also animate when scrolling back up
    });

    // --- Typing Effect ---
    // ... (rest of typing effect) ...
    const typingText = document.getElementById('typing-text');
    const professions = [
        "Maneesha Mannam.",
        "ASP.Net Developer.",
        "Backend Specialist."
    ];
    let profIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const current = professions[profIndex];

        if (isDeleting) {
            typingText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            profIndex = (profIndex + 1) % professions.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');

        if (body.classList.contains('light-theme')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Mobile Nav Toggle ---
    const sidebar = document.getElementById('sidebar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Close sidebar when clicking a link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            navToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // --- Intersection Observer for Animations ---
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkills(true);
                } else if (entry.target.id === 'languages') {
                    animateLanguages(true);
                }
            } else {
                // Reset when out of view so it animates again
                if (entry.target.id === 'skills') {
                    animateSkills(false);
                } else if (entry.target.id === 'languages') {
                    animateLanguages(false);
                }
            }
        });
    }, { threshold: 0.2 });

    const skillsSection = document.getElementById('skills');
    const languagesSection = document.getElementById('languages');
    if (skillsSection) animationObserver.observe(skillsSection);
    if (languagesSection) animationObserver.observe(languagesSection);

    // --- Skills Progress Bars Animation ---
    function animateSkills(show) {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            if (show) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            } else {
                bar.style.width = "0%";
            }
        });
    }

    // --- Language Circles Animation ---
    function animateLanguages(show) {
        const langCircles = document.querySelectorAll('.lang-circle');
        langCircles.forEach(circle => {
            const circlePath = circle.querySelector('circle');
            if (show) {
                circle.classList.add('active');
                const percent = circle.getAttribute('data-percent');
                const circ = 2 * Math.PI * 45; // Updated radius to match CSS (100px width/height, 8px stroke, 45r)
                const offset = circ - (percent / 100) * circ;
                circlePath.style.strokeDashoffset = offset;
            } else {
                circle.classList.remove('active');
                circlePath.style.strokeDashoffset = '283'; // Matches 2*PI*45
            }
        });
    }

    // --- Scroll Spy & Active Link ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contactForm');
    const statusMsg = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        let isValid = true;

        // Simple validation
        if (name.value.trim() === '') {
            name.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            name.parentElement.classList.remove('invalid');
        }

        if (!validateEmail(email.value)) {
            email.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            email.parentElement.classList.remove('invalid');
        }

        if (isValid) {
            statusMsg.textContent = "Sending...";
            statusMsg.style.color = "var(--primary-color)";

            // Simulate API call
            setTimeout(() => {
                statusMsg.textContent = "Thank you! Your message has been sent.";
                statusMsg.style.color = "#10b981";
                contactForm.reset();
            }, 1500);
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
