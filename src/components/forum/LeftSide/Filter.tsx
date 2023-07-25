"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import Select, { Option } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Filters = {
  status?: string;
  batch?: string;
  category?: string;
  tag?: string;
  days?: string;
};

const statusList = [
  "New",
  "Resolved",
  "Under investigation",
  "Unresolved",
  "Rejected",
].map((status) => ({
  value: status.toLowerCase(),
  label: status,
}));

const batches = [...Array(8)].map((_, index) => ({
  label: `Batch ${index + 1}`,
  value: `batch-${index + 1}`,
}));

const categories = [
  "Github",
  "Deployment",
  "Html & Css",
  "Javascript(problem-solving)",
  "Javascript(DOM)",
  "JavaScript(es6)",
  "JavaScript(API)",
  "React(core-concept)",
  "React Router",
  "Firebase Authentication",
  "Node(Express)",
  "Mongodb",
  "SCIC",
  "ACC",
  "Other",
].map((category) => ({
  value: category.toLowerCase().split(" ").join("-"),
  label: category,
}));

const tagsItems = [
  "Help",
  "Feedback",
  "Github",
  "Deployment",
  "Es6",
  "React",
].map((status) => ({
  value: status,
  label: status,
}));

const days = [...Array(7)].map((_, idx) => ({
  value: `${idx + 1} ${idx + 1 === 1 ? "day" : "days"}`,
  label: `${idx + 1} ${idx + 1 === 1 ? "day" : "days"}`,
}));

const Filter = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [filters, setFilters] = useState<Filters>({});
  const { push } = useRouter();
  const search = useSearchParams();
  const categorySearch = search.get("category");
  const statusSearch = search.get("status");
  const batchSearch = search.get("batch");
  const problemCategorySearch = search.get("problemCategory");
  const tagSearch = search.get("tag");
  const daysSearch = search.get("days");
  const startDaySearch = search.get("startDay");
  const endDaySearch = search.get("endDay");

  const [startDate, endDate] = dateRange;

  const handleChange = (option: Option, type: keyof Filters) => {
    setFilters((pre) => ({ ...pre, [type]: option.value }));
  };

  const handleFilter = () => {
    const url = new URLSearchParams();
    if (categorySearch) {
      url.append("category", categorySearch);
    }
    if (filters.status || statusSearch) {
      url.append("status", filters.status || (statusSearch as string));
    }
    if (filters.batch || batchSearch) {
      url.append("batch", filters.batch || (batchSearch as string));
    }
    if (filters.category || problemCategorySearch) {
      url.append(
        "problemCategory",
        filters.category || (problemCategorySearch as string)
      );
    }
    if (filters.tag || tagSearch) {
      url.append("tag", filters.tag || (tagSearch as string));
    }
    if (filters.days || daysSearch) {
      url.append("days", filters.days || (daysSearch as string));
    }
    if ((startDaySearch && endDaySearch) || (startDate && endDate)) {
      url.append(
        "startDay",
        startDate?.toDateString() || (startDaySearch as string)
      );
      url.append("endDay", endDate?.toDateString() || (endDaySearch as string));
    }
    push("/?" + decodeURI(url.toString()));
  };

  const handleClear = () => {
    push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <Button className="mr-1" variant="outline">
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={10}
        align="end"
        className="p-3 min-h-[470px] w-full max-w-[320px]"
      >
        <div className="flex flex-col">
          <Label htmlFor="role" className="mb-1">
            By day
          </Label>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            placeholderText="Select day range"
            className="border w-full p-2 focus:outline-none rounded-lg focus:border-accent"
          />
        </div>
        <div className="flex flex-col mt-2">
          <Label htmlFor="role" className="mb-1">
            By days
          </Label>
          <Select
            placeholder="filter by days"
            options={days}
            isSearchable={false}
            onChange={(option) => handleChange(option as Option, "days")}
          />
        </div>
        <div className="flex flex-col mt-2">
          <Label htmlFor="role" className="mb-1">
            By status
          </Label>
          <Select
            placeholder="filter by status"
            options={statusList}
            isSearchable={false}
            onChange={(option) => handleChange(option as Option, "status")}
            defaultValue={
              statusSearch
                ? { label: statusSearch, value: statusSearch }
                : undefined
            }
          />
        </div>
        <div className="flex flex-col mt-2">
          <Label htmlFor="role" className="mb-1">
            By batch
          </Label>
          <Select
            placeholder="filter by batch"
            options={batches}
            isSearchable={false}
            onChange={(option) => handleChange(option as Option, "batch")}
            defaultValue={
              batchSearch
                ? { label: batchSearch, value: batchSearch }
                : undefined
            }
          />
        </div>
        <div className="flex flex-col mt-2">
          <Label htmlFor="role" className="mb-1">
            By category
          </Label>
          <Select
            placeholder="filter by category"
            options={categories}
            isSearchable={false}
            menuPlacement="top"
            onChange={(option) => handleChange(option as Option, "category")}
            defaultValue={
              problemCategorySearch
                ? { label: problemCategorySearch, value: problemCategorySearch }
                : undefined
            }
          />
        </div>
        <div className="flex flex-col mt-2">
          <Label htmlFor="role" className="mb-1">
            By Tag
          </Label>
          <Select
            placeholder="filter by tags"
            options={tagsItems}
            isSearchable={false}
            menuPlacement="top"
            onChange={(option) => handleChange(option as Option, "tag")}
            defaultValue={
              tagSearch ? { label: tagSearch, value: tagSearch } : undefined
            }
          />
        </div>
        <div className="mt-5 flex items-center justify-between gap-2">
          <DropdownMenuItem asChild>
            <Button className="w-full" variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button className="w-full" onClick={handleFilter}>
              Filter
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
