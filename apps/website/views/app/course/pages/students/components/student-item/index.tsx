import { Avatar, Card, CardHeader, Stack, Text, Title } from "@stokei/ui";

import { AdminCoursePageCourseStudentFragment } from "../../graphql/course-students.query.graphql.generated";

export interface StudentItemProps {
  readonly student?: AdminCoursePageCourseStudentFragment;
}

export const StudentItem = ({ student }: StudentItemProps) => {
  return (
    <Card background="background.50" overflow="hidden">
      <CardHeader>
        <Stack direction="column" spacing="5" align="center" justify="center">
          <Avatar
            size="lg"
            name={student?.fullname}
            src={student?.avatar?.file?.url || ""}
          />
          <Stack direction="column" spacing="1">
            <Title size="md" textAlign="center">
              {student?.fullname}
            </Title>
            <Text justifyContent="center">{student?.email}</Text>
          </Stack>
        </Stack>
      </CardHeader>
    </Card>
  );
};
