import fetcher from "@/src/lib/fetcher";
import { BoardResponse } from "@/src/types/board";

export const getBoardsById = async (boardId: number): Promise<BoardResponse> => {
  const result = await fetcher<BoardResponse>(`/boards/v1/${boardId}`, {
    method: "GET",
  });
  return result;
};
