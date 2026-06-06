(function () {
  let stored = localStorage.getItem("theme");
  if (stored !== "dark" && stored !== "light") {
    stored = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.colorScheme = stored;
  document.documentElement.style.colorScheme = stored;
})();
