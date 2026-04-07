import { API_URL } from "@/src/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    console.log("router logout");
    const refreshToken =  request.cookies.get('refreshToken')?.value;
    console.log('refresh router logout', refreshToken)
    if(refreshToken){
        const res = await fetch(`${API_URL}/authenticate/logout`, {
                method : 'POST' , 
                headers : { 
                    'Content-Type' : 'application/json'
                }, 
                    body : JSON.stringify({refreshToken}),
                cache : 'no-store'
            })
        const resData = await res.json();
        console.log('resData in logoutRouter : ', resData);
        if(res.ok) { 
            console.log("xoa cookie")
            const response = NextResponse.json({success : true});
            response.cookies.delete('accessToken');
            response.cookies.delete('refreshToken');
            response.cookies.delete('expiryAccessToken');
            return response;
        }
    }
   
    return NextResponse.json({message : `Logout failed in router`}, {status : 401});
}