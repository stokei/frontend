import {
  ReactElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSidebarGroup } from "../../hooks";
import { Button, ButtonProps } from "../button";
import { Icon, IconName } from "../icon";
import { Stack } from "../stack";
import { Text } from "../text";

export interface SidebarGroupButtonProps extends Omit<ButtonProps, "leftIcon"> {
  readonly leftIcon?: IconName;
  readonly badge?: ReactElement;
}

export const SidebarGroupButton = ({
  leftIcon,
  badge,
  children,
  ...props
}: SidebarGroupButtonProps) => {
  const [activeStyle, setActiveStyle] = useState<any>({});

  const { isOpen, onToggle, isActive } = useSidebarGroup();

  const hoverStyle = useMemo(
    () => ({
      color: "primary.500",
      background: "background.200",
    }),
    []
  );

  useEffect(() => {
    if (isActive) {
      setActiveStyle({
        ...hoverStyle,
        fontWeight: "semibold",
        roundedLeft: "0",
      });
    } else {
      setActiveStyle({});
    }
  }, [hoverStyle, isActive]);

  const onClick = useCallback(
    (e: any) => {
      onToggle();
      props.onClick?.(e);
    },
    [onToggle, props]
  );

  return (
    <Button
      width="full"
      paddingY="3"
      paddingX="5"
      alignItems="center"
      color="text.500"
      display="flex"
      flexDirection="row"
      fontWeight="normal"
      justifyContent="space-between"
      rounded="none"
      background="transparent"
      _focus={hoverStyle}
      _hover={hoverStyle}
      _active={activeStyle}
      {...activeStyle}
      {...props}
      onClick={onClick}
      rightIcon={<Icon fontSize="xs" name={isOpen ? "caretUp" : "caretDown"} />}
    >
      {leftIcon && <Icon name={leftIcon} marginRight="4" />}
      <Stack as="span" direction="row" spacing="5" justify="space-between">
        <Text color="inherit">{children}</Text>
        {badge}
      </Stack>
    </Button>
  );
};
