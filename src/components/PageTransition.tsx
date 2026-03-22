import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setShow(false);
    setDisplayChildren(children);
    // Trigger entrance after a frame
    const id = requestAnimationFrame(() => setShow(true));
    window.scrollTo(0, 0);
    return () => cancelAnimationFrame(id);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        show ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-3 blur-[2px]"
      )}
    >
      {displayChildren}
    </div>
  );
}
