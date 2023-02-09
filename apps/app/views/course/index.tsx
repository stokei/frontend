import { NavbarLogo, NavbarUserInformation } from "@/components";
import { Footer } from "@/components/footer";
import { useTranslations } from "@/hooks";
import { Container, Navbar, Stack, Title } from "@stokei/ui";
import { FC, useMemo } from "react";
import { CheckoutInfo } from "./checkout-info";
import { CourseDescription } from "./course-description";
import { useGetProductCourseQuery } from "./course.query.graphql.generated";
import { Features } from "./features";
import { Header } from "./header";
import { ModulesSection } from "./modules-section";

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
    <>
      <Navbar>
        <NavbarLogo />
        <NavbarUserInformation />
      </Navbar>
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
      <Footer />
    </>
  );
};
