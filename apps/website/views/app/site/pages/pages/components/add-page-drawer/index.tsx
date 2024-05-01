import { useAPIErrors, useCurrentApp, useSite, useTranslations } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { websiteRoutes } from "@stokei/routes";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputURL,
  Label,
  Stack,
  useToast
} from "@stokei/ui";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreatePageMutation } from "../../graphql/create-page.mutation.graphql.generated";
import { useState } from "react";
import { PageType } from "@/services/graphql/stokei";
import { SelectPageType } from "@/views/app/site/components/select-page-type";

interface AddPageDrawerProps {
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess: () => void;
}

export const AddPageDrawer = ({
  onSuccess,
  onCloseDrawer,
  isOpenDrawer,
}: AddPageDrawerProps) => {
  const [pageType, setPageType] = useState<PageType>(PageType.Default);
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
    url: z.string().optional(),
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

  const onClose = () => {
    reset();
    onCloseDrawer();
  };

  const onSubmit = async ({ title, url }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteCreatePageMutation({
        input: {
          title,
          parent: siteId || "",
          type: pageType,
          url
        },
      });
      if (!!response?.data?.createPage) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });
        if (pageType !== PageType.External) {
          onSuccess?.();
          return window.location.assign(
            websiteRoutes
              .app({ appId: currentApp?.id })
              .site({ site: response?.data?.createPage?.parent })
              .page({ page: response?.data?.createPage?.id }).home
          );
        }
        onClose();
        return onSuccess?.();
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {
      onShowAPIError({ message: "sorryAnErrorOccurred" });
    }
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
            <FormControl isInvalid={!pageType}>
              <Label htmlFor="page-type">
                {translate.formatMessage({ id: "type" })}
              </Label>
              <SelectPageType
                id="page-type"
                value={pageType}
                onChange={setPageType}
              />
              <FormErrorMessage>{errors?.url?.message}</FormErrorMessage>
            </FormControl>
            {pageType === PageType.External && (
              <FormControl isInvalid={!!errors?.url}>
                <Label htmlFor="url">
                  {translate.formatMessage({ id: "link" })}
                </Label>
                <InputGroup>
                  <InputURL
                    id="url"
                    placeholder={translate.formatMessage({
                      id: "linkPlaceholder",
                    })}
                    {...register("url")}
                  />
                </InputGroup>
                <FormErrorMessage>{errors?.url?.message}</FormErrorMessage>
              </FormControl>
            )}
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
