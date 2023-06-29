import { Footer } from "@/components";
import { Box } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

export interface MeLayoutProps {}

export const MeLayout: FC<PropsWithChildren<MeLayoutProps>> = ({
  children,
}) => {
  return (
    <Box width="full" flex="1" flexDirection="column">
      <Box width="full" flex="1" flexDirection="column">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
