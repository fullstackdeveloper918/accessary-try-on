import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IProduct } from "../tabs/data.type";

const DraggableNested = ({ id, data }: { id: string; data: IProduct }) => {
  const { attributes, transform, setNodeRef, listeners } = useDraggable({
    id: id.toString(),
  });
  return (
    <div className="w-full cursor-pointer  produc-exp-item">
      <div className="w-full p-2">
        <div className="img-prodwrap">
          <img
          draggable="false"
          ref={setNodeRef}
          style={{
            transform: CSS.Translate.toString(transform),
          }}
          {...attributes}
          {...listeners}
          className="w-full prod-img-exp"
          src={data?.image?.src}
          alt=""
        />
        </div>
        
        <p className="h-2/6 text-base truncate title-prod">{data?.title}</p>
      </div>
    </div>
  );
};
export default DraggableNested;
