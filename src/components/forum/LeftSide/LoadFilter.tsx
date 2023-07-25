"use client";

import { useUser } from "@/redux/hooks";
import dynamic from "next/dynamic";

const Filter = dynamic(() => import("./Filter"), { ssr: false });

const LoadFilter = () => {
  const { role } = useUser().user || {};

  return role === "admin" ? <Filter /> : null;
};

export default LoadFilter;
