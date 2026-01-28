import React, { useEffect, useMemo, useRef, useState } from "https://esm.sh/react@18.2.0";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import htm from "https://esm.sh/htm@3.1.1";

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
  easing = "power2.out",
  onAnimationComplete,
  stepDuration = 0.35,
  reducedMotion = false
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
  const spansRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(containerRef.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reducedMotion]);

  useEffect(() => {
    if (!inView || reducedMotion || !containerRef.current) return;

    const defaultFrom = direction === "top" 
      ? { filter: "blur(10px)", opacity: 0, y: -50 } 
      : { filter: "blur(10px)", opacity: 0, y: 50 };
    
    const defaultTo = [
      { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
      { filter: "blur(0px)", opacity: 1, y: 0 }
    ];

    const fromSnapshot = animationFrom ?? defaultFrom;
    const toSnapshots = animationTo ?? defaultTo;

    const spans = spansRef.current.filter(Boolean);
    if (spans.length === 0) return;

    // Set initial state
    gsap.set(spans, {
      filter: fromSnapshot.filter || "blur(10px)",
      opacity: fromSnapshot.opacity || 0,
      y: fromSnapshot.y || (direction === "top" ? -50 : 50),
      willChange: "transform, filter, opacity"
    });

    // Animate each span with stagger
    const timeline = gsap.timeline({
      onComplete: () => {
        if (onAnimationComplete) onAnimationComplete();
      }
    });

    spans.forEach((span, index) => {
      const stepDelay = (index * delay) / 1000;
      toSnapshots.forEach((step, stepIndex) => {
        timeline.to(
          span,
          {
            filter: step.filter,
            opacity: step.opacity,
            y: step.y,
            duration: stepDuration,
            ease: easing
          },
          stepDelay + stepIndex * stepDuration
        );
      });
    });
  }, [inView, reducedMotion, direction, delay, stepDuration, easing, animationFrom, animationTo, onAnimationComplete]);

  if (reducedMotion) {
    return html`<span className=${className}>${text}</span>`;
  }

  return html`
    <span ref=${containerRef} className=${className} aria-label=${text}>
      ${elements.map((segment, index) => {
        return html`
          <span
            ref=${el => {
              if (el) spansRef.current[index] = el;
            }}
            style=${{ display: "inline-block" }}
          >
            ${segment === " " ? "\u00A0" : segment}${animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
          </span>
        `;
      })}
    </span>
  `;
};
