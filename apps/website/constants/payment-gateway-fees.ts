import { PaymentGatewayType } from "@/services/graphql/stokei";

export interface PaymentMethodTypeFee {
  percentage: number;
  fixAmount: number;
}
export type PaymentGatewayFees = Record<
  PaymentGatewayType,
  PaymentMethodTypeFee
>;

export const paymentGatewayFees: PaymentGatewayFees = {
  [PaymentGatewayType.Stripe]: {
    percentage: 5,
    fixAmount: 0,
  },
  [PaymentGatewayType.Pagarme]: {
    percentage: 5,
    fixAmount: 0,
  },
  [PaymentGatewayType.Mercadopago]: {
    percentage: 5,
    fixAmount: 0,
  },
  [PaymentGatewayType.Pagseguro]: {
    percentage: 5,
    fixAmount: 0,
  },
};
