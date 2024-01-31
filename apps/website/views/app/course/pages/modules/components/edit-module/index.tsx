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
  useToast,
} from "@stokei/ui";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateModuleMutation } from "../../graphql/update-module.mutation.graphql.generated";
import { AdminCoursePageModuleFragment } from "../../graphql/modules.query.graphql.generated";

interface EditModuleDrawerProps {
  module?: AdminCoursePageModuleFragment;
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess?: (module: AdminCoursePageModuleFragment) => void;
}

export const EditModuleDrawer: FC<EditModuleDrawerProps> = ({
  module,
  onSuccess,
  isOpenDrawer,
  onCloseDrawer,
}) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
  });

  const [{ fetching: isLoadingUpdateModule }, updateModule] =
    useUpdateModuleMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (module) {
      reset({
        name: module?.name || "",
      });
    }
  }, [module, reset]);

  const onSubmit = async ({ name }: z.infer<typeof validationSchema>) => {
    try {
      const response = await updateModule({
        input: {
          data: {
            name,
          },
          where: {
            module: module?.id || "",
          },
        },
      });
      if (!!response?.data?.updateModule) {
        onSuccess?.(response?.data?.updateModule);
        onShowToast({
          title: translate.formatMessage({ id: "moduleUpdatedSuccessfully" }),
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
    <Drawer isOpen={!!isOpenDrawer} onClose={onCloseDrawer}>
      <DrawerHeader>
        {translate.formatMessage({ id: "editModule" })}
      </DrawerHeader>
      <DrawerBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing="5">
            <FormControl isInvalid={!!errors?.name}>
              <Label htmlFor="name">
                {translate.formatMessage({ id: "moduleName" })}
              </Label>
              <InputGroup>
                <Input
                  id="name"
                  type="name"
                  placeholder={translate.formatMessage({
                    id: "moduleNamePlaceholder",
                  })}
                  {...register("name")}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={isLoadingUpdateModule}>
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
