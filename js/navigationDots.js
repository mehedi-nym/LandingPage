/* ============================================================
   4. SECTION NAVIGATION DOTS
   ============================================================ */
const dots = document.querySelectorAll('.scroll-nav .dot');
const sections = document.querySelectorAll('.section');

function setActiveDot(index) {
  dots.forEach(d => d.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

ScrollTrigger.create({
  trigger: scene1,
  start: 'top center', end: 'bottom center',
  onEnter: () => setActiveDot(0),
  onEnterBack: () => setActiveDot(0)
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    gsap.to(window, { duration: 1, scrollTo: { y: dot.dataset.target, autoKill: true } });
  });
});

if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('video').forEach(v => v.pause());
  document.getElementById('scrollHint').textContent = 'Reduced motion — videos paused';
}

window.addEventListener('touchstart', () => { safePlay(vid1); }, { once: true });
