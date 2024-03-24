import { useTranslations } from "@/hooks";
import { Avatar, Stack, Text, Title } from "@stokei/ui";

import { ProductPageCourseInstructorFragment } from "../../graphql/course.query.graphql.generated";

export interface InstructorsProps {
  readonly instructors?: ProductPageCourseInstructorFragment[];
}

export const Instructors = ({ instructors }: InstructorsProps) => {
  const translate = useTranslations();
  return (
    <Stack direction="column" spacing="4">
      <Title size="md" color="primary.500">
        {translate.formatMessage({ id: "instructors" })}
      </Title>
      {instructors?.map(({ id, instructor }) => (
        <Stack key={id} direction="row" spacing="2" align="center">
          <Avatar
            size="sm"
            src={instructor?.avatar?.file?.url || ""}
            name={instructor?.fullname}
          />
          <Text fontWeight="bold">{instructor.fullname}</Text>
        </Stack>
      ))}
    </Stack>
  );
};
