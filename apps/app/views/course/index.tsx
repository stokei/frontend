import { useTranslations } from "@/hooks";
import { Container, Stack } from "@stokei/ui";
import { FC, useMemo } from "react";
import { CheckoutInfo } from "./components/checkout-info";
import { CourseDescription } from "./components/course-description";
import { Features } from "./components/features";
import { Header } from "./components/header";
import { ModulesSection } from "./components/modules-section";
import { useGetProductCourseQuery } from "./graphql/course.query.graphql.generated";
import { CourseLayout } from "./layout";

interface CoursePageProps {
  readonly productId: string;
}

export const CoursePage: FC<CoursePageProps> = ({ productId }) => {
  const translate = useTranslations();

  const [{ data: dataGetProduct, fetching: isLoadingGetProduct }] =
    useGetProductCourseQuery({
      variables: {
        product: productId,
      },
    });

  const product = useMemo(() => dataGetProduct?.product, [dataGetProduct]);

  return (
    <CourseLayout isLoading={isLoadingGetProduct}>
      <Container paddingY="10" background="black.500">
        <Header product={product} />
      </Container>
      <Container paddingY="10">
        <Stack
          spacing="10"
          direction={["column-reverse", "column-reverse", "row", "row"]}
        >
          <Stack spacing="10" direction="column">
            <ModulesSection courseId={product?.course?.id} />

            {!!product?.features?.totalCount && (
              <Features features={product?.features} />
            )}

            {product?.description && (
              <CourseDescription description={product?.description} />
            )}
          </Stack>

          <CheckoutInfo product={product} />
        </Stack>
      </Container>
    </CourseLayout>
  );
};
