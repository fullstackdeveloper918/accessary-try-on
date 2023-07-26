export interface IAnnotation {
  [id: string]:
    | {
        name: string;
        img: string;
        id: number;
        type: "circle" | "dot";
        variants: {
          [position: string]: {
            image: string;
          };
        };
      }
    | undefined;
}
