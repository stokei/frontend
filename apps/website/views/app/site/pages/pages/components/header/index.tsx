import { useTranslations } from "@/hooks";
import { Button, Icon, Spacer, Stack, Title } from "@stokei/ui";

interface HeaderProps {
  readonly totalCount: number;
  readonly onAddPage: () => void;
}

export const Header = ({ totalCount, onAddPage }: HeaderProps) => {
  const translate = useTranslations();
  return (
    <Stack align="center" direction="row" spacing="2">
      <Title fontSize="sm">
        {translate.formatMessage({ id: "total" })}: {totalCount || 0}
      </Title>
      <Spacer />
      <Button leftIcon={<Icon name="plus" />} onClick={onAddPage}>
        {translate.formatMessage({ id: "add" })}
      </Button>
    </Stack>
  );
};
