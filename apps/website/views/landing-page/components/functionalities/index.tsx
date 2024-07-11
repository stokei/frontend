import { useTranslations } from "@/hooks";
import { SimpleGrid, Stack, Title } from "@stokei/ui";
import { FunctionalityItem } from "./item";

export const Functionalities = () => {
  const translate = useTranslations();
  return (
    <Stack direction="column" spacing="5" paddingY="6">
      <Title textAlign="center">{translate.formatMessage({ id: 'mainFeatures' })}</Title>
      <SimpleGrid columns={[1, 1, 3, 3]} spacing="5">
        <FunctionalityItem
          icon="page"
          title={translate.formatMessage({ id: 'editablePages' })}
          description={translate.formatMessage({ id: 'editablePagesDescription' })}
        />
        <FunctionalityItem
          icon="domain"
          title={translate.formatMessage({ id: 'customDomains' })}
          description={translate.formatMessage({ id: 'customDomainsDescription' })}
        />
        <FunctionalityItem
          icon="instructor"
          title={translate.formatMessage({ id: 'unlimitedAdminsInstructors' })}
          description={translate.formatMessage({ id: 'unlimitedAdminsInstructorsDescription' })}
        />
        <FunctionalityItem
          icon="product"
          title={translate.formatMessage({ id: 'unlimitedProducts' })}
          description={translate.formatMessage({ id: 'unlimitedProductsDescription' })}
        />
        <FunctionalityItem
          icon="site"
          title={translate.formatMessage({ id: 'unlimitedSites' })}
          description={translate.formatMessage({ id: 'unlimitedSitesDescription' })}
        />
        <FunctionalityItem
          icon="card"
          title={translate.formatMessage({ id: 'paymentTools' })}
          description={translate.formatMessage({ id: 'paymentToolsDescription' })}
        />
      </SimpleGrid>
    </Stack>
  );
};
