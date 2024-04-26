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
  Label,
  Stack
} from "@stokei/ui";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "../../../../hooks/use-translations";
import { FormSignUpData } from "../../hooks/use-data-to-props";

interface UpdateFormSignUpDrawerProps {
  id: string;
  currentData?: FormSignUpData;
  isOpen?: boolean;
  onUpdate?: (data?: FormSignUpData) => void;
  onClose: () => void;
}

export const UpdateFormSignUpDrawer = ({
  id,
  isOpen,
  currentData,
  onClose,
  onUpdate,
}: UpdateFormSignUpDrawerProps) => {
  const translate = useTranslations();

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

  useEffect(() => {
    if (currentData) {
      reset({
        title: currentData?.title || "",
      });
    }
  }, [currentData, reset]);

  const onSubmit = async ({ title }: z.infer<typeof validationSchema>) => {
    onUpdate?.({
      title,
    });
    onClose();
  };

  const onCloseWithReset = () => {
    reset();
    onClose();
  };

  return (
    <Drawer isOpen={!!isOpen} onClose={onCloseWithReset}>
      <DrawerHeader>
        {translate.formatMessage({ id: "updateComponent" })}
      </DrawerHeader>
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
              <Button width="full" isDisabled={!isValid} type="submit">
                {translate.formatMessage({ id: "save" })}
              </Button>
            </Box>
          </Stack>
        </Form>
      </DrawerBody>
    </Drawer>
  );
};
