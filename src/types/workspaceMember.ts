import { UserSummaryResponse } from "./user"

export interface WorkspaceMemberResponse { 
    user : UserSummaryResponse,
    role : string 
}