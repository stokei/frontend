import { useTranslations } from "@/hooks";
import { Container, Stack, Text } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { CourseLayout } from "../../layout";
import { Navbar } from "./components/navbar";

interface CourseAddProductPageProps {}

export const CourseAddProductPage: FC<CourseAddProductPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  return (
    <CourseLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          <Text>AddProduct</Text>
        </Stack>
      </Container>
    </CourseLayout>
  );
};
