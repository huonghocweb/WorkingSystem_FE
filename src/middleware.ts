import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "./lib/config";
import { json } from "zod";
import { login } from "./features/login/services/auth.client.service";

export default  async function middleware(request : NextRequest ) { 
    console.log('middleware run');

    const {pathname}  = request.nextUrl;
    if (pathname.startsWith('/_next') || pathname === '/login') {
            return NextResponse.next();
    }
    const accessToken = request.cookies.get('accessToken')?.value ; 
    const refreshToken = request.cookies.get('refreshToken')?.value;
    console.log('refreshToken in middleware: ', refreshToken);
    const expiry = request.cookies.get('expiryAccessToken')?.value;
    const now = Date.now();
    if(accessToken && expiry && now < parseInt(expiry) - 5000) {
        console.log("accessToken con  dung  tot" , accessToken); 
        return NextResponse.next();
    } 
    if(refreshToken) { 
        console.log("gia han access ")
        try{
            const resRefresh = await fetch(`${API_URL}/authenticate/refreshToken`, { 
                method : 'POST'  , 
                headers :{ 
                    'Content-Type' :  'application/json', 
                }, 
                body : JSON.stringify({refreshToken})
            })
            const resData = await resRefresh.json();
          //  console.log('resData gia han: ' , resData.data);
            const maxAgeSeconds = Math.floor((resData.data.expiry - Date.now()) / 1000);
            if(resRefresh.ok) { 
                const response = NextResponse.next();
                response.cookies.set('accessToken' , resData.data.accessToken, { 
                    httpOnly : true , 
                    secure : process.env.NODE_ENV === 'production', 
                    path : '/' , 
                    sameSite : 'strict' , 
                    maxAge : maxAgeSeconds
                })
                response.cookies.set('expiryAccessToken' , resData.data.expiry , {
                    httpOnly : false , 
                    secure : process.env.NODE_ENV === 'production', 
                    path : '/' , 
                    sameSite : 'strict',
                    maxAge : maxAgeSeconds
                })
                return response;
            }
        }catch (error ) { 
            console.error('fetch RefreshToken failed');
        }
    }

    console.log("khong co data trong cookie")
    // KHONG CON GI 
    const loginUrl = new URL('/login', request.url);
    const  response = NextResponse.redirect(loginUrl);
    response.cookies.delete('accessToken') ;
     response.cookies.delete('expiryAccessToken') ;
      response.cookies.delete('refreshToken') ;
      return response;

}

export const config = {
    matcher: ['/users/:path*', '/dashboard/:path*'], 
};