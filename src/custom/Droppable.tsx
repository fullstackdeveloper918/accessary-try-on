import { useState } from "react";

const DroppableCus = ({ idx }: { idx: number }) => {
  const [place, setPlace] = useState("");
  return (
    <div
      className="h-16 w-16"
      style={{ border: "2px dashed gray" }}
      onDrop={(e) => {
        const data = JSON.parse(e.dataTransfer.getData("application/json"));
        setPlace(data.name);
        console.log(idx);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {place}
    </div>
  );
};
export default DroppableCus;
