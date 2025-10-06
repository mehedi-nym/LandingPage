gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".integration-card").forEach((card, i) => {
  // Create timeline for each card
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: "top 90%",       // when the card comes near viewport bottom
      end: "top 50%",         // when the card reaches middle of viewport
      scrub: true,            // enables smooth play and reverse on scroll
      toggleActions: "play reverse play reverse",
    }
  });

  // from right → to visible, and reverse on scroll up
  tl.fromTo(
    card,
    { x: 150, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: i * 0.15 }
  );
});
