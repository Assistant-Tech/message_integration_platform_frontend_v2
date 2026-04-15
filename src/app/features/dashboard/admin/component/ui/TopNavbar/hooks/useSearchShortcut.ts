import { useEffect, useRef, useState } from "react";

interface UseSearchShortcutResult {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  query: string;
  setQuery: (q: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

/**
 * Owns the global search dialog state.
 *
 * Responsibilities
 *   • Toggle on Cmd/Ctrl+K (ignored when the user is typing in another field)
 *   • Close on Escape
 *   • Reset the query when the dialog closes
 *   • Auto-focus the input shortly after opening
 *
 * @param enabled  When false, the keyboard listener is not attached.
 *                 Used to honour the `showSearch` prop on TopNavbar.
 */
export function useSearchShortcut(enabled: boolean): UseSearchShortcutResult {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Cmd/Ctrl+K to toggle, Esc to close.
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingElsewhere =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isTypingElsewhere) return;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled]);

  // Reset query when closed; auto-focus when opened.
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const timeoutId = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 40);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen]);

  return { isOpen, setIsOpen, query, setQuery, inputRef };
}
