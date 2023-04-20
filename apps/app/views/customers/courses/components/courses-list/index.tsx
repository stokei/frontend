import { SimpleGrid } from "@stokei/ui";
import { FC } from "react";
import { CustomersCoursePageCourseStudentFragment } from "../../graphql/courses.query.graphql.generated";
import { CourseItem } from "../course-item";

interface CoursesListProps {
  courses?: CustomersCoursePageCourseStudentFragment[];
}

export const CoursesList: FC<CoursesListProps> = ({ courses }) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {courses?.map((course) => (
        <CourseItem key={course?.id} course={course?.course || undefined} />
      ))}
    </SimpleGrid>
  );
};
