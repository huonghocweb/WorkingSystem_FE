import { WorkspaceDashboard } from "@/src/features/dashboard/workspaceDashboard/components/WorkspaceDashboard";
import { getWorkspaceDashboardDTO } from "@/src/features/dashboard/workspaceDashboard/services/workspaceDashboard.server.service";
import { getWorkspaceOwnedByUser } from "@/src/features/workspace/services/workspace.server.service";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ workspaceId: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const paramsValue = await params;
  const userId = paramsValue.userId;
  const searchParamsValue = await searchParams;
  const workspaceIdRaw = searchParamsValue.workspaceId;
  const workspaceOwnedByUser = await getWorkspaceOwnedByUser(Number(userId));
  //console.log(paramsValue.userId);
  //console.log("workspaceOwnedByUser: ", workspaceOwnedByUser);
  if (!userId) {
    redirect(`/login`);
  }
  if (!workspaceIdRaw) {
    if (!workspaceOwnedByUser || workspaceOwnedByUser.length === 0) {
      redirect("/workspaces");
    }
    redirect(`/dashboard/workspaces/${userId}?workspaceId=${workspaceOwnedByUser[0].workspaceId}`);
  }
  const workspaceId = Number(workspaceIdRaw);
  const workspaceDashboard = await getWorkspaceDashboardDTO(Number(workspaceId));
  // console.log(workspaceDashboard);
  return (
    <>
      <WorkspaceDashboard
        currentWorkspaceId={workspaceId}
        workspaceDashboard={workspaceDashboard}
        workspaceOwnedByUser={workspaceOwnedByUser}
      />
    </>
  );
}
