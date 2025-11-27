import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("auth_token")?.value;

  // Se não estiver logado → redireciona para login
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const pathname = req.nextUrl.pathname;

    // Bloqueio por tipo
    if (pathname.startsWith("/docente") && user.tipo !== "DOCENTE") {
      return NextResponse.redirect(new URL("/acesso-negado", req.url));
    }

    if (pathname.startsWith("/supervisor") && user.tipo !== "SUPERVISOR") {
      return NextResponse.redirect(new URL("/acesso-negado", req.url));
    }

  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/docente/:path*", "/supervisor/:path*"],
};
