import { create } from "zustand";

interface IUseSideOfEar {
  side: "L" | "R";
  setSide: (newSide: "L" | "R") => void;
}

export const useSideOfEar = create<IUseSideOfEar>((set) => ({
  side: "L",
  setSide: (newSide) => {
    set({
      side: newSide,
    });
  },
}));
