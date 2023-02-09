import { NavbarLogo, NavbarUserInformation } from "@/components";
import { Footer } from "@/components/footer";
import { useCreateVideoUploadURL, useTranslations } from "@/hooks";
import {
  Button,
  Container,
  Navbar,
  Stack,
  useDisclosure,
  VideoUploader,
} from "@stokei/ui";
import { FC, useMemo, useState } from "react";
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
  const [uploadURL, setUploadURL] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [{ data: dataGetProduct, fetching: isLoadingGetProduct }] =
    useGetProductCourseQuery({
      variables: {
        product: productId,
      },
    });

  const product = useMemo(() => dataGetProduct?.product, [dataGetProduct]);

  const [{ fetching: isLoadingCreateUploadURL }, executeCreateUploadURL] =
    useCreateVideoUploadURL();

  const onStartUpload = async () => {
    try {
      const data = await executeCreateUploadURL({});
      if (data.data?.response) {
        setUploadURL(data.data?.response.uploadURL || "");
        onOpen();
      }
    } catch (e) {}
  };

  return (
    <>
      <Navbar>
        <NavbarLogo />
        <NavbarUserInformation />
      </Navbar>
      <Button isLoading={isLoadingCreateUploadURL} onClick={onStartUpload}>
        Upload start
      </Button>
      <VideoUploader
        id="uploader"
        isOpen={isOpen}
        uploadURL={uploadURL}
        onClose={onClose}
        onError={() => console.log({ error: "ALGUM ERRO" })}
        onSuccess={() => console.log({ OK: true })}
      />
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
