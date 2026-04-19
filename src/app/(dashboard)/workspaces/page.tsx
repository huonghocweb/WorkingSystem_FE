import WorkSpaceListContainer from '@/src/features/workspace/components/WorkspaceListContainer';
import './workspace.css';
import { getVisibilities, getWorkspacesByUserId } from '@/src/features/workspace/services/workspace.server.service';

interface PageProps { 
 searchParams :Promise<{
   page? : string , 
  size? : string , 
  by? : string , 
  order? : string
 }>  
}
export  default async function WorkSpace({searchParams}: PageProps) {
  const params =  await searchParams;
  const page = Number(params.page) || 0;
  const size = Number(params.size) || 1; 
  const by = params.by || "workspaceId";
  const order = params.order  || "ASC";
  const workspacePages = await getWorkspacesByUserId({page, size , by , order},1);
  const visibilities = await getVisibilities();
  return (
    <>
      <WorkSpaceListContainer
          workspacePage = {workspacePages}
          visibilities = {visibilities}
      />
    </>
  )
}