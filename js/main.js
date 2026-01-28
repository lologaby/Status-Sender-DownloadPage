// Main entry point - initializes React app
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";
import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";
import { App } from "./components/App.js";

const html = htm.bind(React.createElement);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize React app
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  const root = createRoot(rootElement);
  root.render(html`<${App} />`);
} catch (error) {
  console.error("Error initializing app:", error);
  document.getElementById("root").innerHTML = `
    <div style="color: #dae5ea; padding: 2rem; text-align: center;">
      <h2>Error al cargar la aplicación</h2>
      <p>${error.message}</p>
      <p style="font-size: 0.875rem; margin-top: 1rem;">Por favor, revisa la consola del navegador para más detalles.</p>
    </div>
  `;
}
