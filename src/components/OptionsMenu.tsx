import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OptionsMenu() {
  return (
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
        <DropdownMenuItem>
          <h3 className="px-4 py-2">Clear</h3>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <h3 className="px-4 py-2">Save</h3>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <h3 className="px-4 py-2">help</h3>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default OptionsMenu;
