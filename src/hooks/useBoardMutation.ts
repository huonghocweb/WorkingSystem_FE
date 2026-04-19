import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BoardRequest } from "../types/board";
import { createBoard, updateBoard } from "../features/board/services/board.client.services";
import { AxiosError } from "axios";

interface UpdateMutateProps { 
    data : BoardRequest , 
    boardId : number
}

export const useCreateBoardMutation = () => {
    const query = useQueryClient();
    return useMutation({
        mutationFn : (data :BoardRequest) => {
            return createBoard(data);
        }, onSuccess : ()=> {
            query.invalidateQueries({queryKey : ["board"]});
        }
    })
}

export const useUpdateBoardMutation = () => {
    const query = useQueryClient();
    return useMutation( { 
        mutationFn : ({data , boardId }: UpdateMutateProps) => {
            return updateBoard(data,boardId);
        }, onSuccess : () =>  { 
             query.invalidateQueries({queryKey : ["board"]});
        }
    })
}