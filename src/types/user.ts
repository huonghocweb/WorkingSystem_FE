import { RoleResponse } from "./role"

export  interface UserResponse { 
    userId : number , 
    userName : string , 
    firstName :  string , 
    lastName :  string , 
    birthDay : string , 
    phoneNumber : string , 
    address : string , 
    imagePublicId : string , 
    imageUrl : string , 
    gender  : number , 
    email : string ,
    roles : RoleResponse []
}

export interface UserRequest {  
    userName : string , 
    birthDay : Date , 
    firstName : string , 
    lastName :  string , 
    phoneNumber : string , 
    address : string , 
    gender  : string , 
    email : string , 
    roleIds: string []
}