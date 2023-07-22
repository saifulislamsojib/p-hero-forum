"use client";

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
    <div className="overflow-x-auto">
      <div className="flex items-center gap-1 sm:gap-3 mt-5 border-b min-w-[400px]">
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
    </div>
  );
};

export default FeedTab;
