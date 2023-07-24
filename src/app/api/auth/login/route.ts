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
      maxAge: 182 * 24 * 60 * 60,
      expires: 182 * 24 * 60 * 60,
    });
  }
  return NextResponse.json(data);
};
