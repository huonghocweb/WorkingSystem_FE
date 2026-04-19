import { BoardSumResponse } from "./board";
import { WorkspaceMemberResponse } from "./workspaceMember";

export interface WorkSpaceRequest { 
    workspaceTitle : string , 
    visibilityId : number 
} 
export interface WorkSpaceResponse { 
    workspaceId : number , 
    workspaceTitle : string , 
    createAt : string , 
    visibility : string , 
    boards : BoardSumResponse[], 
    workspaceMember  :  WorkspaceMemberResponse[]
   
}