import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";
import { FadeContent } from "./animations/FadeContent.js";

const html = htm.bind(React.createElement);

export const CreditsModal = ({ open, onClose, reducedMotion }) => {
  if (!open) return null;
  return html`
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4" role="dialog" aria-modal="true">
      <${FadeContent} className="w-full max-w-lg" reducedMotion=${reducedMotion}>
        <div className="glass-card rounded-2xl p-8 shadow-2xl relative">
          <button className="absolute top-4 right-4 text-mystic/70 hover:text-mystic" onClick=${onClose} aria-label="Cerrar">
            &times;
          </button>
          <h2 className="text-2xl font-bold text-center">Créditos</h2>
          <p className="mt-4 text-mystic/80">
            Este proyecto es posible gracias a las contribuciones y el apoyo de las siguientes personas:
          </p>
          <ul className="mt-6 space-y-4 text-sm text-mystic/80">
            <li>
              Alex Berrios (<a href="https://github.com/lologaby" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-boston-blue">@lologaby</a>)
              <span className="block text-xs text-mystic/60 mt-1">- Desarrollador Principal</span>
            </li>
            <li>
              Samuel O. Rivera (<a href="https://github.com/sabdielis" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-boston-blue">@sabdielis</a>,
              <a href="https://www.linkedin.com/in/samuel-o-rivera/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-boston-blue ml-1">LinkedIn</a>)
              <span className="block text-xs text-mystic/60 mt-1">- Diseño de UI y modo oscuro</span>
            </li>
            <li>
              Genesis D. Ortiz (<a href="https://www.linkedin.com/in/genesis-d-ortiz-203b84214/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-boston-blue">LinkedIn</a>)
              <span className="block text-xs text-mystic/60 mt-1">- Creación de la plantilla de reporte</span>
            </li>
          </ul>
          <button className="mt-6 text-sm text-boston-blue hover:text-shakespeare font-semibold" onClick=${onClose}>
            &larr; Volver
          </button>
        </div>
      </${FadeContent}>
      <button className="absolute inset-0" onClick=${onClose} aria-label="Cerrar"></button>
    </div>
  `;
};
