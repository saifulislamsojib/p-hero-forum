import { NextResponse } from "next/server";

export const POST = async () => {
  const res = new NextResponse(
    JSON.stringify({
      message: "Logout successfully",
    })
  );

  res.cookies.set("jwtToken", "", {
    expires: new Date(Date.now()),
  });
  return res;
};
