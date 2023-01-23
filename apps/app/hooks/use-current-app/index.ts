import { CurrentAppContext } from "@/contexts";
import { useContext } from "react";

export const useCurrentApp = () => useContext(CurrentAppContext);
