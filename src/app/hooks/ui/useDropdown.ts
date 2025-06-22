import { useState, useCallback } from "react";

export const useDropdown = (delay: number = 150) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback((itemName: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setActiveDropdown(itemName);
  }, [timeoutId]);

  const handleMouseLeave = useCallback(() => {
    const id = setTimeout(() => {
      setActiveDropdown(null);
      setTimeoutId(null);
    }, delay);
    setTimeoutId(id);
  }, [delay]);

  const closeDropdown = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setActiveDropdown(null);
    setTimeoutId(null);
  }, [timeoutId]);

  return {
    activeDropdown,
    handleMouseEnter,
    handleMouseLeave,
    closeDropdown,
    setActiveDropdown
  };
};