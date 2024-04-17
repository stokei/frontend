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
  Palette,
  Stack,
  useColorValue,
} from "@stokei/ui";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "../../../../hooks/use-translations";
import { BlockData } from "../../hooks/use-data-to-props";
import { useEffect, useState } from "react";

interface UpdateBlockDrawerProps {
  currentData?: BlockData;
  isOpen?: boolean;
  onUpdate?: (data?: BlockData) => void;
  onClose: () => void;
}

export const UpdateBlockDrawer = ({
  isOpen,
  currentData,
  onClose,
  onUpdate,
}: UpdateBlockDrawerProps) => {
  const translate = useTranslations();
  const [backgroundColor, setBackgroundColor] = useColorValue({
    defaultColor: currentData?.backgroundColor
  });

  const onSubmit = async () => {
    onUpdate?.({
      backgroundColor
    });
    onClose();
  };

  const onCloseWithReset = () => {
    onClose();
  };

  return (
    <Drawer isOpen={!!isOpen} onClose={onCloseWithReset}>
      <DrawerHeader>
        {translate.formatMessage({ id: "updateComponent" })}
      </DrawerHeader>
      <DrawerBody>
        <Form onSubmit={onSubmit}>
          <Stack spacing="4">
            <FormControl>
              <Label>
                {translate.formatMessage({ id: "backgroundColor" })}
              </Label>
              <InputGroup>
                <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
              </InputGroup>
            </FormControl>
            <Box width="full" paddingBottom="4">
              <Button width="full" type="submit" isDisabled={!backgroundColor}>
                {translate.formatMessage({ id: "save" })}
              </Button>
            </Box>
          </Stack>
        </Form>
      </DrawerBody>
    </Drawer>
  );
};
