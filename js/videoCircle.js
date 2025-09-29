/* ============================================================
   3. VIDEO HOVER CIRCLE (PLAY/PAUSE INDICATOR)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const circle = document.getElementById("videoCircle");
  const videos = document.querySelectorAll(".video-section video");

  videos.forEach(video => {
    video.addEventListener("mouseenter", () => {
      circle.style.opacity = 1;
      circle.textContent = video.paused ? "Play" : "Pause";
    });

    video.addEventListener("mouseleave", () => {
      circle.style.opacity = 0;
    });

    video.addEventListener("mousemove", (e) => {
      const rect = video.getBoundingClientRect();
      let x = Math.max(rect.left, Math.min(e.clientX, rect.right));
      let y = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
      circle.style.left = x + "px";
      circle.style.top = y + "px";
    });

    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        circle.textContent = "Pause";
      } else {
        video.pause();
        circle.textContent = "Play";
      }
    });
  });
});
