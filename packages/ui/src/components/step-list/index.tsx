import { useMemo } from "react";
import { useSteps } from "../../hooks/use-steps";
import { Stack, StackProps } from "../stack";

export interface StepListProps extends StackProps {}
export const StepList: React.FC<StepListProps> = ({ children, ...props }) => {
  const { orientation } = useSteps();

  const direction = useMemo<any>(() => {
    const desktopDirection = orientation === "vertical" ? "column" : "row";
    return ["column", "column", desktopDirection, desktopDirection];
  }, [orientation]);

  return (
    <Stack
      width="full"
      direction={direction}
      spacing="2"
      overflowX="auto"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      {...props}
    >
      {children}
    </Stack>
  );
};
