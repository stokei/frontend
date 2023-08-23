import { Stack } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface SectionProps {}

export const Section: FC<PropsWithChildren<SectionProps>> = ({ children }) => {
  return (
    <Stack direction="column" spacing="5">
      {children}
    </Stack>
  );
};
