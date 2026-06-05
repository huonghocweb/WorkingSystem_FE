import ModalWrapper from "@/src/components/ModalWrapper";
import CardFormUI from "./CardFormUI";
import { useCardCreateMutation } from "@/src/hooks/useCardMutations";
import { useForm } from "react-hook-form";
import { CardFormValue, cardSchema } from "@/src/schema/cardSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { showToast } from "@/src/utils/notification";
import { AxiosError } from "axios";

interface CardFormContainerProps { 
    onClose :  () => void, 
    boardListId : number 
}

export default function CardForm({onClose , boardListId} : CardFormContainerProps) { 
    const { mutate : cardCreateMutate , isPending : isPendingCardCreate} = useCardCreateMutation();

    const cardFormMethod = useForm<CardFormValue>({
        resolver : zodResolver(cardSchema),
        defaultValues: {
            cardTitle  : "", 
            cardDescription : "",
            boardListId : boardListId != null ? boardListId.toString() : undefined
        }
    })

    const onSubmit = async (dataForm : CardFormValue) =>  {
        console.log('datafomr' , dataForm)
        const options = {
           onSuccess :  () => {
            showToast('success' ,'Create card successful');
            onClose();
           }, onError : (error :Error) =>  {
            showToast('error', `${error.message}`);
           }
        }
        cardCreateMutate(dataForm , options);
    }
        
    return (
        <>
            <ModalWrapper
            size="sm"
            onClose={onClose}
            >
                <CardFormUI
                cardFormMethod = {cardFormMethod}
                onSubmit = {onSubmit}
                isPendingCardCreate = {isPendingCardCreate}
                />
            </ModalWrapper>
        </>
    )
}