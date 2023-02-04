import { NavbarLogo, NavbarUserInformation } from "@/components";
import { Footer } from "@/components/footer";
import { Box, Navbar } from "@stokei/ui";
import { FC } from "react";

interface CoursePageProps {}

export const CoursePage: FC<CoursePageProps> = () => {
  return (
    <>
      <Navbar>
        <NavbarLogo />
        <NavbarUserInformation />
      </Navbar>
      <Box paddingY="10">Course</Box>
      <Footer />
    </>
  );
};
