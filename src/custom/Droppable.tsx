import { useState } from "react";

const DroppableCus = ({ idx }: { idx: number }) => {
  const [place, setPlace] = useState("");
  return (
    <div
      style={{ border: "1px dashed gray", height: "100px", width: "100px" }}
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
