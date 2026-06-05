import fetcher from "@/src/lib/fetcher";
import { CardResponse } from "@/src/types/card";

export const getCardDetailById = async (cardId: number): Promise<CardResponse> => {
  const result = await fetcher<CardResponse>(`/cards/v1/${cardId}`, {
    method: "GET",
  });
  return result;
};
