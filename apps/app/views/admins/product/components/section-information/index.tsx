import { Stack } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface SectionInformationProps {}

export const SectionInformation: FC<
  PropsWithChildren<SectionInformationProps>
> = ({ children }) => {
  return (
    <Stack minWidth="60" width="fit-content" direction="column" spacing="2">
      {children}
    </Stack>
  );
};
