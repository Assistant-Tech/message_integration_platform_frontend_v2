import { create } from "zustand";

interface DemoDialogState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useDemoDialogStore = create<DemoDialogState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
