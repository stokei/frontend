import { useAPIErrors, usePagination, useTranslations } from "@/hooks";
import { useCurrentApp } from "@/hooks/use-current-app";
import { OrderBy } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Link,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { AddDomainDrawer } from "./components/add-domain-drawer";
import { Navbar } from "./components/navbar";
import {
  AppDomainFragment,
  useGetAppDomainsQuery,
} from "./graphql/domains.query.graphql.generated";

interface SettingsDomainsPageProps {}

export const SettingsDomainsPage: FC<SettingsDomainsPageProps> = () => {
  const [domains, setDomains] = useState<AppDomainFragment[]>([]);
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const {
    isOpen: isOpenAddDomainDrawer,
    onClose: onCloseAddDomainDrawer,
    onOpen: onOpenAddDomainDrawer,
  } = useDisclosure();

  const [{ data: dataGetDomains, fetching: isLoadingDomains }] =
    useGetAppDomainsQuery({
      pause: !currentApp,
      requestPolicy: "network-only",
      variables: {
        page: {
          limit: 10,
          number: currentPage,
        },
        orderBy: {
          name: OrderBy.Asc,
        },
        where: {
          AND: {
            parent: {
              equals: currentApp?.id,
            },
          },
        },
      },
    });

  useEffect(() => {
    const currentDomains: any[] = dataGetDomains?.domains?.items?.length
      ? [...dataGetDomains?.domains?.items, currentApp?.stokeiDomain]
      : [currentApp?.stokeiDomain];
    setDomains(currentDomains);
  }, [currentApp?.stokeiDomain, dataGetDomains]);

  const onDomainCreated = useCallback(
    (newDomain: AppDomainFragment) => {
      setDomains((currentDomains) => [...currentDomains, newDomain]);
      onCloseAddDomainDrawer();
    },
    [onCloseAddDomainDrawer]
  );

  return (
    <AppLayout>
      <Navbar />
      <Container paddingY="5">
        <AddDomainDrawer
          isOpenDrawer={isOpenAddDomainDrawer}
          onCloseDrawer={onCloseAddDomainDrawer}
          onSuccess={onDomainCreated}
        />
        <Stack direction="column" spacing="5">
          <Box width="full">
            <Button onClick={onOpenAddDomainDrawer}>
              {translate.formatMessage({ id: "addDomain" })}
            </Button>
          </Box>
          {domains?.map((domain) => (
            <Card background="background.50">
              <CardBody>
                <Stack
                  direction={["column", "column", "row", "row"]}
                  spacing="5"
                  justify="space-between"
                >
                  <Link
                    href={domain.url || ""}
                    fontWeight="bold"
                    target="_blank"
                  >
                    {domain.name}
                  </Link>
                  <Badge colorScheme={domain.active ? "success" : "gray"}>
                    {translate.formatMessage({
                      id: domain.active ? "active" : "inactive",
                    })}
                  </Badge>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Container>
    </AppLayout>
  );
};
