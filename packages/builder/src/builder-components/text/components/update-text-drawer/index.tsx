import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  ColorPicker,
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
  useColorValue,
} from "@stokei/ui";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "../../../../hooks/use-translations";
import { TextData } from "../../hooks/use-data-to-props";
import { useEffect } from "react";

interface UpdateTextDrawerProps {
  currentData?: TextData;
  isOpen?: boolean;
  onUpdate?: (data?: TextData) => void;
  onClose: () => void;
}

export const UpdateTextDrawer = ({
  isOpen,
  currentData,
  onClose,
  onUpdate,
}: UpdateTextDrawerProps) => {
  const translate = useTranslations();

  const [color, setColor] = useColorValue({
    defaultColor: currentData?.color || "text.500"
  });

  const validationSchema = z.object({
    text: z.string().min(1, {
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
        text: currentData?.value || "",
      });
    }
  }, [currentData, reset]);

  const onSubmit = async ({ text }: z.infer<typeof validationSchema>) => {
    onUpdate?.({
      value: text,
      color
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
            <FormControl isInvalid={!!errors?.text}>
              <Label htmlFor="text">
                {translate.formatMessage({ id: "text" })}
              </Label>
              <InputGroup>
                <Input
                  id="text"
                  placeholder={translate.formatMessage({
                    id: "text",
                  })}
                  {...register("text")}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.text?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <Label>
                {translate.formatMessage({ id: "backgroundColor" })}
              </Label>
              <InputGroup>
                <ColorPicker color={color} onChange={setColor} />
              </InputGroup>
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
