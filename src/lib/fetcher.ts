import { cookies, headers } from "next/headers";
import { API_URL } from "./config";
import RefreshToken from "../features/login/services/auth.server.service";
import { da } from "zod/locales";
import { ApiResponse } from "../types/pageResponse";

export default async function fetcher<T>(
    url:  string ,
     options: RequestInit= {} // ={} : tham số mặc định 
    )  :Promise<T>{ // tạo hàm này  thành bất đồng bộ, thông báo rằng kết quả kiểu T phải đợi mới lấy được 
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value || null;
    //console.log('accessToken in fetcher: ' , accessToken);
   const res = await fetch(`${API_URL}${url}`, { 
    //...options ở đầu : thêm vào , ...options ở sau : ghi đè
    //chấp nhận các giá trị truyền vào như method, body , ....
        ...options , 
        headers : { 
            'Content-type': 'application/json', 
            Authorization: accessToken ? `Bearer ${accessToken}` : '',  
            //nếu bên ngoài có set rồi thì ghi đè vào đây.
            ...options.headers
        }, 
        cache: 'no-store',
    })
    
    const result: ApiResponse<T> = await res.json();
    //ném lỗi ở fetcher, service sẽ luôn nhận data sạch apiResponse từ be
    if(!res.ok || result.success == false) {// res.ok :status 200-299
        throw new  Error(result.message);
    }
    return result.data;
}


    
    // Đây là cách viết xử lý truyền thống , nếu access hết hạn gọi api để refresh 
    // -> chuyển sang dùng middleware.ts : tự động can thiệp vào các request để gia hạn.
    // if(res.status === 401) { 
    //     //hàm sẽ lấy về accessToken mới và set vào cookie
    //    const resRefresh = await RefreshToken();
    //    console.log("fetcher nhan duoc tu ReFreshToken",  resRefresh);
    //    if(resRefresh){
    //     const newAccessToken = resRefresh;
    //     const resRetry = await fetch(`${API_URL}/${url}`, { 
    //         ...options,
    //         headers: {
    //             'Content-Type': 'application/json', 
    //             Authorization : newAccessToken ? `Bearer ${newAccessToken}`: '', 
    //             ...options.headers
    //         }, 
    //         cache :'no-store'
    //     })
    //     const retryData = await resRetry.json();
    //     if(!resRetry.ok){throw new Error(retryData.message || "Retry failed")};
    //     return retryData;
    //    }
    // }