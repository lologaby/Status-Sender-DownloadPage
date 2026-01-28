import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";
import { FadeContent } from "./animations/FadeContent.js";

const html = htm.bind(React.createElement);

export const CreditsModal = ({ open, onClose, reducedMotion }) => {
  if (!open) return null;
  return html`
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4" role="dialog" aria-modal="true" onClick=${onClose}>
      <${FadeContent} className="w-full max-w-2xl relative z-10" reducedMotion=${reducedMotion} onClick=${e => e.stopPropagation()}>
        <div className="glass-card rounded-3xl p-10 sm:p-12 shadow-2xl relative">
          <button className="absolute top-6 right-6 text-white/50 hover:text-white/90 transition-colors text-2xl leading-none" onClick=${onClose} aria-label="Cerrar">
            &times;
          </button>
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-6 text-white tracking-tight">Créditos</h2>
          <p className="text-white/60 text-lg mb-8 text-center leading-relaxed">
            Este proyecto es posible gracias a las contribuciones y el apoyo de las siguientes personas:
          </p>
          <ul className="space-y-6 text-base">
            <li className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-white/90 font-medium">Alex Berrios</span>
                  <span className="text-white/50 mx-2">•</span>
                  <a href="https://github.com/lologaby" target="_blank" rel="noopener noreferrer" className="text-[#007aff] hover:text-[#5ac8fa] transition-colors font-medium">@lologaby</a>
                </div>
                <span className="text-sm text-white/50">Desarrollador Principal</span>
              </div>
            </li>
            <li className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-white/90 font-medium">Samuel O. Rivera</span>
                  <span className="text-white/50 mx-2">•</span>
                  <a href="https://github.com/sabdielis" target="_blank" rel="noopener noreferrer" className="text-[#007aff] hover:text-[#5ac8fa] transition-colors font-medium">@sabdielis</a>
                  <span className="text-white/50 mx-1">•</span>
                  <a href="https://www.linkedin.com/in/samuel-o-rivera/" target="_blank" rel="noopener noreferrer" className="text-[#007aff] hover:text-[#5ac8fa] transition-colors font-medium">LinkedIn</a>
                </div>
                <span className="text-sm text-white/50">Diseño de UI y modo oscuro</span>
              </div>
            </li>
            <li className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-white/90 font-medium">Genesis D. Ortiz</span>
                  <span className="text-white/50 mx-2">•</span>
                  <a href="https://www.linkedin.com/in/genesis-d-ortiz-203b84214/" target="_blank" rel="noopener noreferrer" className="text-[#007aff] hover:text-[#5ac8fa] transition-colors font-medium">LinkedIn</a>
                </div>
                <span className="text-sm text-white/50">Creación de la plantilla de reporte</span>
              </div>
            </li>
          </ul>
          <button className="mt-10 text-base text-white/60 hover:text-white/90 transition-colors font-medium mx-auto block" onClick=${onClose}>
            ← Volver
          </button>
        </div>
      </${FadeContent}>
    </div>
  `;
};
