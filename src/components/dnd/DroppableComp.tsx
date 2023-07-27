import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  children: React.ReactNode;
  id: string;
}

const DroppableComp = ({ id, children }: DroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      style={{
        border: "1px solid",
        height: "60px",
        width: "60px",
        position: "relative",
        borderColor: isOver ? "#4c9ffe" : "transparent",
      }}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};
export default DroppableComp;
