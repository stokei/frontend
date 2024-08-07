import { PriceComponentFragment } from "../../components/price/price.fragment.graphql.generated";
import { useTranslations } from "../../hooks";
import { useDisclosure, usePersistedState, useToast } from "@stokei/ui";
import { createContext, PropsWithChildren, useCallback, useMemo } from "react";

export interface ShoppingCartProviderProps {}

export interface ShoppingCartItemProduct {
  id: string;
  name: string;
  avatarURL?: string;
}
export interface Currency {
  id: string;
  symbol: string;
  minorUnit?: number;
}
export interface ShoppingCartItem {
  product: ShoppingCartItemProduct;
  price?: PriceComponentFragment | null;
}

export interface ShoppingCartProviderValues {
  readonly shoppingCartItems: ShoppingCartItem[];
  readonly isOpenShoppingCart: boolean;
  readonly isEmptyShoppingCart: boolean;
  readonly totalAmount: number;
  readonly subtotalAmount: number;
  readonly promitionItemsAmount: number;
  readonly currency?: Currency;
  readonly onAddOrUpdateShoppingCartItem: (
    shoppingCartItem: ShoppingCartItem
  ) => void;
  readonly onRemoveShoppingCartItem: (productId: string) => void;
  readonly onClearShoppingCart: () => void;
  readonly onToggleShoppingCart: () => void;
}

export const ShoppingCartContext = createContext(
  {} as ShoppingCartProviderValues
);

export const ShoppingCartProvider = ({
  children,
}: PropsWithChildren<ShoppingCartProviderProps>) => {
  const { value: shoppingCartItems, setValue: setShoppingCartItems } =
    usePersistedState<ShoppingCartItem[]>({
      key: "shopping-cart-items",
    });
  const { isOpen: isOpenShoppingCart, onToggle: onToggleShoppingCart } =
    useDisclosure();
  const translate = useTranslations();
  const { onShowToast } = useToast();

  const onAddOrUpdateShoppingCartItem = useCallback(
    (shoppingCartItem: ShoppingCartItem) => {
      if (!shoppingCartItem?.price) {
        return;
      }
      setShoppingCartItems((currentItems) => {
        const oldShoppingCartItems = !!currentItems?.length ? currentItems : [];
        const currentItemIndex = oldShoppingCartItems?.findIndex(
          (currentItem) =>
            currentItem.product.id === shoppingCartItem.product.id
        );
        const existsItem = currentItemIndex >= 0;
        if (!existsItem) {
          return [...oldShoppingCartItems, shoppingCartItem];
        }
        const newItems = [...oldShoppingCartItems];
        newItems[currentItemIndex] = shoppingCartItem;
        return newItems;
      });
      onShowToast({
        title: translate.formatMessage({ id: "addedSuccessfully" }),
        status: "success",
      });
    },
    [onShowToast, setShoppingCartItems, translate]
  );

  const onRemoveShoppingCartItem = useCallback(
    (productId: string) => {
      if (!productId) {
        return;
      }
      setShoppingCartItems((currentItems) =>
        currentItems?.filter(
          (currentItem) => currentItem.product.id !== productId
        )
      );
      onShowToast({
        title: translate.formatMessage({ id: "removedSuccessfully" }),
        status: "success",
      });
    },
    [onShowToast, setShoppingCartItems, translate]
  );

  const currency = useMemo(() => {
    const defaultCurrency: Currency = {
      id: "brl",
      minorUnit: 2,
      symbol: "R$",
    };
    return shoppingCartItems?.[0]?.price?.currency || defaultCurrency;
  }, [shoppingCartItems]);

  const totalAmount = useMemo(() => {
    return shoppingCartItems?.reduce(
      (prevTotal, currentShoppingCartItem) =>
        prevTotal + (currentShoppingCartItem?.price?.amount || 0),
      0
    );
  }, [shoppingCartItems]);

  const subtotalAmount = useMemo(() => {
    return shoppingCartItems?.reduce(
      (prevTotal, currentShoppingCartItem) =>
        prevTotal +
        (currentShoppingCartItem?.price?.fromAmount ||
          currentShoppingCartItem?.price?.amount ||
          0),
      0
    );
  }, [shoppingCartItems]);

  const promitionItemsAmount = useMemo(() => {
    if (!subtotalAmount || !totalAmount) {
      return 0;
    }
    return subtotalAmount - totalAmount;
  }, [subtotalAmount, totalAmount]);

  const onClearShoppingCart = useCallback(
    () => setShoppingCartItems(() => []),
    [setShoppingCartItems]
  );

  const values = useMemo(
    () =>
      ({
        currency,
        totalAmount,
        subtotalAmount,
        promitionItemsAmount,
        shoppingCartItems,
        isOpenShoppingCart,
        isEmptyShoppingCart: !shoppingCartItems?.length,
        onAddOrUpdateShoppingCartItem,
        onRemoveShoppingCartItem,
        onToggleShoppingCart,
        onClearShoppingCart,
      }) as ShoppingCartProviderValues,
    [
      currency,
      totalAmount,
      subtotalAmount,
      promitionItemsAmount,
      shoppingCartItems,
      isOpenShoppingCart,
      onAddOrUpdateShoppingCartItem,
      onRemoveShoppingCartItem,
      onToggleShoppingCart,
      onClearShoppingCart,
    ]
  );

  return (
    <ShoppingCartContext.Provider value={values}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
