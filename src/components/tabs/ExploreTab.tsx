import { FormEvent, useState } from "react";
import { dummyProducts } from "../../api/products";
import DraggableNested from "../dnd/DraggableNested";
import { useProductstore } from "@/store/products";

const ExploreTab = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const { products } = useProductstore();

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
        {dummyProducts?.map((product) => (
          <DraggableNested
            id={product.id.toString()}
            data={product}
            key={product.id}
          />
        ))}
        {products.map((product, idx) => (
          <div
            key={idx}
            className="w-44 h-44 cursor-pointer border border-slate-500 rounded-md p-2"
          >
            <img
              draggable="false"
              className="w-full h-4/6 object-contain"
              src={product?.image?.src}
              alt=""
            />
            <p className="h-2/6 text-base truncate">{product?.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default ExploreTab;
