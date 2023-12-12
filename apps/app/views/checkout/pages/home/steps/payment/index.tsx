import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { usePoolling, useShoppingCart, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { OrderStatus, PaymentMethodType } from "@/services/graphql/stokei";
import { CheckoutProductFragment } from "@/views/checkout/graphql/product.query.graphql.generated";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  ListOrdered,
  ListOrderedItem,
  Loading,
  Stack,
  Text,
  Title,
  useClipboard,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useGetCheckoutPageOrderQuery } from "../../graphql/payment.query.graphql.generated";

export interface PaymentStepProps {
  qrCodeCopyAndPaste: string;
  qrCodeURL: string;
  orderId: string;
  price?: PriceComponentFragment | null;
  paymentMethodType?: PaymentMethodType;
  onPreviousStep: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  qrCodeCopyAndPaste,
  qrCodeURL,
  price,
  orderId,
}) => {
  const { onCopy, hasCopied } = useClipboard(qrCodeCopyAndPaste);

  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { totalAmount, subtotalAmount, currency } = useShoppingCart();

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
              src={qrCodeURL}
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

      <Stack direction="column" spacing="5">
        <Input
          id="copyAndPastePix"
          minHeight="full"
          isReadOnly
          value={qrCodeCopyAndPaste}
        />
        <Button
          width="fit-content"
          onClick={onCopy}
          isDisabled={!qrCodeCopyAndPaste}
        >
          {translate.formatMessage({ id: hasCopied ? "copied" : "copy" })}
        </Button>
      </Stack>

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

      <ButtonGroup>
        <Button onClick={() => router.push(routes.customers.home)}>
          {translate.formatMessage({ id: "goToHomePage" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
