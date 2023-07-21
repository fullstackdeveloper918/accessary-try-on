import DraggableCus from "./Draggable";
import DroppableCus from "./Droppable";

const Field = () => {
  const data = [
    { name: "abc", id: 123 },
    { name: "def", id: 456 },
    { name: "ghi", id: 789 },
  ];
  const points = [
    {
      x: 0,
      y: 0,
    },
    {
      x: 100,
      y: 100,
    },
    {
      x: 200,
      y: 200,
    },
  ];
  return (
    <>
      <div
        className="flex items-center justify-center gap-4"
        style={{ display: "flex", gap: "10px", flexDirection: "column" }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          {data.map((dra) => (
            <DraggableCus data={dra} key={dra.id} />
          ))}
        </div>
        <div style={{ display: "flex" }}>
          {points.map((p, idx) => (
            <div
              key={idx}
              // style={{ position: "absolute", top: `${p.y}`, left: `${p.x}` }}
              style={{ display: "flex" }}
            >
              <DroppableCus idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Field;
