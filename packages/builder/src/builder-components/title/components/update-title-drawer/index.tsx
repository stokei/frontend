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
import { TitleData } from "../../hooks/use-data-to-props";
import { useEffect } from "react";

interface UpdateTitleDrawerProps {
  currentData?: TitleData;
  isOpen?: boolean;
  onUpdate?: (data?: TitleData) => void;
  onClose: () => void;
}

export const UpdateTitleDrawer = ({
  isOpen,
  currentData,
  onClose,
  onUpdate,
}: UpdateTitleDrawerProps) => {
  const translate = useTranslations();

  const [color, setColor] = useColorValue({
    defaultColor: currentData?.color || "heading.500"
  });

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
        title: currentData?.value || "",
      });
    }
  }, [currentData, reset]);

  const onSubmit = async ({ title }: z.infer<typeof validationSchema>) => {
    onUpdate?.({
      value: title,
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
