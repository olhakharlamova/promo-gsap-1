import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export function playBarAnimation() {
  const points = document.querySelectorAll(".point");

  points.forEach((point, i) => {
    const bar = point.querySelector(".bar");
    const label = point.querySelector(".label");
    const finalValue = parseInt(label.textContent.replace(/,/g, "")) || 0;

    // Reset label
    label.textContent = "0";
    label.style.opacity = "1"; // keep it visible

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: point,
        start: "top 80%",
        toggleActions: "restart reverse restart reverse"
      }
    });

    // Proxy object to animate the number
    const counter = { value: 0 };

    tl
      // Bar grows with a soft bounce
      .fromTo(bar,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.6,
          ease: "back.out(1.1)"
        }
      )

      // Label rises
      .fromTo(label,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.2)"
        },
        "-=0.8"
      )

      // Animate number with per-frame update
      .to(counter, {
        value: finalValue,
        duration: 1.4,
        ease: "power1.out",
        onUpdate: () => {
          const str = Math.floor(counter.value).toLocaleString();
          label.innerHTML = "";

          // Wrap each digit in a span for fading effect
          [...str].forEach((char, index) => {
            const span = document.createElement("span");
            span.textContent = char;
            span.style.opacity = "0";
            span.style.transition = `opacity 0.3s ease ${index * 0.05}s`;
            label.appendChild(span);

            // Trigger fade-in via next tick
            requestAnimationFrame(() => {
              span.style.opacity = "1";
            });
          });
        }
      }, "-=1.5");
  });
}