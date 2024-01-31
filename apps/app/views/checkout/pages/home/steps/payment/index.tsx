import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { PaymentMethodType } from "@/services/graphql/stokei";
import { PaymentBoleto } from "../../components/payment-boleto";
import { PaymentPix } from "../../components/payment-pix";
import { CreateCheckoutPageCheckoutFragment } from "../../graphql/create-checkout.mutation.graphql.generated";

export interface PaymentStepProps {
  pix?: CreateCheckoutPageCheckoutFragment["pix"];
  boleto?: CreateCheckoutPageCheckoutFragment["boleto"];
  orderId: string;
  price?: PriceComponentFragment | null;
  paymentMethodType?: PaymentMethodType;
  onPreviousStep: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  pix,
  boleto,
  paymentMethodType,
  orderId,
}) => {
  if (paymentMethodType === PaymentMethodType.Pix) {
    return <PaymentPix orderId={orderId} pix={pix} />;
  }
  if (paymentMethodType === PaymentMethodType.Boleto) {
    return <PaymentBoleto boleto={boleto} />;
  }
  return <></>;
};
