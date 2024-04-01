import { useAPIErrors, useCurrentApp, useSite, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { AppLayout } from "@/views/app/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
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
  Title,
  useToast,
} from "@stokei/ui";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreatePageMutation } from "../../graphql/create-page.mutation.graphql.generated";

interface AddPageDrawerProps {
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
}

export const AddPageDrawer = ({
  onCloseDrawer,
  isOpenDrawer,
}: AddPageDrawerProps) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentApp } = useCurrentApp();
  const { siteId } = useSite();

  const [{ fetching: isLoadingCreatePage }, onExecuteCreatePageMutation] =
    useCreatePageMutation();

  const validationSchema = z.object({
    title: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async ({ title }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteCreatePageMutation({
        input: {
          title,
          parent: siteId || "",
        },
      });
      if (!!response?.data?.createPage) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });
        return window.location.assign(
          routes
            .app({ appId: currentApp?.id })
            .site({ site: response?.data?.createPage?.parent })
            .page({ page: response?.data?.createPage?.id }).home
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

  const onClose = () => {
    reset();
    onCloseDrawer();
  };

  return (
    <Drawer isOpen={!!isOpenDrawer} onClose={onClose}>
      <DrawerHeader>{translate.formatMessage({ id: "addPage" })}</DrawerHeader>
      <DrawerBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="4">
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
            <Box width="full" paddingBottom="4">
              <Button
                width="full"
                isLoading={isLoadingCreatePage}
                isDisabled={!isValid}
                type="submit"
              >
                {translate.formatMessage({ id: "add" })}
              </Button>
            </Box>
          </Stack>
        </Form>
      </DrawerBody>
    </Drawer>
  );
};
