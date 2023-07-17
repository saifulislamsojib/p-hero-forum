import { requests } from "@/services/httpService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const data = await requests.post<{
    token: string;
  }>("/auth/login", body);
  if (data.token) {
    cookies().set({
      name: "jwtToken",
      value: `Bearer ${data.token}`,
      secure: true,
      httpOnly: true,
    });
  }
  return NextResponse.json(data);
};
