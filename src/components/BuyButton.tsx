import { useEffect, useState } from "react";

const BuyButton = ({
  addedProducts,
}: {
  addedProducts: { price: number | undefined; variantId: number | undefined }[];
}) => {
  const [totalPrice, setTotalPrice] = useState<number>();
  const callshopifyFunction = () => {
    const allVariants = addedProducts.reduce(
      (
        acc: { variantId: number; quantity: number }[],
        cur: {
          price: number | undefined;
          variantId: number | undefined;
        }
      ) => {
        const existingIdx = acc.findIndex((p) => p.variantId == cur.variantId);
        if (existingIdx != -1) {
          acc = [
            ...acc.slice(0, existingIdx),
            { ...acc[existingIdx], quantity: acc[existingIdx].quantity + 1 },
            ...acc.slice(existingIdx + 1),
          ];
        } else {
          acc = [
            ...acc,
            ...(cur.variantId
              ? [{ variantId: cur.variantId, quantity: 1 }]
              : []),
          ];
        }
        return acc;
      },
      []
    );
    console.log("calling shopify function in react", allVariants);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    look_add_to_cart(allVariants);
  };
  useEffect(() => {
    setTotalPrice(
      addedProducts.reduce((acc, cur) => {
        const sum = cur.price ? +acc + cur.price : acc;
        return sum;
      }, 0)
    );
  }, [addedProducts]);

  return totalPrice ? (
    <button
      className="bg-black text-white px-6 py-2 rounded-lg text-base"
      onClick={() => {
        callshopifyFunction();
      }}
    >
      Buy now ${totalPrice}
    </button>
  ) : null;
};
export default BuyButton;
