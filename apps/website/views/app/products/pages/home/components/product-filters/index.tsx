import { ProductType } from "@/constants/product-type";
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
  Icon,
  IconName,
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProductFiltersProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly filteredProductQuery?: string;
  readonly onChangeFilteredProductQuery: (value?: string) => void;
  readonly currentProductType: ProductType;
  readonly onChangeCurrentProductType: (value: ProductType) => void;
}

export const ProductFilters = ({
  isOpen,
  onClose,
  filteredProductQuery,
  onChangeFilteredProductQuery,
  currentProductType,
  onChangeCurrentProductType,
}: ProductFiltersProps) => {
  const [productType, setProductType] = useState<ProductType>(ProductType.ALL);
  const translate = useTranslations();

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

  useEffect(() => {
    reset({
      name: filteredProductQuery || "",
    });
  }, [filteredProductQuery, reset]);

  useEffect(() => {
    setProductType(currentProductType);
  }, [currentProductType]);

  const onSubmit = async ({ name }: z.infer<typeof validationSchema>) => {
    onChangeCurrentProductType(productType);
    onChangeFilteredProductQuery(name);
    onClose?.();
  };

  const onClean = () => {
    reset({
      name: "",
    });
    onChangeFilteredProductQuery("");
    onChangeCurrentProductType(ProductType.ALL);
    onClose?.();
  };

  const getProductTypeText = (item: ProductType) => {
    const items: Record<ProductType, { text: string; iconName: IconName }> = {
      [ProductType.ALL]: {
        text: translate.formatMessage({ id: "all" }),
        iconName: "product",
      },
      [ProductType.OTHER]: {
        text: translate.formatMessage({ id: "other" }),
        iconName: "product",
      },
      [ProductType.COURSE]: {
        text: translate.formatMessage({ id: "courses" }),
        iconName: "course",
      },
      [ProductType.MATERIAL]: {
        text: translate.formatMessage({
          id: "materials",
        }),
        iconName: "material",
      },
    };

    return items[item];
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
            <FormControl>
              <Label htmlFor="product-type">
                {translate.formatMessage({ id: "productType" })}
              </Label>
              <SingleSelect
                id="product-type"
                value={productType}
                onChange={setProductType}
              >
                <SingleSelectButton
                  placeholder={translate.formatMessage({ id: "productType" })}
                  item={(item) => {
                    const itemData = getProductTypeText(item);
                    return (
                      <Stack direction="row" spacing="5" align="center">
                        <Icon name={itemData.iconName} color="primary.500" />
                        <Text>{itemData.text}</Text>
                      </Stack>
                    );
                  }}
                />
                <SingleSelectCombobox>
                  <SingleSelectOptions>
                    <SingleSelectOption value={ProductType.ALL}>
                      <Stack direction="row" spacing="5" align="center">
                        <Icon name="product" color="primary.500" />
                        <Text>{translate.formatMessage({ id: "all" })}</Text>
                      </Stack>
                    </SingleSelectOption>
                    <SingleSelectOption value={ProductType.COURSE}>
                      <Stack direction="row" spacing="5" align="center">
                        <Icon name="course" color="primary.500" />
                        <Text>{translate.formatMessage({ id: "courses" })}</Text>
                      </Stack>
                    </SingleSelectOption>
                    <SingleSelectOption value={ProductType.MATERIAL}>
                      <Stack direction="row" spacing="5" align="center">
                        <Icon name="material" color="primary.500" />
                        <Text>
                          {translate.formatMessage({ id: "materials" })}
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
