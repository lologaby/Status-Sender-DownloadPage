import { useState } from "https://esm.sh/react@18.2.0";
import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";
import { usePrefersReducedMotion, useVersionInfo } from "../utils/hooks.js";
import { BlurText } from "./animations/BlurText.js";
import { FadeContent } from "./animations/FadeContent.js";
import { ReleaseNotes } from "./ReleaseNotes.js";
import { ScreenshotCarousel } from "./ScreenshotCarousel.js";
import { FeatureCard } from "./FeatureCard.js";
import { Lightbox } from "./Lightbox.js";
import { CreditsModal } from "./CreditsModal.js";
import { BmcButton } from "./BmcButton.js";
import { SLIDES, FEATURES } from "../config.js";

const html = htm.bind(React.createElement);

export const App = () => {
  console.log("App: Component rendering...");
  try {
    const reducedMotion = usePrefersReducedMotion();
    console.log("App: usePrefersReducedMotion called, reducedMotion:", reducedMotion);
    const { version, notes, error } = useVersionInfo();
    console.log("App: useVersionInfo called, version:", version);
    const [lightboxSrc, setLightboxSrc] = useState("");
    const [creditsOpen, setCreditsOpen] = useState(false);
    console.log("App: State initialized");

  return html`
    <div className="relative overflow-hidden min-h-screen">
      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>
      <div className="orb orb-three"></div>

      <header className="relative z-10 w-full py-8 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="./piruicon.png" alt="Logo de Worldnet Status Sender" className="w-12 h-12 rounded-full bg-white/5 p-1.5 backdrop-blur-sm" />
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-white/50 font-medium">Worldnet</p>
              <p className="text-sm font-semibold text-white/90 tracking-tight">Status Sender</p>
            </div>
          </div>
          <button
            className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/5"
            onClick=${() => setCreditsOpen(true)}
          >
            <span>Créditos</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-24 pt-8">
        <section className="grid gap-12 lg:gap-16 lg:grid-cols-[1.1fr_1fr] items-start lg:items-center mb-20 lg:mb-32">
          <${FadeContent} className="w-full" reducedMotion=${reducedMotion}>
            <div className="glass-card rounded-[2rem] p-8 sm:p-12 lg:p-14">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 uppercase tracking-[0.1em] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#007aff]"></span>
                Windows • Latest build
              </div>
              <div className="mb-10">
                <${BlurText}
                  text="Worldnet Network Status Sender"
                  className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] tracking-tight mb-6"
                  animateBy="words"
                  reducedMotion=${reducedMotion}
                />
                <p className="text-white/60 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-xl">
                  Descarga la versión más reciente y mantén tu equipo sincronizado con notificaciones de estado en tiempo real.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="/api/download"
                  className="btn-primary inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-base font-medium"
                >
                  <img src="./winlogo.png" alt="Windows Logo" className="w-5 h-5" />
                  Descargar ahora
                </a>
                <button
                  className="btn-secondary inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-medium"
                  onClick=${() => setCreditsOpen(true)}
                >
                  Ver créditos
                </button>
              </div>
              <div>
                <${ReleaseNotes} version=${version} notes=${notes} error=${error} reducedMotion=${reducedMotion} />
              </div>
            </div>
          </${FadeContent}>

          <${FadeContent} className="w-full" reducedMotion=${reducedMotion}>
            <div className="glass-card rounded-[2rem] p-4 sm:p-6">
              <${ScreenshotCarousel} slides=${SLIDES} onOpen=${setLightboxSrc} />
            </div>
          </${FadeContent}>
        </section>

        <section className="grid gap-6 md:grid-cols-3 mb-20">
          ${FEATURES.map(
            feature => html`
              <${FadeContent} reducedMotion=${reducedMotion}>
                <${FeatureCard} title=${feature.title} description=${feature.description} icon=${feature.icon} />
              </${FadeContent}>
            `
          )}
        </section>
      </main>

      <footer className="relative z-10 w-full py-12 px-4 sm:px-8 lg:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a href="https://github.com/lologaby" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white/80 transition-colors duration-200">
              <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <${BmcButton} />
          </div>
          <div className="text-white/50 text-sm text-center">
            <span>
              Desarrollado por
              <a href="https://alexberrios.com" target="_blank" rel="noopener noreferrer" className="ml-1 text-white/70 hover:text-white transition-colors">
                alexberrios.com
              </a>
            </span>
            <span className="text-white/30 mx-2">•</span>
            <button className="hover:text-white/80 transition-colors" onClick=${() => setCreditsOpen(true)}>Créditos</button>
          </div>
        </div>
      </footer>
    </div>
    <${Lightbox} src=${lightboxSrc} onClose=${() => setLightboxSrc("")} />
    <${CreditsModal} open=${creditsOpen} onClose=${() => setCreditsOpen(false)} reducedMotion=${reducedMotion} />
  `;
  } catch (err) {
    console.error("App: Error in component:", err);
    return html`
      <div style="color: #dae5ea; padding: 2rem; text-align: center;">
        <h2>Error en el componente App</h2>
        <p>${err.message}</p>
        <pre style="font-size: 0.75rem; margin-top: 1rem; text-align: left;">${err.stack}</pre>
      </div>
    `;
  }
};
