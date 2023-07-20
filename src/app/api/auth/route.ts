import { serverRequests } from "@/services/serverHttpService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const token = cookies().get("jwtToken")?.value;
  if (!token || !token.startsWith("Bearer")) {
    return NextResponse.json({ message: "Token not found" });
  }
  const data = await serverRequests.get("/auth");
  return NextResponse.json(data);
};
