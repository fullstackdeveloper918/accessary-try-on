import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

import { callApi } from "@/api/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportAsImage } from "@/lib/exportAsImage";
import { useAnnotationsStore } from "@/store/annotations";
import { useSideOfEar } from "@/store/sideOfEar";
import { RefObject, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AlertMessage } from "./AlertMessage";

export function OptionsMenu({ earRef }: { earRef: RefObject<HTMLDivElement> }) {
  const [IsLogInError, setIsLogInError] = useState<boolean>(false);
  const { annotations, setAnnotations } = useAnnotationsStore();
  const { side, setSide } = useSideOfEar();
  const sideIndex = useMemo(
    () => (side === "L" ? ("left" as const) : ("right" as const)),
    [side]
  );
  const saveLook = async () => {
    const input = document.querySelector("#customer_id") as HTMLInputElement;
    if (input?.value) {
      const image = await exportAsImage(earRef.current!);
      const response = await callApi(`mylooks/${input.value}`, {
        method: "POST",
        body: JSON.stringify({
          customer_id: input.value,
          // customer_id: "7113628778769",
          mylook_data: JSON.stringify(annotations),
          mylook_image: image,
        }),
      });
      const data = await response.json();
      if (data.status === 201) {
        toast.success("look saved successfully.");
      } else {
        let errorMsg = "";
        Object.values(data.message).forEach((msg) => {
          errorMsg += msg + "\n";
        });
        toast.error(errorMsg);
      }
    } else {
      toast("you need to login first");
      setIsLogInError(true);
    }
  };
  return (
    <>
      <AlertMessage
        open={IsLogInError}
        title="Can not save look"
        description="you need to login first to save a look"
        action={
          <>
            <button
              onClick={() => {
                window.location.href =
                  window.location.host + "/account/login?from=custom-look";
              }}
            >
              Login
            </button>
          </>
        }
        onCancel={() => {
          setIsLogInError(false);
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <BsThreeDotsVertical />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer hover:bg-slate-100">
            <h3 className="px-4 py-2">Download</h3>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-slate-100"
            onClick={() => {
              setSide(side == "L" ? "R" : "L");
            }}
          >
            <h3 className="px-4 py-2">
              Show {side === "R" ? "Left" : "Right"} Ear
            </h3>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-slate-100"
            onClick={() => {
              setAnnotations({
                ...annotations,
                [sideIndex]: undefined,
              });
            }}
          >
            <h3 className="px-4 py-2">Clear</h3>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-slate-100"
            onClick={async () => {
              saveLook();
            }}
          >
            <h3 className="px-4 py-2">Save</h3>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-slate-100">
            <h3 className="px-4 py-2">help</h3>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export default OptionsMenu;
