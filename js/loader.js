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

  // ✅ Define popup files by button order
  const popupFiles = [
    "popup-simple.html",   // 1st button - Simple & Easy
    "popup-future.html",   // 2nd - Join the Future
    "popup-form.html",     // 3rd - One Application Form ✅
    "popup-draft.html",    // 4th - Need more time?
    "popup-delivery.html", // 5th - Docs Pickup & Delivery
    "popup-dynamic.html"   // 6th - Most Dynamic Solution
  ];

  // Ensure popup container exists
  let popupContainer = document.getElementById("popup-container");
  if (!popupContainer) {
    popupContainer = document.createElement("div");
    popupContainer.id = "popup-container";
    document.body.appendChild(popupContainer);
  }

  // ✅ Main click handler
  document.addEventListener("click", async (e) => {
    // Close popup
    if (e.target.id === "popupClose") {
      const popup = document.getElementById("popupMsg");
      if (popup) popup.remove();
      return;
    }

    // Open popup
    const btn = e.target.closest(".connect-btn");
    if (!btn) return;

    const allBtns = [...document.querySelectorAll(".connect-btn")];
    const index = allBtns.indexOf(btn);
    const popupFile = popupFiles[index] || "popup-simple.html";

    try {
      const response = await fetch(popupFile, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Failed to load ${popupFile}`);

      const html = await response.text();
      popupContainer.innerHTML = html;

      // If popup has #popupMsg, show it; else just render as-is
      const popup = document.getElementById("popupMsg");
      if (popup) popup.style.display = "block";

      console.log(`✅ Loaded ${popupFile}`);
    } catch (err) {
      console.error("❌ Popup load error:", err);
    }
  });
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
