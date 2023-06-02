import { useAPIErrors, useTranslations } from "@/hooks";
import { useUploadImage } from "@/hooks/use-upload-image";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormErrorMessage,
  ImageUploader,
  Input,
  InputGroup,
  Label,
  Stack,
  Text,
  Textarea,
  Title,
  useToast,
} from "@stokei/ui";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductPageProductFragment } from "../../graphql/product.query.graphql.generated";
import { useUpdateProductMutation } from "../../graphql/update-product.mutation.graphql.generated";
import { Section } from "../section";
import { SectionContent } from "../section-content";
import { SectionInformation } from "../section-information";

interface ProductInformationProps {
  currentProduct?: ProductPageProductFragment;
}

export const ProductInformation: FC<ProductInformationProps> = ({
  currentProduct,
}) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
    description: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const {
    imageId,
    isLoadingStartUpload: isLoadingStartImageUpload,
    onStartUpload: onStartImageUpload,
    onCompleteUpload: onCompleteImageUpload,
    uploadURL: imageUploadURL,
  } = useUploadImage();

  const [{ fetching: isLoadingUpdateProduct }, onUpdateProduct] =
    useUpdateProductMutation();

  useEffect(() => {
    if (currentProduct) {
      reset({
        name: currentProduct?.name || "",
        description: currentProduct?.description || "",
      });
    }
  }, [currentProduct, reset]);

  const onSubmit = async ({
    name,
    description,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onUpdateProduct({
        input: {
          data: {
            name,
            description,
            avatar: imageId,
          },
          where: {
            product: currentProduct?.id || "",
          },
        },
      });
      if (!!response?.data?.updateProduct) {
        onShowToast({
          title: translate.formatMessage({ id: "productUpdatedSuccessfully" }),
          status: "success",
        });
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  return (
    <Section>
      <SectionInformation>
        <Stack direction="column" spacing="1">
          <Title fontSize="lg">
            {translate.formatMessage({ id: "product" })}
          </Title>
          <Text fontSize="md">
            {translate.formatMessage({
              id: "fillInYourProductInformationAndStartSellingRightAway",
            })}
          </Text>
        </Stack>
      </SectionInformation>
      <SectionContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing="5">
            <FormControl isInvalid={!!errors?.name}>
              <Label htmlFor="name">
                {translate.formatMessage({ id: "name" })}
              </Label>
              <InputGroup>
                <Input
                  id="name"
                  placeholder={translate.formatMessage({
                    id: "namePlaceholder",
                  })}
                  {...register("name")}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.description}>
              <Label htmlFor="description">
                {translate.formatMessage({ id: "description" })}
              </Label>
              <InputGroup>
                <Textarea
                  id="description"
                  placeholder={translate.formatMessage({
                    id: "descriptionPlaceholder",
                  })}
                  {...register("description")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors?.description?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <Label htmlFor="product-image">
                {translate.formatMessage({ id: "image" })}
              </Label>
              {!imageUploadURL && (
                <Button
                  variant="outline"
                  onClick={onStartImageUpload}
                  isLoading={isLoadingStartImageUpload}
                  marginBottom="5"
                >
                  {translate.formatMessage({ id: "addImage" })}
                </Button>
              )}
              <ImageUploader
                id="product-image"
                uploadURL={imageUploadURL}
                previewURL={currentProduct?.avatar?.file?.url || ""}
                onSuccess={onCompleteImageUpload}
                onError={() => {}}
              />
            </FormControl>
            <ButtonGroup width="full" justifyContent="flex-end">
              <Button
                type="submit"
                isLoading={isLoadingUpdateProduct}
                isDisabled={!isValid}
              >
                {translate.formatMessage({ id: "save" })}
              </Button>
            </ButtonGroup>
          </Stack>
        </Form>
      </SectionContent>
    </Section>
  );
};
