import { useTranslations } from "@/hooks";
import { useStoreFilters } from "@/views/store/hooks/use-filters";
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
  Icon,
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
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StoreCatalogFragment } from "../../graphql/catalogs.query.graphql.generated";

interface ProductFiltersProps {
  readonly isOpen: boolean;
  readonly catalogs: StoreCatalogFragment[];
  readonly onClose: () => void;
}

export const ProductFilters = ({
  isOpen,
  catalogs,
  onClose,
}: ProductFiltersProps) => {
  const [catalog, setCatalog] = useState<StoreCatalogFragment | undefined>();
  const translate = useTranslations();
  const { filters, onChangeFilter, onClearFilter } = useStoreFilters();

  const validationSchema = z.object({
    name: z.string(),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const getCatalog = useCallback(
    (catalog: string) => {
      if (!catalog) {
        return;
      }
      const currentCatalog = catalogs?.find(
        (currentItem) => currentItem.id === catalog
      );
      return currentCatalog;
    },
    [catalogs]
  );

  useEffect(() => {
    reset({
      name: filters?.productName || "",
    });
  }, [filters?.productName, reset]);

  useEffect(() => {
    setCatalog(getCatalog(filters?.catalog || ""));
  }, [filters?.catalog, getCatalog]);

  const onSubmit = async ({ name }: z.infer<typeof validationSchema>) => {
    onChangeFilter({
      productName: name,
      catalog: catalog?.id,
    });
    onClose?.();
  };

  const onClean = () => {
    reset({
      name: "",
    });
    setCatalog(undefined);
    onClearFilter();
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
                {translate.formatMessage({ id: "product" })}
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
            <FormControl>
              <Label htmlFor="catalogs">
                {translate.formatMessage({ id: "catalogs" })}
              </Label>
              <SingleSelect
                id="catalogs"
                value={catalog}
                onChange={setCatalog}
              >
                <SingleSelectButton
                  placeholder={translate.formatMessage({ id: "chooseCatalog" })}
                  item={(item) => (
                    <Stack direction="row" spacing="5" align="center">
                      <Icon name="catalog" color="primary.500" />
                      <Text>{item?.title}</Text>
                    </Stack>
                  )}
                />
                <SingleSelectCombobox>
                  <SingleSelectOptions>
                    {catalogs?.map((catalogItem) => (
                      <SingleSelectOption key={catalogItem?.id} value={catalogItem}>
                        <Stack direction="row" spacing="5" align="center">
                          <Icon name="catalog" color="primary.500" />
                          <Text>{catalogItem?.title}</Text>
                        </Stack>
                      </SingleSelectOption>
                    ))}
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
