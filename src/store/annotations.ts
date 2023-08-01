import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAnnotation } from "../types/annotations.types";

interface IAnnotationStore {
  annotations: IAnnotation;
  setAnnotations: (annotation: IAnnotation) => void;
}

export const useAnnotationsStore = create<IAnnotationStore>()(
  persist(
    (set) => ({
      annotations: {},
      setAnnotations: (annotation) => {
        set({
          annotations: { ...annotation },
        });
      },
    }),
    { name: "annotations" }
  )
);
