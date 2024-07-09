import { usePagination, useSite, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import {
  Button,
  Container,
  Pagination,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { useCallback, useEffect, useState } from "react";
import { SiteLayout } from "../../layout";
import { AddDomainDrawer } from "./components/add-domain-drawer";
import { DomainItem } from "./components/domain-item";
import { HowConfigureDomainModal } from "./components/how-configure-domain-modal";
import { Navbar } from "./components/navbar";
import {
  AppDomainFragment,
  useGetAppDomainsQuery,
} from "./graphql/domains.query.graphql.generated";

const SiteDomainsPage = () => {
  const [domains, setDomains] = useState<AppDomainFragment[]>([]);
  const translate = useTranslations();
  const { currentPage, onChangePage } = usePagination();
  const { site } = useSite();
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

  const [{ data: dataGetDomains, fetching: isLoadingDomains }, onReloadDomains] =
    useGetAppDomainsQuery({
      pause: !site,
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
              equals: site?.id,
            },
          },
        },
      },
    });

  useEffect(() => {
    const currentDomains: any[] = dataGetDomains?.domains?.items?.length
      ? [...dataGetDomains?.domains?.items, site?.stokeiDomain]
      : [site?.stokeiDomain];
    setDomains(currentDomains);
  }, [site?.stokeiDomain, dataGetDomains]);

  const onDomainCreated = useCallback(
    () => {
      onReloadDomains({ requestPolicy: 'network-only' });
      onCloseAddDomainDrawer();
    },
    [onCloseAddDomainDrawer, onReloadDomains]
  );
  const onDomainRemoved = () => {
    onReloadDomains({ requestPolicy: 'network-only' });
  };

  return (
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
          <DomainItem key={domain?.id} domain={domain} onDomainRemoved={onDomainRemoved} />
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
  );
};

const SiteDomainsWithLayout = () => {
  return (
    <SiteLayout>
      <Navbar />
      <SiteDomainsPage />
    </SiteLayout>
  );
};

export { SiteDomainsWithLayout as DomainsPage };
