import { callApi } from "@/api/config";
import { useAnnotationsStore } from "@/store/annotations";
import { useEffect, useState } from "react";
const MyLooksTab = () => {
  const [myLooks, setMyLooks] = useState<
    {
      mylook_data: string;
      customer_id: number;
      mylook_image:string
    }[]
  >([]);
  const { setAnnotations } = useAnnotationsStore();
  //   const customer_id = document.querySelector(
  //     "#customer_id"
  //   ) as HTMLInputElement;
  const customer_id = {
    value: "7113628778769",
  };
  useEffect(() => {
    if (!customer_id?.value) return;
    (async () => {
      const response = await callApi(`mylooks/${customer_id?.value}`);
      if (response.ok) {
        const looks = await response.json();
        setMyLooks(looks?.data);
      }
    })();
  }, [customer_id?.value]);
  const displayLook = (idx: number) => {
    setAnnotations(JSON.parse(myLooks[idx]?.mylook_data));
  };
  if (!customer_id?.value) {
    return <div>you need to login first</div>;
  }
  return (
    <div className="flex flex-wrap gap-4">
      {myLooks.map((look, idx) => (
        <div
          className="w-52 h-52 border shadow-md"
          onClick={() => displayLook(idx)}
        >
          <img
            src={look?.mylook_image}
            alt=""
            className="h-full w-full "
          />
          {/* <h2>{look?.customer_id}</h2> */}
        </div>
      ))}
    </div>
  );
};
export default MyLooksTab;
