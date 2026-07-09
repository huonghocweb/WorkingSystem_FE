import { cookies, headers } from "next/headers";
import { API_URL } from "./config";
import { ApiResponse } from "../types/pageResponse";

export default async function fetcher<T>(
  url: string,
  options: RequestInit = {}, // ={} : tham số mặc định
): Promise<T> {
  // console.log("Server Side Run by  fetcher: ", url);
  // tạo hàm này  thành bất đồng bộ, thông báo rằng kết quả kiểu T phải đợi mới lấy được
  const reqHeaders = await headers();
  const authHeader = reqHeaders.get("Authorization");
  const accessToken =
    (authHeader?.startsWith("Bearer ") && authHeader.replace("Bearer ", "")) ||
    (await cookies()).get("accessToken")?.value;
  // console.log("accessToken in fetcher: ", accessToken);
  const res = await fetch(`${API_URL}${url}`, {
    //...options ở đầu : thêm vào , ...options ở sau : ghi đè
    //chấp nhận các giá trị truyền vào như method, body , ....
    ...options,
    headers: {
      "Content-type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      //nếu bên ngoài có set rồi thì ghi đè vào đây.
      ...options.headers,
    },
    cache: "no-store",
  });

  const result: ApiResponse<T> = await res.json();
  //ném lỗi ở fetcher, service sẽ luôn nhận data sạch apiResponse từ be
  if (!res.ok || result.success == false) {
    // res.ok :status 200-299
    throw new Error(result.message);
  }
  return result.data;
}
