gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  // Wait until everything is painted, then run animations
  gsap.from(".integration-card", {
    x: 150,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".integration-container",
      start: "top 100%",
      end: "bottom 60%",
      scrub: true,
    }
  });

  // Force GSAP to refresh layout after paint
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);
});

// ✅ Minimal popup open handler
document.addEventListener("click", e => {
  if (e.target.closest(".integration-card:first-child .connect-btn")) {
    document.getElementById("popupMsg").style.display = "block";
  }
});
