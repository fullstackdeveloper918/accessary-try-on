import { useEffect, useState } from "react";

const BuyButton = ({
  addedProducts,
}: {
  addedProducts: { price: number | undefined }[];
}) => {
  const [totalPrice, setTotalPrice] = useState<number>();
  useEffect(() => {
    setTotalPrice(
      addedProducts.reduce((acc, cur) => {
        const sum = cur.price ? +acc + cur.price : acc;
        return sum;
      }, 0)
    );
  }, [addedProducts]);

  return totalPrice ? <button>Buy now ${totalPrice}</button> : null;
};
export default BuyButton;
