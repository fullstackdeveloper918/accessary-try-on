import { useProductstore } from "@/store/products";
import { FormEvent, useState } from "react";
import DraggableNested from "../dnd/DraggableNested";
import { dummyProducts } from "@/api/products";

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
        className="flex items-center justify-start my-4 Searchbar-tab"
        onSubmit={(e) => handleSearch(e)}
      >
        <div className="search-field flex">
          <div className="search-field-input">
            <input
              type="search"
              className="px-4 py-2 rounded-md bg-white text-black"
              placeholder="Search"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
          <button
            className="mx-1 border border-slate-500 px-4 py-2 rounded-md"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      {/* These are the products that will be dragged */}
      <div className="flex gap-2 flex-wrap produc-exp-ui">
        {dummyProducts?.map((product) => (
          <DraggableNested
            id={product.id.toString()}
            data={product}
            key={product.id}
          />
        ))}
        {/* #TODO : changes needed to make dynamic */}
        {/* {
          products.map((product) => (
            <DraggableNested
              id={product?.id.toString()}
              data={product}
              key={product?.id}
            />
          ))[0]
        } */}
      </div>
    </>
  );
};
export default ExploreTab;
