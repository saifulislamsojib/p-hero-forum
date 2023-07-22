import { serverRequests } from "@/services/serverHttpService";
import { NextResponse } from "next/server";

export const GET = async (
  _: Request,
  { params }: { params: { id: string } }
) => {
  const data = await serverRequests.get(`/api/comment/${params.id}`);
  return NextResponse.json(data);
};
