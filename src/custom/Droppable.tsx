import { Dispatch, SetStateAction } from "react";
import DraggableComp from "../components/DraggableComp";

const DroppableCus = ({
  idx,
  annotations,
  setAnnotations,
}: {
  idx: string;
  annotations: { [id: string]: { name: string } | undefined } | undefined;
  setAnnotations: Dispatch<
    SetStateAction<{ [id: string]: { name: string } | undefined } | undefined>
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
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {annotations !== undefined && annotations[idx] !== undefined && (
        <DraggableComp name={annotations[idx]?.name} id={idx} />
      )}
    </div>
  );
};
export default DroppableCus;
