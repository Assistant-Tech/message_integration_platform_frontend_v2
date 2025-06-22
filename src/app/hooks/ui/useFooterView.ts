import { useState, useCallback, useRef } from "react";

export const useFooterInView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const refCallback = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            setIsVisible(entry.isIntersecting);
          }
        },
        {
          root: null,
          threshold: 0.1,
        },
      );

      observerRef.current.observe(node);
    }
  }, []);

  return { ref: refCallback, isVisible };
};
