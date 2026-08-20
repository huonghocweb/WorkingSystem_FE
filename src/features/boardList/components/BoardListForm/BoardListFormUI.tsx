import { BoardListType } from "@/src/types/boardListType";
import { useState } from "react";

interface BoardListFormProps {
  boardListType: BoardListType[];
  handleCreateBoardList: (boardListTitle: string, boardListTypeId: number) => void;
}

export const BoardListFormUI = ({ boardListType, handleCreateBoardList }: BoardListFormProps) => {
  const [boardListTitle, setBoardListTitle] = useState<string>("");
  const [boardListTypeId, setBoardListTypeId] = useState<number>(1);
  console.log("boardListType : ", boardListType);
  return (
    <>
      <div className="p-3 bg-white/80">
        <div className="mb-4">
          <h2 className="fw-bold m-0" style={{ fontSize: "18px", color: "#172b4d" }}>
            Create BoardList
          </h2>
        </div>

        <div className="mb-4">
          <label className="form-label">
            BoardList Title
            <input onChange={(e) => setBoardListTitle(e.target.value)} className="form-input" type="text" />
          </label>
          <label className="form-label">
            BoardList Type <span className="text-danger">*</span>
          </label>
          <select
            value={boardListTypeId}
            onChange={(e) => setBoardListTypeId(Number(e.target.value))}
            className="form-select form-select-sm"
          >
            {boardListType.map((blt, index) => (
              <option key={index} value={blt.boardListTypeId}>
                {blt.boardListTypeTitle}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-end gap-2 pt-2 border-top">
          <button
            type="submit"
            className="btn btn-primary btn-sm fw-bold px-3"
            style={{ backgroundColor: "#0c66e4", border: "none" }}
            onClick={() => handleCreateBoardList(boardListTitle, boardListTypeId)}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};
