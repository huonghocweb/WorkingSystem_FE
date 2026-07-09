import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  WorkspaceInvitationRequest,
  WorkspaceMemberId,
  WorkspaceMemberRequest,
  WorkSpaceRequest,
} from "../types/workSpace";
import {
  addUserToWorkspace,
  createWorkspace,
  deleteWorkspaceInvitation,
  deleteWorkspaceMember,
  getWorkspaceRoles,
  inviteUserByEmail,
  updateWorkspaceMember,
} from "../features/workspace/services/workspace.client.service";
import { AxiosError } from "axios";

export const useCreateWorkSpace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: WorkSpaceRequest) => {
      console.log("formData in hook mutate: ", formData);
      return createWorkspace(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workSpace"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error);
    },
  });
};

export const useInviteUserToWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkspaceMemberRequest) => {
      return addUserToWorkspace(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-members"] });
    },
  });
};
export const useUpdateWorkspaceMember = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkspaceMemberRequest) => {
      return updateWorkspaceMember(data);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["workspace-members"] });
    },
  });
};
export const useInviteEmailToWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkspaceInvitationRequest) => {
      return inviteUserByEmail(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-invitations"] });
    },
  });
};

export const useDeleteWorkspaceMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workspaceMemberId: WorkspaceMemberId) => {
      return deleteWorkspaceMember(workspaceMemberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-members"] });
    },
  });
};

export const useDeleteWorkspaceInvitation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (workspaceInvitationId: number) => {
      return deleteWorkspaceInvitation(workspaceInvitationId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["workspace-invitations"] });
    },
  });
};
