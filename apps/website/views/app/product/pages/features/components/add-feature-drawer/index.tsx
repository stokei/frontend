import { useAPIErrors, useTranslations } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useProductPageCreateFeatureMutation } from "../../graphql/create-feature.mutation.graphql.generated";

interface AddFeatureDrawerProps {
  productId?: string;
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess?: () => void;
}

export const AddFeatureDrawer = ({
  productId,
  isOpenDrawer,
  onSuccess,
  onCloseDrawer,
}: AddFeatureDrawerProps) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
    description: z.string().min(1, {
      message: translate.formatMessage({ id: "descriptionIsRequired" }),
    }),
  });

  const [{ fetching: isLoadingCreateFeature }, onExecuteCreateFeature] =
    useProductPageCreateFeatureMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const onClose = () => {
    reset({});
    onCloseDrawer();
  };

  const onSubmit = async ({
    name,
    description,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteCreateFeature({
        input: {
          parent: productId || "",
          name,
          description,
        },
      });
      if (!!response?.data?.createFeature) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });
        onSuccess?.();
        onClose();
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!isOpenDrawer) {
      reset();
    }
  }, [isOpenDrawer, reset]);

  return (
    <Drawer isOpen={!!isOpenDrawer} onClose={onClose}>
      <DrawerHeader>
        {translate.formatMessage({ id: "addFeature" })}
      </DrawerHeader>
      <DrawerBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing="5">
            <FormControl isInvalid={!!errors?.name}>
              <Label htmlFor="name">
                {translate.formatMessage({ id: "name" })}
              </Label>
              <InputGroup>
                <Input
                  id="name"
                  type="name"
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

            <Button
              type="submit"
              isLoading={isLoadingCreateFeature}
              isDisabled={!isValid}
            >
              {translate.formatMessage({
                id: "save",
              })}
            </Button>
          </Stack>
        </Form>
      </DrawerBody>
    </Drawer>
  );
};
