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
        borderColor: isOver ? "#4c9ffe" : "#EEE",
      }}
      className="flex items-center justify-center w-60 h-60 m-5"
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};
export default DroppableComp;
