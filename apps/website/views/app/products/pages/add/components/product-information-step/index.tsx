import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Label,
  Stack,
  Textarea,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductParent } from "../../@types/product-parent";
import { useCreateProductMutation } from "../../graphql/create-product.mutation.graphql.generated";

interface ProductInformationStepProps {
  productParent?: ProductParent;
  onPreviousStep: () => void;
}

export const ProductInformationStep: FC<ProductInformationStepProps> = ({
  productParent,
  onPreviousStep,
}) => {
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentApp } = useCurrentApp();

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

  const [{ fetching: isLoadingCreateProduct }, onCreateProduct] =
    useCreateProductMutation();

  useEffect(() => {
    if (productParent) {
      reset({
        name: productParent?.name || "",
      });
    }
  }, [productParent, reset]);

  const onSubmit = async ({
    name,
    description,
  }: z.infer<typeof validationSchema>) => {
    try {
      const parent = productParent?.id || currentApp?.id;
      const response = await onCreateProduct({
        input: {
          parent: parent || "",
          name,
          description,
        },
      });
      if (!!response?.data?.createProduct) {
        onShowToast({
          title: translate.formatMessage({ id: "productCreatedSuccessfully" }),
          status: "success",
        });
        router.push(
          routes
            .app({ appId: currentApp?.id })
            .product({ product: response.data.createProduct.id }).home
        );
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
          <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
        </FormControl>
        <ButtonGroup width="full" justifyContent="space-between">
          <Button variant="ghost" onClick={onPreviousStep}>
            {translate.formatMessage({ id: "previous" })}
          </Button>
          <Button
            type="submit"
            isLoading={isLoadingCreateProduct}
            isDisabled={!isValid}
          >
            {translate.formatMessage({ id: "next" })}
          </Button>
        </ButtonGroup>
      </Stack>
    </Form>
  );
};
