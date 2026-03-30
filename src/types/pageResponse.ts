export interface PageResponse<T> {
    content : T [],
    page : number , 
    size : number , 
    by  : string , 
    order : string ,
    totalElements : number , 
    totalPages:number 
   
}