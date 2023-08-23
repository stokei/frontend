import { Avatar, Box, Stack, Text } from "@stokei/ui";
import { FC } from "react";
import { Bank } from "..";

interface BankSelectItemContentProps {
  readonly bank?: Bank;
}

export const BankSelectItemContent: FC<BankSelectItemContentProps> = ({
  bank,
}) => {
  return (
    <Stack direction="row" spacing="2">
      {bank?.code && <Text fontWeight="bold">{bank?.code} - </Text>}

      <Text>{bank?.name}</Text>
    </Stack>
  );
};
