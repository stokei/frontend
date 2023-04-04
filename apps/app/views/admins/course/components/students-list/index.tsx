import { SimpleGrid } from "@stokei/ui";
import { FC } from "react";
import { AdminCoursePageCourseStudentFragment } from "../../graphql/course-students.query.graphql.generated";
import { StudentItem } from "../student-item";

interface StudentsListProps {
  students?: AdminCoursePageCourseStudentFragment[];
}

export const StudentsList: FC<StudentsListProps> = ({ students }) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {students?.map((student) => (
        <StudentItem key={student?.id} student={student} />
      ))}
    </SimpleGrid>
  );
};
