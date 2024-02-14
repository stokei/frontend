import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputSlug,
  Label,
  Stack,
  Title,
  useToast,
} from "@stokei/ui";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Navbar } from "./components/navbar";
import { useCreateSiteMutation } from "./graphql/create-site.mutation.graphql.generated";
import { AppLayout } from "@/views/app/layout";

interface AddSitePageProps {}

export const AddSitePage: FC<AddSitePageProps> = () => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentApp } = useCurrentApp();

  const [{ fetching: isLoadingCreateSite }, onExecuteCreateSiteMutation] =
    useCreateSiteMutation();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    slug: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async ({ name, slug }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteCreateSiteMutation({
        input: {
          name,
          slug,
          parent: currentApp?.id || "",
        },
      });
      if (!!response?.data?.createSite?.id) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });
        return window.location.assign(
          routes
            .app({ appId: currentApp?.id })
            .site({ site: response?.data?.createSite?.id }).home
        );
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {
      onShowToast({
        title: translate.formatMessage({ id: "sorryAnErrorOccurred" }),
        status: "error",
      });
    }
  };

  return (
    <AppLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack
          width="full"
          direction="column"
          spacing="4"
          align="center"
          justify="center"
        >
          <Title marginBottom="5" textAlign="center" lineHeight="shorter">
            {translate.formatMessage({ id: "addSite" })}
          </Title>
          <Card
            width={["full", "full", "500px", "500px"]}
            background="background.50"
          >
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing="4">
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
                  <FormControl isInvalid={!!errors?.slug}>
                    <Label htmlFor="slug">
                      {translate.formatMessage({ id: "slug" })}
                    </Label>
                    <InputSlug
                      id="slug"
                      type="slug"
                      placeholder={translate.formatMessage({
                        id: "slugPlaceholder",
                      })}
                      {...register("slug")}
                    />
                    <FormErrorMessage>{errors?.slug?.message}</FormErrorMessage>
                  </FormControl>

                  <Box width="full" paddingBottom="4">
                    <Button
                      width="full"
                      isLoading={isLoadingCreateSite}
                      isDisabled={!isValid}
                      type="submit"
                    >
                      {translate.formatMessage({ id: "add" })}
                    </Button>
                  </Box>
                </Stack>
              </Form>
            </CardBody>
          </Card>
        </Stack>
      </Container>
    </AppLayout>
  );
};
