"use client";
import { CardResponse } from "@/src/types/card";
import CardDetailUI from "./CardDetailUI";
import { useCardUpdateMutation, useCreateAttachment, useDeleteAttachment } from "@/src/hooks/useCardMutations";
import { CardFormValue, cardSchema } from "@/src/schema/cardSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/src/utils/notification";
import ModalWrapper from "@/src/components/ModalWrapper";
import { useQuery } from "@tanstack/react-query";
import { getCardDetailById } from "../../services/card.client.services";
import {
  useCreateCommentMutation,
  useCreateCommentReplyMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/src/hooks/useCommentMutation";
import { CommentRequest } from "@/src/types/comment";
import { CommentItemsUI } from "./CardItem/CommentItemsUI";
import { AttachmentItemsUI } from "./CardItem/AttachmentItemsUI";

interface CardDetailContainerProps {
  cardIdInitial: number;
  cardByIdInitial: CardResponse;
}
export default function CardDetail({ cardIdInitial, cardByIdInitial }: CardDetailContainerProps) {
  const router = useRouter();
  const { mutate: cardUpdateMutate, isPending: isCardUpdate } = useCardUpdateMutation();
  const { mutate: createAttachmentMutate, isPending: isCreateAttachment } = useCreateAttachment();
  const { mutate: deleteAttachmentMutate, isPending: isDeleteAttachment } = useDeleteAttachment();
  const { mutate: createCommentMutate, isPending: isCreateComment } = useCreateCommentMutation();
  const { mutate: createCommentReplyMutate, isPending: isCreateCommentReply } = useCreateCommentReplyMutation();
  const { mutate: deleteCommentMutate, isPending: isDeleteComment } = useDeleteCommentMutation();
  const { mutate: updateCommentMutate, isPending: isUpdateComment } = useUpdateCommentMutation();
  const { data: cardById } = useQuery({
    queryKey: ["cardById"],
    queryFn: async () => {
      const res = await getCardDetailById(cardIdInitial);
      console.log(res.data);
      return res.data;
    },
    initialData: cardByIdInitial,
    staleTime: 0,
    enabled: !!cardByIdInitial,
  });

  const cardFormMethod = useForm<CardFormValue>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardTitle: cardById?.cardTitle || "",
      cardDescription: cardById?.cardDescription || "",
      startDate: cardById?.startDate?.split("T")[0] || "",
      endDate: cardById?.endDate?.split("T")[0] || "",
      labelIds: cardById?.labels?.map((lb) => String(lb.lableId)) || [],
      assigneeIds: cardById?.users?.map((user) => String(user.userId)) || [],
    },
  });

  const { isDirty } = cardFormMethod.formState;

  const onSubmit = (formData: CardFormValue) => {
    const options = {
      onSuccess: () => {
        showToast("success", "Update Card success");
        router.refresh();
        router.back();
      },
      onError: (error: Error) => {
        showToast("error", `${error.message}`);
      },
    };
    cardUpdateMutate({ cardId: cardById.cardId, dataForm: formData }, options);
  };
  const handleClose = () => {
    if (isDirty) {
      cardFormMethod.handleSubmit(onSubmit)();
    } else {
      router.back();
    }
  };

  const handleCreateAttachment = (file: File) => {
    const options = {
      onSuccess: () => {
        showToast("success", "Upload attachment success");
      },
      onError: (error: Error) => {
        showToast("error", error.message);
      },
    };
    createAttachmentMutate({ cardId: cardIdInitial, file: file }, options);
  };

  const handleDeleteAttachment = (attachmentId: number) => {
    const options = {
      onSuccess: () => {
        showToast("success", "Delete attachment success");
      },
      onError: (error: Error) => {
        showToast("error", error.message);
      },
    };
    deleteAttachmentMutate(attachmentId, options);
  };

  const handleCreateComment = (commentContent: string) => {
    console.log(commentContent);
    const commentRequest: CommentRequest = {
      cardId: cardById.cardId,
      commentContent: commentContent,
    };
    createCommentMutate(commentRequest);
  };
  const handleCreateCommentReply = (commentParentId: number, commentContent: string) => {
    console.log(commentContent);
    const commentRequest: CommentRequest = {
      cardId: cardById.cardId,
      commentContent: commentContent,
    };
    createCommentReplyMutate({ commentParentId: commentParentId, commentRequest: commentRequest });
  };
  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutate(commentId);
  };

  useEffect(() => {
    if (cardById) {
      cardFormMethod.reset({
        cardTitle: cardById.cardTitle,
        cardDescription: cardById.cardDescription,
        startDate: cardById.startDate?.split("T")[0],
        endDate: cardById.endDate?.split("T")[0],
        labelIds: cardById.labels?.map((lb) => String(lb.labelId)) || [],
        assigneeIds: cardById.users?.map((user) => String(user.userId)) || [],
      });
    }
  }, [cardById.cardId, cardFormMethod]);
  return (
    <>
      <ModalWrapper size="lg" zIndex={1000} onClose={handleClose}>
        <CardDetailUI
          cardById={cardById}
          cardFormMethod={cardFormMethod}
          isPending={isCardUpdate || isCreateAttachment}
          commentSlot={
            <CommentItemsUI
              comments={cardById.comments}
              handleCreateComment={handleCreateComment}
              handleCreateCommentReply={handleCreateCommentReply}
              handleDeleteComment={handleDeleteComment}
            />
          }
          attachmentSlot={
            <AttachmentItemsUI
              attachments={cardById.attachments}
              handleCreateAttachment={handleCreateAttachment}
              handleDeleteAttachment={handleDeleteAttachment}
            />
          }
        ></CardDetailUI>
      </ModalWrapper>
    </>
  );
}
