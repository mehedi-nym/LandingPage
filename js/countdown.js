function initCountdown() {
  const countdownDate = new Date("2025-10-15T23:59:59").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    if (distance < 0) return;

    document.getElementById("days").innerText = Math.floor(distance / (1000*60*60*24));
    document.getElementById("hours").innerText = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    document.getElementById("minutes").innerText = Math.floor((distance % (1000*60*60)) / (1000*60));
    document.getElementById("seconds").innerText = Math.floor((distance % (1000*60)) / 1000);
  }, 1000);

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".countdown-icons img").forEach((icon, i) => {
    gsap.fromTo(icon,
      { opacity: 0, x: i % 2 === 0 ? -150 : 150, y: -50 + i*10, scale: 0.5 },
      {
        opacity: 1, x: 0, y: 0, scale: 1,
        duration: 1.2, delay: i*0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".countdown-section", start: "top 90%" },
        onComplete: () => {
          gsap.to(icon, { y: "+=12", repeat: -1, yoyo: true, duration: 2.5, ease: "sine.inOut" });
        }
      }
    );
  });
}

// Load countdown.html and initialize
fetch("countdown.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("countdown").innerHTML = data;
    initCountdown();
  });
