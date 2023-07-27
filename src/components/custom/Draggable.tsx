import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { DragEvent, useRef } from "react";

const DraggableCus = ({
  data,
}: {
  data: { name: string; id: number; img: string };
}) => {
  const ghostImageRef = useRef<HTMLImageElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("application/json", JSON.stringify(data));
  };
  // const onTouchmove = (e: TouchEvent<HTMLDivElement>) => {
  //   if (ghostImageRef.current && imageRef.current) {
  //     ghostImageRef.current.hidden = false;
  //     ghostImageRef.current.style.height =
  //       imageRef.current.clientHeight + 30 + "px";
  //     ghostImageRef.current.style.width =
  //       imageRef.current.clientWidth + 30 + "px";
  //     ghostImageRef.current.style.top = e.touches[0].clientY - 30 + "px";
  //     ghostImageRef.current.style.left = e.touches[0].clientX - 30 + "px";
  //     ghostImageRef.current.src = imageRef.current.src;
  //   }
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   globalThis.touchedProduct = JSON.stringify(data);
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   globalThis.dragging = true;
  // };
  const { attributes, transform, setNodeRef, listeners } = useDraggable({
    id: data.id.toString(),
  });
  return (
    <>
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Translate.toString(transform),
        }}
        {...attributes}
        {...listeners}
      >
        <img className="fixed" ref={ghostImageRef} />
        <div
          draggable={true}
          className="w-24 h-24 py-3 cursor-pointer border border-slate-500 rounded-md px-6"
          // onTouchMove={(e) => onTouchmove(e)}
          onDragStart={(e) => onDragStart(e)}
          onTouchEnd={(e) => {
            console.log("touch end", e);
            if (ghostImageRef.current) {
              ghostImageRef.current.hidden = true;
            }
          }}
        >
          <img
            className="w-full h-full object-cover"
            ref={imageRef}
            src={data?.img}
            alt=""
          />
        </div>
      </div>
    </>
  );
};
export default DraggableCus;
