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
  // {
  //   name: "def",
  //   id: 456,
  //   type: "dot",
  //   img: "dotOne.png",
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
    name: "ghi",
    id: 789,
    type: "circle",
    price: 123,
    img: "https://clickthemart.com/storage/firstRingEdited.png",
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
