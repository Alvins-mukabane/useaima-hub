import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = location.hash.replace("#", "");

    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, [location.hash, location.pathname]);

  return null;
}
