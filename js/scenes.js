/* ============================================================
   2. SCENES (VIDEO CONTROL + TEXT ANIMATIONS)
   ============================================================ */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.querySelectorAll('.video-section video').forEach(vid => {
  vid.muted = true;        // start muted
  vid.volume = 0.2;        // limit sound
});

window.addEventListener('click', () => {
  document.querySelectorAll('.video-section video').forEach(vid => {
    vid.muted = false;
  });
}, { once: true });

// Helper safe play
function safePlay(video) {
  if (!video) return;
  if (video.muted === false) video.muted = true;
  const p = video.play();
  if (p && typeof p.catch === 'function') p.catch(e => console.warn('play prevented', e));
}

/* ---------- Scene 1 ---------- */
const scene1 = document.getElementById('scene-1');
const vid1 = document.getElementById('vid-scene-1');
ScrollTrigger.create({
  trigger: scene1, start: 'top center', end: 'bottom center',
  onEnter: () => safePlay(vid1), onEnterBack: () => safePlay(vid1),
  onLeave: () => vid1.pause(), onLeaveBack: () => vid1.pause(),
});

gsap.from('.scene-title', {
  y: -80, opacity: 0, duration: 1.05, ease: 'power3.out',
  scrollTrigger: { trigger: scene1, start: 'top 80%', toggleActions: 'play none none reverse' }
});
gsap.from('#scene-1 .overlay p', {
  y: 40, opacity: 0, duration: .9,
  scrollTrigger: { trigger: scene1, start: 'top 78%', toggleActions: 'play none none reverse' }
});

/* ---------- Scene 2 ---------- */
const scene2 = document.getElementById('scene-2');
const vid2 = document.getElementById('vid-scene-2');
ScrollTrigger.create({
  trigger: scene2, start: 'top center', end: 'bottom center',
  onEnter: () => safePlay(vid2), onEnterBack: () => safePlay(vid2),
  onLeave: () => vid2.pause(), onLeaveBack: () => vid2.pause()
});
gsap.from('.scene-title-right', {
  x: 200, opacity: 0, duration: 1.05, ease: 'power3.out',
  scrollTrigger: { trigger: scene2, start: 'top 80%', toggleActions: 'play none none reverse' }
});
gsap.from('#scene-2 .overlay p', {
  y: 40, opacity: 0, duration: .9,
  scrollTrigger: { trigger: scene2, start: 'top 78%', toggleActions: 'play none none reverse' }
});

/* ---------- Scene 2.5 ---------- */
const scene25 = document.getElementById('scene-2-5');
const vid25 = document.getElementById('vid-scene-2-5');
ScrollTrigger.create({
  trigger: scene25, start: 'top center', end: 'bottom center',
  onEnter: () => safePlay(vid25), onEnterBack: () => safePlay(vid25),
  onLeave: () => vid25.pause(), onLeaveBack: () => vid25.pause(),
});
gsap.from('#scene-2-5 .title', {
  x: 150, opacity: 0, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '#scene-2-5', start: 'top 80%', toggleActions: 'play none none reverse' }
});

/* ---------- Scene 3 ---------- */
const scene3 = document.getElementById('scene-3');
const vid3 = document.getElementById('vid-scene-3');
ScrollTrigger.create({
  trigger: scene3, start: 'top center', end: 'bottom center',
  onEnter: () => safePlay(vid3), onEnterBack: () => safePlay(vid3),
  onLeave: () => vid3.pause(), onLeaveBack: () => vid3.pause()
});
gsap.from('#scene-3 .overlay p', {
  opacity: 0, y: 20, duration: 1,
  scrollTrigger: { trigger: scene3, start: 'top 80%', toggleActions: 'play none none reverse' }
});

// mute button
const muteBtn = document.getElementById('muteToggle');
let isMuted = false;
muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  document.querySelectorAll('.video-section video').forEach(vid => { vid.muted = isMuted; });
  muteBtn.textContent = isMuted ? 'Unmute' : 'Mute';
});
