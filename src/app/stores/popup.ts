'use client';
import { create } from 'zustand';

type Store = {
  open: boolean;
  setOpen: (b: boolean) => void;
};
export const usePopUpStore = create<Store>((set) => ({
  open: false,
  setOpen: (b: boolean) => set(() => ({ open: b })),
}));
