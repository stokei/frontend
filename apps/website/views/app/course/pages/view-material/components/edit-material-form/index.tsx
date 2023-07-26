import { useAPIErrors, useTranslations } from "@/hooks";
import { useUploadImage } from "@/hooks/use-upload-image";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Form,
  FormControl,
  FormErrorMessage,
  ImageUploader,
  Input,
  InputGroup,
  Label,
  RichTextEditor,
  Stack,
  Title,
  useToast,
} from "@stokei/ui";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CourseMaterialFragment } from "../../../materials/graphql/materials.query.graphql.generated";
import { useUpdateCourseMaterialMutation } from "../../graphql/update-material.mutation.graphql.generated";

interface EditMaterialFormProps {
  material?: CourseMaterialFragment;
}

export const EditMaterialForm: FC<EditMaterialFormProps> = ({ material }) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingUpdateMaterial }, onExecuteUpdateMaterial] =
    useUpdateCourseMaterialMutation();

  const {
    imageId: imageId,
    isLoadingStartUpload: isLoadingStartImageUpload,
    onStartUpload: onStartImageUpload,
    onCompleteUpload: onCompleteImageUpload,
    uploadURL: imageUploadURL,
  } = useUploadImage();

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
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const currentMaterialName = watch("name");

  useEffect(() => {
    register("description", { value: "" });
  }, [register]);

  useEffect(() => {
    if (material) {
      reset({
        name: material?.name,
        description: material?.description || "",
      });
    }
  }, [material, reset]);

  const onSubmit = async ({
    name,
    description,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteUpdateMaterial({
        input: {
          data: {
            name,
            description,
            ...(imageId && { avatar: imageId }),
          },
          where: {
            material: material?.id || "",
          },
        },
      });
      if (!!response?.data?.updateMaterial) {
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
    <Card background="background.50">
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing="5">
            <Title fontSize="xl">{currentMaterialName}</Title>
            <FormControl>
              <Label htmlFor="material-image">
                {translate.formatMessage({ id: "image" })}
              </Label>
              {!imageUploadURL && (
                <Button
                  variant="outline"
                  onClick={onStartImageUpload}
                  isLoading={isLoadingStartImageUpload}
                  marginBottom="5"
                >
                  {translate.formatMessage({
                    id: material?.avatar?.file?.url
                      ? "changeImage"
                      : "addImage",
                  })}
                </Button>
              )}
              <ImageUploader
                id="material-image"
                uploadURL={imageUploadURL}
                previewURL={material?.avatar?.file?.url || ""}
                onSuccess={onCompleteImageUpload}
                onError={() => {}}
              />
            </FormControl>
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
                <RichTextEditor
                  id="description"
                  defaultValue={material?.description || ""}
                  onChange={(value) => setValue("description", value)}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors?.description?.message}
              </FormErrorMessage>
            </FormControl>
            <ButtonGroup>
              <Button
                type="submit"
                isLoading={isLoadingUpdateMaterial}
                isDisabled={!isValid}
              >
                {translate.formatMessage({ id: "save" })}
              </Button>
            </ButtonGroup>
          </Stack>
        </Form>
      </CardBody>
    </Card>
  );
};
