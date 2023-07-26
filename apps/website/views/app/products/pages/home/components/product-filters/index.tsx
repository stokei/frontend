import { SelectProducts } from "@/components/select-product";
import { useTranslations } from "@/hooks";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Stack,
} from "@stokei/ui";
import { FC } from "react";
import { AdminProductPageProductFragment } from "../../graphql/products.query.graphql.generated";

interface ProductFiltersProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly currentProducts?: AdminProductPageProductFragment[];
  readonly onChooseCurrentProduct: (
    value?: AdminProductPageProductFragment
  ) => void;
  readonly onRemoveChooseCurrentProduct: (
    value?: AdminProductPageProductFragment
  ) => void;
  readonly onResetCurrentProducts: () => void;
}

export const ProductFilters: FC<ProductFiltersProps> = ({
  isOpen,
  onClose,
  currentProducts,
  onChooseCurrentProduct,
  onRemoveChooseCurrentProduct,
  onResetCurrentProducts,
}) => {
  const translate = useTranslations();

  const onClean = () => {
    onResetCurrentProducts();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader>
        {translate.formatMessage({ id: "addSubscription" })}
      </DrawerHeader>
      <DrawerBody>
        <Stack direction="column" spacing="5">
          <SelectProducts
            currentProducts={currentProducts}
            onChooseCurrentProduct={onChooseCurrentProduct}
            onRemoveChooseCurrentProduct={onRemoveChooseCurrentProduct}
          />
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <ButtonGroup>
          <Button variant="ghost" onClick={onClean}>
            {translate.formatMessage({ id: "clear" })}
          </Button>
        </ButtonGroup>
      </DrawerFooter>
    </Drawer>
  );
};
