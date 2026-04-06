import { apiClient } from "@/src/lib/apiClient";

interface LoginProps {
    userName : string , 
    password : string
}

export const login= async({userName , password}: LoginProps) =>  {
    const userRequest  = {userName , password};
    console.log(userRequest);
    const response = await apiClient.post("/authenticate/login" , userRequest );
    return response.data;
}