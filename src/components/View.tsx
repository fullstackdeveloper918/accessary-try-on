import { callApi } from "@/api/config";
import { useEar } from "@/store/earDetails";
import { useProductDetailsStore } from "@/store/productDetails";
import { useProductstore } from "@/store/products";
import { IVariant } from "@/types/variantData.types";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { dropPointsLeft, dropPointsRight } from "../api/points";
import { useAnnotationsStore } from "../store/annotations";
import BuyButton from "./BuyButton";
import Ear from "./Ear";
import OptionsMenu from "./OptionsMenu";
import DraggbleComp from "./dnd/DraggableComp";
import DroppableComp from "./dnd/DroppableComp";
import Tabs from "./tabs";
import { IProduct } from "./tabs/data.type";

const View = () => {
  const earRef = useRef<HTMLDivElement>(null);
  const [addedProducts, setAddedProducts] = useState<
    { price: string; variantId: number | undefined }[]
  >([]);
  // #TODO : changes needed to make dynamic
  const { products } = useProductstore();
  const annotations = useAnnotationsStore((state) => state.annotations);
  const setAnnotations = useAnnotationsStore((state) => state.setAnnotations);
  const { setProductId, setShowDetails } = useProductDetailsStore();
  const side = useEar((state) => state.side);
  const sideIndex = useMemo(
    () => (side === "L" ? ("left" as const) : ("right" as const)),
    [side]
  );

  useEffect(() => {
    if (annotations == undefined) return;
    const leftData = Object.values(annotations.left)?.map((an) => ({
      price: an?.price ?? "0",
      variantId: an?.variantId,
    }));
    const rightData = Object.values(annotations["right"])?.map((an) => ({
      price: an?.price ?? "0",
      variantId: an?.variantId,
    }));
    const data = [...leftData, ...rightData];
    setAddedProducts(data);
  }, [annotations, sideIndex]);

  // Functions 👇👇👇
  async function addProducts(position: UniqueIdentifier, product: IProduct) {
    const productResponse = await callApi(`singleproducts/${product.id}`);
    if (productResponse.ok) {
      setShowDetails(true);
      setProductId(product.id);
      const variantData: { data: [{ variants: IVariant[] }] } =
        await productResponse.json();
      console.log("variantData", variantData);
      const normalized = variantData.data[0].variants[0];
      setAnnotations({
        ...annotations,
        [sideIndex]: {
          ...annotations[sideIndex],
          [position]: {
            title: product.title,
            id: product.id,
            price: normalized.price,
            shape: product.shape,
            variantId: normalized.id,
            side: side,
            // #TODO : add options here to get variant options
            options: variantData.data[0].variants,
            // #TODO : changes needed to make dynamic
            // image: "firstRingEdited.png",
            // image: "imgs/F.png",
            // image: `imgs/${position}.png`,
            image:
              normalized.imagesAll[
                position as "A" | "B" | "C" | "D" | "E" | "F"
              ],
          },
        },
      });
    }
  }
  function handleDragEnd(event: DragEndEvent) {
    const {
      over,
      active: { id },
    } = event;
    if (over && over.id) {
      if (["A", "B", "C", "D", "E", "F", "G"].includes(id.toString())) {
        setAnnotations({
          ...annotations,
          [sideIndex]: {
            ...annotations[sideIndex],
            [over.id]:
              annotations && annotations[sideIndex]
                ? annotations[sideIndex][id]
                : undefined,
            [id]: undefined,
          },
        });
      } else {
        // #TODO : changes needed to make dynamic
        // const data = dummyProducts.find((p) => p.id == id);
        const data = products.find((p) => p.id == id);

        if (data) {
          addProducts(over.id, data);
        }
      }
    }
  }
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 0,
      tolerance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 0,
      tolerance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  return (
    <div>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div className="flex gap-4 flex-wrap m-6">
          <div>
            <div className=" p-2">
              {/* Options button */}
              <div className="flex justify-between bg-gray-100 rounded-lr-md p-2">
                <h2 className="text-lg">Lark & Berry</h2>
                <div className="cursor-pointer">
                  <OptionsMenu earRef={earRef} />
                </div>
              </div>
              {/* Options button */}
              {/* 
                  Drop area ie: Ear and points 
              */}
              <div
                ref={earRef}
                className="bg-gray-100 rounded-md shadow-lg flex justify-center items-center relative w-[375px] h-[400px]"
              >
                {/* Drop Points */}
                <div className="flex gap-2 flex-col absolute top-0 left-0 z-10">
                  <div className="h-full w-full">
                    {(side === "R" ? dropPointsRight : dropPointsLeft).map(
                      (p) => (
                        <div
                          key={p.id}
                          style={{
                            position: "absolute",
                            top: `${p.y}px`,
                            left: `${p.x}px`,
                          }}
                        >
                          <DroppableComp id={p.id} key={p.id}>
                            {annotations !== undefined &&
                              annotations[sideIndex] !== undefined &&
                              annotations[sideIndex][p.id] !== undefined && (
                                <DraggbleComp id={p.id}>
                                  <div className="group relative h-full w-full">
                                    {annotations[sideIndex][p.id].shape ==
                                    "circle" ? (
                                      <img
                                        src={
                                          annotations[sideIndex][p.id]?.image
                                        }
                                        alt=""
                                        style={{
                                          height: "90px",
                                          width: "90px",
                                          objectFit: "contain",
                                          clipPath:
                                            "polygon(44% 15%, 100% 0, 100% 41%, 100% 100%, 0 100%, 0 41%, 51% 57%)",
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={
                                          annotations[sideIndex][p.id]?.image
                                        }
                                        alt=""
                                        style={{
                                          height: "90px",
                                          width: "90px",
                                          objectFit: "contain",
                                        }}
                                      />
                                    )}
                                    <div
                                      className="z-10 cursor-pointer absolute top-2 right-0 group-hover:flex hidden transition-all duration-300 ease-in-out"
                                      onClick={() => {
                                        setAnnotations({
                                          ...annotations,
                                          [sideIndex]: {
                                            ...annotations[sideIndex],
                                            [p.id]: undefined,
                                          },
                                        });
                                      }}
                                    >
                                      <span
                                        style={{
                                          height: "100%",
                                          width: "100%",
                                        }}
                                      >
                                        <RxCross2 color="red" />
                                      </span>
                                    </div>
                                  </div>
                                </DraggbleComp>
                              )}
                          </DroppableComp>
                        </div>
                      )
                    )}
                  </div>
                </div>
                {/* Drop Points */}
                <Ear />

                {/* Drop area ie: Ear */}
              </div>
              {/* Buy Button */}
              <div className="flex justify-center w-[300px] my-12">
                <BuyButton addedProducts={addedProducts} earRef={earRef} />
              </div>
              {/* Buy Button */}
            </div>
          </div>

          {/* Tabs */}
          <Tabs />
          {/* Tabs */}
        </div>
      </DndContext>
    </div>
  );
};
export default View;
