import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IProduct } from "../tabs/data.type";

const DraggableNested = ({ id, data }: { id: string; data: IProduct }) => {
  const { attributes, transform, setNodeRef, listeners } = useDraggable({
    id: id.toString(),
  });
  return (
    <div className="w-44 h-48 cursor-pointer border border-slate-500 rounded-md">
      <div className="h-40 w-full p-2">
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
      <button
        className=" bg-black text-white p-2 rounded-md"
        onClick={() => {
          console.log("add to cart", id);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          add_to_single_product(id);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};
export default DraggableNested;
