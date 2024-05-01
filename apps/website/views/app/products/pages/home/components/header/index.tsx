import { useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { Button, Icon, Spacer, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";

interface HeaderProps {
  readonly productsTotalCount: number;
  readonly onOpenFilters: () => void;
}

export const Header = ({ productsTotalCount, onOpenFilters }: HeaderProps) => {
  const router = useRouter();
  const { currentApp, hasPaymentIntegrations } = useCurrentApp();
  const translate = useTranslations();
  const onGoToAddProductsPage = () => {
    return router.push(
      websiteRoutes.app({ appId: currentApp?.id || "" }).products.add
    );
  };
  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <Title fontSize="sm">
        {translate.formatMessage({ id: "total" })}: {productsTotalCount || 0}
      </Title>
      <Spacer />
      <Button
        variant="ghost"
        leftIcon={<Icon name="filters" />}
        onClick={onOpenFilters}
      >
        {translate.formatMessage({ id: "filters" })}
      </Button>
      <Button
        leftIcon={<Icon name="plus" />}
        onClick={onGoToAddProductsPage}
        isDisabled={!hasPaymentIntegrations}
      >
        {translate.formatMessage({ id: "add" })}
      </Button>
    </Stack>
  );
};
