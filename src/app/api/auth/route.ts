import { serverRequests } from "@/services/serverHttpService";
import { NextResponse } from "next/server";

export const GET = async () => {
  const data = await serverRequests.get("/auth");
  return NextResponse.json(data);
};
