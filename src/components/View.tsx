import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { dropPoints } from "../api/points";
import Tabs from "./tabs";
import { useMyDragDropContext } from "../context/MyDragDropContext";
import { IAnnotation } from "../types/annotations.types";
import DroppableCus from "./custom/Droppable";
import DroppableComp from "./dnd/DroppableComp";

const Field = () => {
  const [annotations, setAnnotations] = useState<IAnnotation>();
  const { currentDragging } = useMyDragDropContext();

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;
    if (over && over.id) {
      setAnnotations((prev) => ({
        ...prev,
        [over.id]: prev![currentDragging],
        [currentDragging]: undefined,
      }));
    }
  }
  return (
    <>
      <div className="flex gap-4 flex-wrap">
        {/* These are the points where products can be dropped */}
        <div className="flex justify-center items-center relative w-96 h-96 ">
          <div className="flex gap-2 flex-col absolute top-0 left-0 z-10">
            <DndContext onDragEnd={handleDragEnd}>
              <div
                className="h-full w-full"
                // style={{
                //   backgroundImage: "url(test.png)",
                //   backgroundRepeat: "no-repeat",
                //   backgroundSize: "contain",
                // }}
              >
                {dropPoints.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      // width: `${p.width}px`,
                      // height: `${p.height}px`,
                      // rotate: `${p.rotate}deg`,
                      position: "absolute",
                      top: `${p.y}px`,
                      left: `${p.x}px`,
                    }}
                  >
                    <DroppableComp id={p.id}>
                      <DroppableCus
                        idx={p.id}
                        annotations={annotations}
                        setAnnotations={setAnnotations}
                      />
                    </DroppableComp>
                  </div>
                ))}
              </div>
            </DndContext>
          </div>
          <img
            src="test.png"
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>
        <Tabs />
      </div>
    </>
  );
};
export default Field;
