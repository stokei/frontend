import { Stack } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface SectionContentProps {}

export const SectionContent: FC<PropsWithChildren<SectionContentProps>> = ({
  children,
}) => {
  return (
    <Stack direction="column" spacing="5">
      {children}
    </Stack>
  );
};
