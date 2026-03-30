import getTokenFromCookies from "./auth";
import { API_URL } from "./config";

export default async function fetcher<T>(
    url:  string ,
     options: RequestInit= {} // ={} : tham số mặc định 
    )  :Promise<T>{ // tạo hàm này  thành bất đồng bộ, thông báo rằng kết quả kiểu T phải đợi mới lấy được 

    const  token = getTokenFromCookies();

    const res = await fetch(`${API_URL}${url}`, { 
        ...options , 
        headers : { 
            'Content-type': 'application/json', 
            Authorization: token ? `Bearer ${token}` : '', 
            ...options.headers
        }, 
        cache: 'no-store',
    })
    
    if(!res.ok){
        throw new Error('API error')
    }

    return res.json();
}