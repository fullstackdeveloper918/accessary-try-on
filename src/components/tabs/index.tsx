import { callApi } from "@/api/config";
import { cn } from "@/lib/utils";
import { useProductDetailsStore } from "@/store/productDetails";
import { useProductstore } from "@/store/products";
import { useEffect, useState } from "react";
import ExploreTab from "./ExploreTab";
import MyLooksTab from "./MyLooksTab";
import MySelectionsTab from "./MySelections";
import ProductDetailsTab from "./ProductDetails";
import { IProduct } from "./data.type";

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
      component: <div className="text-left	mt-2">Curated Looks</div>,
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
    <div className="right-prodview w-full">
      <ul className="flex gap-2 mb-4 tabsui flex-wrap">
        {tabs
          .filter((el) => el !== "detailed")
          .map((tab) => (
            <li
              key={tab}
              onClick={() => {
                setCurrentTab(tab);
              }}
              className={cn(
                "text-base md:text-2xl font-semibold cursor-pointer ",
                {
                  "active-tab": currentTab === tab,
                }
              )}
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
