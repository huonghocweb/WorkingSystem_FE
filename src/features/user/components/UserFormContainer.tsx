'use client';

import { UserResponse } from "@/src/types/user";
import UserFormUI from "./UserFormUI";
import { useForm ,Resolver } from "react-hook-form";
import { FormValues, userSchema } from "@/src/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState  } from "react";
import { RoleResponse } from "@/src/types/role";
import { useCreateUserMutation, useUpdateUserMutation } from "@/src/hooks/useUserMutation";
import { Axios, AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { showToast } from "@/src/utils/notification";


interface Props {
    user: UserResponse | null, 
    roles : RoleResponse[] | null
}

export default function UserFormContainer({ user ,  roles }: Props) {
//    console.log(user);
    const router = useRouter();
    const isEditMode = user == null ? false :  true;
    const { mutate: createMutate, isPending: isPendingCreate } = useCreateUserMutation();
    const { mutate: updateMutate, isPending: isPendingUpdate } = useUpdateUserMutation()
    const [preview , setPreview] = useState<string |null>(user!= null ? 
        user.imageUrl  : null 
    );

    const handleChangeFile = (e:React.ChangeEvent<HTMLInputElement>) => {  
        const file = e.target.files?.[0];
        if(!file) { 
            return ;
        }
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    }


const formMethods = useForm<FormValues>({
  resolver: zodResolver(userSchema) as Resolver<FormValues>,
  defaultValues: {
    userName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    birthDay:"",
    gender: "",
    roleIds: [],
    file: null
  }
});
  
    useEffect(()=> {
        if(user) {
            formMethods.reset({
                userName : user.userName , 
                firstName:user.firstName,
                lastName: user.lastName,
                phoneNumber:user.phoneNumber, 
                address: user.address ,
                birthDay : user.birthDay, 
                gender : String(user.gender), 
                email : user.email , 
                roleIds: user.roles?.map(r => String(r.roleId)) || []
            })
        }
    }, [user , formMethods])

    const onSubmit = (data : FormValues) => {
        console.log("onSubmit");
        console.log(data);

        const options = { 
            onSuccess : () =>  {
                if(isEditMode) { 
                        showToast('success' , 'Update User success');
                    setTimeout(() => {
                        router.push("/users");
                    },2000)
                  
                }else {
                    showToast('success' , 'Create User success');
                    setPreview(null);
                    formMethods.reset();
                }
            }, onError : (error : AxiosError<{message : string}>) => {
                showToast('error',`${error ? 'Update failed'+error.response?.data.message : 'Update Failed'} `)
                console.log("loi" ,  error.response);
            }
        }

        if(isEditMode && user){
            console.log('update')
            updateMutate({
                userId: user?.userId , 
                formData :  data
            }, options)
        }else { 
        createMutate(data, options);
       
        }
    }


    return (
        <>
            <UserFormUI
                isEditMode ={isEditMode}
                formMethods={formMethods} 
                onSubmit={onSubmit}
                isPendingCreate={isPendingCreate}
                isPendingUpdate = {isPendingUpdate}
                roles = {roles}
                preview = {preview}
                handleChangeFile = {handleChangeFile}
            />
        </>
    )
}