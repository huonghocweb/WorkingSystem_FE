import fetcher from "@/src/lib/fetcher"
import { BoardResponse } from "@/src/types/board"
import { ApiResponse } from "@/src/types/pageResponse"

export const getBoardsById = async (boardId : number ) : Promise<BoardResponse> => {
    const result = await fetcher<ApiResponse<BoardResponse>> (`/boards/v1/${boardId}`,{
        method : 'GET'
    })
    if(!result.success){
        throw new Error(result.message || "fetcher getBoardsId failed")
    }
    return result.data;
}