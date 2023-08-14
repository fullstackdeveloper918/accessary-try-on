import { callApi } from "@/api/config";
import { useEar } from "@/store/earDetails";
import { useProductDetailsStore } from "@/store/productDetails";
import { useProductstore } from "@/store/products";
import { Position } from "@/types/annotations.types";
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
  const { setProduct, setShowDetails } = useProductDetailsStore();
  const side = useEar((state) => state.side);
  const sideIndex = useMemo(
    () => (side === "L" ? ("left" as const) : ("right" as const)),
    [side]
  );
  const [currentPoint, setCurrentPoint] = useState<UniqueIdentifier>();

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
      setProduct({
        id: product.id,
        position: position as Position,
      });
      setCurrentPoint(position);
      const variantData: { data: [{ variants: IVariant[] }] } =
        await productResponse.json();
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
            options: variantData.data[0].variants,
            // #TODO : changes needed to make dynamic
            // image: "firstRingEdited.png",
            images: normalized.imagesAll,
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
        if (annotations[sideIndex][over.id]) {
          setShowDetails(true);
          setProduct({
            id: annotations[sideIndex][id].id,
            position: over.id as Position,
          });
          setCurrentPoint(id);
        }
        setAnnotations({
          ...annotations,
          [sideIndex]: {
            ...annotations[sideIndex],
            [id]: undefined,
            [over.id]:
              annotations && annotations[sideIndex]
                ? annotations[sideIndex][id]
                : undefined,
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
  function remove() {
    if (currentPoint) {
      setAnnotations({
        ...annotations,
        [sideIndex]: {
          ...annotations[sideIndex],
          [currentPoint as string]: undefined,
        },
      });
      setCurrentPoint(undefined);
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
  const clipPathLookup = {
    left: {
      A: "polygon(0 0, 100% 0, 100% 20%, 41% 25%, 67% 81%, 50% 90%, 0 100%, 0% 30%)",
      B: "polygon(30% 0%, 70% 0%, 100% 1%, 100% 100%, 70% 100%, 26% 94%, 40% 64%, 68% 39%)",
      C: "polygon(0 0, 70% 0%, 100% 1%, 100% 100%, 70% 100%, 55% 100%, 62% 50%, 0 45%)",
      D: "polygon(44% 15%, 100% 0, 100% 41%, 100% 100%, 0 100%, 0 41%, 51% 57%)",
      E: "polygon(35% 52%, 25% 0, 100% 0, 100% 100%, 70% 100%, 47% 100%, 0 100%, 0 66%)",
      F: "polygon(0 0, 51% 0, 51% 45%, 100% 37%, 100% 100%, 47% 100%, 0 100%, 0 66%)",
    },
    right: {
      A: "polygon(0 0, 100% 0, 100% 20%, 41% 25%, 67% 81%, 50% 90%, 0 100%, 0% 30%)",
      B: "polygon(30% 0%, 70% 0%, 100% 1%, 100% 100%, 70% 100%, 26% 94%, 40% 64%, 68% 39%)",
      C: "polygon(0 0, 70% 0%, 100% 1%, 100% 100%, 70% 100%, 47% 100%, 52% 50%, 0 45%)",
      D: "polygon(44% 15%, 100% 0, 100% 41%, 100% 100%, 0 100%, 0 41%, 51% 57%)",
      E: "polygon(35% 52%, 25% 0, 100% 0, 100% 100%, 70% 100%, 47% 100%, 0 100%, 0 66%)",
      F: "polygon(0 0, 51% 0, 51% 45%, 100% 37%, 100% 100%, 47% 100%, 0 100%, 0 66%)",
    },
  };
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  return (
    <div>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div className="flex gap-4 flex-wrap m-6">
          <div>
            <div>
              {/* Options button */}
              <div className="flex justify-between p-2 bg-black mx-[14px] rounded-tr-xl rounded-tl-xl">
                <h2 className="text-lg text-white font-semibold">
                  Lark & Berry
                </h2>
                <div className="cursor-pointer text-white">
                  <OptionsMenu earRef={earRef} />
                </div>
              </div>
              {/* Options button */}
              {/* 
                  Drop area ie: Ear and points 
              */}
              <div
                ref={earRef}
                className="bg-gray-100 rounded-md shadow-lg flex justify-center items-center relative h-[400px] w-[375px]"
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
                                          annotations[sideIndex][p.id].images[
                                            p.id as Position
                                          ]
                                        }
                                        alt=""
                                        style={{
                                          height: "80px",
                                          width: "80px",
                                          objectFit: "contain",
                                          ...(sideIndex === "right"
                                            ? {
                                                transform: "scaleX(-1)",
                                              }
                                            : {}),
                                          ...(p.id === "F"
                                            ? sideIndex === "right"
                                              ? {
                                                  transform: "scaleX(1)",
                                                }
                                              : {
                                                  transform: "scaleX(-1)",
                                                }
                                            : {}),
                                          clipPath:
                                            clipPathLookup[sideIndex][
                                              p.id as Position
                                            ],
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={
                                          // #Important : for dot shape the image will always be placed at "dotImage" position as discussed
                                          annotations[sideIndex][p.id]?.images[
                                            "dotsImage"
                                          ]
                                        }
                                        alt=""
                                        style={{
                                          height: "80px",
                                          width: "80px",
                                          objectFit: "contain",
                                          // #Important : for left and right i am rotating the image left and right
                                          ...(sideIndex === "right"
                                            ? {
                                                transform: "scaleX(1)",
                                              }
                                            : {}),
                                        }}
                                      />
                                    )}
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
                {currentPoint ? (
                  <button
                    className="absolute bottom-2 right-6 hover:underline text-white  px-1 rounded-sm"
                    onClick={() => {
                      remove();
                    }}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              {/* Buy Button */}
              <div className="flex justify-center w-full  btn-prod-view mt-3">
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
