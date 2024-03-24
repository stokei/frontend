import { useTranslations } from "@/hooks";
import { Button, Icon, Spacer, Stack, Title } from "@stokei/ui";

interface HeaderProps {
  readonly onOpenFilters: () => void;
  readonly totalCount: number;
}

export const Header = ({ totalCount, onOpenFilters }: HeaderProps) => {
  const translate = useTranslations();

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
        variant="ghost"
        leftIcon={<Icon name="filters" />}
        onClick={onOpenFilters}
      >
        {translate.formatMessage({ id: "filters" })}
      </Button>
    </Stack>
  );
};
