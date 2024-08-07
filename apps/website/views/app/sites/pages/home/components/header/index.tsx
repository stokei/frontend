import { useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { Button, Icon, Spacer, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";

interface HeaderProps {
  readonly totalCount: number;
}

export const Header = ({ totalCount }: HeaderProps) => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const onGoToAddProductsPage = () => {
    return router.push(
      websiteRoutes.app({ appId: currentApp?.id || "" }).sites.add
    );
  };
  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <Title fontSize="sm">
        {translate.formatMessage({ id: "total" })}: {totalCount || 0}
      </Title>
      <Spacer />
      <Button
        leftIcon={<Icon name="plus" />}
        onClick={onGoToAddProductsPage}
      >
        {translate.formatMessage({ id: "add" })}
      </Button>
    </Stack>
  );
};
