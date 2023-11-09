import { ProductType } from "@/constants/product-type";
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
  IconName,
  Input,
  InputGroup,
  Label,
  Select,
  SelectInput,
  SelectItem,
  SelectList,
  Stack,
  Text,
} from "@stokei/ui";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProductFiltersProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export const ProductFilters: FC<ProductFiltersProps> = ({
  isOpen,
  onClose,
}) => {
  const [productType, setProductType] = useState<ProductType>(ProductType.ALL);
  const translate = useTranslations();
  const { filters, onChangeFilter } = useStoreFilters();

  const validationSchema = z.object({
    name: z.string(),
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
      name: filters?.productName || "",
    });
  }, [filters?.productName, reset]);

  useEffect(() => {
    setProductType(filters?.productType || ProductType.ALL);
  }, [filters?.productType]);

  const onSubmit = async ({ name }: z.infer<typeof validationSchema>) => {
    onChangeFilter({
      productName: name,
      productType,
    });
    onClose?.();
  };

  const onClean = () => {
    reset({
      name: "",
    });
    onChangeFilter({});
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
              <Select
                value={productType}
                onChooseItem={setProductType}
                onRemoveChooseItem={setProductType}
              >
                <SelectInput
                  id="product-type"
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
                <SelectList>
                  <SelectItem value={ProductType.ALL}>
                    <Stack direction="row" spacing="5" align="center">
                      <Icon name="product" color="primary.500" />
                      <Text>{translate.formatMessage({ id: "all" })}</Text>
                    </Stack>
                  </SelectItem>
                  <SelectItem value={ProductType.COURSE}>
                    <Stack direction="row" spacing="5" align="center">
                      <Icon name="course" color="primary.500" />
                      <Text>{translate.formatMessage({ id: "courses" })}</Text>
                    </Stack>
                  </SelectItem>
                  <SelectItem value={ProductType.MATERIAL}>
                    <Stack direction="row" spacing="5" align="center">
                      <Icon name="material" color="primary.500" />
                      <Text>
                        {translate.formatMessage({ id: "materials" })}
                      </Text>
                    </Stack>
                  </SelectItem>
                </SelectList>
              </Select>
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
