import { useAPIErrors, useSite, useTranslations } from "@/hooks";
import { useUploadImage } from "@/hooks/use-upload-image";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Form,
  FormControl,
  FormErrorMessage,
  ImageUploader,
  Input,
  InputGroup,
  InputSlug,
  Label,
  Stack,
  Title,
  useToast
} from "@stokei/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateSiteMutation } from "../../graphql/update-site.mutation.graphql.generated";
import { SiteLayout } from "../../layout";
import { Navbar } from "./components/navbar";

const MetadataPage = () => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { site, onReloadSite } = useSite();

  const [{ fetching: isLoadingUpdateSite }, onExecuteUpdateSite] =
    useUpdateSiteMutation();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    slug: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
  });

  const {
    imageId: logoId,
    isLoadingStartUpload: isLoadingStartLogoUpload,
    onStartUpload: onStartLogoUpload,
    onCompleteUpload: onCompleteLogoUpload,
    uploadURL: logoUploadURL,
  } = useUploadImage();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (site) {
      setValue('name', site?.name || "");
      setValue('slug', site?.slug || "");
    }
  }, [setValue, site]);

  const onSubmit = async ({ name, slug }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteUpdateSite({
        input: {
          where: {
            site: site?.id || ""
          },
          data: {
            name,
            slug,
            logo: logoId,
          },
        },
      });
      if (!!response?.data?.updateSite) {
        await onReloadSite();
        return onShowToast({
          title: translate.formatMessage({ id: "updatedSuccessfully" }),
          status: "success",
        });
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) { }
  };

  return (
    <Container paddingY="5">
      <Card background="background.50">
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing="5">
              <Title fontSize="lg">
                {translate.formatMessage({ id: "informations" })}
              </Title>
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
              <FormControl>
                <Label htmlFor="app-image">
                  {translate.formatMessage({ id: "logo" })}
                </Label>
                {!logoUploadURL && (
                  <Button
                    variant="outline"
                    onClick={onStartLogoUpload}
                    isLoading={isLoadingStartLogoUpload}
                    marginBottom="5"
                  >
                    {translate.formatMessage({ id: "addLogo" })}
                  </Button>
                )}
                <ImageUploader
                  id="app-logo"
                  uploadURL={logoUploadURL}
                  previewURL={site?.logo?.file?.url || ""}
                  onSuccess={onCompleteLogoUpload}
                  onError={() => { }}
                />
              </FormControl>
              <ButtonGroup justifyContent="flex-end">
                <Button type="submit" isLoading={isLoadingUpdateSite}>
                  {translate.formatMessage({ id: "save" })}
                </Button>
              </ButtonGroup>
            </Stack>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

const MetadataPageWithLayout = () => {
  return (
    <SiteLayout>
      <Navbar />
      <MetadataPage />
    </SiteLayout>
  );
};

export { MetadataPageWithLayout as MetadataPage };