import { useAnnotationsStore } from "@/store/annotations";

const MySelectionsTab = () => {
  const { annotations } = useAnnotationsStore();
  const selectedProducts = Object.values(annotations)
    .reduce(
      (
        acc:
          | {
              name: string;
              img: string;
              id: number;
              price: number;
              type: "circle" | "dot";
              variants: { [position: string]: { image: string } };
            }[]
          | undefined,
        cur:
          | {
              name: string;
              img: string;
              id: number;
              price: number;
              type: "circle" | "dot";
              variants: { [position: string]: { image: string } };
            }
          | undefined
      ) => {
        const exists = acc?.findIndex((p) => p?.id == cur?.id);
        if (exists !== -1) {
          return acc;
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return [...acc, cur];
        }
      },
      []
    )
    ?.filter(Boolean);
  return (
    <div className="flex flex-wrap">
      {selectedProducts?.map((annotation) => (
        <div className="border shadow-md w-44 h-44 p-4">
          <img
            src={annotation?.img}
            alt=""
            className="h-5/6 object-contain w-full"
          />
          <div className="h-1/6">
            <h2>{annotation?.name}</h2>
            {/* <p>{annotation?.price}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};
export default MySelectionsTab;
