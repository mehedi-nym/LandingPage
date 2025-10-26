// ===============================
// Helper: Load an HTML Part
// ===============================
async function loadPart(id, file, callback) {
  try {
    const response = await fetch(file, { cache: "no-cache" });
    if (!response.ok) return console.error(`Failed to load: ${file}`);
    const html = await response.text();
    const container = document.getElementById(id);
    if (container) container.innerHTML = html;

    if (callback && typeof callback === "function") callback();
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}

// ===============================
// Load Mid Section
// ===============================
(async () => {
  await loadPart("mid-section", "mid-section.html");

  // Load CSS dynamically
  const midStyle = document.createElement("link");
  midStyle.rel = "stylesheet";
  midStyle.href = "mid-section.css";
  document.head.appendChild(midStyle);

  // Load JS after HTML is ready
  const midScript = document.createElement("script");
  midScript.src = "mid-section.js";
  midScript.defer = true;
  midScript.onload = () => {
    console.log("✅ mid-section.js loaded");

    // ✅ Attach popup logic *after* mid-section has loaded
    const popupBtn = document.querySelector(".integration-card:first-child .connect-btn");
    if (popupBtn) {
      popupBtn.addEventListener("click", () => {
        const popup = document.getElementById("popupMsg");
        if (popup) popup.style.display = "block";
      });
    }

    // ✅ Add close handler
    document.addEventListener("click", (e) => {
      if (e.target && e.target.id === "popupClose") {
        document.getElementById("popupMsg").style.display = "none";
      }
    });
  };

  midScript.onerror = () => console.error("❌ mid-section.js failed to load");
  document.body.appendChild(midScript);
})();

// ===============================
// Load Header
// ===============================
loadPart("header", "header.html", () => {
  if (typeof headerCountdown === "function") headerCountdown();

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
      darkmode ? disableDarkMode() : enableDarkMode();
    });
  }

  // ✅ Initialize hamburger menu script
  const menuScript = document.createElement("script");
  menuScript.src = "js/menuToggle.js";
  menuScript.defer = true;
  document.body.appendChild(menuScript);
});

// ===============================
// Load Footer
// ===============================
loadPart("footer", "footer.html");
