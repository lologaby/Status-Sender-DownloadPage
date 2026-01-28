// Main entry point - initializes React app
console.log("main.js: Starting to load...");

import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
console.log("main.js: React DOM imported");

import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";
console.log("main.js: GSAP imported");

import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";
console.log("main.js: React and htm imported");

import { App } from "./components/App.js";
console.log("main.js: App component imported");

const html = htm.bind(React.createElement);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
console.log("main.js: GSAP plugins registered");

// Initialize React app
try {
  console.log("main.js: Looking for root element...");
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  console.log("main.js: Root element found, creating React root...");
  const root = createRoot(rootElement);
  console.log("main.js: Rendering App component...");
  root.render(html`<${App} />`);
  console.log("main.js: App rendered successfully!");
} catch (error) {
  console.error("Error initializing app:", error);
  console.error("Error stack:", error.stack);
  const rootEl = document.getElementById("root");
  if (rootEl) {
    rootEl.innerHTML = `
      <div style="color: #dae5ea; padding: 2rem; text-align: center;">
        <h2>Error al cargar la aplicación</h2>
        <p>${error.message}</p>
        <p style="font-size: 0.875rem; margin-top: 1rem;">Por favor, revisa la consola del navegador para más detalles.</p>
        <pre style="font-size: 0.75rem; margin-top: 1rem; text-align: left; background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 0.5rem; overflow: auto;">${error.stack || 'No stack trace available'}</pre>
      </div>
    `;
  }
}
