import axiosClient from "@/src/lib/axiosClient";
import { ActivityLogResponse } from "@/src/types/activityLog";
import { BoardMemberId, BoardMemberRequest, BoardRequest, BoardResponse } from "@/src/types/board";
import { LabelRequest } from "@/src/types/label";
import { ApiResponse, PageResponse } from "@/src/types/pageResponse";
import { PaginationState } from "@/src/types/pagination";

export const createBoard = async (data: BoardRequest) => {
  const formData = new FormData();
  formData.append("boardRequest", new Blob([JSON.stringify(data)], { type: "application/json" }));
  return axiosClient.post(`/boards/v1`, formData);
};

export const updateBoard = async (data: BoardRequest, boardId: number) => {
  const formData = new FormData();
  formData.append("boardRequest", new Blob([JSON.stringify(data)], { type: "application/json" }));
  return axiosClient.put(`/boards/v1/${boardId}`, formData);
};
export const getBoardMembersByBoardId = async (boardId: number) => {
  return axiosClient.get(`/boards/v1/boardMembers/${boardId}`);
};
export const addMemberToBoard = async (boardMemberRequest: BoardMemberRequest) => {
  const formData = new FormData();
  formData.append(
    "boardMemberRequest",
    new Blob([JSON.stringify(boardMemberRequest)], {
      type: "application/json",
    }),
  );
  return axiosClient.post(`/boards/v1/boardMembers/addMemberToBoard`, formData);
};

export const deleteMemberFromBoard = async (boardMemberId: BoardMemberId) => {
  return axiosClient.delete(`/boards/v1/boardMembers/${boardMemberId.boardId}/${boardMemberId.userId}`);
};

export const getBoardById = async (boardId: number): Promise<ApiResponse<BoardResponse>> => {
  return axiosClient.get(`/boards/v1/${boardId}`);
};

export const getLabelsByBoard = async (boardId: number) => {
  return axiosClient.get(`/boards/v1/boardLabels/${boardId}`);
};

export const createBoardLabel = async (labelRequest: LabelRequest) => {
  const formData = new FormData();
  formData.append("labelRequest", new Blob([JSON.stringify(labelRequest)], { type: "application/json" }));
  return axiosClient.post(`/boards/v1/boardLabels`, formData);
};

export const deleteBoardLabel = async (labelId: number) => {
  return axiosClient.delete(`/boards/v1/boardLabels/${labelId}`);
};

export const getBoardMemberNotInCard = async (boardId: number, cardId: number) => {
  return axiosClient.get(`/boards/v1/${boardId}/boardMembers/boardMemberNotInCard/${cardId}`);
};

export const getActivityLogByBoard = async (
  boardId: number,
  paginationSate: PaginationState,
): Promise<ApiResponse<PageResponse<ActivityLogResponse>>> => {
  return await axiosClient.get(`/boards/v1/${boardId}/activityLogs`, {
    params: {
      page: paginationSate.page,
      size: paginationSate.size,
      by: paginationSate.by,
      order: paginationSate.order,
    },
  });
};
