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
  return (
    <img
      src={info?.img}
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        boxShadow: isDragging
          ? "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
          : undefined,
        height: "120px",
        width: "120px",
        objectFit: "cover",
        clipPath:
          "polygon(0 0, 49% 0, 56% 43%, 100% 37%, 100% 100%, 0 100%, 0% 70%, 0% 30%)",
      }}
      {...attributes}
      {...listeners}
    />
  );
};
export default DraggableComp;
