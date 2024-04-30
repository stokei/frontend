import { useAPIErrors, useTranslations } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { PageType } from "@/services/graphql/stokei";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdatePageMutation } from "../../../page/graphql/update-page.mutation.graphql.generated";
import { SitePagesPageFragment } from "../../graphql/pages.query.graphql.generated";

interface UpdatePageDrawerProps {
  page?: SitePagesPageFragment;
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
}

export const UpdatePageDrawer = ({
  page,
  onCloseDrawer,
  isOpenDrawer,
}: UpdatePageDrawerProps) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingUpdatePage }, onExecuteUpdatePageMutation] =
    useUpdatePageMutation();

  const validationSchema = z.object({
    title: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    url: z.string(),
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

  useEffect(() => {
    if (page) {
      reset({
        title: page?.title,
        url: page?.url || ""
      });
    }
  }, [page, reset]);

  const onSubmit = async ({ title, url }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteUpdatePageMutation({
        input: {
          where: {
            page: page?.id || "",
          },
          data: {
            title,
            url
          }
        },
      });
      if (!!response?.data?.updatePage) {
        onShowToast({
          title: translate.formatMessage({ id: "updatedSuccessfully" }),
          status: "success",
        });
        onCloseDrawer();
        return
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
    <Drawer isOpen={!!isOpenDrawer} onClose={onCloseDrawer}>
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
            {page?.type === PageType.External && (
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
                isLoading={isLoadingUpdatePage}
                isDisabled={!isValid}
                type="submit"
              >
                {translate.formatMessage({ id: "save" })}
              </Button>
            </Box>
          </Stack>
        </Form>
      </DrawerBody>
    </Drawer>
  );
};
