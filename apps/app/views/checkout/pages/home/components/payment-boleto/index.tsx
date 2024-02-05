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
  totalAmount?: number;
}

export const PaymentBoleto: React.FC<PaymentBoletoProps> = ({
  boleto,
  totalAmount,
}) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currency } = useShoppingCart();

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
        <CopyInput value={boleto?.line || ""} />

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
                  amount: totalAmount || 0,
                  currency: currency?.id || "",
                  minorUnit: currency?.minorUnit,
                })}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        {boleto?.pdf && (
          <Button onClick={() => window.open(boleto?.pdf, "_blank")}>
            {translate.formatMessage({ id: "downloadBoleto" })}
          </Button>
        )}
      </Stack>

      <ButtonGroup justifyContent="flex-end">
        <Button
          variant="ghost"
          onClick={() => router.push(routes.customers.home)}
        >
          {translate.formatMessage({ id: "goToHomePage" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
