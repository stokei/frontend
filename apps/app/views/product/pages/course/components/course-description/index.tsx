import { useTranslations } from "@/hooks";
import { Markdown, Stack, Title } from "@stokei/ui";

export interface CourseDescriptionProps {
  readonly description?: string;
}

export const CourseDescription = ({ description }: CourseDescriptionProps) => {
  const translate = useTranslations();
  return (
    <Stack direction="column" spacing="4">
      <Title size="md" color="primary.500">
        {translate.formatMessage({ id: "description" })}
      </Title>
      <Markdown text={description || ""} />
    </Stack>
  );
};
