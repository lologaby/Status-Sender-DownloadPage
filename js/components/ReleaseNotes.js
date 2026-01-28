import { useEffect, useMemo, useRef, useState } from "https://esm.sh/react@18.2.0";
import { marked } from "https://esm.sh/marked@12.0.2";
import DOMPurify from "https://esm.sh/dompurify@3.0.6";
import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";

const html = htm.bind(React.createElement);

export const ReleaseNotes = ({ version, notes, error, reducedMotion }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  const parsedNotes = useMemo(() => (notes ? DOMPurify.sanitize(marked.parse(notes)) : ""), [notes]);

  useEffect(() => {
    if (!contentRef.current) return;
    setMaxHeight(open ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [open, notes]);

  const hasNotes = Boolean(notes);
  const isLoading = version === "..." && !error;
  if (isLoading) {
    return html`<div className="text-sm text-mystic/70">Cargando versión...</div>`;
  }

  const effectiveMaxHeight = open ? (reducedMotion ? "none" : maxHeight) : "0px";
  return html`
    <div className="w-full">
      <button
        className=${`text-sm inline-flex items-center gap-2 transition-colors duration-200 ${
          hasNotes ? "text-mystic/70 hover:text-mystic" : "text-mystic/40 cursor-not-allowed"
        }`}
        onClick=${() => {
          if (hasNotes) setOpen(!open);
        }}
        aria-expanded=${open}
        aria-controls="release-notes-content"
        disabled=${!hasNotes}
      >
        <span>Versión ${version}</span>
        <svg
          className=${`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      ${error ? html`<div className="text-sm text-red-200/90 mt-2">${error}</div>` : ""}
      ${!hasNotes && !error ? html`<div className="text-xs text-mystic/50 mt-2">No hay notas de versión.</div>` : ""}
      <div className="release-notes w-full" style=${{ maxHeight: effectiveMaxHeight }}>
        <div
          id="release-notes-content"
          ref=${contentRef}
          className="release-notes-content text-mystic/85 text-sm pt-4"
          dangerouslySetInnerHTML=${{ __html: parsedNotes }}
        ></div>
      </div>
    </div>
  `;
};
