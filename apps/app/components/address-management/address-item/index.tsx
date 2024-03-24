import { Stack, Text } from "@stokei/ui";

import { AddressManagementAddressFragment } from "../graphql/addresses.query.graphql.generated";

interface AddressItemProps {
  readonly address?: AddressManagementAddressFragment | null;
}

export const AddressItem = ({ address }: AddressItemProps) => {
  return (
    <Stack direction="column" spacing="0">
      <Text fontWeight="bold">
        {address?.street}, {address?.number}
      </Text>
      {address?.complement && <Text>{address?.complement}</Text>}
      <Text>
        {address?.city}, {address?.state}, {address?.country}
      </Text>
      <Text>{address?.postalCode}</Text>
    </Stack>
  );
};
