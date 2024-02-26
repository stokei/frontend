import { Stack, Text, Title } from "@stokei/ui";

import { ProductPageCourseInstructorFragment } from "../../graphql/course.query.graphql.generated";

export interface HeaderProps {
  readonly productName?: string;
  readonly instructors?: ProductPageCourseInstructorFragment[];
}

export const Header = ({ instructors, productName }: HeaderProps) => {
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
