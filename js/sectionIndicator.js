/* ============================================================
   5. SECTION INDICATOR (Dynamic Dots with IntersectionObserver)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const indicator = document.getElementById('scrollIndicator');

  sections.forEach((sec, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      gsap.to(window, { duration: 1, scrollTo: sec, ease: "power2.inOut" });
    });
    indicator.appendChild(dot);
  });

  const dots = indicator.querySelectorAll('.dot');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = [...sections].indexOf(entry.target);
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(sec => observer.observe(sec));
});
