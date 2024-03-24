import { StepsProvider } from "../../contexts";
import { Stack, StackProps } from "../stack";

export interface StepsProps extends StackProps {
  readonly orientation?: "horizontal" | "vertical";
  readonly currentStep: any;
  readonly onChangeStep: (stepIndex: any) => void;
}
export const Steps = ({
  orientation,
  children,
  currentStep,
  onChangeStep,
  ...props
}: StepsProps) => (
  <StepsProvider
    orientation={orientation}
    currentStep={currentStep}
    onChangeStep={onChangeStep}
  >
    <Stack width="full" direction="column" spacing="5" {...props}>
      {children}
    </Stack>
  </StepsProvider>
);
