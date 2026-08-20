import ModalWrapper from "@/src/components/ModalWrapper";
import { useModal } from "@/src/store/useModalStore";
import { BoardListFormUI } from "./BoardListFormUI";
import { useCreateBoardList } from "@/src/hooks/useBoardListMutation";
import { BoardListRequest } from "@/src/types/boardList";
import { useQuery } from "@tanstack/react-query";
import { getBoardListTypeCode } from "../../services/boardList.client.services";

export const BoardListForm = () => {
  const { isOpen, onClose, data, type } = useModal();
  const isOpenModal = isOpen && type === "boardListForm";
  const { mutate: createBoardListMutate, isPending: isCreateBoardList } = useCreateBoardList(data?.boardId);

  const { data: boardListType } = useQuery({
    queryKey: ["boardListType"],
    queryFn: async () => {
      const res = await getBoardListTypeCode();
      console.log("resData", res);
      return res.data;
    },
    initialData: [],
    staleTime: 0,
  });
  const handleCreateBoardList = (boardListTitle: string, boardListTypeId: number) => {
    const boardListRequest: BoardListRequest = {
      boardListTitle: boardListTitle,
      boardId: data?.boardId,
      boardListTypeId: boardListTypeId,
    };
    //    console.log(boardListTitle);
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
          <BoardListFormUI boardListType={boardListType} handleCreateBoardList={handleCreateBoardList} />
        </ModalWrapper>
      )}
    </>
  );
};
