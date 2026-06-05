import {z} from "zod"; 


export const userSchema = z.object({
    userName :z.string().min(1,  "UserName is required"), 
    firstName : z.string().min(1,"FirstName is required"), 
    lastName  : z.string().min(1,"LastName is required") , 
    phoneNumber: z.string().min(1, "PhoneNumber is required").regex(/^[0-9]{10}$/, "PhoneNumber must be exactly 10 digits"),
    email : z.string().email("Email  is invalid"), 
    address : z.string().min(1, "Address is required"), 
    birthDay : z.string(), 
    gender :  z.coerce.string().min(1, "Choose gender"), 
    roleIds : z.array(z.string()).min(1,"Choose at least one role"),
   file: z.custom<File | null>().optional()
})

export type FormValues = z.infer<typeof userSchema>; 

export const mapFormToUserRequest = (data: FormValues) => { 
    return { 
        ...data, 
        birthDay : new Date(data.birthDay), 
        gender : data.gender ?? "0",  
        address :  data.address || "" , 
        roleIds :  Array.isArray(data.roleIds)  ? data.roleIds : []
    }
}