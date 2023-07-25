import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { dropPoints } from "../api/points";
import { products } from "../api/products";
import DroppableComp from "../components/DroppableComp";
import DraggableCus from "./Draggable";
import DroppableCus from "./Droppable";
import { useMyDragDropContext } from "../context/MyDragDropContext";
import { IAnnotation } from "../types/annotations.types";

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
      <div className="flex gap-4">
        {/* These are the products that will be dragged */}
        <div className="flex gap-3 flex-col">
          {products.map((product) => (
            <DraggableCus data={product} key={product.id} />
          ))}
        </div>
        {/* These are the points where products can be dropped */}
        <div className="flex gap-2 flex-col w-96 h-96">
          <DndContext onDragEnd={handleDragEnd}>
            <div
              className="relative h-full w-full"
              style={{
                backgroundImage: "url(test.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            >
              {dropPoints.map((p) => (
                <div
                  key={p.id}
                  style={{
                    position: "absolute",
                    top: `${p.y}`,
                    left: `${p.x}`,
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
      </div>
    </>
  );
};
export default Field;
