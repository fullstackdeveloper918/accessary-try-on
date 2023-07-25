import { FormEvent, useState } from "react";
import { products } from "../../api/products";
import DraggableCus from "../custom/Draggable";

const ExploreTab = () => {
  const [searchValue, setSearchValue] = useState<string>();
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
          className="px-4 py-2 rounded-md"
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
          <DraggableCus data={product} key={product.id} />
        ))}
      </div>
    </>
  );
};
export default ExploreTab;
