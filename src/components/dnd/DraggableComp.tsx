import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { PropsWithChildren } from "react";

const DraggbleComp = ({ id, children }: { id: string } & PropsWithChildren) => {
  const { attributes, transform, setNodeRef, listeners } = useDraggable({
    id: id.toString(),
  });

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
    >
      {children}
    </div>
  );
};
export default DraggbleComp;
