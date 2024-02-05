import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  forwardRef,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useStokeiUI } from "../../hooks";
import { IColorName } from "../../interfaces";
import { getAccessibleColor } from "../../utils/get-accessible-color";

export interface ButtonProps extends ChakraButtonProps {
  readonly ref?: any;
}
export const Button: React.FC<ButtonProps> = forwardRef(
  ({ children, ...props }, ref) => {
    const { getHexdecimalColor } = useStokeiUI();
    const buttonTextColor = useMemo(() => {
      if (props?.color) {
        return props.color;
      }
      if (props?.variant && props?.variant !== "solid") {
        return props.textColor;
      }
      if (props?.textColor) {
        return props?.textColor;
      }

      if (props?.colorScheme) {
        const lightColors: IColorName[] = ["gray", "yellow", "yellow"];
        if (!!lightColors.includes(props.colorScheme as any)) {
          return "black.500";
        }
        return getAccessibleColor({
          darkColor: "black.500",
          lightColor: "white.500",
          hex: getHexdecimalColor(props?.colorScheme as IColorName, 500),
        });
      }
      if (props?.backgroundColor || props?.background) {
        const [colorName, colorHue] =
          ((props?.backgroundColor || props?.background) + "")?.split(".") ||
          [];
        return getAccessibleColor({
          darkColor: "black.500",
          lightColor: "white.500",
          hex: getHexdecimalColor(colorName as any, colorHue as any),
        });
      }
    }, [
      getHexdecimalColor,
      props?.background,
      props?.backgroundColor,
      props.color,
      props.colorScheme,
      props.textColor,
      props?.variant,
    ]);

    const noPadding = useMemo(() => props.variant === "link", [props.variant]);
    const padding = useMemo(() => {
      if (noPadding) {
        return { x: "0", y: "0" };
      }
      if (props.size === "sm" || props.size === "xs") {
        return { x: "3", y: "2" };
      }
      return { x: props.paddingX || "4", y: props.paddingY || "3" };
    }, [props.size, props.paddingY, props.paddingX, noPadding]);

    return (
      <ChakraButton
        rounded="full"
        height="fit-content"
        h="fit-content"
        paddingX={padding.x}
        paddingY={padding.y}
        ref={ref}
        whiteSpace="break-spaces"
        {...props}
        colorScheme={props.colorScheme || "primary"}
        textColor={buttonTextColor}
      >
        {children}
      </ChakraButton>
    );
  }
);
