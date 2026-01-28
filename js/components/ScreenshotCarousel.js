import { useEffect, useState } from "https://esm.sh/react@18.2.0";
import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";

const html = htm.bind(React.createElement);

export const ScreenshotCarousel = ({ slides, onOpen }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, slides.length]);

  return html`
    <div className="relative w-full">
      <div
        className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-mirage/70"
        onMouseEnter=${() => setPaused(true)}
        onMouseLeave=${() => setPaused(false)}
      >
        ${slides.map(
          (slide, index) => html`
            <button
              type="button"
              className=${`absolute inset-0 transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              onClick=${() => onOpen(slide.src)}
              aria-label=${`Abrir ${slide.alt}`}
            >
              <img
                src=${slide.src}
                alt=${slide.alt}
                className="w-full h-full object-contain"
                loading=${index === 0 ? "eager" : "lazy"}
                onError=${event => {
                  event.currentTarget.src = "https://placehold.co/800x500/19202e/dae5ea?text=Imagen%20no%20disponible";
                }}
              />
            </button>
          `
        )}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        ${slides.map(
          (_, index) => html`
            <button
              className=${`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${index === current ? "bg-mystic" : "bg-mystic/30"}`}
              onClick=${() => setCurrent(index)}
              aria-label=${`Ir a captura ${index + 1}`}
            ></button>
          `
        )}
      </div>
    </div>
  `;
};
