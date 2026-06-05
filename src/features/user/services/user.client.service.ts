import axiosClient from "@/src/lib/axiosClient";
import { UserRequest } from "@/src/types/user";

export const createUser = async (data: UserRequest, file?: File) => {
  const formData = new FormData();
  formData.append(
    "userRequest",
    new Blob([JSON.stringify(data)], { type: "application/json" }),
  );
  if (file) {
    // Kiểm tra nếu là FileList thì lấy cái đầu tiên, nếu là File rồi thì dùng luôn
    const actualFile = file instanceof FileList ? file[0] : file;
    if (actualFile) {
      formData.append("files", actualFile); // Đây mới là truyền File thực sự!
    }
  }

  return axiosClient.post("/users/v1", formData);
};

export const updateUser = async (
  id: number,
  data: UserRequest,
  file?: File,
) => {
  const formData = new FormData();
  formData.append(
    "userRequest",
    new Blob([JSON.stringify(data)], { type: "application/json" }),
  );
  if (file) {
    // Kiểm tra nếu là FileList thì lấy cái đầu tiên, nếu là File rồi thì lay luôn
    const actualFile = file instanceof FileList ? file[0] : file;
    if (actualFile) {
      formData.append("files", actualFile);
    }
  }
  return axiosClient.put(`/users/v1/${id}`, formData);
};
