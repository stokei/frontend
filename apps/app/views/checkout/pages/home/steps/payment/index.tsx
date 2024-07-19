import { PriceComponentFragment } from "@stokei/builder";
import { PaymentMethodType } from "@/services/graphql/stokei";
import { PaymentBoleto } from "../../components/payment-boleto";
import { PaymentPix } from "../../components/payment-pix";
import { CreateCheckoutPageCheckoutFragment } from "../../graphql/create-checkout.mutation.graphql.generated";
import { PaymentStripe } from "../../components/payment-stripe";

export interface PaymentStepProps {
  checkout?: CreateCheckoutPageCheckoutFragment;
  orderId: string;
  totalAmount?: number;
  price?: PriceComponentFragment | null;
  paymentMethodType?: PaymentMethodType;
  onPreviousStep: () => void;
}

export const PaymentStep = ({
  checkout,
  paymentMethodType,
  totalAmount,
  orderId,
}: PaymentStepProps) => {
  if (paymentMethodType === PaymentMethodType.Pix) {
    return (
      <PaymentPix
        orderId={orderId}
        pix={checkout?.pix}
        totalAmount={totalAmount}
      />
    );
  }
  if (paymentMethodType === PaymentMethodType.Boleto) {
    return (
      <PaymentBoleto boleto={checkout?.boleto} totalAmount={totalAmount} />
    );
  }
  if (paymentMethodType === PaymentMethodType.Stripe) {
    return <PaymentStripe stripe={checkout?.stripe} />;
  }
  return <></>;
};
