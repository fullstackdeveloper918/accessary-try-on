import { FormEvent, useEffect, useState } from "react";
import { products } from "../../api/products";
import DraggableNested from "../dnd/DraggableNested";
import { Product, Response } from "./data.type";

const ExploreTab = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://clickthemart.com/api/collectionsfineear"
      );
      const data: {
        data: Response;
      } = await response.json();
      const modified = Object.entries(data.data).reduce(
        (acc: Product[], [key, value]) => {
          const cur = value.products.map((val: Product) => ({
            ...val,
            shape: key,
          }));
          return [...acc, cur];
        },
        []
      );
      setAllProducts(modified.flat());
    })();
  }, []);
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
          <DraggableNested
            id={product.id.toString()}
            data={product}
            key={product.id}
          />
        ))}
        {allProducts.map((product, idx) => (
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
        ))}
      </div>
    </>
  );
};
export default ExploreTab;
