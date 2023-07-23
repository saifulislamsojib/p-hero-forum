"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const tabItems = [
  {
    id: 1,
    title: "All Post",
  },
  {
    id: 2,
    title: "My Post",
    query: "my-post",
  },
  {
    id: 3,
    title: "Admin Post",
    query: "admin-post",
  },
  {
    id: 4,
    title: "Unresolved",
    query: "unresolved",
  },
  {
    id: 5,
    title: "Not Replied",
    query: "not-replied",
  },
];

const FeedTab = () => {
  const search = useSearchParams().get("category");
  return (
    <div className="overflow-x-auto border-b flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center gap-1 sm:gap-3 mt-5 min-w-[400px]">
        {tabItems.map(({ id, title, query }) => (
          <Link
            href={{ pathname: "/", query: query ? { category: query } : {} }}
            key={id}
            className={`p-1 ${
              query === search || (!query && !search)
                ? "border-primary"
                : "border-transparent"
            } rounded border-b-4 text-sm sm:text-base`}
          >
            {title}
          </Link>
        ))}
      </div>
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
    </div>
  );
};

export default FeedTab;
