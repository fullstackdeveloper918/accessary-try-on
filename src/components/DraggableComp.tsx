import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableComp = ({
  name,
  id,
  idx,
}: {
  id: number | UniqueIdentifier;
  name: string;
  idx: number;
}) => {
  const { attributes, isDragging, transform, setNodeRef, listeners } =
    useDraggable({
      id: id.toString(),
      data: {
        name,
        idx,
      },
    });
  // console.log("attributes", name, attributes);
  // console.log("isDragging", name, isDragging);
  // console.log("transform", name, transform);
  return (
    <button
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        boxShadow: isDragging
          ? "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
          : undefined,
      }}
      {...attributes}
      {...listeners}
    >
      <div>{name}</div>
    </button>
  );
};
export default DraggableComp;
