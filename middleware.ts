import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import status from "@/utils/status";

const protectedRoute = [
  "/home", "/explore", "/notifications" , "/popai" , '/:username*' , "/message" , "/bookmarks" , "/premium" 
  , '/more' , '/((?!api|login|register|about|contact|_next|favicon.ico).*)' , '/post' 
];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("login")?.value;
  const isProtected = protectedRoute.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );


  if (token && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const user = payload;
    return NextResponse.next();
  } catch (error) {
    console.log("JWT Error:", error);
    return NextResponse.json({
      status: status.UNAUTHORIZED.code,
      message: status.UNAUTHORIZED.message,
    });
  }
}
