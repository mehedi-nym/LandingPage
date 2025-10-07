gsap.registerPlugin(ScrollTrigger);

gsap.from(".integration-card", {
  x: 150,
  opacity: 0,
  duration: 0.6,
  ease: "power3.out",
  stagger: 0.3, // one-by-one sequence
  scrollTrigger: {
    trigger: ".integration-container",
    start: "top 100%", // start animation when section enters
    end: "bottom 60%",
    scrub: true,
  }
});
