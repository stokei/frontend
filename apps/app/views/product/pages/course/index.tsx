import { Container, Stack } from "@stokei/ui";
import { useMemo } from "react";
import { CheckoutInfo } from "../../components/checkout-info";
import { CourseDescription } from "./components/course-description";
import { Features } from "./components/features";
import { Header } from "./components/header";
import { Instructors } from "./components/instructors";
import { ModulesList } from "./components/modules-list";
import { useGetProductPageCourseQuery } from "./graphql/course.query.graphql.generated";
import { CourseLayout } from "./layout";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";

interface CoursePageProps {
  readonly product: GeneralProductFragment;
}

export const CoursePage = ({ product }: CoursePageProps) => {
  const [{ data: dataGetCourse, fetching: isLoadingGetCourse }] =
    useGetProductPageCourseQuery({
      pause: !product?.parent,
      variables: {
        course: product?.parent || "",
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
            <ModulesList courseId={product?.parent || ""} />

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
            product={product}
            avatarURL={product?.avatar?.file?.url || ""}
            defaultPrice={product?.defaultPrice}
            prices={product?.prices}
          />
        </Stack>
      </Container>
    </CourseLayout>
  );
};
