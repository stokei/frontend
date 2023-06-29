import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import {
  Card,
  CardBody,
  Container,
  Pagination,
  Stack,
  Title,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Header } from "./components/header";
import { InvoicesList } from "./components/invoices-list";
import { Navbar } from "./components/navbar";
import { SubscriptionContractDetails } from "./components/subscription-contract-details";
import { useSubscriptionPageInvoicesQuery } from "./graphql/invoices.query.graphql.generated";
import { useGetSubscriptionPageSubscriptionContractQuery } from "./graphql/subscription-contract.query.graphql.generated";
import { Customer } from "./interfaces/customer";
import { Product } from "./interfaces/product";
import { Loading } from "./loading";

interface SubscriptionContractPageProps {}

export const SubscriptionContractPage: FC<
  SubscriptionContractPageProps
> = () => {
  const router = useRouter();
  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();

  const subscriptionContractId = useMemo(
    () => router?.query?.subscriptionContractId?.toString(),
    [router?.query?.subscriptionContractId]
  );

  const [
    {
      data: dataGetSubscriptionContracts,
      fetching: isLoadingSubscriptionContract,
    },
  ] = useGetSubscriptionPageSubscriptionContractQuery({
    pause: !subscriptionContractId,
    variables: {
      subscriptionContractId: subscriptionContractId || "",
    },
  });

  const [{ data: dataGetInvoices, fetching: isLoadingInvoices }] =
    useSubscriptionPageInvoicesQuery({
      pause: !currentApp || !subscriptionContractId,
      variables: {
        page: {
          limit: 10,
          number: currentPage,
        },
        orderBy: {
          createdAt: OrderBy.Desc,
        },
        where: {
          AND: {
            subscription: {
              equals: subscriptionContractId,
            },
            app: {
              equals: currentApp?.id,
            },
          },
        },
      },
    });

  const subscriptionContract = useMemo(
    () => dataGetSubscriptionContracts?.subscriptionContract,
    [dataGetSubscriptionContracts]
  );

  const customer = useMemo<Customer | undefined>(() => {
    if (subscriptionContract?.parent?.__typename === "Account") {
      return {
        name: subscriptionContract?.parent?.fullname,
        email: subscriptionContract?.parent?.appEmail || "",
        avatarURL: subscriptionContract?.parent?.avatar?.file?.url || "",
      };
    }
    if (subscriptionContract?.parent?.__typename === "App") {
      return {
        name: subscriptionContract?.parent?.name,
        email: subscriptionContract?.parent?.accountEmail || "",
        avatarURL: subscriptionContract?.parent?.logo?.file?.url || "",
      };
    }
    return;
  }, [subscriptionContract]);

  const product = useMemo<Product | undefined>(() => {
    const currentProduct = subscriptionContract?.items?.items?.[0]?.product;
    if (currentProduct?.__typename === "Course") {
      return {
        id: currentProduct?.courseId,
        name: currentProduct?.courseName,
        avatarURL: currentProduct?.avatar?.file?.url || "",
      };
    }
    if (currentProduct?.__typename === "Plan") {
      return {
        id: currentProduct?.planId,
        name: currentProduct?.planName,
      };
    }
    return;
  }, [subscriptionContract]);

  return (
    <AppLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <Container>
          <Header
            subscriptionContract={subscriptionContract}
            product={product}
            customer={customer}
          />
        </Container>
        <Container>
          <SubscriptionContractDetails
            subscriptionContract={subscriptionContract}
            product={product}
            customer={customer}
          />
        </Container>
        {isLoadingSubscriptionContract ? (
          <Loading />
        ) : (
          <Container>
            <Card width="full" background="background.50">
              <CardBody overflow="hidden" alignItems="center">
                <Stack direction="column" spacing="5">
                  <Title fontSize="md">
                    {translate.formatMessage({ id: "invoices" })}
                  </Title>
                  <InvoicesList
                    invoices={dataGetInvoices?.invoices?.items || []}
                  />
                  {dataGetInvoices?.invoices?.totalPages &&
                    dataGetInvoices?.invoices?.totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        onChangePage={onChangePage}
                        hasNextPage={!!dataGetInvoices?.invoices?.hasNextPage}
                        hasPreviousPage={
                          !!dataGetInvoices?.invoices?.hasPreviousPage
                        }
                        totalPages={dataGetInvoices?.invoices?.totalPages || 1}
                      />
                    )}
                </Stack>
              </CardBody>
            </Card>
          </Container>
        )}
      </Stack>
    </AppLayout>
  );
};
