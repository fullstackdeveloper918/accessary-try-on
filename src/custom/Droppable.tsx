import { useState } from "react";
import DraggableCus from "./Draggable";
import DraggableComp from "../components/DraggableComp";

const DroppableCus = ({ idx }: { idx: number }) => {
  const [place, setPlace] = useState<{ id: number; name: string }>();
  return (
    <div
      style={{ border: "1px dashed gray", height: "100px", width: "100px" }}
      onDrop={(e) => {
        const data = JSON.parse(e.dataTransfer.getData("application/json"));
        setPlace(data);
        console.log(idx);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {place && (
        <DraggableComp idx={place.id} name={place.name} id={place.name} />
      )}
    </div>
  );
};
export default DroppableCus;
