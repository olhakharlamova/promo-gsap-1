import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function playBarAnimation() {
  const bars = [
    {
      id: "#bar7000",
      label: '#group-other-clinics .svg-label.secondary-color tspan'
    },
    {
      id: "#bar3849",
      label: '#group-discovery-dental .svg-label.main-color tspan'
    }
  ];

  bars.forEach((barObj, index) => {
    const bar = document.querySelector(barObj.id);
    const labelSpans = document.querySelectorAll(barObj.label);

    if (!bar || !labelSpans.length) return;

    // Reset styles
    gsap.set(bar, { transformOrigin: "bottom", scaleY: 0 });
    gsap.set(labelSpans, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bar,
        start: "top 70%",
        toggleActions: "play reverse play reverse"
      }
    });

    // Bar grows
    tl.to(bar, {
      scaleY: 1,
      duration: 1.2,
      ease: "back.out(1.1)"
    });

    // Stagger label reveal
    tl.to(labelSpans, {
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "power1.out"
    }, "-=0.6"); // start label fade-in before bar finishes
  });
}