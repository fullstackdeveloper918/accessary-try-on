import { useDroppable  } from "@dnd-kit/core";

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
        border: "1px solid gray",
        height: "60px",
        width: "60px",
        position: "relative",
        // border: '1px solid red',
        borderColor: isOver ? "#4c9ffe" : "transparent",
        // borderColor: "#4c9ffe",
      }}
      ref={setNodeRef}
    >
      <div style={{ height: "100%", width: "100%" }}>{children}</div>
    </div>
  );
};



export const DroppableAddOnComp = ({ id, children }: DroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  
  return (
    <div
      style={{
        border: "1px solid gray",
        height: "60px",
        width: "60px",
        position: "relative",
        // border: '1px solid red',
        borderColor: isOver ? "#4c9ffe" : "transparent",
        // borderColor: "red",
      }}
      ref={setNodeRef}
    >
      <div style={{ height: "100%", width: "100%" }}>{children}</div>
    </div>
  );
};


export default DroppableComp;
