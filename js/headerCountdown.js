function headerCountdown() {
  const countdownDate = new Date("2025-10-15T23:59:59").getTime();

  function updateHeaderCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance <= 0) {
      document.querySelector(".header-countdown .time").innerText = "LAUNCHED 🚀";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("header-days").innerText = days.toString().padStart(2, "0");
    document.getElementById("header-hours").innerText = hours.toString().padStart(2, "0");
    document.getElementById("header-minutes").innerText = minutes.toString().padStart(2, "0");
    document.getElementById("header-seconds").innerText = seconds.toString().padStart(2, "0");
  }

  updateHeaderCountdown();
  setInterval(updateHeaderCountdown, 1000);
}
