import { serverRequests } from "@/services/serverHttpService";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const data = await serverRequests.get("/auth");
  return NextResponse.json(data);
};
