import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IProduct } from "../tabs/data.type";

const DraggableNested = ({ id, data }: { id: string; data: IProduct }) => {
  const { attributes, transform, setNodeRef, listeners } = useDraggable({
    id: id.toString(),
  });
  return (
    <>
      <div className="w-44 h-44 cursor-pointer border border-slate-500 rounded-md p-2">
        <img
          draggable="false"
          ref={setNodeRef}
          style={{
            transform: CSS.Translate.toString(transform),
          }}
          {...attributes}
          {...listeners}
          className="w-full h-4/6 object-contain"
          src={data?.img}
          alt=""
        />
        <p className="h-2/6 text-base truncate">{data?.name}</p>
      </div>
    </>
  );
};
export default DraggableNested;
