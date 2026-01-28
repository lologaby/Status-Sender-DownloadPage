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
const root = createRoot(document.getElementById("root"));
root.render(html`<${App} />`);
