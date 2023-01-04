import { extendTheme } from "@chakra-ui/react";

export const components = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: "semibold",
      },
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
      variants: {},
    },
  },
});
