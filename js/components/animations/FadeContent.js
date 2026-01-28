import { useEffect, useRef } from "https://esm.sh/react@18.2.0";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";
import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";

const html = htm.bind(React.createElement);

export const FadeContent = ({
  children,
  container,
  blur = false,
  duration = 1000,
  ease = "power2.out",
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = "power2.in",
  onComplete,
  onDisappearanceComplete,
  className = "",
  reducedMotion = false,
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    let scrollerTarget = container || document.getElementById("snap-main-container") || null;
    if (typeof scrollerTarget === "string") {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const startPct = (1 - threshold) * 100;
    const getSeconds = val => (val > 10 ? val / 1000 : val);

    gsap.set(el, {
      autoAlpha: initialOpacity,
      filter: blur ? "blur(10px)" : "blur(0px)",
      willChange: "opacity, filter, transform"
    });

    const tl = gsap.timeline({
      paused: true,
      delay: getSeconds(delay),
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            autoAlpha: initialOpacity,
            filter: blur ? "blur(10px)" : "blur(0px)",
            delay: getSeconds(disappearAfter),
            duration: getSeconds(disappearDuration),
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      autoAlpha: 1,
      filter: "blur(0px)",
      duration: getSeconds(duration),
      ease: ease
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play()
    });

    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf(el);
    };
  }, []);

  return html`
    <div ref=${ref} className=${className} ...${props}>
      ${children}
    </div>
  `;
};
