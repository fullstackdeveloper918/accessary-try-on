import { useEar } from "@/store/earDetails";
import { useMemo } from "react";

const Ear = () => {
  const { side, colorComplex } = useEar();
  const sideIndex = useMemo(() => (side === "L" ? "left" : "right"), [side]);
  const lookup = {
    left: {
      light: "ears/leftLight.png",
      medium: "ears/leftMedium.png",
      dark: "ears/leftDark.png",
      darkest: "ears/leftDarkest.png",
    },
    right: {
      light: "ears/rightLight.png",
      medium: "ears/rightMedium.png",
      dark: "ears/rightDark.png",
      darkest: "ears/rightDarkest.png",
    },
  };
  return (
    <>
      {/* {side === "L" ? (
        <img
          //   src="https://clickthemart.com/storage/test.png"
          src="leftMedium.png"
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
      ) : (
        <img
          src="rightMedium.png"
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
      )} */}
      <img
        //   src="https://clickthemart.com/storage/test.png"
        src={lookup[sideIndex][colorComplex]}
        className="absolute top-0 left-0 w-full h-full object-contain"
      />
    </>
  );
};

export default Ear;
