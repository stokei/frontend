import { useTranslations } from "@/hooks";
import { Markdown, Stack, Title } from "@stokei/ui";
import { FC } from "react";

export interface GenericProductDescriptionProps {
  readonly description?: string;
}

export const GenericProductDescription: FC<GenericProductDescriptionProps> = ({
  description,
}) => {
  const translate = useTranslations();
  return (
    <Stack direction="column" spacing="4">
      <Title size="md">{translate.formatMessage({ id: "description" })}</Title>
      <Markdown text={description || ""} />
    </Stack>
  );
};
