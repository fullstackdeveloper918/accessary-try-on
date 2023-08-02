export interface IAnnotation {
  [position: string]:
    | {
        title: string;
        id: number;
        price: string;
        variantId: number;
        type: "circle" | "dot";
        image: string;
      }
    | undefined;
}
