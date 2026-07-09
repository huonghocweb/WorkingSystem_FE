import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "./lib/config";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number; // Mốc hết hạn (số giây)
  sub?: string;
  roles?: string[];
}

export default async function middleware(request: NextRequest) {
  //  console.log("middleware run");
  const loginUrl = new URL("/login", request.url);
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next") || pathname === "/login") {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  // console.log("refreshToken in middleware: ", refreshToken);
  //   const expiry = request.cookies.get("expiryAccessToken")?.value;
  //   const now = Date.now();

  if (accessToken) {
    // console.log("co accessToken");
    const payload = jwtDecode<JwtPayload>(accessToken);
    // console.log("accessToken: ", accessToken);
    if (payload && payload.exp) {
      const expiryTimeInMs = payload.exp * 1000;
      const now = Date.now();
      // console.log("expiry: ", expiryTimeInMs);
      if (now < expiryTimeInMs - 5000) {
        // console.log("accessToken con han ");
        return NextResponse.next();
      } else {
        //Không nên refresh ở đây để tối ưu hóa tốc độ cho middleware.ts
        if (refreshToken) {
          console.log(" Access het han , tien hanh gia han access ");
          try {
            const resRefresh = await fetch(`${API_URL}/authenticate/refreshToken`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refreshToken }),
            });
            const resData = await resRefresh.json();
            // console.log("resData gia han: ", resData.data);

            if (resRefresh.ok) {
              const response = NextResponse.next();
              const { accessToken, accessTokenExpiresIn } = resData.data;
              // console.log("accessToken mới: ", accessToken);
              response.headers.set("Authorization", `Bearer ${accessToken}`);
              response.cookies.set("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                sameSite: "strict",
                maxAge: accessTokenExpiresIn,
              });
              return response;
            }
          } catch (error) {
            console.error("fetch RefreshToken failed");
          }
        } else {
          //  console.log("access het han, khong co refresh");
          const response = NextResponse.redirect(loginUrl);
          return response;
        }
      }
    }
  }

  console.log("khong co data trong cookie");
  // KHONG CON GI
  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete("accessToken");
  response.cookies.delete("expiryAccessToken");
  response.cookies.delete("refreshToken");
  return response;
}

export const config = {
  matcher: ["/users/:path*", "/dashboard/:path*", "/workspaces/:path*"],
};
