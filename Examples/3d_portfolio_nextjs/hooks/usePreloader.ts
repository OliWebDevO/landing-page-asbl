'use client';
import { useEffect, useState } from "react";

export function usePreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited) {
      setLoading(false);
      return;
    }

    // No 3D model to wait for — short delay for preloader animation
    const timeout = setTimeout(() => {
      setLoading(false);
      localStorage.setItem("hasVisited", "true");
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return loading;
}
