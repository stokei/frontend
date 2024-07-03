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

export const StripeOnboarding = () => {
  const translate = useTranslations();

  return (
    <PaymentGatewayOnboardingItem
      gatewayExternalURL={STRIPE_URL}
      paymentGatewayType={PaymentGatewayType.Stripe}
    >
      <Link href={STRIPE_URL} target="_blank">
        <Icon
          name="stripe"
        />
      </Link>

      <Text>
        {translate.formatMessage({
          id: "integrateYourBusinessWithStripesPaymentsPlatform",
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
