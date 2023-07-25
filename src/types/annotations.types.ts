export interface IAnnotation {
  [id: string]:
    | {
        name: string;
        img: string;
        variants: {
          [position: string]: {
            image: string;
          };
        };
      }
    | undefined;
}
