import { useTranslations } from "@/hooks";
import { Markdown, Stack, Title } from "@stokei/ui";

export interface GenericProductDescriptionProps {
  readonly description?: string;
}

export const GenericProductDescription = ({
  description,
}: GenericProductDescriptionProps) => {
  const translate = useTranslations();
  return (
    <Stack direction="column" spacing="4">
      <Title size="md">{translate.formatMessage({ id: "description" })}</Title>
      <Markdown text={description || ""} />
    </Stack>
  );
};
