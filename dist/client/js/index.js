"use strict";

/* Utility Functions */
function rot13(str) {
  return str.replace(/[a-zA-Z]/g, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(base + ((c.charCodeAt(0) - base + 13) % 26));
  });
}

function decodeAndInsertEmail() {
  const obfuscated = 'WvA4AzD7WvA4AzL7WvA4AwZ7WaOypzyiMQfzV3t2LmfzV3t2BGfzV3t2ZGfzV3t2MQf8p3Ouow5gMJkiMUx8Y3AjLJ4+WvA4Awp7WzAioJ1uqQfzV3t2ZGfzV3t3ZQfzV3t2BQfzV3t2ZmfzV3t2BGfzV3t2MQf8p3Ouow5jo25xCP9mpTShCvLwrQpmBlLwrQMyBlLwrQL5BlLwrQMvBlLwrQMyBlLwrQL1BlLwrQMuBjb';
  const decoded = atob(rot13(obfuscated));
  document.getElementById("riversong").innerHTML = decoded;
}

function setCopyrightYear() {
  const year = new Date().getFullYear();
  document.getElementById('copyrightYear').textContent = year;
}

/* UI Effects */
function setupNavbar(navbar) {
  const updateNavbar = () => {
    if (window.pageYOffset >= navbar.offsetHeight) {
      navbar.classList.remove("bg-transparent");
      navbar.classList.add("bg-body", "shadow");
      navbar.removeAttribute('data-bs-theme');
    } else {
      navbar.classList.remove("bg-body", "shadow");
      navbar.classList.add("bg-transparent");
      navbar.setAttribute('data-bs-theme', 'dark');
    }
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar);
}

function setupParallax(parallaxes) {
  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.pageYOffset;
    parallaxes.forEach(el => {
      const offsetTop = el.offsetTop;
      el.style.backgroundPositionY = `${(scrollY - offsetTop) / 3}px`;
    });
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  updateParallax();
  window.addEventListener("scroll", onScroll);
}

function setupLightbox(lightBox) {
  lightBox.addEventListener('show.bs.modal', event => {
    const fullImageSrc = event.relatedTarget.src.replace(/small\/old\/|small\/webp\//, "");
    document.getElementById("lightBoxImage").src = fullImageSrc;
  });
}

function setupScrollSpyRefresh() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        bootstrap.ScrollSpy.getInstance(document.body)?.refresh();
      }, 300);
    });
  });
}

/* Main */
document.addEventListener("DOMContentLoaded", () => {
  setCopyrightYear();
  decodeAndInsertEmail();

  const navbar = document.getElementById("navbar");
  const parallaxes = document.querySelectorAll(".parallax");
  const lightBox = document.getElementById("lightBox");

  setupNavbar(navbar);
  setupParallax(parallaxes);
  setupLightbox(lightBox);
  setupScrollSpyRefresh();
});