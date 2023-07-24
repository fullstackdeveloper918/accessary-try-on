import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DroppableComp from "../components/DroppableComp";
import DraggableCus from "./Draggable";
import DroppableCus from "./Droppable";
import { products } from "../api/products";
import { dropPoints } from "../api/points";
import { useState } from "react";

const Field = () => {
  const [annotations, setAnnotations] = useState<{
    [id: string]: { name: string };
  }>();

  function handleDragEnd(event: DragEndEvent) {
    console.log("event", event.over);
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
        <div className="flex gap-2 flex-col">
          <DndContext onDragEnd={handleDragEnd}>
            <div className="relative">
              {dropPoints.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    top: `${p.y}`,
                    left: `${p.x}`,
                  }}
                >
                  <DroppableComp id={idx.toString()}>
                    <DroppableCus
                      idx={idx}
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
