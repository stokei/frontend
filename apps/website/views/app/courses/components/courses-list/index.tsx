import { SimpleGrid } from "@stokei/ui";

import { AppCourseFragment } from "../../graphql/course.fragment.graphql.generated";
import { CourseItem } from "../course-item";

interface CoursesListProps {
  courses?: AppCourseFragment[];
}

export const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {courses?.map((course) => (
        <CourseItem key={course?.id} course={course} />
      ))}
    </SimpleGrid>
  );
};
