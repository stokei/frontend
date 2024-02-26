import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
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
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAdminCatalogsPageCreateCatalogMutation } from "../../graphql/create-catalog.mutation.graphql.generated";

interface AddCatalogDrawerProps {
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
}

export const AddCatalogDrawer = ({
  isOpenDrawer,
  onCloseDrawer,
}: AddCatalogDrawerProps) => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const validationSchema = z.object({
    title: z.string().min(1, {
      message: translate.formatMessage({ id: "titleIsRequired" }),
    }),
    subtitle: z.string(),
  });

  const [{ fetching: isLoadingCreateCatalog }, createCatalog] =
    useAdminCatalogsPageCreateCatalogMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async ({
    title,
    subtitle,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await createCatalog({
        input: {
          parent: currentApp?.id || "",
          title,
          subtitle,
        },
      });
      if (!!response?.data?.createCatalog) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });
        router.push(
          routes.app({ appId: currentApp?.id }).catalog({
            catalog: response?.data?.createCatalog?.id,
          }).home
        );
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
        {translate.formatMessage({ id: "addCatalog" })}
      </DrawerHeader>
      <DrawerBody>
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
            <Button type="submit" isLoading={isLoadingCreateCatalog}>
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
