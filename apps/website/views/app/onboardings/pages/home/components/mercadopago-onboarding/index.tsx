import stripeImage from "@/assets/stripe.png";
import { STRIPE_URL } from "@/constants/stripe-links";
import { useTranslations } from "@/hooks";
import { PaymentGatewayType } from "@/services/graphql/stokei";
import {
  Icon,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Text
} from "@stokei/ui";
import { PaymentGatewayOnboardingItem } from "../../../../components/payment-gateway-onboarding-item";
import { MERCADOPAGO_URL } from "@/constants/mercadopago-links";

export const MercadopagoOnboarding = () => {
  const translate = useTranslations();

  return (
    <PaymentGatewayOnboardingItem
      gatewayExternalURL={MERCADOPAGO_URL}
      paymentGatewayType={PaymentGatewayType.Mercadopago}
    >
      <Link href={MERCADOPAGO_URL} target="_blank">
        <Icon
          name="mercadopago"
        />
      </Link>

      <Text>
        {translate.formatMessage({
          id: "integrateYourBusinessWithMercadoPagosPaymentsPlatform",
        })}
      </Text>

      <List>
        <ListItem>
          <ListIcon name="check" color="green.500" />
          {translate.formatMessage({
            id: "card",
          })}
        </ListItem>
        <ListItem>
          <ListIcon name="check" color="green.500" />
          {translate.formatMessage({
            id: "boleto",
          })}
        </ListItem>
        <ListItem>
          <ListIcon name="check" color="green.500" />
          {translate.formatMessage({
            id: "pix",
          })}
        </ListItem>
        <ListItem>
          <ListIcon name="check" color="green.500" />
          {translate.formatMessage({
            id: "internationalPayment",
          })}
        </ListItem>
      </List>
    </PaymentGatewayOnboardingItem>
  );
};
