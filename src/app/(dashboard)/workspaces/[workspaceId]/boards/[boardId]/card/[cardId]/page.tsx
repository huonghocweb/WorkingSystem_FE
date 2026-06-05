import CardDetailContainer from "@/src/features/card/components/CardDetail";
import { getCardDetailById } from "@/src/features/card/services/card.server.services";

interface CardDetailParams {
  params: Promise<{
    cardId: number;
  }>;
}
export default async function CardDetailPage({ params }: CardDetailParams) {
  const param = await params;
  const cardById = await getCardDetailById(param.cardId);
  return (
    <>
      <CardDetailContainer
        cardIdInitial={param.cardId}
        cardByIdInitial={cardById}
      />
    </>
  );
}
