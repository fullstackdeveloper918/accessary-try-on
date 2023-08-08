import { callApi } from "@/api/config";
import { useEar } from "@/store/earDetails";
import { useCallback, useEffect, useMemo, useState } from "react";

const Ear = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const { side, colorComplex } = useEar();
  const sideIndex = useMemo(() => (side === "R" ? 1 : 2), [side]);

  const fetchImage = useCallback(
    async (colorComplex: string, sideIndex: number) => {
      const res = await callApi(`earimages/${colorComplex}/${sideIndex}`);
      if (res.ok) {
        const data = await res.json();
        setImageUrl(data?.imageUrl);
      }
    },
    []
  );
  useEffect(() => {
    (async () => fetchImage(colorComplex, sideIndex))();
  }, [sideIndex, colorComplex, fetchImage]);
  return (
    <>
      <img
        src={imageUrl}
        className="absolute top-0 left-0 w-full h-full object-contain"
      />
    </>
  );
};

export default Ear;
