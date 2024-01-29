import { PAGARME_KEY } from "@/environments";
import { pagarmeClient } from "@/services/clients/pagarme";

export interface CreatePagarmeCardTokenData {
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  holderName: string;
  holderDocument: string;
}

export interface CreatePagarmeCardTokenResponse {
  token: string;
}

export const createPagarmeCardToken = async (
  data: CreatePagarmeCardTokenData
): Promise<CreatePagarmeCardTokenResponse | undefined> => {
  try {
    const response = await pagarmeClient.post(`/tokens?appId=${PAGARME_KEY}`, {
      card: {
        number: data?.cardNumber,
        holder_name: data?.holderName,
        holder_document: data?.holderDocument,
        exp_month: data?.expiryMonth,
        exp_year: data?.expiryYear,
        cvv: data?.cvv,
      },
      type: "card",
    });
    if (!response?.data) {
      return;
    }
    return {
      token: response?.data?.id,
    };
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      Object.values(
        error?.response?.data?.errors as Record<string, string[]>
      ).map((errorValue) => {
        if (typeof errorValue === "string") {
          throw new Error(errorValue);
        } else {
          throw new Error(errorValue?.[0]);
        }
      });
    } else {
      throw new Error(error?.message);
    }
  }
};
