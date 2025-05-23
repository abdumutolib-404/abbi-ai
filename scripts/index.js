// Main JavaScript for Portfolio

// Theme Management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "light";
    this.themeToggle = document.getElementById("themeToggle");
    this.init();
  }

  init() {
    if (this.themeToggle) {
      this.setTheme(this.currentTheme);
      this.themeToggle.addEventListener("click", () => this.toggleTheme());
    }

    // Set current year in footer
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.currentTheme = theme;
    localStorage.setItem("theme", theme);
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    if (!this.themeToggle) return;
    const moonIcon = this.themeToggle.querySelector(".fa-moon");
    const sunIcon = this.themeToggle.querySelector(".fa-sun");

    if (this.currentTheme === "dark") {
      if (moonIcon) moonIcon.style.display = "none";
      if (sunIcon) sunIcon.style.display = "block";
    } else {
      if (moonIcon) moonIcon.style.display = "block";
      if (sunIcon) sunIcon.style.display = "none";
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.setTheme(newTheme);
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.hamburger = document.querySelector(".hamburger");
    this.navMenu = document.querySelector(".nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.navbar = document.querySelector(".navbar");
    this.init();
  }

  init() {
    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener("click", () => this.toggleMobileMenu());
    }

    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e));
    });

    window.addEventListener("scroll", () => this.handleScroll());
    window.addEventListener("resize", () => this.handleResize());

    // Initialize the active link
    this.handleScroll();
  }

  toggleMobileMenu() {
    this.hamburger.classList.toggle("active");
    this.navMenu.classList.toggle("active");

    // Toggle accessibility properties
    const expanded =
      this.hamburger.getAttribute("aria-expanded") === "true" || false;
    this.hamburger.setAttribute("aria-expanded", !expanded);
    this.navMenu.setAttribute("aria-hidden", expanded);
  }

  handleNavClick(e) {
    const href = e.currentTarget.getAttribute("href");

    // Check if it's an internal anchor link
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const targetSection = document.querySelector(href);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Close mobile menu if open
      if (this.hamburger && this.navMenu) {
        this.hamburger.classList.remove("active");
        this.navMenu.classList.remove("active");
        this.hamburger.setAttribute("aria-expanded", "false");
        this.navMenu.setAttribute("aria-hidden", "true");
      }

      // Update active nav link
      this.updateActiveNavLink(href);
    }
  }

  updateActiveNavLink(targetId) {
    this.navLinks.forEach((link) => {
      link.classList.remove("active");
      link.setAttribute("aria-current", "false");
    });

    const activeLink = document.querySelector(`a.nav-link[href="${targetId}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
      activeLink.setAttribute("aria-current", "page");
    }
  }

  handleScroll() {
    // Add/remove navbar background on scroll
    if (this.navbar) {
      if (window.scrollY > 100) {
        this.navbar.classList.add("scrolled");
      } else {
        this.navbar.classList.remove("scrolled");
      }
    }

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll("section[id]");
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = "#" + section.getAttribute("id");
      }
    });

    if (currentSection) {
      this.updateActiveNavLink(currentSection);
    }
  }

  handleResize() {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
      if (this.hamburger && this.navMenu) {
        this.hamburger.classList.remove("active");
        this.navMenu.classList.remove("active");
        this.hamburger.setAttribute("aria-expanded", "false");
        this.navMenu.setAttribute("aria-hidden", "true");
      }
    }
  }
}

// Typing Animation for Hero Section
class TypingAnimation {
  constructor() {
    this.typingElement = document.querySelector(".typing-text");
    this.cursor = document.querySelector(".cursor");
    this.texts = [
      "Web Developer",
      "15 yoshli dasturchi",
      "AI Enthusiast",
      "Kelajakdagi tadbirkor",
      "Frontend Developer",
      "Problem Solver",
    ];
    this.currentIndex = 0;
    this.currentText = "";
    this.isDeleting = false;
    this.typeSpeed = 100;
    this.deleteSpeed = 50;
    this.pauseTime = 2000;

    this.init();
  }

  init() {
    if (this.typingElement) {
      this.type();
      this.animateCursor();
    }
  }

  type() {
    const currentFullText = this.texts[this.currentIndex];

    if (this.isDeleting) {
      this.currentText = currentFullText.substring(
        0,
        this.currentText.length - 1
      );
    } else {
      this.currentText = currentFullText.substring(
        0,
        this.currentText.length + 1
      );
    }

    if (this.typingElement) {
      this.typingElement.textContent = this.currentText;
    }

    let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.currentText === currentFullText) {
      typeSpeed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === "") {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }

  animateCursor() {
    if (this.cursor) {
      setInterval(() => {
        this.cursor.style.opacity =
          this.cursor.style.opacity === "0" ? "1" : "0";
      }, 500);
    }
  }
}

// Skills Progress Animation
class SkillsAnimation {
  constructor() {
    this.skillBars = document.querySelectorAll(".progress-bar");
    this.skillsSection = document.querySelector(".skills-section");
    this.animated = false;
    this.init();
  }

  init() {
    if (this.skillsSection && this.skillBars.length > 0) {
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !this.animated) {
                this.animateSkills();
                this.animated = true;
              }
            });
          },
          { threshold: 0.3 }
        );

        observer.observe(this.skillsSection);
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        window.addEventListener("scroll", () => {
          const sectionTop = this.skillsSection.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (sectionTop < windowHeight * 0.7 && !this.animated) {
            this.animateSkills();
            this.animated = true;
          }
        });
      }
    }
  }

  animateSkills() {
    this.skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const progress = bar.getAttribute("data-progress");
        if (progress) {
          bar.style.width = progress + "%";
        }
      }, index * 200);
    });
  }
}

// Stats Counter Animation
class StatsCounter {
  constructor() {
    this.statNumbers = document.querySelectorAll(".stat-number");
    this.statsSection = document.querySelector(".stats-section");
    this.animated = false;
    this.init();
  }

  init() {
    if (this.statsSection && this.statNumbers.length > 0) {
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !this.animated) {
                this.animateCounters();
                this.animated = true;
              }
            });
          },
          { threshold: 0.3 }
        );

        observer.observe(this.statsSection);
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        window.addEventListener("scroll", () => {
          const sectionTop = this.statsSection.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (sectionTop < windowHeight * 0.7 && !this.animated) {
            this.animateCounters();
            this.animated = true;
          }
        });
      }
    }
  }

  animateCounters() {
    this.statNumbers.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count") || "0");
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
      }, 16);
    });
  }
}

// Floating Shapes Animation
class FloatingShapes {
  constructor() {
    this.shapes = document.querySelectorAll(".floating-shapes .shape");
    this.init();
  }

  init() {
    if (!this.shapes.length) return;

    this.shapes.forEach((shape) => {
      // Set random initial positions and animation delays
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const randomDelay = Math.random() * 5;

      shape.style.left = randomX + "%";
      shape.style.top = randomY + "%";
      shape.style.animationDelay = randomDelay + "s";
    });
  }
}

// Lazy Loading for images
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll("img[data-src]");
    this.init();
  }

  init() {
    if (this.images.length > 0) {
      if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.classList.remove("lazy");
              observer.unobserve(img);
            }
          });
        });

        this.images.forEach((img) => imageObserver.observe(img));
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        this.images.forEach((img) => {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
        });
      }
    }
  }
}

// Scroll to top functionality
class ScrollToTop {
  constructor() {
    this.createButton();
  }

  createButton() {
    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = "scroll-to-top";
    scrollBtn.setAttribute("aria-label", "Scroll to top");
    document.body.appendChild(scrollBtn);

    // Show/hide scroll button
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add("show");
      } else {
        scrollBtn.classList.remove("show");
      }
    });

    // Scroll to top when clicked
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// Form validation and submission
class FormHandler {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // Simple validation
    const formData = new FormData(this.form);
    let isValid = true;

    for (const [key, value] of formData.entries()) {
      if (!value.trim()) {
        isValid = false;
        const input = this.form.querySelector(`[name="${key}"]`);
        input.classList.add("error");
        setTimeout(() => input.classList.remove("error"), 3000);
      }
    }

    if (isValid) {
      // Simulate form submission - would normally send to server
      const successMessage = document.createElement("div");
      successMessage.className = "form-success";
      successMessage.textContent = "Xabaringiz muvaffaqiyatli yuborildi!";

      this.form.reset();
      this.form.appendChild(successMessage);

      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }
  }
}

// Page Loading Animation
class PageLoader {
  constructor() {
    this.loader = document.querySelector(".loader");
    this.init();
  }

  init() {
    if (this.loader) {
      if (document.readyState === "complete") {
        this.hideLoader();
      } else {
        window.addEventListener("load", () => this.hideLoader());
      }
    }
  }

  hideLoader() {
    setTimeout(() => {
      this.loader.style.opacity = "0";
      setTimeout(() => {
        this.loader.style.display = "none";
      }, 300);
    }, 500);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  try {
    // Initialize all components
    const themeManager = new ThemeManager();
    const navigationManager = new NavigationManager();
    const typingAnimation = new TypingAnimation();
    const skillsAnimation = new SkillsAnimation();
    const statsCounter = new StatsCounter();
    const floatingShapes = new FloatingShapes();
    const lazyLoader = new LazyLoader();
    const scrollToTop = new ScrollToTop();
    const formHandler = new FormHandler();
    const pageLoader = new PageLoader();

    console.log("🚀 Portfolio loaded successfully!");
  } catch (error) {
    console.error("Error initializing portfolio:", error);
  }
});

// Handle page visibility changes
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    document.title = "Come back! - Abdumutolib";
  } else {
    document.title = "Abdumutolib Abdulahadov - Web Developer";
  }
});
