import { useTranslations } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Label,
  Stack,
} from "@stokei/ui";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProductFiltersProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly filteredProductQuery?: string;
  readonly onChangeFilteredProductQuery: (value?: string) => void;
}

export const ProductFilters: FC<ProductFiltersProps> = ({
  isOpen,
  onClose,
  filteredProductQuery,
  onChangeFilteredProductQuery,
}) => {
  const translate = useTranslations();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    reset({
      name: filteredProductQuery || "",
    });
  }, [filteredProductQuery, reset]);

  const onSubmit = async ({ name }: z.infer<typeof validationSchema>) => {
    onChangeFilteredProductQuery(name);
    onClose?.();
  };

  const onClean = () => {
    reset({
      name: "",
    });
    onChangeFilteredProductQuery("");
    onClose?.();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader>{translate.formatMessage({ id: "filters" })}</DrawerHeader>
      <Form
        width="full"
        display="flex"
        flexDirection="column"
        flex="auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DrawerBody>
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
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <ButtonGroup>
            <Button variant="ghost" onClick={onClean}>
              {translate.formatMessage({ id: "clear" })}
            </Button>
            <Button type="submit">
              {translate.formatMessage({ id: "save" })}
            </Button>
          </ButtonGroup>
        </DrawerFooter>
      </Form>
    </Drawer>
  );
};