/* ============================================================
   HEADER & FOOTER LOADER
   ============================================================ */
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

loadPart('header', 'header.html', () => { headerCountdown(); });
// loader.js (after injecting header.html)
fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;

    // ✅ initialize hamburger menu script
    const script = document.createElement("script");
    script.src = "js/menuToggle.js";
    document.body.appendChild(script);
  });

loadPart('footer', 'footer.html');
