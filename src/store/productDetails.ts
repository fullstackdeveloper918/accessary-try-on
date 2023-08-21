import { Position } from "@/types/annotations.types";
import { create } from "zustand";

interface IProductDetailStore {
  showDetails: boolean;
  product:
    | {
        id: number | string;
        position: Position | undefined;
      }
    | undefined;
  setShowDetails: (state: boolean) => void;
  setProduct: (
    productId:
      | {
          id: number | string;
          position: Position | undefined;
         
        }
      | undefined
  ) => void;
}

export const useProductDetailsStore = create<IProductDetailStore>((set) => ({
  showDetails: false,
  product: undefined,
  setShowDetails: (state: boolean) => {
    set({
      showDetails: state,
    });
  },
  setProduct: (
    product:
      | {
          id: number | string;
          position: Position | undefined;
        

        }
      | undefined
  ) => {
    set({
      product: product,
    });
  },
}));
