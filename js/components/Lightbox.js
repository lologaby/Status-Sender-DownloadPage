import { useEffect } from "https://esm.sh/react@18.2.0";
import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";

const html = htm.bind(React.createElement);

export const Lightbox = ({ src, onClose }) => {
  useEffect(() => {
    if (!src) return;
    const onKey = event => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  if (!src) return null;

  return html`
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
      role="dialog"
      aria-modal="true"
      onClick=${onClose}
    >
      <button className="absolute top-6 right-6 text-3xl text-white/80 hover:text-white" onClick=${onClose} aria-label="Cerrar">
        &times;
      </button>
      <img
        src=${src}
        alt="Captura ampliada"
        className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl rounded-xl"
        onClick=${event => event.stopPropagation()}
      />
    </div>
  `;
};
