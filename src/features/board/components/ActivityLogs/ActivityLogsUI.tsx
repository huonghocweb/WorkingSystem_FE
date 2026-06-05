"use client";

import PendingPage from "@/src/components/PendingPage";
import { ActivityLogResponse } from "@/src/types/activityLog";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ActivityLogsProps {
  activityLogs?: ActivityLogResponse[];
  isPending: boolean;
  paginationControlSlot: React.ReactNode;
}

export const ActivityLogsUI = ({ activityLogs = [], isPending, paginationControlSlot }: ActivityLogsProps) => {
  const { workspaceId, boardId } = useParams();
  console.log(activityLogs);
  return (
    <>
      {isPending && <PendingPage />}
      {paginationControlSlot}
      <div className="activity-log-container bg-white text-dark p-4 rounded shadow-sm border">
        {activityLogs.map((activityLog, index) => (
          <>
            <div key={index} className="d-flex mb-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={`${activityLog.user.imageUrl}`}
                  className="rounded-circle border"
                  width={40}
                  height={40}
                  alt="Avatar"
                />
              </div>

              <div className="ms-3 w-100">
                <div className="activity-header d-flex flex-wrap align-items-center">
                  <span className="fw-bold text-dark me-1">{activityLog.user.userName}</span>
                  <span className="text-muted me-1">has {activityLog.actionType?.toLowerCase()}</span>
                  <span className="fw-semibold text-dark me-1">{activityLog.entityType?.toLowerCase()}</span>
                  <span className="text-primary fw-bold me-1">{activityLog.entityName}</span>
                  <>
                    <span className="text-muted me-1">on</span>
                    <Link
                      href={`/workspaces/${workspaceId}/boards/${boardId}/card/${activityLog.contextId}`}
                      className="text-primary fw-bold text-decoration-none border-bottom border-primary"
                    >
                      {activityLog.contextName}
                    </Link>
                  </>
                </div>
                <div className="activity-meta small text-muted d-flex align-items-center mt-1">
                  <a href="#" className="text-muted text-decoration-none me-2 shadow-none">
                    {new Date(activityLog.createAt).toLocaleTimeString("vi-VN")} -{" "}
                    {new Date(activityLog.createAt).toLocaleDateString("vi-VN")}
                  </a>
                </div>
                <div className="activity-attachment mt-3">
                  {activityLog.extraData && (
                    <a href={`${activityLog.extraData}`} download={`${activityLog.extraData}`}>
                      <img
                        src={`${activityLog.extraData}`}
                        className="img-fluid rounded border shadow-sm"
                        style={{ maxWidth: "200px" }}
                        alt={activityLog.entityName || "Attachment"}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
