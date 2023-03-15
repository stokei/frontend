import { Stack, Text, Title } from "@stokei/ui";
import { FC } from "react";
import { CoursePageParentCourseInstructorFragment } from "../../graphql/course.query.graphql.generated";

export interface HeaderProps {
  readonly productName?: string;
  readonly instructors?: CoursePageParentCourseInstructorFragment[];
}

export const Header: FC<HeaderProps> = ({ instructors, productName }) => {
  return (
    <Stack direction="column" spacing="4">
      <Title color="white.500">{productName}</Title>
      <Stack direction="row" spacing="2">
        <Text color="white.600">
          {instructors
            ?.map((instructor) => instructor.instructor.fullname)
            .join(", ")}
        </Text>
      </Stack>
    </Stack>
  );
};
