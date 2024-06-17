import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get("auth_token_x_clone");
  const { pathname } = req.nextUrl;

  if (pathname === "/user/login" && cookie) {
    return NextResponse.redirect(new URL("/", req.url), 307);
  }

  if (pathname === "/" && !cookie) {
    return NextResponse.redirect(new URL("/user/login", req.url), 307);
  }

  if (pathname === "/" && cookie) {
    return NextResponse.redirect(new URL("/tweets", req.url), 307)
  }

  if (pathname === "/user/register" && cookie) {
    return NextResponse.redirect(new URL("/", req.url), 307);
  }
  if (pathname === "/" && !cookie) {
    return NextResponse.redirect(new URL("/user/login", req.url), 307);
  }
  if (pathname === "/user/profile" && !cookie) {
    return NextResponse.redirect(new URL("/user/login", req.url), 307);
  }
}
