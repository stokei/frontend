import { useAPIErrors, useSite, useTranslations } from "@/hooks";
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

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateDomainMutation } from "../../graphql/create-domain.mutation.graphql.generated";
import { AppDomainFragment } from "../../graphql/domains.query.graphql.generated";

interface AddDomainDrawerProps {
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess?: (domain: AppDomainFragment) => void;
}

export const AddDomainDrawer = ({
  onSuccess,
  isOpenDrawer,
  onCloseDrawer,
}: AddDomainDrawerProps) => {
  const { siteId } = useSite();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
  });

  const [{ fetching: isLoadingCreateDomain }, createDomain] =
    useCreateDomainMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async ({ name }: z.infer<typeof validationSchema>) => {
    try {
      const response = await createDomain({
        input: {
          parent: siteId || "",
          name,
          language: "pt-BR",
        },
      });
      if (!!response?.data?.createDomain) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });
        return onSuccess?.(response?.data?.createDomain);
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) { }
  };

  return (
    <Drawer isOpen={!!isOpenDrawer} onClose={onCloseDrawer}>
      <DrawerHeader>
        {translate.formatMessage({ id: "addDomain" })}
      </DrawerHeader>
      <DrawerBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing="5">
            <FormControl isInvalid={!!errors?.name}>
              <Label htmlFor="name">
                {translate.formatMessage({ id: "name" })}
              </Label>
              <InputGroup>
                <Input
                  id="name"
                  type="name"
                  placeholder={translate.formatMessage({
                    id: "namePlaceholder",
                  })}
                  {...register("name")}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={isLoadingCreateDomain}>
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
