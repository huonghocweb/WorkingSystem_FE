"use client";

import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import Cookies from "js-cookie";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    const userInfoCookie = Cookies.get("userLogin");
    if (userInfoCookie) {
      try {
        const userData = JSON.parse(userInfoCookie);
        console.log("userLogin from cookie", userData);
        setUser(userData);
      } catch (error) {
        console.error("Cookie userLogin has some error", error);
      }
    }
  }, [setUser]);
  return <>{children}</>;
}
