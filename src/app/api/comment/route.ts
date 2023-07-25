import { serverRequests } from "@/services/serverHttpService";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const data = await serverRequests.post("/api/comment", body);
  return NextResponse.json(data);
};
