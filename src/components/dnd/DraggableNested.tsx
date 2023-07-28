import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableNested = ({
  id,
  data,
}: {
  id: string;
  data: {
    name: string;
    img: string;
    id: number;
    type: "circle" | "dot";
    variants: {
      [position: string]: {
        image: string;
      };
    };
  };
}) => {
  const { attributes, transform, setNodeRef, listeners } = useDraggable({
    id: id.toString(),
  });
  return (
    <>
      <div className="w-36 h-36 cursor-pointer border border-slate-500 rounded-md p-2">
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
        <p className="h-2/6 text-sm truncate">{data.name}</p>
      </div>
    </>
  );
};
export default DraggableNested;
