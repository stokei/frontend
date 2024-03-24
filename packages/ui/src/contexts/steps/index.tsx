import React, { PropsWithChildren, useMemo } from "react";

export interface StepsContextValues {
  readonly currentStep: string;
  readonly orientation?: "horizontal" | "vertical";
  readonly onChangeStep: (step: string) => void;
}

export interface StepsContextProps {
  readonly currentStep: string;
  readonly orientation?: "horizontal" | "vertical";
  readonly onChangeStep: (stepIndex: string) => void;
}

export const StepsContext = React.createContext({} as StepsContextValues);

export const StepsProvider = ({
  orientation,
  currentStep,
  onChangeStep,
  children,
}: PropsWithChildren<StepsContextProps>) => {
  const configValues: StepsContextValues = useMemo(
    () => ({
      orientation,
      currentStep,
      onChangeStep,
    }),
    [orientation, currentStep, onChangeStep]
  );

  return (
    <StepsContext.Provider value={configValues}>
      {children}
    </StepsContext.Provider>
  );
};
