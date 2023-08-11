import { callApi } from "@/api/config";
import { useProductDetailsStore } from "@/store/productDetails";
import { useProductstore } from "@/store/products";
import { useEffect, useState } from "react";
import ExploreTab from "./ExploreTab";
import MyLooksTab from "./MyLooksTab";
import MySelectionsTab from "./MySelections";
import { IProduct } from "./data.type";
import ProductDetailsTab from "./ProductDetails";

const Tabs = () => {
  const { showDetails } = useProductDetailsStore();
  const tabs = [
    "Explore",
    "Curated Looks",
    "My Selections",
    "My Looks",
    "detailed",
  ] as const;
  const [currentTab, setCurrentTab] =
    useState<(typeof tabs)[number]>("Explore");
  const setProducts = useProductstore((state) => state.setProducts);
  useEffect(() => {
    (async () => {
      const response = await callApi("collectionsfineear");
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
      component: <MySelectionsTab />,
    },
    "My Looks": {
      component: <MyLooksTab />,
    },
    detailed: {
      component: <ProductDetailsTab />,
    },
  };
  useEffect(() => {
    if (showDetails === true) {
      setCurrentTab("detailed");
    } else {
      setCurrentTab("Explore");
    }
  }, [showDetails]);
  return (
    <div style={{ maxWidth: "700px" }}>
      <ul className="flex gap-6 mb-4">
        {tabs
          .filter((el) => el !== "detailed")
          .map((tab) => (
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
