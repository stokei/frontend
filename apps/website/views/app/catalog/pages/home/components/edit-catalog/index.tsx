import { useAPIErrors, useTranslations } from "@/hooks";
import { Section } from "@/views/app/catalog/components/section";
import { SectionContent } from "@/views/app/catalog/components/section-content";
import { SectionInformation } from "@/views/app/catalog/components/section-information";
import { CatalogPageCatalogFragment } from "@/views/app/catalog/graphql/catalog.query.graphql.generated";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Label,
  Stack,
  Title,
  useToast,
} from "@stokei/ui";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAdminCatalogPageUpdateCatalogMutation } from "../../graphql/update-catalog.mutation.graphql.generated";

interface EditCatalogProps {
  catalog?: CatalogPageCatalogFragment;
}

export const EditCatalog: FC<EditCatalogProps> = ({ catalog }) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const validationSchema = z.object({
    title: z.string().min(1, {
      message: translate.formatMessage({ id: "titleIsRequired" }),
    }),
    subtitle: z.string(),
  });

  const [{ fetching: isLoadingCreateCatalog }, updateCatalog] =
    useAdminCatalogPageUpdateCatalogMutation();

  const {
    reset,
    register,
    handleSubmit,
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
      const response = await updateCatalog({
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
    <Section>
      <SectionContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing="5">
            <FormControl isInvalid={!!errors?.title}>
              <Label htmlFor="title">
                {translate.formatMessage({ id: "title" })}
              </Label>
              <InputGroup>
                <Input
                  id="title"
                  type="title"
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
                <Input
                  id="subtitle"
                  type="subtitle"
                  placeholder={translate.formatMessage({
                    id: "subtitle",
                  })}
                  {...register("subtitle")}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.subtitle?.message}</FormErrorMessage>
            </FormControl>
            <Box width="full" justify="flex-end">
              <Button type="submit" isLoading={isLoadingCreateCatalog}>
                {translate.formatMessage({
                  id: "save",
                })}
              </Button>
            </Box>
          </Stack>
        </Form>
      </SectionContent>
    </Section>
  );
};
