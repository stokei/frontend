import { useCurrentApp, useTranslations } from "@/hooks";
import { Button, Icon, Spacer, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";

interface HeaderProps {
  readonly catalogsTotalCount: number;
  readonly onOpenFilters: () => void;
  readonly onAddCatalog: () => void;
}

export const Header = ({
  catalogsTotalCount,
  onOpenFilters,
  onAddCatalog,
}: HeaderProps) => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();

  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <Title fontSize="sm">
        {translate.formatMessage({ id: "total" })}: {catalogsTotalCount || 0}
      </Title>
      <Spacer />
      <Button
        variant="ghost"
        leftIcon={<Icon name="filters" />}
        onClick={onOpenFilters}
      >
        {translate.formatMessage({ id: "filters" })}
      </Button>
      <Button leftIcon={<Icon name="plus" />} onClick={onAddCatalog}>
        {translate.formatMessage({ id: "add" })}
      </Button>
    </Stack>
  );
};
