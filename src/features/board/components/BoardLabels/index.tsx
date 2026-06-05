'use client'

import { useCreateBoardLabelMutation, useDeleteBoardLabelMutation } from "@/src/hooks/useBoardMutation"
import { useModal } from "@/src/store/useModalStore";
import { useQuery } from "@tanstack/react-query";
import { getLabelsByBoard } from "../../services/board.client.services";
import { LabelRequest } from "@/src/types/label";
import ModalWrapper from "@/src/components/ModalWrapper";
import { BoardLabelsUI } from "./BoardLabelsUI";
import { showToast } from "@/src/utils/notification";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {  useAddLabelToCardMutation, useDeleteLabelFromCardMutation } from "@/src/hooks/useCardMutations";
import { getCardSumById } from "@/src/features/card/services/card.client.services";

export const BoardLabel = () => {
  
    const {isOpen, onClose , type, data} = useModal();
    const isOpenModal = isOpen && type ==="boardLabel";
    const [isOpenLabelForm ,setIsOpenLabelForm] = useState(false);
    const {register , handleSubmit , reset }= useForm<LabelRequest>({
        defaultValues : {
            boardId : data?.boardId, 
            labelName : "", 
            labelColor : "",
        }
    });
    const {data : cardLabels } = useQuery({
        queryKey :  ["cardLabels", data?.cardId], 
        queryFn : async() =>  {
            const res = await getCardSumById(data?.cardId);
            console.log(res);
            return res.data?.labels;
        }, 
        initialData : [], 
        staleTime :  0, 
        enabled : !! data.cardId
    })
    const {data : boardLabels , isPending : isPendingBoardLabels} = useQuery({
        queryKey :  ["boardLabels" ,data?.boardId], 
        queryFn : async () => {
            const res = await getLabelsByBoard(data?.boardId);
            return res.data;
        },
        enabled :  !!isOpenModal && !!data?.boardId,
        initialData :  [], 
        staleTime : 0
    })
    const {mutate : createBoardLabelMutation  , isPending : isPendingCreateBoardLabel} = useCreateBoardLabelMutation();
    const {mutate :  deleteBoardLabelMutation , isPending : isPendingDeleteBoardLabel} = useDeleteBoardLabelMutation();
    const {mutate  : addLabelToCardMutation , isPending :isPendingAddLabelToCard} = useAddLabelToCardMutation();
    const {mutate  : deleteLabelFromCard , isPending : isPendingDeleteLabelFromCard} = useDeleteLabelFromCardMutation();
    const onSubmit = (labelRequest : LabelRequest) => {
        
        labelRequest.boardId = data?.boardId;
        console.log('labelReq', labelRequest);
        const options = {
            onSuccess : () => {
                setIsOpenLabelForm(false);
                showToast('success',  "Create new label");
                reset({
                    boardId :  data?.boardId , 
                    labelColor : "", 
                    labelName :  " "
                })
            }, onError:(error : Error) => {
                showToast('error', error.message);
            }
        }
       createBoardLabelMutation(labelRequest, options);
    }
    const  handleDeleteBoardLabel = (labelId  : number) => {
          const options = {
            onSuccess : () => {
                setIsOpenLabelForm(false);
            }, onError:(error : Error) => {
                showToast('error', error.message);
            }
        }
        deleteBoardLabelMutation(labelId , options);
    }
    const handleAddLabelToCard = (cardId :number ,labelId : number ) => {
        const options = {
            onSuccess : ( ) => {
            },onError : (error : Error )=>{
                showToast('error', error.message);
            }
        }
        addLabelToCardMutation({cardId, labelId  }, options);
    }
    const handleDeleteLabelFromCard  = (cardId :number , labelId : number  ) => {
        const options = {
            onSuccess : () => {

            }, onError   : (error : Error) => {
                showToast('error', error.message)
            }
        }
        deleteLabelFromCard({cardId, labelId});
    }
    return (
        <>
        {
            isOpenModal && ( 
                <ModalWrapper
                size="sm"
                onClose={onClose}
                zIndex={1500}
                >
                <BoardLabelsUI
                isPending  = {isPendingBoardLabels }
                cardLabels={cardLabels}
                boardLabels = {boardLabels}
                handleDeleteBoardLabel  = {handleDeleteBoardLabel}
                setIsOpenLabelForm={setIsOpenLabelForm}
                isOpenLabelForm= {isOpenLabelForm}
                onSubmit = {onSubmit}
                register = {register}
                handleSubmit = {handleSubmit}
                handleAddLabelToCard = {handleAddLabelToCard} 
                handleDeleteLabelFromCard = {handleDeleteLabelFromCard}
                />
                </ModalWrapper>
            )
        }
        </>
    )
}