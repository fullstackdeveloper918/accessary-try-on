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
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { dropPoints } from "../api/points";
import { dummyProducts } from "../api/products";
import { useAnnotationsStore } from "../store/annotations";
import BuyButton from "./BuyButton";
import OptionsMenu from "./OptionsMenu";
import DraggbleComp from "./dnd/DraggableComp";
import DroppableComp from "./dnd/DroppableComp";
import Tabs from "./tabs";

const Field = () => {
  const earRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  // const { annotations, setAnnotations } = useAnnotationsStore();
  const annotations = useAnnotationsStore((state) => state.annotations);
  const setAnnotations = useAnnotationsStore((state) => state.setAnnotations);
  const [addedProducts, setAddedProducts] = useState<
    { price: number | undefined; variantId: number | undefined }[]
  >([]);

  async function addProducts(variantId: UniqueIdentifier) {
    // const variantResponse = await fetch(
    //   "https://clickthemart.com/api/productsimages/" + variantId
    // );
    // const variantResponse=await callApi(`productsimages/${variantId}`)
    // if (variantResponse.ok) {
    //   const variantData: { data: IVariantData } = await variantResponse.json();
    //   setAddedProducts((prev) => [
    //     ...prev,
    //     { price: +variantData.data.variant.price },
    //   ]);
    // }
    console.log(variantId);
  }
  useEffect(() => {
    if (annotations == undefined) return;
    const data = Object.values(annotations).map((an) => ({
      price: an?.price,
      variantId: an?.id,
    }));
    setAddedProducts(data);
  }, [annotations]);

  function handleDragEnd(event: DragEndEvent) {
    const {
      over,
      active: { id },
    } = event;
    if (over && over.id) {
      // fetch the variantInfo based on variantId

      addProducts(over.id);
      if (["A", "B", "C", "D", "E", "F", "G"].includes(id.toString())) {
        setAnnotations({
          ...annotations,
          [over.id]: annotations ? annotations[id] : undefined,
          [id]: undefined,
        });
      } else {
        const data = dummyProducts.find((p) => p.id == id);
        if (data) {
          setAnnotations({
            ...annotations,
            [over.id]: data,
          });
        }
      }
    }
  }
  useEffect(() => {}, [annotations]);
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
          <div className="bg-gray-100 rounded-md shadow-lg p-2">
            <div className="flex justify-between mb-2">
              <h2 className="text-lg">Lark & Berry</h2>
              <div className="cursor-pointer">
                <OptionsMenu earRef={earRef} imageRef={imageRef} />
              </div>
            </div>
            {/* Drop area ie: Ear */}
            <div
              ref={earRef}
              className="flex justify-center items-center relative w-[375px] h-[400px]"
            >
              {/* Drop Points */}
              <div className="flex gap-2 flex-col absolute top-0 left-0 z-10">
                <div className="h-full w-full">
                  {dropPoints.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        position: "absolute",
                        top: `${p.y}px`,
                        left: `${p.x}px`,
                        // height: "60px",
                        // width: "60px",
                        // border: "2px dashed gray",
                      }}
                    >
                      <DroppableComp id={p.id} key={p.id}>
                        {annotations !== undefined &&
                          annotations[p.id] !== undefined && (
                            <DraggbleComp id={p.id}>
                              <div className="group relative h-full w-full">
                                {annotations[p.id]?.type == "circle" ? (
                                  <img
                                    src={annotations[p.id]?.img}
                                    alt=""
                                    style={{
                                      height: "120px",
                                      width: "120px",
                                      objectFit: "cover",
                                      clipPath:
                                        "polygon(0 0, 45% 0, 55% 48%, 100% 46%, 100% 100%, 0 100%, 0% 70%, 0% 30%)",
                                      ...(p.id == "C"
                                        ? { transform: "rotate(300deg)" }
                                        : {}),
                                      ...(p.id == "E"
                                        ? {
                                            transform:
                                              "rotate(300deg) rotateY(46deg)",
                                          }
                                        : {}),
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={annotations[p.id]?.img}
                                    alt=""
                                    style={{
                                      height: "90px",
                                      width: "90px",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                                <div
                                  className="cursor-pointer absolute top-2 right-0 group-hover:flex hidden transition-all duration-300 ease-in-out"
                                  onClick={() => {
                                    setAnnotations({
                                      ...annotations,
                                      [p.id]: undefined,
                                    });
                                  }}
                                >
                                  <span
                                    style={{ height: "100%", width: "100%" }}
                                  >
                                    <RxCross2 color="red" />
                                  </span>
                                </div>
                              </div>
                            </DraggbleComp>
                          )}
                      </DroppableComp>
                    </div>
                  ))}
                </div>
              </div>
              {/* Drop Points */}
              <img
                ref={imageRef}
                src="https://clickthemart.com/storage/test.png"
                // src="test2.png"
                className="absolute top-0 left-0 w-full h-full object-contain"
              />

              {/* Drop area ie: Ear */}
            </div>
          </div>

          {/* Tabs */}
          <Tabs />
          {/* Tabs */}
        </div>
        {/* Buy Button */}
        <div className="flex justify-center w-[300px]">
          <BuyButton addedProducts={addedProducts} />
        </div>
        {/* Buy Button */}
      </DndContext>
    </div>
  );
};
export default Field;
