import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { dropPoints } from "../api/points";
import { products } from "../api/products";
import { IAnnotation } from "../types/annotations.types";
import DraggbleComp from "./dnd/DraggableComp";
import DroppableComp from "./dnd/DroppableComp";
import Tabs from "./tabs";

const Field = () => {
  const [annotations, setAnnotations] = useState<IAnnotation>();

  function handleDragEnd(event: DragEndEvent) {
    const {
      over,
      active: { id },
    } = event;
    if (over && over.id) {
      if (["A", "B", "C", "D", "E", "F", "G"].includes(id.toString())) {
        setAnnotations((prev) => ({
          ...prev,
          [over.id]: prev ? prev[id] : undefined,
          [id]: undefined,
        }));
      } else {
        const data = products.find((p) => p.id == id);
        if (data) {
          setAnnotations((prev) => ({
            ...prev,
            [over.id]: data,
          }));
        }
      }
    }
  }
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 250,
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
    <>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div className="flex gap-4 flex-wrap m-6">
          {/* Drop area ie: Ear */}
          <div className="flex justify-center items-center relative w-[375px] h-[400px] ">
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
                                  setAnnotations((prev) => ({
                                    ...prev,
                                    [p.id]: undefined,
                                  }));
                                }}
                              >
                                <span style={{ height: "100%", width: "100%" }}>
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
              src="https://clickthemart.com/storage/test.png"
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
            {/* Drop area ie: Ear */}
          </div>
          {/* Tabs */}
          <Tabs />
          {/* Tabs */}
        </div>
      </DndContext>
    </>
  );
};
export default Field;

// const DraggbleCompNesed = ({
//   id,
//   children,
// }: { id: string } & PropsWithChildren) => {
//   const { attributes, transform, setNodeRef, listeners } = useDraggable({
//     id: id.toString(),
//   });
//   return (
//     <div
//       {...attributes}
//       {...listeners}
//       ref={setNodeRef}
//       style={{
//         transform: CSS.Translate.toString(transform),
//       }}
//     >
//       {children}
//     </div>
//   );
// };
