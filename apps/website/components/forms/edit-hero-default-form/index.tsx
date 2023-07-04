import { useAPIErrors, useTranslations } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Label,
  Stack,
  Textarea,
  Title,
  useToast,
} from "@stokei/ui";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEditHeroDefaultFormUpdateHeroMutation } from "./graphql/update-hero.mutation.graphql.generated";

interface EditHeroDefaultFormHero {
  id: string;
  title: string;
  subtitle: string;
}

interface EditHeroDefaultFormProps {
  readonly hero: EditHeroDefaultFormHero;
}

export const EditHeroDefaultForm: FC<EditHeroDefaultFormProps> = ({ hero }) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingUpdateHero }, onExecuteUpdateHero] =
    useEditHeroDefaultFormUpdateHeroMutation();

  const validationSchema = z.object({
    title: z.string().min(1, {
      message: translate.formatMessage({ id: "titleIsRequired" }),
    }),
    subtitle: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (hero) {
      reset({
        title: hero?.title || "",
        subtitle: hero?.subtitle || "",
      });
    }
  }, [hero, reset]);

  const onSubmit = async ({
    title,
    subtitle,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteUpdateHero({
        input: {
          data: {
            title,
            subtitle,
          },
          where: {
            hero: hero?.id || "",
          },
        },
      });
      if (!!response?.data?.updateHero) {
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing="5">
        <Title fontSize="xl">
          {translate.formatMessage({ id: "editHero" })}
        </Title>
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
        <FormControl isInvalid={!!errors?.subtitle}>
          <Label htmlFor="subtitle">
            {translate.formatMessage({ id: "subtitle" })}
          </Label>
          <InputGroup>
            <Textarea
              id="subtitle"
              placeholder={translate.formatMessage({
                id: "subtitle",
              })}
              {...register("subtitle")}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.subtitle?.message}</FormErrorMessage>
        </FormControl>
        <ButtonGroup>
          <Button type="submit" isLoading={isLoadingUpdateHero}>
            {translate.formatMessage({ id: "save" })}
          </Button>
        </ButtonGroup>
      </Stack>
    </Form>
  );
};
