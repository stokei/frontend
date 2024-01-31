import defaultNoImage from "@/assets/no-image.png";
import { useShoppingCart, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CopyInput,
  Image,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { CreateCheckoutPageCheckoutFragment } from "../../graphql/create-checkout.mutation.graphql.generated";

export interface PaymentBoletoProps {
  boleto?: CreateCheckoutPageCheckoutFragment["boleto"];
}

export const PaymentBoleto: React.FC<PaymentBoletoProps> = ({ boleto }) => {
  const router = useRouter();
  const translate = useTranslations();
  const { totalAmount, currency } = useShoppingCart();

  return (
    <Stack direction="column" spacing="10">
      <Box flexDirection="column">
        <Title fontSize="lg">
          {translate.formatMessage({
            id: "makePaymentViaBoletoToCompleteYourPurchase",
          })}
        </Title>
      </Box>

      <Stack direction="column" spacing="5" align="center">
        <Card width="full">
          <CardBody>
            <Image
              width="full"
              maxHeight="20"
              src={boleto?.barcode}
              fallbackSrc={defaultNoImage.src}
              alt={translate.formatMessage({ id: "boleto" })}
            />
          </CardBody>
        </Card>
        <Stack width="fit-content" direction="column" spacing="5">
          <Stack width="fit-content" direction="column" spacing="2">
            <Text fontWeight="bold">
              {translate.formatMessage({ id: "amountToPay" })}:
            </Text>
            <Stack
              width="fit-content"
              direction="row"
              align="center"
              justify="center"
            >
              <Text fontSize="md" fontWeight="600">
                {currency?.symbol}
              </Text>
              <Text
                fontSize="3xl"
                color="primary.500"
                fontWeight="900"
                lineHeight="shorter"
              >
                {translate.formatMoney({
                  amount: totalAmount,
                  currency: currency?.id || "",
                  minorUnit: currency?.minorUnit,
                })}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <CopyInput value={boleto?.line || ""} />

      <ButtonGroup justifyContent="flex-end">
        <Button onClick={() => router.push(routes.customers.home)}>
          {translate.formatMessage({ id: "goToHomePage" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
