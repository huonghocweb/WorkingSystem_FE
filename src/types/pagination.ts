export interface PaginationState {  
    page : number  , 
    size  : number , 
    by : string , 
    order :  string, 
    totalPages : number
}

export interface  SortOption { 
    label : string , 
    value : string | number
}