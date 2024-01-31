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
  InputPassword,
  Label,
  Stack,
  useToast,
} from "@stokei/ui";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateAccountMutation } from "../../graphql/create-account.mutation.graphql.generated";
import { AppMemberFragment } from "../../graphql/member.fragment.graphql.generated";

interface AddMemberDrawerProps {
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess?: (course: AppMemberFragment) => void;
}

export const AddMemberDrawer: FC<AddMemberDrawerProps> = ({
  onSuccess,
  isOpenDrawer,
  onCloseDrawer,
}) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const validationSchema = z.object({
    firstname: z.string().min(1, {
      message: translate.formatMessage({ id: "firstnameIsRequired" }),
    }),
    lastname: z.string().min(1, {
      message: translate.formatMessage({ id: "lastnameIsRequired" }),
    }),
    email: z
      .string()
      .min(1, { message: translate.formatMessage({ id: "emailIsRequired" }) })
      .email({
        message: translate.formatMessage({ id: "mustBeAValidEmail" }),
      }),
    password: z.string().min(6, {
      message: translate.formatMessage({
        id: "passwordMustBeAtleastSixCharacters",
      }),
    }),
  });

  const [{ fetching: isLoadingCreateAccount }, onExecuteCreateAccount] =
    useCreateAccountMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async ({
    firstname,
    lastname,
    email,
    password,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteCreateAccount({
        input: {
          password,
          firstname,
          lastname,
          email,
        },
      });
      if (!!response?.data?.createAccount) {
        onShowToast({
          title: translate.formatMessage({ id: "memberCreatedSuccessfully" }),
          status: "success",
        });
        onSuccess?.(response?.data?.createAccount);
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
        {translate.formatMessage({ id: "addMember" })}
      </DrawerHeader>
      <DrawerBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing="5">
            <FormControl isInvalid={!!errors?.firstname}>
              <Label htmlFor="firstname">
                {translate.formatMessage({ id: "firstname" })}
              </Label>
              <InputGroup>
                <Input
                  id="firstname"
                  textTransform="capitalize"
                  placeholder={translate.formatMessage({
                    id: "firstnamePlaceholder",
                  })}
                  {...register("firstname")}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.firstname?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.lastname}>
              <Label htmlFor="lastname">
                {translate.formatMessage({ id: "lastname" })}
              </Label>
              <InputGroup>
                <Input
                  id="lastname"
                  textTransform="capitalize"
                  placeholder={translate.formatMessage({
                    id: "lastnamePlaceholder",
                  })}
                  {...register("lastname")}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.lastname?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.email}>
              <Label htmlFor="email">
                {translate.formatMessage({ id: "email" })}
              </Label>
              <InputGroup>
                <Input
                  id="email"
                  type="email"
                  placeholder={translate.formatMessage({
                    id: "emailPlaceholder",
                  })}
                  {...register("email")}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.password}>
              <Label htmlFor="password">
                {translate.formatMessage({ id: "password" })}
              </Label>
              <InputPassword
                id="password"
                placeholder={translate.formatMessage({
                  id: "passwordPlaceholder",
                })}
                {...register("password")}
              />
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={isLoadingCreateAccount}>
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
