export interface Response {
  circle: Addon;
  dot: Addon;
  addon: Addon;
}

export interface Addon {
  products: IProduct[];
}

export interface IProduct {
  id: number;
  // title: string;
  // body_html: string;
  // vendor: Vendor;
  // product_type: ProductType;
  // created_at: Date;
  // handle: string;
  // updated_at: Date;
  // published_at: Date | null;
  // template_suffix: null;
  // status: Status;
  // published_scope: PublishedScope;
  // tags: string;
  // admin_graphql_api_id: string;
  // options: Option[];
  // images: Image[];
  // image: Image | null;
  name?: string;
  img?: string;
  type?: "circle" | "dot";
  variants?: {
    [position: string]: {
      image: string;
    };
  };
}

export interface Image {
  id: number;
  product_id: number;
  position: number;
  created_at: Date;
  updated_at: Date;
  alt: null | string;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
  admin_graphql_api_id: string;
}

export interface Option {
  id: number;
  product_id: number;
  name: Name;
  position: number;
}

export type Name =
  | "Size"
  | "Color"
  | "Gold Colour"
  | "Stone"
  | "Title"
  | "Side"
  | "Size of Hoop"
  | "Gold";

export type ProductType =
  | "Fine Piercings"
  | "Piercing Charm"
  | ""
  | "Rings"
  | "Necklaces"
  | "Earrings"
  | "Bracelets";

export type PublishedScope = "global" | "web";

export type Status = "active" | "draft";

export type Vendor = "Ear Envy" | "Lark & Berry";
