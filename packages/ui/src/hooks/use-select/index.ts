import { useContext } from "react";
import { SelectContext } from "../../contexts";

export const useSelect = () => useContext(SelectContext);
