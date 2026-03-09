import { useEffect, useRef } from "react";

export function useAutoScroll(dep: any) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [dep]);

  return ref;
}
