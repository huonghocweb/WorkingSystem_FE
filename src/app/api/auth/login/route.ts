// Để lưu  trữ accessToken vào  HttpCookie -> cho cả client và server đều dùng được 
//Ta phải dùng server Node.js để nhận accessToken và lưu vào httCookie vì  use client không làm được
//ở useClient sẽ gọi đến router.ts này và router.ts này sẽ thực sự gọi đến api để login

import { API_URL } from "@/src/lib/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(request :  Request){
    const body = await request.json();
    console.log('body route :' , body)
    const res = await fetch(`${API_URL}/authenticate/login` , { 
        method : 'POST', 
        headers : {'Content-Type' : 'application/json'} , 
        body : JSON.stringify(body),
    })
  
    const data = await res.json();
    console.log('data', data);
    if (res.ok) {
    const response = NextResponse.json({ success: true });
    const beCookie = res.headers.get('set-cookie'); 

    if (beCookie) {
        // Tách chuỗi để lấy các thuộc tính BE đã set
        const parts = beCookie.split(';');
        const [nameValue] = parts;
        const [name, value] = nameValue.split('=');

        // Dùng cookies.set để Next.js quản lý đồng bộ với accessToken
        response.cookies.set(name, value, {
            httpOnly: beCookie.includes('HttpOnly'),
            secure: beCookie.includes('Secure'),
            sameSite: 'strict', // Hoặc parse từ chuỗi nếu muốn
            path: '/', 
            // Bạn có thể parse Max-Age từ beCookie nếu không muốn hardcode
            maxAge: 60 * 60 * 24 * 7 
        });
    }

    // Sau đó mới set accessToken - Lúc này không còn bị ghi đè nữa
    response.cookies.set('accessToken', data.data.accessToken, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', 
        path: '/', 
        maxAge: data.data.expiry / 1000
    });

    response.cookies.set('expiryAccessToken', data.data.expiry.toString(), {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        path: "/",
        sameSite: 'strict'
    });

    return response;
}
    //   if(res.ok) { 
    //         const response = NextResponse.json({success  : true});
    //        // Lấy nguyên văn chuỗi Set-Cookie từ Spring Boot (bao gồm cả Path, HttpOnly...)
    //                 const beCookie = res.headers.get('set-cookie'); 

    //                 if (beCookie) {
    //                     // dùng response.hearder.append và response.cookie.set thì cookie sẽ bị đè nhau -> lỗi 
    //                     // Thay vì dùng response.cookies.set (làm hỏng định dạng)
    //                     // Ta dùng trực tiếp Header nhưng phải dùng phương thức append chuẩn của Web API
    //                     response.headers.append('Set-Cookie', beCookie);
    //                 }
    //         console.log("refresh Login" , beCookie);
    //         response.cookies.set('accessToken' , data.data.accessToken, { 
    //         httpOnly : true, 
    //         secure :  process.env.NODE_ENV === 'production', // nếu là production ,yêu cầu giao thức https
    //         sameSite : 'strict', 
    //         path:  '/', 
    //         maxAge : data.data.expiry /1000
    //         })
    //         response.cookies.set('expiryAccessToken', data.data.expiry.toString(), {
    //          httpOnly: false, // Để Middleware/Client có thể đọc nhanh
    //             secure: process.env.NODE_ENV === 'production',
    //             path: "/",
    //             sameSite: 'strict'
    //         })
    //     return response;
    //   }
    return NextResponse.json({message :  `${data.message}`}, {status  :  401})
    
}