import { NextRequest, NextResponse } from "next/server";

const proxy = (request: NextRequest) => {
  const session = request.cookies.get("r_t");
  const isAuthPage = request.nextUrl.pathname.startsWith("/signin");

  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
};
export default proxy;

export const config = {
  matcher: ["/dashboard/:path*", "/patients/:path*"],
};
