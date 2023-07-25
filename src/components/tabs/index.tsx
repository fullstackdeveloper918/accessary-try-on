import { useState } from "react";
import ExploreTab from "./ExploreTab";

const Tabs = () => {
  const tabs = [
    "Explore",
    "Curated Looks",
    "My Selections",
    "My Looks",
  ] as const;
  const [currentTab, setCurrentTab] =
    useState<(typeof tabs)[number]>("Explore");
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
    <div>
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
