// Configuration - Set this to true to show sponsored by section
const SHOW_SPONSORED_BY = false;

// Smooth scrolling navigation and interactive features
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      if (navMenu) {
        navMenu.classList.toggle("active");
      }
    });
  }

  // Close mobile menu when nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburger) {
        hamburger.classList.remove("active");
      }
      if (navMenu) {
        navMenu.classList.remove("active");
      }
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      if (targetId) {
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      if (navbar) {
        navbar.classList.add("scrolled");
      }
    } else {
      if (navbar) {
        navbar.classList.remove("scrolled");
      }
    }
  });

  // Active nav link highlighting
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all nav links
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Add active class to current nav link
        if (sectionId) {
          const activeLink = document.querySelector(
            `.nav-link[href="#${sectionId}"]`
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      }
    });
  });

  // Simple animation trigger - just add animate class to all elements
  setTimeout(() => {
    const animateElements = document.querySelectorAll(
      ".member-card, .value-item, .contact-item"
    );
    animateElements.forEach((el, index) => {
      el.style.setProperty("--i", index);
      el.classList.add("animate");
    });
  }, 100);

  // Parallax effect for light sources
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const lightSources = document.querySelectorAll(
      ".light-source, .section-light"
    );

    lightSources.forEach((light, index) => {
      const speed = 0.5 + index * 0.2;
      light.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Update logo glow intensity based on scroll
    const logoGlow = document.querySelector(".logo-glow");
    if (logoGlow) {
      const intensity = Math.max(0.4, 1 - scrolled / 1000);
      logoGlow.style.opacity = intensity;
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);

  // Enhanced cursor lighting effect
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update CSS custom properties for cursor lighting
    document.documentElement.style.setProperty("--mouse-x", mouseX + "px");
    document.documentElement.style.setProperty("--mouse-y", mouseY + "px");
  });

  // Add loading class immediately
  document.body.classList.add("loaded");

  // Handle sponsored by section visibility
  const sponsoredBySection = document.getElementById("sponsoredBy");
  if (sponsoredBySection) {
    if (SHOW_SPONSORED_BY) {
      sponsoredBySection.classList.add("active");
    } else {
      sponsoredBySection.classList.remove("active");
    }
  }

  // Enhanced hover effects for member cards
  const memberCards = document.querySelectorAll(".member-card");
  memberCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Add extra glow to nearby cards
      memberCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.style.filter = "brightness(0.7)";
        }
      });
    });

    card.addEventListener("mouseleave", () => {
      // Reset all cards
      memberCards.forEach((otherCard) => {
        otherCard.style.filter = "brightness(1)";
      });
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const observeElements = document.querySelectorAll(
    ".value-item, .member-card, .contact-item"
  );
  observeElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  console.log("GCRT FTC Team website initialized with Blue theme! ");
  console.log(
    `Sponsored by section is ${SHOW_SPONSORED_BY ? "enabled" : "disabled"}`
  );
  console.log("Dark Blue theme with lighting effects activated ");
});