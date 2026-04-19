import { BoardRequest, BoardResponse } from "@/src/types/board";
import { ApiResponse } from "@/src/types/pageResponse";
import axios, { AxiosError } from "axios";
import { error } from "console";

export const createBoard = async(data : BoardRequest)  =>  { 
    const formData = new FormData();
formData.append('boardRequest' , new Blob([JSON.stringify(data)], {type : 'application/json'}));
   try {
      const res = await axios.post(`/api/proxy/boards/v1`,  formData);
        return res.data;
   } catch (error  ) {
        if(axios.isAxiosError(error))  {
            const serverData = error.response?.data as ApiResponse<null> | undefined    ;
            throw new Error(serverData?.message);
        }
        throw new Error(error  instanceof  Error ? error.message : "undefined error");
   }
}

export const updateBoard = async (data : BoardRequest  , boardId : number) => {
    const formData = new FormData();
    formData.append('boardRequest', new Blob([JSON.stringify(data)], {type : 'application/json'}));
    try{
          const res = await axios.put(`/api/proxy/boards/v1/${boardId}`, formData);
    //dữ liệu từ proxy trả về là NextResponse{status , serverData};
        return res.data;
    }catch(error) { 
        if(axios.isAxiosError(error)) { 
            throw new Error(error.response?.data.message) ;
        }
        throw new Error(error instanceof Error ? error.message : 'An error has occurred')
    }
}