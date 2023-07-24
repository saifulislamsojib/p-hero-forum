import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  cookies().set({
    name: "jwtToken",
    value: "",
    expires: new Date(Date.now()),
  });
  return NextResponse.json({
    message: "Logout successfully",
  });
};
