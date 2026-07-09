import { API_URL } from "@/src/lib/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//Request: đối tượng chứa toàn bộ thông tin mà Client gửi lên(headers, body, method)
//{params:{path:string[]}}: thực chất là Route Segment Config Context(chứa thông tin về route hiện tại)
// Proxy không nên can thiệp vào error mà để cho  service xử lý .401 đã có middleware làm ,403 lỗi logic nghiệp vụ
//proxy throw new error ở đây thì service chỉ nhận đc lỗi 500 từ nextjs không phải lỗi  mà be đã catch và gửi về
async function handleProxyRequest(request: Request, targetPath: string, method: string) {
  // console.log("BFF Server Run: " + targetPath);
  const authHeader = request.headers.get("Authorization");
  const token =
    (authHeader?.startsWith("Bearer ") && authHeader.replace("Bearer ", "")) ||
    (await cookies()).get("accessToken")?.value;
  // console.log("accessToken lấy ra ở bff server: ", token);
  const { search } = new URL(request.url);
  const fullURL = `${API_URL}/${targetPath}${search}`;

  // console.log('token in proxy: ' , token) ;
  // console.log('fullURL in proxy: ' , fullURL);

  const contentType = request.headers.get("content-type") || "";
  let body: BodyInit | undefined = undefined;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (["PUT", "POST", "PATCH"].includes(method)) {
    if (contentType.includes("application/json")) {
      body = JSON.stringify(await request.json());
      headers["Content-Type"] = "application/json";
    } else if (contentType.includes("multipart/form-data")) {
      // Lưu ý: Không set Content-Type thủ công cho FormData để Fetch tự định nghĩa boundary
      body = await request.formData();
    } else {
      body = await request.text();
      if (!body) {
        body = undefined;
      }
    }
  }

  const doFetch = async (accessToken: string | undefined) => {
    return await fetch(fullURL, {
      method: method,
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
      body: body,
      cache: "no-store",
    });
  };
  const res = await doFetch(token);
  // console.log('res in proxy ', res);
  //data chính là ApiRes be gửi về
  const data = await res.json();
  // console.log('data in proxy ', data);
  return NextResponse.json(data, { status: res.status });
}

type RouteParams = Promise<{ path: string[] }>;

export async function POST(req: Request, { params }: { params: RouteParams }) {
  //[...path]= gom tất cả phần còn lại sau api/proxy vào mảng path
  // users/v1 trong api/proxy/users/v1
  const { path } = await params;
  const targetPath = path.join("/");
  return handleProxyRequest(req, targetPath, "POST");
}

export async function PUT(req: Request, { params }: { params: RouteParams }) {
  const { path } = await params;
  const targetPath = path.join("/");
  return handleProxyRequest(req, targetPath, "PUT");
}

export async function GET(req: Request, { params }: { params: RouteParams }) {
  const { path } = await params;
  console.log("get");
  const targetPath = path.join("/");
  return handleProxyRequest(req, targetPath, "GET");
}

export async function DELETE(req: Request, { params }: { params: RouteParams }) {
  const { path } = await params;
  const targetPath = path.join("/");
  return handleProxyRequest(req, targetPath, "DELETE");
}
