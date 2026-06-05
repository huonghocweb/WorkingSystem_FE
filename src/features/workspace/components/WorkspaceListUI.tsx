"use client";
import { useModal } from "@/src/store/useModalStore";
import { WorkSpaceResponse } from "@/src/types/workSpace";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

interface workspaceListUIProps {
  workspaces: WorkSpaceResponse[];
  setIsModalOpen: (value: boolean) => void;
  openModalBoardForm: (data: WorkSpaceResponse, value: boolean) => void;
}
export default function WorkspaceListUI({ workspaces, setIsModalOpen, openModalBoardForm }: workspaceListUIProps) {
  console.log(workspaces);
  const { onOpen } = useModal();
  return (
    <>
      {workspaces.map((workspace, index) => (
        <section className="workspace-section" key={index}>
          <header className="workspace-header">
            <div className="header-left">
              <div className="workspace-logo">T</div>
              <h2 className="workspace-title">{workspace.workspaceTitle}</h2>
            </div>
            <div className="header-right">
              <button className="nav-btn">Boards</button>
              <button
                onClick={() => onOpen("workspaceMember", { workspaceId: workspace.workspaceId })}
                className="nav-btn"
              >
                Members
              </button>
              <button className="nav-btn">Settings</button>
              <button className="upgrade-btn">Upgrade</button>
            </div>
          </header>

          <div className="boards-grid">
            {workspace.boards.map((board, indexBoard) => (
              <div key={indexBoard} className="board-card" style={{ backgroundColor: `${board?.color || "#0079bf"}` }}>
                <Link href={`/workspaces/${workspace.workspaceId}/boards/${board.boardId}`}>
                  <div className="board-overlay"></div>
                  <span className="board-name">{board?.boardTitle}</span>
                </Link>
              </div>
            ))}
            <button onClick={() => openModalBoardForm(workspace, true)} className="create-board-card">
              Create new board
            </button>
          </div>
        </section>
      ))}
      <button className="view-closed-btn" onClick={() => setIsModalOpen(true)}>
        <i className="fa-solid fa-circle-plus" style={{ color: "rgb(116, 192, 252)" }}></i> Add Workspace
      </button>
    </>
  );
}
