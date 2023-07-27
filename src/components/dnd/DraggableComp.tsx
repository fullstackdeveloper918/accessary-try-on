import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableComp = ({
  id,
  data,
}: {
  id: string;
  data:
    | {
        name: string;
        img: string;
        id: number;
        type: "circle" | "dot";
        variants: {
          [position: string]: {
            image: string;
          };
        };
      }
    | undefined;
}) => {
  const { attributes, transform, setNodeRef, listeners } = useDraggable({
    id: id.toString(),
  });
  return (
    <>
      <div className="w-24 h-24 py-3 cursor-pointer border border-slate-500 rounded-md px-6">
        <img
          draggable="false"
          ref={setNodeRef}
          style={{
            transform: CSS.Translate.toString(transform),
          }}
          {...attributes}
          {...listeners}
          className="w-full h-full object-cover"
          src={data?.img}
          alt=""
        />
      </div>
    </>
  );
};
export default DraggableComp;
