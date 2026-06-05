import { UserSummaryResponse } from "./user";

export interface ActivityLogResponse {
  activityLogId: number;
  createAt: string;
  content: string;
  extraData: string;
  actionType: string;
  entityType: string;
  user: UserSummaryResponse;
  entityName: string;
  contextName: string;
  contextId: number;
  entityId: number;
}
