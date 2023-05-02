import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  forwardRef,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useStokeiUI } from "../../hooks";
import { IColorName } from "../../interfaces";
import { getAccessibleColor } from "../../utils/get-accessible-color";

export interface ButtonProps extends ChakraButtonProps {}
export const Button: React.FC<ButtonProps> = forwardRef(
  ({ children, ...props }, ref) => {
    const { getHexdecimalColor } = useStokeiUI();
    const buttonTextColor = useMemo(() => {
      if (props?.variant && props?.variant !== "solid") {
        return props.textColor;
      }
      if (props?.textColor) {
        return props?.textColor;
      }

      if (props?.colorScheme) {
        return getAccessibleColor({
          darkColor: "black.500",
          lightColor: "white.500",
          hex: getHexdecimalColor(props?.colorScheme as IColorName, 500),
        });
      }
    }, [
      getHexdecimalColor,
      props?.colorScheme,
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
        {...props}
        colorScheme={props.colorScheme || "primary"}
        textColor={buttonTextColor}
      >
        {children}
      </ChakraButton>
    );
  }
);
