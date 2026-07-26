/* Colour-mode toggle. The pre-paint inline script in head.html has already
   applied any saved choice; this only wires the button and keeps the icon in
   sync. */
(function () {
  "use strict";

  var root = document.documentElement;
  var button = document.querySelector("[data-dk-theme-toggle]");
  if (!button) return;

  var moonIcon = button.querySelector("[data-dk-icon-dark]");
  var sunIcon = button.querySelector("[data-dk-icon-light]");

  function effectiveTheme() {
    var explicit = root.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function paint(theme) {
    var isDark = theme === "dark";
    // Show the action, not the state: in dark mode you offer the sun.
    if (moonIcon) moonIcon.hidden = isDark;
    if (sunIcon) sunIcon.hidden = !isDark;
    button.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  button.addEventListener("click", function () {
    var next = effectiveTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("dk-theme", next);
    } catch (e) {}
    paint(next);
  });

  // Track the OS only while the user has not made an explicit choice.
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", function () {
      if (!root.getAttribute("data-theme")) paint(effectiveTheme());
    });

  paint(effectiveTheme());
})();
