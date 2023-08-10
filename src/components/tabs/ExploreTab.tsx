import { useProductstore } from "@/store/products";
import { FormEvent, useState } from "react";
import DraggableNested from "../dnd/DraggableNested";

const ExploreTab = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const { products } = useProductstore();
  console.log("products", products);

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
        {/* {dummyProducts?.map((product) => (
          <DraggableNested
            id={product.id.toString()}
            data={product}
            key={product.id}
          />
        ))} */}
        {/* #TODO : changes needed to make dynamic */}
        {products.map((product) => (
          <DraggableNested
            id={product?.id.toString()}
            data={product}
            key={product?.id}
          />
        ))}
      </div>
    </>
  );
};
export default ExploreTab;
