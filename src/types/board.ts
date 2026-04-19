import { boardListResponse } from "./boardList";
import { LabelResponse } from "./label";

export interface BoardResponse {
    boardId :number  , 
    boardTitle : string , 
    createAt : string , 
    color :string , 
    boardLists : boardListResponse[], 
    label  :  LabelResponse[]
}

export interface BoardSumResponse { 
        boardId :number  , 
    boardTitle : string , 
    createAt : string , 
    color :string  
}

export interface BoardRequest { 
    workspaceId : number,
    boardTitle :  string , 
}