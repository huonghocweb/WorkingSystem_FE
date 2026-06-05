import fetcher from "@/src/lib/fetcher";
import { PageResponse } from "@/src/types/pageResponse";
import { UserRequest, UserResponse } from "@/src/types/user";

export async function getUsers(
  page: number,
  size: number,
  by: string,
  order: string,
): Promise<PageResponse<UserResponse>> {
  const query = new URLSearchParams({
    page: String(page),
    size: String(size),
    by: by,
    order: order,
  }).toString();
  return fetcher(`/users/v1?${query}`, {
    method: "GET",
  });
}

export async function getUserById(id: number): Promise<UserResponse> {
  return fetcher(`/users/v1/${id}`);
}

export async function createUser(data: UserRequest): Promise<UserResponse> {
  return fetcher("/users/v1", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
