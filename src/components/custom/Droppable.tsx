import { Dispatch, SetStateAction } from "react";
import DraggableComp from "../dnd/DraggableComp";
import { IAnnotation } from "../../types/annotations.types";

const DroppableCus = ({
  idx,
  annotations,
  setAnnotations,
}: {
  idx: string;
  annotations: IAnnotation | undefined;
  setAnnotations: Dispatch<SetStateAction<IAnnotation | undefined>>;
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
        <DraggableComp info={annotations[idx]} id={idx} />
      )}
    </div>
  );
};
export default DroppableCus;
