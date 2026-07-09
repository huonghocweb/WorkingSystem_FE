"use client";
import { useEffect, useState } from "react";
import LoginUI from "./LoginUI";
import { login } from "../services/auth.client.service";
import { showToast } from "@/src/utils/notification";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/store/userStore";

export default function LoginContainer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const userLogin = useUserStore((state) => state.user);
  console.log("userLogin", userLogin);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const loginData = {
      userName: formData.get("userName") as string,
      password: formData.get("password") as string,
    };

    try {
      //không gọi trực tiếp be mà gọi tới router để xử lý
      const response = await axios.post("/api/auth/login", loginData);
      console.log("123");
      console.log(response);
      if (response.data.success) {
        showToast("success", "Login success");
        console.log("userLogin", response.data.user);
        setUser(response.data.user);
        setTimeout(() => router.push("/workspaces"), 2000);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // Lúc này e đã được ép kiểu thành AxiosError tự động
        const message = e.response?.data?.message;
        showToast("error", `Login failed, ${message}`);
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <LoginUI isLoading={isLoading} handleSubmit={handleSubmit} />
    </>
  );
}
