import { serverRequests } from "@/services/serverHttpService";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body = await request.json();
  const data = await serverRequests.patch(
    `/api/post/status/${params.id}`,
    body
  );
  return NextResponse.json(data);
};
