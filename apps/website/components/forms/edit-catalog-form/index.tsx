import { useAPIErrors, useTranslations } from "@/hooks";
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
  Title,
  useToast,
} from "@stokei/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEditCatalogFormUpdateCatalogMutation } from "./graphql/update-catalog.mutation.graphql.generated";

interface EditCatalogFormCatalog {
  id: string;
  title: string;
  subtitle: string;
}

interface EditCatalogFormProps {
  readonly catalog: EditCatalogFormCatalog;
}

export const EditCatalogForm = ({ catalog }: EditCatalogFormProps) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingUpdateCatalog }, onExecuteUpdateCatalog] =
    useEditCatalogFormUpdateCatalogMutation();

  const validationSchema = z.object({
    title: z.string().min(1, {
      message: translate.formatMessage({ id: "titleIsRequired" }),
    }),
    subtitle: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (catalog) {
      reset({
        title: catalog?.title || "",
        subtitle: catalog?.subtitle || "",
      });
    }
  }, [catalog, reset]);

  const onSubmit = async ({
    title,
    subtitle,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteUpdateCatalog({
        input: {
          data: {
            title,
            subtitle,
          },
          where: {
            catalog: catalog?.id || "",
          },
        },
      });
      if (!!response?.data?.updateCatalog) {
        onShowToast({
          title: translate.formatMessage({ id: "updatedSuccessfully" }),
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing="5">
        <Title fontSize="xl">
          {translate.formatMessage({ id: "editCatalog" })}
        </Title>
        <FormControl isInvalid={!!errors?.title}>
          <Label htmlFor="title">
            {translate.formatMessage({ id: "title" })}
          </Label>
          <InputGroup>
            <Input
              id="title"
              placeholder={translate.formatMessage({
                id: "title",
              })}
              {...register("title")}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors?.subtitle}>
          <Label htmlFor="subtitle">
            {translate.formatMessage({ id: "subtitle" })}
          </Label>
          <InputGroup>
            <Textarea
              id="subtitle"
              placeholder={translate.formatMessage({
                id: "subtitle",
              })}
              {...register("subtitle")}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.subtitle?.message}</FormErrorMessage>
        </FormControl>
        <ButtonGroup>
          <Button type="submit" isLoading={isLoadingUpdateCatalog}>
            {translate.formatMessage({ id: "save" })}
          </Button>
        </ButtonGroup>
      </Stack>
    </Form>
  );
};
