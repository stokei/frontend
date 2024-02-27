import { useCallback, useMemo } from "react";
import { useTranslations } from "../../hooks";
import { useSteps } from "../../hooks/use-steps";
import { Icon, IconName } from "../icon";
import { Stack, StackProps } from "../stack";
import { Text } from "../text";
import { Title } from "../title";

export interface StepItemProps extends StackProps {
  readonly stepIndex: string;
  readonly title: string;
  readonly icon?: IconName;
  readonly subtitle?: string;
  readonly isOptional?: boolean;
  readonly isCompleted?: boolean;
  readonly isDisabled?: boolean;
  readonly isInvalid?: boolean;
}
export const StepItem = ({
  stepIndex,
  title,
  subtitle,
  icon,
  isOptional,
  isCompleted,
  isDisabled,
  isInvalid,
  onClick,
  ...props
}: StepItemProps) => {
  const translate = useTranslations();
  const { currentStep, onChangeStep } = useSteps();

  const isCurrentStep = useMemo(
    () => stepIndex === currentStep,
    [stepIndex, currentStep]
  );

  const iconData = useMemo<{ name: IconName; color: string }>(() => {
    let name: IconName = icon || "circleOutlined";
    let color: string = isCurrentStep ? "primary.500" : "text.500";
    if (isCompleted) {
      name = "ok";
      color = "success.500";
    }
    if (isInvalid) {
      name = "error";
      color = "error.500";
    }
    return { name, color };
  }, [icon, isCompleted, isInvalid, isCurrentStep]);

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
      background={isCurrentStep ? "gray.50" : undefined}
      cursor={!isDisabled ? "pointer" : undefined}
      align="center"
      {...props}
      onClick={onChangeSetepClicked}
      opacity={isDisabled ? 0.5 : props?.opacity}
    >
      <Icon fontSize="2xl" name={iconData?.name} color={iconData?.color} />
      <Stack direction="column" spacing="1">
        <Title fontSize="md" color={isCurrentStep ? "primary.500" : undefined}>
          {title}
        </Title>
        {subtitle && (
          <Text fontSize="xs" color="text.300">
            {subtitle}
          </Text>
        )}

        {isOptional && (
          <Text fontSize="xs" color="text.300">
            {translate.formatMessage({ id: "optional" })}
          </Text>
        )}
      </Stack>
    </Stack>
  );
};
