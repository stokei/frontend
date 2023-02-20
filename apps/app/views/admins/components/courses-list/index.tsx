import { useTranslations } from "@/hooks";
import { SimpleGrid } from "@stokei/ui";
import { FC } from "react";
import { AdminsCourseFragment } from "../../graphql/course.fragment.graphql.generated";
import { CourseItem } from "../course-item";

interface CoursesListProps {
  courses?: AdminsCourseFragment[];
}

export const CoursesList: FC<CoursesListProps> = ({ courses }) => {
  const translate = useTranslations();

  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {courses?.map((course) => (
        <CourseItem key={course?.id} course={course} />
      ))}
    </SimpleGrid>
  );
};
