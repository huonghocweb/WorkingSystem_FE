import fetcher from "@/src/lib/fetcher";
import { WorkspaceDashboardDTO } from "@/src/types/dashoard/workspace/workspaceDashboardDTO";

export const getWorkspaceDashboardDTO = async (workspaceId: number): Promise<WorkspaceDashboardDTO> => {
  const result = await fetcher<WorkspaceDashboardDTO>(`/v1/workspaces/${workspaceId}/dashboard/overview`, {
    method: "GET",
  });
  return result;
};
