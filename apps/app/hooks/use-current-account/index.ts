import { CurrentAccountContext } from "@/contexts";
import { useContext } from "react";

export const useCurrentAccount = () => useContext(CurrentAccountContext);
