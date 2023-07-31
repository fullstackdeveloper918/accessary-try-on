export interface IAnnotation {
  [id: string]:
    | {
        name: string;
        img: string;
        id: number;
        price: number;
        type: "circle" | "dot";
        variants: {
          [position: string]: {
            image: string;
          };
        };
      }
    | undefined;
}
