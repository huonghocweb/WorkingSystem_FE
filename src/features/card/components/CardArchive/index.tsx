import { useQuery } from "@tanstack/react-query";
import { getCardsArchiveByBoard } from "../../services/card.client.services";
import { useModal } from "@/src/store/useModalStore";
import ModalWrapper from "@/src/components/ModalWrapper";
import { useDeleteCard, useRestoreCard } from "@/src/hooks/useCardMutations";
import { showToast } from "@/src/utils/notification";
import { error } from "console";
import { ArchiveCards } from "./ArchiveCards";

export const CardsArchive = () => {
  const { isOpen, onClose, data, type } = useModal();
  const isOpenModal = isOpen && type === "cardsArchive";
  const { mutate: restoreCard, isPending: isRestoreCard } = useRestoreCard(data?.boardId);
  const { mutate: deleteCard, isPending: isDeleteCard } = useDeleteCard(data?.boardId);
  const { data: archiveCards, isPending: isCardsArchive } = useQuery({
    queryKey: ["archiveCards"],
    queryFn: async () => {
      const res = await getCardsArchiveByBoard(data?.boardId);
      console.log(res.data);
      return res.data;
    },
    initialData: [],
    enabled: !!data?.boardId,
    staleTime: 0,
  });
  const handleRestoreCard = (cardId: number) => {
    const options = {
      onSuccess: () => {
        showToast("success", "Restore card success");
      },
      onError: (error: Error) => {
        showToast("error", `${error.message}`);
      },
    };
    restoreCard(cardId, options);
  };
  const handleDeleteCard = (cardId: number) => {
    const options = {
      onSuccess: () => {
        showToast("success", "Delete card success");
      },
      onError: (error: Error) => {
        showToast("error", `${error.message}`);
      },
    };
    deleteCard(cardId, options);
  };
  return (
    <>
      {isOpenModal && (
        <ModalWrapper zIndex={159} size="sm" onClose={onClose}>
          <ArchiveCards
            archiveCards={archiveCards}
            isPending={isCardsArchive}
            handleRestoreCard={handleRestoreCard}
            handleDeleteCard={handleDeleteCard}
          />
        </ModalWrapper>
      )}
    </>
  );
};
