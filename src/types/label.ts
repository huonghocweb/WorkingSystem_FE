export interface LabelResponse { 
    labelId : number , 
    labelName : string , 
    labelColor : string
}

export interface LabelRequest  {
    labelName : string , 
    labelColor : string, 
    boardId :  number
}