import { NavbarLogo, NavbarUserInformation } from "@/components";
import { Footer } from "@/components/footer";
import { useTranslations } from "@/hooks";
import { Container, Navbar, Title } from "@stokei/ui";
import { FC, useMemo } from "react";
import { useGetProductCourseQuery } from "./course.query.graphql.generated";
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
      <Container paddingY="10">
        <Title>{product?.name}</Title>
      </Container>
      <ModulesSection courseId={product?.course?.id} />
      <Footer />
    </>
  );
};
