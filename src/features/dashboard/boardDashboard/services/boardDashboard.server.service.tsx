import fetcher from "@/src/lib/fetcher";
import { BoardOverviewDTO } from "@/src/types/dashoard/board/boardOverviewDTO";

export const getBoardDashboardById = async (boardId: number): Promise<BoardOverviewDTO> => {
  const result = await fetcher<BoardOverviewDTO>(`/v1/boards/${boardId}/dashboard/overview`, { method: "GET" });
  return result;
};
