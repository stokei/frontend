import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({});

const sizes = {
  md: defineStyle({
    fontSize: "sm",
  }),
};

// Defining a custom variant
const customVariant = defineStyle((props) => {
  const { colorScheme } = props;
  return {
    fontFamily: "sans-serif",
    bg: `red.500`,
    fontWeight: "semibold",
    color: "white",
    borderRadius: "3xl",
    transition: "transform 0.15s ease-out, background 0.15s ease-out",
    _dark: {
      bg: `${colorScheme}.200`,
      color: "gray.800",
    },

    _hover: {
      transform: "scale(1.05, 1.05)",
      bg: `${colorScheme}.600`,

      _dark: {
        bg: `${colorScheme}.300`,
      },
    },

    _active: {
      bg: `${colorScheme}.700`,
      transform: "scale(1, 1)",

      _dark: {
        bg: `${colorScheme}.400`,
      },
    },
  };
});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    custom: customVariant,
  },
  defaultProps: {},
});
