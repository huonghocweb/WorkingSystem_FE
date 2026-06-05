"use client";

import PendingPage from "@/src/components/PendingPage";
import { WorkspaceMember } from "@/src/features/workspace/components/WorkspaceMember";
import {
  BoardMemberId,
  BoardMemberRequest,
  BoardMemberResponse,
} from "@/src/types/board";
import { UserSummaryResponse } from "@/src/types/user";
import { WorkspaceMemberResponse } from "@/src/types/workSpace";

interface BoardMemberProps {
  isLoading: boolean;
  cardAssignees: UserSummaryResponse[];
  boardMembers: BoardMemberResponse[];
  workspaceMember: WorkspaceMemberResponse[];
  handleAddMemberToBoard: (userId: number | string) => void;
  handleDeleteMemberFromBoard: (boardMemberId: BoardMemberId) => void;
  handleAddAssigneeToCard: (assigneeId: number) => void;
  handleDeleteAssigneeFromCard: (assigneeId: number) => void;
}

export const BoardMembersUI = ({
  isLoading,
  cardAssignees,
  boardMembers,
  workspaceMember,
  handleAddMemberToBoard,
  handleDeleteMemberFromBoard,
  handleAddAssigneeToCard,
  handleDeleteAssigneeFromCard,
}: BoardMemberProps) => {
  console.log(cardAssignees);
  return (
    <>
      {isLoading && <PendingPage />}
      <div className="p-2">
        {cardAssignees.length > 0 && (
          <>
            <div className="inline-block px-2 py-2 bg-white/60 backdrop-blur-md border border-white/20 rounded-xl shadow-sm">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Card assignees
              </span>
            </div>
            <div
              className="list-group list-group-flush border rounded-3 overflow-auto"
              style={{ maxHeight: "350px" }}
            >
              <div
                className="list-group list-group-flush border rounded-3 overflow-auto"
                style={{ maxHeight: "350px" }}
              >
                {cardAssignees?.map((assignee, index) => (
                  <div
                    key={index}
                    className="list-group-item list-group-item-action py-3"
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <div className="position-relative">
                          <>
                            <img
                              src={assignee.imageUrl}
                              alt="avatar"
                              className="rounded-circle border"
                              width="40"
                              height="40"
                            />
                            <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-light rounded-circle"></span>
                          </>
                        </div>
                        <div>
                          <h6
                            className="mb-0 fw-bold text-dark"
                            style={{ fontSize: "14px" }}
                          >
                            {assignee.userName}
                          </h6>
                          <small className="text-muted">
                            {assignee?.email || ""}
                          </small>
                        </div>
                      </div>
                      <div className="dropdown">
                        <button
                          onClick={() =>
                            handleDeleteAssigneeFromCard(assignee.userId)
                          }
                          type="button"
                          className="btn btn-outline-danger btn-xs"
                        >
                          <i className="fa-solid fa-user-minus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="inline-block px-2 py-2 bg-white/60 backdrop-blur-md border border-white/20 rounded-xl shadow-sm">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Board Members
          </span>
        </div>
        <div
          className="list-group list-group-flush border rounded-3 overflow-auto"
          style={{ maxHeight: "350px" }}
        >
          <div
            className="list-group list-group-flush border rounded-3 overflow-auto"
            style={{ maxHeight: "350px" }}
          >
            {boardMembers?.map((boardMember, index) => (
              <div
                key={index}
                className="list-group-item list-group-item-action py-3"
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="position-relative">
                      <>
                        <img
                          src={boardMember.user.imageUrl}
                          alt="avatar"
                          className="rounded-circle border"
                          width="40"
                          height="40"
                        />
                        <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-light rounded-circle"></span>
                      </>
                    </div>
                    <div>
                      <h6
                        className="mb-0 fw-bold text-dark"
                        style={{ fontSize: "14px" }}
                      >
                        {boardMember.user.userName}
                      </h6>
                      <small className="text-muted">
                        {boardMember.user?.email || ""}
                      </small>
                    </div>
                  </div>
                  <div className="btn-group dropdown">
                    <button
                      className="btn btn-xs btn-light border dropdown-toggle"
                      type="button"
                    >
                      {boardMember.role}
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteMemberFromBoard(boardMember.boardMemberId)
                      }
                      type="button"
                      className="btn btn-xs btn-outline-danger"
                    >
                      <i className="fa-solid fa-trash "></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-xs btn-outline-success"
                      onClick={() =>
                        handleAddAssigneeToCard(boardMember.user.userId)
                      }
                    >
                      <i className="fa-solid fa-user-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="inline-block px-2 py-2 bg-white/60 backdrop-blur-md border border-white/20 rounded-xl shadow-sm">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Workspace Members
          </span>
        </div>
        <div
          className="list-group list-group-flush border rounded-3 overflow-auto"
          style={{ maxHeight: "350px" }}
        >
          <div
            className="list-group list-group-flush border rounded-3 overflow-auto"
            style={{ maxHeight: "350px" }}
          >
            {workspaceMember?.map((workspaceMember, index) => (
              <div
                key={index}
                className="list-group-item list-group-item-action py-3"
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="position-relative">
                      <>
                        <img
                          src={workspaceMember.user.imageUrl}
                          alt="avatar"
                          className="rounded-circle border"
                          width="40"
                          height="40"
                        />
                        <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-light rounded-circle"></span>
                      </>
                    </div>
                    <div>
                      <h6
                        className="mb-0 fw-bold text-dark"
                        style={{ fontSize: "14px" }}
                      >
                        {workspaceMember.user.userName}
                      </h6>
                      <small className="text-muted">
                        {workspaceMember.user?.email || ""}
                      </small>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-xs btn-light border dropdown-toggle"
                      type="button"
                    >
                      {workspaceMember.role}
                    </button>
                    <button
                      onClick={() =>
                        handleAddMemberToBoard(workspaceMember.user.userId)
                      }
                      type="button"
                      className="btn btn-success btn-xs"
                    >
                      Add to Board
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {workspaceMember?.length === 0 ||
              (boardMembers?.length === 0 && (
                <div className="p-4 text-center text-muted">
                  No members or pending invitations.
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
