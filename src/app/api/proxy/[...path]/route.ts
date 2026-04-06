import RefreshToken from "@/src/features/login/services/auth.server.service";
import { API_URL } from "@/src/lib/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


//Request: đối tượng chứa toàn bộ thông tin mà Client gửi lên(headers, body, method)
//{params:{path:string[]}}: thực chất là Route Segment Config Context(chứa thông tin về route hiện tại)
//
    async function handleProxyRequest(request : Request , targetPath:string , method:string){
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    
    const {search} = new URL(request.url);
    const fullURL = `${API_URL}/${targetPath}${search}`;

    console.log('token in proxy: ' , token) ;
    console.log('fullURL in proxy: ' , fullURL);

    const contentType = request.headers.get("content-type") || "";
   let body: BodyInit | undefined = undefined;
    const headers : Record<string , string>  = { 
        'Authorization' :  `Bearer ${token}`,
    }

    if(['PUT' , 'POST' , 'PATCH'].includes(method)){ 
    if(contentType.includes("application/json")) { 
        body = JSON.stringify(await request.json());
        headers['Content-Type'] = 'application/json';
    }else  if (contentType.includes("multipart/form-data")) { 
        // Lưu ý: Không set Content-Type thủ công cho FormData để Fetch tự định nghĩa boundary
        body = await request.formData();
    }else { 
        body = await request.text();
        if(!body) {
            body = undefined;
        }
    }
    }

   const doFetch = async (accessToken : string | undefined) => {
    return await fetch(fullURL, { 
        method : method , 
        headers : {
            ...headers, 
            'Authorization' : `Bearer ${accessToken}`
        }, 
        body : body, 
        cache : 'no-store'
    })
   }
    const res = await doFetch(token);
    // if(res.status === 401) { 
    //     const newAccessToken = await RefreshToken();
    //     if(newAccessToken) { 
    //         res = await doFetch(newAccessToken);
    //     }
    // }

    const data = await res.json();
    if(!res.ok ){
        throw new Error(data.message || 'Co loi ')
    }
    return NextResponse.json(data , {status : res.status});
}

type RouteParams = Promise<{path : string []}>

export async function POST(req : Request, {params}: {params : RouteParams }){
     //[...path]= gom tất cả phần còn lại sau api/proxy vào mảng path
     // user/v1 trong api/proxy/users/v1
     const {path} = await params;
      const targetPath = path.join('/');
    return handleProxyRequest(req ,targetPath, 'POST');
}

export async function PUT(req:Request , {params}:{params: RouteParams}){
    const {path} = await params;
     const targetPath = path.join('/');
    return handleProxyRequest(req, targetPath, 'PUT');
}

export async function GET(req:Request , {params} : {params : RouteParams}){
    const {path} = await params;
    const targetPath = path.join('/');
    return handleProxyRequest(req, targetPath , 'GET');
}

export async function DELETE(req: Request , {params}: {params : RouteParams}) {
    const {path} = await params;
     const targetPath = path.join('/');
    return handleProxyRequest(req, targetPath , 'DELETE');
}