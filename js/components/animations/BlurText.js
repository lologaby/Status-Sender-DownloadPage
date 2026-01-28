import { useEffect, useMemo, useRef, useState } from "https://esm.sh/react@18.2.0";
import { motion } from "https://esm.sh/motion@11.11.13/react";
import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";

const html = htm.bind(React.createElement);

export const BlurText = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35,
  reducedMotion = false
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reducedMotion]);

  const defaultFrom = useMemo(
    () => (direction === "top" ? { filter: "blur(10px)", opacity: 0, y: -50 } : { filter: "blur(10px)", opacity: 0, y: 50 }),
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
      { filter: "blur(0px)", opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  if (reducedMotion) {
    return html`<span className=${className}>${text}</span>`;
  }

  return html`
    <span ref=${ref} className=${className} aria-label=${text}>
      ${elements.map((segment, index) => {
        const animateKeyframes = {};
        const keys = new Set([...Object.keys(fromSnapshot), ...toSnapshots.flatMap(s => Object.keys(s))]);
        keys.forEach(k => {
          animateKeyframes[k] = [fromSnapshot[k], ...toSnapshots.map(s => s[k])];
        });
        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };
        return html`
          <${motion.span}
            style=${{ display: "inline-block", willChange: "transform, filter, opacity" }}
            initial=${fromSnapshot}
            animate=${inView ? animateKeyframes : fromSnapshot}
            transition=${spanTransition}
            onAnimationComplete=${onAnimationComplete}
          >
            ${segment === " " ? "\u00A0" : segment}${animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
          </${motion.span}>
        `;
      })}
    </span>
  `;
};
