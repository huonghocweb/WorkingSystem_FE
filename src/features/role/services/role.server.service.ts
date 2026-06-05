import fetcher from "@/src/lib/fetcher";
import { RoleResponse } from "@/src/types/role";

export async function getAllRole(): Promise<RoleResponse[]> {
  return fetcher("/roles/v1");
}
