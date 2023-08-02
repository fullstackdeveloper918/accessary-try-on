export interface IAnnotation {
  [position: string]:
    | {
        title: string;
        id: number;
        price: string;
        type: "circle" | "dot";
        image: string;
      }
    | undefined;
}
