import {
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  SimpleGrid,
} from "@stokei/ui";
import { FC } from "react";
import { AdminCoursePageCourseStudentFragment } from "../../graphql/course-students.query.graphql.generated";
import { StudentItem } from "../student-item";
import { useTranslations } from "@/hooks";

interface StudentsListProps {
  students?: AdminCoursePageCourseStudentFragment[];
}

export const StudentsList: FC<StudentsListProps> = ({ students }) => {
  const translate = useTranslations();
  return (
    <>
      {!students?.length ? (
        <NotFound>
          <NotFoundIcon name="user" />
          <NotFoundSubtitle>
            {translate.formatMessage({ id: "courseStudentsNotFound" })}
          </NotFoundSubtitle>
        </NotFound>
      ) : (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
          {students?.map((student) => (
            <StudentItem key={student?.id} student={student} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
