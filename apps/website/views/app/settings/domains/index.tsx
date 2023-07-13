import { useAPIErrors, usePagination, useTranslations } from "@/hooks";
import { useCurrentApp } from "@/hooks/use-current-app";
import { OrderBy } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  useDisclosure,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { AddDomainDrawer } from "./components/add-domain-drawer";
import { DomainItem } from "./components/domain-item";
import { HowConfigureDomainModal } from "./components/how-configure-domain-modal";
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
  const {
    isOpen: isOpenHowConfigureDomainModal,
    onClose: onCloseHowConfigureDomainModal,
    onOpen: onOpenHowConfigureDomainModal,
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
  const onDomainRemoved = (domain: AppDomainFragment) => {
    setDomains((currentDomains) =>
      currentDomains?.filter(
        (currentDomain) => currentDomain?.id !== domain?.id
      )
    );
  };

  return (
    <AppLayout>
      <Navbar />
      <Container paddingY="5">
        <AddDomainDrawer
          isOpenDrawer={isOpenAddDomainDrawer}
          onCloseDrawer={onCloseAddDomainDrawer}
          onSuccess={onDomainCreated}
        />
        <HowConfigureDomainModal
          isOpenModal={isOpenHowConfigureDomainModal}
          onCloseModal={onCloseHowConfigureDomainModal}
        />
        <Stack direction="column" spacing="5">
          <Stack
            direction={["column", "column", "row", "row"]}
            spacing="5"
            justify="space-between"
            align={["flex-start", "flex-start", "center", "center"]}
          >
            <Button onClick={onOpenAddDomainDrawer}>
              {translate.formatMessage({ id: "addDomain" })}
            </Button>
            <Button variant="link" onClick={onOpenHowConfigureDomainModal}>
              {translate.formatMessage({ id: "howConfigureADomain" })}
            </Button>
          </Stack>
          {domains?.map((domain) => (
            <DomainItem domain={domain} onDomainRemoved={onDomainRemoved} />
          ))}
          {dataGetDomains?.domains?.totalPages &&
            dataGetDomains?.domains?.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}
                hasNextPage={!!dataGetDomains?.domains?.hasNextPage}
                hasPreviousPage={!!dataGetDomains?.domains?.hasPreviousPage}
                totalPages={dataGetDomains?.domains?.totalPages || 1}
              />
            )}
        </Stack>
      </Container>
    </AppLayout>
  );
};
