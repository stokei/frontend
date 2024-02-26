import { Stack } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface SectionContentProps {}

export const SectionContent = ({
  children,
}: PropsWithChildren<SectionContentProps>) => {
  return (
    <Stack direction="column" spacing="5">
      {children}
    </Stack>
  );
};
