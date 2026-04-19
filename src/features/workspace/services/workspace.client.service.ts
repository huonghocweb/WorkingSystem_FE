import { apiClient } from "@/src/lib/apiClient"
import { WorkSpaceRequest } from "@/src/types/workSpace";
import axios from "axios"

//khai báo hàm truyền thống , có thể  gọi trước ,khai báo bên dưới , dùng được this --chưa hiểu rõ về this
// export async function getWorkspaceById  (workspaceId :  number ) {
//     return null ;
// }
// khai báo 1 biến không đổi chứa hàm , phải khai báo trước khi  được sử dụng, không dùng được this
// export const getWorkspaceById1 = async (workspaceId  : number  ) => {
//     return null;
// }

export const getWorkspaceById  = async (workspaceId : number) => {
    const res = await axios.get(`/api/proxy/workspaces/v1/${workspaceId}`);
    return res.data;
}

export const createWorkspace = async( data : WorkSpaceRequest) => {
    const formData = new FormData();
    formData.append("workspaceRequest", new Blob([JSON.stringify(data)], {type : 'application/json'}));
    const  res = await axios.post(`/api/proxy/workspaces/v1`, formData);
    return res.data;
}