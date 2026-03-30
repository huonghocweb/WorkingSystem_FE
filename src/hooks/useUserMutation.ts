import { useMutation , useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import { API_URL } from "../lib/config";
import { FormValues, mapFormToUserRequest } from "../schema/userSchema";
import { createUser, updateUser } from "../features/user/services/user.client.service";
import { error } from "console";


interface UpdateUserProps { 
    userId : number , 
    formData : FormValues 
}

    // trong react query , useQuery dùng để lấy  dữ liệu (get) , 
    // useMutation dùng để thay đổi  dữ liệu (put , patch , deleter , create)
export const useCreateUserMutation = ( )=> { 
    const queryClient = useQueryClient();
    return useMutation({
        //khai  báo hàm sẽ được thực thi. mutate(data) ở component mới thực thi 
        mutationFn : async (formData : FormValues) => {
            const requestData = mapFormToUserRequest(formData);
            const fileUpLoad  = formData.file || undefined ;
            return createUser(requestData , fileUpLoad);
        },
        //đánh dấu users là hết hạn để react query tự động chạy lấy data mới
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["users"]});
        } ,  onError :  (error : AxiosError<{message : string}>) =>  { 
           // alert(error.response?.data?.message || "error");
        }
       
    })
  
}

export const useUpdateUserMutation = () => {
    const queryClient =useQueryClient() ; 
    return useMutation({
        mutationFn : async({userId , formData} : UpdateUserProps) => { 
            const requestData = mapFormToUserRequest(formData); 
            const fileUpload = formData.file || undefined   ; 
            return updateUser(userId, requestData , fileUpload) ;
        }, onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["users"] });
        }, onError : (error : AxiosError<{message : string}>) => {
            //alert(error.response?.data?.message ||"error");
        }
    })
}