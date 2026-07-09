// Để lưu  trữ accessToken vào  HttpCookie -> cho cả client và server đều dùng được
//Ta phải dùng server Node.js để nhận accessToken và lưu vào httCookie vì  use client không làm được
//ở useClient sẽ gọi đến router.ts này và router.ts này sẽ thực sự gọi đến api để login

import { API_URL } from "@/src/lib/config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log("body route :", body);
    const res = await fetch(`${API_URL}/authenticate/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    // console.log("data: ", result);
    if (!res.ok || !result.success) {
      return NextResponse.json({ message: result.message || "Login failed" }, { status: res.status });
    }
    const { accessToken, refreshToken, user, accessTokenExpiresIn, refreshTokenExpiresIn } = result.data;
    // console.log("userLogin: ", user);
    // console.log("accessToken: ", accessToken);
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: user,
    });
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: accessTokenExpiresIn,
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: refreshTokenExpiresIn,
    });
    response.cookies.set("isLoggedIn", "true", {
      httpOnly: false,
      sameSite: "strict",
      path: "/",
      maxAge: accessTokenExpiresIn,
    });
    response.cookies.set(
      "userLogin",
      JSON.stringify({
        userId: user.userId,
        username: user.username,
        authorities: user.authorities,
      }),
      {
        httpOnly: false,
        sameSite: "strict",
        path: "/",
        maxAge: refreshTokenExpiresIn,
      },
    );
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error in BFF" }, { status: 500 });
  }
}
