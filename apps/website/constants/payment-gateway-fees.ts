import {
  PaymentGatewayType,
  PaymentMethodType,
} from "@/services/graphql/stokei";

export interface PaymentMethodTypeFee {
  percentage: number;
  fixAmount: number;
}
export type PaymentGatewayFeeValue = Record<
  PaymentMethodType,
  PaymentMethodTypeFee | undefined
>;
export type PaymentGatewayFees = Record<
  PaymentGatewayType,
  PaymentGatewayFeeValue
>;

export const paymentGatewayFees: PaymentGatewayFees = {
  [PaymentGatewayType.Stripe]: {
    [PaymentMethodType.Boleto]: {
      percentage: 5,
      fixAmount: 345,
    },
    [PaymentMethodType.Card]: {
      percentage: 7,
      fixAmount: 50,
    },
    [PaymentMethodType.Pix]: undefined,
  },
  [PaymentGatewayType.Pagarme]: {
    [PaymentMethodType.Boleto]: undefined,
    [PaymentMethodType.Card]: undefined,
    [PaymentMethodType.Pix]: {
      percentage: 4,
      fixAmount: 200,
    },
  },
};
