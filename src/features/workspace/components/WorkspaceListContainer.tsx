'use client'
import { WorkSpaceResponse } from "@/src/types/workSpace";
import WorkspaceListUI from "./WorkspaceListUI";
import { PageResponse } from "@/src/types/pageResponse";
import PaginationControls from "@/src/components/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import WorkspaceFormContainer from "./WorkspaceFormContainer";
import { VisibilityResponse } from "@/src/types/visibility";
import ModalWrapper from "@/src/components/ModalWrapper";
import WorkspaceMemberModal from "./WorkspaceMember/WorkspaceMemberUI";
import BoardForm from "../../board/components/BoardForm/BoardFormContainer";

interface workspaceListProps { 
    workspacePage : PageResponse<WorkSpaceResponse>
    visibilities : VisibilityResponse[]
}

export default  function WorkSpaceListContainer ({workspacePage, visibilities} : workspaceListProps) {
  //  console.log("workspaceList: " , workspacePage)
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [isModalBoard,setIsModalBoard] = useState(false);
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [workspace , setWorkSpace] = useState<WorkSpaceResponse | null>(null);

    const sortOptions =[
        {label : "Workspace Id", value :  "workspaceId"}, 
        {label : "Workspace Id", value :  "workspaceId"}, 
        {label : "Workspace Id", value :  "workspaceId"}, 
        {label : "Workspace Id", value :  "workspaceId"}
    ]
    const paginationState = { 
        page  : workspacePage.page, 
        size : workspacePage.size , 
        by  : workspacePage.by  , 
        order  :  workspacePage.order, 
        totalPages : workspacePage.totalPages
    }

    const handlePaginationChange = (key : string , value  : number| string) => {
        const params  = new URLSearchParams(searchParams.toString());
        params.set(key, value.toString());
        router.push(`${pathName}?${params.toString()}`);
    }
    const openModalBoardForm = ( workspace : WorkSpaceResponse | null,isOpen : boolean)=> {
            setIsModalBoard(isOpen);
            setWorkSpace(workspace);
    }
  
    return (
        <>
         <PaginationControls
            handlePaginationChange={handlePaginationChange}
            paginationState={paginationState}
            sortOptions={sortOptions}
        />
          <div className="workspace-container">
            <WorkspaceListUI
                workspaces = {workspacePage?.content}
                setIsModalOpen = {setIsModalOpen}
                openModalBoardForm = {openModalBoardForm}
            />
            {isModalOpen && 
            <WorkspaceFormContainer
            visibilities = {visibilities}
            onClose={() => setIsModalOpen(false)}
             />}

             {/* Cần truyền thêm workspace vào BoardForm */}
             {isModalBoard &&  
             <BoardForm
                workspace = {workspace}
                onClose = {() => setIsModalBoard(false)}
             />
             }
            </div>
        </>
    )
}