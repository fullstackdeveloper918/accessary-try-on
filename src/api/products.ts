export const dummyProducts: {
  name: string;
  img: string;
  id: number;
  price: number;
  type: "circle" | "dot";
  variants: { [position: string]: { image: string } };
}[] = [
  // {
  //   name: "abc",
  //   id: 123,
  //   img: "third.png",
  //   type: "circle",
  //   variants: {
  //     A: { image: "vA" },
  //     B: { image: "vB" },
  //     C: { image: "vC" },
  //     D: { image: "vD" },
  //     E: { image: "vE" },
  //     F: { image: "vF" },
  //     G: { image: "vG" },
  //   },
  // },
  {
    name: "def",
    id: 46169878135057,
    type: "circle",
    price: 586,
    img: "https://clickthemart.com/storage/third.png",
    // img: "third.png",
    variants: {
      A: { image: "vA" },
      B: { image: "vB" },
      C: { image: "vC" },
      D: { image: "vD" },
      E: { image: "vE" },
      F: { image: "vF" },
      G: { image: "vG" },
    },
  },
  {
    name: "ghi",
    id: 46170031849745,
    type: "circle",
    price: 123,
    img: "https://clickthemart.com/storage/firstRingEdited.png",
    // img: "firstRingEdited.png",
    variants: {
      A: { image: "vA" },
      B: { image: "vB" },
      C: { image: "vC" },
      D: { image: "vD" },
      E: { image: "vE" },
      F: { image: "vF" },
      G: { image: "vG" },
    },
  },
];
