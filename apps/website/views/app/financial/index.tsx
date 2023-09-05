import stripeImage from "@/assets/stripe.png";
import { STRIPE_DASHBOARD_URL } from "@/constants/stripe-links";
import { useTranslations } from "@/hooks";
import { PaymentGatewayType } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Icon,
  Image,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Navbar } from "./components/navbar";
import { useGetCurrentAppFinancialQuery } from "./graphql/app.query.graphql.generated";
import { Loading } from "./loading";

interface FinancialPageProps {}

export const FinancialPage: FC<FinancialPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const [{ fetching: isLoading, data: dataGetCurrentAppFinancial }] =
    useGetCurrentAppFinancialQuery();

  const balances = useMemo(
    () => dataGetCurrentAppFinancial?.currentApp?.balances,
    [dataGetCurrentAppFinancial?.currentApp?.balances]
  );
  return (
    <AppLayout>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Stack
            direction={["column", "column", "row", "row"]}
            paddingY="5"
            spacing="5"
          >
            {balances?.map((balance) => (
              <Card
                key={balance.paymentGatewayType}
                width="full"
                background="background.50"
              >
                <CardBody overflow="hidden" alignItems="center">
                  <Stack direction="row" spacing="5">
                    <Stack direction="column" spacing="5">
                      <Stat>
                        <StatLabel>
                          {translate.formatMessage({ id: "balance" })}
                        </StatLabel>
                        <StatNumber
                          color={
                            balance.availableAmount &&
                            balance.availableAmount < 0
                              ? "red.500"
                              : "text.500"
                          }
                        >
                          {translate.formatMoney({
                            showSymbol: true,
                            amount: balance.availableAmount || 0,
                            currency: balance.currency?.id || "",
                            minorUnit: balance.currency?.minorUnit,
                          })}
                        </StatNumber>

                        <StatHelpText>
                          {translate.formatMessage({ id: "toReceive" })}:
                          <Text as="b" marginLeft="2">
                            {balance?.currency?.symbol}{" "}
                            {translate.formatMoney({
                              showSymbol: false,
                              amount: balance.pendingAmount || 0,
                              currency: balance.currency?.id || "",
                              minorUnit: balance.currency?.minorUnit,
                            })}
                          </Text>
                        </StatHelpText>
                      </Stat>
                      <Box>
                        {balance.paymentGatewayType ===
                          PaymentGatewayType.Stripe && (
                          <Button
                            size="sm"
                            onClick={() => router.push(STRIPE_DASHBOARD_URL)}
                          >
                            {translate.formatMessage({ id: "goToStripe" })}
                          </Button>
                        )}
                      </Box>
                    </Stack>
                    <Box>
                      {balance.paymentGatewayType ===
                      PaymentGatewayType.Stripe ? (
                        <Image
                          width="12"
                          src={stripeImage.src}
                          fallbackSrc={stripeImage.blurDataURL}
                          alt={translate.formatMessage({ id: "paymentMethod" })}
                        />
                      ) : (
                        <Icon name="pix" fontSize="lg" color="green.500" />
                      )}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </Stack>
        </Container>
      )}
    </AppLayout>
  );
};
