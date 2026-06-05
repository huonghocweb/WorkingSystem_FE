import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BoardListRequest } from "../types/boardList";
import {
  createBoardList,
  deleteBoardList,
  updateBoardList,
} from "../features/boardList/services/boardList.client.services";

export const useCreateBoardList = (boardId: number) => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: BoardListRequest) => createBoardList(data),
    onSuccess: async (data) => {
      // KIỂM TRA NGAY TẠI ĐÂY:
      console.log("Mutation thành công! Đang tiến hành invalidate cho boardId =", boardId);

      await query.invalidateQueries({ queryKey: ["boardById", boardId] });
    },
  });
};
export const useUpdateBoardList = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ boardListId, data }: { boardListId: number; data: BoardListRequest }) => {
      return updateBoardList(boardListId, data);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById"] });
    },
  });
};
export const useDeleteBoardList = (boardId: number) => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (boardListId: number) => {
      return deleteBoardList(boardListId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById", boardId] });
    },
  });
};
