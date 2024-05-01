import { ShoppingCartContext } from "../../contexts";
import { useContext } from "react";

export const useShoppingCart = () => useContext(ShoppingCartContext);
