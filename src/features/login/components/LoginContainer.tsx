'use client';
import { useEffect, useState } from "react";
import LoginUI from "./LoginUI";
import { login } from "../services/auth.client.service";
import { showWToast } from "@/src/utils/notification";
import { useAuthStore } from "@/src/store/authStore";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default  function LoginContainer() {
    const router  = useRouter();
   const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const  [isLoading , setIsLoading] = useState(false);
 
    const handleSubmit  = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
      
        const formData = new  FormData(e.currentTarget);
          const loginData = {
            userName : formData.get("userName") as string , 
            password :  formData.get("password") as string
          }
      try{
        const response = await axios.post("/api/auth/login" , loginData);
        console.log(response);
        if(response.data.success){
            showWToast("success" , "Login success");
            setTimeout(() => 
            router.push('/'),2000);
        }
      }catch(e ){
        if (axios.isAxiosError(e)) {
        // Lúc này e đã được ép kiểu thành AxiosError tự động
        const message = e.response?.data?.message ;
        showWToast("error", `Login failed, ${message}`);
    }
    }

    }

    useEffect(() => {
    },[])

    return (
        <>
            <LoginUI
             isLoading = {isLoading}
             handleSubmit = {handleSubmit}
            />
        </>
    )
}