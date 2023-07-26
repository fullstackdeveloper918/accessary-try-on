import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";
import { useMyDragDropContext } from "../../context/MyDragDropContext";
import { IAnnotation } from "../../types/annotations.types";

const DraggableComp = ({
  id,
  info,
}: {
  id: string;
  info: IAnnotation[number] | undefined;
}) => {
  const { attributes, isDragging, transform, setNodeRef, listeners } =
    useDraggable({
      id: id.toString(),
    });
  const { setCurrentDragging } = useMyDragDropContext();
  useEffect(() => {
    if (isDragging) {
      setCurrentDragging("" + id);
    }
  }, [isDragging]);
  // const lookup={}

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      {...attributes}
      {...listeners}
    >
      <img
        src={info?.img}
        alt=""
        style={{
          height: "120px",
          width: "120px",
          objectFit: "cover",
          clipPath:
            "polygon(0 0, 45% 0, 55% 48%, 100% 46%, 100% 100%, 0 100%, 0% 70%, 0% 30%)",
          ...(id == "C" ? { transform: "rotate(300deg)" } : {}),
          ...(id == "E" ? { transform: "rotate(300deg) rotateY(46deg)" } : {}),
        }}
      />
    </div>
  );
};
export default DraggableComp;
