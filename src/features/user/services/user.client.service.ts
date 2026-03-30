import { apiClient } from "@/src/lib/apiClient";
import { UserRequest } from "@/src/types/user";
import { json } from "zod";

export const  createUser = async (data :UserRequest ,  file? :  File)  => { 
    console.log('data in ser: ' , data)
    console.log('file in ser: ' , file)
    const formData = new FormData();
    formData.append("userRequest", 
        new Blob([JSON.stringify(data)] , {type: "application/json"})
    )
    if (file) {
        // Kiểm tra nếu là FileList thì lấy cái đầu tiên, nếu là File rồi thì dùng luôn
        const actualFile = file instanceof FileList ? file[0] : file;
        if (actualFile) {
            formData.append("files", actualFile); // Đây mới là truyền File thực sự!
        }
    }
      
    const res = await apiClient.post("/users/v1", formData);
    return res.data;
}

export const updateUser = async (id  : number ,  data : UserRequest , file? : File) => { 
    console.log('file in updateSer ' , file) ; 
    console.log('data in update Ser ', data)
    const formData = new FormData();
    formData.append("userRequest" ,
        new Blob([JSON.stringify(data)] ,{type: "application/json"} )
     )
      if (file) {
        // Kiểm tra nếu là FileList thì lấy cái đầu tiên, nếu là File rồi thì dùng luôn
        const actualFile = file instanceof FileList ? file[0] : file;
        if (actualFile) {
            formData.append("files", actualFile); // Đây mới là truyền File thực sự!
        }
    }
    
     const res = await apiClient.put(`/users/v1/${id}` , formData);
     return res.data;
}