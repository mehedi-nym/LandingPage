/* ============================================================
   6. SCROLL HINT
   ============================================================ */
const scrollHint = document.getElementById('scrollHint');

function getCurrentSectionIndex() {
  let index = 0;
  sections.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
      index = i;
    }
  });
  return index;
}

scrollHint.addEventListener('click', () => {
  const currentIndex = getCurrentSectionIndex();
  const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
  const nextSection = sections[nextIndex];
  if (nextSection) {
    gsap.to(window, { duration: 1, scrollTo: nextSection, autoKill: true });
  }
});

window.addEventListener('scroll', () => {
  const currentIndex = getCurrentSectionIndex();
  scrollHint.style.display = (currentIndex === sections.length - 1) ? 'none' : 'block';
});
