import { Dispatch, SetStateAction, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { IAnnotation } from "../../types/annotations.types";
import DraggableComp from "../dnd/DraggableComp";

const DroppableCus = ({
  idx,
  annotations,
  setAnnotations,
}: {
  idx: string;
  annotations: IAnnotation | undefined;
  setAnnotations: Dispatch<SetStateAction<IAnnotation | undefined>>;
}) => {
  const droppableRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={droppableRef}
      className="h-16 w-16 border border-dashed group"
      style={{ borderColor: "#ffffff10" }}
      onDrop={(e) => {
        console.log("dropped");
        // const data = JSON.parse(e.dataTransfer.getData("application/json"));
        // setAnnotations((prev) => ({
        //   ...prev,
        //   [idx]: data,
        // }));
        // if (droppableRef.current) {
        //   droppableRef.current.style.borderColor = "#ffffff10";
        // }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (droppableRef.current) {
          droppableRef.current.style.borderColor = "#ffffff10";
        }
      }}
      onDragEnter={() => {
        if (droppableRef.current) {
          droppableRef.current.style.borderColor = "#ffffff80";
        }
      }}
    >
      {annotations !== undefined && annotations[idx] !== undefined && (
        <>
          <DraggableComp info={annotations[idx]} id={idx} />
          <span
            className="cursor-pointer absolute top-2 right-0 group-hover:flex hidden transition-all duration-300 ease-in-out"
            onClick={() => {
              setAnnotations((prev) => ({
                ...prev,
                [idx]: undefined,
              }));
            }}
          >
            <RxCross2 color="red" />
          </span>
        </>
      )}
    </div>
  );
};
export default DroppableCus;
