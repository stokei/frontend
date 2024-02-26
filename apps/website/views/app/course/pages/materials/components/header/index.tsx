import { useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Button, Icon, Spacer, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";

interface HeaderProps {
  readonly materialsTotalCount: number;
}

export const Header = ({ materialsTotalCount }: HeaderProps) => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const onGoToAddMaterialsPage = () => {
    return router.push(
      routes.app({ appId: currentApp?.id || "" }).materials.add
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
      <Button leftIcon={<Icon name="plus" />} onClick={onGoToAddMaterialsPage}>
        {translate.formatMessage({ id: "add" })}
      </Button>
    </Stack>
  );
};
