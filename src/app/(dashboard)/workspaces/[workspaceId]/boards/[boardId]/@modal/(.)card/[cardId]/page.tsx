import ModalWrapper from "@/src/components/ModalWrapper";
import CardDetail from "@/src/features/card/components/CardDetail";
import { getCardDetailById } from "@/src/features/card/services/card.server.services";

interface PageProps {
    params : Promise<{
        cardId : number
    }>
}

export default async function CardDetailModalPage({params} :  PageProps) { 
    const param= await params;
    const cardById = await getCardDetailById(param.cardId);
    return ( 
    <>
            <CardDetail
            cardIdInitial={param.cardId}
            cardByIdInitial = { cardById}
            />
    </>
    )
}