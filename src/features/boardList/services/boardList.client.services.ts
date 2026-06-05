import axiosClient from "@/src/lib/axiosClient";
import { BoardListRequest, BoardListResponse } from "@/src/types/boardList";
import { ApiResponse } from "@/src/types/pageResponse";

export const createBoardList = (data: BoardListRequest): Promise<ApiResponse<BoardListResponse>> => {
  const formData = new FormData();
  formData.append("boardListRequest", new Blob([JSON.stringify(data)], { type: "application/json" }));
  return axiosClient.post("/boardLists/v1", formData);
};

export const updateBoardList = (boardListId: number, data: BoardListRequest) => {
  const formData = new FormData();
  formData.append("boardListRequest", new Blob([JSON.stringify(data)], { type: "application/json" }));
  return axiosClient.put(`/boardLists/v1/${boardListId}`, formData);
};

export const deleteBoardList = (boardListId: number) => {
  return axiosClient.delete(`/boardLists/v1/${boardListId}`);
};
