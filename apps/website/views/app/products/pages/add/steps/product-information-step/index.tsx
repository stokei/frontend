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
import { ProductExternalReference } from "../../@types/product-external-reference";
import { ProductPayload } from "../../@types/product-payload";

interface ProductInformationStepProps {
  productExternalReference?: ProductExternalReference;
  onChangeProductPayload: (productPayload: ProductPayload) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const ProductInformationStep = ({
  productExternalReference,
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
    register("description", { value: productExternalReference?.description });
  }, [productExternalReference?.description, register]);

  useEffect(() => {
    if (productExternalReference) {
      reset({
        name: productExternalReference?.name || "",
        description: productExternalReference?.description || "",
      });
      if (productExternalReference?.name || productExternalReference?.description) {
        onChangeProductPayload({
          name: productExternalReference?.name || "",
          description: productExternalReference?.description || "",
        });
      }
    }
  }, [onChangeProductPayload, productExternalReference, reset]);

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
              defaultValue={productExternalReference?.description}
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
