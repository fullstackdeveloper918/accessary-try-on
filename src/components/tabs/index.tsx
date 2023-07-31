import { useEffect, useState } from "react";
import ExploreTab from "./ExploreTab";
import { useProductstore } from "@/store/products";
import { IProduct } from "./data.type";

const Tabs = () => {
  const tabs = [
    "Explore",
    "Curated Looks",
    "My Selections",
    "My Looks",
  ] as const;
  const [currentTab, setCurrentTab] =
    useState<(typeof tabs)[number]>("Explore");
  const setProducts = useProductstore((state) => state.setProducts);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://clickthemart.com/api/collectionsfineear"
      );
      const data: {
        data: Response;
      } = await response.json();
      const modified = Object.entries(data.data).reduce(
        (acc: IProduct[], [key, value]) => {
          const cur = value.products.map((val: IProduct) => ({
            ...val,
            shape: key,
          }));
          return [...acc, cur];
        },
        []
      );
      const modifiedProductsArray = modified.flat();
      setProducts(modifiedProductsArray);
    })();
  }, [setProducts]);
  const lookup = {
    Explore: {
      component: <ExploreTab />,
    },
    "Curated Looks": {
      component: <div>Curated Looks</div>,
    },
    "My Selections": {
      component: <div>My Selections</div>,
    },
    "My Looks": {
      component: <div>My Looks</div>,
    },
  };
  return (
    <div style={{ maxWidth: "600px" }}>
      <ul className="flex gap-6 mb-4">
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => {
              setCurrentTab(tab);
            }}
            className="text-base md:text-xl font-semibold cursor-pointer "
            style={{
              textDecoration: currentTab === tab ? "underline" : "none",
            }}
          >
            {tab}
          </li>
        ))}
      </ul>
      {lookup[currentTab].component}
    </div>
  );
};
export default Tabs;
