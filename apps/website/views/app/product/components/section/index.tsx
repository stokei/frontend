import { Stack } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface SectionProps {}

export const Section = ({ children }: PropsWithChildren<SectionProps>) => {
  return (
    <Stack direction="column" spacing="5">
      {children}
    </Stack>
  );
};
