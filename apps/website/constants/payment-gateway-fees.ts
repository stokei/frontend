import {
  PaymentGatewayType,
  PaymentMethodType,
} from "@/services/graphql/stokei";

export interface PaymentMethodTypeFee {
  percentage: number;
  fixAmount: number;
  transferAmount?: number;
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
    [PaymentMethodType.Boleto]: undefined,
    [PaymentMethodType.Card]: undefined,
    [PaymentMethodType.Pix]: undefined,
    [PaymentMethodType.Stripe]: {
      percentage: 9,
      fixAmount: 200,
      transferAmount: 0,
    },
  },
  [PaymentGatewayType.Pagarme]: {
    [PaymentMethodType.Stripe]: undefined,
    [PaymentMethodType.Boleto]: {
      percentage: 5,
      fixAmount: 345,
      transferAmount: 367,
    },
    [PaymentMethodType.Card]: {
      percentage: 9,
      fixAmount: 200,
      transferAmount: 367,
    },
    [PaymentMethodType.Pix]: {
      percentage: 4,
      fixAmount: 200,
      transferAmount: 367,
    },
  },
};
