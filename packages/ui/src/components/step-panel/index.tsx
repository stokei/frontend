import { useMemo } from "react";
import { useSteps } from "../../hooks/use-steps";
import { Box, BoxProps } from "../box";

export interface StepPanelProps extends BoxProps {
  readonly stepIndex: string;
}
export const StepPanel: React.FC<StepPanelProps> = ({
  children,
  stepIndex,
  ...props
}) => {
  const { currentStep } = useSteps();
  const isCurrentStep = useMemo(
    () => stepIndex === currentStep,
    [stepIndex, currentStep]
  );
  if (!isCurrentStep) {
    return <></>;
  }
  return (
    <Box width="full" flexDirection="column" {...props}>
      {children}
    </Box>
  );
};
