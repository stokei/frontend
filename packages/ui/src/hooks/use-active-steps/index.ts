import { useCallback, useState } from "react";

export interface UseActiveSteps<TStepsEnum extends string | number | symbol> {
  initialState?: Record<TStepsEnum, boolean>;
}

export const useActiveSteps = <TStepsEnum extends string | number | symbol>({
  initialState,
}: UseActiveSteps<TStepsEnum>) => {
  const [activeSteps, setActiveSteps] = useState<
    Record<TStepsEnum, boolean> | undefined
  >(initialState);

  const onActivateStep = useCallback((step: TStepsEnum) => {
    setActiveSteps(
      (currentSteps) =>
        ({
          ...currentSteps,
          [step]: true,
        } as Record<TStepsEnum, boolean>)
    );
  }, []);

  const onDeactivateStep = useCallback((step: TStepsEnum) => {
    setActiveSteps(
      (currentSteps) =>
        ({
          ...currentSteps,
          [step]: false,
        } as Record<TStepsEnum, boolean>)
    );
  }, []);

  return {
    activeSteps,
    onActivateStep,
    onDeactivateStep,
  };
};
