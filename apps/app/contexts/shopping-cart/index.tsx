import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { useDisclosure, useToast } from "@stokei/ui";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  readonly hasNewShoppingCartItemAdded: boolean;
  readonly totalAmount: number;
  readonly subtotalAmount: number;
  readonly currency?: Currency;
  readonly onAddShoppingCartItem: (shoppingCartItem: ShoppingCartItem) => void;
  readonly onRemoveShoppingCartItem: (productId: string) => void;
  readonly onClearShoppingCart: () => void;
  readonly onToggleShoppingCart: () => void;
}

export const ShoppingCartContext = createContext(
  {} as ShoppingCartProviderValues
);

export const ShoppingCartProvider: FC<
  PropsWithChildren<ShoppingCartProviderProps>
> = ({ children }) => {
  const [shoppingCartItems, setShoppingCartItems] = useState<
    ShoppingCartItem[]
  >([]);
  const [hasNewShoppingCartItemAdded, setHasNewShoppingCartItemAdded] =
    useState(false);
  const { isOpen: isOpenShoppingCart, onToggle: onToggleShoppingCart } =
    useDisclosure();
  const translate = useTranslations();
  const { onShowToast } = useToast();

  useEffect(() => {
    if (isOpenShoppingCart) {
      setHasNewShoppingCartItemAdded(false);
    }
  }, [isOpenShoppingCart]);

  const onAddShoppingCartItem = useCallback(
    (shoppingCartItem: ShoppingCartItem) => {
      if (!shoppingCartItem?.price) {
        return;
      }
      setShoppingCartItems((currentItems) => {
        const currentItemIndex = currentItems?.findIndex(
          (currentItem) =>
            currentItem.product.id === shoppingCartItem.product.id
        );
        const existsItem = currentItemIndex >= 0;
        if (!existsItem) {
          return [...currentItems, shoppingCartItem];
        }
        const newItems = [...currentItems];
        newItems[currentItemIndex] = shoppingCartItem;
        return newItems;
      });
      onShowToast({
        title: translate.formatMessage({ id: "addedSuccessfully" }),
        status: "success",
      });
      setHasNewShoppingCartItemAdded(true);
    },
    [onShowToast, translate]
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
    [onShowToast, translate]
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

  const values: ShoppingCartProviderValues = useMemo(
    () => ({
      currency,
      totalAmount,
      subtotalAmount,
      shoppingCartItems,
      isOpenShoppingCart,
      hasNewShoppingCartItemAdded,
      onAddShoppingCartItem,
      onRemoveShoppingCartItem,
      onToggleShoppingCart,
      onClearShoppingCart: () => setShoppingCartItems([]),
    }),
    [
      currency,
      totalAmount,
      subtotalAmount,
      shoppingCartItems,
      isOpenShoppingCart,
      hasNewShoppingCartItemAdded,
      onAddShoppingCartItem,
      onRemoveShoppingCartItem,
      onToggleShoppingCart,
    ]
  );

  return (
    <ShoppingCartContext.Provider value={values}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
