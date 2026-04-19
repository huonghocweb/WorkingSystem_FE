'use client'
import { BoardRequest, BoardResponse } from "@/src/types/board";
import BoardsUI from "./BoardsUI";
import { useUpdateBoardMutation } from "@/src/hooks/useBoardMutation";
import { showToast } from "@/src/utils/notification";
import { useForm } from "react-hook-form";
import { ApiResponse } from "@/src/types/pageResponse";

interface BoardContainerProps  { 
    boardById : BoardResponse
}

export  default function BoardContainer({boardById}: BoardContainerProps) {

    const {mutate : updateBoardMutate , isPending : isPendingUpdate} = useUpdateBoardMutation();
    const onSubmit = (dataForm : BoardRequest)=>  {
        if (dataForm.boardTitle === boardById?.boardTitle) {
                return;
            }
        console.log('dataForm' , dataForm);
        const options = {
            onSuccess : (data : ApiResponse<BoardResponse>) => {
               // showToast('success', 'Update board success')
            }, onError : (error : Error) =>  {
                showToast('error', `${error.message}`)
            }
        }
        updateBoardMutate({data: dataForm , boardId : boardById?.boardId} ,options);
    }
    const formMethod = useForm({
        defaultValues : {
            boardTitle : boardById.boardTitle
        }
    })
    return (
        <>
            <BoardsUI
            boardById = {boardById}
            formMethod = {formMethod}
            onSubmit = {onSubmit}
            isPendingUpdate = {isPendingUpdate}
            />
        </>
    )
}