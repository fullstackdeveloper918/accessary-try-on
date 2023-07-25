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
        // border: "1px solid",
        // backgroundColor: "red",
        borderColor: isOver ? "#4c9ffe" : "transparent",
      }}
      ref={setNodeRef}
    >
      {children}
      {/* <div className="absolute top-0 left-0 h-1 w-1"></div> */}
    </div>
  );
};
export default DroppableComp;
