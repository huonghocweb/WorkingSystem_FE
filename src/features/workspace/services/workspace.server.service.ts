import fetcher from "@/src/lib/fetcher";
import { ApiResponse, PageResponse } from "@/src/types/pageResponse";
import { VisibilityResponse } from "@/src/types/visibility";
import { WorkSpaceResponse } from "@/src/types/workSpace";

interface pageParams {
  page: number;
  size: number;
  by: string;
  order: string;
}

export async function getWorkspacesByUserId(
  params: pageParams,
  userId: number,
): Promise<PageResponse<WorkSpaceResponse>> {
  const query = new URLSearchParams({
    page: String(params.page),
    size: String(params.size),
    by: params.by,
    order: params.order,
  }).toString();
  const result = await fetcher<PageResponse<WorkSpaceResponse>>(
    `/workspaces/v1/user/${userId}?${query}`,
    {
      method: "GET",
    },
  );
  //  console.log('result in fetch service' , result);
  return result;
}

export const getVisibilities = async (): Promise<VisibilityResponse[]> => {
  const result = await fetcher<VisibilityResponse[]>(`/visibilities/v1`, {
    method: "GET",
  });
  return result;
};
