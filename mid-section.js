// ✅ Minimal popup open handler
document.addEventListener("click", e => {
  // Checks if the clicked element is inside the connect button of the first card
  if (e.target.closest(".integration-card:first-child .connect-btn")) {
    document.getElementById("popupMsg").style.display = "block";
  }
});