async function loadPart(id, file, callback) {
  try {
    const r = await fetch(file);
    if (!r.ok) return;
    const html = await r.text();
    document.getElementById(id).innerHTML = html;

    if (callback && typeof callback === "function") callback();
  } catch (e) {
    console.error(e);
  }
}

// Load header
loadPart("header", "header.html", () => {
  headerCountdown();

  // Dark mode toggle
  let darkmode = localStorage.getItem("darkmode") === "true";
  const toggle = document.getElementById("modeToggle");
  
  const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "true");
    darkmode = true;
  };

  const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", "false");
    darkmode = false;
  };

  if (darkmode) enableDarkMode();

  if (toggle) {
    toggle.addEventListener("click", () => {
      darkmode = localStorage.getItem("darkmode") === "true";
      darkmode !== true ? enableDarkMode() : disableDarkMode();
    });
  }

  // ✅ initialize hamburger menu script
  const script = document.createElement("script");
  script.src = "js/menuToggle.js";
  document.body.appendChild(script);
});

// Load footer
loadPart("footer", "footer.html");
