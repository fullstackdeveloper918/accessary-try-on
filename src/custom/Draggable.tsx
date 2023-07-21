const DraggableCus = ({ data }: { data: { name: string; id: number } }) => {
  return (
    <div
      draggable={true}
      className="p-3"
      style={{ padding: "10px", border: "1px solid gray", cursor: "pointer" }}
      onDragStart={(e) => {
        e.dataTransfer.setData("application/json", JSON.stringify(data));
      }}
    >
      {data.name}
    </div>
  );
};
export default DraggableCus;
