import { useMutation, useQueryClient } from "@tanstack/react-query"
import { WorkSpaceRequest } from "../types/workSpace"
import { createWorkspace } from "../features/workspace/services/workspace.client.service";
import { AxiosError } from "axios";

export const useCreateWorkSpaceMutation = ( )=> {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn :async (formData : WorkSpaceRequest) =>  {
            console.log('formData in hook mutate: ', formData);
            return createWorkspace(formData);
        }, 
        onSuccess :() => {
            queryClient.invalidateQueries({queryKey: ["workSpace"]});
        }, onError : (error : AxiosError<{message  :  string}>)=> {
            alert(error)    ;
        }
    })
}