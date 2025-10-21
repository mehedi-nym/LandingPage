/* ============================================================
   2. SCENES (VIDEO CONTROL + TEXT ANIMATIONS)
   ============================================================ */
   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

   /* ---------- Setup All Videos ---------- */
   document.querySelectorAll('.video-section video').forEach(vid => {
     vid.muted = true;
     vid.volume = 0.6;
     vid.dataset.playCount = 0;
     vid.dataset.locked = 'false';
   });
   
   // Unmute on first click (browser requirement)
   window.addEventListener('click', () => {
     document.querySelectorAll('.video-section video').forEach(vid => vid.muted = false);
   }, { once: true });
   
   function safePlay(video) {
     if (!video) return;
     const playPromise = video.play();
     if (playPromise && playPromise.catch) {
       playPromise.catch(() => console.warn('Autoplay prevented'));
     }
   }
   
   /* ============================================================
      CONTROL FUNCTION: Limit play to 2 times + optional auto scroll
      ============================================================ */
   function handleVideoControl(video, nextSectionId) {
     video.addEventListener('ended', () => {
       let count = parseInt(video.dataset.playCount) + 1;
       video.dataset.playCount = count;
   
       // When video ends twice
       if (count >= 2 && video.dataset.locked === 'false') {
         video.dataset.locked = 'true';
         video.pause();
   
         // Optional auto scroll to next section
         if (nextSectionId) {
           const next = document.querySelector(nextSectionId);
           if (next) {
             setTimeout(() => {
               gsap.to(window, {
                 scrollTo: { y: next, offsetY: 0 },
                 duration: 1.2,
                 ease: 'power2.inOut'
               });
             }, 400);
           }
         }
       }
     });
   
     // Allow manual replay by click
     video.addEventListener('click', () => {
       if (video.dataset.locked === 'true') {
         video.dataset.locked = 'false';
         video.dataset.playCount = 0;
         safePlay(video);
       }
     });
   }
   
   /* ============================================================
      SCENE 1
      ============================================================ */
   const scene1 = document.getElementById('scene-1');
   const vid1 = document.getElementById('vid-scene-1');
   ScrollTrigger.create({
     trigger: scene1,
     start: 'top center',
     end: 'bottom center',
     onEnter: () => { if (vid1.dataset.locked === 'false') safePlay(vid1); },
     onEnterBack: () => { if (vid1.dataset.locked === 'false') safePlay(vid1); },
     onLeave: () => vid1.pause(),
     onLeaveBack: () => vid1.pause()
   });
   handleVideoControl(vid1, '#scene-2');
   
   gsap.from('.scene-title', {
     y: -80, opacity: 0, duration: 1.05, ease: 'power3.out',
     scrollTrigger: { trigger: scene1, start: 'top 80%', toggleActions: 'play none none reverse' }
   });
   gsap.from('#scene-1 .overlay p', {
     y: 40, opacity: 0, duration: .9,
     scrollTrigger: { trigger: scene1, start: 'top 78%', toggleActions: 'play none none reverse' }
   });
   
   /* ============================================================
      SCENE 2
      ============================================================ */
   const scene2 = document.getElementById('scene-2');
   const vid2 = document.getElementById('vid-scene-2');
   ScrollTrigger.create({
     trigger: scene2,
     start: 'top center',
     end: 'bottom center',
     onEnter: () => { if (vid2.dataset.locked === 'false') safePlay(vid2); },
     onEnterBack: () => { if (vid2.dataset.locked === 'false') safePlay(vid2); },
     onLeave: () => vid2.pause(),
     onLeaveBack: () => vid2.pause()
   });
   handleVideoControl(vid2, '#scene-2-5');
   
   gsap.from('.scene-title-right', {
     x: 200, opacity: 0, duration: 1.05, ease: 'power3.out',
     scrollTrigger: { trigger: scene2, start: 'top 80%', toggleActions: 'play none none reverse' }
   });
   gsap.from('#scene-2 .overlay p', {
     y: 40, opacity: 0, duration: .9,
     scrollTrigger: { trigger: scene2, start: 'top 78%', toggleActions: 'play none none reverse' }
   });
   
   /* ============================================================
      SCENE 2.5
      ============================================================ */
   const scene25 = document.getElementById('scene-2-5');
   const vid25 = document.getElementById('vid-scene-2-5');
   ScrollTrigger.create({
     trigger: scene25,
     start: 'top center',
     end: 'bottom center',
     onEnter: () => { if (vid25.dataset.locked === 'false') safePlay(vid25); },
     onEnterBack: () => { if (vid25.dataset.locked === 'false') safePlay(vid25); },
     onLeave: () => vid25.pause(),
     onLeaveBack: () => vid25.pause()
   });
   handleVideoControl(vid25, '#scene-3');
   
   gsap.from('#scene-2-5 .title', {
     x: 150, opacity: 0, duration: 1, ease: 'power3.out',
     scrollTrigger: { trigger: '#scene-2-5', start: 'top 80%', toggleActions: 'play none none reverse' }
   });
   
   /* ============================================================
      SCENE 3
      ============================================================ */
   const scene3 = document.getElementById('scene-3');
   const vid3 = document.getElementById('vid-scene-3');
   ScrollTrigger.create({
     trigger: scene3,
     start: 'top center',
     end: 'bottom center',
     onEnter: () => { if (vid3.dataset.locked === 'false') safePlay(vid3); },
     onEnterBack: () => { if (vid3.dataset.locked === 'false') safePlay(vid3); },
     onLeave: () => vid3.pause(),
     onLeaveBack: () => vid3.pause()
   });
   handleVideoControl(vid3, null); // last one, no scroll
   
   gsap.from('#scene-3 .overlay p', {
     opacity: 0, y: 20, duration: 1,
     scrollTrigger: { trigger: scene3, start: 'top 80%', toggleActions: 'play none none reverse' }
   });
   
   /* ============================================================
      MUTE TOGGLE
      ============================================================ */
   const muteBtn = document.getElementById('muteToggle');
   let isMuted = false;
   muteBtn.addEventListener('click', () => {
     isMuted = !isMuted;
     document.querySelectorAll('.video-section video').forEach(vid => vid.muted = isMuted);
     muteBtn.textContent = isMuted ? 'Unmute' : 'Mute';
   });
   