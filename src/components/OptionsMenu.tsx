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
import { useAnnotationsStore } from "@/store/annotations";
import { RefObject, useState } from "react";
import { AlertMessage } from "./AlertMessage";
import { exportAsImage } from "@/lib/exportAsImage";

export function OptionsMenu({
  earRef,
  imageRef,
}: {
  earRef: RefObject<HTMLDivElement>;
  imageRef: RefObject<HTMLImageElement>;
}) {
  const [IsLogInError, setIsLogInError] = useState<boolean>(false);
  const { annotations, setAnnotations } = useAnnotationsStore();
  const saveLook = async () => {
    const input = document.querySelector("#customer_id") as HTMLInputElement;
    // if (input?.value) {
    const response = await callApi(`mylooks`, {
      options: {
        method: "POST",
        body: JSON.stringify({
          customer_id: input.value,
          mylook_data: JSON.stringify(annotations),
          mylook_image: "shopify_test.png",
        }),
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
    }
    // } else {
    // console.log("you need to login first");
    // setIsLogInError(true);
    // }
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
                console.log("Login");
                window.location.href = window.location.host + "/account/login";
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

          <DropdownMenuItem>
            <h3 className="px-4 py-2">Download</h3>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setAnnotations({});
            }}
          >
            <h3 className="px-4 py-2">Clear</h3>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              console.log("earRef", earRef);
              const image = await exportAsImage(
                earRef.current!,
                imageRef.current!
              );
              console.log("image", image);
              // saveLook();
            }}
          >
            <h3 className="px-4 py-2">Save</h3>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <h3 className="px-4 py-2">help</h3>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export default OptionsMenu;
