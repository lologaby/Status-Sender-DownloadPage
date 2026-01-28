import { useEffect, useState } from "https://esm.sh/react@18.2.0";

// Hook to detect user's reduced motion preference
export const usePrefersReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const handler = event => setReducedMotion(event.matches);
    
    if (media.addEventListener) {
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
    media.addListener(handler);
    return () => media.removeListener(handler);
  }, []);
  
  return reducedMotion;
};

// Hook to fetch version information from API
export const useVersionInfo = () => {
  const [version, setVersion] = useState("...");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/get-version")
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        if (!active) return;
        setVersion(data.version || "N/A");
        setNotes(data.notes || "");
      })
      .catch(err => {
        if (!active) return;
        setError("No se pudo cargar la versión.");
        setVersion("Error");
        console.error("Error al obtener la versión:", err);
      });

    return () => {
      active = false;
    };
  }, []);

  return { version, notes, error };
};
