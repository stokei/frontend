import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./button";

export const components = extendTheme({
  components: {
    Button: buttonTheme,
  },
});
