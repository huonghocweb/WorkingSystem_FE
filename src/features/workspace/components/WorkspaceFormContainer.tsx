'use client'
import { VisibilityResponse } from "@/src/types/visibility"
import WorkspaceFormUI from "./WorkspaceFormUI"
import { showToast } from "@/src/utils/notification"
import { WorkSpaceRequest } from "@/src/types/workSpace"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import ModalWrapper from "@/src/components/ModalWrapper"
import { useCreateWorkSpace } from "@/src/hooks/useWorkSpaceMutation"

interface WorkSpaceFormConProps { 
    visibilities : VisibilityResponse[]
    onClose : () => void
}

export default  function WorkspaceFormContainer ({visibilities,onClose}: WorkSpaceFormConProps)  {
    
    const {mutate : mutateCreate , isPending : isPendingCreate } = useCreateWorkSpace();
    
    const onSubmit = (formData : WorkSpaceRequest) => {
        console.log('data form :'  , formData)
        const options  = {
            onSuccess : () => {
                showToast('success', 'create workspace success');
                onClose();
            },
            onError : () => {
                showToast('error', 'create workspace failed');
            }
        }
        mutateCreate(formData, options);
    }
    const  formMethod = useForm({
        defaultValues : {
            workspaceTitle : "" , 
            visibilityId : visibilities.length > 0 ? visibilities[0].visibilityId : 1
        }
    })
    useEffect(() => {

    },[])
    

    return ( 
        <>
         <ModalWrapper 
        onClose={onClose}
        size="sm"
         >
               <WorkspaceFormUI 
            visibilities = {visibilities}
            onSubmit = {onSubmit}
            isPendingCreate = {isPendingCreate}
            formMethod = {formMethod}
             onClose={onClose}
            />
         </ModalWrapper>
        </>
    )
}