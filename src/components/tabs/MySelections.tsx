import { useAnnotationsStore } from "@/store/annotations";
import DraggbleComp from "../dnd/DraggableComp";

const MySelectionsTab = () => {
  const { annotations } = useAnnotationsStore();
  const selectedProducts = Object.values(annotations)
    .reduce(
      (
        acc: (
          | {
              title: string;
              id: number;
              price: string;
              type: "circle" | "dot";
              image: string;
            }
          | undefined
        )[],
        cur:
          | {
              title: string;
              id: number;
              price: string;
              type: "circle" | "dot";
              image: string;
            }
          | undefined
      ) => {
        const exists = acc?.findIndex((p) => p?.id == cur?.id);
        if (exists === -1) {
          acc.push(cur);
        }
        return acc;
      },
      []
    )
    ?.filter(Boolean);
  return (
    <div className="flex flex-wrap">
      {selectedProducts?.map((product) => (
        <div className="border shadow-md w-44 h-44 p-4">
          <div className="h-5/6" key={product?.id}>
            <DraggbleComp id={product!.id.toString()}>
              <img
                src={product?.image}
                alt=""
                className="h-full object-contain w-full"
              />
            </DraggbleComp>
          </div>
          <div className="h-1/6">
            <h2>{product?.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MySelectionsTab;
