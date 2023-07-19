import { NextResponse } from "next/server";

export const GET = async () => {
  const res = new NextResponse(
    JSON.stringify({
      message: "Logout successfully",
    })
  );
  res.cookies.set({
    name: "jwtToken",
    value: "",
    expires: new Date(Date.now()),
    maxAge: 0,
  });
  return res;
};
