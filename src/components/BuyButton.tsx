import { callApi } from "@/api/config";
import { exportAsImage } from "@/lib/exportAsImage";
import { RefObject, useEffect, useState } from "react";

const BuyButton = ({
  addedProducts,
  earRef,
}: {
  addedProducts: { price: string; variantId: number | undefined }[];
  earRef: RefObject<HTMLDivElement>;
}) => {
  const [totalPrice, setTotalPrice] = useState<number>();
  const callshopifyFunction = async () => {
    const imageUrl = await exportAsImage(earRef.current!);
    console.log("imageUrl", imageUrl);
    const response = await callApi("orderimage", {
      method: "POST",
      body: JSON.stringify({
        image: imageUrl,
      }),
    });
    if (response.ok) {
      console.log("response", response);
      const data = await response.json();
      console.log("data", data);
      // const allVariants = addedProducts.reduce(
      //   (
      //     acc: { id: number; quantity: number }[],
      //     cur: {
      //       price: string | undefined;
      //       variantId: number | undefined;
      //     }
      //   ) => {
      //     const existingIdx = acc.findIndex((p) => p?.id == cur.variantId);
      //     if (existingIdx != -1) {
      //       acc = [
      //         ...acc.slice(0, existingIdx),
      //         { ...acc[existingIdx], quantity: acc[existingIdx].quantity + 1 },
      //         ...acc.slice(existingIdx + 1),
      //       ];
      //     } else {
      //       acc = [
      //         ...acc,
      //         ...(cur.variantId ? [{ id: cur.variantId, quantity: 1 }] : []),
      //       ];
      //     }
      //     return acc;
      //   },
      //   []
      // );
      // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // // @ts-ignore
      // look_add_to_cart(allVariants);
    }
  };
  useEffect(() => {
    setTotalPrice(
      addedProducts.reduce((acc, cur) => {
        const sum = +cur.price ? +acc + +cur.price : acc;
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
