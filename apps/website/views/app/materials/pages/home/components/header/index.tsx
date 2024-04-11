import { useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { Button, Icon, Spacer, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";

interface HeaderProps {
  readonly onOpenFilters: () => void;
  readonly materialsTotalCount: number;
}

export const Header = ({ materialsTotalCount, onOpenFilters }: HeaderProps) => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const onGoToAddMaterialsPage = () => {
    return router.push(
      websiteRoutes.app({ appId: currentApp?.id || "" }).materials.add
    );
  };
  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <Title fontSize="sm">
        {translate.formatMessage({ id: "total" })}: {materialsTotalCount || 0}
      </Title>
      <Spacer />
      <Button
        variant="ghost"
        leftIcon={<Icon name="filters" />}
        onClick={onOpenFilters}
      >
        {translate.formatMessage({ id: "filters" })}
      </Button>
      <Button leftIcon={<Icon name="plus" />} onClick={onGoToAddMaterialsPage}>
        {translate.formatMessage({ id: "add" })}
      </Button>
    </Stack>
  );
};
