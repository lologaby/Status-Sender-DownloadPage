import { useEffect, useRef } from "https://esm.sh/react@18.2.0";
import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";

const html = htm.bind(React.createElement);

export const BmcButton = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
    script.dataset.name = "bmc-button";
    script.dataset.slug = "berr.io";
    script.dataset.color = "#4da6c1";
    script.dataset.emoji = "";
    script.dataset.font = "Cookie";
    script.dataset.text = "Págate los Café";
    script.dataset.outlineColor = "#000000";
    script.dataset.fontColor = "#000000";
    script.dataset.coffeeColor = "#FFDD00";
    containerRef.current.appendChild(script);
  }, []);

  return html`<div ref=${containerRef}></div>`;
};
