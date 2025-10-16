import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const temp = false;

  if (pathname.startsWith("/dashboard")) {
    if (temp) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard", "/"],
};
