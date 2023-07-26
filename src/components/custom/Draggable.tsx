const DraggableCus = ({
  data,
}: {
  data: { name: string; id: number; img: string };
}) => {
  return (
    <div
      draggable={true}
      className="w-24 h-24 py-3 cursor-pointer border border-slate-500 rounded-md px-6"
      onDragStart={(e) => {
        e.dataTransfer.setData("application/json", JSON.stringify(data));
      }}
    >
      <img className="w-full h-full object-cover" src={data?.img} alt="" />
    </div>
  );
};
export default DraggableCus;
