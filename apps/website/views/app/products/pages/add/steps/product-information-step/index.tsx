import { useTranslations } from "@/hooks";
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
  RichTextEditor,
  Stack,
} from "@stokei/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductParent } from "../../@types/product-parent";
import { ProductPayload } from "../../@types/product-payload";

interface ProductInformationStepProps {
  productParent?: ProductParent;
  onChangeProductPayload: (productPayload: ProductPayload) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const ProductInformationStep = ({
  productParent,
  onChangeProductPayload,
  onPreviousStep,
  onNextStep,
}: ProductInformationStepProps) => {
  const translate = useTranslations();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    description: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    register("description", { value: productParent?.description });
  }, [productParent?.description, register]);

  useEffect(() => {
    if (productParent) {
      reset({
        name: productParent?.name || "",
        description: productParent?.description || "",
      });
      if (productParent?.name || productParent?.description) {
        onChangeProductPayload({
          name: productParent?.name || "",
          description: productParent?.description || "",
        });
      }
    }
  }, [onChangeProductPayload, productParent, reset]);

  const onSuccess = (data: z.infer<typeof validationSchema>) => {
    onChangeProductPayload(data);
    onNextStep();
  };

  return (
    <Form onSubmit={handleSubmit(onSuccess)}>
      <Stack direction="column" spacing="5">
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
              defaultValue={productParent?.description}
              onChange={(value) => setValue("description", value)}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
        </FormControl>
        <ButtonGroup width="full" justifyContent="space-between">
          <Button variant="ghost" onClick={onPreviousStep}>
            {translate.formatMessage({ id: "previous" })}
          </Button>
          <Button type="submit" isDisabled={!isValid}>
            {translate.formatMessage({ id: "next" })}
          </Button>
        </ButtonGroup>
      </Stack>
    </Form>
  );
};
