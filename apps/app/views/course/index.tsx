import { Container, Stack } from "@stokei/ui";
import { FC, useMemo } from "react";
import { CheckoutInfo } from "./components/checkout-info";
import { CourseDescription } from "./components/course-description";
import { Features } from "./components/features";
import { Header } from "./components/header";
import { ModulesList } from "./components/modules-list";
import { useGetProductCourseQuery } from "./graphql/course.query.graphql.generated";
import { CourseLayout } from "./layout";

interface CoursePageProps {
  readonly productId: string;
}

export const CoursePage: FC<CoursePageProps> = ({ productId }) => {
  const [{ data: dataGetProduct, fetching: isLoadingGetProduct }] =
    useGetProductCourseQuery({
      variables: {
        product: productId,
      },
    });

  const product = useMemo(() => dataGetProduct?.product, [dataGetProduct]);
  const course = useMemo(
    () => (product?.parent?.__typename === "Course" ? product?.parent : null),
    [dataGetProduct]
  );

  return (
    <CourseLayout isLoading={isLoadingGetProduct}>
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
            <ModulesList courseId={course?.courseId} />

            {!!product?.features?.totalCount && (
              <Features features={product?.features} />
            )}

            {product?.description && (
              <CourseDescription description={product?.description} />
            )}
          </Stack>

          <CheckoutInfo
            avatarURL={product?.avatar?.file?.url || ""}
            productId={product?.id}
            defaultPrice={product?.defaultPrice}
            features={product?.features}
          />
        </Stack>
      </Container>
    </CourseLayout>
  );
};
