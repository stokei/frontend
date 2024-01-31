import defaultNoImage from "@/assets/no-image.png";
import { usePoolling, useShoppingCart, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { OrderStatus } from "@/services/graphql/stokei";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CopyInput,
  Image,
  ListOrdered,
  ListOrderedItem,
  Loading,
  Stack,
  Text,
  Title,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CreateCheckoutPageCheckoutFragment } from "../../graphql/create-checkout.mutation.graphql.generated";
import { useGetCheckoutPageOrderQuery } from "../../graphql/payment.query.graphql.generated";

export interface PaymentPixProps {
  pix?: CreateCheckoutPageCheckoutFragment["pix"];
  orderId: string;
}

export const PaymentPix: React.FC<PaymentPixProps> = ({ pix, orderId }) => {
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { totalAmount, currency } = useShoppingCart();

  const [{ data: dataGetCheckoutPageOrder }, onExecuteGetCheckoutPageOrder] =
    useGetCheckoutPageOrderQuery({
      pause: true,
      variables: {
        orderId,
      },
    });

  usePoolling({
    onPoolling: async () => {
      if (orderId) {
        await onExecuteGetCheckoutPageOrder({
          requestPolicy: "network-only",
        });
      }
    },
  });

  useEffect(() => {
    if (dataGetCheckoutPageOrder?.order?.status === OrderStatus.Paid) {
      onShowToast({
        status: "success",
        title: translate.formatMessage({ id: "paid" }),
      });
      router.push(routes.checkout.callback);
    }
  }, [dataGetCheckoutPageOrder?.order?.status, onShowToast, router, translate]);

  return (
    <Stack direction="column" spacing="10">
      <Box flexDirection="column">
        <Title fontSize="lg">
          {translate.formatMessage({
            id: "makePaymentViaPixToCompleteYourPurchase",
          })}
        </Title>
      </Box>

      <Stack
        direction={["column-reverse", "column-reverse", "row", "row"]}
        spacing="5"
        align="center"
      >
        <Card width={["full", "full", "300px", "300px"]}>
          <CardBody>
            <Image
              width="full"
              src={pix?.qrCodeURL}
              fallbackSrc={defaultNoImage.src}
              alt={translate.formatMessage({ id: "pix" })}
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
          <Stack width="fit-content" direction="row" spacing="2">
            <Loading />
            <Text fontWeight="bold">
              {translate.formatMessage({ id: "waitingPayment" })}...
            </Text>
          </Stack>
        </Stack>
      </Stack>

      <CopyInput value={pix?.copyAndPaste || ""} />

      <ListOrdered>
        <ListOrderedItem>
          {translate.formatMessage({
            id: "useTheCodeOrUseTheQrCodeToCompleteYourPurchase",
          })}
        </ListOrderedItem>
        <ListOrderedItem>
          {translate.formatMessage({
            id: "openYourBankAppAndChoosePaymentViaPix",
          })}
        </ListOrderedItem>
        <ListOrderedItem>
          {translate.formatMessage({
            id: "ifYouPreferToUseTheQrCodeJustChooseTheQrCodeOptionAndPointYourCameraToScanIt",
          })}
        </ListOrderedItem>
        <ListOrderedItem>
          {translate.formatMessage({
            id: "ifYouPreferToUseTheCodeJustClickOnTheButtonToCopyTheCodeChooseThePixCopyAndPaste",
          })}
        </ListOrderedItem>
        <ListOrderedItem>
          {translate.formatMessage({
            id: "checkTheTotalPurchaseAmountBeforeCompletingThePayment",
          })}
        </ListOrderedItem>
        <ListOrderedItem>
          {translate.formatMessage({
            id: "afterPaymentJustGoBackToTheBeginningAndWaitForTheProductsToBeReleasedAsSoonAsThePaymentIsMade",
          })}
        </ListOrderedItem>
      </ListOrdered>

      <ButtonGroup justifyContent="flex-end">
        <Button onClick={() => router.push(routes.customers.home)}>
          {translate.formatMessage({ id: "goToHomePage" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
