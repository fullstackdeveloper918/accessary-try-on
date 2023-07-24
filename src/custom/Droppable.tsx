import { Dispatch, SetStateAction } from "react";
import DraggableComp from "../components/DraggableComp";

const DroppableCus = ({
  idx,
  annotations,
  setAnnotations,
}: {
  idx: number;
  annotations: { [id: string]: { name: string } } | undefined;
  setAnnotations: Dispatch<
    SetStateAction<{ [id: string]: { name: string } } | undefined>
  >;
}) => {
  return (
    <div
      className="h-16 w-16 border border-dashed"
      style={{ borderColor: "#ffffff70" }}
      onDrop={(e) => {
        const data = JSON.parse(e.dataTransfer.getData("application/json"));
        setAnnotations((prev) => ({
          ...prev,
          [idx]: data,
        }));
        console.log(idx);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {annotations !== undefined && annotations[idx] !== undefined && (
        <DraggableComp idx={idx} name={annotations[idx].name} id={idx} />
      )}
    </div>
  );
};
export default DroppableCus;
