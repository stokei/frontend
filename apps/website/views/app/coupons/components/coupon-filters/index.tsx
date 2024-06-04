import { useTranslations } from "@/hooks";
import {
  Button,
  ButtonGroup,
  Circle,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Form,
  FormControl,
  Input,
  InputGroup,
  Label,
  SingleSelect,
  SingleSelectButton,
  SingleSelectCombobox,
  SingleSelectOption,
  SingleSelectOptions,
  Stack,
  Text
} from "@stokei/ui";
import { useEffect } from "react";
import { useFilters } from "../../hooks/use-filters";

interface CouponFiltersProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly codeFilter?: string;
  readonly onChangeCodeFilter: (value: string) => void;
  readonly activeFilter?: boolean;
  readonly onChangeActiveFilter: (value?: boolean) => void;
}

export const CouponFilters = ({
  isOpen,
  codeFilter,
  activeFilter,
  onClose,
  onChangeCodeFilter,
  onChangeActiveFilter,
}: CouponFiltersProps) => {
  const translate = useTranslations();
  const {
    codeFilter: code,
    setCodeFilter: setCode,
    activeFilter: active,
    setActiveFilter: setActive,
    onCleanFilters,
  } = useFilters();

  useEffect(() => {
    setCode(codeFilter || "");
  }, [codeFilter, setCode]);

  useEffect(() => {
    setActive(activeFilter);
  }, [activeFilter, setActive]);

  const onSubmit = async () => {
    onChangeCodeFilter(code);
    onChangeActiveFilter(active);
    onClose?.();
  };

  const onClean = () => {
    onCleanFilters();
    onChangeCodeFilter("");
    onChangeActiveFilter(undefined);
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
            <FormControl>
              <Label htmlFor="status">
                {translate.formatMessage({ id: "status" })}
              </Label>
              <SingleSelect
                id="status"
                value={active}
                onChange={setActive}
              >
                <SingleSelectButton
                  placeholder={translate.formatMessage({ id: "status" })}
                  item={(item) => (
                    <Stack direction="row" spacing="2" align="center">
                      <Circle
                        size="2"
                        background={!!item ? "green.500" : "gray.500"}
                      />
                      <Text>
                        {translate.formatMessage({
                          id: !!item ? "active" : "inactive",
                        })}
                      </Text>
                    </Stack>
                  )}
                />
                <SingleSelectCombobox>
                  <SingleSelectOptions>
                    <SingleSelectOption value={true}>
                      <Stack direction="row" spacing="2" align="center">
                        <Circle size="2" background="green.500" />
                        <Text>
                          {translate.formatMessage({
                            id: "active",
                          })}
                        </Text>
                      </Stack>
                    </SingleSelectOption>
                    <SingleSelectOption value={false}>
                      <Stack direction="row" spacing="2" align="center">
                        <Circle size="2" background="gray.500" />
                        <Text>
                          {translate.formatMessage({
                            id: "inactive",
                          })}
                        </Text>
                      </Stack>
                    </SingleSelectOption>
                  </SingleSelectOptions>
                </SingleSelectCombobox>
              </SingleSelect>
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
