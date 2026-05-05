"use strict";

/* Utility Functions */
function rot13(str) {
  return str.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(base + ((c.charCodeAt(0) - base + 13) % 26));
  });
}

function decodeAndInsertEmail() {
  const obfuscated =
    "WvA4AzD7WvA4AzL7WvA4AwZ7WaOypzyiMQfzV3t2LmfzV3t2BGfzV3t2ZGfzV3t2MQf8p3Ouow5gMJkiMUx8Y3AjLJ4+WvA4Awp7WzAioJ1uqQfzV3t2ZGfzV3t3ZQfzV3t2BQfzV3t2ZmfzV3t2BGfzV3t2MQf8p3Ouow5jo25xCP9mpTShCvLwrQpmBlLwrQMyBlLwrQL5BlLwrQMvBlLwrQMyBlLwrQL1BlLwrQMuBjb";
  const decoded = atob(rot13(obfuscated));
  document.getElementById("riversong").innerHTML = decoded;
}

function setCopyrightYear() {
  document.getElementById("copyrightYear").textContent =
    new Date().getFullYear();
}

/* UI Effects */
function setupNavbar(navbar) {
  let scrolled = false;
  let ticking = false;

  const updateNavbar = () => {
    const shouldScroll = window.scrollY >= navbar.offsetHeight;
    if (shouldScroll === scrolled) {
      ticking = false;
      return;
    }
    scrolled = shouldScroll;

    if (scrolled) {
      navbar.classList.remove("bg-transparent");
      navbar.classList.add("bg-body", "shadow");
      navbar.removeAttribute("data-bs-theme");
    } else {
      navbar.classList.remove("bg-body", "shadow");
      navbar.classList.add("bg-transparent");
      navbar.setAttribute("data-bs-theme", "dark");
    }
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  };

  updateNavbar();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupParallax(parallaxes) {
  let ticking = false;
  const items = Array.from(parallaxes).map((el) => ({
    el,
    offsetTop: el.offsetTop,
  }));

  const updateParallax = () => {
    const scrollY = window.scrollY;
    for (const { el, offsetTop } of items) {
      el.style.backgroundPositionY = `${(scrollY - offsetTop) / 3}px`;
    }
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  updateParallax();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupLightbox(lightBox) {
  lightBox.addEventListener("show.bs.modal", (event) => {
    const fullImageSrc = event.relatedTarget.src.replace(
      /small\/(?:old|webp)\//,
      "",
    );
    document.getElementById("lightBoxImage").src = fullImageSrc;
  });
}

function setupScrollSpyRefresh() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".nav-link")) {
      setTimeout(() => {
        bootstrap.ScrollSpy.getInstance(document.body)?.refresh();
      }, 300);
    }
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
