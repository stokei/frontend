import { Stack } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface SectionInformationProps {}

export const SectionInformation = ({
  children,
}: PropsWithChildren<SectionInformationProps>) => {
  return (
    <Stack direction="column" spacing="2">
      {children}
    </Stack>
  );
};
