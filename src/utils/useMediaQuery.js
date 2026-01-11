import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  // Check if window exists (for SSR support)
  const isClient = typeof window === "object";

  // Initialize state with media query match or false when SSR
  const [matches, setMatches] = useState(() =>
    isClient ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (!isClient) return;

    const mediaQueryList = window.matchMedia(query);

    // Update state initially (in case window.matchMedia changed)
    const listener = (event) => {
      setMatches(event.matches);
    };

    // Add event listener for changes
    mediaQueryList.addEventListener("change", listener);

    // Set initial value in case it changed after mount
    setMatches(mediaQueryList.matches);

    // Cleanup listener on unmount or query change
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query, isClient]);

  return matches;
};

export default useMediaQuery;
