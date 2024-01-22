import { useTranslations } from "@/hooks";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Form,
  FormControl,
  Input,
  InputGroup,
  Label,
  Stack,
} from "@stokei/ui";
import { FC, useEffect } from "react";
import { useFilters } from "../../hooks/use-filters";

interface CouponFiltersProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly codeFilter?: string;
  readonly onChangeCodeFilter: (value: string) => void;
}

export const CouponFilters: FC<CouponFiltersProps> = ({
  isOpen,
  onClose,
  codeFilter,
  onChangeCodeFilter,
}) => {
  const translate = useTranslations();
  const {
    codeFilter: code,
    setCodeFilter: setCode,
    onCleanFilters,
  } = useFilters();

  useEffect(() => {
    console.log({ codeFilter });
    setCode(codeFilter || "");
  }, [codeFilter, setCode]);

  const onSubmit = async () => {
    onChangeCodeFilter(code);
    onClose?.();
  };

  const onClean = () => {
    onCleanFilters();
    onChangeCodeFilter("");
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
        onSubmit={onSubmit}
      >
        <DrawerBody>
          <Stack direction="column" spacing="5">
            <FormControl>
              <Label htmlFor="code">
                {translate.formatMessage({ id: "code" })}
              </Label>
              <InputGroup>
                <Input
                  id="code"
                  placeholder={translate.formatMessage({
                    id: "couponCodePlaceholder",
                  })}
                  defaultValue={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </InputGroup>
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
