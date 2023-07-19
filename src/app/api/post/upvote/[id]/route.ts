import { serverRequests } from "@/services/serverHttpService";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await serverRequests.patch(`/api/post/upvote/${params.id}`, {});
  return NextResponse.json(data);
};
