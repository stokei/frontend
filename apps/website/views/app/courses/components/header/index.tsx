import { useTranslations } from "@/hooks";
import { Button, Icon, Spacer, Stack, Title } from "@stokei/ui";

interface HeaderProps {
  readonly onOpenAddCourse: () => void;
  readonly onOpenFilters: () => void;
  readonly coursesTotalCount: number;
}

export const Header = ({
  coursesTotalCount,
  onOpenFilters,
  onOpenAddCourse,
}: HeaderProps) => {
  const translate = useTranslations();

  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <Title fontSize="sm">
        {translate.formatMessage({ id: "total" })}: {coursesTotalCount || 0}
      </Title>
      <Spacer />
      <Button
        variant="ghost"
        leftIcon={<Icon name="filters" />}
        onClick={onOpenFilters}
      >
        {translate.formatMessage({ id: "filters" })}
      </Button>
      <Button leftIcon={<Icon name="plus" />} onClick={onOpenAddCourse}>
        {translate.formatMessage({ id: "add" })}
      </Button>
    </Stack>
  );
};
