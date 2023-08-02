import { create } from "zustand";

interface IProductDetailStore {
  showDetails: boolean;
  productId: number | string | undefined;
  setShowDetails: (state: boolean) => void;
  setProductId: (productId: string | number) => void;
}

export const useProductDetailsStore = create<IProductDetailStore>((set) => ({
  showDetails: false,
  productId: undefined,
  setShowDetails: (state: boolean) => {
    set({
      showDetails: state,
    });
  },
  setProductId: (productId: number | string) => {
    set({
      productId: productId,
    });
  },
}));
