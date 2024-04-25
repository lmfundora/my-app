"use client"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const user = sessionStorage.getItem('user_store')
  console.log(user);
  
//   const varify = jwt.verify(user.token, 'RegisEl4nimal')
//   console.log(varify);
  
  return NextResponse.redirect(new URL("/logIn", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/business",
};
