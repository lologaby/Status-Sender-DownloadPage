import { useEffect, useState } from "https://esm.sh/react@18.2.0";

// Hook to detect user's reduced motion preference
export const usePrefersReducedMotion = () => {
  console.log("usePrefersReducedMotion: Hook called");
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    console.log("usePrefersReducedMotion: useEffect running");
    try {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(media.matches);
      const handler = event => setReducedMotion(event.matches);
      
      if (media.addEventListener) {
        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
      }
      media.addListener(handler);
      return () => media.removeListener(handler);
    } catch (err) {
      console.error("usePrefersReducedMotion: Error:", err);
      return false;
    }
  }, []);
  
  console.log("usePrefersReducedMotion: Returning", reducedMotion);
  return reducedMotion;
};

// Hook to fetch version information from API
export const useVersionInfo = () => {
  console.log("useVersionInfo: Hook called");
  const [version, setVersion] = useState("...");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("useVersionInfo: useEffect running");
    let active = true;
    fetch("/api/get-version")
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        if (!active) return;
        console.log("useVersionInfo: Data received", data);
        setVersion(data.version || "N/A");
        setNotes(data.notes || "");
      })
      .catch(err => {
        if (!active) return;
        console.error("useVersionInfo: Error fetching version:", err);
        setError("No se pudo cargar la versión.");
        setVersion("Error");
      });

    return () => {
      active = false;
    };
  }, []);

  console.log("useVersionInfo: Returning", { version, notes, error });
  return { version, notes, error };
};
