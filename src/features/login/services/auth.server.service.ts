import { API_URL } from "@/src/lib/config";
import { cookies } from "next/headers";

export default async function RefreshToken<T>() : Promise<string | null> {

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    
    const resRefreshToken = await fetch(`${API_URL}/authenticate/refreshToken`, {
        method : 'POST', 
        headers : {
            'Content-Type': 'application/json'
        }, 
        body : JSON.stringify({refreshToken})
    })

    if(!resRefreshToken.ok)  {  
        const errorData = await resRefreshToken.json();
        // cookieStore.delete('accessToken');
        // cookieStore.delete('refreshToken');
        console.log("loi roi , het cuu");
        throw new Error(errorData.message || 'UnAuthorized');
    } 
    const refreshData = await resRefreshToken.json();
    console.log('new access: ' , refreshData.newAccessToken);
    cookieStore.set('accessToken' , refreshData.newAccessToken, {
        httpOnly:true, 
        secure: process.env.NODE_ENV === 'production', 
        path : '/' , 
        expires : refreshData.expiry/1000
    });

    return refreshData;
}