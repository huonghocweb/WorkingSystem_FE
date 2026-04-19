'use client'

import { WorkSpaceResponse } from "@/src/types/workSpace"
import BoardFormUI from "./BoardFormUI"
import { useCreateBoardMutation } from "@/src/hooks/useBoardMutation"
import { showToast } from "@/src/utils/notification"
import { BoardRequest } from "@/src/types/board"
import { useForm } from "react-hook-form"
import { Axios, AxiosError } from "axios"

interface BoardFormProps { 
    workspace : WorkSpaceResponse | null , 
    onClose  : () => void
}

export default function BoardFormContainer ({workspace,  onClose} : BoardFormProps)  { 

    const {mutate:mutateCreateBoard , isPending : isPendingCreate} = useCreateBoardMutation();

    const formMethod = useForm({
        defaultValues : {
            workspaceId  : workspace?.workspaceId ?? 0 ,
            boardTitle : "" 
        }
    })

    const onSubmit = (dataForm : BoardRequest) => {
      //  console.log("data in boardForm", dataForm)
        const options = { 
            onSuccess :()=> {
            
                showToast('success',  'Create board  success');
                setTimeout(() => {
                    onClose();
                } ,2000);
            }, onError:(error :Error)=>  {
                showToast('error', `Create failed : ${error.message}`);
            }
        }
       const resCreateBoard =    mutateCreateBoard(dataForm, options);
   //    console.log(resCreateBoard);
    }

    return ( 
        <>
        <BoardFormUI
        workspace = {workspace}
        onClose = {onClose}
        onSubmit ={onSubmit}
        formMethod = {formMethod}
        isPendingCreate = {isPendingCreate}
        />
        </>
    )
}