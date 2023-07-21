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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 150,
        border: "1px solid",
        margin: 20,
        borderColor: isOver ? "#4c9ffe" : "#EEE",
      }}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};
export default DroppableComp;
