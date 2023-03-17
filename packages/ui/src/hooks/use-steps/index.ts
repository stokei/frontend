import { useContext } from "react";
import { StepsContext } from "../../contexts";

export const useSteps = () => useContext(StepsContext);
