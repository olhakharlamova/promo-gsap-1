import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export function playBarAnimation() {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar, i) => {
    gsap.set(bar, { scaleY: 0 });
    gsap.to(bar, {
      scaleY: 1,
      duration: 1.2,
      delay: i * 0.2,
      ease: "power2.out"
    });
  });
}

