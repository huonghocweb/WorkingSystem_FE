import { apiClient } from "@/src/lib/apiClient";
import axiosClient from "@/src/lib/axiosClient";
import { UserSearchResponse } from "@/src/types/user";
import {
  WorkspaceInvitationRequest,
  WorkspaceMemberId,
  WorkspaceMemberRequest,
  WorkSpaceRequest,
} from "@/src/types/workSpace";
import axios from "axios";

//khai báo hàm truyền thống , có thể  gọi trước ,khai báo bên dưới , dùng được this --chưa hiểu rõ về this
// export async function getWorkspaceById  (workspaceId :  number ) {
//     return null ;
// }
// khai báo 1 biến không đổi chứa hàm , phải khai báo trước khi  được sử dụng, không dùng được this
// export const getWorkspaceById1 = async (workspaceId  : number  ) => {
//     return null;
// }

export const getWorkspaceById = async (workspaceId: number) => {
  const res = await axios.get(`/workspaces/v1/${workspaceId}`);
  return res.data;
};

export const createWorkspace = async (data: WorkSpaceRequest) => {
  const formData = new FormData();
  formData.append("workspaceRequest", new Blob([JSON.stringify(data)], { type: "application/json" }));
  return axiosClient.post(`/workspaces/v1`, formData);
};

export const getWorkspaceMembersByWorkspaceId = async (workspaceId: number) => {
  return axiosClient.get(`/workspaces/v1/workspaceMembers/${workspaceId}`);
};
export const getWorkspaceMemberNotInBoard = async (workspaceId: number, boardId: number) => {
  return axiosClient.get(`/workspaces/v1/workspaceMembers/${workspaceId}/${boardId}`);
};
export const getUserToInvite = async (keyword: string, workspaceId: number) => {
  const query = new URLSearchParams({
    keyword: keyword,
  }).toString();
  console.log(query);
  return axiosClient.get(`/workspaces/v1/invitation/${workspaceId}?${query}`);
};

export const addUserToWorkspace = async (data: WorkspaceMemberRequest) => {
  const formdata = new FormData();
  formdata.append("workspaceMemberRequest", new Blob([JSON.stringify(data)], { type: "application/json" }));
  return axiosClient.post(`/workspaces/v1/invitation`, formdata);
};
export const updateWorkspaceMember = async (data: WorkspaceMemberRequest) => {
  const formData = new FormData();
  formData.append("workspaceMemberRequest", new Blob([JSON.stringify(data)], { type: "application/json" }));
  return axiosClient.put(`/workspaces/v1/invitation`, formData);
};

export const inviteUserByEmail = async (data: WorkspaceInvitationRequest) => {
  const formData = new FormData();
  formData.append("workspaceInvitationRequest", new Blob([JSON.stringify(data)], { type: "application/json" }));
  return axiosClient.post(`/workspaces/v1/invitation/addByMail`, formData);
};

export const getWorkspaceInvitationsByWorkspaceId = async (workspaceId: number) => {
  return axiosClient.get(`/workspaces/v1/workspaceInvitations/${workspaceId}`);
};

export const deleteWorkspaceMember = async (workspaceMemberId: WorkspaceMemberId) => {
  return axiosClient.delete(
    `/workspaces/v1/workspaceMembers/${workspaceMemberId.workspaceId}/${workspaceMemberId.userId}`,
  );
};

export const deleteWorkspaceInvitation = async (workspaceInvitationId: number) => {
  return axiosClient.delete(`/workspaces/v1/workspaceInvitations/${workspaceInvitationId}`);
};

export const getWorkspaceRoles = async () => {
  return axiosClient.get(`/workspaces/v1/workspaceRoles`);
};
