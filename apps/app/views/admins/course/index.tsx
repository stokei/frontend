import { useTranslations } from "@/hooks";
import { CourseLayout } from "./layout";
import { Box } from "@stokei/ui";
import { FC } from "react";
import { Navbar } from "./components/navbar";

interface CoursePageProps {}

export const CoursePage: FC<CoursePageProps> = () => {
  const translate = useTranslations();

  return (
    <CourseLayout>
      <Navbar />
      <Box width="full" flexDirection="row">
        COURSE
      </Box>
    </CourseLayout>
  );
};
