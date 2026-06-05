import Boards from "@/src/features/board/components/Boards";
import { getBoardsById } from "@/src/features/board/services/board.server.services";
interface PageProps { 
  params : Promise<{
    workspaceId : number , 
    boardId :  number
  }>
}
export default async function BoardPage ({params} : PageProps ) { 
  
  const param =  await params;
  const boardById = await getBoardsById(param.boardId);
//   console.log('boardBYID: ' , boardById);
// console.log('prams board:', param)
    return ( 
        <>
        <Boards
          initialData = {boardById}
        />
        </>
    )
}