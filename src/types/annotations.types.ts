export interface IAnnotation {
  [id: string]:
    | {
        name: string;
        variants: {
          [position: string]: {
            image: string;
          };
        };
      }
    | undefined;
}
