(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) return storedTheme;
    return prefersDark.matches ? "dark" : "light";
  };

  const setTheme = (theme) => {
    if (theme === "auto") {
      document.documentElement.setAttribute(
        "data-bs-theme",
        prefersDark.matches ? "dark" : "light",
      );
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  const themeSwitcher = document.querySelector("#bd-theme");
  const themeSwitcherText = document.querySelector("#bd-theme-text");
  const activeThemeIcon = document.querySelector(".theme-icon-active use");

  const showActiveTheme = (theme, focus = false) => {
    if (!themeSwitcher) return;

    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`,
    );
    if (!btnToActive) return;

    const svgOfActiveBtn = btnToActive
      .querySelector("svg use")
      ?.getAttribute("href");

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });

    btnToActive.classList.add("active");
    btnToActive.setAttribute("aria-pressed", "true");
    activeThemeIcon?.setAttribute("href", svgOfActiveBtn);
    themeSwitcher.setAttribute(
      "aria-label",
      `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`,
    );

    if (focus) themeSwitcher.focus();
  };

  prefersDark.addEventListener("change", () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== "light" && storedTheme !== "dark") {
      setTheme(getPreferredTheme());
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    document.addEventListener("click", (e) => {
      const toggle = e.target.closest("[data-bs-theme-value]");
      if (!toggle) return;

      const theme = toggle.dataset.bsThemeValue;
      setStoredTheme(theme);
      setTheme(theme);
      showActiveTheme(theme, true);
    });
  });
})();
