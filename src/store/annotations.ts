import { create } from "zustand";
import { IAnnotation } from "../types/annotations.types";

interface IAnnotationStore {
  annotations: IAnnotation;
  setAnnotations: (annotation: IAnnotation) => void;
}

export const useAnnotationsStore = create<IAnnotationStore>((set) => ({
  annotations: {},
  setAnnotations: (annotation) => {
    set({
      annotations: { ...annotation },
    });
  },
}));
