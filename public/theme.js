(function () {
  let stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch {
    /* storage unavailable */
  }
  if (stored !== "dark" && stored !== "light") {
    stored = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.mode = stored;
  document.documentElement.style.colorScheme = stored;
})();
