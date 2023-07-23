import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Filter = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Button className="mr-1" variant="outline">
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10} align="end" className="p-3">
        <DropdownMenuItem>By date</DropdownMenuItem>
        <DropdownMenuItem>By days</DropdownMenuItem>
        <DropdownMenuItem>By status</DropdownMenuItem>
        <DropdownMenuItem>By batch</DropdownMenuItem>
        <DropdownMenuItem>By Category</DropdownMenuItem>
        <DropdownMenuItem>By Tag</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
