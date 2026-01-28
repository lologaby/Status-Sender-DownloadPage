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
  const reducedMotion = usePrefersReducedMotion();
  const { version, notes, error } = useVersionInfo();
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [creditsOpen, setCreditsOpen] = useState(false);

  return html`
    <div className="relative overflow-hidden">
      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>

      <header className="w-full py-6 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="./piruicon.png" alt="Logo de Worldnet Status Sender" className="w-10 h-10 rounded-full bg-mirage p-1" />
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-mystic/60">Worldnet</p>
              <p className="text-sm font-semibold text-mystic">Status Sender</p>
            </div>
          </div>
          <button
            className="hidden sm:inline-flex items-center gap-2 text-sm text-mystic/70 hover:text-mystic"
            onClick=${() => setCreditsOpen(true)}
          >
            <span>Créditos</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"></path>
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 pb-20">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_1fr] items-center">
          <${FadeContent} className="w-full" reducedMotion=${reducedMotion}>
            <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-boston-blue/10 px-3 py-1 text-xs font-semibold text-boston-blue uppercase tracking-[0.3em]">
                Windows
                <span className="h-1 w-1 rounded-full bg-boston-blue"></span>
                Latest build
              </div>
              <div className="mt-6">
                <${BlurText}
                  text="Worldnet Network Status Sender"
                  className="text-3xl sm:text-4xl font-bold text-mystic leading-tight"
                  animateBy="words"
                  reducedMotion=${reducedMotion}
                />
                <p className="text-mystic/70 mt-4 text-base sm:text-lg">
                  Descarga la versión más reciente y mantén tu equipo sincronizado con notificaciones de estado en tiempo real.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/api/download"
                  className="btn-effect inline-flex items-center gap-3 rounded-xl bg-boston-blue px-6 py-3 text-mystic font-semibold tracking-wide"
                >
                  <img src="./winlogo.png" alt="Windows Logo" className="w-5 h-5" />
                  Descargar ahora
                </a>
                <button
                  className="inline-flex items-center gap-2 rounded-xl border border-mystic/20 px-5 py-3 text-sm text-mystic/80 hover:text-mystic hover:border-mystic/50 transition"
                  onClick=${() => setCreditsOpen(true)}
                >
                  Ver créditos
                </button>
              </div>
              <div className="mt-6">
                <${ReleaseNotes} version=${version} notes=${notes} error=${error} reducedMotion=${reducedMotion} />
              </div>
            </div>
          </${FadeContent}>

          <${FadeContent} className="w-full" reducedMotion=${reducedMotion}>
            <div className="glass-card rounded-3xl p-4 sm:p-6 shadow-2xl">
              <${ScreenshotCarousel} slides=${SLIDES} onOpen=${setLightboxSrc} />
            </div>
          </${FadeContent}>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          ${FEATURES.map(
            feature => html`
              <${FadeContent} reducedMotion=${reducedMotion}>
                <${FeatureCard} title=${feature.title} description=${feature.description} icon=${feature.icon} />
              </${FadeContent}>
            `
          )}
        </section>
      </main>

      <footer className="w-full pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <a href="https://github.com/lologaby" target="_blank" rel="noopener noreferrer" className="text-mystic/70 hover:text-boston-blue transition">
              <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" className="w-8">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <${BmcButton} />
          </div>
          <div className="text-mystic/60 text-sm text-center">
            <span>
              Desarrollado por
              <a href="https://alexberrios.com" target="_blank" rel="noopener noreferrer" className="ml-1 text-mystic hover:text-boston-blue">
                alexberrios.com
              </a>
            </span>
            <span className="text-mystic/40 mx-2">|</span>
            <button className="hover:text-mystic transition" onClick=${() => setCreditsOpen(true)}>Créditos</button>
          </div>
        </div>
      </footer>
    </div>
    <${Lightbox} src=${lightboxSrc} onClose=${() => setLightboxSrc("")} />
    <${CreditsModal} open=${creditsOpen} onClose=${() => setCreditsOpen(false)} reducedMotion=${reducedMotion} />
  `;
};
