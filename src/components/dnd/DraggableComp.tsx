import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";
import { useMyDragDropContext } from "../../context/MyDragDropContext";

const DraggableComp = ({
  id,
  info,
}: {
  id: number | UniqueIdentifier;
  info:
    | {
        name: string;
        img: string;
        variants: {
          [position: string]: {
            image: string;
          };
        };
      }
    | undefined;
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
    // <button
    //   ref={setNodeRef}
    //   style={{
    //     transform: CSS.Translate.toString(transform),
    //     boxShadow: isDragging
    //       ? "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
    //       : undefined,
    //   }}
    //   {...attributes}
    //   {...listeners}
    // >
    //   {info ? (
    //     <>
    //       <div>{info?.name}</div>
    //       <p>{info?.variants[id].image}</p>
    //     </>
    //   ) : null}
    // </button>
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
        // -webkit-clip-path: polygon(33% 0, 0% 100%, 100% 100%);
        clipPath: "polygon(25% 0, 0% 100%, 100% 100%)",
      }}
      {...attributes}
      {...listeners}
    />
  );
};
export default DraggableComp;
