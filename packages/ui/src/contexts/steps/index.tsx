import React, { PropsWithChildren, useMemo } from "react";

export interface StepsContextValues {
  readonly currentStep: string;
  readonly onChangeStep: (step: string) => void;
}

export interface StepsContextProps {
  readonly currentStep: string;
  readonly onChangeStep: (stepIndex: string) => void;
}

export const StepsContext = React.createContext({} as StepsContextValues);

export const StepsProvider: React.FC<PropsWithChildren<StepsContextProps>> = ({
  currentStep,
  onChangeStep,
  children,
}) => {
  const configValues: StepsContextValues = useMemo(
    () => ({
      currentStep,
      onChangeStep,
    }),
    [currentStep, onChangeStep]
  );

  return (
    <StepsContext.Provider value={configValues}>
      {children}
    </StepsContext.Provider>
  );
};
