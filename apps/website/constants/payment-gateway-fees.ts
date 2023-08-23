import { PaymentGatewayType } from "@/constants/payment-gateway-type";

interface PaymentGatewayFeeValue {
  percentage: number;
  fixAmount: number;
}

export const paymentGatewayFees: Record<
  PaymentGatewayType,
  PaymentGatewayFeeValue
> = {
  [PaymentGatewayType.STRIPE]: {
    percentage: 7,
    fixAmount: 0,
  },
  [PaymentGatewayType.PAGARME]: {
    percentage: 5,
    fixAmount: 200,
  },
};
