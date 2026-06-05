import { BoardListRequest } from "@/src/types/boardList";
import { useState } from "react";

interface BoardListFormProps {
  handleCreateBoardList: (boardListTitle: string) => void;
}

export const BoardListFormUI = ({ handleCreateBoardList }: BoardListFormProps) => {
  const [boardListTitle, setBoardListTitle] = useState<string>("");
  return (
    <>
      {" "}
      <div className="p-3">
        <div className="mb-4">
          <h2 className="fw-bold m-0" style={{ fontSize: "18px", color: "#172b4d" }}>
            Create BoardList
          </h2>
        </div>

        <div className="mb-4">
          <label className="form-label small fw-bold text-secondary">
            BoardList title <span className="text-danger">*</span>
          </label>
          <input
            onChange={(e) => setBoardListTitle(e.target.value)}
            className="form-control shadow-none"
            type="text"
            placeholder="Enter title..."
          />
        </div>
        <div className="d-flex justify-content-end gap-2 pt-2 border-top">
          <button
            type="submit"
            className="btn btn-primary btn-sm fw-bold px-3"
            style={{ backgroundColor: "#0c66e4", border: "none" }}
            onClick={() => handleCreateBoardList(boardListTitle)}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};
