export interface IAnnotation {
  left: {
    [position: string]: {
      title: string;
      id: number;
      side: Side;
      price: string;
      variantId: number;
      type: ProductType;
      image: string;
    };
  };
  right: {
    [position: string]: {
      title: string;
      id: number;
      side: Side;
      price: string;
      variantId: number;
      type: ProductType;
      image: string;
    };
  };
}
type ProductType = "circle" | "dot";
type Side = "L" | "R";
