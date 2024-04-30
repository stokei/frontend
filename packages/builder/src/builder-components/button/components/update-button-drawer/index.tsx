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
import { SelectPage } from "../../../../components/select-page";
import { useBuilder, useGetPage, useSelectPageValue } from "../../../../hooks";
import { useTranslations } from "../../../../hooks/use-translations";
import { ButtonData } from "../../hooks/use-data-to-props";

interface UpdateButtonDrawerProps {
  currentData?: ButtonData;
  isOpen?: boolean;
  onUpdate?: (data?: ButtonData) => void;
  onClose: () => void;
}

export const UpdateButtonDrawer = ({
  isOpen,
  currentData,
  onClose,
  onUpdate,
}: UpdateButtonDrawerProps) => {
  const translate = useTranslations();
  const { page: currentPageData } = useGetPage({
    link: currentData?.link,
    pageId: currentData?.pageId,
  });
  const [page, setPage] = useSelectPageValue({ defaultValue: currentPageData });

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
        text: currentData?.text || "",
      });
    }
  }, [currentData, reset]);

  const onSubmit = async ({ text }: z.infer<typeof validationSchema>) => {
    onUpdate?.({
      text,
      pageId: page?.id
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
            <SelectPage
              value={page}
              onChoose={setPage}
              onRemoveChoose={setPage}
            />
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
