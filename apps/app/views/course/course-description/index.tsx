import { useTranslations } from "@/hooks";
import { Box, Description, Stack, Title } from "@stokei/ui";
import { FC } from "react";
import { GetProductCourseQuery } from "../course.query.graphql.generated";

export interface CourseDescriptionProps {
  readonly description?: GetProductCourseQuery["product"]["description"] | null;
}

export const CourseDescription: FC<CourseDescriptionProps> = ({
  description,
}) => {
  const translate = useTranslations();
  return (
    <Stack direction="column" spacing="4">
      <Title size="md">{translate.formatMessage({ id: "description" })}</Title>
      <Description>{description}</Description>
    </Stack>
  );
};
