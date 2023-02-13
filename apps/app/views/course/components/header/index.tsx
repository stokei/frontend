import { Stack, Text, Title } from "@stokei/ui";
import { FC } from "react";
import { GetProductCourseQuery } from "../../graphql/course.query.graphql.generated";

export interface HeaderProps {
  readonly product?: GetProductCourseQuery["product"] | null;
}

export const Header: FC<HeaderProps> = ({ product }) => {
  return (
    <Stack direction="column" spacing="4">
      <Title color="white.500">{product?.name}</Title>
      <Stack direction="row" spacing="2">
        <Text color="white.600">
          {product?.course?.instructors?.items
            ?.map((instructor) => instructor.instructor.fullname)
            .join(", ")}
        </Text>
      </Stack>
    </Stack>
  );
};
