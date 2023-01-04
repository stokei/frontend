import { extendTheme } from "@chakra-ui/react";

export const foundations = extendTheme({
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
  radii: {
    sm: "5px",
    md: "8px",
  },
});
