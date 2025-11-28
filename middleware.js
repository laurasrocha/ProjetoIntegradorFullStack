import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/docente") && payload.tipo !== "DOCENTE") {
      return NextResponse.redirect(new URL("/acesso-negado", req.url));
    }

    if (pathname.startsWith("/supervisor") && payload.tipo !== "SUPERVISOR") {
      return NextResponse.redirect(new URL("/acesso-negado", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware JWT inválido:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/docente/:path*", "/supervisor/:path*"],
};
