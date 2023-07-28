import { Container, Stack } from "@stokei/ui";
import { FC, useMemo } from "react";
import { ProductPageProductFragment } from "../graphql/product.query.graphql.generated";
import { CheckoutInfo } from "./components/checkout-info";
import { CourseDescription } from "./components/course-description";
import { Features } from "./components/features";
import { Header } from "./components/header";
import { Instructors } from "./components/instructors";
import { ModulesList } from "./components/modules-list";
import { useGetProductPageCourseQuery } from "./graphql/course.query.graphql.generated";
import { CourseLayout } from "./layout";

interface CoursePageProps {
  readonly product: ProductPageProductFragment;
}

export const CoursePage: FC<CoursePageProps> = ({ product }) => {
  const [{ data: dataGetCourse, fetching: isLoadingGetCourse }] =
    useGetProductPageCourseQuery({
      pause: !product?.parentId,
      variables: {
        course: product?.parentId || "",
      },
    });

  const course = useMemo(() => dataGetCourse?.course, [dataGetCourse]);

  return (
    <CourseLayout isLoading={isLoadingGetCourse}>
      <Container paddingY="10" background="black.500">
        <Header
          instructors={course?.instructors?.items || []}
          productName={product?.name}
        />
      </Container>
      <Container paddingY="10">
        <Stack
          spacing="10"
          direction={["column-reverse", "column-reverse", "row", "row"]}
        >
          <Stack spacing="10" direction="column" width="auto" flex="1">
            <ModulesList courseId={product?.parentId || ""} />

            {!!product?.features?.totalCount && (
              <Features features={product?.features} />
            )}

            {product?.description && (
              <CourseDescription description={product?.description} />
            )}

            {!!course?.instructors?.items?.length && (
              <Instructors instructors={course?.instructors?.items} />
            )}
          </Stack>

          <CheckoutInfo
            avatarURL={product?.avatar?.file?.url || ""}
            productId={product?.id}
            defaultPrice={product?.defaultPrice}
          />
        </Stack>
      </Container>
    </CourseLayout>
  );
};
