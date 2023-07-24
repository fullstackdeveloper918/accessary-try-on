import { useState } from "react";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import DraggableComp from "./DraggableComp";
import DroppableComp from "./DroppableComp";

interface ISelectedComponent {
  id: UniqueIdentifier | null;
  name: string;
  idx: number;
}
const DragDropContext = () => {
  const containers = ["A", "B", "C"];
  const [selectedComp, setSelectedComp] = useState<ISelectedComponent>({
    id: null,
    name: "",
    idx: 0,
  });
  const items = [
    { id: 0, name: "one" },
    { id: 1, name: "two" },
    { id: 2, name: "three" },
  ];
  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    console.log("event", event);
    // setSelectedComp(over ? over.id : null);
    setSelectedComp({
      id: over ? over.id : null,
      // @ts-ignore
      name: active ? active.data.name : "",
      // @ts-ignore
      idx: active ? active.data.idx : 0,
    });
  }
  function handleDragStart(e: DragStartEvent) {
    if (e.active.data) {
      // @ts-ignore
      e.active.data.name = "form";
      // @ts-ignore
      e.active.data.idx = 1;
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="flex justify-center gap-3">
        {items.map((item, idx) => (
          <DraggableComp
            key={item.id}
            id={item.id}
            name={item.name}
            idx={idx}
          />
        ))}
      </div>

      <div className="flex">
        {containers.map((id) => (
          <DroppableComp key={id} id={id}>
            {/* {parent === id ? item : "Drop here"} */}
            {/* {selectedComp !== null && items[0].component} */}
            {selectedComp.id !== null && (
              <DraggableComp
                id={selectedComp.id}
                name={selectedComp.name}
                idx={selectedComp.idx}
              />
            )}
          </DroppableComp>
        ))}
      </div>
    </DndContext>
  );
};
export default DragDropContext;
