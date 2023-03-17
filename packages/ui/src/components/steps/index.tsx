import { StepsProvider } from "../../contexts";
import { Stack, StackProps } from "../stack";

export interface StepsProps extends StackProps {
  readonly currentStep: string;
  readonly onChangeStep: (stepIndex: string) => void;
}
export const Steps: React.FC<StepsProps> = ({
  children,
  currentStep,
  onChangeStep,
  ...props
}) => (
  <StepsProvider currentStep={currentStep} onChangeStep={onChangeStep}>
    <Stack width="full" direction="column" spacing="5" {...props}>
      {children}
    </Stack>
  </StepsProvider>
);
