const DraggableCus = ({ data }: { data: { name: string; id: number } }) => {
  return (
    <div
      draggable={true}
      className="py-3 cursor-pointer border border-slate-500 rounded-md px-6"
      onDragStart={(e) => {
        e.dataTransfer.setData("application/json", JSON.stringify(data));
      }}
    >
      {data.name}
    </div>
  );
};
export default DraggableCus;
