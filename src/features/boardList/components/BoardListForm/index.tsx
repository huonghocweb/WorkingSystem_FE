import ModalWrapper from "@/src/components/ModalWrapper";
import { useModal } from "@/src/store/useModalStore";
import { BoardListFormUI } from "./BoardListFormUI";
import { useCreateBoardList } from "@/src/hooks/useBoardListMutation";
import { BoardListRequest } from "@/src/types/boardList";

export const BoardListForm = () => {
  const { isOpen, onClose, data, type } = useModal();
  const isOpenModal = isOpen && type === "boardListForm";
  const { mutate: createBoardListMutate, isPending: isCreateBoardList } = useCreateBoardList(data?.boardId);
  const handleCreateBoardList = (boardListTitle: string) => {
    const boardListRequest: BoardListRequest = {
      boardListTitle: boardListTitle,
      boardId: data?.boardId,
    };
    console.log(boardListTitle);
    const options = {
      onSuccess: () => {
        onClose();
      },
      onError: () => {},
    };
    createBoardListMutate(boardListRequest, options);
  };
  return (
    <>
      {isOpenModal && (
        <ModalWrapper onClose={onClose} size="sm">
          <BoardListFormUI handleCreateBoardList={handleCreateBoardList} />
        </ModalWrapper>
      )}
    </>
  );
};
