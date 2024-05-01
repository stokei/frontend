import { useTranslations } from "@/hooks";
import { Button, Icon, Spacer, Stack, Title } from "@stokei/ui";

interface HeaderProps {
  readonly onOpenAddFeature: () => void;
  readonly featuresTotalCount: number;
}

export const Header = ({
  featuresTotalCount,
  onOpenAddFeature,
}: HeaderProps) => {
  const translate = useTranslations();

  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <Title fontSize="sm">
        {translate.formatMessage({ id: "total" })}: {featuresTotalCount || 0}
      </Title>
      <Spacer />
      <Button leftIcon={<Icon name="plus" />} onClick={onOpenAddFeature}>
        {translate.formatMessage({ id: "add" })}
      </Button>
    </Stack>
  );
};
