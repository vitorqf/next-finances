import { NextRequest, NextResponse } from "next/server";
import { User } from "./models/User";
import { BASE_URL } from "./lib/api";

const PRIVATE_ROUTES = ["/dashboard"];
const AUTH_ROUTES = ["/entrar", "/cadastrar"];

async function validateUserToken(user: User) {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data: User = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const isAccessingPrivateRoute = PRIVATE_ROUTES.includes(req.nextUrl.pathname);
  const isAccessingAuthRoute = AUTH_ROUTES.includes(req.nextUrl.pathname);
  const user: User = JSON.parse(req.cookies.get("@app:user")?.value || "{}");

  if (isAccessingAuthRoute) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (!isAccessingPrivateRoute) {
    return NextResponse.next();
  }

  if (!user) {
    return NextResponse.redirect(new URL("/entrar", req.url));
  }

  const validatedUser = await validateUserToken(user);
  if (!validatedUser) {
    return NextResponse.redirect(new URL("/entrar", req.url));
  }
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|robots.txt|public|images|manifest.json|sw.js|404|assets|favicon.ico|workbox-*).*)",
};