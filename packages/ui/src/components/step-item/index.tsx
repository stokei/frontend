import { useCallback, useMemo } from "react";
import { useSteps } from "../../hooks/use-steps";
import { Icon, IconName } from "../icon";
import { Stack, StackProps } from "../stack";
import { Text } from "../text";
import { Box } from "../box";
import { Title } from "../title";

export interface StepItemProps extends StackProps {
  readonly stepIndex: string;
  readonly title: string;
  readonly icon?: IconName;
  readonly subtitle?: string;
  readonly isCompleted?: boolean;
  readonly isDisabled?: boolean;
  readonly isInvalid?: boolean;
}
export const StepItem: React.FC<StepItemProps> = ({
  stepIndex,
  title,
  subtitle,
  icon,
  isCompleted,
  isDisabled,
  isInvalid,
  onClick,
  ...props
}) => {
  const { currentStep, onChangeStep } = useSteps();

  const isCurrentStep = useMemo(
    () => stepIndex === currentStep,
    [stepIndex, currentStep]
  );

  const iconData = useMemo<{ name: IconName; color: string }>(() => {
    let name: IconName = icon || "circleOutlined";
    let color: string = "primary.400";
    if (isCompleted) {
      name = "ok";
      color = "success.500";
    }
    if (isInvalid) {
      name = "error";
      color = "error.500";
    }
    return { name, color };
  }, [icon, isCompleted, isInvalid]);

  const onChangeSetepClicked = useCallback(
    (e: any) => {
      if (isDisabled) {
        return;
      }
      onChangeStep?.(stepIndex);
      onClick?.(e);
    },
    [stepIndex, isDisabled, onChangeStep, onClick]
  );

  return (
    <Stack
      width={["full", "full", "auto", "auto"]}
      direction="row"
      spacing="3"
      rounded="md"
      paddingY="2"
      paddingX="3"
      background={isCurrentStep ? "gray.100" : undefined}
      cursor={!isDisabled ? "pointer" : undefined}
      align="center"
      {...props}
      onClick={onChangeSetepClicked}
      opacity={isDisabled ? 0.5 : props?.opacity}
    >
      <Icon fontSize="2xl" name={iconData?.name} color={iconData?.color} />
      <Stack direction="column" spacing="1">
        <Title fontSize="md">{title}</Title>
        {subtitle && (
          <Text fontSize="xs" color="text.300">
            {subtitle}
          </Text>
        )}
      </Stack>
    </Stack>
  );
};
