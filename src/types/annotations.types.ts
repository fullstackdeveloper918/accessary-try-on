export interface IAnnotation {
  left: {
    [position: string]: {
      title: string;
      id: number;
      side: Side;
      price: string;
      variantId: number;
      shape: ProductType;
      images: {
        [position: string]: string;
      };
      options: Option[];
    };
  };
  right: {
    [position: string]: {
      title: string;
      id: number;
      side: Side;
      price: string;
      variantId: number;
      shape: ProductType;
      images: {
        [position: string]: string;
      };
      options: Option[];
    };
  };
}
export type ProductType = "circle" | "dot" | "addon";
export type Side = "L" | "R";

export interface Option {
  product_id: number;
  id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  inventory_policy: string;
  compare_at_price: string;
  fulfillment_service: string;
  inventory_management: string;
  option1: string;
  option2: null;
  option3: null;
  created_at: Date;
  updated_at: Date;
  taxable: boolean;
  barcode: string;
  grams: number;
  image_id: number;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
  admin_graphql_api_id: string;
  mainImage: string;
  imagesAll: ImagesAll;
}
export type Position = "A" | "B" | "C" | "D" | "E" | "F"  ;
export interface ImagesAll {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
  // dotsImage: string;
}

// export type Positions = "A1" | "B1" | "C1" | "D1" | "E1" | "F1"  ;
// export interface ImagesAll {
//   A1: string;
//   B1: string;
//   C1: string;
//   D1: string;
//   E1: string;
//   F1: string;
 

// }
