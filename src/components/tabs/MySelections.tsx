import { useAnnotationsStore } from "@/store/annotations";
import { useEar } from "@/store/earDetails";
import { Option, ProductType, Side } from "@/types/annotations.types";
import { useMemo } from "react";
import DraggbleComp from "../dnd/DraggableComp";

const MySelectionsTab = () => {
  const { annotations } = useAnnotationsStore();
  const { side } = useEar();
  const sideIndex = useMemo(() => (side === "R" ? "right" : "left"), [side]);
  const selectedProducts = Object.values(annotations[sideIndex])
    .reduce(
      (
        acc: (
          | {
              title: string;
              id: number;
              side: Side;
              price: string;
              variantId: number;
              shape: ProductType;
              images: { [position: string]: string };
              options: Option[];
            }
          | undefined
        )[],
        cur:
          | {
              title: string;
              id: number;
              side: Side;
              price: string;
              variantId: number;
              shape: ProductType;
              images: { [position: string]: string };
              options: Option[];
            }
          | undefined
      ) => {
        const exists = acc?.findIndex((p) => p?.id == cur?.id);
        if (exists === -1) {
          acc.push(cur);
        }
        return acc;
      },
      []
    )
    ?.filter(Boolean);
  return (
    <div className="flex flex-wrap">
      {selectedProducts?.map((product) => (
        <div className="border shadow-md w-44 h-44 p-4" key={product?.id}>
          <div className="h-4/6" key={product?.id}>
            <DraggbleComp id={product!.id.toString()}>
              <img
                src={product?.images["D"] ?? product?.images["dotsImage"]}
                alt=""
                className="h-20 object-contain w-20 m-auto"
              />
            </DraggbleComp>
          </div>
          <div className="h-2/6">
            <h2>{product?.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MySelectionsTab;
