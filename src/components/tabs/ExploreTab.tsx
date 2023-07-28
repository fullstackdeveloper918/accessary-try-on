import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { FormEvent, useState } from "react";
import { products } from "../../api/products";

const ExploreTab = () => {
  const [searchValue, setSearchValue] = useState<string>();
  // const [allProducts, setAllProducts] = useState<
  //   { images: { src: string | undefined }[] }[]
  // >([]);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(
  //       "https://clickthemart.com/api/collectionsfineear"
  //     );
  //     const data = await response.json();
  //     // setAllProducts(data?.data);
  //     console.log("data", data?.data);
  //   })();
  // }, []);
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      searchValue === "" ||
      searchValue === undefined ||
      searchValue === null
    ) {
      return;
    } else {
      console.log("seachValue", searchValue);
    }
  };
  return (
    <>
      <form
        className="flex items-center justify-start my-4"
        onSubmit={(e) => handleSearch(e)}
      >
        <input
          type="search"
          className="px-4 py-2 rounded-md bg-white text-black"
          placeholder="search"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button
          className="mx-1 border border-slate-500 px-4 py-2 rounded-md"
          type="submit"
        >
          Search
        </button>
      </form>
      {/* These are the products that will be dragged */}
      <div className="flex gap-3 flex-wrap">
        {products.map((product) => (
          // <DraggableCus data={product} key={product.id} />
          // <DraggableComp
          //   id={product.id.toString()}
          //   key={product.id}
          //   info={product}
          // />
          <DraggableTest
            id={product.id.toString()}
            data={product}
            key={product.id}
          />
        ))}
        {/* {allProducts.map((product, idx) => (
          <div
            key={idx}
            className="w-24 h-24 py-3 cursor-pointer border border-slate-500 rounded-md px-6"
          >
            <img
              draggable="false"
              className="w-full h-full object-cover"
              src={product.images[0].src}
              alt=""
            />
          </div>
        ))} */}
      </div>
    </>
  );
};
export default ExploreTab;

const DraggableTest = ({
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
