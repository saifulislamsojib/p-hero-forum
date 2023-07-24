import { serverRequests } from "@/services/serverHttpService";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body = await request.json();
  const data = await serverRequests.patch(`/api/post/${params.id}`, body);
  return NextResponse.json(data);
};

export const DELETE = async (
  _: Request,
  { params }: { params: { id: string } }
) => {
  const data = await serverRequests.delete(`/api/post/${params.id}`);
  return NextResponse.json(data);
};
