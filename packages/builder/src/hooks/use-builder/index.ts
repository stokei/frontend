import { BuilderContext } from "../../contexts";
import { useContext } from "react";

export const useBuilder = () => useContext(BuilderContext);
