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
    <div className="flex flex-wrap produc-exp-ui">
      {selectedProducts?.map((product) => (
        <div className="produc-exp-item w-full" key={product?.id}>
          <div className="w-full p-2" key={product?.id}>
          <div className="img-prodwrap">
            <DraggbleComp id={product!.id.toString()}>
             
                 <img src={product?.images["D"]} alt="" className="w-full prod-img-exp"/>
              
            </DraggbleComp></div>
            <p className="h-2/6 text-base truncate title-prod">{product?.title}</p>
          </div>
          
            
          
        </div>
      ))}
    </div>
  );
};
export default MySelectionsTab;
