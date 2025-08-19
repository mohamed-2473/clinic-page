// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
});

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target") || +counter.innerText;
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };

    // Set data-target if not already set
    if (!counter.getAttribute("data-target")) {
      counter.setAttribute("data-target", counter.innerText);
      counter.innerText = "0";
    }

    updateCount();
  });
}

// Intersection Observer for counter animation
const statsSection = document.querySelector(".stats");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

if (statsSection) {
  observer.observe(statsSection);
}

// Add loading animation
window.addEventListener("load", function () {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 0.5s ease-in-out";
});

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero::before");
  const speed = scrolled * 0.5;

  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Add hover effects to service cards
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add click effect to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple-effect");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add typing effect to hero title
function typeEffect() {
  const title = document.querySelector(".hero h1");
  const text = title.textContent;
  title.textContent = "";

  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      title.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, 100);
}

// Initialize typing effect after page load
setTimeout(typeEffect, 1000);

// Add floating animation to elements
function addFloatingAnimation() {
  const floatingElements = document.querySelectorAll(".floating-element");
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 2}s`;
    element.style.animationDuration = `${15 + index * 5}s`;
  });
}

addFloatingAnimation();

// Mobile menu close on link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false,
    });
    bsCollapse.hide();
  });
});

// Add scroll indicator
function addScrollIndicator() {
  const scrollIndicator = document.createElement("div");
  scrollIndicator.style.position = "fixed";
  scrollIndicator.style.top = "0";
  scrollIndicator.style.left = "0";
  scrollIndicator.style.width = "0%";
  scrollIndicator.style.height = "3px";
  scrollIndicator.style.background = "var(--gradient)";
  scrollIndicator.style.zIndex = "9999";
  scrollIndicator.style.transition = "width 0.3s ease";

  document.body.appendChild(scrollIndicator);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    scrollIndicator.style.width = scrollPercent + "%";
  });
}

addScrollIndicator();
