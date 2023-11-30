import { useTranslations } from "@/hooks";
import { Button, Icon, Spacer, Stack, Title } from "@stokei/ui";
import { FC } from "react";

interface HeaderProps {
  readonly productsTotalCount: number;
  readonly onOpenFilters: () => void;
}

export const Header: FC<HeaderProps> = ({
  productsTotalCount,
  onOpenFilters,
}) => {
  const translate = useTranslations();

  return (
    <Stack align="center" direction="row" spacing="2">
      <Title fontSize="sm">
        {translate.formatMessage({ id: "total" })}: {productsTotalCount || 0}
      </Title>
      <Spacer />
      <Button leftIcon={<Icon name="filters" />} onClick={onOpenFilters}>
        {translate.formatMessage({ id: "filters" })}
      </Button>
    </Stack>
  );
};
