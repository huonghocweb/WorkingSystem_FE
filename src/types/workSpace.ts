import { BoardSumResponse } from "./board";
import { UserSummaryResponse } from "./user";

export interface WorkSpaceRequest {
  workspaceTitle: string;
  visibilityId: number;
}
export interface WorkSpaceResponse {
  workspaceId: number;
  workspaceTitle: string;
  createAt: string;
  visibility: string;
  boards: BoardSumResponse[];
  workspaceMember: WorkspaceMemberResponse[];
}

export interface WorkspaceMemberResponse {
  workspaceMemberId: WorkspaceMemberId;
  user: UserSummaryResponse;
  role: string;
}

export interface WorkspaceMemberRequest {
  workspaceId: number;
  userId: number;
  role: string;
}

export interface WorkspaceInvitationRequest {
  workspaceId: number;
  email: string;
}

export interface WorkspaceInvitationResponse {
  invitationId: number;
  status: string;
  inviteToken: string;
  email: string;
  workspace: WorkSpaceResponse;
  inviter: UserSummaryResponse;
}

export interface WorkspaceMemberId {
  userId: number;
  workspaceId: number;
}
export interface WorkspaceRolesResponse {
  code: string;
  displayName: string;
}
