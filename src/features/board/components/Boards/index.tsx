"use client";
import { BoardRequest, BoardResponse } from "@/src/types/board";
import BoardsUI from "./BoardsUI";
import { useUpdateBoardMutation } from "@/src/hooks/useBoardMutation";
import { showToast } from "@/src/utils/notification";
import { useForm } from "react-hook-form";
import { ApiResponse } from "@/src/types/pageResponse";
import { useParams } from "next/navigation";
import { useState } from "react";
import CardForm from "@/src/features/card/components/CardForm";
import { useQuery } from "@tanstack/react-query";
import { getBoardById } from "../../services/board.client.services";
import { useMoveCard } from "@/src/hooks/useCardMutations";

interface BoardContainerProps {
  initialData: BoardResponse;
}

export default function Boards({ initialData }: BoardContainerProps) {
  const { workspaceId, boardId } = useParams();
  const [isOpenCardModal, setIsOpenCardModal] = useState(false);
  const [boardListId, setBoardListId] = useState<number>();
  const boardIdNum = Number(boardId);
  const { data: boardById, isPending: isPendingBoardById } = useQuery({
    queryKey: ["boardById", boardIdNum],
    queryFn: async () => {
      const res = await getBoardById(boardIdNum);
      console.log(res.data);
      return res.data;
    },
    enabled: !!boardId,
    initialData: initialData,
    staleTime: 0,
  });
  const openCardModal = (boardListId: number) => {
    setIsOpenCardModal(true);
    setBoardListId(boardListId);
  };

  const { mutate: updateBoardMutate, isPending: isPendingUpdate } = useUpdateBoardMutation();
  const onSubmit = (dataForm: BoardRequest) => {
    if (dataForm.boardTitle === boardById?.boardTitle) {
      return;
    }
    const options = {
      onSuccess: (data: ApiResponse<BoardResponse>) => {
        // showToast('success', 'Update board success')
      },
      onError: (error: Error) => {
        showToast("error", `${error.message}`);
      },
    };
    updateBoardMutate({ data: dataForm, boardId: boardById?.boardId }, options);
  };
  const formMethod = useForm({
    defaultValues: {
      boardTitle: boardById?.boardTitle,
    },
  });

  return (
    <>
      <BoardsUI
        boardById={boardById}
        formMethod={formMethod}
        onSubmit={onSubmit}
        isPendingUpdate={isPendingUpdate || isPendingBoardById}
        openCardModal={openCardModal}
      />
      {isOpenCardModal && <CardForm onClose={() => setIsOpenCardModal(false)} boardListId={boardListId ?? 0} />}
    </>
  );
}
