document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".video-section video");

  videos.forEach(video => {
    const circle = document.createElement("div");
    circle.className = "video-circle";
    document.body.appendChild(circle);

    video.addEventListener("mouseenter", () => {
      circle.style.opacity = 1;
      circle.textContent = video.paused ? "Play" : "Pause";
    });

    video.addEventListener("mouseleave", () => {
      circle.style.opacity = 0;
    });

    video.addEventListener("mousemove", (e) => {
      circle.style.left = e.clientX + "px";
      circle.style.top = e.clientY + "px";
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
