import { SelectProducts } from "@/components/select-product";
import { AppProductFragment } from "@/components/select-product/graphql/products.query.graphql.generated";
import { useAPIErrors, useTranslations } from "@/hooks";
import { useRunMultipleRequests } from "@/hooks/use-run-multiple-requests";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  Form,
  Stack,
  useToast,
} from "@stokei/ui";
import { FC, useCallback, useMemo, useState } from "react";
import { useCreateCatalogItemMutation } from "../../graphql/create-catalog-item.mutation.graphql.generated";

interface AddCatalogItemDrawerProps {
  catalogId: string;
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess: () => void;
}

export const AddCatalogItemDrawer: FC<AddCatalogItemDrawerProps> = ({
  catalogId,
  onSuccess,
  isOpenDrawer,
  onCloseDrawer,
}) => {
  const [products, setProducts] = useState<AppProductFragment[]>([]);
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const [, onExecuteCreateCatalogItem] = useCreateCatalogItemMutation();

  const onCreateCatalogItem = useCallback(
    async (productId: string) => {
      const response = await onExecuteCreateCatalogItem({
        input: {
          catalog: catalogId,
          product: productId || "",
        },
      });
      if (!!response?.data?.createCatalogItem) {
        return response?.data?.createCatalogItem;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
      return;
    },
    [catalogId, onExecuteCreateCatalogItem, onShowAPIError]
  );

  const addCatalogItemsHandlers = useMemo(
    () => products?.map((product) => () => onCreateCatalogItem(product.id)),
    [onCreateCatalogItem, products]
  );

  const {
    isLoading: isLoadingCreateCatalogItem,
    onSubmit,
    concludedItems,
    totalItems,
  } = useRunMultipleRequests({
    onSuccess: () => {
      onShowToast({
        title: translate.formatMessage({ id: "createdSuccessfully" }),
        status: "success",
      });
      setProducts([]);
      onCloseDrawer?.();
      onSuccess?.();
    },
    onError: () => {
      setProducts([]);
    },
    handlers: addCatalogItemsHandlers,
  });

  const onChooseCurrentProduct = useCallback((product?: AppProductFragment) => {
    if (product) {
      setProducts((currentProducts) => [...currentProducts, product]);
    }
  }, []);

  const onRemoveCurrentProduct = useCallback((product?: AppProductFragment) => {
    if (product) {
      setProducts((currentProducts) =>
        currentProducts?.filter(
          (currentProduct) => currentProduct.id !== product?.id
        )
      );
    }
  }, []);

  return (
    <Drawer isOpen={!!isOpenDrawer} onClose={onCloseDrawer}>
      <DrawerHeader>
        {translate.formatMessage({ id: "addCatalogItem" })}
      </DrawerHeader>
      <DrawerBody>
        <Form onSubmit={onSubmit}>
          <Stack direction="column" spacing="5">
            <SelectProducts
              currentProducts={products}
              onChooseCurrentProduct={onChooseCurrentProduct}
              onRemoveChooseCurrentProduct={onRemoveCurrentProduct}
            />

            <Button
              type="submit"
              isLoading={isLoadingCreateCatalogItem}
              isDisabled={!products?.length}
              loadingText={`${concludedItems}/${totalItems}`}
            >
              {translate.formatMessage({
                id: "save",
              })}
            </Button>
          </Stack>
        </Form>
      </DrawerBody>
    </Drawer>
  );
};
